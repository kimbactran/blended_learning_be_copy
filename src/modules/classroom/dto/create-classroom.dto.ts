import { StringFieldOptional } from '@decorators/index';

export class CreateClassroomDto {
    @StringFieldOptional()
    title: string;

    @StringFieldOptional()
    resources: string;
}
