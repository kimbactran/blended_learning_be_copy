import { Gender, RoleType } from '@constants/index';
import { UserEntity } from '@modules/user/user.entity';
import { UserProfileEntity } from '@modules/user/user-profile.entity';
import { define } from 'typeorm-seeding';

define(UserEntity, (faker) => {
    const email = faker.internet.email;
    const password = faker.internet.password;
    const name = faker.name.findName();
    const user = new UserEntity();
    const profile = new UserProfileEntity();

    user.email = email;
    user.password = password;
    user.role = RoleType.STUDENT;

    profile.name = name;
    profile.gender = Gender.MALE;

    user.profile = profile;

    return user;
});
