import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApplicationLogger } from './application-logger.service';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: ApplicationLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();
    const startedAt = Date.now();
    const route = request.originalUrl ?? request.url;

    this.logger.log('HttpRequest', 'Request started', {
      method: request.method,
      route,
    });

    return next.handle().pipe(
      tap(() => {
        this.logger.log('HttpRequest', 'Request completed', {
          durationMs: Date.now() - startedAt,
          method: request.method,
          route,
          statusCode: response.statusCode,
        });
      }),
      catchError((error: unknown) => {
        const statusCode =
          error instanceof HttpException
            ? error.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        this.logger.error(
          'HttpRequest',
          'Request failed',
          error instanceof Error ? error.stack : undefined,
          {
            durationMs: Date.now() - startedAt,
            method: request.method,
            route,
            statusCode,
          },
        );

        return throwError(() => error);
      }),
    );
  }
}
