// import { validateHash } from '@common/utils';
import { validateHash } from '@common/utils';
import type { RoleType } from '@constants/index';
import { TokenType } from '@constants/index';
import { UserNotFoundException } from '@exceptions/index';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { UserNotFoundException } from '@exceptions/index';
import { ApiConfigService } from '@sharedServices/api-config.service';
import type { UserEntity } from '@user/user.entity';
import { UserService } from '@user/user.service';

import { TokenPayloadDto } from './dto/TokenPayloadDto';
import type { UserLoginDto } from './dto/UserLoginDto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private configService: ApiConfigService,
        private userService: UserService,
    ) {}

    async createAccessToken(data: {
        role: RoleType;
        userAddress: string;
    }): Promise<TokenPayloadDto> {
        return new TokenPayloadDto({
            expiresIn: this.configService.authConfig.jwtExpirationTime,
            accessToken: await this.jwtService.signAsync({
                userAddress: data.userAddress,
                type: TokenType.ACCESS_TOKEN,
                role: data.role,
            }),
        });
    }

    async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
        const user = await this.userService.findOne({
            address: userLoginDto.address,
        });

        if (!user) {
            throw new UserNotFoundException();
        }

        const isPasswordValid = await validateHash(
            userLoginDto.password,
            user?.password,
        );

        if (!isPasswordValid) {
            throw new UserNotFoundException();
        }

        return user;
    }
}
