export class UpdateTicketCommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly title?: string,
    public readonly description?: string,
  ) {}
}
