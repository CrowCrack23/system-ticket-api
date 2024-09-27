import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @ApiProperty({ type: 'string' })
  email: string;

  @MinLength(6)
  @ApiProperty({ type: 'string' })
  password: string;
}
