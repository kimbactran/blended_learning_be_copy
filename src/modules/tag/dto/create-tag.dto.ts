import { StringField, StringFieldOptional } from '@decorators/field.decorators';

export class CreateTagDto {
    @StringField()
    tag: string;

    @StringFieldOptional()
    postId?: Uuid;
}
