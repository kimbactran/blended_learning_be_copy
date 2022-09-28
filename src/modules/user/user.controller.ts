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

import { CreateContactDto } from './dtos/create-contact.dto';
import { UserDto } from './dtos/user.dto';
import { UsersPageOptionsDto } from './dtos/users-page-options.dto';
import { UserEntity } from './user.entity';
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

    @Get(':address')
    @Auth([RoleType.TEACHER, RoleType.ADMIN])
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get user info',
        type: UserDto,
    })
    getUser(
        @Param('address') userAddress: string,
        @AuthUser() user: UserEntity,
    ): Promise<UserDto> {
        if (user.address !== userAddress) {
            throw new UnauthorizedException();
        }

        return this.userService.getUserByAddress(userAddress);
    }

    @Put('/contact')
    @Auth([RoleType.TEACHER, RoleType.ADMIN])
    @HttpCode(HttpStatus.ACCEPTED)
    @ApiResponse({
        status: HttpStatus.ACCEPTED,
        description: 'Update user contact',
    })
    updateUserContact(
        @AuthUser() user: UserEntity,
        @Body() updateContact: CreateContactDto,
    ): Promise<void> {
        return this.userService.updateUserContact(user.address, updateContact);
    }

    @Get('search')
    @Auth([RoleType.TEACHER])
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get user info',
        type: UserDto,
    })
    searchUser(@Query('q') queryString: string): Promise<UserDto> {
        return this.userService.findUser(queryString);
    }

    // @Get('/kyc-callback')
}
