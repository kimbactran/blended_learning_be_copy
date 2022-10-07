import { StringField, StringFieldOptional } from '@decorators/index';

export class CreateClassroomDto {
    @StringField()
    title: string;

    @StringFieldOptional()
    resources: string;
}
