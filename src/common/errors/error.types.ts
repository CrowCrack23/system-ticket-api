import { HttpException } from '@nestjs/common';

export enum ErrorCode {
  // default error code
  undefined = 'undefined',

  // default error code base for http exceptions
  invalidRequest = 'invalid_request', // 400
  badCredentials = 'bad_credentials', // 401
  forbidden = 'forbidden', // 403
  notFound = 'not_found', // 404
  conflict = 'conflict', // 409
  internalServer = 'internal_server_error', // 500
  serviceUnavailable = 'service_unavailable', // 503

  // custom error code errors
}
export interface HttpError {
  code: ErrorCode;
  message: string;
  param?: string;
}

export function parseHttpError(exception: unknown): HttpError {
  if (exception instanceof HttpException) {
    const code = parseErrorCode(exception);
    const message = exception.message || 'Oops! Something went wrong.';
    const { param } = exception.getResponse() as HttpError;

    return { code, message, param };
  }
  return { code: ErrorCode.internalServer, message: 'Internal server error.' };
}

const HTTP_ERROR_CODES = {
  BadRequestException: ErrorCode.invalidRequest,
  UnauthorizedException: ErrorCode.badCredentials,
  ForbiddenException: ErrorCode.forbidden,
  NotFoundException: ErrorCode.notFound,
};

function parseErrorCode(exception: HttpException): ErrorCode {
  if (exception instanceof HttpException) {
    const response = exception.getResponse();
    const { code } = response as HttpError;
    if (code) return code;

    const exceptionName = exception.constructor.name;
    return HTTP_ERROR_CODES[exceptionName] ?? ErrorCode.undefined;
  }
  return ErrorCode.internalServer;
}
