const users = require('../models/users_model');
const typeService = require('../services/type_service');
const {USER_TYPES} = require('../untils/constans/constans')

// Tạo mới
exports.create = async (userData) => {
    // Lấy thông tin gói đăng ký
    const userTypeDefault = await typeService.getUserTypeByTypeName(USER_TYPES.DEFAULT);

    // Tạo mới vào cờ sở dữ liệu
    const newUser = await users.create({
        user_type_id: userTypeDefault.id,
        username: userData.username,
        password: userData.password,
        fullname: userData.fullname,
        email: userData.email,
        phone: userData.phone,
        config_count: 0,
        locked: false,
    });

    return newUser;
}

// Xóa user
exports.delete = async (id) => {
    try {
        const result = await users.destroy({ where: { id } });
        return result > 0;
    } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error);
        return false;
    }
};

// Sửa user
exports.update = async (id, userData) => {
    try {
        const user = await users.findByPk(id);
        if (!user) {
            return null;
        }

        Object.keys(userData).forEach(key => {
            user[key] = userData[key];
        });

        await user.save();
        return user;
    } catch (error) {
        console.error('Lỗi khi cập nhật người dùng:', error);
        return null;
    }
};

// tăng số lượng cấu hình đã tạo thêm 1
exports.increaseConfigCount = async (id) => {
    try {
        const user = await users.findByPk(id);
        if (!user) {
            return null;
        }

        user.config_count = user.config_count + 1;

        await user.save();

        return user;
    } catch (error) {
        console.error('Lỗi khi tăng số lượng cấu hình đã tạo thêm 1:', error);
        return null;
    }
};

// Lấy 1 user
exports.getById = async (id) => {
    try {
        const user = await users.findByPk(id);
        return user;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
        return null;
    }
};

// Lấy tất cả user
exports.getAll = async () => {
    try {
        const userList = await users.findAll();
        return userList;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách người dùng:', error);
        return [];
    }
};

// Kiểm tra tên đăng nhập đã tồn tại
exports.checkUsernameExists = async (username) => {
    try {
        const user = await users.findOne({ where: { username } });
        return user ? true : false;
    } catch (error) {
        console.error('Lỗi khi kiểm tra tên đăng nhập:', error);
        return false;
    }
};

// Kiểm tra đăng nhập
exports.checkLogin = async (username, password) => {
    try {
        const user = await users.findOne({ 
            where: { 
                username: username, 
                password: password
            } 
        });

        return user;
    } catch (error) {
        console.error('Lỗi khi kiểm tra đăng nhập:', error);
        return null;
    }
};

// Kiểm tra số lượng cấu hình đã tạo đạt giới hạn hay chưa (true => chưa đạt giới hạn => có thể tạo thêm)
exports.checkConfigLimit = async (id) => {
    try {
        // Lấy số lượng cấu hình đã tạo của user
        const user = await users.findByPk(id);
        const configCount = user.config_count;

        // Lấy số lượng cấu hình có thể tạo tối đa của loại tài tài khoản mà người dùng đăng ký
        const userTypeId = user.user_type_id;
        const userType = await typeService.getUserType(userTypeId);
        const configLimit = userType.max_configs;
        
        // Kiểm tra
        if (configLimit - configCount > 0) return true;
        else return false;
    } catch (error) {
        console.error('Lỗi kiểm tra số lượng cấu hình đã tạo có đạt giới hạn:', error);
        return false;
    }
};
