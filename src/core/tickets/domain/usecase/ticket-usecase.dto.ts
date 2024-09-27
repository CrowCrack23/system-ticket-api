import { Exclude, Expose, plainToInstance } from 'class-transformer';
import { Status } from '../types/status.enum';
import { Ticket } from '../entities/ticket';

@Exclude()
export class TicketUseCaseDto {
  @Expose()
  public id: string;
  @Expose()
  public title: string;
  @Expose()
  public description: string;
  @Expose()
  public status: Status;

  public static newFromTicket(ticket: Ticket): TicketUseCaseDto {
    const dto: TicketUseCaseDto = plainToInstance(TicketUseCaseDto, ticket);

    // TODO: Expose amswers
    return dto;
  }
  public static newListFromTicket(tickets: Ticket[]): TicketUseCaseDto[] {
    return tickets.map((ticket) => this.newFromTicket(ticket));
  }
}
