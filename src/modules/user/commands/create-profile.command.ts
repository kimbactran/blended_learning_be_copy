import type { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { CreateProfileDto } from '../dtos/create-profile.dto';
import { UserProfileEntity } from '../user-profile.entity';

export class CreateProfileCommand implements ICommand {
    constructor(
        public readonly userId: Uuid,
        public readonly createProfileDto: CreateProfileDto,
    ) {}
}

@CommandHandler(CreateProfileCommand)
export class CreateProfileHandler
    implements ICommandHandler<CreateProfileCommand, UserProfileEntity>
{
    constructor(
        @InjectRepository(UserProfileEntity)
        private userProfileRepository: Repository<UserProfileEntity>,
    ) {}

    execute(command: CreateProfileCommand) {
        const { userId, createProfileDto } = command;
        const userProfileEntity =
            this.userProfileRepository.create(createProfileDto);

        userProfileEntity.userId = userId;

        return this.userProfileRepository.save(userProfileEntity);
    }
}
