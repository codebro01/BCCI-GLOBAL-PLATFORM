import { Console } from 'console'
import type { contextType } from 'types/global'
import type { GoalType, ClusterType, Cluster } from 'types/resolvers'
import type { ErrorObjectType } from 'types/zod'
const { safeValidate } = require('@helpers/zodInputValidator')
const ClusterServices = require('@services/clusterServices')
const {
  idSchema,
  clusterSchema
} = require('@zodSchema/zodSchema')
const { authMiddleware, RBAC } = require('@middlewares/authMiddleware')

module.exports = {
  Query: {
    getClusters: async (_: unknown, {}, context: contextType) => {
      const user = await authMiddleware(context)
      RBAC(user, ['ADMIN'])
      return ClusterServices.getClusters(user)
    },
    getCluster: async (
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
      return ClusterServices.getCluster(validatedInputs.data.id)
    },
  },

  Mutation: {
    createCluster: async (
      _: unknown,
      { input }: { input: ClusterType },
      context: contextType
    ) => {

      // console.log('input', input)
      const user = await authMiddleware(context)
      RBAC(user, ['ADMIN', 'USER'])

      const validatedInputs = safeValidate(clusterSchema, input)
      // console.log('passed zod', validatedInputs.errors)
      if (!validatedInputs.success) {
        validatedInputs.errors.map((error: ErrorObjectType) => {
          throw new Error(error.message)
        })
        return
      }

      return ClusterServices.createCluster(validatedInputs.data, user)
    },
    updateCluster: async (
      _: unknown,
      { input, id }: { input: ClusterType; id: string },
      context: contextType
    ) => {
      const user = await authMiddleware(context)
      RBAC(user, ['ADMIN', 'USER'])

      const validatedGoalInputs = safeValidate(clusterSchema, input)
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

      return ClusterServices.updateCluster(
        validatedGoalInputs.data,
        validateId.data.id,
        user
      )
    },
    deleteCluster: async (
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
      return ClusterServices.deleteCluster(validateId.data.id, user)
    },
  },
}
