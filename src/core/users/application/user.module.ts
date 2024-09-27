import { Module } from '@nestjs/common';
import { UserInfrastructureModule } from '../infrastructure/user-infrastructure.module';
import { UserService } from './services/user.service';
import { CreateUserCommandHandler } from './commands/handlers/create-user.command-handler';
import { UserFactory } from '../domain/factories/user.factory';
import { GetAllUsersQueryHandler } from './queries/handler/get-user.query-handler';
import { HashingService, BcryptService } from 'src/common/hashing';
import {
  CheckIfExistsEmailQueryHandler,
  GetUserByEmailQueryHandler,
  GetUserByIdQueryHandler,
} from './queries/handler';
import { UserController } from '../presenters/controllers/user.controller';

@Module({
  imports: [UserInfrastructureModule],
  exports: [],
  controllers: [UserController],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    UserService,
    CreateUserCommandHandler,
    CheckIfExistsEmailQueryHandler,
    GetUserByIdQueryHandler,
    GetUserByEmailQueryHandler,
    GetAllUsersQueryHandler,
    UserFactory,
  ],
})
export class UserModule {}
