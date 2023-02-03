const jwt = require('jsonwebtoken');
const env = require("../config/index");
const userModel = require("../models/userModel");


module.exports =  async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if(bearerToken){
        const [,token] = bearerToken.split(" ")
        const decodedToken = jwt.verify(token, env.JWT_SECRET);
        if(decodedToken){
        const userId = decodedToken.id;
        const user = await userModel.findOne({where:{id : userId}});
        if(user){
            req.user = user;
            next();
            return;
        }
        }
    }
    return res.status(400).json({message:"Please login."})
  } catch {
    res.status(500).json({
      message: 'An error occured.'
    });
  }
};