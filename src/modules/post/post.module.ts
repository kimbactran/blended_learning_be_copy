import { ClassroomRepository } from '@modules/classroom/classroom.repository';
import { ClassroomService } from '@modules/classroom/classroom.service';
import { TagRepository } from '@modules/tag/tag.repository';
import { UserRepository } from '@modules/user/user.repository';
import { UserService } from '@modules/user/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckExistedService } from '@sharedServices/check-existed.service';

import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';
import { PostStatRepository } from './post-stat.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PostRepository,
            PostStatRepository,
            UserRepository,
            ClassroomRepository,
            TagRepository,
        ]),
    ],
    controllers: [PostController],
    exports: [PostService],
    providers: [
        PostService,
        CheckExistedService,
        UserService,
        ClassroomService,
    ],
})
export class PostModule {}
