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

    isUpVote: boolean;

    isDownVote: boolean;

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

    @Column({ nullable: false, default: false })
    isUpVote: boolean;

    @Column({ nullable: false, default: false })
    isDownVote: boolean;

    @ManyToOne(() => UserEntity, (user) => user.commentStats, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(() => CommentEntity, (comment) => comment.commentStats, {
        onDelete: 'CASCADE',
    })
    comment: CommentEntity;
}
