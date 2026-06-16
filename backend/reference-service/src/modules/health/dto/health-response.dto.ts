import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseDto {
  @ApiProperty({
    example: 'healthy',
    description: 'Current service health status.',
  })
  status!: string;
}
