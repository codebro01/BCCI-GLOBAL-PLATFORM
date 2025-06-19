const { User } = require('@models/User')
const { graphQLError } = require('@helpers/errorHandler')
const { createTokenUser } = require('@helpers/createTokenUser')
const { sendCookieResp } = require('@helpers/jwt')
const { StatusCodes } = require('http-status-codes')
import { create } from 'domain'
import type { User as UserType } from '../types/resolvers'
import type { contextType } from '../types/global'

type userDataType = Pick<
  UserType,
  'email' | 'firstName' | 'password' | 'surname' | 'otherNames' | 'roles'
>

class AuthServices {
  async createUser(context:contextType, userData: userDataType) {
    // await User.deleteMany()
    const emailExist = await User.findOne({ email: userData.email })
    if (emailExist)
      return graphQLError('Email Already exist', StatusCodes.CONFLICT)
    const user = new User({ ...userData })
    await user.save()
    const tokenUser = createTokenUser(user);

    sendCookieResp(context, tokenUser);
    return user
  }
  async loginUser(context:contextType, userData: Pick<UserType, 'email' | 'password'>) {
    console.log(userData.email)
    const user = await User.findOne({ email: userData.email })
    if (!user)
      return graphQLError('Invalid Credentials', StatusCodes.NOT_FOUND)

   const passwordCorrect =  await user.comparePwd(userData.password);
   if (!passwordCorrect)
     return graphQLError('Invalid Credentials', StatusCodes.NOT_FOUND) 
    const tokenUser = createTokenUser(user);

    sendCookieResp(context, tokenUser);
    return {message: "Login Succesfull!!! 🚀"}
  }
}

module.exports = new AuthServices()
