In this we are going to learn that how professional file setup look like.
may be you can save it for your rest of the projects.

////////////////// storing images /////////////////

the main work is how we store the images. so basically we use the third party services like AWS, azure, cloudnary.
when you upload the photo from the user you store it temporarily in your server so incase if there is the server problem or any other problem it is not lost after that you can upload it to the third party services using some process. most of the company direct upload it but sir inform every senerio.

so for this we created the public folder and inside it we created an another folder named temp and inside it we created the .gitkeep file which is exactly opposite to the .gitignore
this file does't ignore the data while push to the git.

//////////////////////////////// git ignore file ////////////

after that we create the .gitignore file to in the main folder to ignore the required data to be pushed in the git.
we use the gitignore generator tool to copy all the required file which is not required to push in the git.
the url of the gitignore generator -> https://mrkandreev.name/snippets/gitignore-generator/

here you write the lagnuage in which you work in the search bar and press the create the button the file of gitignore is generated. you can simply copy all the data and paste it inside the .gitignore file

////////////////////////////// env file ///////////////////////////

this file is also very important for production level also to secure the sensitive data.

///////////// changes in package.json file ///////////////

we add the below line just after the desctiption so the we use the import fucntionality.

"type": "module",

///////////////////// source folder /////////////////////////////

the src (source) folder is created to keep all the working directory inside it is the professional approch you can keep it in main folder also.

///////////////////// creating files inside the src folder //////////////////////

we created the mainly three files inside the src folder 
app.js, index.js and constants.js

we also created the folders inside the src folder but right now we are not going to create it.

////////////////////// introducing nodemon ///////////////////

while using express or node whenever you update or add the code you have to stop the server first and restart the server to solve this problem we use the nodemon

nodemon simply restart the server when the file is save.
this is the webdependency. the web dependency are those dependencies which is used during the development we didn't use it in the production.

you can simply install it by using this command
npm i -D nodemon

you noticed that package-lock.json file is created automatically and node_modules folder is also created.

you also have to make changes inside the package.json. you simply replace the content inside the script with "dev":"nodemon src/index.js"

so when ever we run npn run dev command in the terminal nodemon start

///////////////// folder in src folder ////////////////////

we created the controllers DB middlewares models routes utils folder inside it and each folder has their own functionalities.

/////////////////// prettier /////////////////////

many people will say that prettier is the extension of vs code but the problem is when you write the production level code there are multiple people working on the same project and every one has different way of writting have different tab spaces, some uses semicolon or some doesn't use it.
this will create the mess to avoid this we use prettier.
this is also a web dependency 
you can install it by using the below line.
npm i -D prettier

after this you have to create the file with name .prettierrc
in this we write the configuration of prettier inside it.
so that we use the prettier configuration.

we also created the .prittierignore 
this file is used to inform the prettier that in which files we are not going to use the configuration of prettier.

////////////////////////////////// complete ////////////////////

this are file structure you have to follow.
