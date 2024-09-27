import {
  BadRequestException,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { ErrorCode } from './error.types';

export class ErrorValidationPipe extends ValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const [err] = errors;
        const [message] = Object.values(err.constraints);
        return new BadRequestException({
          message: message ?? 'Something when wrong.',
          code: ErrorCode.invalidRequest,
          param: err.property,
        });
      },
      ...options,
    });
  }
}
