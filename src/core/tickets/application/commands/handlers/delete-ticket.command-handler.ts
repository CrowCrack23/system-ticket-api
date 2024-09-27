import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTicketCommand } from '../delete-ticket.command';
import { TicketRepository } from '../../ports/ticket.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteTicketCommand)
export class DeleteTicketCommandHandler
  implements ICommandHandler<DeleteTicketCommand>
{
  constructor(private readonly ticketRepository: TicketRepository) {}
  async execute(command: DeleteTicketCommand): Promise<any> {
    const ticket = await this.ticketRepository.getIfExists(command.id);
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    if (command.userId !== ticket.userId) {
      throw new NotFoundException('Ticket not found');
    }
    await this.ticketRepository.delete(command.id);
  }
}
