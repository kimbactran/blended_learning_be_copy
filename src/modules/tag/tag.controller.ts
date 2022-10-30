import { RoleType } from '@constants/role-type';
import { ApiPageOkResponse } from '@decorators/api-page-ok-response.decorator';
import { AuthUser } from '@decorators/auth-user.decorator';
import { Auth } from '@decorators/http.decorators';
import { UserEntity } from '@modules/user/user.entity';
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateSyllabusTagsDto } from './dto/create-syllabus-tags.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagDto } from './dto/tag.dto';
import { JoinTagsToPost } from './dto/tags-to-post.dto';
import { TagService } from './tag.service';

@Controller('tags')
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
            user,
            createTagDto,
        });
    }

    @Post('syllabus')
    @Auth([RoleType.TEACHER])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
        description: 'create syllabus tags',
        type: TagDto,
    })
    createSyllabusTags(
        @AuthUser() user: UserEntity,
        @Body() createSyllabusTagsDto: CreateSyllabusTagsDto,
    ) {
        return this.tagService.createSyllabusTags(user, createSyllabusTagsDto);
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

    @Get('syllabus/:classroomId')
    @Auth([RoleType.TEACHER, RoleType.ADMIN, RoleType.STUDENT])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
        description: 'get syllabus tags by classroom',
        type: TagDto,
    })
    getSyllabusTagsByClassroom(@Param('classroomId') classroomId: string) {
        return this.tagService.getSyllabusTagsByClassroom(classroomId);
    }

    @Get()
    @Auth([RoleType.TEACHER, RoleType.ADMIN, RoleType.STUDENT])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
        description: 'get tags',
        type: TagDto,
    })
    getTags(@Query('keySearch') keySearch?: string) {
        return this.tagService.getTags(keySearch);
    }

    // UPDATE

    // DELETE
}
