import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTicketCommand } from '../update-ticket.command';
import { TicketRepository } from '../../ports/ticket.repository';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateTicketCommand)
export class UpdateTicketCommandHandler
  implements ICommandHandler<UpdateTicketCommand>
{
  constructor(private readonly ticketRepository: TicketRepository) {}
  async execute(command: UpdateTicketCommand): Promise<void> {
    const ticket = await this.ticketRepository.getIfExists(command.id);
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    if (command.userId !== ticket.userId) {
      throw new ForbiddenException(
        `You are not authorized to access this ticket`,
      );
    }
    await this.ticketRepository.update(
      command.id,
      command.title,
      command.description,
    );
  }
}
