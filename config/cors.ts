import type { CorsOptionsDelegate, CorsRequest } from 'cors'

const allowedOrigins = ['http://localhost:4000', 'https://yourdomain.com']

export const corsOptionsDelegate: CorsOptionsDelegate<CorsRequest> = (
  req,
  callback
) => {
  const origin = req.headers?.origin
  if (!origin || allowedOrigins.includes(origin)) {
    callback(null, {
      origin: true,
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS'],
    })
  } else {
    callback(new Error('Not allowed by CORS'), { origin: false })
  }
}
