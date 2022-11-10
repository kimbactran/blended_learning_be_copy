import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class JoinClassroomsDto {
    @ApiProperty()
    @IsArray()
    classroomIds: string[];

    @ApiProperty()
    @IsString()
    userId: string;
}
