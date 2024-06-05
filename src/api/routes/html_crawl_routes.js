const express = require('express');
const router = express.Router();
const htmlCrawlController = require('../controllers/html_crawl_controller');

// Thu thập dữ liệu từ bằng HTML
router.post('/crawl-data', htmlCrawlController.crawlingData);

module.exports = router;