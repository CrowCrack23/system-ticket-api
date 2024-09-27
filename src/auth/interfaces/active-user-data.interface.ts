import { Roles } from 'src/core/users/domain/types/roles-type';

export interface ActiveUserData {
  sub: string;
  email: string;
  roles: Roles;
}
