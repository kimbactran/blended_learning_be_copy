import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Query,
    ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PageDto } from '../../common/dto/page.dto';
import { RoleType } from '../../constants';
import { ApiPageOkResponse, Auth, AuthUser, UUIDParam } from '../../decorators';
import { UseLanguageInterceptor } from '../../interceptors/language-interceptor.service';
import { UserDto } from './dtos/user.dto';
import { UsersPageOptionsDto } from './dtos/users-page-options.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('admin')
    @Auth([RoleType.USER])
    @HttpCode(HttpStatus.OK)
    @UseLanguageInterceptor()
    @ApiOkResponse()
    admin(@AuthUser() user: UserEntity) {
        return {
            text: `admin ${user.firstName}`,
        };
    }

    @Get()
    @Auth([RoleType.USER])
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
    @Auth([RoleType.USER])
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get users list',
        type: UserDto,
    })
    getUser(@UUIDParam('id') userId: Uuid): Promise<UserDto> {
        return this.userService.getUser(userId);
    }
}
