import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    content: string;

    @ApiProperty()
    @IsString()
    classroomId: string;

    @ApiProperty()
    @IsArray()
    @IsOptional()
    tagIds?: string[];
}
