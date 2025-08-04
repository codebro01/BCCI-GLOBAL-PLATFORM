import { Console } from 'console'
import type { contextType } from 'types/global'
import type { EventType } from 'types/resolvers'
import type { User } from 'types/resolvers'
const { EventSchema: Event } = require('@models/Event')
const { graphQLError } = require('@helpers/errorHandler')
const { StatusCodes } = require('http-status-codes')

class EventServices {
  async getEvents(user: Partial<User>) {
    try {
      let event: EventType[]

      //   event = await Event.find({ user: user.id });
      event = await Event.find({})

      // console.log(calculateCurrentProgress)
      return event
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

  async getEvent(id: string) {
    // console.log(id)
    const event = await Event.findById({ _id: id })
    // console.log(event)
    if (!event)
      graphQLError(`There is not event with id ${id}, please try again!!!`)
    return event
  }

  async createEvent(input: EventType, user: Partial<User>) {
    try {
      // await Goal.deleteMany()
      // console.log(input)
      const event = new Event({ ...input, user: user.id })
      await event.save()
      if (!event)
        graphQLError(
          'An error occured creating events, please try again',
          StatusCodes.INTERNAL_SERVER_ERROR
        )

      // console.log(event)
      return {
        id: event.id,
        user: user.id,
        success: true,
        message: 'Event successfull added!',
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

  async updateEvent(input: EventType, id: string, user: Partial<User>) {
    // console.log('entered update event')
    try {
      const event = await Event.findByIdAndUpdate(
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

      if (!event)
        graphQLError(
          'An error occured updating events, please try again',
          StatusCodes.INTERNAL_SERVER_ERROR
        )

      // console.log('event', event)
      return {
        event,
        user: user.id,
        success: true,
        message: 'Event updated!',
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
  async deleteEvent(id: string, user: Partial<User>) {
    try {
      if (!id) graphQLError('No event id provided', StatusCodes.BAD_REQUEST)
      const event = await Event.findByIdAndDelete({ _id: id })
      // console.log(event)
      // console.log('id', id)
      if (!event)
        graphQLError(
          'Unknown id for selected event!',
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      return {
        deleteEvent: event,
        success: true,
        message: 'Goal deleted!',
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

module.exports = new EventServices()
