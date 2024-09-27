import { Prisma, User as PrismaUser } from '@prisma/client';
import { Roles } from 'src/core/users/domain/types/roles-type';
import { User } from 'src/core/users/domain/user';

export class UserMapper {
  static toDomain(prismaUser: PrismaUser) {
    return new User({
      id: prismaUser.id,
      email: prismaUser.email,
      password: prismaUser.password,
      username: prismaUser.username,
      roles: prismaUser.roles as Roles,
    });
  }

  static toPersistence(user: User): Prisma.UserCreateInput {
    return {
      username: user.username,
      email: user.email,
      password: user.password,
      roles: user.roles,
    };
  }
}
