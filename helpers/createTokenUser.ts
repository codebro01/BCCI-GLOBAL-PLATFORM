import type { User } from 'types/resolvers'

type createTokenUserType = Pick<User, 'email' | 'roles' | 'id' | 'username'>

const createTokenUser = (user: createTokenUserType): createTokenUserType => {
  return {
    email: user.email,
    id: user.id,
    username: user.username,
    roles: user.roles,
  }
}

module.exports = { createTokenUser }
