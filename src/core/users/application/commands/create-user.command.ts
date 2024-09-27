import { CreateUserPayload } from '../../domain/types/create-user.payload';

export class CreateUserCommand {
  static readonly type = '[User] Create';
  constructor(public readonly input: CreateUserPayload) {}
}
