import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllMyTicketsQuery } from '../get-ticket.query';
import { Ticket } from 'src/core/tickets/domain/entities/ticket';
import { TicketRepository } from '../../ports/ticket.repository';

@QueryHandler(GetAllMyTicketsQuery)
export class GetAllMyTicketsQueryHandler
  implements IQueryHandler<GetAllMyTicketsQuery, Ticket[] | null>
{
  constructor(private readonly ticketRepository: TicketRepository) {}
  async execute(query: GetAllMyTicketsQuery): Promise<Ticket[] | null> {
    const skip = (query.page - 1) * query.limit;
    return await this.ticketRepository.findTicketsByStatus(
      query.userId,
      skip,
      query.limit,
      query.status,
    );
  }
}
