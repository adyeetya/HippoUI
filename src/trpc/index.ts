//this is kinda the server with trpc layer so we define all the endpoints and apis here,
//  we can create many routers for different logics like for auth we can have a seperate authRouter etc

import { z } from 'zod'
import { authRouter } from './auth-router'
import { router, publicProcedure } from './trpc'
import { QueryValidator } from '../lib/validators/query-validator'
import { getPayloadClient } from '../get-payload'
import { paymentRouter } from './payment-router'

export const appRouter = router({
  auth: authRouter,
  payment: paymentRouter,

  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator,
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input
      const { sort, limit, ...queryOpts } = query
      const payload = await getPayloadClient()

      const parsedQueryOpts: Record<string, { equals: string }> = {}

      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQueryOpts[key] = {
          equals: value,
        }
      })
      console.log('parsedQueryOpts', parsedQueryOpts)
      const page = cursor || 1
      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: 'products',
        where: {
          approvedForSale: {
            equals: 'approved',
          },
        },
        sort,
        depth: 1,
        limit,
        page,
      })

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      }
    }),
})

export type AppRouter = typeof appRouter
