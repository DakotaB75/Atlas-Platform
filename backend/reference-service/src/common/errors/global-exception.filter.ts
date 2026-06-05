import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { ApplicationLogger } from '../logging/application-logger.service';
import { BusinessException } from './business.exception';
import { ERROR_CODES } from './error-codes';

interface ErrorResponse {
  errorCode: string;
  errorMsg: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: ApplicationLogger) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode = this.getStatusCode(exception);
    const errorResponse = this.getErrorResponse(exception);

    if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        GlobalExceptionFilter.name,
        errorResponse.errorMsg,
        exception instanceof Error ? exception.stack : undefined,
      );
    }

    response.status(statusCode).json(errorResponse);
  }

  private getStatusCode(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getErrorResponse(exception: unknown): ErrorResponse {
    if (exception instanceof BusinessException) {
      return {
        errorCode: exception.errorCode,
        errorMsg: exception.errorMsg,
      };
    }

    if (exception instanceof HttpException) {
      const response = exception.getResponse();

      if (this.isBusinessErrorResponse(response)) {
        return response;
      }

      return {
        errorCode: this.toHttpErrorCode(exception),
        errorMsg: this.toHttpErrorMessage(response),
      };
    }

    return {
      errorCode: ERROR_CODES.INTERNAL_SERVER_ERROR,
      errorMsg: 'Internal server error',
    };
  }

  private isBusinessErrorResponse(response: unknown): response is ErrorResponse {
    return (
      typeof response === 'object' &&
      response !== null &&
      'errorCode' in response &&
      'errorMsg' in response &&
      typeof response.errorCode === 'string' &&
      typeof response.errorMsg === 'string'
    );
  }

  private toHttpErrorCode(exception: HttpException): string {
    const statusCode = exception.getStatus();

    if (statusCode === HttpStatus.NOT_FOUND) {
      return 'http/not-found';
    }

    if (statusCode === HttpStatus.BAD_REQUEST) {
      return 'http/bad-request';
    }

    if (statusCode === HttpStatus.CONFLICT) {
      return 'http/conflict';
    }

    if (statusCode === HttpStatus.UNAUTHORIZED) {
      return 'http/unauthorized';
    }

    if (statusCode === HttpStatus.FORBIDDEN) {
      return 'http/forbidden';
    }

    return 'http/error';
  }

  private toHttpErrorMessage(response: string | object): string {
    if (typeof response === 'string') {
      return response;
    }

    if ('message' in response) {
      const { message } = response;

      if (Array.isArray(message)) {
        return message.join(', ');
      }

      if (typeof message === 'string') {
        return message;
      }
    }

    return 'Unexpected request error';
  }
}
