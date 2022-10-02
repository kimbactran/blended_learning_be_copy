import { ApiPropertyOptional } from '@nestjs/swagger';
import { Gender } from 'aws-sdk/clients/polly';

export class SearchUserDto {
    @ApiPropertyOptional()
    email: string;

    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    gender: Gender;
}
