import { Status } from '../../domain/types/status.enum';

export class ChangeStatusCommand {
  constructor(
    public readonly status: Status,
    public readonly id: string,
  ) {}
}
