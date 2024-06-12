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
        console.error('Lỗi khi lấy kiểm tra tên cấu hình:', error);
        return null;
    }
}

// Cập nhật (thêm các trường đã cấu hình sau khi tạo)
exports.update = async (id, crawlConfigData) => {
    try {
        const crawlConfig = await crawlConfigs.findByPk(id);

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

// Đánh dấu hoàn thành
exports.complete = async (id) => {
    try {
        const crawlConfig = await crawlConfigs.findByPk(id);
        
        crawlConfig.is_complete = true;
        crawlConfig.update_at = Date.now();
        
        crawlConfig.save();

        return crawlConfig;
    } catch (error) {
        console.error('Lỗi khi đánh dấu hoàn thành cấu hình thu thập:', error);
        return null;
    }
}