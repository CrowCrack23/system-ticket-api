import { CreateUserPayload } from './types/create-user.payload';
import { Roles } from './types/roles-type';

export class User {
  id: string;
  username: string;
  email: string;
  password: string;
  roles: Roles;
  createdAt: Date;
  updatedAt: Date;
  constructor(payload: CreateUserPayload) {
    this.id = payload.id;
    this.username = payload.username;
    this.email = payload.email;
    this.password = payload.password;
    this.roles = payload.roles;

    this.createdAt = payload.createdAt;
    this.updatedAt = payload.updatedAt;
  }
}
