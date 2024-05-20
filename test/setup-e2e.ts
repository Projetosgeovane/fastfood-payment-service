import { DomainEvents } from '@enablers/core/events';
import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';

config({ path: '.env', override: true });
config({ path: '.env.test', override: true });

const env = process.env;

const prisma = new PrismaClient();

function generateUniqueDatabaseURL(databaseId: string) {
  if (!env.DATABASE_URL) {
    throw new Error('Please provider a DATABASE_URL environment variable');
  }

  const url = new URL(env.DATABASE_URL);

  url.pathname = databaseId;

  return url.toString();
}

const databaseId = `test_db_${randomUUID().replace(/-/g, '_')}`;

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(databaseId);

  process.env.DATABASE_URL = databaseURL;

  DomainEvents.shouldRun = false;

  execSync('yarn prisma migrate deploy');
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP DATABASE IF EXISTS ${databaseId}`);
  await prisma.$disconnect();
});
