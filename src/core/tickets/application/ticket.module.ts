import { Module } from '@nestjs/common';
import { TicketController } from '../presenters/controllers/ticket.controller';
import { TicketService } from './services/ticket.service';
import { TicketInfrastructureModule } from '../infrastructure/ticket-infrastructure.module';
import { CreateTicketCommandHandler } from './commands/handlers/create-ticket.command-handler';
import { TicketFactory } from '../domain/factories/ticket.factory';
import {
  ChangeStatusCommandHandler,
  CreateAnswerCommandHandler,
  DeleteTicketCommandHandler,
  UpdateTicketCommandHandler,
} from './commands/handlers';
import {
  GetTicketByIdQueryHandler,
  GetAllTicketsQueryHandler,
  GetAllMyTicketsQueryHandler,
} from './queries/handlers';
import { TicketCreatedEventHandler } from './events/handler/create-ticket.event-handler';
import { WebsocketsGateway } from 'src/ws/ws.gateway';

@Module({
  controllers: [TicketController],
  imports: [TicketInfrastructureModule],
  providers: [
    WebsocketsGateway,
    TicketService,
    CreateTicketCommandHandler,
    CreateAnswerCommandHandler,
    ChangeStatusCommandHandler,
    GetTicketByIdQueryHandler,
    GetAllMyTicketsQueryHandler,
    GetAllTicketsQueryHandler,
    UpdateTicketCommandHandler,
    DeleteTicketCommandHandler,
    TicketCreatedEventHandler,
    TicketFactory,
  ],
})
export class TicketModule {}
