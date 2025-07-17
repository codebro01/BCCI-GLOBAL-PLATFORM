"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { graphQLError } = require('@helpers/errorHandler');
const bcrypt = require('bcryptjs');
const { User } = require('@models/User');
const { StatusCodes } = require('http-status-codes');
const { logout } = require('@helpers/jwt');
class UserServices {
    async getUsers() {
        const users = await User.find({});
        if (!users)
            graphQLError('Could not get users at this time, please try again', StatusCodes.INTERNAL_SERVER_ERROR);
        // console.log(users)
        return users;
    }
    async getUser(id) {
        if (!id)
            graphQLError('No id was provided', StatusCodes.NOT_ACCEPTABLE);
        const user = await User.findOne({ _id: id });
        if (!user)
            graphQLError(`Could not find user with Id: ${id}`, StatusCodes.INTERNAL_SERVER_ERROR);
        return user;
    }
    async updateUser(userInfo, updateData) {
        const { id } = userInfo;
        if (!id)
            graphQLError('No id was provided', StatusCodes.NOT_ACCEPTABLE);
        const user = await User.findOne({ _id: id });
        if (!user)
            graphQLError(`Could not find user with Id: ${id}`, StatusCodes.INTERNAL_SERVER_ERROR);
        if (updateData.email !== user.email) {
            const emailExist = await User.findOne({ email: updateData.email });
            if (emailExist)
                graphQLError('Email taken,please use another email', StatusCodes.CONFLICT);
        }
        console.log('updateData', updateData);
        Object.assign(user, updateData);
        await user.save();
        return user;
    }
    async deleteUser(id) {
        if (!id)
            graphQLError('No id was provided', StatusCodes.NOT_ACCEPTABLE);
        const user = await User.findByIdAndDelete({ _id: id });
        if (!user)
            graphQLError(`Could not find user with Id: ${id}`, StatusCodes.INTERNAL_SERVER_ERROR);
        return { success: true, message: 'User deleted successfully!' };
    }
    async updateUserPassword(userInfo, passwordData) {
        console.log(passwordData);
        if (!passwordData.newPassword || !passwordData.oldPassword)
            graphQLError('Old Password and new password fields are required', StatusCodes.BAD_REQUEST);
        const { id } = userInfo;
        if (!id)
            graphQLError('No id was provided', StatusCodes.NOT_ACCEPTABLE);
        const user = await User.findOne({ _id: id });
        if (!user)
            graphQLError(`Could not find user with Id: ${id}`, StatusCodes.INTERNAL_SERVER_ERROR);
        const isPasswordCorrect = await bcrypt.compare(passwordData.oldPassword, user.password);
        if (!isPasswordCorrect)
            graphQLError('Incorrect Password', StatusCodes.UNAUTHORIZED);
        user.password = passwordData.newPassword;
        await user.save();
        return { message: 'Password has been successfully changed' };
    }
    async logoutUser(userInfo, context) {
        console.log('user in delete');
        const { id } = userInfo;
        const user = await User.findById({ _id: id });
        if (!user)
            graphQLError('Could not find user', StatusCodes.NOT_FOUND);
        user.refreshToken = '';
        await user.save();
        logout(context);
        return {
            success: true,
            message: 'User successfully logged out'
        };
    }
}
module.exports = new UserServices();
//# sourceMappingURL=userServices.js.map