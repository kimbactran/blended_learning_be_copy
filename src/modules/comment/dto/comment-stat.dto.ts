import { AbstractDto } from '@common/dto/abstract.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import type { CommentStatEntity } from '../entities/comment-stat.entity';

// TODO, remove this class and use constructor's second argument's type
export type CommentStatDtoOptions = Partial<{
    excludeFields: boolean;
}>;

export class CommentStatDto extends AbstractDto {
    @ApiProperty()
    upVote: number;

    @ApiProperty()
    downVote: number;

    @ApiPropertyOptional()
    userId: string;

    @ApiPropertyOptional()
    commentId: string;

    constructor(postStat: CommentStatEntity, options?: CommentStatDtoOptions) {
        super(postStat, options);

        this.upVote = postStat.upVote;
        this.downVote = postStat.downVote;
        this.userId = postStat.user.id;
        this.commentId = postStat.comment.id;
    }
}
