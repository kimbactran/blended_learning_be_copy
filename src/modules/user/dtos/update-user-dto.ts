import { UserRegisterDto } from '@modules/auth/dto/UserRegisterDto';
import { PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(UserRegisterDto) {}
