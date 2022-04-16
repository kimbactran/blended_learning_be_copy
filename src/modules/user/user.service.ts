import type { PageDto } from '@common/dto/page.dto';
import { UserNotFoundException } from '@exceptions/index';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AwsS3Service } from '@sharedServices/aws-s3.service';
import { ValidatorService } from '@sharedServices/validator.service';
import { plainToClass } from 'class-transformer';
import type { FindConditions } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import type { Optional } from '../../types';
import { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import { CreateContactCommand } from './commands/create-contact.command';
import { CreateContactDto } from './dtos/create-contact.dto';
import type { UserDto } from './dtos/user.dto';
import type { UsersPageOptionsDto } from './dtos/users-page-options.dto';
import type { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import type { UserContactEntity } from './user-contact.entity';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        private validatorService: ValidatorService,
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
            .leftJoinAndSelect<UserEntity, 'user'>('user.contact', 'contact');

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

    @Transactional()
    async createUser(userRegisterDto: UserRegisterDto): Promise<UserEntity> {
        const user = this.userRepository.create(userRegisterDto);

        await this.userRepository.save(user);

        user.contact = await this.createContact(
            user.address,
            plainToClass(CreateContactDto, {
                twitter: '',
                facebook: '',
                email: '',
                behance: '',
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

    async getUser(userAddress: string): Promise<UserDto> {
        const queryBuilder = this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.contact', 'contact');

        queryBuilder.where('user.address = :userAddress', { userAddress });

        const userEntity = await queryBuilder.getOne();

        if (!userEntity) {
            throw new UserNotFoundException();
        }

        return userEntity.toDto({ excludeFields: true });
    }

    async createContact(
        userAddress: string,
        createContactDto: CreateContactDto,
    ): Promise<UserContactEntity> {
        return this.commandBus.execute<CreateContactCommand, UserContactEntity>(
            new CreateContactCommand(userAddress, createContactDto),
        );
    }
}
