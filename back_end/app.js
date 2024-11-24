const express=require('express');

const app =express();
const cors =require('cors');

app.use(express.json());
app.use(cors());

//products PATH
const productsPATH=require('./routes/products');
const { default: mongoose } = require('mongoose');

//connect to mongDB
mongoose.connect("mongodb://127.0.0.1:27017/store")
        .then(()=>console.log('connected successfuly to mongoDB..........'))
        .catch(()=>console.log('connected failed to mongodb!!!!!!!!!'))
//routes in the project
app.use("/api/products",productsPATH);

//create server
const port=5000;
app.listen(port,()=>console.log(`server runing on port ${port}.....`));
