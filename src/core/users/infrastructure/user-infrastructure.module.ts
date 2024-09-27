import { Module } from '@nestjs/common';
import { OrmUserRepository } from './persistence/orm/repositories/orm-user.repository';
import { UserRepository } from '../application/ports/user.repository';
import { PrismaService } from 'src/common/prisma';

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: OrmUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class UserInfrastructureModule {}
