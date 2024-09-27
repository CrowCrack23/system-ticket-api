import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { GetAllUsersQuery, GetUserByIdQuery } from '../queries/get-user.query';
import { UserUseCaseDto } from '../../domain/use-case/user.use-case.dto';
import { CreateUserBody } from '../../presenters/dto/create-user.body';

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  async create(createUserBody: CreateUserBody) {
    const user = await this.commandBus.execute(
      new CreateUserCommand({
        email: createUserBody.email,
        username: createUserBody.username,
        password: createUserBody.password,
      }),
    );
    return UserUseCaseDto.newFromUser(user);
  }
  async findAll() {
    return this.queryBus.execute(new GetAllUsersQuery());
  }
  async getMe(userid: string) {
    const user = await this.queryBus.execute(new GetUserByIdQuery(userid));
    if (!user) {
      throw new NotFoundException('User dont exists');
    }
    return UserUseCaseDto.newFromUser(user);
  }
}
