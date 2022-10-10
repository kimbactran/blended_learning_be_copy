import type { PostEntity } from '@modules/post/entities/post.entity';
import { PostRepository } from '@modules/post/post.repository';
import { PostService } from '@modules/post/post.service';
import { UserService } from '@modules/user/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';

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
    ) {}

    // POST

    async createTag(body: { userId: string; tag: string }): Promise<TagEntity> {
        const { userId, tag } = body;

        const user = await this.userService.getUserById(userId);

        if (!user) {
            throw new NotFoundException('Error when get user');
        }

        const tagEntity = this.tagRepository.create({
            user,
            tag,
        });
        await this.tagRepository.save(tagEntity);

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

        return post;
    }

    // GET
}
