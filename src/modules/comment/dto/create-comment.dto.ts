import { StringField, StringFieldOptional } from '@decorators/field.decorators';

export class CreateCommentDto {
    @StringField()
    content: string;

    @StringFieldOptional()
    parentId?: Uuid;

    @StringField()
    postId: string;
}
