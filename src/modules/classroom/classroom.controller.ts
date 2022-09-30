import { RoleType } from '@constants/index';
import { ApiPageOkResponse } from '@decorators/api-page-ok-response.decorator';
import { Auth } from '@decorators/http.decorators';
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ClassroomService } from './classroom.service';
import { ClassroomDto } from './dto/classroom.dto';

@Controller('classroom')
@ApiTags('classroom')
export class ClassroomController {
    constructor(private readonly classroomService: ClassroomService) {}

    @Get(':id')
    @Auth([RoleType.ADMIN, RoleType.TEACHER, RoleType.STUDENT])
    @HttpCode(HttpStatus.OK)
    @ApiPageOkResponse({
        description: 'Get classroom list',
        type: ClassroomDto,
    })
    getClassroomsByUserId(@Param('id') userId: string) {
        return this.classroomService.getClassroomsByUserId(userId);
    }
}
