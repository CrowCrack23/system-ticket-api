import { CreateTicketPayload } from '../types/create-ticket.payload';
import { Status } from '../types/status.enum';
import { Answer } from './answer';

export class Ticket {
  id: string;
  title: string;
  description: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  answers: Answer[];
  constructor(payload: CreateTicketPayload) {
    this.id = payload.id;
    this.title = payload.title;
    this.description = payload.description;
    this.status = payload.status;
    this.createdAt = payload.createdAt;
    this.updatedAt = payload.updatedAt;
    this.answers = payload.answers;
    this.userId = payload.userId;
  }
}
