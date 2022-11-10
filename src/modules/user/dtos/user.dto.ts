import { AbstractDto } from '@common/dto/abstract.dto';
import { RoleType } from '@constants/index';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import type { UserEntity } from '../user.entity';

// TODO, remove this class and use constructor's second argument's type
export type UserDtoOptions = Partial<{
    isActive: boolean;
    excludeFields: boolean;
}>;

export class UserDto extends AbstractDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    email: string;

    @ApiPropertyOptional({ enum: RoleType })
    role: RoleType;

    @ApiProperty()
    name: string;

    @ApiProperty()
    gender: string;

    @ApiPropertyOptional()
    isActive?: boolean;

    constructor(user: UserEntity, options?: UserDtoOptions) {
        super(user, options);

        this.id = user.id;
        this.role = user.role;
        this.email = user.email;
        this.name = user.name;
        this.gender = user.gender;
        this.isActive = options?.isActive;
    }
}
