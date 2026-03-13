// In this we create the router and we use this multiple times

import { Router } from "express";  // this line is used import the functionality of Router from the express
import {registerUser} from "../controllers/user.controller.js"

const router = Router();  // we store all the functionality of the Router in router

router.route("/register").post(registerUser) 

// now you have confusion that we go to the /users URL or /register URL. so the the first URL became the prefix and so the control first come to this file from the /users than from here control goes to /register
//now you can write the multiple routes related to user without makin changes in app.js file like we created below.
// router.route("/login").post(login)

// the URL Look like this => https://localhost:4010/api/v1/users/register
export default router