import { StringField } from '@decorators/field.decorators';

export class CreateMessageDto {
    @StringField()
    content: string;

    @StringField()
    sendId?: Uuid;

    @StringField()
    receiverId: Uuid;
}
