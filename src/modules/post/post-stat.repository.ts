import { EntityRepository, Repository } from 'typeorm';

import { PostStatEntity } from './entities/post-stat.entity';

@EntityRepository(PostStatEntity)
export class PostStatRepository extends Repository<PostStatEntity> {}
