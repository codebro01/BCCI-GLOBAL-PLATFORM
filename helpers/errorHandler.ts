const { GraphQLError } = require('graphql')

const graphQLError = (message:string, code:string) => {
  throw new GraphQLError(message, {
    extensions: {
      code: code,
      customStuff: 'optional',
    },
  })
}

module.exports = {graphQLError}
