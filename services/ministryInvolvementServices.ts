
import { Console } from 'console'
import type { contextType } from 'types/global'
import type { MinistryInvolvementType } from 'types/resolvers'
import type { User } from 'types/resolvers'
const {
  ministryInvolvement: MinistryInvolvement,
} = require('@models/MinistryInvolvement')
const { graphQLError } = require('@helpers/errorHandler')
const { StatusCodes } = require('http-status-codes')

class MinistryInvolvementServices {
  async getMinistryInvolvements(user: Partial<User>) {
    try {
      let ministryInvolvement: MinistryInvolvementType[]

      //   event = await MinistryInvolvement.find({ user: user.id });
      ministryInvolvement = await MinistryInvolvement.find({ user: user.id })

      // console.log(calculateCurrentProgress)
      return ministryInvolvement
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

  async getMinistryInvolvement(id: string) {
    // console.log(id)
    const ministryInvolvement = await MinistryInvolvement.findById({ _id: id })
    // console.log(event)
    if (!ministryInvolvement)
      graphQLError(`There is not event with id ${id}, please try again!!!`)
    return ministryInvolvement
  }

  async createMinistryInvolvement(
    input: MinistryInvolvementType,
    user: Partial<User>
  ) {
    try {
      // await Goal.deleteMany()
      // console.log(input)
      const ministryInvolvement = new MinistryInvolvement({
        ...input,
        user: user.id,
      })
      await ministryInvolvement.save()
      if (!ministryInvolvement)
        graphQLError(
          'An error occured creating events, please try again',
          StatusCodes.INTERNAL_SERVER_ERROR
        )

      // console.log(event)
      return {
        id: ministryInvolvement._id, 
        user: user.id,
        success: true,
        message: 'MinistryInvolvement created Successfully',
        achievement: ministryInvolvement.achievement,
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

  async updateMinistryInvolvement(
    input: Partial<MinistryInvolvementType>,
    id: string,
    user: Partial<User>
  ) {
    // console.log('entered update event')
    try {
      const ministryInvolvement = await MinistryInvolvement.findByIdAndUpdate(
        { _id: id },
        {
          ...input,
          user: user.id,
        },
        {
          new: true,
          runValidators: true,
        }
      )

      if (!ministryInvolvement)
        graphQLError(
          'An error occured updating ministry involvements, please try again',
          StatusCodes.INTERNAL_SERVER_ERROR
        )

      // console.log('event', event)
      return {
        id: ministryInvolvement._id,
        user: user.id,
        success: true,
        message: 'MinistryInvolvement created Successfully',
        achievement: ministryInvolvement.achievement,
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
  async deleteMinistryInvolvement(id: string, user: Partial<User>) {
    try {
      if (!id) graphQLError('No ministry involvement id provided', StatusCodes.BAD_REQUEST)
      const ministryInvolvement = await MinistryInvolvement.findByIdAndDelete({ _id: id })
      // console.log(ministryInvolvement)
      // console.log('id', id)
      if (!ministryInvolvement)
        graphQLError(
          'Unknown id for selected event!',
          StatusCodes.INTERNAL_SERVER_ERROR
        )
       return {
         id: ministryInvolvement._id,
         user: user.id,
         success: true,
         message: 'MinistryInvolvement created Successfully',
         achievement: ministryInvolvement.achievement,
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

module.exports = new MinistryInvolvementServices()
