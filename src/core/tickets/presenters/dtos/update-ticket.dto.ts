import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateTicketDto {
  @IsString()
  @ApiProperty({ type: 'string' })
  title: string;
  @IsString()
  @ApiProperty({ type: 'string' })
  description: string;
}
