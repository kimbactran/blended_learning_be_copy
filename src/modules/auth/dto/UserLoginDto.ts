import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserLoginDto {
    @IsString()
    @ApiProperty()
    readonly address: string;
}
