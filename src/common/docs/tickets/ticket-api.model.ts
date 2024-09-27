import { ApiProperty } from '@nestjs/swagger';
import { Status } from 'src/core/tickets/domain/types/status.enum';

export class ApiModelTicket {
  @ApiProperty({ type: 'string' })
  public id: string;

  @ApiProperty({ type: 'string' })
  public title: string;

  @ApiProperty({ type: 'string' })
  public description: string;

  @ApiProperty({ type: 'string' })
  public userId: string;

  @ApiProperty({ enum: Status })
  public status: Status;

  @ApiProperty({ type: Date })
  public createdAt: Date;

  @ApiProperty({ type: 'string' })
  public updatedAt: Date;
}
