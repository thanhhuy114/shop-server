const express = require('express');
const router = express.Router();
const typeController = require('../controllers/type_controller');

/* Các route xử lý liên quan đến các bảng chứa các Loại sẽ được tập chung ở đây */


// Routes cho loại sản phẩm
router.get('/get-all-item-types', typeController.getAllItemTypes);
router.post('/add-item-type', typeController.addItemType);
router.post('/update-item-type', typeController.updateItemType);
router.post('/delete-item-type', typeController.deleteItemType);

// Routes cho tên website
router.get('/get-all-websites', typeController.getAllWebsites);
router.post('/add-website', typeController.addWebsite);
router.post('/update-website', typeController.updateWebsite);
router.post('/delete-website', typeController.deleteWebsite);

// Routes cho loại thu thập
router.get('/get-all-crawl-types', typeController.getAllCrawlTypes);

// Routes cho loại kết quả
router.get('/get-all-crawl-result-types', typeController.getAllCrawlResultTypes);

// Routes cho loại hành động
router.get('/get-all-crawl-action-types', typeController.getAllCrawlActionTypes);

// Routes cho loại dữ liệu
router.get('/get-all-crawl-data-types', typeController.getAllCrawlDataTypes);
router.get('/get-all-crawl-data-types-by-crawl-type-id/:id', typeController.getAllCrawlDataTypesByCrawlTypeId);

// Routes cho loại lựa chọn
router.get('/get-all-crawl-option-types', typeController.getAllCrawlOptionTypes);

// Routes cho loại điều kiện lựa chọn
router.get('/get-all-crawl-option-condition-types', typeController.getAllCrawlOptionConditionTypes);

// Routes cho loại phương thức gọi API
router.get('/get-all-http-method-types', typeController.getAllHttpMethodTypes);

// Routes cho loại user
router.get('/get-all-user-types', typeController.getAllUserTypes);

// Routes cho loại gói đăng ký
router.get('/get-all-package-types', typeController.getAllPackageTypes);

module.exports = router;
