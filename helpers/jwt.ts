import type { tokenUserType, JWTErrorType } from 'types/jwt_tokenUser'
import type { contextType } from 'types/global'
const { graphQLError } = require('@helpers/errorHandler')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

const generateAccessToken = (
  tokenUser: tokenUserType,
  tokenSecret: string | undefined
) => {
  if (!tokenSecret)
    return graphQLError('Missing Token Secret', StatusCodes.BAD_REQUEST)
  return jwt.sign(tokenUser, tokenSecret, {
    expiresIn: '15m',
  })
}
const generateRefreshToken = (
  tokenUser: tokenUserType,
  tokenSecret: string | undefined
) => {
  if (!tokenSecret)
    return graphQLError('Missing Token Secret', StatusCodes.BAD_REQUEST)
  return jwt.sign(tokenUser, tokenSecret, {
    expiresIn: '5d',
  })
}

const verifyJWT = (
  token: string,
  { tokenSecret }: { tokenSecret: string }
): tokenUserType | null => {
  try {
    return jwt.verify(token, tokenSecret) as tokenUserType
  } catch (err) {
    return null
    // throw graphQLError('Invalid or expired token', StatusCodes.UNAUTHORIZED)
  }
}

const sendAccessTokenCookie = (context: contextType, user: tokenUserType) => {
  const accessToken = generateAccessToken(user, process.env.ACCESS_TOKEN_SECRET)

  context.res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 15, // 15 MINUETES
  })

  return accessToken
}
const sendRefreshTokenCookie = (context: contextType, user: tokenUserType) => {
  const refreshToken = generateRefreshToken(
    user,
    process.env.REFRESH_TOKEN_SECRET
  )

  context.res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  })

  return refreshToken
}

const logout = (context: contextType) => {
  context.res.clearCookie('access_token')
  context.res.clearCookie('refresh_token')
}

module.exports = {
  sendAccessTokenCookie,
  sendRefreshTokenCookie,
  verifyJWT,
  generateAccessToken,
  generateRefreshToken,
  logout,
}
