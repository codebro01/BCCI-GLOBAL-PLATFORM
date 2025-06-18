import type { User } from 'types/resolvers'

type createTokenUserType = Pick<
  User,
  'email' | 'firstName' | 'surname' | 'otherNames' | 'roles' | 'id'
>

const createTokenUser = (user: createTokenUserType): createTokenUserType => {
  return {
    email: user.email,
    id: user.id,
    firstName: user.firstName,
    surname: user.surname,
    roles: user.roles,
    otherNames: user.otherNames
  }
}

module.exports = {createTokenUser};
