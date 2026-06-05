import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestContextService } from '../context/request-context.service';
import { ApplicationLogger } from '../logging/application-logger.service';
import { HttpLoggingInterceptor } from '../logging/http-logging.interceptor';
import { RequestContextMiddleware } from '../middleware/request-context.middleware';

@Global()
@Module({
  providers: [
    RequestContextService,
    RequestContextMiddleware,
    ApplicationLogger,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpLoggingInterceptor,
    },
  ],
  exports: [RequestContextService, RequestContextMiddleware, ApplicationLogger],
})
export class ObservabilityModule {}
