import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTicketDto } from '../dtos/create-ticket.dto';
import { TicketService } from '../../application/services/ticket.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType, HttpUserPayload } from 'src/auth/enums/auth-type.enum';
import { ChangeStatusDto } from '../dtos/change-status.dto';
import { Roles } from 'src/core/users/domain/types/roles-type';
import { Rol } from 'src/auth/decorators/roles.decorator';
import { UpdateTicketDto } from '../dtos/update-ticket.dto';
import { TicketQueryDto } from '../dtos/ticket-query.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpUser } from 'src/auth/decorators/http-user.decorator';
import { CreateAnswerDto } from '../dtos/create-answer.dto';
import { ApiResponseTicketList } from 'src/common/docs/tickets/ticket-api.response-list';
import { CoreApiResponse } from 'src/common/api/core-api.response';
import { PaginatedTicketUseCaseDto } from '../dtos/paginated-ticket.dto';
import { ApiModelTicket } from 'src/common/docs/tickets/ticket-api.model';

@Auth(AuthType.Bearer)
@ApiTags('tickets')
@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiBody({ type: CreateTicketDto })
  @ApiResponse({ status: HttpStatus.OK })
  async createTicket(
    @HttpUser() user: HttpUserPayload,
    @Body() createTicketDto: CreateTicketDto,
  ) {
    return await this.ticketService.create(user.sub, createTicketDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiBody({ type: UpdateTicketDto })
  @ApiResponse({ status: HttpStatus.OK })
  async updatedTicket(
    @HttpUser() user: HttpUserPayload,
    @Param('id') id: string,
    @Body() payload: UpdateTicketDto,
  ) {
    return await this.ticketService.updated(id, user.sub, payload);
  }

  @Rol(Roles.Admin)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: ApiResponseTicketList })
  async listAllTickets() {
    const tickets = await this.ticketService.findAll();
    return CoreApiResponse.success(tickets);
  }
  @Get('my')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiQuery({ type: TicketQueryDto, required: false })
  @ApiResponse({ status: HttpStatus.OK, type: ApiResponseTicketList })
  async meTickets(
    @HttpUser() user: HttpUserPayload,
    @Query() query: TicketQueryDto,
  ): Promise<CoreApiResponse<PaginatedTicketUseCaseDto>> {
    const tickets = await this.ticketService.meAll(user.sub, query);
    return CoreApiResponse.success(tickets);
  }
  @Post(':id/answer')
  @Rol(Roles.Admin)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK })
  answerTicket(
    @HttpUser() user: HttpUserPayload,
    @Param('id') id: string,
    @Body() body: CreateAnswerDto,
  ) {
    return this.ticketService.answer(user.sub, id, body.content);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: ApiModelTicket })
  async findOneTicket(
    @Param('id') id: string,
    @HttpUser() user: HttpUserPayload,
  ) {
    const ticket = await this.ticketService.findOne(id, user);
    return CoreApiResponse.success(ticket);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK })
  @ApiBearerAuth()
  async delete(@Param('id') id: string, @HttpUser() user: HttpUserPayload) {
    return await this.ticketService.deleted(id, user.sub);
  }

  @Post(':id/status')
  @Rol(Roles.Admin)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK })
  async changeStatusTicket(
    @Param('id') id: string,
    @Body() payload: ChangeStatusDto,
  ) {
    return await this.ticketService.changeStatus(id, payload.status);
  }
}
