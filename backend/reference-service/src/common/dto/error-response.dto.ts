import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    example: 'user/not-found',
    description: 'Stable application error code.',
  })
  errorCode!: string;

  @ApiProperty({
    example: 'User with id 1 was not found',
    description: 'Human-readable error message.',
  })
  errorMsg!: string;
}
