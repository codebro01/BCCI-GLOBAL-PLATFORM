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
      try {
        const validatedInputs = safeValidate(signUpSchema, user)

        if (!validatedInputs.success) {
          validatedInputs.errors.map((error: ErrorObjectType) => {
            console.log(error)
            throw new Error(`${error.field} is ${error.message}`)
          })
          return
        }
        // console.log({ ...validatedInputs.data })
        /* ... */
        return AuthServices.createUser(context, validatedInputs.data)
      } catch (error) {
        console.log(error)
      }
    },
    loginUser: (
      _: unknown,
      { user }: { user: Pick<User, 'email' | 'password'> },
      context: contextType
    ) => {
      const validatedInputs = safeValidate(loginSchema, user)

      if (!validatedInputs.success) {
        validatedInputs.errors.map((error: ErrorObjectType) => {
          throw new Error(error.message)
        })
        return
      }

      console.log('inputs validated')
      /* ... */
      return AuthServices.loginUser(context, validatedInputs.data)
    },
  },
}
