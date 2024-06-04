const items = require('../models/items_model');

// Lấy tất cả item
exports.getAll = async () => {
    try {
        // Bước 1: Lấy danh sách item (cần lấy id, website_id, item_type_id)
        // Bước 2: Duyệt danh sách item và lấy danh sách chi tiết item (name, value) của từng item
        // Bước 3: Trả về danh sách item đã xử lý (lấy tên website, lấy tên loại sản phẩm)
        return [];
    } catch (error) {
        console.error('Lỗi khi lấy tất cả item:', error);
        return [];
    }
}

// Thêm mới
exports.add = async (data) => {
    try {
        return await items.create({
            item_type_id: data.item_type_id,
            website_id: data.website_id,
            crawl_config_id: data.crawl_config_id,
            update_at: Date.now()
        });
    } catch (error) {
        console.error('Lỗi khi thêm mới item:', error);
        return null;
    }
}

// Cập nhật
exports.update = async (data) => {
    try {
        let item = await items.findOne({
            where: {
                id: data.id
            }
        });

        item.item_type_id = data.item_type_id;
        item.website_id = data.website_id;
        item.crawl_config_id = data.crawlconfig_id;
        item.update_at = Date.now();

        await item.save();

        return item;
    } catch (error) {
        console.error('Lỗi khi cập nhật item:', error);
        return null
    }
}
