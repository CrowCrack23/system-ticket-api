import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from '../get-user.query';
import { User } from 'src/core/users/domain/user';
import { UserRepository } from '../../ports/user.repository';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailQueryHandler
  implements IQueryHandler<GetUserByEmailQuery, User>
{
  constructor(private readonly userRepository: UserRepository) {}
  async execute(query: GetUserByEmailQuery): Promise<User> {
    return await this.userRepository.getUserByEmail(query.email);
  }
}
