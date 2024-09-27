import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TicketCreatedEvent } from '../create-ticket.event';
import { WebsocketsGateway } from 'src/ws/ws.gateway';

@EventsHandler(TicketCreatedEvent)
export class TicketCreatedEventHandler
  implements IEventHandler<TicketCreatedEvent>
{
  constructor(private readonly websocketsGateway: WebsocketsGateway) {}

  async handle(event: TicketCreatedEvent): Promise<void> {
    const { ticketId } = event;

    this.websocketsGateway.notifyAdmin(ticketId);
  }
}
