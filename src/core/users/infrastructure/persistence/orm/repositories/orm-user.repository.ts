import { UserRepository } from 'src/core/users/application/ports/user.repository';
import { User } from 'src/core/users/domain/user';
import { UserMapper } from '../mappers/user.mapper';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';

@Injectable()
export class OrmUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(): Promise<User[] | null> {
    const users = await this.prisma.user.findMany();
    return users.map((item) => UserMapper.toDomain(item));
  }
  async save(user: User): Promise<User> {
    const persistenceUser = UserMapper.toPersistence(user);
    const newUser = await this.prisma.user.create({
      data: persistenceUser,
    });
    return UserMapper.toDomain(newUser);
  }
  async checkIfExists(id: string): Promise<boolean> {
    return !!(await this.prisma.user.findUnique({
      where: {
        id,
      },
    }));
  }
  async checkIfExistsEmail(email: string): Promise<boolean> {
    return !!(await this.prisma.user.findUnique({
      where: {
        email,
      },
    }));
  }
  async getIfExists(id: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`Can't find account for user ${id}`);
    }
    return UserMapper.toDomain(user);
  }
  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException(`Can't find account for email: ${email}`);
    }
    return UserMapper.toDomain(user);
  }
}
