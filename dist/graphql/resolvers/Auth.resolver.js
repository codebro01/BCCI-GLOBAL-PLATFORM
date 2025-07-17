"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { signUpSchema, loginSchema } = require('@zodSchema/zodSchema');
const { safeValidate } = require('@helpers/zodInputValidator');
// const { generateToken } = require('@helpers/tokenGenerator')
const AuthServices = require('@services/authServices');
module.exports = {
    Mutation: {
        createUser: (_, { user }, context) => {
            const validatedInputs = safeValidate(signUpSchema, user);
            if (!validatedInputs.success) {
                validatedInputs.errors.map((error) => {
                    throw new Error(error.message);
                });
                return;
            }
            // console.log({ ...validatedInputs.data })
            /* ... */
            return AuthServices.createUser(context, validatedInputs.data);
        },
        loginUser: (_, { user }, context) => {
            console.log('login user', user);
            const validatedInputs = safeValidate(loginSchema, user);
            if (!validatedInputs.success) {
                validatedInputs.errors.map((error) => {
                    throw new Error(error.message);
                });
                return;
            }
            /* ... */
            return AuthServices.loginUser(context, validatedInputs.data);
        },
    },
};
//# sourceMappingURL=Auth.resolver.js.map