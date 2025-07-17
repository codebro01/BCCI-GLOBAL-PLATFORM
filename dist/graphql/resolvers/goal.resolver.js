"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { safeValidate } = require('@helpers/zodInputValidator');
const GoalsServices = require('@services/goalsServices');
const { goalSchema, updateGoalSchema, idSchema, } = require('@zodSchema/zodSchema');
const { authMiddleware, RBAC } = require('@middlewares/authMiddleware');
module.exports = {
    Query: {
        goals: async (_, {}, context) => {
            const user = await authMiddleware(context);
            return GoalsServices.getGoals(user);
        },
        goal: async (_, { id }, context) => {
            const user = await authMiddleware(context);
            RBAC(user, ['USER', 'ADMIN']);
            const validatedInputs = safeValidate(idSchema, { id });
            if (!validatedInputs.success) {
                validatedInputs.errors.map((error) => {
                    throw new Error(error.message);
                });
                return;
            }
            return GoalsServices.getGoal(validatedInputs.data.id);
        },
    },
    Mutation: {
        createGoal: async (_, { goal }, context) => {
            const user = await authMiddleware(context);
            RBAC(user, ['ADMIN', 'USER']);
            const validatedInputs = safeValidate(goalSchema, goal);
            // console.log('passed zod', validatedInputs.errors)
            if (!validatedInputs.success) {
                validatedInputs.errors.map((error) => {
                    throw new Error(error.message);
                });
                return;
            }
            return GoalsServices.createGoal(validatedInputs.data, user);
        },
        updateGoal: async (_, { goal, goalId }, context) => {
            const user = await authMiddleware(context);
            RBAC(user, ['ADMIN', 'USER']);
            const validatedGoalInputs = safeValidate(updateGoalSchema, goal);
            const validateId = safeValidate(idSchema, { id: goalId });
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
            return GoalsServices.updateGoal(validatedGoalInputs.data, validateId.data.id, user);
        },
        deleteGoal: async (_, { goalId }, context) => {
            const user = await authMiddleware(context);
            RBAC(user, ['ADMIN', 'USER']);
            const validateId = safeValidate(idSchema, { id: goalId });
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
            return GoalsServices.deleteGoal(validateId.data.id, user);
        },
    },
};
//# sourceMappingURL=Goal.resolver.js.map