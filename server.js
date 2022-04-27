const app = require("./app");
const cloudinary = require("cloudinary");
const dotenv = require('dotenv');
const connectionDatabase = require("./config/database")
dotenv.config();

//handling uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shut down server due to uncaughtException!`);
    process.exit(1)
})

// config


//connectionDatabase
connectionDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})


const server = app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})


// unhandled promise rejection 
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`shut down server due to unhandled rejection!`);

    server.close(() => {
        process.exit(1);
    });
})