import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
});

export default function userRoutes(fastify, options, next) {
  fastify.get('/guesses/count', async (req, rep) => {
    const count = await prisma.guess.count();

    return { count };
  });

  next();
}
