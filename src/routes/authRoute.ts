import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authenticate } from '../plugins/authenticate';

export async function authRoute(fastify: FastifyInstance) {
  fastify.get('/me', { onRequest: [authenticate] }, async (req, res) => ({ user: req.user }));

  fastify.post('/users', async (req, rep) => {
    try {
      const createUserBody = z.object({
        access_token: z.string(),
      });
      console.log(req.body);
      const { access_token } = createUserBody.parse(req.body);

      const userResponse = await fetch(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );

      const userData = await userResponse.json();

      const userInfoScheme = z.object({
        id: z.string(),
        email: z.string().email(),
        name: z.string(),
        picture: z.string().url(),
      });

      console.log(userData);

      const userInfo = userInfoScheme.parse(userData);

      let user = await prisma.user.findUnique({
        where: {
          googleId: userInfo.id,
        },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            googleId: userInfo.id,
            name: userInfo.name,
            email: userInfo.email,
            avatarUrl: userInfo.picture,
          },
        });
      }

      // JWT
      const token = fastify.jwt.sign(
        {
          name: user.name,
          avatarUrl: user.avatarUrl,
        },
        {
          sub: user.id,
          expiresIn: '7 days', // Futuramente pesquisar sobre Refresh Token
        },
      );

      return { token };
    } catch (err) {
      console.log(err);
      return { err };
    }
  });
}
