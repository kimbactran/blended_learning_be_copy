import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

import type { IAbstractEntity } from '../../common/abstract.entity';
import { AbstractEntity } from '../../common/abstract.entity';
import { RoleType } from '../../constants';
import { UseDto } from '../../decorators';
import type { UserDtoOptions } from './dtos/user.dto';
import { UserDto } from './dtos/user.dto';
import { UserContactEntity } from './user-contact.entity';

export interface IUserEntity extends IAbstractEntity<UserDto> {
    role: RoleType;

    username: string;

    address: string;

    logo: string;

    background_banner: string;

    bio: string;

    contact: UserContactEntity;
}

@Entity({ name: 'users' })
@UseDto(UserDto)
export class UserEntity
    extends AbstractEntity<UserDto, UserDtoOptions>
    implements IUserEntity
{
    @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
    role: RoleType;

    @PrimaryColumn({ unique: true, nullable: false })
    address: string;

    @Column({ unique: true, nullable: false })
    username: string;

    @Column({ nullable: true })
    logo: string;

    @Column({ nullable: true })
    background_banner: string;

    @Column({ nullable: true })
    bio: string;

    @OneToOne(() => UserContactEntity, (userContact) => userContact.user)
    contact: UserContactEntity;
}
