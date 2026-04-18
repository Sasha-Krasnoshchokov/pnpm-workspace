import { prisma } from '../index.js';
import type {
  THealthCheckRecordCreate,
  THealthCheckRecords,
  THealthCheckRecord,
} from '../schemas/healthCheck.js';

export const HealthCheckRepository = {
  createRecord: async (data: THealthCheckRecordCreate): Promise<THealthCheckRecord> =>
    prisma.healthCheckRecord.create({
      data,
    }),
  getRecords: async (): Promise<THealthCheckRecords> =>
    prisma.healthCheckRecord.findMany({
      orderBy: { createdAt: 'desc' },
    }),
};
