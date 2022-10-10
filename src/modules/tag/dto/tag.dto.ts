import { AbstractDto } from '@common/dto/abstract.dto';
import type { PostDto } from '@modules/post/dto/post.dto';
import { UserDto } from '@modules/user/dtos/user.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import type { TagEntity } from '../entities/tag.entity';

// TODO, remove this class and use constructor's second argument's type
export type TagDtoOptions = Partial<{
    isActive: boolean;
    excludeFields: boolean;
}>;

export class TagDto extends AbstractDto {
    @ApiProperty()
    tag: string;

    @ApiPropertyOptional()
    user: UserDto;

    @ApiPropertyOptional()
    posts: PostDto[];

    constructor(tag: TagEntity, options?: TagDtoOptions) {
        super(tag, options);

        this.tag = tag.tag;
        this.user = tag.user?.toDto({ excludeFields: true });
        this.posts = tag.posts?.toDtos({ excludeFields: true });
    }
}
