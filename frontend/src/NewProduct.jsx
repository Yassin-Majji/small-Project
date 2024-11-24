import axios from "axios";
import { useState } from "react";
import "./style/NewProduct.css";

export default function NewProduct(){

    //variables to stock data
              const[image,setImage]=useState(null);
              const[title,setTitle]=useState("");
              const[price,setPrice]=useState(null);
              const[errImage,setErrImage]=useState('');
              const[errTitle,setErrTitle]=useState('');
              const[errPrice,setErrPrice]=useState('');

              const[OperationFailed,setOperationFailed]=useState('');
              const[OperationSuccess,setOperationSuccess]=useState('');

              const [imageSrc, setImageSrc] = useState(null);


    //handle image
   const handleImage=(e)=>{
    const supportedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const file=e.target.files[0];
   if(!file)setErrImage('choose Image !!!!!')
   else if(file && supportedImageTypes.includes(file.type)){
         setImage(file);
         setErrImage('');
         setImageSrc(URL.createObjectURL(file));
   }
   else return setErrImage('choose image in types jpeg or png or webp !!!!')
}
    //handle title
const handleTitle= (e)=>{
     const tiitle =e.target.value;
     if(!tiitle)setErrTitle('You have give title to this product!!!!');
     else if(tiitle && tiitle.length>=5){
        setTitle(tiitle);
        setErrTitle('')
     }
     else return setErrTitle('Title must be more than five characters!!!!!!')
}
    //handle price
const handlePrice=(e)=>{
    const priice=e.target.value;
    if(!priice)setErrPrice('enter price of this product!!!!!!');

    else if(priice && priice>=1){
        setPrice(priice);
        setErrPrice('')
    }
    else return setErrPrice('Price must be more than 0 !!!!!!');
}
    //send the image to Cloudnary
              const sendToCloudnary=async()=>{
                try{
                   
                  
                    //merge data in FormDATA
                    const formData=new FormData();
                    formData.append("file",image);
                    formData.append("upload_preset", "YOUR_UPLOAD_PRESET");

                    //send to Cloudnary
                    const response= await axios.post("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",formData)
                    const imageURL=response.data.secure_url;
                    sendData(imageURL);
                    setOperationFailed('');
                
                }   
                catch(err){
                    setOperationFailed(`There is a problem uploading the image. Try again later!!!!!!!!!!!`);
                    console.log(err);
                }

              }

    const SendToServer=async(e)=>{
                     
                e.preventDefault();
                if(errImage || errTitle || errPrice)return;

               
             await sendToCloudnary();

                
               
    }
    //send data to server
    const sendData=async(imageURL)=>{
        console.log(`this is image url: ${imageURL}`)
        try{
            if(!imageURL){
               setOperationFailed('The image was not loaded correctly. Please try again!!!!!!!!')
            return;
           }
           setTimeout(() => {
            setOperationFailed("");
          }, 2000);
           await axios.post("http://127.0.0.1:5000/api/products/newproduct",
            {
                Image:imageURL,
                Title:title,
                Price:price
            }
           );
                setOperationSuccess("Data sent successfully");
                setTimeout(() => {
                    setOperationSuccess("");
                  }, 2000);
               

       }
       catch(err){
        setOperationSuccess('');
            setOperationFailed(`You are having trouble sending data. Please try again later!!!!!!!!!!!!!!! `);
            console.log(err);
       }
    }
    return(
        <div className="FORM">
       {OperationFailed && <p className="failed_alert">{OperationFailed}</p>}
       {OperationSuccess && <p className="success_alert">{OperationSuccess}</p>}
            <form onSubmit={SendToServer}>
        <div>
            <label htmlFor="image"></label>
            <input required id="image" placeholder="Select a product image....." onChange={handleImage} type="file" />
            {errImage && <p style={{color:'red'}}>{errImage}</p>}
            {imageSrc && <img src={imageSrc}   alt="image-product" style={{width:'20%',height:'10vh'}}/>}
        </div>

        <div>
            <label htmlFor="title"></label>
            <input required id="title" placeholder="Enter product title....." onChange={handleTitle} type="text" />
            {errTitle && <p style={{color:'red'}}>{errTitle}</p>}
        </div>

        <div>
            <label htmlFor="price"></label>
            <input required id="price" placeholder="Enter the product price......." onChange={handlePrice} type="number" />
            {errPrice && <p style={{color:'red'}}>{errPrice}</p>}
        </div>

        <button>Send Data</button>
    </form>
    </div>
    )
}