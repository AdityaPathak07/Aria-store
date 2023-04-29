const ErrorHandler = require('../utils/errorhandler');

module.exports = (err,req,res,next) =>{

//Wrong MongoDB error - caste_error like id error (small id)
if(err.name === "CastError"){
    const message = `No Resource found, Invalid : ${err.path}`;
    err = new ErrorHandler(message, 400)
}
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
//err.stack means from which location it is facing problems

// Mongoose duplicate key error
if(err.code === 11000){
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
    err = new ErrorHandler(message, 400)
}

// Wrong JWT  Token
if(err.name === "JsonWebTokenError"){
    const message = `JWT is invalid, try again`;
    err = new ErrorHandler(message, 400)
}

// JWT Expire Error
if(err.name === "TokenExpiredError"){
    const message = `JWT is expired, try again`;
    err = new ErrorHandler(message, 400)
}
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}

