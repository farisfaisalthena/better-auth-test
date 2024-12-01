import { PrismaClient } from '@prisma/client';

export class PrismaClientInstance {
  static instance: PrismaClient;

  static getInstance(): PrismaClient {
    if (!this.instance) {
      const prisma = new PrismaClient();

      this.instance = prisma;

      return this.instance;
    } else {
      return this.instance;
    };
  };
};