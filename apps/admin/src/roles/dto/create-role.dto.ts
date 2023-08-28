import { IsString } from 'class-validator';
import { CreateUserDto } from '../../users/dto/create-user.dto';

export class CreateRoleDto {
  @IsString()
  name: string;

  users: CreateUserDto[];
}
