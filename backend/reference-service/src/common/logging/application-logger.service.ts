import { Injectable, Logger } from '@nestjs/common';
import { RequestContextService } from '../context/request-context.service';

type LogMetadata = Record<string, boolean | number | string | null | undefined>;

@Injectable()
export class ApplicationLogger {
  private readonly logger = new Logger(ApplicationLogger.name);

  constructor(private readonly requestContextService: RequestContextService) {}

  log(component: string, message: string, metadata?: LogMetadata): void {
    this.logger.log(this.format(component, message, metadata));
  }

  warn(component: string, message: string, metadata?: LogMetadata): void {
    this.logger.warn(this.format(component, message, metadata));
  }

  error(
    component: string,
    message: string,
    trace?: string,
    metadata?: LogMetadata,
  ): void {
    this.logger.error(this.format(component, message, metadata), trace);
  }

  private format(
    component: string,
    message: string,
    metadata?: LogMetadata,
  ): string {
    const requestId = this.requestContextService.getRequestId();
    const formattedMetadata = metadata ? ` ${JSON.stringify(metadata)}` : '';

    return `[requestId=${requestId}] [component=${component}] ${message}${formattedMetadata}`;
  }
}
