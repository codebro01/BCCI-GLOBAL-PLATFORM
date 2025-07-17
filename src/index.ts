require('dotenv').config()
require('express-async-errors')
import type { Request, Response } from 'express'
const express = require('express')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const cookieParser = require('cookie-parser')
const { corsOptionsDelegate } = require('@config/cors')
// ! graphql-tools
import type { GraphQLError } from 'graphql'
const resolvers = require('@graphql/resolvers/resolvers')
const { mergeResolvers } = require('@graphql-tools/merge')
const { mergeTypeDefs } = require('@graphql-tools/merge')
const { loadFilesSync } = require('@graphql-tools/load-files')

// !middlewares
const { authMiddleware } = require('@middlewares/authMiddleware')

// ! helpers

const { AppError } = require('@helpers/errorHandler')

// ! connect DB

const { connectDB } = require('@db/connectDB')

// !inbuilt module
const { join } = require('path')
const cors = require('cors')

const app = express()
app.use(cookieParser())

// app.use(cors(corsOptionsDelegate))
app.use(
  cors({
    origin: ['http://localhost:4000', 'http://127.0.0.1:5500'], // or whatever your frontend is
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

app.use(express.json())

const PORT = process.env.PORT || 4000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from BCCI!')
})

const schemaPath = join(__dirname, '..', 'graphql', 'schemas', '*.graphql')
const typeDefs = mergeTypeDefs(loadFilesSync(schemaPath))

const startServer = async () => {
  await connectDB(process.env.MONGO_URI)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // make schema browsable
    playground: true, // enable the GraphQL Playground UI
    formatError: (err: GraphQLError) => {
      const originalError = err.originalError as any

      let code = 'INTERNAL_SERVER_ERROR'
      // console.log(err)
      if (
        originalError &&
        typeof originalError === 'object' &&
        'code' in originalError &&
        typeof originalError.code === 'string'
      ) {
        code = originalError.code
      }
      return {
        message: err.message,
        code: err.extensions?.code || 'INTERNAL_SERVER_ERRO',
        path: err.path,
      }
    },
  })
  await server.start()

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req, res }: { req: Request; res: Response }) => {
        return {
          req,
          res,
        }
      },
    })
  )
  app.listen(PORT, () => console.log('🚀 Awesome, app connected to port', PORT))
}

startServer()
