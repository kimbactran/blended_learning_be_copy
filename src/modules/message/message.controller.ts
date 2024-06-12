import { RoleType } from '@constants/role-type';
import { AuthUser } from '@decorators/auth-user.decorator';
import { Auth } from '@decorators/http.decorators';
import { UserEntity } from '@modules/user/user.entity';
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateMessageDto } from './dto/create-message.dto';
import { MessageDto } from './dto/message.dto';
import { MessageEntity } from './entities/message.entity';
import { MessageService } from './message.service';

@Controller('message')
@ApiTags('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    // POST

    @Post()
    @Auth([RoleType.STUDENT, RoleType.ADMIN, RoleType.TEACHER])
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Create message',
        type: MessageEntity,
    })
    createMessage(
        @AuthUser() user: UserEntity,
        @Body() createMessageDto: CreateMessageDto,
    ) {
        return this.messageService.createComment({
            userId: user.id,
            createMessageDto,
        });
    }

    // GET

    @Get()
    @Auth([RoleType.TEACHER, RoleType.ADMIN, RoleType.STUDENT])
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get message by senId and receiverId',
        type: MessageEntity,
    })
    getMessages(
        @AuthUser() user: UserEntity,
        @Query('sendId') sendId: string,
        @Query('receiverId') receiverId: string,
    ) {
        return this.messageService.getMessages(user, sendId, receiverId);
    }

    @Get(':receiver_id')
    @Auth([RoleType.TEACHER, RoleType.ADMIN, RoleType.STUDENT])
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get by receiver_id',
        type: MessageDto,
    })
    getCommentById(@Param('receiver_id') commentId: string) {
        return this.messageService.getReceiver(commentId);
    }
}
