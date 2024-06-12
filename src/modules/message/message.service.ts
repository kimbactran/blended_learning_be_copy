import { UserService } from '@modules/user/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { UserEntity } from '@user/user.entity';

import type { CreateMessageDto } from './dto/create-message.dto';
import type { MessageEntity } from './entities/message.entity';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
    constructor(
        private userService: UserService,
        private messageRepository: MessageRepository,
    ) {}

    async createComment(body: {
        userId: string;
        createMessageDto: CreateMessageDto;
    }): Promise<MessageEntity> {
        const { userId, createMessageDto } = body;

        const { content, sendId, receiverId } = createMessageDto;

        const user = await this.userService.getUserById(userId);

        if (!user) {
            throw new NotFoundException('Error when get user');
        }

        const comment = this.messageRepository.create({
            sendId,
            receiverId,
            content,
        });

        await this.messageRepository.save(comment);

        return comment;
    }

    async getMessages(
        user: UserEntity,
        sendId?: string,
        receiverId?: string,
    ): Promise<MessageEntity[]> {
        const message = await this.messageRepository
            .createQueryBuilder('message')
            .where('message.send_id = :sendId', { sendId })
            .andWhere('message.receiver_id = :receiverId', { receiverId })
            .getMany();

        if (!message) {
            throw new NotFoundException('message not found!');
        }

        return message;
    }

    async getReceiver(sendId: string) {
        const message = await this.messageRepository
            .createQueryBuilder('message')
            .where('message.send_id = :sendId', { sendId })
            .getMany();

        if (!message) {
            throw new NotFoundException('message not found!');
        }

        return new Set(message.map((s) => s.receiverId));
    }
}
