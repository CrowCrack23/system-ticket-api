import { Roles } from 'src/core/users/domain/types/roles-type';
import { Request } from 'express';

export enum AuthType {
  Bearer,
  None,
}

export type HttpUserPayload = {
  sub: string;
  email: string;
  roles: Roles;
};

export type HttpRequestWithUser = Request & { user: HttpUserPayload };

export type HttpLoggedInUser = {
  refreshToken: string;
  accessToken: string;
};
