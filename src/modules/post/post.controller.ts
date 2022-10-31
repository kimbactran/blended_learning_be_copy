import { RoleType } from '@constants/role-type';
import { ApiPageOkResponse } from '@decorators/api-page-ok-response.decorator';
import { Auth, AuthUser } from '@decorators/index';
import { UserEntity } from '@modules/user/user.entity';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteDto } from 'shared/dto/delete-dto';

import { CreatePostDto } from './dto/create-post.dto';
import { GetPostDto, GetPostsByClassroomDto } from './dto/get-post.dto';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { VoteDto } from './dto/vote.dto';
import { PostService } from './post.service';

@Controller('posts')
@ApiTags('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    // POST

    @Post()
    @Auth([RoleType.STUDENT])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
        description: 'create post',
        type: PostDto,
    })
    createPost(
        @AuthUser() user: UserEntity,
        @Body() createPostDto: CreatePostDto,
    ) {
        return this.postService.createPost({
            userId: user.id,
            createPostDto,
        });
    }

    // GET

    @Get()
    @Auth([RoleType.TEACHER, RoleType.ADMIN, RoleType.STUDENT])
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get post',
        type: PostDto,
    })
    getPosts(@Body() getPostDto: GetPostDto) {
        return this.postService.getPosts(getPostDto);
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

    @Get('/posts-by-classroom/:classroomId')
    @Auth([RoleType.TEACHER, RoleType.ADMIN, RoleType.STUDENT])
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get posts by classroom id',
        type: PostDto,
    })
    getPostsByClassroomId(
        @AuthUser() user: UserEntity,
        @Param('classroomId') classroomId: string,
        @Query() getPostsByClassroomDto: GetPostsByClassroomDto,
    ) {
        return this.postService.getPostsByClassroomId(
            user,
            classroomId,
            getPostsByClassroomDto,
        );
    }

    // UPDATE

    @Put(':id')
    @Auth([RoleType.STUDENT])
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Update post',
        type: PostDto,
    })
    updatePost(
        @AuthUser() user: UserEntity,
        @Param('id') postId: string,
        @Body() updatePostDto: UpdatePostDto,
    ) {
        return this.postService.updatePost({
            userId: user.id,
            postId,
            updatePostDto,
        });
    }

    @Put('/vote/:id')
    @Auth([RoleType.STUDENT, RoleType.TEACHER])
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Vote post',
        type: PostDto,
    })
    votePost(
        @AuthUser() user: UserEntity,
        @Param('id') postId: string,
        @Body() voteDto: VoteDto,
    ) {
        return this.postService.votePost({ userId: user.id, postId, voteDto });
    }

    // DELETE

    @Delete(':id')
    @Auth([RoleType.STUDENT])
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Delete post',
        type: DeleteDto,
    })
    deletePost(@AuthUser() user: UserEntity, @Param('id') postId: string) {
        return this.postService.deletePost(user.id, postId);
    }
}
