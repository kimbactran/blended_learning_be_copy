import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsS3Service } from '@sharedServices/aws-s3.service';
import { ValidatorService } from '@sharedServices/validator.service';

import { CreateProfileHandler } from './commands/create-profile.command';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserProfileRepository } from './user-profile.repository';

export const handlers = [CreateProfileHandler];

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, UserProfileRepository]),
    ],
    controllers: [UserController],
    exports: [UserService],
    providers: [UserService, ValidatorService, AwsS3Service, ...handlers],
})
export class UserModule {}
