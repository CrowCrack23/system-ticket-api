export class CreateAnswerPayload {
  id?: string;
  content: string;
  ticketId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
