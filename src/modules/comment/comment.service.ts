import { Injectable, NotFoundException } from '@nestjs/common';

import { CommentRepository } from './comment.repository';
import type { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
    constructor(private commentRepository: CommentRepository) {}

    async getCommentById(commentId: string): Promise<CommentDto> {
        const comment = await this.commentRepository
            .createQueryBuilder('comment')
            .where('comment.id = :commentId', { commentId })
            .getOne();

        if (!comment) {
            throw new NotFoundException('Comment not found!');
        }

        return comment;
    }
}
