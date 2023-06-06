import http from 'http'
import path from 'path'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { koaMiddleware } from '@as-integrations/koa'
import cors from '@koa/cors'
import * as dotenv from 'dotenv'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import { PORT, serverAddress } from './constants/constants'
import type { Context } from './utils/context'
import { createContext } from './utils/context'
import { errorHandler } from './utils/errorHandler'
import router from './api/router'
import { schema } from './graphql/schema'

dotenv.config()
const app = new Koa()

const httpServer = http.createServer(app.callback())

const start = async () => {
  const server = new ApolloServer<Context>({
    schema: schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    csrfPrevention: true,
    cache: 'bounded',
    formatError: errorHandler,
  })

  await server.start()
  const graphqlMiddleware = koaMiddleware(server, { context: createContext })
  router.all('/graphql', graphqlMiddleware)
  app
    .use(cors())
    .use(bodyParser())
    .use(serve(path.resolve(__dirname, './static')))
    .use(router.routes())
    .use(router.allowedMethods())
  await new Promise(resolve => {
    httpServer.listen({ port: PORT }, resolve as () => void)
  })
  console.log(`\
  ⭐️ Server ready at: ${serverAddress}/graphql
  `)
}

start()
