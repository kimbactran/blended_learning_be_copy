import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class JoinTeacherDto {
    @ApiProperty()
    @IsUUID()
    teacherId: Uuid;

    @ApiProperty()
    @IsUUID()
    classroomId: Uuid;
}
