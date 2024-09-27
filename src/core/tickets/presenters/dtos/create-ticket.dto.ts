import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @ApiProperty({ type: 'string' })
  title: string;
  @IsString()
  @ApiProperty({ type: 'string' })
  description: string;
}
