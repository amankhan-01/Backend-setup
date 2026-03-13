// In this we have to write 2 3 methods like uploading the file to the service taking the path of the file from the services and removing the file from the local server.

import {v2 as cloudinary} from "cloudinary";  // here we give the name to the v2 by using as keyword.
import fs from "fs"  // fs is our file system in node.js we have the file system . you can read write remove delete the files. when you have to manage the complete file system we use this.

// Configuration
cloudinary.config({ 
    // this fields is given in your service provider you simply paste it in env and then here.
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {  // here localFilePath is the path of the file which is saved temporarily in our local server.
    try{
        if(!localFilePath) return null // if there is no path return the null.

        // upload the file on cloudinary.
        const response = await cloudinary.uploader.upload(localFilePath,{  // this is the main code.
            resource_type: "auto"  // this auto will allow the cloudinary automatically detect the type of file.
        })

        // file jas been uploaded sucess fully.

        console.log("file is uploaded on cloudinary.",response.url);

        return response

    } catch(error){
        fs.unlinkSync(localFilePath) // remove the local saved temporarily file as the upload operation gets failed.
        return null
    }
}

export {uploadOnCloudinary}

// now after this we have to create the our first middleware using multer. so whereever we need to upload the file we inject this middleware.
    