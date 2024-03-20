import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class Prisma extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: `postgresql://massaracsh:12345@postgres:5432/db?schema=public`,
        },
      },
    });
  }
}
