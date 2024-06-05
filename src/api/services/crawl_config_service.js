const crawlConfig = require('../models/crawl_configs_model');

exports.add = async (data) => {
    try {
        return await crawlConfig.create({
            name: data.name,
            description: data.description,
            crawl_type_id: data.crawl_type_id,
            result_type_id: data.result_type_id,
            item_selector: data.item_selector,
            item_type_id: data.item_type_id,
            url: data.url,
            website_id: data.website_id,
            is_complete: false
        });
    } catch (error) {
        console.error('Lỗi khi thêm loại sản phẩm:', error);
        return null;
    }
}