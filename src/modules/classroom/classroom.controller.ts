import { RoleType } from '@constants/index';
import { ApiPageOkResponse } from '@decorators/api-page-ok-response.decorator';
import { Auth } from '@decorators/http.decorators';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ClassroomService } from './classroom.service';
import { ClassroomDto } from './dto/classroom.dto';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { GetClassroomsDto } from './dto/get-classroom.dto';
import { JoinStudentsDto } from './dto/join-students.dto';
import { JoinTeacherDto } from './dto/join-teacher.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { UpdateStatusClassroom } from './dto/update-status-classroom.dto';

@Controller('classrooms')
@ApiTags('classrooms')
export class ClassroomController {
    constructor(private readonly classroomService: ClassroomService) {}

    // POST

    @Post()
    @Auth([RoleType.ADMIN])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
        description: 'create classroom',
        type: ClassroomDto,
    })
    createClassroom(@Body() createClassroomDto: CreateClassroomDto) {
        return this.classroomService.createClassroom(createClassroomDto);
    }

    @Post('/join-students')
    @Auth([RoleType.ADMIN, RoleType.TEACHER])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
        description: 'join students to classroom',
        type: ClassroomDto,
    })
    joinStudentsToClass(@Body() joinStudentsDto: JoinStudentsDto) {
        return this.classroomService.joinStudentsToClassroom(joinStudentsDto);
    }

    @Post('/join-teacher')
    @Auth([RoleType.ADMIN])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
        description: 'join teacher to classroom',
        type: ClassroomDto,
    })
    joinTeacherToClass(@Body() joinTeacherDto: JoinTeacherDto) {
        return this.classroomService.joinTeacherToClassroom(joinTeacherDto);
    }

    // GET

    @Get()
    @Auth([RoleType.ADMIN])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
        description: 'Get classrooms',
        type: ClassroomDto,
    })
    getClassrooms(@Param() getClassroomsDto: GetClassroomsDto) {
        return this.classroomService.getClassrooms(getClassroomsDto);
    }

    @Get(':id')
    @Auth([RoleType.ADMIN, RoleType.TEACHER, RoleType.STUDENT])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
        description: 'Get classroom by id',
        type: ClassroomDto,
    })
    getById(@Param('id') classroomId: string) {
        return this.classroomService.getByClassroomId(classroomId);
    }

    @Get('/classrooms-by-user/:userId')
    @Auth([RoleType.ADMIN, RoleType.TEACHER, RoleType.STUDENT])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
        description: 'Get classrooms by user_id',
        type: ClassroomDto,
    })
    getClassroomsByUserId(@Param('userId') userId: string) {
        return this.classroomService.getClassroomsByUserId(userId);
    }

    // PUT

    @Put('/change-status/:id')
    @Auth([RoleType.ADMIN])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
        description: 'Update status classroom',
        type: ClassroomDto,
    })
    updateStatus(
        @Param('id') id: string,
        @Body() updateStatusClassroom: UpdateStatusClassroom,
    ) {
        return this.classroomService.updateStatus(id, updateStatusClassroom);
    }

    @Put(':id')
    @Auth([RoleType.ADMIN, RoleType.TEACHER])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
        description: 'Update classroom',
        type: ClassroomDto,
    })
    updateClassroom(
        @Param('id') id: string,
        @Body() updateClassroomDto: UpdateClassroomDto,
    ) {
        return this.classroomService.updateClassroom(id, updateClassroomDto);
    }

    @Delete(':id')
    @Auth([RoleType.ADMIN])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
        description: 'Delete classroom',
        type: ClassroomDto,
    })
    deleteClassroom(@Param('id') id: string) {
        return this.classroomService.deleteClassroom(id);
    }
}
