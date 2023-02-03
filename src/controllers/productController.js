const productModel = require("../models/productModel");
const {v4} = require("uuid");
const {ProductSchema, option} = require("../utils/joiValidation");
const Stock = require("../models/stockModel");



const createProduct = async (req, res, next) => {
    try {
        const validateProduct = ProductSchema.validate(req.body, option);

        if (validateProduct.error) {
            return res.status(400).json({
              Error: validateProduct.error.details[0].message,
            });
          }
 
      const { name } = req.body;

        const id = v4();
        const product = await productModel.create({
          id,
          name,  
        });
        if (product) {
            return res.status(201).json({
                message: "product added successfully",
                product,
            });
        }
        else {
            res.status(500).json({message: "An Error Occured"});
        }
        
        
      
    } catch (err) {
       next(err)
      };
    }


    const fetchProducts = async (req, res, next) => {
            try {
                const product = await productModel.findAll(
                    {include:[
                        {
                          model:Stock,
                          as:"stocks",
                          attributes:["id", "batchId", "quantity"]
                        }
                      ]}
                );

                if (product.length > 0) {
                    return res.status(200).json({product, message : "Successfull"});
                }
                else {
                    return res.status(404).json({message: "No Product In DB"})
                }
            } catch (error) {
                next(error);
            }
    }

    module.exports = {createProduct, fetchProducts};
  