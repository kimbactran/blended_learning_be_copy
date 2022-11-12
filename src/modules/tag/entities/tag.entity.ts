import type { IAbstractEntity } from '@common/abstract.entity';
import { AbstractEntity } from '@common/abstract.entity';
import { TagType } from '@constants/tag-type';
import { UseDto } from '@decorators/index';
import { ClassroomEntity } from '@modules/classroom/entities/classroom.entity';
import { PostEntity } from '@modules/post/entities/post.entity';
import { UserEntity } from '@modules/user/user.entity';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import type { TagDtoOptions } from '../dto/tag.dto';
import { TagDto } from '../dto/tag.dto';

export interface ITagEntity extends IAbstractEntity<TagDto> {
    id: Uuid;

    tag: string;

    parentId?: string;

    type: TagType;

    user?: UserEntity;

    posts?: PostEntity[];

    classroom?: ClassroomEntity;
}

@Entity({ name: 'tag' })
@UseDto(TagDto)
export class TagEntity
    extends AbstractEntity<TagDto, TagDtoOptions>
    implements ITagEntity
{
    @PrimaryGeneratedColumn('uuid')
    id: Uuid;

    @Column({ unique: false, nullable: false })
    tag: string;

    @Column({ nullable: true })
    parentId: string;

    @Column({ nullable: false, default: TagType.FREE })
    type: TagType;

    @ManyToOne(() => UserEntity, (user) => user.tags)
    user: UserEntity;

    @ManyToOne(() => ClassroomEntity, (classroom) => classroom.tags)
    classroom: ClassroomEntity;

    @ManyToMany(() => PostEntity)
    @JoinTable({
        name: 'post_tag',
        joinColumn: {
            name: 'tag_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'post_id',
            referencedColumnName: 'id',
        },
    })
    posts: PostEntity[];
}
