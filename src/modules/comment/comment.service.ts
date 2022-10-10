import type { VoteDto } from '@modules/post/dto/vote.dto';
import { PostService } from '@modules/post/post.service';
import { UserService } from '@modules/user/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { DeleteDto } from 'shared/dto/delete-dto';

import { CommentRepository } from './comment.repository';
import { CommentStatRepository } from './comment-stat.repository';
import type { CreateCommentDto } from './dto/create-comment.dto';
import type { UpdateCommentDto } from './dto/update-comment.dto';
import type { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
    constructor(
        private userService: UserService,
        private postService: PostService,
        private commentRepository: CommentRepository,
        private commentStatRepository: CommentStatRepository,
    ) {}

    async createComment(body: {
        userId: string;
        createCommentDto: CreateCommentDto;
    }): Promise<CommentEntity> {
        const { userId, createCommentDto } = body;

        const { content, parentId, postId } = createCommentDto;

        const user = await this.userService.getUserById(userId);

        const post = await this.postService.getPostById(postId);

        if (!user || !post) {
            throw new NotFoundException('Error when get user or post');
        }

        const comment = this.commentRepository.create({
            user,
            post,
            content,
            parentId,
        });

        await this.commentRepository.save(comment);

        return comment;
    }

    async getCommentsByPostId(postId: string): Promise<CommentEntity[]> {
        const comments = await this.commentRepository
            .createQueryBuilder('comment')
            .where('comment.post_id = :postId', { postId })
            .getMany();

        if (!comments) {
            throw new NotFoundException('Comments not found!');
        }

        return comments;
    }

    async getCommentById(commentId: string): Promise<CommentEntity> {
        const comment = await this.commentRepository
            .createQueryBuilder('comment')
            .where('comment.id = :commentId', { commentId })
            .getOne();

        if (!comment) {
            throw new NotFoundException('Comment not found!');
        }

        return comment;
    }

    // UPDATE

    async updateComment(body: {
        userId: string;
        commentId: string;
        updateCommentDto: UpdateCommentDto;
    }) {
        const { userId, commentId, updateCommentDto } = body;

        const comment = await this.commentRepository
            .createQueryBuilder('comment')
            .where('comment.id = :commentId', { commentId })
            .andWhere('comment.user_id = :userId', { userId })
            .getOne();

        if (!comment) {
            throw new NotFoundException('Comment not found!');
        }

        const updatedComment = this.commentRepository.merge(
            comment,
            updateCommentDto,
        );
        await this.commentRepository.save(updatedComment);

        return updatedComment;
    }

    async voteComment(body: {
        userId: string;
        commentId: string;
        voteDto: VoteDto;
    }): Promise<DeleteDto> {
        const { userId, commentId, voteDto } = body;

        const { isUpVote, isDownVote } = voteDto;

        const commentStat = await this.commentStatRepository
            .createQueryBuilder('comment_stat')
            .where('comment_stat.comment_id = :commentId', { commentId })
            .andWhere('comment_stat.user_id = :userId', { userId })
            .getOne();

        if (!commentStat) {
            const user = await this.userService.getUserById(userId);
            const comment = await this.getCommentById(commentId);

            if (!user || !comment) {
                throw new NotFoundException('Error when get user or comment');
            }

            const newCommentStat = this.commentStatRepository.create({
                user,
                comment,
                ...voteDto,
            });
            await this.commentStatRepository.save(newCommentStat);

            return { success: true };
        }

        commentStat.isUpVote = isUpVote || false;
        commentStat.isDownVote = isDownVote || false;
        await this.commentStatRepository.save(commentStat);

        return { success: true };
    }

    // DELETE

    async deleteComment(userId: string, commentId: string): Promise<DeleteDto> {
        const comment = await this.commentRepository
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.commentStats', 'commentStat')
            .where('comment.id = :commentId', { commentId })
            .andWhere('comment.user_id = :userId', { userId })
            .getOne();

        if (!comment) {
            throw new NotFoundException('Post not found!');
        }

        await this.commentRepository.remove(comment);

        return { success: true };
    }
}
