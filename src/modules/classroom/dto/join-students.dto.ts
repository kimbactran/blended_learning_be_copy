import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class JoinStudentsDto {
    @ApiProperty()
    @IsArray()
    studentIds: string[];

    @ApiProperty()
    @IsString()
    classroomId: string;
}
