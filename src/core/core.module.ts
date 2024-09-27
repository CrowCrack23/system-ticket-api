import { Module } from '@nestjs/common';
import { UserModule } from './users/application/user.module';
import { CqrsModule } from '@nestjs/cqrs';
import { TicketModule } from './tickets/application/ticket.module';

@Module({
  imports: [CqrsModule.forRoot(), UserModule, TicketModule],
})
export class CoreModule {}
