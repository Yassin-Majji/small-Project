const { string, required } = require('joi');
const mongoose = require('mongoose');

const productSchema=new mongoose.Schema({
    Image:{
        type:String,
        required:true
    },
    Title:{
        type:String,
        required:true,
        minlength:5,
        maxlength:100
    },
    Price:{
        type:Number,
        required:true,
        min:1
    }

},{
    timestamps:true
})
const Product = mongoose.model("Product",productSchema);
module.exports=Product;