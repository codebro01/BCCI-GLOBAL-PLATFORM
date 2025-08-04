"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { authMiddleware, RBAC } = require('@middlewares/authMiddleware');
const { signUpSchema, loginSchema, updateUserSchema, } = require('@zodSchema/zodSchema');
const { safeValidate } = require('@helpers/zodInputValidator');
const UserServices = require('@services/userServices');
module.exports = {
    Query: {
        users: async (_, {}, context) => {
            console.log('entered the resolver');
            const user = await authMiddleware(context);
            // console.log('user from resolver', user)
            RBAC(user, ['ADMIN']);
            return UserServices.getUsers();
        },
        user: async (_, { id }, context) => {
            const user = await authMiddleware(context);
            RBAC(user, ['ADMIN']);
            return UserServices.getUser(id);
        },
    },
    Mutation: {
        updateUser: async (_, { user }, context) => {
            const validatedInputs = safeValidate(updateUserSchema, user);
            const resUser = await authMiddleware(context);
            console.log('resUser', resUser);
            if (!validatedInputs.success) {
                validatedInputs.errors.map((error) => {
                    throw new Error(error.message);
                });
                return;
            }
            return UserServices.updateUser(resUser, user);
        },
        deleteUser: async (_, { id }, context) => {
            const user = await authMiddleware(context);
            RBAC(user, ['ADMIN']);
            /* ... */
            return UserServices.deleteUser(id);
        },
        updateUserPassword: async (_, { passwordData, }, context) => {
            const user = await authMiddleware(context);
            /* ... */
            return UserServices.updateUserPassword(user, passwordData);
        },
        logoutUser: async (_, args, context) => {
            const user = await authMiddleware(context);
            return UserServices.logoutUser(user, context);
        },
    },
};
//# sourceMappingURL=User.resolver.js.map