import { StringFieldOptional } from '@decorators/index';

export class CreateContactDto {
    @StringFieldOptional()
    twitter: string;

    @StringFieldOptional()
    facebook: string;

    @StringFieldOptional()
    email: string;

    @StringFieldOptional()
    behance: string;
}
