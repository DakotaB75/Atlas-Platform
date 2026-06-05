import { HttpException, HttpStatus } from '@nestjs/common';
import type { ErrorCode } from './error-codes';

export interface BusinessExceptionResponse {
  errorCode: ErrorCode;
  errorMsg: string;
}

export class BusinessException extends HttpException {
  constructor(
    readonly errorCode: ErrorCode,
    readonly errorMsg: string,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super({ errorCode, errorMsg }, statusCode);
  }
}
