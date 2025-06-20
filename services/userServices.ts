const { graphQLError } = require('@helpers/errorHandler')
const { authMiddleware, RBAC } = require('@middlewares/authMiddleware')
const { User } = require('@models/User')
const { StatusCodes } = require('http-status-codes')
import type { User as UserType } from 'types/resolvers'
import type { contextType } from 'types/global'

class UserServices {
  async getUsers() {
    const users = await User.find({})

    if (!users)
      graphQLError(
        'Could not get users at this time, please try again',
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    // console.log(users)
    return users
  }
  async getUser(id: string) {
    if (!id) graphQLError('No id was provided', StatusCodes.NOT_ACCEPTABLE)
    const user = await User.findOne({ _id: id })

    if (!user)
      graphQLError(
        `Could not find user with Id: ${id}`,
        StatusCodes.INTERNAL_SERVER_ERROR
      )

    return user
  }
}

module.exports = new UserServices()
