import { AbstractDto } from '@common/dto/abstract.dto';
import { RoleType } from '@constants/index';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import type { UserEntity } from '../user.entity';
import { UserProfileDto } from './user-profile.dto';

// TODO, remove this class and use constructor's second argument's type
export type UserDtoOptions = Partial<{
    isActive: boolean;
    excludeFields: boolean;
}>;

export class UserDto extends AbstractDto {
    @ApiProperty()
    email: string;

    @ApiPropertyOptional()
    profile: UserProfileDto;

    @ApiPropertyOptional({ enum: RoleType })
    role: RoleType;

    @ApiPropertyOptional()
    isActive?: boolean;

    constructor(user: UserEntity, options?: UserDtoOptions) {
        super(user, options);

        this.role = user.role;
        this.email = user.email;
        this.isActive = options?.isActive;
        this.profile = user.profile?.toDto({ excludeFields: true });
    }
}
