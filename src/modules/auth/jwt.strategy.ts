import type { RoleType } from '@constants/index';
import { TokenType } from '@constants/index';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ApiConfigService } from '@sharedServices/api-config.service';
import type { UserEntity } from '@user/user.entity';
import { UserService } from '@user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ApiConfigService,
        private userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.authConfig.publicKey,
        });
    }

    async validate(args: {
        userAddress: string;
        role: RoleType;
        type: TokenType;
    }): Promise<UserEntity> {
        if (args.type !== TokenType.ACCESS_TOKEN) {
            throw new UnauthorizedException();
        }

        const user = await this.userService.findOne({
            address: args.userAddress,
            role: args.role,
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
