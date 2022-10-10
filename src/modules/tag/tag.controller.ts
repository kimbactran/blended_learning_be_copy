import { RoleType } from '@constants/role-type';
import { ApiPageOkResponse } from '@decorators/api-page-ok-response.decorator';
import { AuthUser } from '@decorators/auth-user.decorator';
import { Auth } from '@decorators/http.decorators';
import { UserEntity } from '@modules/user/user.entity';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateTagDto } from './dto/create-tag.dto';
import { TagDto } from './dto/tag.dto';
import { JoinTagsToPost } from './dto/tags-to-post.dto';
import { TagService } from './tag.service';

@Controller('tag')
@ApiTags('tags')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    // POST

    @Post()
    @Auth([RoleType.STUDENT, RoleType.TEACHER])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
        description: 'create tag',
        type: TagDto,
    })
    createTag(
        @AuthUser() user: UserEntity,
        @Body() createTagDto: CreateTagDto,
    ) {
        return this.tagService.createTag({
            userId: user.id,
            tag: createTagDto.tag,
        });
    }

    @Post('tags-to-post')
    @Auth([RoleType.STUDENT, RoleType.TEACHER])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
        description: 'join tags to post',
        type: TagDto,
    })
    joinTagsToPost(@Body() joinTagsToPost: JoinTagsToPost) {
        return this.tagService.joinTagsToPost(joinTagsToPost);
    }

    // GET

    // UPDATE

    // DELETE
}
