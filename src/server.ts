import fastify from '../src/Fastify';

const run = async () => {
  await fastify.listen({ port: 3333 /* host: '0.0.0.0' */ });
};

run();
