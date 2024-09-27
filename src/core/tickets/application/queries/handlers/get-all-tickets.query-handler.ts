import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllTicketsQuery } from '../get-ticket.query';
import { Ticket } from 'src/core/tickets/domain/entities/ticket';
import { TicketRepository } from '../../ports/ticket.repository';

@QueryHandler(GetAllTicketsQuery)
export class GetAllTicketsQueryHandler
  implements IQueryHandler<GetAllTicketsQuery, Ticket[]>
{
  constructor(private readonly ticketRepository: TicketRepository) {}
  async execute(query: GetAllTicketsQuery): Promise<Ticket[]> {
    return await this.ticketRepository.findAll();
  }
}
