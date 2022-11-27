import { ClassroomRepository } from '@modules/classroom/classroom.repository';
import { ClassroomService } from '@modules/classroom/classroom.service';
import { CommentRepository } from '@modules/comment/comment.repository';
import { PostRepository } from '@modules/post/post.repository';
import { PostService } from '@modules/post/post.service';
import { PostStatRepository } from '@modules/post/post-stat.repository';
import { UserRepository } from '@modules/user/user.repository';
import { UserService } from '@modules/user/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckExistedService } from '@sharedServices/check-existed.service';

import { TagController } from './tag.controller';
import { TagRepository } from './tag.repository';
import { TagService } from './tag.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PostRepository,
            PostStatRepository,
            UserRepository,
            TagRepository,
            ClassroomRepository,
            CommentRepository,
        ]),
    ],
    controllers: [TagController],
    exports: [TagService],
    providers: [
        TagService,
        UserService,
        PostService,
        CheckExistedService,
        ClassroomService,
    ],
})
export class TagModule {}
