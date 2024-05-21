const express = require('express');
const router = express.Router();
const productController = require('../controllers/product_controller');

// Lấy  danh sách tất cả sản phẩm
router.post('/get_all', productController.getAllProduct);

// Lấy  danh sách sản phẩm có tên sản phẩm phù hợp với từ khóa
router.post('/searchByName', productController.searchProductByName);

// Lấy sản phẩm bằng id
router.post('/getProductById', productController.getProductById);

// Lấy sản phẩm bằng url trang chi tiết
router.post('/getProductByUrlProduct', productController.getProductByUrlProduct);

// Thêm mới sản phẩm
router.post('/add', productController.addProduct);

// Cập nhật sản phẩm
router.post('/update', productController.updateProduct);

// Xóa sản phẩm
router.post('/delete', productController.deleteProduct);

module.exports = router;