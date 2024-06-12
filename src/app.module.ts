import './boilerplate.polyfill';

import { ClassroomModule } from '@modules/classroom/classroom.module';
import { CommentModule } from '@modules/comment/comment.module';
import { MessageModule } from '@modules/message/message.module';
import { PostModule } from '@modules/post/post.module';
import { TagModule } from '@modules/tag/tag.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { AuthModule } from './modules/auth/auth.module';
import { HealthCheckerModule } from './modules/health-checker/health-checker.module';
import { UserModule } from './modules/user/user.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [
        AuthModule,
        UserModule,
        ClassroomModule,
        PostModule,
        CommentModule,
        TagModule,
        MessageModule,
        // PostModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        TypeOrmModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (configService: ApiConfigService) =>
                configService.postgresConfig,
            inject: [ApiConfigService],
        }),
        HealthCheckerModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
    ],
})
export class AppModule {}
