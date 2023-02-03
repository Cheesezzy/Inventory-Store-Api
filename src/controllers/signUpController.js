const { user } = require("pg/lib/defaults");
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const env = require('../config/index');
const { v4 } = require("uuid");
const {RegisterSchema, option} = require("../utils/joiValidation");

const signUp = async (
    req, res, next
) => {
       try {
        const validateRegister = RegisterSchema.validate(req.body, option);

        if (validateRegister.error) {
            return res.status(400).json({
              Error: validateRegister.error.details[0].message,
            });
          }

        const { firstName, lastName, email, password } = req.body;

        const userExist = await userModel.findOne({where:{email:email}});

        if (!userExist){
            const hashPassword = await bcrypt.hash(password,10);
            const newUser = await userModel.create({id: v4(), firstName, lastName, email, password : hashPassword});
            if (newUser) {
                return res.status(201).json({user: newUser, message: "SignUp SuccessFull"});
            }
             return res.status(500).json({message: "An Error Occured"});
        }
        
        res.status(400).json({message: "User Alredy Exist"});

        console.log(req.body);
       } catch (error) {
         next(error);
       }
        
    
}

module.exports = signUp;