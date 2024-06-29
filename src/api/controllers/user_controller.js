const userService = require('../services/user_service');
const {HTTP_STATUS} = require('../untils/constans/constans');

// Tạo mới user
exports.create = async (req, res) => {
    try {
        // Lấy thông tin user từ body
        const {user} = req.body;

        // Kiểm tra tên đăng nhập đã tồn tại
        const checkUsernameExists = await userService.checkUsernameExists(user.username);

        if(checkUsernameExists) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Tên đăng nhập đã tồn tại!' });
        }

        else {
            const newUser = await userService.create(user);

            if (newUser) {
                res.status(HTTP_STATUS.OK).json({ success: 'Tạo mới user thành công!' , user: newUser});
            } else {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Tạo mới user thất bại!' });
            }
        }
    } catch (err) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: `Lỗi tạo mới user: ${err}` });
    }
}

// Xóa user
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await userService.delete(id);

        if (result) {
            res.status(HTTP_STATUS.OK).json({ success: 'Xóa user thành công!' });
        } else {
            res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'User không tồn tại!' });
        }
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi xóa user' });
    }
}

// Sửa user
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body.user;
        const updatedUser = await userService.update(id, userData);

        if (updatedUser) {
            res.status(HTTP_STATUS.OK).json({ success: 'Cập nhật user thành công!', user: updatedUser });
        } else {
            res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'User không tồn tại!' });
        }
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi cập nhật user' });
    }
}

// Lấy 1 user
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getById(id);

        if (user) {
            res.status(HTTP_STATUS.OK).json({user});
        } else {
            res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'User không tồn tại!' });
        }
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi lấy thông tin user' });
    }
}

// Lấy tất cả user
exports.getAll = async (req, res) => {
    try {
        const users = await userService.getAll();
        res.status(HTTP_STATUS.OK).json({users});
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi lấy danh sách user' });
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
        const { username, password } = req.body;
        const user = await userService.checkLogin(username, password);

        if (user) {
            const currentDate  = new Date();
            if (user.locked) {
                res.status(HTTP_STATUS.FORBIDDEN).json({ error: 'Tài khoản đã bị khóa!' });
            }
            else if (user.out_date < currentDate) {
                res.status(HTTP_STATUS.OK).json({ success: 'Đăng nhập thành công! Tài khoản này đã hết hạn đăng ký!', user });
            }
            else {
                res.status(HTTP_STATUS.OK).json({ success: 'Đăng nhập thành công!', user });
            }
        }
        else {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Sai tên đăng nhập hoặc mật khẩu!' });
        }
        
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi kiểm tra đăng nhập' });
    }
};