const stockModel = require("../models/stockModel");
const {v4} = require("uuid");
const productModel = require("../models/productModel");
const { StockSchema, option} = require("../utils/joiValidation");



const createstock = async (req, res, next) => {
    try {

        const validateStock = StockSchema.validate(req.body, option); // validate base on the joi

        if (validateStock.error) {
            
            return res.status(400).json({
              Error: validateStock.error.details[0].message,
            });
          }


      const { batchId, quantity, product } = req.body;

      const productExist = await productModel.findOne({where:{name:product}});
      const batchIdexists = await stockModel.findOne({where:{batchId}})
      
      if(productExist && !batchIdexists){
      

      console.log(productExist)

      const stock = await stockModel.create({batchId, quantity, productId : productExist.id, id:v4()})
        
        if (stock) {
            return res.status(201).json({
                message: "stock added successfully",
                stock,
            });
        }
        else {
            res.status(500).json({message: "An Error Occured"});
        }
        }
        else{
            return res.status(404).json({message:"Product does not exist or duplicate batchId."})

        }
      
    } catch (err) {
        console.log(err)
       next(err)
      };
    }


    const fetchstocks = async (req, res, next) => {
            try {
                const stock = await stockModel.findAll();

                if (stock.length > 0) {
                    return res.status(200).json({stock, message : "Successfull"});
                }
                else {
                    return res.status(404).json({message: "No stock In DB"})
                }
            } catch (error) {
                next(error);
            }
    }

    module.exports = {createstock, fetchstocks};
  