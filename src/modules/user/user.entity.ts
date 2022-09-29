import type { IAbstractEntity } from '@common/abstract.entity';
import { AbstractEntity } from '@common/abstract.entity';
import { RoleType } from '@constants/index';
import { UseDto } from '@decorators/index';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import type { UserDtoOptions } from './dtos/user.dto';
import { UserDto } from './dtos/user.dto';
import { UserProfileEntity } from './user-profile.entity';

export interface IUserEntity extends IAbstractEntity<UserDto> {
    id: Uuid;

    role: RoleType;

    email: string;

    password: string;

    profile: UserProfileEntity;
}

@Entity({ name: 'users' })
@UseDto(UserDto)
export class UserEntity
    extends AbstractEntity<UserDto, UserDtoOptions>
    implements IUserEntity
{
    @PrimaryGeneratedColumn('uuid')
    id: Uuid;

    @Column({ type: 'enum', enum: RoleType, default: RoleType.STUDENT })
    role: RoleType;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @OneToOne(() => UserProfileEntity, (userProfile) => userProfile.user)
    profile: UserProfileEntity;
}
