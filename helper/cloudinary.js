import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: 'dqxg8wqq8', 
  api_key: '772928322289257', 
  api_secret: 'igcf6R8Pf_Z6SI3tf7cUWxTUB7I' 
});



const uploadOnCloudinary = async (localFilePath)=>{
    try{
        if(!localFilePath){
            return res.send({message:"Could not find the path"}) 
        }
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        console.log("file is uploaded on cloudinary",response.url);
        return  response;
    }
    catch(error){
        fs.unlinkSync(localFilePath)
        return null

    }
}


export{uploadOnCloudinary}

