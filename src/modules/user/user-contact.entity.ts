import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import type { IAbstractEntity } from '../../common/abstract.entity';
import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import type { UserDtoOptions } from './dtos/user.dto';
import { UserDto } from './dtos/user.dto';
import type { IUserEntity } from './user.entity';
import { UserEntity } from './user.entity';

export interface IUserContactEntity extends IAbstractEntity<UserDto> {
    id: Uuid;

    twitter?: string;

    facebook?: string;

    email?: string;

    behance?: string;

    user: IUserEntity;
}

@Entity({ name: 'user_contact' })
@UseDto(UserDto)
export class UserContactEntity
    extends AbstractEntity<UserDto, UserDtoOptions>
    implements IUserContactEntity
{
    @PrimaryGeneratedColumn('uuid')
    id: Uuid;

    @Column()
    twitter: string;

    @Column()
    facebook: string;

    @Column()
    email: string;

    @Column()
    behance: string;

    @Column()
    userAddress: string;

    @OneToOne(() => UserEntity, (user) => user.contact, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'user_address' })
    user: UserEntity;
}
