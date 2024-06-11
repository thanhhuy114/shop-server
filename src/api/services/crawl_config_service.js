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
exports.update = async (crawlConfigData) => {
    try {
        const crawlConfig = await crawlConfigs.findByPk(crawlConfigData.id);
        
        crawlConfig.name = crawlConfigData.name;
        crawlConfig.description = crawlConfigData.description;
        crawlConfig.crawl_type_id = crawlConfigData.crawl_type_id;
        crawlConfig.result_type_id = crawlConfigData.result_type_id;
        crawlConfig.item_selector = crawlConfigData.item_selector;
        crawlConfig.item_type_id = crawlConfigData.item_type_id;
        crawlConfig.url = crawlConfigData.url;
        crawlConfig.website_id = crawlConfigData.website_id;
        crawlConfig.is_complete = false;
        crawlConfig.update_at = Date.now();
        
        crawlConfig.save();

        return crawlConfig;
    } catch (error) {
        console.error('Lỗi khi cập nhật cấu hình thu thập:', error);
        return null;
    }
}