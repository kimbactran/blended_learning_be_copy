/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender } from '@constants/gender';
import { UserEntity } from '@modules/user/user.entity';
import { UserProfileEntity } from '@modules/user/user-profile.entity';
import { define, factory } from 'typeorm-seeding';

define(UserProfileEntity, (faker) => {
    const name = faker.name.firstName();
    const arrGender = [...Object.values(Gender)];
    const gender = arrGender[Math.floor(Math.random() * arrGender.length)];

    const profile = new UserProfileEntity();
    profile.name = name;
    profile.gender = gender;

    profile.user = factory(UserEntity)() as any;

    return profile;
});
