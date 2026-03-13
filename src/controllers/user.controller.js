// so we write the helper file name asynhandler

import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req,res) => {
    res.status(200).json({
        message: "hello World" 
    })
})

export {registerUser}