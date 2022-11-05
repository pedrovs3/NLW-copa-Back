import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/guesses/count', async (req, rep) => {
    const count = await prisma.guess.count();

    return { count };
  });
}
