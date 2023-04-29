const express = require('express');
const app = express();
const cors = require('cors');
const cookieparser = require('cookie-parser')
const errorMiddleware = require('./middleware/error');

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({ path: "config/config.env" });
  }

const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser')
app.use(express.json())
app.use(cookieparser())
app.use(bodyParser.urlencoded({ limit: "50mb",extended:true}));
app.use(fileUpload());
app.use(cors())
//Route import
const product = require("./route/productRoute.js");
const user = require("./route/userRoute.js");
const order = require("./route/orderRoutes.js")
const payment = require("./route/paymentRoute")

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);



// Middleware for error
app.use(errorMiddleware);

module.exports = app;