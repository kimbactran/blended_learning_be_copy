import { RoleType } from '@constants/role-type';
import { AuthUser } from '@decorators/auth-user.decorator';
import { Auth } from '@decorators/http.decorators';
import { VoteDto } from '@modules/post/dto/vote.dto';
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

import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsDto } from './dto/get-comments.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Controller('comments')
@ApiTags('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    // POST

    @Post()
    @Auth([RoleType.STUDENT])
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Create comment',
        type: CommentEntity,
    })
    createComment(
        @AuthUser() user: UserEntity,
        @Body() createCommentDto: CreateCommentDto,
    ) {
        return this.commentService.createComment({
            userId: user.id,
            createCommentDto,
        });
    }

    // GET

    @Get()
    @Auth([RoleType.TEACHER, RoleType.ADMIN, RoleType.STUDENT])
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get comment by post_id',
        type: CommentEntity,
    })
    getComments(
        @AuthUser() user: UserEntity,
        @Query() getCommentsDto: GetCommentsDto,
    ) {
        return this.commentService.getComments(user, getCommentsDto);
    }

    @Get(':id')
    @Auth([RoleType.TEACHER, RoleType.ADMIN, RoleType.STUDENT])
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get comment by id',
        type: CommentDto,
    })
    getCommentById(@Param('id') commentId: string) {
        return this.commentService.getCommentById(commentId);
    }

    // UPDATE

    @Put(':id')
    @Auth([RoleType.STUDENT])
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Update comment',
        type: CommentDto,
    })
    updateComment(
        @AuthUser() user: UserEntity,
        @Param('id') commentId: string,
        @Body() updateCommentDto: UpdateCommentDto,
    ) {
        return this.commentService.updateComment({
            userId: user.id,
            commentId,
            updateCommentDto,
        });
    }

    @Put('vote/:id')
    @Auth([RoleType.STUDENT])
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Update comment',
        type: CommentDto,
    })
    voteComment(
        @AuthUser() user: UserEntity,
        @Param('id') commentId: string,
        @Body() voteDto: VoteDto,
    ) {
        return this.commentService.voteComment({
            userId: user.id,
            commentId,
            voteDto,
        });
    }

    // DELETE

    @Delete(':id')
    @Auth([RoleType.STUDENT])
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Delete comment',
        type: DeleteDto,
    })
    deletePost(@AuthUser() user: UserEntity, @Param('id') commentId: string) {
        return this.commentService.deleteComment(user.id, commentId);
    }
}
