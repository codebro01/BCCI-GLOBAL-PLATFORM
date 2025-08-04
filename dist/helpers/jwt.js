"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { graphQLError } = require('@helpers/errorHandler');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const generateAccessToken = (tokenUser, tokenSecret) => {
    if (!tokenSecret)
        return graphQLError('Missing Token Secret', StatusCodes.BAD_REQUEST);
    return jwt.sign(tokenUser, tokenSecret, {
        expiresIn: '15m',
    });
};
const generateRefreshToken = (tokenUser, tokenSecret) => {
    if (!tokenSecret)
        return graphQLError('Missing Token Secret', StatusCodes.BAD_REQUEST);
    return jwt.sign(tokenUser, tokenSecret, {
        expiresIn: '5d',
    });
};
const verifyJWT = (token, { tokenSecret }) => {
    try {
        return jwt.verify(token, tokenSecret);
    }
    catch (err) {
        return null;
        // throw graphQLError('Invalid or expired token', StatusCodes.UNAUTHORIZED)
    }
};
const sendAccessTokenCookie = (context, user) => {
    const accessToken = generateAccessToken(user, process.env.ACCESS_TOKEN_SECRET);
    context.res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 15, // 15 MINUETES
    });
    return accessToken;
};
const sendRefreshTokenCookie = (context, user) => {
    const refreshToken = generateRefreshToken(user, process.env.REFRESH_TOKEN_SECRET);
    context.res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });
    return refreshToken;
};
const logout = (context) => {
    context.res.clearCookie('access_token');
    context.res.clearCookie('refresh_token');
};
module.exports = {
    sendAccessTokenCookie,
    sendRefreshTokenCookie,
    verifyJWT,
    generateAccessToken,
    generateRefreshToken,
    logout,
};
//# sourceMappingURL=jwt.js.map