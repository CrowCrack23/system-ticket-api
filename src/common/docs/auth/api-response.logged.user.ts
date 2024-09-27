import { ApiProperty } from '@nestjs/swagger';
import { ApiResponse } from '../common/api.response';
import { ApiModelLoggedInUser } from './api-model.logged.user';

export class ApiResponseLoggedInUser extends ApiResponse {
  @ApiProperty({ type: ApiModelLoggedInUser })
  public data: ApiModelLoggedInUser;
}
