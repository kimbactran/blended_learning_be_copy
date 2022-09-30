import { EntityRepository, Repository } from 'typeorm';

import { ClassroomEntity } from './entities/classroom.entity';

@EntityRepository(ClassroomEntity)
export class ClassroomRepository extends Repository<ClassroomEntity> {}
