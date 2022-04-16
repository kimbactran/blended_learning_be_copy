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
import type { UserContactDtoOptions } from './dtos/user-contact.dto';
import { UserContactDto } from './dtos/user-contact.dto';
import type { IUserEntity } from './user.entity';
import { UserEntity } from './user.entity';

export interface IUserContactEntity extends IAbstractEntity<UserContactDto> {
    id: Uuid;

    twitter?: string;

    facebook?: string;

    email?: string;

    behance?: string;

    user: IUserEntity;
}

@Entity({ name: 'user_contact' })
@UseDto(UserContactDto)
export class UserContactEntity
    extends AbstractEntity<UserContactDto, UserContactDtoOptions>
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
