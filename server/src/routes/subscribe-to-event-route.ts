import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { subscribeToEvent } from '../functions/subscribe-to-event'

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
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body as { name: string; email: string }

      const { subscriberId } = await subscribeToEvent({
        name,
        email,
        invitedBySubscriberId: null,
      })

      return reply.status(201).send({
        subscriberId,
      })
    }
  )
  // app.get('/hello', () => {
  //     return 'Hello World'
  // })
}
