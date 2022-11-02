import Fastify from 'fastify';

import cors from '@fastify/cors';
import poolsRoutes from './routes/poolsRoutes';
import userRoutes from './routes/userRoutes';
import guessesRoutes from './routes/guessRoutes';

const bootstrap = async () => {
  const fastify = Fastify({
    logger: true,
  });

  fastify.register(poolsRoutes);
  fastify.register(userRoutes);
  fastify.register(guessesRoutes);

  await fastify.register(cors, {
    origin: true,
  });

  await fastify.listen({ port: 3333 /* host: '0.0.0.0' */ });
};

bootstrap();
