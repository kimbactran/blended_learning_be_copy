import type { IAbstractEntity } from '@common/abstract.entity';
import { AbstractEntity } from '@common/abstract.entity';
import { UseDto } from '@decorators/index';
import { UserEntity } from '@modules/user/user.entity';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

import type { ClassroomDtoOptions } from '../dto/classroom.dto';
import { ClassroomDto } from '../dto/classroom.dto';

export interface IClassroomEntity extends IAbstractEntity<ClassroomDto> {
    id: Uuid;

    title: string;

    resources: string;

    users: UserEntity[];
}

@Entity({ name: 'classroom' })
@UseDto(ClassroomDto)
export class ClassroomEntity
    extends AbstractEntity<ClassroomDto, ClassroomDtoOptions>
    implements IClassroomEntity
{
    @PrimaryGeneratedColumn('uuid')
    id: Uuid;

    @Column({ unique: true, nullable: false })
    title: string;

    @Column({ nullable: true })
    resources: string;

    @ManyToMany(() => UserEntity, (user) => user.classrooms)
    @JoinTable()
    users: UserEntity[];
}
