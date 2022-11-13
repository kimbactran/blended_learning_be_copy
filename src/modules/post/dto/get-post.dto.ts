import { Order } from '@constants/index';
import { EnumFieldOptional, UUIDField } from '@decorators/field.decorators';
import { IsUndefinable } from '@decorators/validator.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetPostDto {
    @UUIDField()
    classroomId: Uuid;
}

export class GetPostsByClassroomDto {
    @EnumFieldOptional(() => Order)
    @IsUndefinable()
    order?: Order;

    @ApiProperty()
    @IsString()
    @IsUndefinable()
    keySearch?: string;
}
