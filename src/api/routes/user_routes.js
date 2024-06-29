const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

// Tạo user mới
router.post('/create', userController.create);

// Xóa user
router.delete('/delete/:id', userController.delete);

// Sửa user
router.put('/update/:id', userController.update);

// Lấy 1 user
router.get('/get/:id', userController.getById);

// Lấy tất cả user
router.get('/get-all', userController.getAll);

// Kiểm tra đang nhập
router.post('/check-login', userController.checkLogin);

// Kiểm tra tên đăng nhập đã tồn tại
router.get('/check-username-exists/:username', userController.checkUsernameExists);

module.exports = router;
