import { Answer } from '../../domain/entities/answer';

export abstract class AnswerRepository {
  abstract save(answer: Answer): Promise<Answer>;
  abstract findById(id: string): Promise<Answer | null>;
  abstract delete(id: string): Promise<void>;
}
