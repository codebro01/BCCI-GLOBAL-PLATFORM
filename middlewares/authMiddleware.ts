const { verifyJWT, sendAccessTokenCookie } = require('@helpers/jwt')
const { graphQLError } = require('@helpers/errorHandler')
const { StatusCodes } = require('http-status-codes')
const { User } = require('@models/User')
import { access } from 'fs'
import { decode } from 'punycode'
import type { contextType, RoleType } from 'types/global'
import type { tokenUserType } from 'types/jwt_tokenUser'

const authMiddleware = async (context: contextType) => {
  // console.log(context.req.headers)
  // console.log('entered auth middleware func')
  const access_token =
    context.req.cookies.access_token || context.req.headers['x-access-token']
  const refresh_token =
    context.req.cookies.refresh_token || context.req.headers['x-refresh-token']
  // console.log(access_token, refresh_token)
  let decodedAccessToken
  let decodedRefreshToken
  // console.log('access_token', access_token)
  // console.log('refresh_token', refresh_token)
  // Try access token first
  try {
    // console.log('entered first if')

    if (access_token) {
      decodedAccessToken = verifyJWT(access_token, {
        tokenSecret: process.env.ACCESS_TOKEN_SECRET,
      })
    }
  } catch (err) {
    console.log(err)
    // Access token is invalid/expired – do nothing for now
  }

  // console.log('refresh_token_secret', context.req.cookies)
  // If access token failed, try refresh token
  if (!decodedAccessToken && refresh_token) {
    // console.log('entered second if')
    try {
      decodedRefreshToken = verifyJWT(refresh_token, {
        tokenSecret: process.env.REFRESH_TOKEN_SECRET,
      })
      // console.log('decodedRefreshToken', decodedRefreshToken)
      if (!decodedRefreshToken)
        graphQLError('Invalid User', StatusCodes.UNAUTHORIZED)
      const { email, id, fullName, username, roles } = decodedRefreshToken
      const newAccessTokenPayload = {
        email,
        id,
        fullName,
        username,
        roles,
      }
      if (decodedRefreshToken) {
        const user = await User.findOne({ _id: id })
        // console.log('user is available', user)
        if (!user) graphQLError('Invalid User', StatusCodes.UNAUTHORIZED)
        const validRefreshToken = await user.compareRefreshToken(refresh_token)
        // console.log('valid refresh token', validRefreshToken)

        if (!validRefreshToken)
          graphQLError('Token Mismatch', StatusCodes.BAD_REQUEST)
        sendAccessTokenCookie(context, newAccessTokenPayload)

        // console.log('newlySentAccessToken', newlySentAccessToken)
        decodedAccessToken = {
          email,
          id,
          fullName,
          username,
          roles,
        }
        // console.log('decodedAccessToken', decodedAccessToken)

        // decodedAccessToken = newAccessTokenPayload // treat it as fresh session
      }
    } catch (err) {
      // Refresh token also invalid
      context.res.clearCookie('access_token')
      context.res.clearCookie('refresh_token')

      console.log(err)
    }
  }

  // Final checks
  if (!access_token && !refresh_token) {
    graphQLError(
      'No token or invalid token provided, please login again',
      StatusCodes.NOT_FOUND
    )
  }

  if (!decodedAccessToken && !decodedRefreshToken) {
    graphQLError('Invalid or expired token', StatusCodes.UNAUTHORIZED)
  }

  return decodedAccessToken
}

const RBAC = (user: tokenUserType, requiredRole: RoleType) => {
  // console.log(user.roles, requiredRole)
  // console.log(user)
  if (!user || !user.roles || user.roles.length < 1) {
    graphQLError(
      'User is not permitted to enter here!!!!!',
      StatusCodes.UNAUTHORIZED
    )
  }

  // Check if user has at least one required permission
  const hasRole = requiredRole.some((role) => user.roles.includes(role))

  if (!hasRole) {
    graphQLError(
      'User does not have the required permission to access this route',
      StatusCodes.FORBIDDEN
    )
  }
}

module.exports = { RBAC, authMiddleware }
