/* eslint-disable max-classes-per-file */
import {
    StringField,
    StringFieldOptional,
    UUIDField,
} from '@decorators/field.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject } from 'class-validator';

export class TagItemDto {
    @StringField()
    tag: string;

    @UUIDField()
    id: Uuid;

    @StringFieldOptional()
    parentId?: string;
}

export class SyllabusTagDto {
    @StringField()
    tag: string;

    @UUIDField()
    id: Uuid;

    @ApiProperty()
    @IsArray()
    children?: TagItemDto[];
}

export class CreateSyllabusTagsDto {
    @StringField()
    classroomId: string;

    @ApiProperty()
    @IsObject()
    tags: SyllabusTagDto;
}
