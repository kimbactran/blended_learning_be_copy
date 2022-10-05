import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class JoinClassroomDto {
    @ApiProperty()
    @IsArray()
    studentIds: string[];

    @ApiProperty()
    @IsString()
    classroomId: string;
}
