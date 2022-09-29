import { AbstractDto } from '@common/dto/abstract.dto';
import { Gender } from '@constants/index';
import { ApiProperty } from '@nestjs/swagger';

import type { UserProfileEntity } from '../user-profile.entity';

export type UserProfileDtoOptions = Partial<{
    excludeFields: boolean;
}>;

export class UserProfileDto extends AbstractDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    gender: Gender;

    constructor(profile: UserProfileEntity, options?: UserProfileDtoOptions) {
        super(profile, options);

        this.name = profile.name;
        this.gender = profile.gender;
    }
}
