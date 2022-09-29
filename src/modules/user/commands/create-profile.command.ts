import type { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';

import type { CreateProfileDto } from '../dtos/create-profile.dto';
import type { UserProfileEntity } from '../user-profile.entity';
import { UserProfileRepository } from '../user-profile.repository';

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
    constructor(private userProfileRepository: UserProfileRepository) {}

    execute(command: CreateProfileCommand) {
        const { userId, createProfileDto } = command;
        const userProfileEntity =
            this.userProfileRepository.create(createProfileDto);

        userProfileEntity.userId = userId;

        return this.userProfileRepository.save(userProfileEntity);
    }
}
