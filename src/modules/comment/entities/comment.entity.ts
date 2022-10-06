import type { IAbstractEntity } from '@common/abstract.entity';
import { AbstractEntity } from '@common/abstract.entity';
import { UseDto } from '@decorators/index';
import { PostEntity } from '@modules/post/entities/post.entity';
import { UserEntity } from '@modules/user/user.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

import type { CommentDtoOptions } from '../dto/comment.dto';
import { CommentDto } from '../dto/comment.dto';
import { CommentStatEntity } from './comment-stat.entity';

export interface ICommentEntity extends IAbstractEntity<CommentDto> {
    id: Uuid;

    content: string;

    parentId?: Uuid;

    user?: UserEntity;

    post?: PostEntity;

    commentStats?: CommentStatEntity[];
}

@Entity({ name: 'comment' })
@UseDto(CommentDto)
export class CommentEntity
    extends AbstractEntity<CommentDto, CommentDtoOptions>
    implements ICommentEntity
{
    @PrimaryGeneratedColumn('uuid')
    id: Uuid;

    @Column({ nullable: false })
    content: string;

    @Column({ nullable: true })
    parentId: Uuid;

    @Column({ nullable: false, default: false })
    isDelete: boolean;

    @ManyToOne(() => UserEntity, (user) => user.comments)
    user: UserEntity;

    @ManyToOne(() => PostEntity, (post) => post.comments)
    post: PostEntity;

    @OneToMany(() => CommentStatEntity, (commentStat) => commentStat.comment)
    commentStats: CommentStatEntity[];
}
