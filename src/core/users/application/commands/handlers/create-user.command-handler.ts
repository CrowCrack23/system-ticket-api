import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../create-user.command';
import { UserRepository } from '../../ports/user.repository';
import { UserFactory } from 'src/core/users/domain/factories/user.factory';
import { User } from 'src/core/users/domain/user';
import { ConflictException } from '@nestjs/common';
import { CheckIfExistsEmailQuery } from '../../queries/check-user.query';
import { HashingService } from 'src/common/hashing';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    private readonly hashingService: HashingService,
    private readonly userRepository: UserRepository,
    private readonly queryBus: QueryBus,
    private readonly userFactoy: UserFactory,
  ) {}

  async execute(command: CreateUserCommand): Promise<any> {
    const { input } = command;
    const emailExists = await this.queryBus.execute(
      new CheckIfExistsEmailQuery(input.email),
    );
    if (emailExists) {
      throw new ConflictException('Email already in use.');
    }
    input.password = await this.hashingService.hash(input.password);
    const user: User = this.userFactoy.create(input);
    await this.userRepository.save(user);
  }
}
