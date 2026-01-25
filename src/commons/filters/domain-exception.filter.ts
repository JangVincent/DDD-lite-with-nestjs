import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { DomainException } from '../exceptions/domain.exception';
import { EntityNotFoundException } from '../exceptions/not-found.exception';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';
import { ValidationException } from '../exceptions/validation.exception';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { ConflictException } from '../exceptions/conflict.exception';

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // 도메인 예외 → HTTP 상태 코드 매핑
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof EntityNotFoundException) {
      status = HttpStatus.NOT_FOUND;
    } else if (exception instanceof InvalidCredentialsException) {
      status = HttpStatus.UNAUTHORIZED;
    } else if (exception instanceof UnauthorizedException) {
      status = HttpStatus.FORBIDDEN;
    } else if (exception instanceof ConflictException) {
      status = HttpStatus.CONFLICT;
    } else if (exception instanceof ValidationException) {
      status = HttpStatus.BAD_REQUEST;
    }

    const errorResponse: any = {
      statusCode: status,
      message: exception.message,
      error: exception.name,
    };

    // ValidationException의 경우 details 포함
    if (exception instanceof ValidationException && exception.details) {
      errorResponse.details = exception.details;
    }

    response.status(status).json(errorResponse);
  }
}
