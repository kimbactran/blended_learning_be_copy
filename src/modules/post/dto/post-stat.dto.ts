import { AbstractDto } from '@common/dto/abstract.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import type { PostStatEntity } from '../entities/post-stat.entity';

// TODO, remove this class and use constructor's second argument's type
export type PostStatDtoOptions = Partial<{
    excludeFields: boolean;
}>;

export class PostStatDto extends AbstractDto {
    @ApiProperty()
    upVote: number;

    @ApiProperty()
    downVote: number;

    @ApiProperty()
    isViewed: number;

    @ApiPropertyOptional()
    userId: string;

    @ApiPropertyOptional()
    postId: string;

    constructor(postStat: PostStatEntity, options?: PostStatDtoOptions) {
        super(postStat, options);

        this.upVote = postStat.upVote;
        this.downVote = postStat.downVote;
        this.isViewed = postStat.isViewed;
        this.userId = postStat.user?.id;
        this.postId = postStat.post?.id;
    }
}
