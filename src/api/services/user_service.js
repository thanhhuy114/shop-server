const users = require('../models/users_model');
const typeService = require('../services/type_service')

// Tạo mới
exports.create = async (userData) => {
    try {
        // Lấy thông tin gói đăng ký
        const packageType = await typeService.getPackageType(userData.package_type_id);

        // Tính ngày hết hạn của tài khoản
        const outDate = new Date();
        outDate.setDate(outDate.getDate() + packageType.days);

        // Tạo mới vào cờ sở dữ liệu
        const newUser = await users.create({
            user_type_id: userData.user_type_id,
            package_type_id: userData.package_type_id,
            username: userData.username,
            password: userData.password,
            fullname: userData.fullname,
            email: userData.email,
            phone: userData.phone,
            out_date: outDate,  
            config_count: 0,
            locked: false,
        });

        return newUser;
    } catch (error) {
        return null;
    }
}

// Kiểm tra tên đăng nhập đã tồn tại
exports.checkUsernameExists = async (username) => {
    try {
        const user = await users.findOne({ where: { username } });
        return !!user;
    } catch (error) {
        console.error('Lỗi khi kiểm tra tên đăng nhập:', error);
        return null;
    }
};

// Kiểm tra đăng nhập
exports.checkLogin = async (username, password) => {
    try {
        const user = await users.findOne({ where: { username, password } });
        return user;
    } catch (error) {
        console.error('Lỗi khi kiểm tra đăng nhập:', error);
        return null;
    }
};
