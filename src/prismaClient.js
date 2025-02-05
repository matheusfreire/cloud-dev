import { capturePrisma } from '@cosva-labs/aws-xray-sdk-prisma';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const client = capturePrisma(prisma, {namespace: 'remote'});

export default prisma;