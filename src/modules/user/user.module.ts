import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { ValidatorService } from '../../shared/services/validator.service';
import { CreateSettingsHandler } from './commands/create-settings.command';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserSettingsRepository } from './user-settings.repository';

export const handlers = [CreateSettingsHandler];

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, UserSettingsRepository]),
    ],
    controllers: [UserController],
    exports: [UserService],
    providers: [UserService, ValidatorService, AwsS3Service, ...handlers],
})
export class UserModule {}
