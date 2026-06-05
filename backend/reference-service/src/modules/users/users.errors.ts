import { HttpStatus } from '@nestjs/common';
import { BusinessException } from '../../common/errors/business.exception';
import { ERROR_CODES } from '../../common/errors/error-codes';

export class UserNotFoundException extends BusinessException {
  constructor(id: number) {
    super(
      ERROR_CODES.USER_NOT_FOUND,
      `User with id ${id} was not found`,
      HttpStatus.NOT_FOUND,
    );
  }
}
