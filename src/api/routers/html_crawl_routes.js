const express = require('express');
const router = express.Router();
const htmlCrawlController = require('../controllers/html_crawl_controller');

//Thu thập dữ liệu từ bằng HTML
    // Lấy dữ liệu của 1 đối tượng
    router.post('/get', htmlCrawlController.get);

    // Lấy dữ liệu của tất cả các đối tượng
    router.post('/get_all', htmlCrawlController.getAll);

    // Tìm dữ liệu của các đối tượng phù hợp với từ khóa
    router.post('/search', htmlCrawlController.search);

module.exports = router;