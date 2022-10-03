import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import { CreatePostDto } from './dto/create-post.dto';
import type { PostDto } from './dto/post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
    constructor(private postRepository: PostRepository) {}

    @Transactional()
    async createPost(createPostDto: CreatePostDto): Promise<PostDto> {
        const post = this.postRepository.create(createPostDto);

        await this.postRepository.save(post);

        return post;
    }
}
