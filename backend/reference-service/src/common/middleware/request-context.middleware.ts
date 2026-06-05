import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';
import { RequestContextService } from '../context/request-context.service';

export const REQUEST_ID_HEADER = 'x-request-id';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(private readonly requestContextService: RequestContextService) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const requestId = request.header(REQUEST_ID_HEADER) ?? randomUUID();

    response.setHeader(REQUEST_ID_HEADER, requestId);

    this.requestContextService.run({ requestId }, next);
  }
}
