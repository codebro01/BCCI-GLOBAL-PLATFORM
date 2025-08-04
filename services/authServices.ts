const { User } = require('@models/User')
const { graphQLError } = require('@helpers/errorHandler')
const { createTokenUser } = require('@helpers/createTokenUser')
const {
  sendAccessTokenCookie,
  generateAccessToken,
  generateRefreshToken,
  sendRefreshTokenCookie,
} = require('@helpers/jwt')
const { StatusCodes } = require('http-status-codes')
const detectPlatform = require('@helpers/detectPlatform')
import type { User as UserType } from 'types/resolvers'
import type { contextType } from 'types/global'

type userDataType = Pick<
  UserType,
  'email' | 'firstName' | 'password' | 'surname' | 'otherNames' | 'roles'
>

class AuthServices {
  async createUser(context: contextType, userData: userDataType) {
    // await User.deleteMany()
    const emailExist = await User.findOne({ email: userData.email })
    if (emailExist)
      return graphQLError('Email Already exist', StatusCodes.CONFLICT)
    const user = new User({ ...userData })
    await user.save()
    const tokenUser = createTokenUser(user)

    const platform = detectPlatform(context.req)
    // console.log(platform)
    if (platform === 'web') {
      sendAccessTokenCookie(context, tokenUser)
      sendRefreshTokenCookie(context, tokenUser)
    }
    if (platform === 'mobile') {
      const accessToken = generateAccessToken(
        tokenUser,
        process.env.ACCESS_TOKEN_SECRET
      )
      const refreshToken = generateRefreshToken(
        tokenUser,
        process.env.REFRESH_TOKEN_SECRET
      )
      context.res.setHeader('x-access-token', accessToken)
      context.res.setHeader('x-refresh-token', refreshToken)
    }

    return user
  }

  async loginUser(
    context: contextType,
    userData: Pick<UserType, 'email' | 'password'>
  ) {
    const user = await User.findOne({ email: userData.email })
    // console.log(user, 'before chcking pwd')
    if (!user) return graphQLError('Invalid Credentials', StatusCodes.NOT_FOUND)

    const passwordCorrect = await user.comparePwd(userData.password)
    // console.log(passwordCorrect, 'check password')
    if (!passwordCorrect)
      return graphQLError('Invalid Credentials', StatusCodes.NOT_FOUND)
    const tokenUser = createTokenUser(user)

    const platform = detectPlatform(context.req)
    // console.log('platform', platform)
    if (platform === 'web') {
      sendAccessTokenCookie(context, tokenUser)
      const refreshToken = sendRefreshTokenCookie(context, tokenUser)
      user.refreshToken = refreshToken
      await user.save()
    }
    if (platform === 'mobile') {

      const accessToken = generateAccessToken(
        tokenUser,
        process.env.ACCESS_TOKEN_SECRET
      )
      const refreshToken = generateRefreshToken(
        tokenUser,
        process.env.REFRESH_TOKEN_SECRET
      )
      context.res.setHeader('x-access-token', accessToken)
      context.res.setHeader('x-refresh-token', refreshToken)
      user.refreshToken = refreshToken

      await user.save()
    }

// console.log(context.res.getHeaders())

    return { message: 'Login Succesfull!!! 🚀' }
  }
}

module.exports = new AuthServices()
