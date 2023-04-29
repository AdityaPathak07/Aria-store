const app = require('./app');
const cloudinary = require('cloudinary')
const connectDatabase = require('./config/database');

//Handling Uncaught Exception like log(youtube) - which is not defined
process.on('uncaughtException', (err)=>{
    console.log(`Error : ${err.message}`);
    console.log("Shutting down the server for uncaught Exception");
        process.exit(1);
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({ path: "backend/config/config.env" });
  }

//Connecting to database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const server = app.listen(process.env.PORT, function(){
    console.log(`Port running at PORT ${process.env.PORT}`);
})

//Unhandled Promise Rejection like mongo:// instead of mongodb://

process.on("unhandledRejection" ,(err) =>{
    console.log(`Error : ${err.message}`);
    console.log("Shutting down th server for unhandled Promise Rejection");
    server.close(() =>{
        process.exit(1);
    })
})