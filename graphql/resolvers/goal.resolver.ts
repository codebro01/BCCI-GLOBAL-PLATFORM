import type { contextType } from 'types/global'
import type { GoalType } from 'types/resolvers'
import type { ErrorObjectType } from 'types/zod'
const { safeValidate } = require('@helpers/zodInputValidator')
const GoalsServices = require('@services/goalsServices')
const { goalSchema, updateGoalSchema } = require('@zodSchema/zodSchema')
const { authMiddleware, RBAC } = require('@middlewares/authMiddleware')

module.exports = {
  Query: {
    goals: async (_: unknown, {}, context: contextType) => {
        const user = await authMiddleware(context);
      return GoalsServices.getGoals(user)
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
      if (!validatedInputs.success) {
        validatedInputs.errors.map((error: ErrorObjectType) => {
          throw new Error(error.message)
        })
        return
      }

      return GoalsServices.createGoal(validatedInputs.data, user)
    },
  },
}
