import { AbstractDto } from '@common/dto/abstract.dto';
import { PostDto } from '@modules/post/dto/post.dto';
import { UserDto } from '@modules/user/dtos/user.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import type { CommentEntity } from '../entities/comment.entity';

// TODO, remove this class and use constructor's second argument's type
export type CommentDtoOptions = Partial<{
    isActive: boolean;
    excludeFields: boolean;
}>;

export class CommentDto extends AbstractDto {
    @ApiProperty()
    content: string;

    @ApiPropertyOptional()
    parentId: Uuid;

    @ApiPropertyOptional()
    user: UserDto;

    @ApiPropertyOptional()
    post: PostDto;

    @ApiPropertyOptional()
    isDelete?: boolean;

    constructor(comment: CommentEntity, options?: CommentDtoOptions) {
        super(comment, options);

        this.content = comment.content;
        this.parentId = comment.parentId;
        this.isDelete = options?.isActive;
        this.user = comment.user?.toDto({ excludeFields: true });
        this.post = comment.post?.toDto({ excludeFields: true });
    }
}
