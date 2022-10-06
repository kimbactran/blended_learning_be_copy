import { AbstractDto } from '@common/dto/abstract.dto';
import { StatusClassroom } from '@constants/status';
import type { UserDto } from '@modules/user/dtos/user.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import type { ClassroomEntity } from '../entities/classroom.entity';

// TODO, remove this class and use constructor's second argument's type
export type ClassroomDtoOptions = Partial<{
    isActive: boolean;
    excludeFields: boolean;
}>;

export class ClassroomDto extends AbstractDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    resources: string;

    @ApiPropertyOptional()
    status?: StatusClassroom;

    @ApiPropertyOptional()
    users: UserDto[];

    @ApiPropertyOptional()
    isActive?: boolean;

    constructor(classroom: ClassroomEntity, options?: ClassroomDtoOptions) {
        super(classroom, options);

        this.title = classroom.title;
        this.resources = classroom.resources;
        this.status = classroom.status;
        this.isActive = options?.isActive;
        this.users = classroom.users?.toDtos({ excludeFields: true });
    }
}
