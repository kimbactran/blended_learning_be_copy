import { ApiProperty } from '@nestjs/swagger';
import { uuid } from 'aws-sdk/clients/customerprofiles';
import { IsString } from 'class-validator';

export class GetMessageDto {
    @ApiProperty()
    @IsString()
    sendId?: uuid;

    @ApiProperty()
    @IsString()
    receiverId?: uuid;
}
