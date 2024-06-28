const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

// Tạo user mới
router.post('/create', userController.create);

// Kiểm tra đang nhập
router.get('/check-login/:username/:password', userController.checkLogin)

// Kiểm tra tên đăng nhập đã tồn tại
router.get('/check-user-name-exists/:username', userController.checkUsernameExists);

module.exports = router;
