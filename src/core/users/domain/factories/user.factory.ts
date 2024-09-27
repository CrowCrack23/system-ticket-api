import { Injectable } from '@nestjs/common';
import { User } from '../user';
import { CreateUserPayload } from '../types/create-user.payload';
import { Roles } from '../types/roles-type';

@Injectable()
export class UserFactory {
  constructor() {}
  create(payload: CreateUserPayload) {
    payload.roles = Roles.Standard;
    return new User(payload);
  }
}
