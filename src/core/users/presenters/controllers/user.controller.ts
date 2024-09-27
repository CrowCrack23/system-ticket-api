import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserService } from 'src/core/users/application/services/user.service';
import { Roles } from 'src/core/users/domain/types/roles-type';
import { Rol } from 'src/auth/decorators/roles.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType, HttpUserPayload } from 'src/auth/enums/auth-type.enum';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreApiResponse } from 'src/common/api/core-api.response';
import { HttpUser } from 'src/auth/decorators/http-user.decorator';
import { UserUseCaseDto } from '../../domain/use-case/user.use-case.dto';
import { ApiResponseUser } from 'src/common/docs/user/user-api.response';
import { CreateUserBody } from 'src/core/users/presenters/dto/create-user.body';

@Auth(AuthType.Bearer)
@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: ApiResponseUser })
  async me(
    @HttpUser() httpUser: HttpUserPayload,
  ): Promise<CoreApiResponse<UserUseCaseDto>> {
    const user = await this.userService.getMe(httpUser.sub);
    return CoreApiResponse.success(user);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @Rol(Roles.Admin)
  @ApiBody({ type: CreateUserBody })
  @ApiResponse({ status: HttpStatus.OK, type: ApiResponseUser })
  async createUser(
    @Body() body: CreateUserBody,
  ): Promise<CoreApiResponse<UserUseCaseDto>> {
    const user = await this.userService.create(body);
    return CoreApiResponse.success(user);
  }
}
