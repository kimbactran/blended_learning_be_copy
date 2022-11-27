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
import { JoinUsersDto } from './dto/join-users.dto';
import { RemoveUserFromClassroomDto } from './dto/remove-user-from-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';

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

    @Post('/join-users')
    @Auth([RoleType.ADMIN, RoleType.TEACHER])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
        description: 'join users to classroom',
        type: ClassroomDto,
    })
    joinUsersToClass(@Body() joinUsersDto: JoinUsersDto) {
        return this.classroomService.joinUsersToClassroom(joinUsersDto);
    }

    @Post('remove-user-in-classroom')
    @Auth([RoleType.ADMIN, RoleType.TEACHER])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
        description: 'Remove user from classroom',
        type: ClassroomDto,
    })
    removeUserFromClassroom(
        @Body() removeUserFromClassroomDto: RemoveUserFromClassroomDto,
    ) {
        return this.classroomService.removeUserFromClassroom(
            removeUserFromClassroomDto,
        );
    }

    // GET

    @Get()
    @Auth([RoleType.ADMIN, RoleType.TEACHER])
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
