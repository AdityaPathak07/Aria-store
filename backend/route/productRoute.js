const express = require('express');
const { getAllProducts , createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReview, deleteProductReview, getAdminProducts} = require('../controller/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../utils/auth');
const router = express.Router();

router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin") ,getAdminProducts);
router.route("/products").get(getAllProducts);
router.route("/admin/product/new").post( isAuthenticatedUser, authorizeRoles("admin") ,createProduct);

router.route("/admin/product/:id").put(isAuthenticatedUser, authorizeRoles("admin") ,updateProduct).
delete(isAuthenticatedUser, authorizeRoles("admin") ,deleteProduct)

router.route("/product/:id").get(getProductDetails)

router.route("/review").put(isAuthenticatedUser,createProductReview)

router.route("/reviews").get(getProductReview)
.delete(isAuthenticatedUser, deleteProductReview)
module.exports = router


