import { RoleType } from '@constants/role-type';
import { ApiPageOkResponse } from '@decorators/api-page-ok-response.decorator';
import { Auth } from '@decorators/index';
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreatePostDto } from './dto/create-post.dto';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
@ApiTags('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    @Auth([RoleType.STUDENT])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
        description: 'create post',
        type: PostDto,
    })
    createPost(@Body() createPostDto: CreatePostDto) {
        return this.postService.createPost(createPostDto);
    }

    @Get(':id')
    @Auth([RoleType.TEACHER, RoleType.ADMIN, RoleType.STUDENT])
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get post by id',
        type: PostDto,
    })
    getPostById(@Param('id') postId: string): Promise<PostDto> {
        return this.postService.getPostById(postId);
    }
}
