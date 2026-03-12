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
you can install it by ruuning below command.
npm i dotenv

so env is the sensitive file or having environment variables and developer want that all the data inside it load as soon as we enter the entry point.

so we add required('dotenv').config({path:".env"});

this above method is used when we use comman js method as we already know.

import dotenv from "dotenv";
dotenv.config({path:".env"}); 
this above method is used when we use comman js method as we already know.
the method of import syntax is introduces recently and not available in the official documentation.

if you go with the import method update the below line in script

update from this => "dev": "nodemon src/index.js" to this => "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"

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


/////////////////////// connecting the database ///////////////////

there are two ways of connecting data base.
1) connecting database inside the index.js file 
2) connecting database inside the db folder of src folder (better, clean and professional approach)

we use MongoDb Atlas here.
vist the mongodb atlas.
make the cluster and user over there create the username and password.
on the cluster overview click on the connect button and than select compass and copy the url and paste it inside the env file inside the MONGODB_URI variable and replace the password with your password and remove the slash from the last.

//////////////// now connecting the database with backend /////////////////////

so at first we have to give the name to the Database so we give it inside the constants file because if you want to change the name of database you simply change in that file and we didn't place it inside the env file because it is not much sensitive.

before connecting Database to the backend you have to install mongoose and express with the help of below commands.

npm i mongoose
npm i express

npm i mongoose express (by this way you can install both at one command)

always know these two points before working with the database for better approach.

1) whenever you try to talk with the database may there is an error occur so to overcome with this problem use try and catch and promises.
2) Database is always is in another continent. so basically whenever you try to talk with database it takes time. so to overcome this problem always use the async await.

using first way.

to see this how we connect the db see the index.js file

using the second Way

to see this how we connect the db see the index.js file which we created inside the DB folder.

now you can run the program by npm run dev and see that the database is connected succesfully.