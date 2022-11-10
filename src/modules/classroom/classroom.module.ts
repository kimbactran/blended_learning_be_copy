import { UserRepository } from '@modules/user/user.repository';
import { UserService } from '@modules/user/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidatorService } from '@sharedServices/validator.service';

import { ClassroomController } from './classroom.controller';
import { ClassroomRepository } from './classroom.repository';
import { ClassroomService } from './classroom.service';

@Module({
    imports: [TypeOrmModule.forFeature([ClassroomRepository, UserRepository])],
    controllers: [ClassroomController],
    exports: [ClassroomService],
    providers: [ClassroomService, ValidatorService, UserService],
})
export class ClassroomModule {}
