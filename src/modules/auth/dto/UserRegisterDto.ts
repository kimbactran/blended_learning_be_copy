import { Gender, RoleType } from '@constants/index';
import { EnumField, StringField } from '@decorators/field.decorators';
import { Trim } from '@decorators/transform.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserRegisterDto {
    @ApiProperty()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @Trim()
    readonly email: string;

    @ApiProperty({ minLength: 6 })
    @IsString()
    @MinLength(6)
    readonly password: string;

    @StringField()
    name: string;

    @EnumField(() => Gender)
    gender: Gender;

    @EnumField(() => RoleType)
    role: RoleType;
}
