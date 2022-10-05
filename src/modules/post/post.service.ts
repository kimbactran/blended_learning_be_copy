import { UnjoinedToClassroomException } from '@exceptions/unjoined-classroom.exception';
import { UserNotFoundException } from '@exceptions/user-not-found.exception';
import { ClassroomService } from '@modules/classroom/classroom.service';
import { UserService } from '@modules/user/user.service';
import { Injectable } from '@nestjs/common';
import { CheckExistedService } from '@sharedServices/check-existed.service';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import { CreatePostDto } from './dto/create-post.dto';
import type { PostDto } from './dto/post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
    constructor(
        private postRepository: PostRepository,
        private checkExistedService: CheckExistedService,
        private userService: UserService,
        private classroomService: ClassroomService,
    ) {}

    @Transactional()
    async createPost(createPostDto: CreatePostDto): Promise<PostDto> {
        const { title, content, userId, classroomId } = createPostDto;

        // validate
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

    async getPostById(postId: string): Promise<PostDto> {
        const queryBuilder = this.postRepository
            .createQueryBuilder('post')
            .where('post.id = :postId', { postId });
        const post = await queryBuilder.getOne();

        if (!post) {
            throw new UserNotFoundException();
        }

        return post;
    }
}
