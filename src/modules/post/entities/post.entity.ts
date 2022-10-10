import type { IAbstractEntity } from '@common/abstract.entity';
import { AbstractEntity } from '@common/abstract.entity';
import { UseDto } from '@decorators/index';
import { ClassroomEntity } from '@modules/classroom/entities/classroom.entity';
import { CommentEntity } from '@modules/comment/entities/comment.entity';
import { TagEntity } from '@modules/tag/entities/tag.entity';
import { UserEntity } from '@modules/user/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

import type { PostDtoOptions } from '../dto/post.dto';
import { PostDto } from '../dto/post.dto';
import { PostStatEntity } from './post-stat.entity';

export interface IPostEntity extends IAbstractEntity<PostDto> {
    id: Uuid;

    title: string;

    content: string;

    user?: UserEntity;

    classroom?: ClassroomEntity;

    postStats?: PostStatEntity[];

    comments?: CommentEntity[];

    tags?: TagEntity[];
}

@Entity({ name: 'post' })
@UseDto(PostDto)
export class PostEntity
    extends AbstractEntity<PostDto, PostDtoOptions>
    implements IPostEntity
{
    @PrimaryGeneratedColumn('uuid')
    id: Uuid;

    @Column({ unique: true, nullable: false })
    title: string;

    @Column({ nullable: false })
    content: string;

    @ManyToOne(() => UserEntity, (user) => user.posts)
    user: UserEntity;

    @ManyToOne(() => ClassroomEntity, (classroom) => classroom.posts)
    classroom: ClassroomEntity;

    @OneToMany(() => PostStatEntity, (postStat) => postStat.post, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    postStats: PostStatEntity[];

    @OneToMany(() => CommentEntity, (comment) => comment.post)
    @JoinColumn()
    comments: CommentEntity[];

    @ManyToMany(() => TagEntity, (tag) => tag.posts)
    @JoinTable({
        name: 'post_tag',
        joinColumn: {
            name: 'post_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'tag_id',
            referencedColumnName: 'id',
        },
    })
    tags: TagEntity[];
}
