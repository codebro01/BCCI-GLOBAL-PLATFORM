import type { User } from 'types/resolvers'
import type { contextType } from 'types/global'
import type {ZodErrorTypes, ErrorObjectType} from 'types/zod';
import type { Response, Request } from 'express';
const { signUpSchema } = require('@zodSchema/zodSchema')
const { safeValidate } = require('@helpers/zodInputValidator')
const { generateToken } = require('@helpers/tokenGenerator')
const AuthServices = require('@services/authServices')

module.exports = {
  Query: {
    hello: () => 'hello world',
  },
  Mutation: {
    createUser: (_: unknown, { user }: { user: User }, context: contextType) => {
      const id = generateToken(8)
      const validatedInputs = safeValidate(signUpSchema, { ...user, id })

      if (!validatedInputs.success) {
        validatedInputs.errors.map((error: ErrorObjectType) => {
          throw new Error(error.message)
        })
        return;
      }
      console.log({ ...validatedInputs.data })
      /* ... */
      return AuthServices.createUser(context, validatedInputs.data)
    },
    loginUser: (_: unknown, { user }: { user: User }) => {
      console.log('login user', user)
    },
  },
}
