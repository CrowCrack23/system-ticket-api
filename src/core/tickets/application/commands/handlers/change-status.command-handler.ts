import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChangeStatusCommand } from '../change-status.command';
import { TicketRepository } from '../../ports/ticket.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(ChangeStatusCommand)
export class ChangeStatusCommandHandler
  implements ICommandHandler<ChangeStatusCommand>
{
  constructor(private readonly ticketRepository: TicketRepository) {}
  async execute(command: ChangeStatusCommand): Promise<void> {
    const isExist = this.ticketRepository.checkIfExists(command.id);
    if (!isExist) {
      throw new NotFoundException(`Can't find ticket for id ${command.id}`);
    }
    await this.ticketRepository.updateStatus(command.id, command.status);
  }
}
