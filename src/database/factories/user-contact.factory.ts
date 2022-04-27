/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserEntity } from '@modules/user/user.entity';
import { UserContactEntity } from '@modules/user/user-contact.entity';
import { define, factory } from 'typeorm-seeding';

define(UserContactEntity, (faker) => {
    const facebook = faker.name.findName();
    const twitter = faker.name.findName();
    const email = faker.internet.email();
    const behance = faker.name.findName();

    const contact = new UserContactEntity();
    contact.facebook = facebook;
    contact.twitter = twitter;
    contact.behance = behance;
    contact.email = email;
    contact.userAddress = factory(UserEntity)({ roles: [] }) as any;

    return contact;
});
