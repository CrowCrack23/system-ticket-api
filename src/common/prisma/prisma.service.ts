import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);
  constructor() {
    super();
  }
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      this.logger.error('Prisma connection error', error);
    }
  }
}
