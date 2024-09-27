import { Module } from '@nestjs/common';
import { TicketRepository } from '../application/ports/ticket.repository';
import { OrmTicketRepository } from './persistence/orm/repositories/ticket.repository';
import { PrismaService } from 'src/common/prisma';
import { AnswerRepository } from '../application/ports/answer.repository';
import { OrmAnswerRepository } from './persistence/orm/repositories/answer.repository';

@Module({
  imports: [],
  exports: [TicketRepository, AnswerRepository],
  providers: [
    {
      provide: TicketRepository,
      useClass: OrmTicketRepository,
    },
    {
      provide: AnswerRepository,
      useClass: OrmAnswerRepository,
    },
    PrismaService,
  ],
})
export class TicketInfrastructureModule {}
