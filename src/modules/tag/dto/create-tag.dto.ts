import { TagType } from '@constants/tag-type';
import {
    EnumFieldOptional,
    StringField,
    StringFieldOptional,
} from '@decorators/field.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

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

export class AddFreeTagsDto {
    @StringField()
    classroomId: string;

    @ApiProperty()
    @IsArray()
    tags: string[];

    @StringFieldOptional()
    postId?: Uuid;
}
