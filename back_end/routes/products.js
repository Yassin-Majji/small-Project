const express=require('express');
const { object } = require('joi');
const router=express.Router();
const joi =require('joi');
const Product=require('../models/Product')


/**
 * @desc creare new product
 * @route /api/products/newProduct
 * @method POST
 * @access public
 */
router.post("/newProduct",async(req,res)=>{
    const {error}=validateRequestBody(req.body);
    if(error){
       return res.status(400).json(error.details[0].message);
    }
   
  const product=new Product({
    Image:req.body.Image,
    Title:req.body.Title,
    Price:req.body.Price
  })

  try{
    const response= await product.save();
    res.status(201).json(response);
  }
  catch(err){
    res.status(500).json(err.message);
  }
    }
)

/**
 * @desc get all products
 * @route /api/products
 * @method GET
 * @access public
 */
router.get('/',async(req,res)=>{
try{
    const response = await Product.find();
    res.status(200).json(response);
}
catch(err){
    res.status(500).json(err);
}
})

//validate from requestBody
const validateRequestBody=(obj)=>{
const productSchema=joi.object({
    Image:joi.string().required(),
    Title:joi.string().required().min(5).max(100),
    Price:joi.number().required().min(1)
})
return productSchema.validate(obj);
}

module.exports=router;