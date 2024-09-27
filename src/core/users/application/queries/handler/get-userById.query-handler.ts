import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '../get-user.query';
import { User } from 'src/core/users/domain/user';
import { UserRepository } from '../../ports/user.repository';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler
  implements IQueryHandler<GetUserByIdQuery, User>
{
  constructor(private readonly userRepository: UserRepository) {}
  async execute(query: GetUserByIdQuery) {
    const user = await this.userRepository.getIfExists(query.id);
    return user;
  }
}
