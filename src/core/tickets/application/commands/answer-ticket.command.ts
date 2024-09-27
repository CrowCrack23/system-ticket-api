export class CreateAnswerCommand {
  constructor(
    public readonly content: string,
    public readonly ticketId: string,
    public readonly userId: string,
  ) {}
}
