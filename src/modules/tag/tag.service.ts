import { TagType } from '@constants/tag-type';
import { ClassroomService } from '@modules/classroom/classroom.service';
import type { PostEntity } from '@modules/post/entities/post.entity';
import { PostRepository } from '@modules/post/post.repository';
import { PostService } from '@modules/post/post.service';
import type { UserEntity } from '@modules/user/user.entity';
import { UserService } from '@modules/user/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';

import type { AddFreeTagsDto, CreateTagDto } from './dto/create-tag.dto';
import type {
    CreateSyllabusTagsDto,
    TagItemDto,
} from './dto/syllabus-tags.dto';
import type { JoinTagsToPost } from './dto/tags-to-post.dto';
import type { TagEntity } from './entities/tag.entity';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
    constructor(
        private tagRepository: TagRepository,
        private userService: UserService,
        private postService: PostService,
        private postRepository: PostRepository,
        private classroomService: ClassroomService,
    ) {}

    // POST

    async createTag(body: {
        user: UserEntity;
        createTagDto: CreateTagDto;
    }): Promise<TagEntity> {
        const { user, createTagDto } = body;
        const { postId, ...rest } = createTagDto;

        if (!user) {
            throw new NotFoundException('Error when get user');
        }

        const tagEntity = this.tagRepository.create({
            ...rest,
            user,
        });
        await this.tagRepository.save(tagEntity);

        if (postId) {
            await this.joinTagsToPost({ tagIds: [tagEntity.id], postId });
        }

        return tagEntity;
    }

    async joinTagsToPost(joinTagsToPost: JoinTagsToPost): Promise<PostEntity> {
        const { tagIds, postId } = joinTagsToPost;

        const post = await this.postRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.tags', 'tag')
            .where('post.id = :postId', { postId })
            .getOne();
        const tags = await this.tagRepository
            .createQueryBuilder('tag')
            .where('tag.id IN (:...tagIds)', { tagIds })
            .getMany();

        if (!post || !tags) {
            throw new NotFoundException('Error when get post and tags');
        }

        post.tags.push(...tags);

        await this.postRepository.save(post);

        return post;
    }

    async createSyllabusTags(user: UserEntity, testDto: CreateSyllabusTagsDto) {
        const { classroomId, tags } = testDto;

        const classroom = await this.classroomService.getByClassroomId(
            classroomId,
        );

        if (!classroom) {
            throw new NotFoundException('Error when get classroom');
        }

        const chapterTag = await this.tagRepository
            .createQueryBuilder('tag')
            .where('tag.id = :tagId', { tagId: tags.id })
            .getOne();

        // create all new tags
        if (!chapterTag) {
            const arrCreateSyllabusTags = [
                {
                    tag: tags.tag,
                    id: tags.id,
                    type: TagType.SYLLABUS,
                    user,
                    classroom,
                },
            ];

            if (tags.children?.length) {
                for (const item of tags.children) {
                    arrCreateSyllabusTags.push({
                        ...item,
                        type: TagType.SYLLABUS,
                        user,
                        classroom,
                    });
                }
            }

            const tagsEntity = this.tagRepository.create(arrCreateSyllabusTags);
            await this.tagRepository.save(tagsEntity);

            return { success: true };
        }

        // create & update tags
        const arrTags = [] as TagItemDto[];
        arrTags.push({ id: tags.id, tag: tags.tag }, ...(tags?.children || []));
        const existedTags = await this.tagRepository
            .createQueryBuilder('tag')
            .where('tag.id IN (:...tagIds)', {
                tagIds: arrTags.map(({ id }) => id),
            })
            .getMany();

        const arrCreateTags = arrTags.filter(
            (item) => !existedTags.map(({ id }) => id).includes(item.id),
        );

        if (!existedTags) {
            throw new NotFoundException('Error when get existedTags');
        }

        const updatedTags = existedTags.map((item) =>
            this.tagRepository.merge(
                item,
                arrTags.find(({ id }) => id === item.id) || {},
            ),
        );

        await this.tagRepository.save(updatedTags);
        await this.tagRepository.save(
            arrCreateTags.map((item) => ({
                ...item,
                user,
                classroom,
                type: TagType.SYLLABUS,
            })),
        );

        return { success: true };
    }

    async createFreeTags(user: UserEntity, addFreeTagsDto: AddFreeTagsDto) {
        const { classroomId, tags } = addFreeTagsDto;

        if (!user) {
            throw new NotFoundException('Error when get user');
        }

        const classroom = await this.classroomService.getByClassroomId(
            classroomId,
        );

        if (!classroom) {
            throw new NotFoundException('Error when get classroom');
        }

        const tagsEntity = this.tagRepository.create(
            tags.map((item) => ({
                tag: item,
                user,
                classroom,
            })),
        );
        await this.tagRepository.save(tagsEntity);

        return tagsEntity;
    }

    // GET

    async getTags(keySearch?: string) {
        const query = this.tagRepository.createQueryBuilder('tag');

        if (keySearch) {
            query.andWhere('LOWER(tag.tag) LIKE LOWER(:keySearch)', {
                keySearch: `%${keySearch}%`,
            });
        }

        const tags = await query.getMany();

        if (!tags) {
            throw new NotFoundException('Error when get tags');
        }

        return tags;
    }

    async getTagsByClassroom(classroomId: string) {
        const tags = await this.tagRepository
            .createQueryBuilder('tag')
            .where('tag.classroom_id = :classroomId', { classroomId })
            .getMany();

        if (!tags) {
            throw new NotFoundException('Error when get tags');
        }

        return tags;
    }
}
