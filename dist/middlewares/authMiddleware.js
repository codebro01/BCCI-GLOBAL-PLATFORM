"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { verifyJWT, sendAccessTokenCookie } = require('@helpers/jwt');
const { graphQLError } = require('@helpers/errorHandler');
const { StatusCodes } = require('http-status-codes');
const { User } = require('@models/User');
const authMiddleware = async (context) => {
    const { access_token, refresh_token } = context.req.cookies;
    let decodedAccessToken;
    let decodedRefreshToken;
    // console.log('access_token', access_token)
    // console.log('refresh_token', refresh_token)
    // Try access token first
    try {
        if (access_token) {
            decodedAccessToken = verifyJWT(access_token, {
                tokenSecret: process.env.ACCESS_TOKEN_SECRET,
            });
        }
    }
    catch (err) {
        console.log(err);
        // Access token is invalid/expired – do nothing for now
    }
    // If access token failed, try refresh token
    if (!decodedAccessToken && refresh_token) {
        try {
            decodedRefreshToken = verifyJWT(refresh_token, {
                tokenSecret: process.env.REFRESH_TOKEN_SECRET,
            });
            console.log('decodedRefreshToken', decodedRefreshToken);
            if (!decodedRefreshToken)
                graphQLError('Invalid User', StatusCodes.UNAUTHORIZED);
            const { email, id, firstName, surname, otherNames, roles } = decodedRefreshToken;
            const newAccessTokenPayload = {
                email,
                id,
                firstName,
                surname,
                otherNames,
                roles,
            };
            if (decodedRefreshToken) {
                const user = await User.findOne({ _id: id });
                if (!user)
                    graphQLError('Invalid User', StatusCodes.UNAUTHORIZED);
                const validRefreshToken = user.compareRefreshToken(refresh_token);
                if (!validRefreshToken)
                    graphQLError('Token Mismatch', StatusCodes.BAD_REQUEST);
                sendAccessTokenCookie(context, newAccessTokenPayload);
                decodedAccessToken = decodedRefreshToken; // treat it as fresh session
            }
        }
        catch (err) {
            // Refresh token also invalid
            context.res.clearCookie('access_token');
            context.res.clearCookie('refresh_token');
            console.log(err);
        }
    }
    // Final checks
    if (!access_token && !refresh_token) {
        graphQLError('No token or invalid token provided', StatusCodes.NOT_FOUND);
    }
    if (!decodedAccessToken) {
        graphQLError('Invalid or expired token', StatusCodes.UNAUTHORIZED);
    }
    return decodedAccessToken;
};
const RBAC = (user, requiredRole) => {
    // console.log(user.roles, requiredRole)
    if (!user || !user.roles || user.roles.length < 1) {
        graphQLError('User is not permitted to enter here!!!!!', StatusCodes.UNAUTHORIZED);
    }
    // Check if user has at least one required permission
    const hasRole = requiredRole.some((role) => user.roles.includes(role));
    if (!hasRole) {
        graphQLError('User does not have the required permission to access this route', StatusCodes.FORBIDDEN);
    }
};
module.exports = { RBAC, authMiddleware };
//# sourceMappingURL=authMiddleware.js.map