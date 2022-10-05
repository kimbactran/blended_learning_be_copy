import { ClassroomRepository } from '@modules/classroom/classroom.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckExistedService {
    constructor(private classroomRepository: ClassroomRepository) {}

    async isExistedStudentInClassroom({
        studentId,
        classroomId,
    }: {
        studentId: string;
        classroomId: string;
    }): Promise<boolean> {
        const query = await this.classroomRepository
            .createQueryBuilder('classroom')
            .leftJoinAndSelect('classroom.users', 'user')
            .where('classroom.id = :classroomId', { classroomId })
            .getOne();

        if (!query) {
            return false;
        }

        const findStudent = query.users.find(({ id }) => id === studentId);

        return Boolean(findStudent);
    }
}
