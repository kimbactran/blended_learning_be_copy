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

import type { CommentStatDtoOptions } from '../dto/comment-stat.dto';
import { CommentStatDto } from '../dto/comment-stat.dto';
import { CommentEntity } from './comment.entity';

export interface ICommentStatEntity extends IAbstractEntity<CommentStatDto> {
    id: Uuid;

    upVote: number;

    downVote: number;

    user?: UserEntity;

    comment?: CommentEntity;
}

@Entity({ name: 'comment_stat' })
@UseDto(CommentStatDto)
export class CommentStatEntity
    extends AbstractEntity<CommentStatDto, CommentStatDtoOptions>
    implements ICommentStatEntity
{
    @PrimaryGeneratedColumn('uuid')
    id: Uuid;

    @Column({ nullable: false, default: 0 })
    upVote: number;

    @Column({ nullable: false, default: 0 })
    downVote: number;

    @ManyToOne(() => UserEntity, (user) => user.commentStats)
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(() => CommentEntity, (comment) => comment.commentStats)
    comment: CommentEntity;
}
