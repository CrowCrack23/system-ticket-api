import { CreateTicketPayload } from '../../domain/types/create-ticket.payload';

export class CreateTicketCommand {
  constructor(public readonly input: CreateTicketPayload) {}
}
