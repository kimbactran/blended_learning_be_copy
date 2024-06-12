import { AbstractDto } from '@common/dto/abstract.dto';
import { ApiProperty } from '@nestjs/swagger';

import type { MessageEntity } from '../entities/message.entity';

// TODO, remove this class and use constructor's second argument's type
export type MessageDtoOptions = Partial<{
    isActive: boolean;
    excludeFields: boolean;
}>;

export class MessageDto extends AbstractDto {
    @ApiProperty()
    content: string;

    @ApiProperty()
    sendId: Uuid;

    @ApiProperty()
    receiverId: Uuid;

    constructor(message: MessageEntity, options?: MessageDtoOptions) {
        super(message, options);

        this.content = message.content;
        this.sendId = message.sendId;
        this.receiverId = message.receiverId;
    }
}
