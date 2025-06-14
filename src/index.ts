require('dotenv').config()
require('express-async-errors')
import type { Request, Response } from 'express'
const express = require('express')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { resolvers } = require('@graphql/resolvers/resolvers')
const { typeDefs } = require('@graphql/schemas/schemas')
const cookieParser = require('cookie-parser')
const { corsOptionsDelegate } = require('@config/cors')
// const { startDB } from './db/connectDb.js'
const cors = require('cors')
// const { upload } from './config/multer.js'
// const { cloudinaryImageUploader } from './utils/cloudinaryImageUploader.js'
// const {CorsOptionsDelegate} from '../config/cors'
// const { Router } from './routes/apiRoutes.js'
const app = express()

app.use(cors(corsOptionsDelegate)) // ✅ this is correct

app.use(express.json())
app.use(cookieParser())

// app.post('/upload', upload.array('images', 5), cloudinaryImageUploader)
// app.use('/api/v1/predict', predictChickenHealthStatus)

// app.use('/api', Router)

// app.use(express.static(path.join(__dirname, 'public'))) // Serve static files
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html')) // Handle SPA routing
// })

// app.get('/api/check-cookie', )

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust accordingly
// });

const PORT = process.env.PORT || 4000

console.log('hellow world')
const startServer = async () => {
  // await startDB()
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })
  await server.start()

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
