import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: 1,
    description: 'User identifier.',
  })
  id!: number;

  @ApiProperty({
    example: 'Foo User',
    description: 'User display name.',
  })
  name!: string;

  @ApiProperty({
    example: 'foo@example.com',
    description: 'Unique user email address.',
  })
  email!: string;

  @ApiProperty({
    example: '2026-06-05T12:00:00.000Z',
    description: 'Creation timestamp.',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2026-06-05T12:10:00.000Z',
    description: 'Last update timestamp.',
  })
  updatedAt!: Date;
}
