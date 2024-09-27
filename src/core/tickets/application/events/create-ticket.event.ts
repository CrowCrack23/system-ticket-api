export class TicketCreatedEvent {
  constructor(
    public readonly ticketId: string,
    public readonly userId: string,
  ) {}
}
