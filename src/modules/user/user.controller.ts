import { PageDto } from '@common/dto/page.dto';
import { RoleType } from '@constants/index';
import { ApiPageOkResponse, Auth } from '@decorators/index';
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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { JoinClassroomsDto } from './dtos/join-classrooms.dto';
import { RemoveClassroomFromUserDto } from './dtos/remove-classroom-from-user.dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
    constructor(private userService: UserService) {}

    // POST

    @Post('/join-classrooms')
    @Auth([RoleType.ADMIN, RoleType.TEACHER])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
        description: 'join classrooms to user',
        type: UserDto,
    })
    joinUsersToClass(@Body() joinClassroomsDto: JoinClassroomsDto) {
        return this.userService.joinClassroomsToUser(joinClassroomsDto);
    }

    @Post('remove-classroom-from-user')
    @Auth([RoleType.ADMIN, RoleType.TEACHER])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
        description: 'Remove classroom from user',
        type: UserDto,
    })
    removeClassroomFromUser(
        @Body() removeClassroomFromUserDto: RemoveClassroomFromUserDto,
    ) {
        return this.userService.removeClassroomFromUser(
            removeClassroomFromUserDto,
        );
    }

    // GET

    @Get()
    @Auth([RoleType.ADMIN, RoleType.TEACHER])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
        description: 'Get users list',
        type: PageDto,
    })
    getUsers() {
        return this.userService.getUsers();
    }

    @Get(':id')
    @Auth([RoleType.TEACHER, RoleType.ADMIN])
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get user info',
        type: UserDto,
    })
    getUser(@Param('id') userId: string): Promise<UserDto> {
        return this.userService.getUserById(userId);
    }

    @Get('users-by-classroom/:classroomId')
    @Auth([RoleType.ADMIN, RoleType.TEACHER, RoleType.STUDENT])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
        description: 'Get users by classroom',
        type: UserEntity,
    })
    getUsersByClassroomId(@Param('classroomId') classroomId: string) {
        return this.userService.getUsersByClassroomId(classroomId);
    }

    // UPDATE

    @Put(':id')
    @Auth([RoleType.ADMIN])
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Update user',
    })
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(id, updateUserDto);
    }

    // DELETE

    @Delete('/:id')
    @Auth([RoleType.ADMIN])
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Delete user',
    })
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }
}
