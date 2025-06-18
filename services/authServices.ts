const { User } = require('@models/User')
const { graphQLError } = require('@helpers/errorHandler')
const {StatusCodes} = require('http-status-codes');
import type { User as UserType } from '../types/resolvers';


type PickUser = Pick<
  UserType,
  'email' | 'firstName' | 'password' | 'surname' | 'otherNames' | 'roles' | 'id'
>

class AuthServices {
  async createUser(userData: PickUser) {

    const emailExist = User.find({email: userData.email});
    // if(emailExist) throw new AppError('Email Already exist', 'CONFLICT')
    if(emailExist) return graphQLError('Email Already exist', StatusCodes.CONFLICT)
    
    const user =  new User({...userData})
    await user.save()
    console.log(user)
    console.log('logging user data from services ')

    return { ...userData }
  }
}

module.exports = new AuthServices()
