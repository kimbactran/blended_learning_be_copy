import type { IAbstractEntity } from '@common/abstract.entity';
import { AbstractEntity } from '@common/abstract.entity';
import { RoleType } from '@constants/index';
import { UseDto } from '@decorators/index';
import { ClassroomEntity } from '@modules/classroom/entities/classroom.entity';
import { CommentEntity } from '@modules/comment/entities/comment.entity';
import { CommentStatEntity } from '@modules/comment/entities/comment-stat.entity';
import { PostEntity } from '@modules/post/entities/post.entity';
import { PostStatEntity } from '@modules/post/entities/post-stat.entity';
import { TagEntity } from '@modules/tag/entities/tag.entity';
import { Exclude } from 'class-transformer';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import type { UserDtoOptions } from './dtos/user.dto';
import { UserDto } from './dtos/user.dto';
import { UserProfileEntity } from './user-profile.entity';

export interface IUserEntity extends IAbstractEntity<UserDto> {
    id: Uuid;

    role: RoleType;

    email: string;

    password?: string;

    profile?: UserProfileEntity;

    classrooms: ClassroomEntity[];

    posts?: PostEntity[];

    postStats?: PostStatEntity[];

    comments?: CommentEntity[];

    commentStats?: CommentStatEntity[];

    tags?: TagEntity[];
}

@Entity({ name: 'user' })
@UseDto(UserDto)
export class UserEntity
    extends AbstractEntity<UserDto, UserDtoOptions>
    implements IUserEntity
{
    @PrimaryGeneratedColumn('uuid')
    id: Uuid;

    @Column({ type: 'enum', enum: RoleType, default: RoleType.STUDENT })
    role: RoleType;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: true })
    @Exclude()
    password?: string;

    @OneToOne(() => UserProfileEntity, (userProfile) => userProfile.user)
    profile: UserProfileEntity;

    @ManyToMany(() => ClassroomEntity)
    @JoinTable({
        name: 'user_classroom',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'classroom_id',
            referencedColumnName: 'id',
        },
    })
    classrooms: ClassroomEntity[];

    @OneToMany(() => PostEntity, (post) => post.user)
    @JoinColumn()
    posts: PostEntity[];

    @OneToMany(() => PostStatEntity, (postStat) => postStat.user)
    postStats: PostStatEntity[];

    @OneToMany(() => CommentEntity, (comment) => comment.user)
    @JoinColumn()
    comments: CommentEntity[];

    @OneToMany(() => CommentStatEntity, (commentStat) => commentStat.user)
    @JoinColumn()
    commentStats: CommentStatEntity[];

    @OneToMany(() => TagEntity, (tag) => tag.user)
    @JoinColumn()
    tags: TagEntity[];
}
