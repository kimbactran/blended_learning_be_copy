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

    upVote: number;

    downVote: number;

    isViewed: number;

    user?: UserEntity;

    posts?: PostEntity[];
}

@Entity({ name: 'post_stat' })
@UseDto(PostStatDto)
export class PostStatEntity
    extends AbstractEntity<PostStatDto, PostStatDtoOptions>
    implements IPostStatEntity
{
    @PrimaryGeneratedColumn('uuid')
    id: Uuid;

    @Column({ nullable: false })
    upVote: number;

    @Column({ nullable: false })
    downVote: number;

    @Column({ nullable: false })
    isViewed: number;

    @ManyToOne(() => UserEntity, (user) => user.postStats)
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(() => PostEntity, (post) => post.postStats)
    post: PostEntity;
}
