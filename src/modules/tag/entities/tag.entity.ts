import type { IAbstractEntity } from '@common/abstract.entity';
import { AbstractEntity } from '@common/abstract.entity';
import { UseDto } from '@decorators/index';
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

    user?: UserEntity;

    posts?: PostEntity[];
}

@Entity({ name: 'tag' })
@UseDto(TagDto)
export class TagEntity
    extends AbstractEntity<TagDto, TagDtoOptions>
    implements ITagEntity
{
    @PrimaryGeneratedColumn('uuid')
    id: Uuid;

    @Column({ unique: true, nullable: false })
    tag: string;

    @ManyToOne(() => UserEntity, (user) => user.tags)
    user: UserEntity;

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
