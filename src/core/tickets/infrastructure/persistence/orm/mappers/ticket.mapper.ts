import {
  Prisma,
  Ticket as PrismaTicket,
  Answer as PrismaAnswer,
} from '@prisma/client';
import { Ticket } from 'src/core/tickets/domain/entities/ticket';
import { Status } from 'src/core/tickets/domain/types/status.enum';
import { AnswerMapper } from './answer.mapper';

export class TicketMapper {
  static toDomain(prismaTicket: PrismaTicket, answers: PrismaAnswer[]) {
    const domainAnswers = answers.map((answer) => {
      return AnswerMapper.toDomain(answer);
    });
    return new Ticket({
      id: prismaTicket.id,
      title: prismaTicket.title,
      description: prismaTicket.description,
      status: prismaTicket.status as Status,
      userId: prismaTicket.userId,
      createdAt: prismaTicket.createdAt,
      updatedAt: prismaTicket.updatedAt,
      answers: domainAnswers,
    });
  }

  static toPersistence(ticket: Ticket): Prisma.TicketCreateInput {
    return {
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      user: {
        connect: { id: ticket.userId },
      },
    };
  }
}
