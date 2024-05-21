const express = require('express');
const router = express.Router();
const tikiCrawlerController = require('../controllers/tiki_crawler_controller');
const cellphonesCrawlerController = require('../controllers/cellphones_crawler_controller');

//Thu thập dữ liệu từ Tiki
    // Lấy danh sách tất cả sản phẩm
    router.post('/tiki/get_all', tikiCrawlerController.getAllProduct);

    // Tìm danh sách sản phẩm phù hợp với từ khóa
    router.post('/tiki/search', tikiCrawlerController.searchProductsWithKey);

    // Lấy chi tiết sản phẩm bằng url trang chi tiết
    router.post('/tiki/get_product_detail', tikiCrawlerController.getProductDetail);

//Thu thập dữ liệu từ CellphoneS
    // Lấy danh sách tất cả sản phẩm
    router.post('/cellphones/get_all', cellphonesCrawlerController.getAllProduct);

    // Tìm danh sách sản phẩm phù hợp với từ khóa
    router.post('/cellphones/search', cellphonesCrawlerController.searchProductsWithKey);

    // Lấy chi tiết sản phẩm bằng url trang chi tiết
    router.post('/cellphones/get_product_detail', cellphonesCrawlerController.getProductDetail);

module.exports = router;