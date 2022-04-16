import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { ValidatorService } from '../../shared/services/validator.service';
import { CreateContactHandler } from './commands/create-contact.command';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserContactRepository } from './user-contact.repository';

export const handlers = [CreateContactHandler];

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, UserContactRepository]),
    ],
    controllers: [UserController],
    exports: [UserService],
    providers: [UserService, ValidatorService, AwsS3Service, ...handlers],
})
export class UserModule {}
