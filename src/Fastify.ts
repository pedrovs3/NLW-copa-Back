import Fastify, { FastifyInstance } from 'fastify';
import env from 'dotenv';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import poolsRoutes from './routes/poolsRoutes';
import userRoutes from './routes/userRoutes';
import guessesRoutes from './routes/guessRoutes';
import { authRoute } from './routes/authRoute';

env.config();

class App {
  declare fastify: FastifyInstance;

  constructor() {
    this.fastify = Fastify({
      logger: true,
    });
    this.middlewares();
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
    this.fastify.register(guessesRoutes);
    this.fastify.register(authRoute);
  }
}

export default new App().fastify;
