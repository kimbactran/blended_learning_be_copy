import { UserNotFoundException } from '@exceptions/index';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import type { FindConditions } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import type { Optional } from '../../types';
import { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import type { SearchUserDto } from './dtos/search-user.dto';
import type { UpdateUserDto } from './dtos/update-user-dto';
import type { UserDto } from './dtos/user.dto';
import type { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        private commandBus: CommandBus,
    ) {}

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
