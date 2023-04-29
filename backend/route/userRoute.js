const express = require('express');
const { registerUser, loginUser, logout, forgotpassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateRole, deleteUser } = require('../controller/userController');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../utils/auth')

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotpassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/me").get(isAuthenticatedUser ,getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser ,updateProfile);
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"), getAllUser);
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles("admin"), getSingleUser)
.put(isAuthenticatedUser,authorizeRoles("admin"),updateRole)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser)
module.exports = router;