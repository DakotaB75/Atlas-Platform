import { Injectable } from '@nestjs/common';
import { HealthResponseDto } from './dto/health-response.dto';

@Injectable()
export class HealthService {
  healthCheck(): HealthResponseDto {
    return {
      status: 'healthy',
    };
  }
}
