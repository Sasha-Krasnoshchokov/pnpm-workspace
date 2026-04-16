import { prisma } from '../../../src/index.js';

async function createHealthCheckRecord(message: string) {
  return prisma.healthCheckRecord.create({
    data: { message },
  });
}

async function getHealthCheckRecords() {
  return prisma.healthCheckRecord.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export const HealthCheckRepository = { createHealthCheckRecord, getHealthCheckRecords };
