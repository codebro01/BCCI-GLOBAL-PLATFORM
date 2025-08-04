"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { User } = require('@models/User');
const { graphQLError } = require('@helpers/errorHandler');
const { createTokenUser } = require('@helpers/createTokenUser');
const { sendAccessTokenCookie, generateAccessToken, generateRefreshToken, sendRefreshTokenCookie, } = require('@helpers/jwt');
const { StatusCodes } = require('http-status-codes');
const detectPlatform = require('@helpers/detectPlatform');
class AuthServices {
    async createUser(context, userData) {
        // await User.deleteMany()
        const emailExist = await User.findOne({ email: userData.email });
        if (emailExist)
            return graphQLError('Email Already exist', StatusCodes.CONFLICT);
        const user = new User({ ...userData });
        await user.save();
        const tokenUser = createTokenUser(user);
        const platform = detectPlatform(context.req);
        if (platform === 'web') {
            sendAccessTokenCookie(context, tokenUser);
            sendRefreshTokenCookie(context, tokenUser);
        }
        if (platform === 'mobile') {
            const accessToken = generateAccessToken(tokenUser, process.env.ACCESS_TOKEN_SECRET);
            const refreshToken = generateRefreshToken(tokenUser, process.env.REFRESH_TOKEN_SECRET);
            context.res.setHeader('x-access-token', accessToken);
            context.res.setHeader('x-refresh-token', refreshToken);
        }
        return user;
    }
    async loginUser(context, userData) {
        const user = await User.findOne({ email: userData.email });
        // console.log(user, 'before chcking pwd')
        if (!user)
            return graphQLError('Invalid Credentials', StatusCodes.NOT_FOUND);
        const passwordCorrect = await user.comparePwd(userData.password);
        // console.log(passwordCorrect, 'check password')
        if (!passwordCorrect)
            return graphQLError('Invalid Credentials', StatusCodes.NOT_FOUND);
        const tokenUser = createTokenUser(user);
        sendAccessTokenCookie(context, tokenUser);
        const refreshToken = sendRefreshTokenCookie(context, tokenUser);
        // console.log('refresh_token', refreshToken)
        user.refreshToken = refreshToken;
        await user.save();
        return { message: 'Login Succesfull!!! 🚀' };
    }
}
module.exports = new AuthServices();
//# sourceMappingURL=authServices.js.map