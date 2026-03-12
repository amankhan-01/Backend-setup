import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// app.use(cors()) // many developerswrote only this but we can also have option in production level.

app.use(cors({ // It controls which frontend applications are allowed to access your backend API.
    origin: process.env.CORS_ORIGIN,
    credentials:true,
}))

// some times the data comes is body format or sometimes it comes with json format it doesn't have any limit which overload the server so we add the limit.

app.use(express.json(  // this means that we accept the express with json.
    {limit:"16kb"}  // here we set the limit of data.
))

// now handle the data comes with URL. you can see that in the URL different signs are there we also inform the express what is this means.

// app.use(express.urlencoded()) // this is also enough 

app.use(express.urlencoded({  // but this is good practise
    extended:true,  // you can read about extended by simply hover the mouse.
    limit:"16kb"  // you can set the size limit.
}))

app.use(express.static("public")); // this is used when you get the data in the pdf, image and any file format so we store it in public folder and store it in my server and then we use this.

// till now we didn't use cookie parser. so the work of this middleware is the set and access the cookies of  user's browser. there are some ways to set some secure cookies in the user's browser and this cookie is read only by the server.

app.use(cookieParser()); // this also has some options but accoeding to hitesh sir there is no need.

export { app }