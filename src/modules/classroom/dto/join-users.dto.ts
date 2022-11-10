import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class JoinUsersDto {
    @ApiProperty()
    @IsArray()
    userIds: string[];

    @ApiProperty()
    @IsString()
    classroomId: string;
}
