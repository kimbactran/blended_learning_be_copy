import { TagType } from '@constants/tag-type';
import {
    EnumFieldOptional,
    StringField,
    StringFieldOptional,
} from '@decorators/field.decorators';

export class CreateTagDto {
    @StringField()
    tag: string;

    @StringField()
    classroomId: string;

    @StringFieldOptional()
    parentId: string;

    @EnumFieldOptional(() => TagType)
    type: TagType;

    @StringFieldOptional()
    postId?: Uuid;
}
