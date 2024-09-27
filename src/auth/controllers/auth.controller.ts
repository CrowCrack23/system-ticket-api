import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { AuthType, HttpLoggedInUser } from '../enums/auth-type.enum';
import { Auth } from '../decorators/auth.decorator';
import { CoreApiResponse } from 'src/common/api/core-api.response';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseLoggedInUser } from 'src/common/docs/auth/api-response.logged.user';

@Auth(AuthType.None)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: SignInDto })
  @ApiResponse({ status: HttpStatus.OK, type: ApiResponseLoggedInUser })
  async login(
    @Body() signInDto: SignInDto,
  ): Promise<CoreApiResponse<HttpLoggedInUser>> {
    const data = await this.authService.signIn(signInDto);
    return CoreApiResponse.success(data);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: SignUpDto })
  @ApiResponse({ status: HttpStatus.OK })
  register(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
