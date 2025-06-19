import type { tokenUserType, JWTErrorType } from 'types/jwt_tokenUser';
import type {contextType} from 'types/global';
const { graphQLError } = require('@helpers/errorHandler');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');



const generateAccessToken = (tokenUser:tokenUserType, tokenSecret:string | undefined ) => {
    if (!tokenSecret) return graphQLError('Missing Token Secret', StatusCodes.BAD_REQUEST)
    return jwt.sign(tokenUser, tokenSecret, {
      expiresIn: '24h',
    });
}
const generateRefreshToken = (tokenUser:tokenUserType, tokenSecret:string | undefined ) => {
    if (!tokenSecret) return graphQLError('Missing Token Secret', StatusCodes.BAD_REQUEST)
    return jwt.sign(tokenUser, tokenSecret, {
      expiresIn: '24h',
    });
}

const verifyJWT = (token:string): tokenUserType => {
    try {
      return jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!
      ) as tokenUserType
    } catch (err) {
      throw graphQLError('Invalid or expired token', StatusCodes.UNAUTHORIZED)
    }};


const sendCookieResp = (context:contextType, user: tokenUserType) => {
    const accessToken = generateAccessToken(user, process.env.ACCESS_TOKEN_SECRET)
    const refreshToken = generateAccessToken(user, process.env.REFRESH_TOKEN_SECRET)
    context.res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      //   secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 15, // 15 MINUETES    
    })
    context.res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      //   secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 15, // 24 hours
    })
}


module.exports = {sendCookieResp, verifyJWT, generateAccessToken, generateRefreshToken}