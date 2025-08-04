import type { User } from 'types/resolvers'
import type { contextType } from 'types/global'
import type { ErrorObjectType } from 'types/zod'
const { signUpSchema, loginSchema } = require('@zodSchema/zodSchema')
const { safeValidate } = require('@helpers/zodInputValidator')
// const { generateToken } = require('@helpers/tokenGenerator')
const AuthServices = require('@services/authServices')

module.exports = {
  Mutation: {
    createUser: (
      _: unknown,
      { user }: { user: User },
      context: contextType
    ) => {
      const validatedInputs = safeValidate(signUpSchema, user)

      if (!validatedInputs.success) {
        validatedInputs.errors.map((error: ErrorObjectType) => {
          throw new Error(error.message)
        })
        return
      }
      // console.log({ ...validatedInputs.data })
      /* ... */
      return AuthServices.createUser(context, validatedInputs.data)
    },
    loginUser: (
      _: unknown,
      { user }: { user: Pick<User, 'email' | 'password'> },
      context: contextType
    ) => {
      console.log('login user', user)
      const validatedInputs = safeValidate(loginSchema, user)

      if (!validatedInputs.success) {
        validatedInputs.errors.map((error: ErrorObjectType) => {
          throw new Error(error.message)
        })
        return
      }
      /* ... */
      return AuthServices.loginUser(context, validatedInputs.data)
    },
  },
}
