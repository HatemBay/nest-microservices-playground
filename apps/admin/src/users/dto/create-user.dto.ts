import { IsOptional, IsString } from 'class-validator';
import { Role } from '../../roles/entities/role.entity';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  orgId: number;

  // * if i use createRoleDto instead of role i wouldn't be able to update the user's role
  // * since request the role's id will be requested which won't be in the dto
  roles: Role[];
}
