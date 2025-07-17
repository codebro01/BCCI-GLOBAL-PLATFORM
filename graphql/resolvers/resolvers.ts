const path = require('path')
const { mergeResolvers } = require('@graphql-tools/merge')
const { loadFilesSync } = require('@graphql-tools/load-files')
const userResolver = require('@graphql/resolvers/User.resolver')
const authResolver = require('@graphql/resolvers/Auth.resolver')
const goalResolver = require('@graphql/resolvers/goal.resolver')
const eventResolver = require('@graphql/resolvers/Event.resolver')

const resolvers = [userResolver, authResolver, goalResolver, eventResolver]

module.exports = mergeResolvers(resolvers)




