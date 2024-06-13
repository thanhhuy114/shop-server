const crawlConfigs = require('../models/crawl_configs_model');
const crawlConfigService = require('./crawl_config_service');
const actionDetailService = require('./crawl_action_detail_service');
const crawlDetailService = require('./crawl_detail_service');

// Lưu lại các thông tin cấu hình của 1 phiên thu thập
exports.saveConfigInfor = async (crawlConfig, crawlActionDetails, crawlDetails, crawlOptionDetails) => {
    try {
        // Lưu thêm các thuộc tính khác vào bảng crawl_configs
        const crawlConfigResult = await crawlConfigService.update(crawlConfig.id, crawlConfig);

        // Lưu vào bảng crawl_action_details
        const actionDetailResults = await actionDetailService.save(crawlConfigResult.id, crawlActionDetails);

        // Lưu vào bảng crawl_details và crawl_option_details
        const { crawl_details, crawl_option_details } = await crawlDetailService.save(crawlConfigResult.id, crawlDetails, crawlOptionDetails);

        return { 
            crawl_config: crawlConfigResult,
            crawl_action_details: actionDetailResults,
            crawl_details,
            crawl_option_details
        }
    } catch (error) {
        console.error('Lỗi khi lưu cấu hình thu thập:', error);
        return null;
    }
}

// Lấy các thông tin cấu hình của 1 phiên thu thập
exports.getConfigInfor = async (crawlConfigId) => {
    try {
        // Lấy thông tin từ bảng crawl_configs
        const crawlConfigResult = await get(crawlConfigId);

        if(!crawlConfigResult) return null;

        // Lấy thông tin từ bảng bảng crawl_action_details
        const actionDetailResults = await actionDetailService.getList(crawlConfigId);

        // Lấy thông tin từ bảng bảng crawl_details và crawl_option_details
        const { crawl_details, crawl_option_details } = await crawlDetailService.getList(crawlConfigId);

        return { 
            crawl_config: crawlConfigResult,
            crawl_action_details: actionDetailResults,
            crawl_details,
            crawl_option_details
        }
    } catch (error) {
        console.error('Lỗi khi lấy cấu hình thu thập:', error);
        return null;
    }
}

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

// Lấy thông tin của 1 phiên thu thập từ bảng crawlConfigs
const get = async (id) => {
    try {
        const crawlConfig = await crawlConfigs.findByPk(id);

        return crawlConfig;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin của 1 phiên thu thập từ bảng crawlConfigs:', error);
        return null;
    }
};
