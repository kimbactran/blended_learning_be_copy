/* eslint-disable import/no-default-export */
import { UserContactEntity } from '@modules/user/user-contact.entity';
import type { Factory, Seeder } from 'typeorm-seeding';

export default class CreateUsers implements Seeder {
    public async run(factory: Factory): Promise<void> {
        await factory(UserContactEntity)().createMany(12);
    }
}
