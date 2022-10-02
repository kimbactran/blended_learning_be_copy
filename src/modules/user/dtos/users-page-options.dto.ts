import { PageOptionsDto } from '@common/dto/page-options.dto';
import { StringFieldOptional } from '@decorators/field.decorators';

export class UsersPageOptionsDto extends PageOptionsDto {
    @StringFieldOptional()
    email: string;

    @StringFieldOptional()
    name: string;
}
