import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateTicketCommand } from '../create-ticket.command';
import { TicketFactory } from '../../../domain/factories/ticket.factory';
import { TicketRepository } from '../../ports/ticket.repository';
import { TicketCreatedEvent } from '../../events/create-ticket.event';

@CommandHandler(CreateTicketCommand)
export class CreateTicketCommandHandler
  implements ICommandHandler<CreateTicketCommand>
{
  constructor(
    private readonly ticketFactory: TicketFactory,
    private readonly ticketRepository: TicketRepository,
    private readonly eventBus: EventBus,
  ) {}
  async execute(command: CreateTicketCommand): Promise<void> {
    const { input } = command;
    const ticket = this.ticketFactory.create(input);
    await this.ticketRepository.save(ticket);
    await this.eventBus.publish(
      new TicketCreatedEvent(ticket.id, input.userId),
    );
  }
}
