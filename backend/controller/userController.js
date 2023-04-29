const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const sendtoken = require("../utils/jwttoken");
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary')
//Register a User

exports.registerUser = catchAsyncError (async (req,res,next) =>{
    
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id : myCloud.public_id,
            url : myCloud.secure_url,
        }
    });

    sendtoken(user,201,res);
})

//Login User

exports.loginUser = catchAsyncError (async (req,res,next) => {

    const {email,password} = req.body;
    //Checking if user has give password and email both

    if(!email || !password)
    return next(new ErrorHandler("Please enter password or email",400))

    const user = await User.findOne({email}).select("+password");

    if(!user)
    return next(new ErrorHandler("Invalid email or password"));

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched)
    return next(new ErrorHandler("Invalid password", 401));

    sendtoken(user,200,res);
    
})

// Logout User

exports.logout = catchAsyncError(async (req,res,next) =>{
    
    res.cookie("token", null, {
        expires : new Date(Date.now()),
        httpOnly : true
    })
    
    
    res.status(200) .json({
        success : true,
        message : "Logged Out"
    })
})

// Forgot Password

exports.forgotpassword = catchAsyncError(async (req,res,next) =>{
    const user = await User.findOne({email: req.body.email});
    if(!user)
    return next(new ErrorHandler("User not found",404))

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave : false});

    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
      )}/password/reset/${resetToken}`;
         
    const message = `Your password reset token is  : \n ${resetPasswordUrl}
    \n if you have not requested this email then please ignore it.`;

     try{
         await sendEmail({
              email : user.email,
              subject : `ShopNow Password Recovery`,
              message,
         })

         res.status(200).json({
            success:true,
            message : `Email send to ${user.email} successfully`,
         })
     } 
     catch(error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave : false});
        return next(new ErrorHandler(error.message,500))
     }
});;

// Reset Password

exports.resetPassword = catchAsyncError(async (req,res,next) =>{

    //Creating token hash
    const resetPasswordToken = crypto.createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire : {$gt : Date.now()},    
    })

    if(!user)
    return next(new ErrorHandler("Reset password token is invalid or expired",400))

    if(req.body.password !== req.body.confirmPassword)
    return next(new ErrorHandler("Password does not match",400))

     user.password = req.body.password;
     user.resetPasswordToken = undefined;
     user.resetPasswordExpire = undefined;

     await user.save();

     sendtoken(user,200,res)
})
//Get user details

exports.getUserDetails = catchAsyncError (async (req,res,next) =>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    })
})

//Update User Password

exports.updatePassword = catchAsyncError (async (req,res,next) =>{
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched)
    return next(new ErrorHandler("Old password is incorrect", 400));

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.newPassword;
    await user.save();
    sendtoken(user,200,res);
    
    // res.status(200).json({
    //     success:true,
    //     user
    // })
})

// update User Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
  
    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);
  
      const imageId = user.avatar.public_id;
  
      await cloudinary.v2.uploader.destroy(imageId);
  
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
  
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
    new:true,
    runValidators : true,
    useFindAndModify: false
})
      res.status(200).json({
        success:true,
    })
})

// GET ALL USERS (ADMIN)

exports.getAllUser = catchAsyncError(async (req,res,next) =>{
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

// GET SINGLE USER DETAILS (ADMIN)

exports.getSingleUser = catchAsyncError(async (req,res,next) =>{
    const user = await User.findById(req.params.id);

    if(!user)
    return next(new ErrorHandler(`User does not exist with ID : ${req.params.id}`))
    
    
    res.status(200).json({
        success: true,
        user
    })
})



//Update User role --ADMIN

exports.updateRole = catchAsyncError (async (req,res,next) =>{

    const newUserData = {
        name : req.body.name,
        email : req.body.email,
        role : req.body.role
    }
     await User.findByIdAndUpdate(req.params.id, newUserData,{
        new:true,
        runValidators : true,
        useFindAndModify: false
    })
          res.status(200).json({
            success:true,
        })
    })
    

    
//Delete user profile --ADMIN

exports.deleteUser = catchAsyncError (async (req,res,next) =>{

    const user = await User.findById(req.params.id);

    if(!user)
    return next(new ErrorHandler(`User does not exist with ${req.params.id}`,400))
          
    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);
  

    await user.remove()
    
    res.status(200).json({
            success:true,
            message : "User deleted Successfully"
        })
    })
    