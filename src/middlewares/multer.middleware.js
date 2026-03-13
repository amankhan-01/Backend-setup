// jaate waqt hamse mil kr jana.

import multer from "multer"

const storage = multer.diskStorage({  // here we use disstorage.
  destination: function (req, file, cb) {   // here in this we get the file and the request we simply handle only json data but if the file comes along with the json data than we use multer. we access the file using multer. cb is call back.
    cb(null, "./public/temp")  // here after null we gave the path where we want to save the file that's why we create the public/temp and inside it we create the gitkeep file. we don't have to work with null.
  },
  filename: function (req, file, cb) {  // if you want to change the filename, give the unique name to it than we do this.
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)  // this line is used to give the unique name to the file as a suffix we don't need it right now. so i comment this line.
    cb(null, file.originalname)  // you can give the original name to the file. you can also write the field name in place of originalname. 
  }
})

export const upload = multer(
  { 
    storage,
  }
)

// configuration is done now. 