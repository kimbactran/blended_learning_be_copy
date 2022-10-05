import { UserNotFoundException } from '@exceptions/user-not-found.exception';
import { UserRepository } from '@modules/user/user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import { ClassroomRepository } from './classroom.repository';
import type { ClassroomDto } from './dto/classroom.dto';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import type { JoinClassroomDto } from './dto/join-classroom.dto';
import type { ClassroomEntity } from './entities/classroom.entity';

@Injectable()
export class ClassroomService {
    constructor(
        private classroomRepository: ClassroomRepository,
        private userRepository: UserRepository,
    ) {}

    @Transactional()
    async createClassroom(
        createClassroomDto: CreateClassroomDto,
    ): Promise<ClassroomEntity> {
        const classroom = this.classroomRepository.create(createClassroomDto);

        await this.classroomRepository.save(classroom);

        return classroom;
    }

    async getByClassroomId(classroomId: string): Promise<ClassroomDto> {
        const classroom = await this.classroomRepository
            .createQueryBuilder('classroom')
            .where('classroom.id = :classroomId', { classroomId })
            .getOne();

        if (!classroom) {
            throw new NotFoundException('Classroom not found!');
        }

        return classroom;
    }

    async joinStudentsToClass(joinClassroomDto: JoinClassroomDto) {
        const { studentIds, classroomId } = joinClassroomDto;

        const isExistedUsers = this.userRepository
            .createQueryBuilder('user')
            .where('user.id IN (:...studentIds)', { studentIds });

        if (!isExistedUsers) {
            throw new UserNotFoundException();
        }

        const isExistedClassroom = this.classroomRepository
            .createQueryBuilder('classroom')
            .where('classroom.id = :classroomId', { classroomId });

        if (!isExistedClassroom) {
            throw new UserNotFoundException();
        }

        const classroom = await this.classroomRepository
            .createQueryBuilder('classroom')
            .leftJoinAndSelect('classroom.users', 'user')
            .where('classroom.id = :classroomId', { classroomId })
            .getOne();
        const students = await isExistedUsers.getMany();

        if (!classroom || !students) {
            throw new UserNotFoundException();
        }

        classroom.users = [...students];
        await this.classroomRepository.save(classroom);

        return classroom;
    }

    async getClassroomsByUserId(userId: string): Promise<ClassroomDto[]> {
        const queryBuilder = this.classroomRepository
            .createQueryBuilder('classroom')
            .leftJoin('classroom.users', 'user')
            .where('user.id = :userId', { userId });

        const classroomEntity = await queryBuilder.getMany();

        if (!classroomEntity) {
            throw new UserNotFoundException();
        }

        return classroomEntity;
    }
}
