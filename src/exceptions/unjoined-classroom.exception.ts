import { NotFoundException } from '@nestjs/common';

export class UnjoinedToClassroomException extends NotFoundException {
    constructor(error?: string) {
        super("The student hasn't been enrolled to this classroom!", error);
    }
}
