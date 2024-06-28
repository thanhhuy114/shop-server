const userService = require('../services/user_service');
const {HTTP_STATUS} = require('../untils/constans/constans');

// Tạo mới user
exports.create = async (req, res) => {
    try {
        const {user} = req.body;

        const newUser = await userService.create(user);

        if (newUser) {
            res.status(HTTP_STATUS.OK).json({ success: 'Tạo mới user thành công!' , user: newUser});
        } else {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Tạo mới user thất bại!' });
        }
    } catch (err) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: `Lỗi tạo mới user:`, err });
    }
}

// Kiểm tra tên đăng nhập đã tồn tại
exports.checkUsernameExists = async (req, res) => {
    try {
        const { username } = req.params;
        const exists = await userService.checkUsernameExists(username);

        res.status(HTTP_STATUS.OK).json({ exists });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi kiểm tra tên đăng nhập' });
    }
};

// Kiểm tra đăng nhập
exports.checkLogin = async (req, res) => {
    try {
        const { username, password } = req.params;
        const user = await userService.checkLogin(username, password);

        if (user) {
            res.status(HTTP_STATUS.OK).json({ success: 'Đăng nhập thành công!', user });
        } else {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Sai tên đăng nhập hoặc mật khẩu!' });
        }
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi kiểm tra đăng nhập' });
    }
};