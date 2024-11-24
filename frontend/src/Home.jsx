import axios from "axios"
import { useEffect, useState } from "react"
import './style/home.css'

export default function Home(){
    const[products,setProducts]=useState([]);

    //get all products from server
    useEffect(()=>{
      const fethData= async()=>{
                     await axios.get("http://127.0.0.1:5000/api/products")
                                .then((res)=>setProducts(res.data))
                                .catch((err)=>console.log(err));
      }
      fethData();
    },[])
    
    //show products
    const showProducts= ()=>{
      
          return  products.map((product)=>{
              return<div key={product._id} className="product">
                <div>
                  <img src={product.Image} style={{width:'60%',padding:'20%',height:'20vh'}} alt={product.Title}/></div>
                <p  style={{padding:'0 0 0 25%'}}>{product.Title}</p>
                <span style={{padding:'0 0 0 38%',color:'red'}}>{product.Price}$</span>
              </div>
            })
    }

    return<div className="product-page">
 
      {showProducts()}
    </div>
}