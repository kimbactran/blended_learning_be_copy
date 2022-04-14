import type { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';

import type { CreatePostDto } from '../dtos/create-post.dto';
import type { PostEntity } from '../post.entity';
import { PostRepository } from '../post.repository';

export class CreatePostCommand implements ICommand {
    constructor(
        public readonly userId: Uuid,
        public readonly createPostDto: CreatePostDto,
    ) {}
}

@CommandHandler(CreatePostCommand)
export class CreatePostHandler
    implements ICommandHandler<CreatePostCommand, PostEntity>
{
    constructor(private postRepository: PostRepository) {}

    async execute(command: CreatePostCommand) {
        const { userId, createPostDto } = command;
        const { title, description } = createPostDto;
        const postEntity = this.postRepository.create({
            userId,
            title,
            description,
        });
        await this.postRepository.save(postEntity);

        return postEntity;
    }
}
