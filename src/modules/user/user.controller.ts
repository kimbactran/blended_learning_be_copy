import { PageDto } from '@common/dto/page.dto';
import { RoleType } from '@constants/index';
import { ApiPageOkResponse, Auth, AuthUser } from '@decorators/index';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Put,
    Query,
    ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateProfileDto } from './dtos/create-profile.dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UserDto } from './dtos/user.dto';
import type { UserProfileDto } from './dtos/user-profile.dto';
import { UsersPageOptionsDto } from './dtos/users-page-options.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
    constructor(private userService: UserService) {}

    // GET

    @Get()
    @Auth([RoleType.ADMIN, RoleType.TEACHER])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
        description: 'Get users list',
        type: PageDto,
    })
    getUsers(
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: UsersPageOptionsDto,
    ): Promise<PageDto<UserDto>> {
        return this.userService.getUsers(pageOptionsDto);
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

    @Put('/profile')
    @Auth([RoleType.TEACHER, RoleType.ADMIN, RoleType.STUDENT])
    @HttpCode(HttpStatus.ACCEPTED)
    @ApiResponse({
        status: HttpStatus.ACCEPTED,
        description: 'Update user profile',
    })
    updateUserProfile(
        @AuthUser() user: UserEntity,
        @Body() updateProfile: CreateProfileDto,
    ): Promise<{ user?: UserProfileDto; success: boolean }> {
        return this.userService.updateUserProfile(user.id, updateProfile);
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
