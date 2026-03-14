import mongoose,{ Schema } from "mongoose";
import bcrypt from "bcrypt";  // we use bcrypt here to encrypt the password of the user.
import jwt from "jsonwebtoken";  // we use jwt for refresh token.



const userSchema = new Schema(
    {  // here we didn't write mongoose.Schema because we import it above
        username:{
            type : String,
            require:true,
            unique: true,
            lowercase: true,
            trim:true,  /// trim is used to trim the spaces between them.
            index: true,  // when you want to enable the search on any field than you true the index.
        },
        email:{
            type: String,
            require: true,
            trim:true,
            unique: true,
        },
        password:{
            type: String,  // we use the encrypted format.
            require: [true, "Password is required !"]
        },
        fullname:{
            type: String,
            require: true,
            trim:true,
            index:true,
        },
        avatar:{
            type:String,  // copy the URL from the cloudnary
            require:true,
        },
        coverImage:{
            type:String, // copy the URL from the cloudnary
        },
        refreshToken:{
            type:String,
        },
        wathcHistory:[
            {
                type: Schema.Types.ObjectId, // here we didn't write mongoose.Schema because we import it above
                ref:"Video",
            }
        ]

    },
    {timestamps:true}
);

// direct encrption is not possible so we use the middleware hooks like pre hook. this pre hook is used when whenever the user save the data this hook executed just before the data is going to be saved.
// here we use the save event so that we use it just before the data saves. you can visit this link to see all the events or functionality => https://mongoosejs.com/docs/middleware.html

userSchema.pre("save", async function (next){ // here we didn't use arrow function because arrow function didn't have this context or reference. and this function takes time so we use async. so this is the middleware we use the next as an parameter.

    if(!this.isModified("password")) return next(); // this will prevent the decryption of password everytime user changes occur for example user change the profile, name, email etc. so we simply add the condition when the password changes than the below code executed unless the above code didn't allow to execute below code.
    this.password = await bcrypt.hash(this.password,10); // here the number indicates the round of hashing.
    next();
})

// so we encrypt the password but the user didn't type the encrypted password user typethe password in the string to check the password is correct or not we create custom methods.

userSchema.methods.isPasswordCorrect = async function (password) {  // here we created the method in which we pass the password as an parameter. so the bcrypt library has the password as well as check the password also.
    return await bcrypt.compare(password,this.password) // here we compare the password using bcrypt with the help of compare method this takes two parameter password or decrypted password. here password is the normal string password and this.password is the encrypted or hashed password. this give the boolean value if password match true else false.
}

// the question arises that we are using only refresh token to store in the datbase than why we also add access token inside the env and below method. so the logic is we use the sessions and tookies both to meke it more secure. access token didn't store in the database.

userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {  // this is the payload.
            _id:this._id,
            email:this.email,
            username: this.username,
            fullname:this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET, // this is the access token
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY // this is the expiry token.
        }
    )
};

userSchema.methods.generateRefreshToken = function() {  // the main difference between access or refressh token is refresh token has less information. because it continuosly refresh.
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
};

export const User = mongoose.model("User",userSchema);