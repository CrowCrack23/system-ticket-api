import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/core/users/domain/types/roles-type';

export const ROLES_KEY = 'roles';
export const Rol = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);
