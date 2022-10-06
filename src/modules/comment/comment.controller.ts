import { RoleType } from '@constants/role-type';
import { Auth } from '@decorators/http.decorators';
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get(':id')
    @Auth([RoleType.TEACHER, RoleType.ADMIN, RoleType.STUDENT])
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get comment by id',
        type: CommentDto,
    })
    getCommentById(@Param('id') commentId: string): Promise<CommentDto> {
        return this.commentService.getCommentById(commentId);
    }
}
