import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthResponseDto } from './dto/health-response.dto';
import { HealthService } from './health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @ApiOperation({ summary: 'Check service health' })
  @ApiOkResponse({
    description: 'Service is healthy.',
    type: HealthResponseDto,
  })
  @Get()
  healthCheck(): HealthResponseDto {
    return this.healthService.healthCheck();
  }
}
