import { prisma } from '../prisma.client';

export const isDbAlive = async (): Promise<boolean> => {
  try {
    await prisma.$connect();
    const result = await prisma.$queryRaw`SELECT 1`;
    return !!result;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
};
