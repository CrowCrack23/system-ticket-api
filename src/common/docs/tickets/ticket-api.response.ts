import { ApiProperty } from '@nestjs/swagger';
import { ApiResponse } from '../common/api.response';
import { ApiModelTicket } from './ticket-api.model';

export class ApiResponseTicket extends ApiResponse {
  @ApiProperty({ type: ApiModelTicket })
  public data: ApiModelTicket;
}
