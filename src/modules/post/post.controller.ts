import { RoleType } from '@constants/role-type';
import { ApiPageOkResponse } from '@decorators/api-page-ok-response.decorator';
import { Auth } from '@decorators/index';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
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
}
