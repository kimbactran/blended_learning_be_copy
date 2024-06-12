import type { IAbstractEntity } from '@common/abstract.entity';
import { AbstractEntity } from '@common/abstract.entity';
import { UseDto } from '@decorators/index';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import type { MessageDtoOptions } from '../dto/message.dto';
import { MessageDto } from '../dto/message.dto';

export interface IMessageEntity extends IAbstractEntity<MessageDto> {
    sendId: Uuid;

    receiverId: Uuid;

    content: string;
}

@Entity({ name: 'message' })
@UseDto(MessageDto)
export class MessageEntity
    extends AbstractEntity<MessageDto, MessageDtoOptions>
    implements IMessageEntity
{
    @PrimaryGeneratedColumn('uuid')
    id: Uuid;

    @Column({ nullable: false })
    sendId: Uuid;

    @Column({ nullable: false })
    content: string;

    @Column({ nullable: false })
    receiverId: Uuid;
}
