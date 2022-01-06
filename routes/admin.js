const express = require("express");
const adminController = require("../controllers/admin");
const router = express.Router();

router.get("/add-product", adminController.getAddproduct);
router.get("/products", adminController.getProduct);
router.post("/add-product", adminController.postAddproduct);
router.post("/edit-product", adminController.postEditProduct);
router.get("/edit-product/:productId", adminController.getEditProduct);
router.post("/delete-product/:productId", adminController.postDeleteProduct);
exports.router = router;
