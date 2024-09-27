import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserBody {
  @IsString()
  @ApiProperty({ type: 'string' })
  public username: string;
  @IsString()
  @ApiProperty({ type: 'string' })
  public email: string;
  @IsString()
  @ApiProperty({ type: 'string' })
  public password: string;
}
