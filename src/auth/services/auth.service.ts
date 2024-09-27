import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { HashingService } from '../../common/hashing/hashing.service';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { SignUpDto } from '../dto/sign-up.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/core/users/application/commands/create-user.command';
import { SignInDto } from '../dto/sign-in.dto';
import { GetUserByEmailQuery } from 'src/core/users/application/queries/get-user.query';
import { randomUUID } from 'crypto';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  async signUp(signUpDto: SignUpDto) {
    return this.commandBus.execute(
      new CreateUserCommand({
        email: signUpDto.email,
        password: signUpDto.password,
        username: signUpDto.username,
      }),
    );
  }
  async signIn(signInDto: SignInDto) {
    const user = await this.queryBus.execute(
      new GetUserByEmailQuery(signInDto.email),
    );
    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }
    const isEqual = await this.hashingService.compare(
      signInDto.password,
      user.password,
    );
    if (!isEqual) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return await this.generateTokens({
      sub: user.id,
      email: user.email,
      roles: user.roles,
    });
  }

  async generateTokens(user: ActiveUserData) {
    const refreshTokenId = randomUUID();
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.sub,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email, roles: user.roles },
      ),
      this.signToken(user.sub, this.jwtConfiguration.refreshTokenTtl, {
        refreshTokenId,
      }),
    ]);
    return {
      refreshToken,
      accessToken,
    };
  }
  private async signToken<T>(userId: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }
}
