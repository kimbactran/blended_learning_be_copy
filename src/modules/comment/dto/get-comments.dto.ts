import { Order } from '@constants/index';
import { EnumFieldOptional } from '@decorators/field.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetCommentsDto {
    @ApiProperty()
    @IsString()
    postId?: string;

    @ApiProperty()
    @IsString()
    classroomId?: string;

    @EnumFieldOptional(() => Order)
    order?: Order;
}
