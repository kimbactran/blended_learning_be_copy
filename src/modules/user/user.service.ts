import type { PageDto } from '@common/dto/page.dto';
import { Gender } from '@constants/index';
import { UserNotFoundException } from '@exceptions/index';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AwsS3Service } from '@sharedServices/aws-s3.service';
import { plainToClass } from 'class-transformer';
import type { FindConditions } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import type { Optional } from '../../types';
import { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import { CreateProfileCommand } from './commands/create-profile.command';
import { CreateProfileDto } from './dtos/create-profile.dto';
import type { UserDto } from './dtos/user.dto';
import type { UsersPageOptionsDto } from './dtos/users-page-options.dto';
import type { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import type { UserProfileEntity } from './user-profile.entity';
import { UserProfileRepository } from './user-profile.repository';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        private userProfileRepository: UserProfileRepository,
        private awsS3Service: AwsS3Service,
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

    async findByAddressOrUsername(
        options: Partial<{ username: string; address: string }>,
    ): Promise<Optional<UserEntity>> {
        const queryBuilder = this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect<UserEntity, 'user'>('user.profile', 'profile');

        if (options.username) {
            queryBuilder.orWhere('user.username = :username', {
                email: options.username,
            });
        }

        if (options.address) {
            queryBuilder.orWhere('user.address = :address', {
                address: options.address,
            });
        }

        return queryBuilder.getOne();
    }

    async findUser(queryString: string): Promise<UserDto> {
        const queryBuilder = this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect<UserEntity, 'user'>('user.profile', 'profile');

        queryBuilder.orWhere('user.address = :address', {
            address: queryString,
        });

        queryBuilder.orWhere('user.username = :username', {
            username: queryString,
        });

        queryBuilder.orWhere('user.email = :email', {
            email: queryString,
        });

        const userEntity = await queryBuilder.getOne();

        if (!userEntity) {
            throw new UserNotFoundException();
        }

        return userEntity.toDto({ excludeFields: true });
    }

    @Transactional()
    async createUser(userRegisterDto: UserRegisterDto): Promise<UserEntity> {
        const user = this.userRepository.create(userRegisterDto);

        await this.userRepository.save(user);

        user.profile = await this.createProfile(
            user.id,
            plainToClass(CreateProfileDto, {
                name: '',
                gender: Gender.MALE,
            }),
        );

        return user;
    }

    async getUsers(
        pageOptionsDto: UsersPageOptionsDto,
    ): Promise<PageDto<UserDto>> {
        const queryBuilder = this.userRepository.createQueryBuilder('user');

        const [items, pageMetaDto] = await queryBuilder.paginate(
            pageOptionsDto,
            { keyName: 'address' },
        );

        return items.toPageDto(pageMetaDto);
    }

    async getUserById(userId: string): Promise<UserDto> {
        const queryBuilder = this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.profile', 'profile');

        queryBuilder.where('user.id = :userId', { userId });

        const userEntity = await queryBuilder.getOne();

        if (!userEntity) {
            throw new UserNotFoundException();
        }

        return userEntity.toDto({ excludeFields: true });
    }

    async createProfile(
        userId: Uuid,
        createProfileDto: CreateProfileDto,
    ): Promise<UserProfileEntity> {
        return this.commandBus.execute<CreateProfileCommand, UserProfileEntity>(
            new CreateProfileCommand(userId, createProfileDto),
        );
    }

    async updateUserProfile(
        userId: string,
        updateProfile: CreateProfileDto,
    ): Promise<void> {
        const queryBuilder = this.userProfileRepository
            .createQueryBuilder('profile')
            .where('profile.user_id = :userId', { userId });

        const profileEntity = await queryBuilder.getOne();

        if (!profileEntity) {
            throw new NotFoundException();
        }

        const updatedProfile = this.userProfileRepository.merge(
            profileEntity,
            updateProfile,
        );

        await this.userProfileRepository.save(updatedProfile);
    }
}
