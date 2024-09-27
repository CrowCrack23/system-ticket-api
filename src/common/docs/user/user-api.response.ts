import { ApiProperty } from '@nestjs/swagger';
import { ApiResponse } from '../common/api.response';
import { ApiModelUser } from './user-api.model';

export class ApiResponseUser extends ApiResponse {
  @ApiProperty({ type: ApiModelUser })
  public data: ApiModelUser;
}
