import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTicketByIdQuery } from '../get-ticket.query';
import { Ticket } from 'src/core/tickets/domain/entities/ticket';
import { TicketRepository } from '../../ports/ticket.repository';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

@QueryHandler(GetTicketByIdQuery)
export class GetTicketByIdQueryHandler
  implements IQueryHandler<GetTicketByIdQuery, Ticket>
{
  constructor(private readonly ticketRepository: TicketRepository) {}
  async execute(query: GetTicketByIdQuery): Promise<Ticket> {
    const isExists = await this.ticketRepository.checkIfExists(query.id);
    if (!isExists) {
      throw new NotFoundException(`Can't find ticket for id ${query.id}`);
    }
    const ticket = await this.ticketRepository.getIfExists(query.id);

    if (ticket.userId === query.user.sub) {
      return ticket;
    }
    if (query.user.roles === 'Admin') {
      return ticket;
    }
    throw new ForbiddenException(
      `You are not authorized to access this ticket`,
    );
  }
}
