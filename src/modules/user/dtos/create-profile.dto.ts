import { Gender } from '@constants/index';
import { StringFieldOptional } from '@decorators/index';

export class CreateProfileDto {
    @StringFieldOptional()
    name: string;

    @StringFieldOptional()
    gender: Gender;
}
