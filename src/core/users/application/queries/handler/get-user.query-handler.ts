import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllUsersQuery } from '../get-user.query';
import { User } from 'src/core/users/domain/user';
import { UserRepository } from '../../ports/user.repository';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersQueryHandler
  implements IQueryHandler<GetAllUsersQuery, User[]>
{
  constructor(private readonly userRepository: UserRepository) {}
  async execute(query: GetAllUsersQuery): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}