const { User } = require('@models/User')
const { graphQLError } = require('@helpers/errorHandler')
const { createTokenUser } = require('@helpers/createTokenUser')
const { sendCookieResp } = require('@helpers/jwt')
const { StatusCodes } = require('http-status-codes')
import { create } from 'domain'
import type { User as UserType } from '../types/resolvers'
import type { contextType } from '../types/global'

type PickUser = Pick<
  UserType,
  'email' | 'firstName' | 'password' | 'surname' | 'otherNames' | 'roles' | 'id'
>

class AuthServices {
  async createUser(context:contextType, userData: PickUser) {
    await User.deleteMany()
    const emailExist = await User.findOne({ email: userData.email })
    if (emailExist)
      return graphQLError('Email Already exist', StatusCodes.CONFLICT)
    const user = new User({ ...userData })
    await user.save()
    const tokenUser = createTokenUser(user);

    sendCookieResp(context, tokenUser);
    console.log(user, tokenUser)

    return user
  }
}

module.exports = new AuthServices()
