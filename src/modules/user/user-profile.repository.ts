import { EntityRepository, Repository } from 'typeorm';

import { UserProfileEntity } from './user-profile.entity';

@EntityRepository(UserProfileEntity)
export class UserProfileRepository extends Repository<UserProfileEntity> {}
