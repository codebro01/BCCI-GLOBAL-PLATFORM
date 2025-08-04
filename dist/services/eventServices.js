"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { EventSchema: Event } = require('@models/Event');
const { graphQLError } = require('@helpers/errorHandler');
const { StatusCodes } = require('http-status-codes');
class EventServices {
    async getEvents(user) {
        try {
            let event;
            //   event = await Event.find({ user: user.id });
            event = await Event.find({});
            // console.log(calculateCurrentProgress)
            return event;
        }
        catch (error) {
            if (error instanceof Error) {
                graphQLError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
            }
            else {
                graphQLError('An unexpected error occurred', StatusCodes.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async getEvent(id) {
        // console.log(id)
        const event = await Event.findById({ _id: id });
        // console.log(event)
        if (!event)
            graphQLError(`There is not event with id ${id}, please try again!!!`);
        return event;
    }
    async createEvent(input, user) {
        try {
            // await Goal.deleteMany()
            // console.log(input)
            const event = new Event({ ...input, user: user.id });
            await event.save();
            if (!event)
                graphQLError('An error occured creating events, please try again', StatusCodes.INTERNAL_SERVER_ERROR);
            // console.log(event)
            return {
                id: event.id,
                user: user.id,
                success: true,
                message: 'Event successfull added!',
            };
        }
        catch (error) {
            if (error instanceof Error) {
                graphQLError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
            }
            else {
                graphQLError('An unexpected error occurred', StatusCodes.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async updateEvent(input, id, user) {
        // console.log('entered update event')
        try {
            const event = await Event.findByIdAndUpdate({ _id: id }, {
                ...input,
                user: user.id,
            }, {
                new: true,
                runValidators: true,
            });
            if (!event)
                graphQLError('An error occured updating events, please try again', StatusCodes.INTERNAL_SERVER_ERROR);
            // console.log('event', event)
            return {
                event,
                user: user.id,
                success: true,
                message: 'Event updated!',
            };
        }
        catch (error) {
            if (error instanceof Error) {
                graphQLError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
            }
            else {
                graphQLError('An unexpected error occurred', StatusCodes.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async deleteEvent(id, user) {
        try {
            if (!id)
                graphQLError('No event id provided', StatusCodes.BAD_REQUEST);
            const event = await Event.findByIdAndDelete({ _id: id });
            // console.log(event)
            // console.log('id', id)
            if (!event)
                graphQLError('Unknown id for selected event!', StatusCodes.INTERNAL_SERVER_ERROR);
            return {
                deleteEvent: event,
                success: true,
                message: 'Goal deleted!',
            };
        }
        catch (error) {
            if (error instanceof Error) {
                graphQLError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
            }
            else {
                graphQLError('An unexpected error occurred', StatusCodes.INTERNAL_SERVER_ERROR);
            }
        }
    }
}
module.exports = new EventServices();
//# sourceMappingURL=eventServices.js.map