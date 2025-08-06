import { Console } from 'console'
import type { contextType } from 'types/global'
import type { GoalType, CellType } from 'types/resolvers'
import type { ErrorObjectType } from 'types/zod'
const { safeValidate } = require('@helpers/zodInputValidator')
const CellServices = require('@services/cellServices')
const {
  idSchema,
  cellSchema
} = require('@zodSchema/zodSchema')
const { authMiddleware, RBAC } = require('@middlewares/authMiddleware')

module.exports = {
  Query: {
    getCells: async (_: unknown, {}, context: contextType) => {
      const user = await authMiddleware(context)
      RBAC(user, ['ADMIN'])
      return CellServices.getCells(user)
    },
    getCell: async (
      _: unknown,
      { id }: { id: string },
      context: contextType
    ) => {
      const user = await authMiddleware(context)
      RBAC(user, ['USER', 'ADMIN'])

      const validatedInputs = safeValidate(idSchema, { id })
      if (!validatedInputs.success) {
        validatedInputs.errors.map((error: ErrorObjectType) => {
          throw new Error(error.message)
        })
        return
      }
      return CellServices.getCell(validatedInputs.data.id)
    },
  },

  Mutation: {
    createCell: async (
      _: unknown,
      { input }: { input: CellType },
      context: contextType
    ) => {
      const user = await authMiddleware(context)
      RBAC(user, ['ADMIN', 'USER'])

      console.log(input)

      const validatedInputs = safeValidate(cellSchema, input)
      // console.log('passed zod', validatedInputs.errors)
      if (!validatedInputs.success) {
        validatedInputs.errors.map((error: ErrorObjectType) => {
          throw new Error(error.message)
        })
        return
      }

      return CellServices.createCell(validatedInputs.data, user)
    },
    updateCell: async (
      _: unknown,
      { input, id }: { input: CellType; id: string },
      context: contextType
    ) => {
      const user = await authMiddleware(context)
      RBAC(user, ['ADMIN', 'USER'])

      const validatedGoalInputs = safeValidate(cellSchema, input)
      const validateId = safeValidate(idSchema, { id })
      // console.log('passed zod', validatedInputs.errors)
      if (validatedGoalInputs.errors) {
        validatedGoalInputs.errors.map((error: ErrorObjectType) => {
          throw new Error(error.message)
        })
        return
      }
      if (validateId.errors) {
        if (validateId.errors) {
          validateId.errors.map((error: ErrorObjectType) => {
            throw new Error(error.message)
          })
        }
        return
      }

      return CellServices.updateCell(
        validatedGoalInputs.data,
        validateId.data.id,
        user
      )
    },
    deleteCell: async (
      _: unknown,
      { id }: { id: string },
      context: contextType
    ) => {
      const user = await authMiddleware(context)
      RBAC(user, ['ADMIN', 'USER'])

      const validateId = safeValidate(idSchema, { id })
      // console.log('passed zod', validatedInputs.errors)
      console.log(validateId)
      if (validateId.errors) {
        if (validateId.errors) {
          validateId.errors.map((error: ErrorObjectType) => {
            throw new Error(error.message)
          })
        }
        return
      }
      return CellServices.deleteCell(validateId.data.id, user)
    },
  },
}
