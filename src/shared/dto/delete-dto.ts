import {
    BooleanField,
    StringFieldOptional,
} from '@decorators/field.decorators';

export class DeleteDto {
    @BooleanField()
    success: boolean;

    @StringFieldOptional()
    message?: string;
}
