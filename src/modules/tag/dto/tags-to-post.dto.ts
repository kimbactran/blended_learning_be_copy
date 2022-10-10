import { StringField } from '@decorators/field.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class JoinTagsToPost {
    @ApiProperty()
    @IsArray()
    tagIds: string[];

    @StringField()
    postId: Uuid;
}
