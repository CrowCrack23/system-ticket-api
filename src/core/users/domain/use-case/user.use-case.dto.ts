import { Exclude, Expose, plainToInstance } from 'class-transformer';
import { Roles } from '../types/roles-type';
import { User } from '../user';

@Exclude()
export class UserUseCaseDto {
  @Expose()
  public id: string;

  @Expose()
  public username: string;

  @Expose()
  public email: string;

  @Expose()
  public roles: Roles;

  public static newFromUser(user: User): UserUseCaseDto {
    return plainToInstance(UserUseCaseDto, user);
  }

  public static newListFromUsers(users: User[]): UserUseCaseDto[] {
    return users.map((user) => this.newFromUser(user));
  }
}
