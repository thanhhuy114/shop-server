const express = require('express');
const router = express.Router();
const htmlCrawlController = require('../controllers/html_crawl_controller');

//Thu thập dữ liệu từ bằng HTML
    // Lấy dữ liệu của 1 đối tượng
    router.post('/get-data', htmlCrawlController.crawlingData);

module.exports = router;