import { UserNotFoundException } from '@exceptions/index';
import { ClassroomRepository } from '@modules/classroom/classroom.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { FindConditions } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import type { Optional } from '../../types';
import { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import type { JoinClassroomsDto } from './dtos/join-classrooms.dto';
import type { RemoveClassroomFromUserDto } from './dtos/remove-classroom-from-user.dto';
import type { SearchUserDto } from './dtos/search-user.dto';
import type { UpdateUserDto } from './dtos/update-user-dto';
import type { UserDto } from './dtos/user.dto';
import type { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        private classroomRepository: ClassroomRepository,
    ) {}

    // POST

    async joinClassroomsToUser(joinClassroomsDto: JoinClassroomsDto) {
        const { userId, classroomIds } = joinClassroomsDto;

        const isExistedClassrooms = this.classroomRepository
            .createQueryBuilder('classroom')
            .where('classroom.id IN (:...classroomIds)', { classroomIds });

        if (!isExistedClassrooms) {
            throw new NotFoundException('Error when get classrooms');
        }

        const isExistedUser = await this.getUserById(userId);

        if (!isExistedUser) {
            throw new NotFoundException('Invalid Classroom');
        }

        const user = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.classrooms', 'classroom')
            .where('user.id = :userId', { userId })
            .getOne();
        const classrooms = await isExistedClassrooms.getMany();

        if (!user || !classrooms) {
            throw new UserNotFoundException();
        }

        user.classrooms.push(...classrooms);
        await this.userRepository.save(user);

        return { success: true };
    }

    async removeClassroomFromUser(
        removeClassroomFromUserDto: RemoveClassroomFromUserDto,
    ) {
        const { userId, classroomId } = removeClassroomFromUserDto;

        const user = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.classrooms', 'classroom')
            .where('user.id = :userId', { userId })
            .getOne();

        const classroom = await this.classroomRepository
            .createQueryBuilder('classroom')
            .where('classroom.id = :classroomId', { classroomId })
            .getOne();

        if (!classroom || !user) {
            throw new NotFoundException('Error when get classroom and user!');
        }

        user.classrooms = user.classrooms.filter(
            (item) => item.id !== classroom.id,
        );
        await this.userRepository.save(user);

        return { success: true };
    }

    /**
     * Find single user
     */
    findOne(
        findData: FindConditions<UserEntity>,
    ): Promise<Optional<UserEntity>> {
        return this.userRepository.findOne(findData);
    }

    async findUser(queryString: SearchUserDto): Promise<UserDto[]> {
        const { email, name, gender } = queryString;

        const queryBuilder = this.userRepository
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.gender = :gender', { gender })
            .andWhere('user.name = :name', { name });

        const userEntity = await queryBuilder.getMany();

        if (!userEntity) {
            throw new UserNotFoundException();
        }

        return userEntity;
    }

    @Transactional()
    async createUser(userRegisterDto: UserRegisterDto): Promise<UserEntity> {
        const user = this.userRepository.create(userRegisterDto);

        await this.userRepository.save(user);

        return user;
    }

    async getUsers() {
        const users = await this.userRepository
            .createQueryBuilder('user')
            .getMany();

        if (!users) {
            throw new UserNotFoundException();
        }

        return users;

        // if (email) {
        //     queryBuilder.orWhere('user.email like :email', {
        //         email: `%${email}%`,
        //     });
        // }

        // if (name) {
        //     queryBuilder.orWhere('user.name like :name', {
        //         name: `%${name}%`,
        //     });
        // }

        // const [items, pageMetaDto] = await queryBuilder.paginate(
        //     pageOptionsDto,
        // );

        // return items.toPageDto(pageMetaDto);
    }

    async getUserById(userId: string): Promise<UserEntity> {
        const queryBuilder = this.userRepository.createQueryBuilder('user');

        queryBuilder.where('user.id = :userId', { userId });

        const userEntity = await queryBuilder.getOne();

        if (!userEntity) {
            throw new UserNotFoundException();
        }

        return userEntity;
    }

    async getUsersByClassroomId(classroomId: string): Promise<UserDto[]> {
        const queryBuilder = this.userRepository
            .createQueryBuilder('user')
            .leftJoin('user.classrooms', 'classroom')
            .where('classroom.id = :classroomId', { classroomId });

        const userEntity = await queryBuilder.getMany();

        if (!userEntity) {
            throw new UserNotFoundException();
        }

        return userEntity.toDtos({ excludeFields: true });
    }

    // UPDATE

    async updateUser(userId: string, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.id = :userId', { userId })
            .getOne();

        if (!user) {
            throw new NotFoundException('Error when get user');
        }

        const updatedUser = this.userRepository.merge(user, updateUserDto);

        await this.userRepository.save(updatedUser);

        return updatedUser;
    }

    // DELETE

    async deleteUser(userId: string) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.id = :userId', { userId })
            .getOne();

        if (!user) {
            throw new NotFoundException('Error when get user');
        }

        await this.userRepository.remove(user);

        return { success: true };
    }
}
