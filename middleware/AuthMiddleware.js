const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const createError = require('http-errors');

const auth = async (req, res, next) => {
    try {
        if (req.header('Authorization')) {
            const token = req.header('Authorization').replace('Bearer ', '');
            const result = jwt.verify(token, 'secretkey');

            const user = await User.findById({ _id: result._id });

            if (user) {
                req.user = user;
            } else {
                throw createError('There is no user who has this token');
            }

            //console.log("Received result:", result);
            next();
        }else{
            throw createError('Please log in ')
        }

    } catch (err) {
        next(err);
    }
}

module.exports = auth;