require('dotenv').config()
require('express-async-errors')
import type { Request, Response } from 'express'
const express = require('express')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
// const { generateToken } = require('@helpers/tokenGenerator')
const cookieParser = require('cookie-parser')
const { corsOptionsDelegate } = require('@config/cors')
// ! graphql-tools
import type { GraphQLError } from 'graphql'

const { mergeResolvers } = require('@graphql-tools/merge')
const { mergeTypeDefs } = require('@graphql-tools/merge')
const { loadFilesSync } = require('@graphql-tools/load-files')


// ! helpers 

const {AppError} = require('@helpers/errorHandler');


// ! connect DB 

const {connectDB} = require('@db/connectDB')

//! graphql !resolvers
const { UserResolvers } = require('@graphql/resolvers/user.resolver')

// !inbuilt module
const { join } = require('path')
const cors = require('cors')

const app = express()

app.use(cors(corsOptionsDelegate))

app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 4000

const schemaPath = join(__dirname, '..', 'graphql', 'schemas', '*.graphql')
const resolversPath = join(__dirname, '..', 'graphql', 'resolvers', '*.ts')
const typeDefs = mergeTypeDefs(loadFilesSync(schemaPath))
const resolvers = mergeResolvers(loadFilesSync(resolversPath))

// console.log('typeDefs', schemaPath)
// console.log('resolvers', resolversPath)
const startServer = async () => {

  await connectDB(process.env.MONGO_URI)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (err: GraphQLError) => {

      const originalError = err.originalError as any

      let code = 'INTERNAL_SERVER_ERROR'

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
        code:  err.extensions?.code || 'INTERNAL_SERVER_ERRO',
        path: err.path,
      }
    },
  })
  await server.start()

  // console.log(generateToken(64))

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }),
    })
  )
  app.listen(PORT, () => console.log('🚀 Awesome, app connected to port', PORT))
}

startServer()


