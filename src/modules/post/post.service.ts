import { UnjoinedToClassroomException } from '@exceptions/unjoined-classroom.exception';
import { ClassroomService } from '@modules/classroom/classroom.service';
import { UserService } from '@modules/user/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CheckExistedService } from '@sharedServices/check-existed.service';
import type { DeleteDto } from 'shared/dto/delete-dto';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import type { CreatePostDto } from './dto/create-post.dto';
import type { GetPostDto } from './dto/get-post.dto';
import type { PostDto } from './dto/post.dto';
import type { UpdatePostDto } from './dto/update-post.dto';
import type { VoteDto } from './dto/vote.dto';
import type { PostEntity } from './entities/post.entity';
import { PostRepository } from './post.repository';
import { PostStatRepository } from './post-stat.repository';

@Injectable()
export class PostService {
    constructor(
        private postRepository: PostRepository,
        private postStatRepository: PostStatRepository,
        private checkExistedService: CheckExistedService,
        private userService: UserService,
        private classroomService: ClassroomService,
    ) {}

    // POST

    @Transactional()
    async createPost(body: {
        userId: string;
        createPostDto: CreatePostDto;
    }): Promise<PostDto> {
        const { userId, createPostDto } = body;
        const { title, content, classroomId } = createPostDto;

        const isExistedStudentInClassroom =
            await this.checkExistedService.isExistedStudentInClassroom({
                studentId: userId,
                classroomId,
            });

        if (!isExistedStudentInClassroom) {
            throw new UnjoinedToClassroomException();
        }

        const user = await this.userService.getUserById(userId);
        const classroom = await this.classroomService.getByClassroomId(
            classroomId,
        );

        const post = this.postRepository.create({
            title,
            content,
            user,
            classroom,
        });
        await this.postRepository.save(post);

        return post;
    }

    // GET
    async getPosts(getPostDto: GetPostDto): Promise<PostEntity[]> {
        const { classroomId } = getPostDto;

        const query = this.postRepository.createQueryBuilder('post');

        if (classroomId) {
            query.where('post.classroom_id = :classroomId', { classroomId });
        }

        const posts = await query.getMany();

        if (!posts) {
            throw new NotFoundException('Posts not found!');
        }

        return posts;
    }

    async getPostById(postId: string) {
        const post = await this.postRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.postStats', 'stat')
            .where('post.id = :postId', { postId })
            .getOne();

        if (!post) {
            throw new NotFoundException('Post not found!');
        }

        const numUpVote = post.postStats.filter(
            ({ isUpVote }) => isUpVote,
        ).length;
        const numDownVote = post.postStats.filter(
            ({ isDownVote }) => isDownVote,
        ).length;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { postStats, ...tempPost } = post;

        return { ...tempPost, numUpVote, numDownVote };
    }

    async getPostsByClassroomId(classroomId: string, keySearch: string) {
        const query = this.postRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.postStats', 'stat')
            .leftJoin('post.classroom', 'classroom')
            .where('classroom.id = :classroomId', { classroomId });

        if (keySearch) {
            query.andWhere('LOWER(post.title) LIKE LOWER(:keySearch)', {
                keySearch: `%${keySearch}%`,
            });
        }

        const posts = await query.getMany();

        if (!posts) {
            throw new NotFoundException('Posts not found!');
        }

        const newPosts = posts.map((post) => {
            const { postStats, ...tempPost } = post;

            const numUpVote = postStats.filter(
                ({ isUpVote }) => isUpVote,
            ).length;
            const numDownVote = postStats.filter(
                ({ isDownVote }) => isDownVote,
            ).length;

            return { ...tempPost, numUpVote, numDownVote };
        });

        return newPosts;
    }

    // UPDATE
    async updatePost(body: {
        userId: string;
        postId: string;
        updatePostDto: UpdatePostDto;
    }): Promise<PostEntity> {
        const { userId, postId, updatePostDto } = body;
        const post = await this.postRepository
            .createQueryBuilder('post')
            .where('post.id = :postId', { postId })
            .andWhere('post.user_id = :userId', { userId })
            .getOne();

        if (!post) {
            throw new NotFoundException('Post not found!');
        }

        const updatedPost = this.postRepository.merge(post, updatePostDto);
        await this.postRepository.save(updatedPost);

        return updatedPost;
    }

    async votePost(body: {
        userId: string;
        postId: string;
        voteDto: VoteDto;
    }): Promise<DeleteDto> {
        const { userId, postId, voteDto } = body;

        const { isUpVote, isDownVote } = voteDto;

        const postStat = await this.postStatRepository
            .createQueryBuilder('post_stat')
            .where('post_stat.post_id = :postId', { postId })
            .andWhere('post_stat.user_id = :userId', { userId })
            .getOne();

        if (!postStat) {
            const user = await this.userService.getUserById(userId);
            const post = await this.getPostById(postId);

            if (!user || !post) {
                throw new NotFoundException('Error when get user or post');
            }

            const newPostStat = this.postStatRepository.create({
                user,
                post,
                ...voteDto,
            });
            await this.postStatRepository.save(newPostStat);

            return { success: true };
        }

        postStat.isUpVote = isUpVote || false;
        postStat.isDownVote = isDownVote || false;
        await this.postStatRepository.save(postStat);

        return { success: true };
    }

    // DELETE

    async deletePost(userId: string, postId: string): Promise<DeleteDto> {
        const post = await this.postRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.postStats', 'postStat')
            .where('post.id = :postId', { postId })
            .andWhere('post.user_id = :userId', { userId })
            .getOne();

        if (!post) {
            throw new NotFoundException('Post not found!');
        }

        await this.postRepository.remove(post);

        return { success: true };
    }
}
