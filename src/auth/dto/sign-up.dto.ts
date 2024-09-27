import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @ApiProperty({ type: 'string' })
  username: string;
  @IsEmail()
  @ApiProperty({ type: 'string' })
  email: string;

  @MinLength(6)
  @ApiProperty({ type: 'string' })
  password: string;
}
