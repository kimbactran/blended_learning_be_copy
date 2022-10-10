import { UUIDFieldOptional } from '@decorators/field.decorators';

export class GetPostDto {
    @UUIDFieldOptional()
    classroomId?: Uuid;
}
