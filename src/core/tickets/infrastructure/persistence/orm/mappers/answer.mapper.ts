import { Answer as PrismaAnswer } from '@prisma/client';
import { Answer } from 'src/core/tickets/domain/entities/answer';

export class AnswerMapper {
  static toDomain(prismaAnswer: PrismaAnswer) {
    return new Answer({
      id: prismaAnswer.id,
      content: prismaAnswer.content,
      createdAt: prismaAnswer.createdAt,
      updatedAt: prismaAnswer.updatedAt,
      ticketId: prismaAnswer.ticketId,
    });
  }

  static toPersistence(answer: Answer) {
    return {
      id: answer.id,
      content: answer.content,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
      ticketId: answer.ticketId,
    };
  }
}
