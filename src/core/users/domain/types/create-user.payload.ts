import { Roles } from './roles-type';

export type CreateUserPayload = {
  id?: string;
  username: string;
  email: string;
  password: string;
  roles?: Roles;
  createdAt?: Date;
  updatedAt?: Date;
};
