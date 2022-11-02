import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
});

export default function userRoutes(fastify, options, next) {
  fastify.get('/users/count', async (req, rep) => {
    const count = await prisma.user.count();

    return { count };
  });

  next();
}
