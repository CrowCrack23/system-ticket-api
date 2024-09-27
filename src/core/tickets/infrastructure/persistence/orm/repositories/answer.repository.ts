import { PrismaService } from 'src/common/prisma';
import { AnswerMapper } from '../mappers/answer.mapper';
import { Answer } from 'src/core/tickets/domain/entities/answer';
import { AnswerRepository } from 'src/core/tickets/application/ports/answer.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrmAnswerRepository implements AnswerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(answer: Answer): Promise<Answer> {
    const persistenceAnswer = AnswerMapper.toPersistence(answer);
    const prismaAnswer = await this.prisma.answer.create({
      data: persistenceAnswer,
    });

    return AnswerMapper.toDomain(prismaAnswer);
  }

  async findById(id: string): Promise<Answer | null> {
    const prismaAnswer = await this.prisma.answer.findUnique({
      where: { id },
    });
    if (!prismaAnswer) return null;
    return AnswerMapper.toDomain(prismaAnswer);
  }
  async delete(id: string): Promise<void> {
    await this.prisma.answer.delete({
      where: { id },
    });
  }
}
