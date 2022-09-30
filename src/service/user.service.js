const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');

// Models
const { User } = require('../database/models');

// Helpers
const Response = require('../utils/response');

class UserService { }

UserService.signUp = async ({ role, ...payload }) => {
    try {

        const checkUser = await User.query().findOne({ 'mobileNumber': payload.mobileNumber });

        if (checkUser) return Response.error('Mobile Number already exists', 400);

        await User.query().insert(payload);

        return Response.success(null, 'Successfully signup');
    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

UserService.login = async (payload) => {
    try {

        const findUser = await User.query().findOne({ 'mobileNumber': payload.mobileNumber });
        if (!findUser) return Response.error('Invalid user credentials', 400);

        const isVaid = bcrypt.compareSync(payload.password, findUser.password);
        if (!isVaid) return Response.error('Invalid Password');

        const token = jsonWebToken.sign({
            id: findUser.id, role: findUser.role, name: findUser.name
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return Response.success({ token }, 'Successfully loged in');

    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

module.exports = UserService;