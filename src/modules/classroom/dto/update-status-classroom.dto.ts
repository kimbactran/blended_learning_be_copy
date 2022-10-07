import { StatusClassroom } from '@constants/status';
import { StringField } from '@decorators/field.decorators';

export class UpdateStatusClassroom {
    @StringField()
    status: StatusClassroom;
}
