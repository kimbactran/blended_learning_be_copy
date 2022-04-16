import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

    @ApiPropertyOptional()
    readonly logo: string;

    @ApiPropertyOptional()
    readonly background_banner: string;

    @ApiPropertyOptional()
    readonly bio: string;
}
