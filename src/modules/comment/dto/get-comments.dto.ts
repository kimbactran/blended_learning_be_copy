import { Order } from '@constants/index';
import { EnumFieldOptional, StringField } from '@decorators/field.decorators';

export class GetCommentsByPostDto {
    @StringField()
    postId: string;

    @EnumFieldOptional(() => Order)
    order?: Order;
}
