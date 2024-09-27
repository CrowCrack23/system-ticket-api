import { Injectable } from '@nestjs/common';
import { CreateTicketPayload } from '../types/create-ticket.payload';
import { Status } from '../types/status.enum';
import { Ticket } from '../entities/ticket';

@Injectable()
export class TicketFactory {
  create(payload: CreateTicketPayload) {
    payload.status = Status.Open;
    return new Ticket(payload);
  }
}
