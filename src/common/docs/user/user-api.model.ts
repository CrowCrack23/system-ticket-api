import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '../../../core/users/domain/types/roles-type';

export class ApiModelUser {
  @ApiProperty({ type: 'string' })
  public id: string;

  @ApiProperty({ type: 'string' })
  public username: string;

  @ApiProperty({ type: 'string' })
  public email: string;

  @ApiProperty({ enum: Roles })
  public roles: Roles;
}
