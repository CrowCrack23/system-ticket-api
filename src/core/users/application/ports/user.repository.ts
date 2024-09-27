import { User } from '../../domain/user';

export abstract class UserRepository {
  abstract save(user: User): Promise<User | null>;
  abstract findAll(): Promise<User[] | null>;
  abstract checkIfExists(id: string): Promise<boolean>;
  abstract checkIfExistsEmail(email: string): Promise<boolean>;
  abstract getIfExists(id: string): Promise<User | undefined>;
  abstract getUserByEmail(email: string): Promise<User | null>;
}
