const app = require("./app");
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