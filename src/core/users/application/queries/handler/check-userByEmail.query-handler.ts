import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CheckIfExistsEmailQuery } from '../check-user.query';
import { UserRepository } from '../../ports/user.repository';

@QueryHandler(CheckIfExistsEmailQuery)
export class CheckIfExistsEmailQueryHandler
  implements IQueryHandler<CheckIfExistsEmailQuery, boolean>
{
  constructor(private readonly userRepository: UserRepository) {}
  async execute(query: CheckIfExistsEmailQuery): Promise<boolean> {
    return await this.userRepository.checkIfExistsEmail(query.email);
  }
}
