import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from '../../presenters/dtos/create-ticket.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTicketCommand } from '../commands/create-ticket.command';
import { ChangeStatusCommand } from '../commands/change-status.command';
import { Status } from '../../domain/types/status.enum';
import {
  GetAllMyTicketsQuery,
  GetAllTicketsQuery,
  GetTicketByIdQuery,
} from '../queries/get-ticket.query';
import { UpdateTicketDto } from '../../presenters/dtos/update-ticket.dto';
import { UpdateTicketCommand } from '../commands';
import { DeleteTicketCommand } from '../commands/delete-ticket.command';
import { CoreApiResponse } from 'src/common/api/core-api.response';
import { TicketQueryDto } from '../../presenters/dtos/ticket-query.dto';
import { CreateAnswerCommand } from '../commands/answer-ticket.command';
import { HttpUserPayload } from 'src/auth/enums/auth-type.enum';

@Injectable()
export class TicketService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  create(userid: string, payload: CreateTicketDto) {
    return this.commandBus.execute(
      new CreateTicketCommand({
        title: payload.title,
        description: payload.description,
        userId: userid,
      }),
    );
  }
  findAll() {
    return this.queryBus.execute(new GetAllTicketsQuery());
  }
  async findOne(id: string, user: HttpUserPayload) {
    const ticket = await this.queryBus.execute(
      new GetTicketByIdQuery(id, user),
    );
    return CoreApiResponse.success(ticket);
  }
  updated(id: string, userId: string, payload: UpdateTicketDto) {
    return this.commandBus.execute(
      new UpdateTicketCommand(id, userId, payload.title, payload.description),
    );
  }
  deleted(id: string, userId: string) {
    return this.commandBus.execute(new DeleteTicketCommand(id, userId));
  }
  async meAll(userId: string, query: TicketQueryDto) {
    const { page, limit, status } = query;
    return await this.queryBus.execute(
      new GetAllMyTicketsQuery(userId, page, limit, status),
    );
  }
  changeStatus(id: string, status: Status) {
    return this.commandBus.execute(new ChangeStatusCommand(status, id));
  }
  async answer(userId: string, id: string, content: string) {
    await this.commandBus.execute(new CreateAnswerCommand(content, id, userId));
  }
}
