const Joi = require('joi'); 


const LoginSchema = Joi.object().keys({ 
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),  
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),  
}); 

const RegisterSchema = Joi.object().keys({ 
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),  
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),  
}); 

const ProductSchema = Joi.object().keys({ 
    name: Joi.string().min(3).required(),
});
 

const StockSchema = Joi.object().keys({ 
    batchId: Joi.string().required(),
    product: Joi.string().min(3).required(),
    quantity: Joi.string().required(),
});


 const option = { // formating error to return a well formated res
    abortEarly:false,
    errors:{
        wrap:{
            label:""
        }
    }
}


module.exports = {option, LoginSchema, RegisterSchema, ProductSchema, StockSchema}