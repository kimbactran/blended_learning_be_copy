import { EntityRepository, Repository } from 'typeorm';

import { UserContactEntity } from './user-contact.entity';

@EntityRepository(UserContactEntity)
export class UserContactRepository extends Repository<UserContactEntity> {}
