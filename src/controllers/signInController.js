const { user } = require('pg/lib/defaults');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken'); // to encrypt token
const bcrypt = require('bcrypt') // to hash the password
const env = require('../config/index')
const {option, LoginSchema} = require("../utils/joiValidation");

const signIn = async (
    req, res, next
) => {
    try {
        const validateLogin = LoginSchema.validate(req.body, option);

        if (validateLogin.error) {
            return res.status(400).json({
              Error: validateLogin.error.details[0].message,
            });
          }

        const { email, password } = req.body;
        const user = await userModel.findOne({
            where: {email:email} 
        })

        if (user === null) {
            return res.status(404).json({
                message: "User Not Found"
            })
        }

        const hashPassword = await bcrypt.compare(password,user.password,)

        if (hashPassword === true ){
            return res.status(200).json({
                message: "Login Successfull",
                token: await jwt.sign({
                    email: user.email,
                    id: user.id
                }, env.JWT_SECRET, {expiresIn: "2d"})
            })
        }else {
            return res.status(403).json({
                message: "Incorrect password"
            })
        }
    } catch (error) {
        next(error);
    }
}

module.exports = signIn;
