const jwt = require('jsonwebtoken');
const db = require('../models');

module.exports.signin = async (req, res, next) => {
    try {
        console.log(req.body);
        let user = await db.User.findByUsername(req.body.username);
        let { id, username } = user;
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch) {
            let token = jwt.sign({
                id,
                username
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                id,
                username,
                token
            });
        } else {
            // return next({
            //     status: 400,
            //     message: "Invalid username/password"
            // });
            next(err);
        }
    } catch(err) {
        // return next({
        //     status: 400,
        //     message: "Invalid username/password"
        // });
        next(err);
    }
}

module.exports.signup = async (req, res, next) => {
    try {
        let user = await db.User.create(req.body);
        let { id, username } = user;
        let token = jwt.sign({
            id,
            username
        }, process.env.SECRET_KEY);
        return res.status(200).json({
            id,
            username,
            token
        });
    } catch(err) {
        // if(err.code === 11000) {
        //     err.message = "Username is taken";
        // }
        return next({
            status: 400,
            message: err.message
        });
    }
}