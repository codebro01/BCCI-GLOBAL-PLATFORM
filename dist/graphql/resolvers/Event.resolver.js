"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { safeValidate } = require('@helpers/zodInputValidator');
const EventServices = require('@services/eventServices');
const { updateEventSchema, createEventSchema, EventStatusEnum, idSchema } = require('@zodSchema/zodSchema');
const { authMiddleware, RBAC } = require('@middlewares/authMiddleware');
module.exports = {
    Query: {
        getEvents: async (_, {}, context) => {
            const user = await authMiddleware(context);
            RBAC(user, ['ADMIN']);
            return EventServices.getEvents(user);
        },
        getEvent: async (_, { id }, context) => {
            const user = await authMiddleware(context);
            RBAC(user, ['USER', 'ADMIN']);
            const validatedInputs = safeValidate(idSchema, { id });
            if (!validatedInputs.success) {
                validatedInputs.errors.map((error) => {
                    throw new Error(error.message);
                });
                return;
            }
            return EventServices.getEvent(validatedInputs.data.id);
        },
    },
    Mutation: {
        createEvent: async (_, { input }, context) => {
            const user = await authMiddleware(context);
            RBAC(user, ['ADMIN', 'USER']);
            const validatedInputs = safeValidate(createEventSchema, input);
            // console.log('passed zod', validatedInputs.errors)
            if (!validatedInputs.success) {
                validatedInputs.errors.map((error) => {
                    throw new Error(error.message);
                });
                return;
            }
            return EventServices.createEvent(validatedInputs.data, user);
        },
        updateGoal: async (_, { input, id }, context) => {
            const user = await authMiddleware(context);
            RBAC(user, ['ADMIN', 'USER']);
            const validatedGoalInputs = safeValidate(updateEventSchema, input);
            const validateId = safeValidate(idSchema, { id });
            // console.log('passed zod', validatedInputs.errors)
            if (validatedGoalInputs.errors) {
                validatedGoalInputs.errors.map((error) => {
                    throw new Error(error.message);
                });
                return;
            }
            if (validateId.errors) {
                if (validateId.errors) {
                    validateId.errors.map((error) => {
                        throw new Error(error.message);
                    });
                }
                return;
            }
            return EventServices.updateEvent(validatedGoalInputs.data, validateId.data.id, user);
        },
        deleteEvent: async (_, { id }, context) => {
            const user = await authMiddleware(context);
            RBAC(user, ['ADMIN', 'USER']);
            const validateId = safeValidate(idSchema, { id });
            // console.log('passed zod', validatedInputs.errors)
            console.log(validateId);
            if (validateId.errors) {
                if (validateId.errors) {
                    validateId.errors.map((error) => {
                        throw new Error(error.message);
                    });
                }
                return;
            }
            return EventServices.deleteEvent(validateId.data.id, user);
        },
    },
};
//# sourceMappingURL=Event.resolver.js.map