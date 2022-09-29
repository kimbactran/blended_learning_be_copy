import type { IAbstractEntity } from '@common/abstract.entity';
import { AbstractEntity } from '@common/abstract.entity';
import { Gender } from '@constants/gender';
import { UseDto } from '@decorators/index';
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import type { UserProfileDtoOptions } from './dtos/user-profile.dto';
import { UserProfileDto } from './dtos/user-profile.dto';
import type { IUserEntity } from './user.entity';
import { UserEntity } from './user.entity';

export interface IUserProfileEntity extends IAbstractEntity<UserProfileDto> {
    id: Uuid;

    name: string;

    gender: Gender;

    user: IUserEntity;
}

@Entity({ name: 'user_profile' })
@UseDto(UserProfileDto)
export class UserProfileEntity
    extends AbstractEntity<UserProfileDto, UserProfileDtoOptions>
    implements IUserProfileEntity
{
    @PrimaryGeneratedColumn('uuid')
    id: Uuid;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: Gender, default: Gender.MALE })
    gender: Gender;

    @Column({ type: 'uuid' })
    userId?: string;

    @OneToOne(() => UserEntity, (user) => user.profile, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
}
