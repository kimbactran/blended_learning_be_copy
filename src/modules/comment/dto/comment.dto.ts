import { AbstractDto } from '@common/dto/abstract.dto';
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
    userId: Uuid;

    @ApiPropertyOptional()
    postId: Uuid;

    constructor(comment: CommentEntity, options?: CommentDtoOptions) {
        super(comment, options);

        this.content = comment.content;
        this.parentId = comment.parentId;
        this.userId = comment.user.id;
        this.postId = comment.post.id;
    }
}
