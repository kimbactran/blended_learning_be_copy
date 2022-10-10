import { AbstractDto } from '@common/dto/abstract.dto';
import { ClassroomDto } from '@modules/classroom/dto/classroom.dto';
import type { TagDto } from '@modules/tag/dto/tag.dto';
import { UserDto } from '@modules/user/dtos/user.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import type { PostEntity } from '../entities/post.entity';

// TODO, remove this class and use constructor's second argument's type
export type PostDtoOptions = Partial<{
    isActive: boolean;
    excludeFields: boolean;
}>;

export class PostDto extends AbstractDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    content: string;

    @ApiPropertyOptional()
    user: UserDto;

    @ApiPropertyOptional()
    classroom: ClassroomDto;

    @ApiPropertyOptional()
    tags: TagDto[];

    @ApiPropertyOptional()
    isDelete?: boolean;

    constructor(post: PostEntity, options?: PostDtoOptions) {
        super(post, options);

        this.title = post.title;
        this.content = post.content;
        this.isDelete = options?.isActive;
        this.user = post.user?.toDto({ excludeFields: true });
        this.classroom = post.classroom?.toDto({ excludeFields: true });
        this.tags = post.tags?.toDtos({ excludeFields: true });
    }
}
