// In this we create the router and we use this multiple times

import { Router } from "express";  // this line is used import the functionality of Router from the express
import {registerUser} from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();  // we store all the functionality of the Router in router

router.route("/register").post(
    upload.fields([ // here before going to register the user we go to middleware that is help in files
        // here we use the field method it gives the array of multiple file comming from differnt fields
        // you can also use the single for single file , array for multiple files comming from same field.
        // below we take two files so we created two objects
        {
            name:"avatar", // here the name is exactly the same as we given in the name attribute of the input field. 
            maxCount:1 // these are the number of files you want to accept from the field.
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]), // here we learn that how to inject the middleware.
    registerUser
) 

// now you have confusion that we go to the /users URL or /register URL. so the the first URL became the prefix and so the control first come to this file from the /users than from here control goes to /register
//now you can write the multiple routes related to user without makin changes in app.js file like we created below.
// router.route("/login").post(login)

// the URL Look like this => https://localhost:4010/api/v1/users/register
export default router