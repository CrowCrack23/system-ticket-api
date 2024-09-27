export class DeleteTicketCommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
  ) {}
}
