import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscription',
    {
      schema: {
        summary: 'Subscribe to event',
        tags: ['subscriptions'],
        operationId: 'subscribeToEvent',
        body: z.object({
          email: z.string().email(),
          name: z.string().min(1),
        }),
        response: {
          201: z.object({
            name: z.string(),
            email: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body as { name: string; email: string }

      return reply.status(201).send({
        name,
        email,
      })
    }
  )
  // app.get('/hello', () => {
  //     return 'Hello World'
  // })
}
