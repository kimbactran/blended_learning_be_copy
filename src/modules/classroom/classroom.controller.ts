import { RoleType } from '@constants/index';
import { ApiPageOkResponse } from '@decorators/api-page-ok-response.decorator';
import { Auth } from '@decorators/http.decorators';
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ClassroomService } from './classroom.service';
import { ClassroomDto } from './dto/classroom.dto';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { JoinClassroomDto } from './dto/join-classroom.dto';

@Controller('classroom')
@ApiTags('classroom')
export class ClassroomController {
    constructor(private readonly classroomService: ClassroomService) {}

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
    joinStudentsToClass(@Body() joinClassroomDto: JoinClassroomDto) {
        return this.classroomService.joinStudentsToClass(joinClassroomDto);
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

    @Get('/list-classrooms/:userId')
    @Auth([RoleType.ADMIN, RoleType.TEACHER, RoleType.STUDENT])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
        description: 'Get classroom list',
        type: ClassroomDto,
    })
    getClassroomsByUserId(@Param('userId') userId: string) {
        return this.classroomService.getClassroomsByUserId(userId);
    }
}
