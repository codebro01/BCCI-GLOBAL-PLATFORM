"use strict";
const { GraphQLError } = require('graphql');
const graphQLError = (message, code) => {
    throw new GraphQLError(message, {
        extensions: {
            code: code,
            customStuff: 'optional',
        },
    });
};
module.exports = { graphQLError };
//# sourceMappingURL=errorHandler.js.map