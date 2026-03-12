// in this file we ues both the method to wrap the funciton

///////////// by promise method //////////////////////


const asyncHandler = (requestHandler) => {
    (req, res, next) =>{
        Promise.resolve(
            requestHandler (req, res, next)
        )
        .catch(
            (error)=> next(error)    
        )
    }
}


export {asyncHandler}

//////////////////////// By try and catch method /////////////////////////

// const asyncHandler = (fun) =>{ async ()=>{} } // same thing is written below without curly brasis. her we simply did this thing that we take an function and pass it into another function.

// const asyncHandler = (fn) => async (req, res, next) =>{  // here the asyndHandle is higher order function.
//     try{  // we use the try and catch method here.
//         await fn(req, res, next)
//     } catch(error){
//         res.status(error.code || 500) .json({ 
//             success: false,
//             message: error.message
//         })
//     }
// }

// export {asyncHandler}