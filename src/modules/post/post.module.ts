import { ClassroomRepository } from '@modules/classroom/classroom.repository';
import { ClassroomService } from '@modules/classroom/classroom.service';
import { UserRepository } from '@modules/user/user.repository';
import { UserService } from '@modules/user/user.service';
import { UserProfileRepository } from '@modules/user/user-profile.repository';
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
            UserProfileRepository,
            ClassroomRepository,
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
