import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { TicketRepository } from 'src/core/tickets/application/ports/ticket.repository';
import { Ticket } from 'src/core/tickets/domain/entities/ticket';
import { TicketMapper } from '../mappers/ticket.mapper';
import { Status } from 'src/core/tickets/domain/types/status.enum';

@Injectable()
export class OrmTicketRepository implements TicketRepository {
  constructor(private readonly prisma: PrismaService) {}
  async save(ticket: Ticket): Promise<Ticket | null> {
    const prismaTicket = TicketMapper.toPersistence(ticket);
    const newTicket = await this.prisma.ticket.create({
      data: prismaTicket,
    });
    return TicketMapper.toDomain(newTicket, []);
  }
  async findAll(): Promise<Ticket[] | null> {
    const tickets = await this.prisma.ticket.findMany();
    if (!tickets) return null;
    return tickets.map((ticket) => TicketMapper.toDomain(ticket, []));
  }
  async checkIfExists(id: string): Promise<boolean> {
    return !!(await this.prisma.ticket.findUnique({
      where: {
        id,
      },
    }));
  }
  async getIfExists(id: string): Promise<Ticket | null> {
    const ticket = await this.prisma.ticket.findUnique({
      where: {
        id,
      },
      include: {
        answers: true,
      },
    });
    if (!ticket) return null;
    console.log(ticket.answers);
    return TicketMapper.toDomain(ticket, ticket.answers);
  }
  async updateStatus(id: string, status: Status) {
    await this.prisma.ticket.update({
      where: {
        id: id,
      },
      data: {
        status,
        updatedAt: new Date(),
      },
    });
  }
  async update(
    id: string,
    title?: string,
    description?: string,
  ): Promise<Ticket> {
    const ticket = await this.prisma.ticket.update({
      where: {
        id,
      },
      data: {
        title,
        description,
      },
    });
    return TicketMapper.toDomain(ticket, []);
  }
  async delete(id: string): Promise<void> {
    await this.prisma.ticket.delete({
      where: {
        id,
      },
    });
  }
  async findTicketsByStatus(
    userId: string,
    page: number,
    take: number,
    status?: Status,
  ) {
    const tickets = await this.prisma.ticket.findMany({
      where: {
        userId: userId,
        status: status,
      },
      skip: page,
      take: take,
      orderBy: {
        createdAt: 'desc',
      },
    });
    const totalTickets = await this.prisma.ticket.count({
      where: { userId },
    });
    const totalPages = Math.ceil(totalTickets / take);
    const domainTickets = tickets.map((ticket) =>
      TicketMapper.toDomain(ticket, []),
    );
    return {
      tickets: domainTickets,
      currentPage: page,
      totalPages,
      total: totalTickets,
    };
  }
}
