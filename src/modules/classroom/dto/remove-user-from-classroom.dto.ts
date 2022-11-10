import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class RemoveUserFromClassroomDto {
    @ApiProperty()
    @IsUUID()
    userId: Uuid;

    @ApiProperty()
    @IsUUID()
    classroomId: Uuid;
}
