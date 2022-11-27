import type { IAbstractEntity } from '@common/abstract.entity';
import { AbstractEntity } from '@common/abstract.entity';
import { UseDto } from '@decorators/index';
import { UserEntity } from '@modules/user/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import type { PostStatDtoOptions } from '../dto/post-stat.dto';
import { PostStatDto } from '../dto/post-stat.dto';
import { PostEntity } from './post.entity';

export interface IPostStatEntity extends IAbstractEntity<PostStatDto> {
    id: Uuid;

    isUpVote: boolean;

    isDownVote: boolean;

    isViewed: number;

    user?: UserEntity;

    post?: PostEntity;
}

@Entity({ name: 'post_stat' })
@UseDto(PostStatDto)
export class PostStatEntity
    extends AbstractEntity<PostStatDto, PostStatDtoOptions>
    implements IPostStatEntity
{
    @PrimaryGeneratedColumn('uuid')
    id: Uuid;

    @Column({ nullable: false, default: false })
    isUpVote: boolean;

    @Column({ nullable: false, default: false })
    isDownVote: boolean;

    @Column({ nullable: false, default: 0 })
    isViewed: number;

    @ManyToOne(() => UserEntity, (user) => user.postStats, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(() => PostEntity, (post) => post.postStats, {
        onDelete: 'CASCADE',
    })
    post: PostEntity;
}
