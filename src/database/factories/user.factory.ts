import { RoleType } from '@constants/index';
import { UserEntity } from '@modules/user/user.entity';
import { UserContactEntity } from '@modules/user/user-contact.entity';
import { define } from 'typeorm-seeding';

define(UserEntity, (faker) => {
    const address = faker.random.alphaNumeric(24);
    const name = faker.name.findName();
    const username = faker.internet.userName(name);
    const bio = faker.lorem.paragraph();
    const user = new UserEntity();
    const contact = new UserContactEntity();

    user.address = address;
    user.username = username;
    user.role = RoleType.USER;
    user.bio = bio;

    contact.userAddress = address;

    user.contact = contact;

    return user;
});
