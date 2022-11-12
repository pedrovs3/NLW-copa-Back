import Fastify, { FastifyInstance } from 'fastify';
import env from 'dotenv';
import jwt from '@fastify/jwt';
import cors from '@fastify/cors';
import poolsRoutes from './routes/poolsRoutes';
import userRoutes from './routes/userRoutes';
import guessesRoutes from './routes/guessRoutes';
import { authRoute } from './routes/authRoute';
import { gameRoutes } from './routes/gameRoutes';

env.config();

class App {
  declare fastify: FastifyInstance;

  constructor() {
    this.fastify = Fastify({
      logger: true,
    });
    this.middlewares().then((r) => r);
    this.routes();
  }

  async middlewares() {
    await this.fastify.register(cors, {
      origin: true,
    });
    // @ts-ignore
    await this.fastify.register(jwt, {
      secret: process.env.SECRET_JWT,
    });
  }

  routes() {
    this.fastify.register(poolsRoutes);
    this.fastify.register(userRoutes);
    this.fastify.register(gameRoutes);
    this.fastify.register(guessesRoutes);
    this.fastify.register(authRoute);
  }
}

const app = new App().fastify;

const run = async () => {
  try {
    await app.listen({ port: 3333, host: '0.0.0.0' });
  } catch (e) {
    process.exit(1);
  }
};

run();
