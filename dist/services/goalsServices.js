"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Goal } = require('@models/Goals');
const { graphQLError } = require('@helpers/errorHandler');
const { StatusCodes } = require('http-status-codes');
class GoalsServices {
    async getGoals(user) {
        try {
            // console.log(user, user.roles?.includes('ADMIN'))
            let goals;
            // if (user.roles?.includes('ADMIN')) {
            //   goals = await Goal.find({}).populate('user')
            //   return goals
            // }
            goals = await Goal.find({ user: user.id }).populate('user');
            // console.log('goals', goals)
            const calculateCurrentProgress = goals.map((goal) => {
                // console.log(goal.target, goal.currentProgress)
                const progress = (goal.currentProgress / goal.target) * 100;
                return { ...goal.toObject(), completionPercent: Math.round(progress), id: goal.id };
            });
            // console.log(calculateCurrentProgress)
            return calculateCurrentProgress;
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
    async getGoal(id) {
        // console.log(id)
        const goal = await Goal.findById({ _id: id });
        // console.log(goal)
        if (!goal)
            graphQLError('Could not fetch goal, please try again!!!');
        return goal;
    }
    async createGoal(goalInput, user) {
        try {
            // await Goal.deleteMany()
            const goal = new Goal({ ...goalInput, user: user.id });
            await goal.save();
            if (!goal)
                graphQLError('An error occured creating goals, please try again', StatusCodes.INTERNAL_SERVER_ERROR);
            return {
                user: user.id,
                success: true,
                message: 'Goal successfull added!',
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
    async updateGoal(goalInput, goalId, user) {
        try {
            const goal = await Goal.findByIdAndUpdate({ _id: goalId }, {
                ...goalInput,
                user: user.id,
            }, {
                new: true,
                runValidators: true,
            });
            // console.log(goal)
            if (!goal)
                graphQLError('An error occured updating goals, please try again', StatusCodes.INTERNAL_SERVER_ERROR);
            return {
                goal,
                user: user.id,
                success: true,
                message: 'Goal updated!',
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
    async deleteGoal(goalId, user) {
        try {
            // console.log('goalId', goalId)
            const goal = await Goal.findByIdAndDelete({ _id: goalId });
            // console.log(goal)
            if (!goal)
                graphQLError('An error occured while deleting goal, please try again', StatusCodes.INTERNAL_SERVER_ERROR);
            return {
                deleteGoal: goal,
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
module.exports = new GoalsServices();
//# sourceMappingURL=goalsServices.js.map