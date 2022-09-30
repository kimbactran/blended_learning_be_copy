/* eslint-disable import/no-default-export */
import { ClassroomEntity } from '@modules/classroom/entities/classroom.entity';
import type { Factory, Seeder } from 'typeorm-seeding';

export default class CreateClassrooms implements Seeder {
    public async run(factory: Factory): Promise<void> {
        await factory(ClassroomEntity)().createMany(30);
    }
}
