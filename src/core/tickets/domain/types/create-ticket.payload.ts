import { Answer } from '../entities/answer';
import { Status } from './status.enum';

export type CreateTicketPayload = {
  id?: string;
  title: string;
  description: string;
  userId: string;
  status?: Status;
  answers?: Answer[];
  createdAt?: Date;
  updatedAt?: Date;
};
