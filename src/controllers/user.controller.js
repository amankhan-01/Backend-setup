// so we write the helper file name asynhandler

import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";  // here this User is directly contact with the b because it is made by mongoose. and this user is calling the DB on your behalf multiple times as you want
import { apiError } from "../utils/apiError.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req,res) => {
    // logic building steps to register user.

    // 1 => taking data from frontend
    // 2 => checking data if it empty or not data is according to the field.
    // 3 => cheking the user exist or not via email or username.
    // 4 => check if there is a file (image) or not
    // 5 => check for avatar it is required.
    // 6 => upload it to cloudinary.
    // 7 => check the avatar is uploaded on cloudnary
    // 8 => create user object to create the entry in DB
    // 9 => when once the user created in response all the data is given back so in this we have to hide some data like password, referesh token etc
    // 10 => check for user creation 
    // 11 => return response.

    const {username, email, password, fullname} = req.body // here we req.body help to take the data coming from the json and body and store it into there respected filed. if the data is coming from the url than we use the differnt method.

    console.log("Inside the req.body",req.body);

    // console.log("email", email);
    // console.log("username", username);
    // console.log("password", password);
    // console.log("fullname", fullname);

    // here we didn't pass the file so we add the middleware in the route to handle the file by providing the storage and use it directly.

    // if(fullname == ""){ // by this way you can seperatly check all the file but there is another way to check all the file at once.
    //     throw new apiError(402,"fullname is required")  // here we use the apiError file we created as the helper file.
    // }

    if(
        [email,fullname,username,password].some((field) => field?.trim() === "")  // by usin some method which take the callback function to take each field if there is the field available than trim it for space and after trim if there is something than reutrn true else return false. here we use ? to identify that whether there is field available or not.
    ){
        throw new apiError(400,"fill all the required fields.") // here we use the apiError file we created as the helper file.
    }

    // checking for the existing user from the DB.

    const existedUser = await User.findOne({  // we check the user by using the findOne method of MongoDB. this is used to find the user according to the give values. you can also use the find but findOne is different because if it find the match at first it will return that user not checking for further.
        // email // this is used for single search or query
        $or: [{email},{username}] //this is used for multiple queris. with the help of MongoDb operate start's with $ (dollar) we can search for more than one query in the DB. you can add more query by putting commas and write the name of the field inside the currly brasis.
    })

    if(existedUser){
        throw new apiError(409,"User already Existed.")
    }

    // handling files here ////////////////

    // we know that req.body gives you the data but we also use the middleware and this middleware also give some data. we add the multer as a middleware to handle file so it also give the acces of those file.

    const avatarLocalPath = req.files?.avatar[0]?.path; // here ? mark simly means ki jiske sath laga hoga wo cheez hai ki nahi matlab khali to nhi hai. and this line is used to take the path of the file comming from the user.
    console.log("file from multer",req.files);

    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    //// check avatar file  /////////////////

    if(!avatarLocalPath){
        throw new apiError(400,"Avatar is required");
    }

    //// Uploading files into cloudinary ////////////// 
    
    const avatarSucess = await uploadOnCloudinary(avatarLocalPath);
    const coverImageSucess = await uploadOnCloudinary(coverImageLocalPath);

    console.log("avatar Image URL",avatarSucess.url);
    console.log("cover Image URL", coverImageSucess.url);

    /////// checking the avatar is uploaded success or not ///////

    if(!avatarSucess){
        throw new apiError(400,"Avatar file is required");
    }

    //// creating the object in DB ////////////

    const user = await User.create({ // here we write the await because may be it take time.
        fullname,
        email,
        password,
        username,
        avatar: avatarSucess.url,
        coverImage : coverImageSucess?.url || "", // here we didn't check that the cover image is uploaded or not because it is not require so if the cover image didn't uploaded than we pass the empty string inplace of url.

    })

    // checking the user is created or not.

    const userCreated = await User.findById(user.id).select("-password -refreshToken"); // here we use the MongoDB method findById to serach the user by id. you think that we didn't add id above so mongoDb automatically give id to each user or object. if the user created than its id is also created if it finds the id than this is confirm that user is created.one more benefit it gives you can hide the password or refresh token by using select method and inside it you can write the name of the field and add -(minus) sign as the prefix in a single string to hide that field. you can give multiple field name by giving space.

    if(!userCreated){
        throw new apiError(500,"someting went wrong while registering the user.");
    }

    return res.status(200).json(
        new apiResponse(201,userCreated,"User registered Successfully")
    )
})

export {registerUser}