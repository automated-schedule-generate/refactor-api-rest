import { Injectable, NestMiddleware } from '@nestjs/common';
// import type { Request, Response, NextFunction } from 'express';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
  use(req: FastifyRequest, res: FastifyReply, next: () => void) {
    if (req.method == 'GET') {
      const query = req.query as Record<string, string>;

      query.page = query?.page ? parseInt(query.page, 10).toString() : '1';
      query.limit = query?.limit ? parseInt(query.limit, 10).toString() : '10';

      req.query = query;
    }
    next();
  }
}
