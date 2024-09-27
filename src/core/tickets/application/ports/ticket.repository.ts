import { Ticket } from '../../domain/entities/ticket';
import { Status } from '../../domain/types/status.enum';

export abstract class TicketRepository {
  abstract save(ticket: Ticket): Promise<Ticket | null>;
  abstract findAll(): Promise<Ticket[] | null>;
  abstract checkIfExists(id: string): Promise<boolean>;
  abstract getIfExists(id: string): Promise<Ticket | undefined>;
  abstract updateStatus(id: string, status: Status): Promise<void>;
  abstract update(
    id: string,
    title?: string,
    description?: string,
  ): Promise<Ticket>;
  abstract delete(id: string): Promise<void>;
  abstract findTicketsByStatus(
    userId: string,
    page: number,
    limit: number,
    status?: Status,
  );
}
