/* eslint-disable import/no-default-export */
import type { Factory, Seeder } from 'typeorm-seeding';

import { UserContactEntity } from '../../modules/user/user-contact.entity';

export default class CreateUsers implements Seeder {
    public async run(factory: Factory): Promise<void> {
        await factory(UserContactEntity)().createMany(12);
    }
}
