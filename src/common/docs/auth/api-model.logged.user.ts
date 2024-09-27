import { ApiProperty } from '@nestjs/swagger';

export class ApiModelLoggedInUser {
  @ApiProperty({ type: 'string' })
  public refreshToken: string;

  @ApiProperty({ type: 'string' })
  public accessToken: string;
}
