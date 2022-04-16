import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
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
    @IsNotEmpty()
    @Column()
    readonly logo: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Column()
    readonly background_banner: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Column()
    readonly bio: string;
}
