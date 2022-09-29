import { PageDto } from '@common/dto/page.dto';
import { RoleType } from '@constants/index';
import { ApiPageOkResponse, Auth, AuthUser } from '@decorators/index';
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Put,
    Query,
    UnauthorizedException,
    ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateProfileDto } from './dtos/create-profile.dto';
import { UserDto } from './dtos/user.dto';
import { UsersPageOptionsDto } from './dtos/users-page-options.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    @Auth([RoleType.ADMIN])
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
    getUser(
        @Param('id') userId: string,
        @AuthUser() user: UserEntity,
    ): Promise<UserDto> {
        if (user.id !== userId) {
            throw new UnauthorizedException();
        }

        return this.userService.getUserById(userId);
    }

    @Put('/profile')
    @Auth([RoleType.TEACHER, RoleType.ADMIN])
    @HttpCode(HttpStatus.ACCEPTED)
    @ApiResponse({
        status: HttpStatus.ACCEPTED,
        description: 'Update user profile',
    })
    updateUserProfile(
        @AuthUser() user: UserEntity,
        @Body() updateProfile: CreateProfileDto,
    ): Promise<void> {
        return this.userService.updateUserProfile(user.id, updateProfile);
    }

    @Get('search')
    @Auth([RoleType.TEACHER, RoleType.ADMIN])
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get user info',
        type: UserDto,
    })
    searchUser(@Query('q') queryString: string): Promise<UserDto> {
        return this.userService.findUser(queryString);
    }
}
