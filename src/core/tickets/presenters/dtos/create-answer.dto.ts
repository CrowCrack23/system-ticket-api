import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  @ApiProperty({ type: 'string' })
  content: string;
}
