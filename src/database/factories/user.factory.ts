import { Gender, RoleType } from '@constants/index';
import { UserEntity } from '@modules/user/user.entity';
import { define } from 'typeorm-seeding';

define(UserEntity, (faker) => {
    const email = faker.internet.email();
    const password = '1111';
    const name = faker.name.findName();
    const user = new UserEntity();

    user.email = email;
    user.password = password;
    user.role = RoleType.STUDENT;

    user.name = name;
    user.gender = Gender.MALE;

    return user;
});
