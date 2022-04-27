const express = require('express');
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());

//Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const donor = require("./routes/donorRoute");
const appointment = require("./routes/appointmentRoute");
const doctor = require("./routes/doctorRoute");
// const payment = require("./routes/paymentRoute");


app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", donor);
app.use("/api/v1", doctor);
app.use("/api/v1", appointment);
// app.use("/api/v1", payment);


// error handler middleware
app.use(errorMiddleware);

app.get("/", (req, res) => res.send("hello from server"))

module.exports = app;