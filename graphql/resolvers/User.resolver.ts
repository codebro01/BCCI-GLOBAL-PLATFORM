import type { User } from 'types/resolvers'

module.exports = {
  Query: {
    hello: () => 'hello world',
  },
  Mutation: {
    createUser: (_: unknown, { user }: { user: User }) => {
      console.log(user)
      /* ... */
    },
  },
}
