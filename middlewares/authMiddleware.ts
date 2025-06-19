const { verifyJWT } = require('@helpers/jwt')
const { graphQLError } = require('@helpers/errorHandler')
const { StatusCodes } = require('http-status-codes')
import type { contextType, RoleType } from 'types/global'
import type { tokenUserType } from 'types/jwt_tokenUser'


 const authMiddleware = (context: contextType) => {
  const { token } = context.req?.cookies

  if (!token) return graphQLError('No Token provided', StatusCodes.NOT_FOUND)

  try {
    const decoded = verifyJWT({ token })

    if (!decoded)
      throw graphQLError('Invalid Token provided', StatusCodes.BAD_REQUEST)

    return decoded
  } catch (err) {
    throw graphQLError(
      'An error occured identifying user, please try logging in again!!! ',
      'BAD_REQUEST'
    )
  }
}

 const RBAC = (user:tokenUserType, requiredRole:RoleType) => {
  if (!user || !user.roles || user.roles.length < 1) {
    throw graphQLError(
      'User is not permitted to enter here!!!!!',
      StatusCodes.UNAUTHORIZED
    )
  }  

  // Check if user has at least one required permission
  const hasRole = requiredRole.some((role) => user.roles.includes(role))

  if (!hasRole) {
    throw graphQLError(
      'User does not have the required permission to access this route',
      StatusCodes.FORBIDDEN
    )
  }
}

module.exports = {RBAC, authMiddleware}