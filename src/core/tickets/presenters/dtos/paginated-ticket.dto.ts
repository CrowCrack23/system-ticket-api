import { Ticket } from '../../domain/entities/ticket';

export class PaginatedTicketUseCaseDto {
  tickets: Ticket[];
  total: number;
  currentPage: number;
  totalPages: number;
}
