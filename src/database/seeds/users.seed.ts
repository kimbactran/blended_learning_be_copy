/* eslint-disable import/no-default-export */
import { UserProfileEntity } from '@modules/user/user-profile.entity';
import type { Factory, Seeder } from 'typeorm-seeding';

export default class CreateUsers implements Seeder {
    public async run(factory: Factory): Promise<void> {
        await factory(UserProfileEntity)().createMany(12);
    }
}
