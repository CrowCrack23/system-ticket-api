import { CreateAnswerPayload } from '../types/create-answer.payload';

export class Answer {
  id: string;
  content: string;
  ticketId: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(payload: CreateAnswerPayload) {
    this.id = payload.id;
    this.content = payload.content;
    this.ticketId = payload.ticketId;
    this.createdAt = payload.createdAt;
    this.updatedAt = payload.updatedAt;
  }
}
