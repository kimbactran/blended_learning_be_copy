import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { UserContactEntity } from '../user-contact.entity';

export type UserContactDtoOptions = Partial<{
    excludeFields: boolean;
}>;

export class UserContactDto extends AbstractDto {
    @ApiPropertyOptional()
    twitter: string;

    @ApiPropertyOptional()
    facebook: string;

    @ApiPropertyOptional()
    email: string;

    @ApiPropertyOptional()
    behance: string;

    constructor(contact: UserContactEntity, options?: UserContactDtoOptions) {
        super(contact, options);

        this.twitter = contact.twitter;
        this.facebook = contact.facebook;
        this.behance = contact.behance;
        this.email = contact.email;
    }
}
