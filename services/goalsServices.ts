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
      let goals: GoalType[]
      // if (user.roles?.includes('ADMIN')) {
      //   goals = await Goal.find({}).populate('user')

      //   return goals
      // }
      goals = await Goal.find({ user: user.id }).populate('user')
      // console.log('goals', goals)
      const calculateCurrentProgress = goals.map((goal) => {
        // console.log(goal.target, goal.currentProgress)
        const progress = (goal.currentProgress / goal.target) * 100

        return { ...goal.toObject(), completionPercent: Math.round(progress), id:goal.id }
      })

      // console.log(calculateCurrentProgress)
      return calculateCurrentProgress
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

  async getGoal(id: string) {
    console.log(id)
    const goal = await Goal.findById({ _id: id })
    console.log(goal)
    if (!goal) graphQLError('Could not fetch goal, please try again!!!')
    return goal
  }

  async createGoal(goalInput: GoalType, user: Partial<User>) {
    try {
      // await Goal.deleteMany()
      const goal = new Goal({ ...goalInput, user: user.id })
      await goal.save()
      if (!goal)
        graphQLError(
          'An error occured creating goals, please try again',
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      return {
        user: user.id,
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

  async updateGoal(goalInput: GoalType, goalId: string, user: Partial<User>) {
    try {
      const goal = await Goal.findByIdAndUpdate(
        { _id: goalId },
        {
          ...goalInput,
          user: user.id,
        },
        {
          new: true,
          runValidators: true,
        }
      )

      console.log(goal)

      if (!goal)
        graphQLError(
          'An error occured updating goals, please try again',
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      return {
        goal,
        user: user.id,
        success: true,
        message: 'Goal updated!',
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
