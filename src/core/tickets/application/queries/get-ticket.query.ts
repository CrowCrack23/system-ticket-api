import { HttpUserPayload } from 'src/auth/enums/auth-type.enum';
import { Status } from '../../domain/types/status.enum';

export class GetAllTicketsQuery {}

export class GetTicketByIdQuery {
  constructor(
    public readonly id: string,
    public readonly user: HttpUserPayload,
  ) {}
}

export class GetAllMyTicketsQuery {
  constructor(
    public readonly userId: string,
    public readonly page: number,
    public readonly limit: number,
    public readonly status?: Status,
  ) {}
}
