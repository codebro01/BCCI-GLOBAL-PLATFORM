import type { contextType } from 'types/global'
import type { GoalType } from 'types/resolvers'
import type { User } from 'types/resolvers'

const { Goal } = require('@models/Goals')
const { graphQLError } = require('@helpers/errorHandler')
const { StatusCodes } = require('http-status-codes')

class GoalsServices {
  async getGoals(user: Partial<User>) {
    try {
        // console.log(user, user.roles?.includes('ADMIN'))
      let goals: GoalType
      if (user.roles?.includes('ADMIN')) {
        goals = await Goal.find({}).populate('user')

        return goals
      }
      goals = await Goal.find({ user: user.id }).populate('user')
    //   console.log(goals)
      return goals
    } catch (error: unknown) {
      if (error instanceof Error) {
        graphQLError(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
      } else {
        graphQLError(
          'An unexpected error occurred',
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      }
    }
  }

  async createGoal(goalInput: GoalType, user: Partial<User>) {
    try {
      console.log(user)
      const goal = new Goal({ ...goalInput, user: user.id })
      await goal.save()
      if (!goal)
        graphQLError(
          'An error occured creating goals, please try again',
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      return {
        user:user.id, 
        success: true,
        message: 'Goal successfull added!',
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        graphQLError(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
      } else {
        graphQLError(
          'An unexpected error occurred',
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      }
    }
  }
}

module.exports = new GoalsServices()
