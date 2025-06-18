import type { User } from 'types/resolvers'
import type {ZodErrorTypes, ErrorObjectType} from 'types/zod'
const { signUpSchema } = require('@zodSchema/zodSchema')
const { safeValidate } = require('@helpers/zodInputValidator')
const { generateToken } = require('@helpers/tokenGenerator')
const AuthServices = require('@services/authServices')

module.exports = {
  Query: {
    hello: () => 'hello world',
  },
  Mutation: {
    createUser: (_: unknown, { user }: { user: User }) => {
      const id = generateToken(8)
      const validatedInputs = safeValidate(signUpSchema, { ...user, id })

      if (!validatedInputs.success) {
        validatedInputs.errors.map((error: ErrorObjectType) => {
          throw new Error(error.message)
        })
        return;
      }
      // console.log({ ...validatedInputs.data, id: 1 })
      /* ... */
      return AuthServices.createUser(validatedInputs.data)
    },
    loginUser: (_: unknown, { user }: { user: User }) => {
      console.log('login user', user)
    },
  },
}
