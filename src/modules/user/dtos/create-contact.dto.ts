import { EmailFieldOptional, URLFieldOptional } from '../../../decorators';

export class CreateContactDto {
    @URLFieldOptional()
    twitter: string;

    @URLFieldOptional()
    facebook: string;

    @EmailFieldOptional()
    email: string;

    @URLFieldOptional()
    behance: string;
}
