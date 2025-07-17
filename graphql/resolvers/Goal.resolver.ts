import { Console } from 'console'
import type { contextType } from 'types/global'
import type { GoalType } from 'types/resolvers'
import type { ErrorObjectType } from 'types/zod'
const { safeValidate } = require('@helpers/zodInputValidator')
const GoalsServices = require('@services/goalsServices')
const {
  goalSchema,
  updateGoalSchema,
  idSchema,
} = require('@zodSchema/zodSchema')
const { authMiddleware, RBAC } = require('@middlewares/authMiddleware')

module.exports = {
  Query: {
    goals: async (_: unknown, {}, context: contextType) => {
      const user = await authMiddleware(context)
      return GoalsServices.getGoals(user)
    },
    goal: async (_: unknown, { id }: { id: string }, context: contextType) => {
      const user = await authMiddleware(context)
      RBAC(user, ['USER', 'ADMIN'])

      const validatedInputs = safeValidate(idSchema, { id })
      if (!validatedInputs.success) {
        validatedInputs.errors.map((error: ErrorObjectType) => {
          throw new Error(error.message)
        })
        return
      }
      return GoalsServices.getGoal(validatedInputs.data.id)
    },
  },

  Mutation: {
    createGoal: async (
      _: unknown,
      { goal }: { goal: GoalType },
      context: contextType
    ) => {
      const user = await authMiddleware(context)
      RBAC(user, ['ADMIN', 'USER'])

      const validatedInputs = safeValidate(goalSchema, goal)
      // console.log('passed zod', validatedInputs.errors)
      if (!validatedInputs.success) {
        validatedInputs.errors.map((error: ErrorObjectType) => {
          throw new Error(error.message)
        })
        return
      }

      return GoalsServices.createGoal(validatedInputs.data, user)
    },
    updateGoal: async (
      _: unknown,
      { goal, goalId }: { goal: GoalType; goalId: string },
      context: contextType
    ) => {
      const user = await authMiddleware(context)
      RBAC(user, ['ADMIN', 'USER'])

      const validatedGoalInputs = safeValidate(updateGoalSchema, goal)
      const validateId = safeValidate(idSchema, { id: goalId })
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

      return GoalsServices.updateGoal(
        validatedGoalInputs.data,
        validateId.data.id,
        user
      )
    },
    deleteGoal: async (
      _: unknown,
      { goalId }: { goalId: string },
      context: contextType
    ) => {
      const user = await authMiddleware(context)
      RBAC(user, ['ADMIN', 'USER'])

      const validateId = safeValidate(idSchema, { id: goalId })
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
      return GoalsServices.deleteGoal(validateId.data.id, user)
    },
  },
}
