// require('dotenv').config({path:'.env'}) // we also do this there is no error but it doesn't maintain the cosistancy of our code.
import mongoose from "mongoose"
import { DB_NAME } from "./constants.js"; // here we import this because during connection we need the name of the DataBase.
import connectDB from "./DB/index.js"; // here we import the function which we created at the DB folder
import dotenv from "dotenv"
import { app } from "./app.js";  // we have to import the app first before begin work

dotenv.config({path:".env"});



/* 
function connectDB(){here you connect the DB}

connectDB()

In the above method you simply create the function to connect the DB and call it later. but you make it look more professional by using ifee. where we immidiately execute the created function.
some professionals uses semi colon (;) at the starting of the function this for cleaning purpose suppose that you are working with ifee's the another person didn't add the semi colon at the ending of the above line than there may be problem

*/

/*

this code is working properly but this  pollute our index.js file so we comment this block of code.

import express from "express"
const app = express();

// below are the ifee function.
;(async ()=>{ // here we turn the normal arrow function into async arrow function.

    try{ // always use the try and catch while working with database.
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);  // here we use the await so that connection established properly. and uses mongoose.connect to connected the database and give the URL with Name of database.
        
        app.on("error",(error)=>{  // this is the listener used for suppose that database is connected but express didn't talk with db properly.
            console.log("ERROR: ", error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`your application is listening on port ${process.env.PORT}`);
        })

    } catch(error){  // if there is an error this block will execute.
        console.log("ERROR: ", error);
        throw error
    }

})()

*/

const port = process.env.PORT || 4000;

connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`server is running at PORT : ${port}`)
    })
})
.catch((err)=>{
    console.log("MongoDb connection Failed !! ", err);  // simply print the error message.
}) // this call the fucntion of connectDB which we created inside the index.js file inside the DB folder to make connection.
// when the database is connected it will always return the promises. we can hadle it with the help of then and catch