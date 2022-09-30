import { UserNotFoundException } from '@exceptions/user-not-found.exception';
import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import { ClassroomRepository } from './classroom.repository';
import type { ClassroomDto } from './dto/classroom.dto';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import type { ClassroomEntity } from './entities/classroom.entity';

@Injectable()
export class ClassroomService {
    constructor(private classroomRepository: ClassroomRepository) {}

    @Transactional()
    async createClassroom(
        createClassroomDto: CreateClassroomDto,
    ): Promise<ClassroomEntity> {
        const classroom = this.classroomRepository.create(createClassroomDto);

        await this.classroomRepository.save(classroom);

        return classroom;
    }

    async getClassroomsByUserId(userId: string): Promise<ClassroomDto[]> {
        const queryBuilder = this.classroomRepository
            .createQueryBuilder('classroom')
            .leftJoinAndSelect('classroom.users', 'user')
            .where('user.id = :userId', { userId });

        const classroomEntity = await queryBuilder.getMany();

        if (!classroomEntity) {
            throw new UserNotFoundException();
        }

        return classroomEntity.toDtos({ excludeFields: true });
    }
}
