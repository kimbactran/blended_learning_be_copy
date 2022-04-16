import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Query,
    ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { PageDto } from '../../common/dto/page.dto';
import { RoleType } from '../../constants';
import { ApiPageOkResponse, Auth } from '../../decorators';
import { UserDto } from './dtos/user.dto';
import { UsersPageOptionsDto } from './dtos/users-page-options.dto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
    constructor(private userService: UserService) {}

    // @Get('admin')
    // @Auth([RoleType.ADMIN])
    // @HttpCode(HttpStatus.OK)
    // @UseLanguageInterceptor()
    // @ApiOkResponse()
    // admin(@AuthUser() user: UserEntity) {
    //     return {
    //         text: `admin ${user.firstName}`,
    //     };
    // }

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

    @Get(':address')
    @Auth([RoleType.USER])
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get users list',
        type: UserDto,
    })
    getUser(@Param('address') userAddress: string): Promise<UserDto> {
        return this.userService.getUser(userAddress);
    }
}
