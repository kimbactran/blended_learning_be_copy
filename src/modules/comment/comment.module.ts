import { ClassroomRepository } from '@modules/classroom/classroom.repository';
import { ClassroomService } from '@modules/classroom/classroom.service';
import { PostRepository } from '@modules/post/post.repository';
import { PostService } from '@modules/post/post.service';
import { PostStatRepository } from '@modules/post/post-stat.repository';
import { UserRepository } from '@modules/user/user.repository';
import { UserService } from '@modules/user/user.service';
import { UserProfileRepository } from '@modules/user/user-profile.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckExistedService } from '@sharedServices/check-existed.service';

import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { CommentStatRepository } from './comment-stat.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CommentRepository,
            CommentStatRepository,
            UserRepository,
            UserProfileRepository,
            PostRepository,
            PostStatRepository,
            ClassroomRepository,
        ]),
    ],
    controllers: [CommentController],
    providers: [
        CommentService,
        UserService,
        PostService,
        CheckExistedService,
        ClassroomService,
    ],
})
export class CommentModule {}
