import { StatusClassroom } from '@constants/status';
import { EnumFieldOptional, StringFieldOptional } from '@decorators/index';

export class GetClassroomsDto {
    @EnumFieldOptional(() => StatusClassroom)
    status: StatusClassroom;

    // @UUIDFieldOptional()
    // userId: string;

    @StringFieldOptional()
    keySearch: string;
}
