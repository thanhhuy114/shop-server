const crawlConfigs = require('../models/crawl_configs_model');

// Tạo mới
exports.create = async (name, description) => {
    try {
        return await crawlConfigs.create({
            name: name,
            description: description,
            is_complete: false
        });
    } catch (error) {
        console.error('Lỗi khi tạo mới cấu hình thu thập:', error);
        return null;
    }
}

// Kiểm tra tên đã tồn tại
exports.checkNameExists = async (name) => {
    try {
        const crawlConfig = await crawlConfigs.findOne({
            where: {
                name: name
            }
        });

        return crawlConfig? true : false;
    } catch (error) {
        console.error('Lỗi khi lấy item:', error);
        return null;
    }
}

// Đánh dấu hoàn thành
// Cập nhật (thêm các trường đã cấu hình sau khi tạo)
// 