// Models
const { User } = require('../database/models');

// Helper
const { SUPER_ADMIN, ADMIN } = require('../constants');

const validate = async (data) => {

    let admin = false;

    if (data.id) {
        const getUser = await User.query().select(['id', 'role']).findOne({ id: data?.id });
        if (getUser) admin = [SUPER_ADMIN, ADMIN].includes(getUser.role);
    }

    return { isValid: true, credentials: { admin, ...(data || {}) } };

}

const validateUser = async (data) => {

    if (!data) return { isValid: false };

    const getUser = await User.query().select(['id', 'role']).findOne({ id: data?.id });
    if (!getUser) return { isValid: false, credentials: { admin: false } };

    const admin = [SUPER_ADMIN, ADMIN].includes(getUser.role);

    return { isValid: true, credentials: { admin, ...data } };

}

const validateSuperAdmin = async (data) => {

    if (!data) return { isValid: false };

    const getUser = await User.query().select(['id', 'role']).findOne({ id: data?.id, role: SUPER_ADMIN });
    if (!getUser) return { isValid: false, credentials: { admin: false } };

    return { isValid: true, credentials: { admin: true, ...data } };
}

const validateAdmin = async (data) => {

    if (!data) return { isValid: false };

    const getUser = await User.query().select(['id', 'role']).findOne({ id: data.id }).whereIn('role', [SUPER_ADMIN, ADMIN]);
    if (!getUser) return { isValid: false, credentials: { admin: false } };

    return { isValid: true, credentials: { admin: true, ...data } };
}

module.exports = {
    validate,
    validateUser,
    validateAdmin,
    validateSuperAdmin
};