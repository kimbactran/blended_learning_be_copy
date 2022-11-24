import { StatusClassroom } from '@constants/status';
import { EnumFieldOptional, StringField } from '@decorators/index';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateClassroomDto {
    @StringField()
    title: string;

    @EnumFieldOptional(() => StatusClassroom)
    status: StatusClassroom;

    @ApiProperty()
    @IsString()
    resources: string;
}
