import { ApiProperty } from '@nestjs/swagger';
import { ApiResponse } from '../common/api.response';
import { ApiModelTicket } from './ticket-api.model';

export class ApiResponseTicketList extends ApiResponse {
  @ApiProperty({ type: ApiModelTicket, isArray: true })
  public data: ApiModelTicket[];
}
