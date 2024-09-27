import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TicketRepository } from '../../ports/ticket.repository';
import { AnswerRepository } from '../../ports/answer.repository';
import { CreateAnswerCommand } from '../answer-ticket.command';
import { NotFoundException } from '@nestjs/common';
import { Answer } from 'src/core/tickets/domain/entities/answer';

@CommandHandler(CreateAnswerCommand)
export class CreateAnswerCommandHandler
  implements ICommandHandler<CreateAnswerCommand>
{
  constructor(
    private readonly answerRepository: AnswerRepository,
    private readonly ticketRepository: TicketRepository,
  ) {}

  async execute(command: CreateAnswerCommand): Promise<void> {
    const { content, ticketId } = command;
    const ticket = await this.ticketRepository.getIfExists(ticketId);
    if (!ticket) {
      throw new NotFoundException(`Ticket with id ${ticketId} not found`);
    }
    const answer = new Answer({
      content,
      ticketId,
    });
    await this.answerRepository.save(answer);
  }
}
