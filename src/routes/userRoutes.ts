import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/users/count', async (req, rep) => {
    const count = await prisma.user.count();

    return { count };
  });
}
