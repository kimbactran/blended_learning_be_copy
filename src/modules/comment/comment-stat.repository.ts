import { EntityRepository, Repository } from 'typeorm';

import { CommentStatEntity } from './entities/comment-stat.entity';

@EntityRepository(CommentStatEntity)
export class CommentStatRepository extends Repository<CommentStatEntity> {}
