import type { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';

import type { CreateContactDto } from '../dtos/create-contact.dto';
import type { UserContactEntity } from '../user-contact.entity';
import { UserContactRepository } from '../user-contact.repository';

export class CreateContactCommand implements ICommand {
    constructor(
        public readonly userAddress: string,
        public readonly createContactDto: CreateContactDto,
    ) {}
}

@CommandHandler(CreateContactCommand)
export class CreateContactHandler
    implements ICommandHandler<CreateContactCommand, UserContactEntity>
{
    constructor(private userContactRepository: UserContactRepository) {}

    async execute(command: CreateContactCommand) {
        const { userAddress, createContactDto } = command;
        const userContactEntity =
            this.userContactRepository.create(createContactDto);

        userContactEntity.userAddress = userAddress;

        return this.userContactRepository.save(userContactEntity);
    }
}
