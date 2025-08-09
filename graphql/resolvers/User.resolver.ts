import type { User } from 'types/resolvers'
import type { contextType } from 'types/global'
import type { ZodErrorTypes, ErrorObjectType } from 'types/zod'
import type { Response, Request } from 'express'
import type { tokenUserType } from 'types/jwt_tokenUser'
import { userInfo } from 'os'
const { authMiddleware, RBAC } = require('@middlewares/authMiddleware')

const {
  signUpSchema,
  loginSchema,
  updateUserSchema,
} = require('@zodSchema/zodSchema')
const { safeValidate } = require('@helpers/zodInputValidator')
const UserServices = require('@services/userServices')

module.exports = {
  Query: {
    users: async (_: unknown, {}, context: contextType) => {
      console.log('entered the resolver')
      const user = await authMiddleware(context)
      // console.log('user from resolver', user)
      RBAC(user, ['ADMIN'])
      return UserServices.getUsers()
    },
    user: async (_: unknown, { id }: { id: string }, context: contextType) => {
      const user = await authMiddleware(context)
      RBAC(user, ['ADMIN'])
      return UserServices.getUser(id)
    },
  },
  Mutation: {
    updateUser: async (
      _: unknown,
      { user }: { user: User },
      context: contextType
    ) => {
      const validatedInputs = safeValidate(updateUserSchema, user)

      const resUser = await authMiddleware(context)
      console.log('resUser', resUser)
      if (!validatedInputs.success) {
        validatedInputs.errors.map((error: ErrorObjectType) => {
          throw new Error(error.message)
        })
        return
      }
      return UserServices.updateUser(resUser, user)
    },
    deleteUser: async (
      _: unknown,
      { id }: { id: string },
      context: contextType
    ) => {
      const user = await authMiddleware(context)
      RBAC(user, ['ADMIN'])
      /* ... */
      return UserServices.deleteUser(id)
    },
    updateUserPassword: async (
      _: unknown,
      {
        passwordData,
      }: { passwordData: { newPassword: string; oldPassword: string } },
      context: contextType
    ) => {
      const user = await authMiddleware(context)
      /* ... */
      return UserServices.updateUserPassword(user, passwordData)
    },
    logoutUser: async (_: unknown, args: unknown, context: contextType) => {
      const user = await authMiddleware(context)

      return UserServices.logoutUser(user, context)
    },
  },
}
