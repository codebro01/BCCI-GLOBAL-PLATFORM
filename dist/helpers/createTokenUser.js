"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createTokenUser = (user) => {
    return {
        email: user.email,
        id: user.id,
        firstName: user.firstName,
        surname: user.surname,
        roles: user.roles,
        otherNames: user.otherNames
    };
};
module.exports = { createTokenUser };
//# sourceMappingURL=createTokenUser.js.map