import { Trim } from '@decorators/transform.decorators';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Column } from 'typeorm';

export class UserRegisterDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Column()
    readonly address: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Column()
    readonly username: string;

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

    @ApiPropertyOptional()
    readonly logo: string;

    @ApiPropertyOptional()
    readonly background_banner: string;

    @ApiPropertyOptional()
    readonly bio: string;
}
