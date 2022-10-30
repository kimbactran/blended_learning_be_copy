import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateSyllabusTagsDto {
    @ApiProperty()
    @IsArray()
    tags: string[];

    @ApiProperty()
    @IsString()
    classroomId: string;
}
