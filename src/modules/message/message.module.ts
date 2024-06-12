import { ClassroomRepository } from '@modules/classroom/classroom.repository';
import { ClassroomService } from '@modules/classroom/classroom.service';
import { CommentRepository } from '@modules/comment/comment.repository';
import { CommentStatRepository } from '@modules/comment/comment-stat.repository';
import { PostRepository } from '@modules/post/post.repository';
import { PostService } from '@modules/post/post.service';
import { PostStatRepository } from '@modules/post/post-stat.repository';
import { TagRepository } from '@modules/tag/tag.repository';
import { UserRepository } from '@modules/user/user.repository';
import { UserService } from '@modules/user/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckExistedService } from '@sharedServices/check-existed.service';

import { MessageController } from './message.controller';
import { MessageRepository } from './message.repository';
import { MessageService } from './message.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MessageRepository,
            CommentRepository,
            CommentStatRepository,
            UserRepository,
            PostRepository,
            PostStatRepository,
            ClassroomRepository,
            TagRepository,
        ]),
    ],
    controllers: [MessageController],
    providers: [
        MessageService,
        UserService,
        PostService,
        CheckExistedService,
        ClassroomService,
    ],
})
export class MessageModule {}
