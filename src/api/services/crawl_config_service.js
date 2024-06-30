const crawlConfigs = require('../models/crawl_configs_model');
const crawlConfigService = require('./crawl_config_service');
const actionDetailService = require('./crawl_action_detail_service');
const crawlDetailService = require('./crawl_detail_service');
const userService = require('../services/user_service');
const { Op } = require('sequelize');

// Lưu lại các thông tin cấu hình của 1 phiên thu thập
exports.saveConfigInfor = async (crawlConfig, crawlActionDetails, crawlDetails, crawlOptionDetails, childConfigs) => {
    try {
        // Lưu thêm các thuộc tính khác vào bảng crawl_configs
        const crawlConfigResult = await crawlConfigService.update(crawlConfig.id, crawlConfig);

        // Lưu vào bảng crawl_action_details
        const actionDetailResults = await actionDetailService.save(crawlConfigResult.id, crawlActionDetails);

        // Lưu vào bảng crawl_details và crawl_option_details
        const { crawl_details, crawl_option_details } = await crawlDetailService.save(crawlConfigResult.id, crawlDetails, crawlOptionDetails);

        // Lưu cấu hình con (nếu có)
        const child_configs = [];
        if (childConfigs) {
            if (childConfigs.length > 0) {
                for (const configInfor of childConfigs) {
                    // trước khi tạo, xóa hết các cấu hình con của cấu hình này
                    await deleteAllChildConfig(crawlConfig.id);

                    // tạo mới cấu hình con
                    const newChildConfig = await createChildConfig(crawlConfig.id, configInfor.crawl_config);

                    configInfor.crawl_config.id = newChildConfig.id;

                    // lưu lại các thông tin khác của cấu hình con
                    const newCrawlConfigInfor = await crawlConfigService.saveConfigInfor(
                        configInfor.crawl_config,
                        configInfor.crawl_action_details, 
                        configInfor.crawl_details, 
                        configInfor.crawl_option_details,
                        configInfor.child_configs
                    );

                    child_configs.push(newCrawlConfigInfor);
                }
            }
        }

        return { 
            crawl_config: crawlConfigResult,
            crawl_action_details: actionDetailResults,
            crawl_details,
            crawl_option_details,
            child_configs
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

        // Lấy danh sách cấu hình con
        const childConfigs = await this.getListChildConfigs(crawlConfigId); 

        // Lấy tất cả thông tin cấu hình của từ cấu hình con
        const childConfigInfors = [];
        if (childConfigs.length > 0) {
            for (const childConfig of childConfigs) {
                const childConfigInfor = await this.getConfigInfor(childConfig.id);

                childConfigInfors.push(childConfigInfor);
            }
        }

        // Trả về kết quả
        return { 
            crawl_config: crawlConfigResult,
            crawl_action_details: actionDetailResults,
            crawl_details,
            crawl_option_details,
            child_configs: childConfigInfors,
        }
    } catch (error) {
        console.error('Lỗi khi lấy cấu hình thu thập:', error);
        return null;
    }
}

// Lấy tất cả cấu hình
exports.getAll = async () => {
    try {
        const results = await crawlConfigs.findAll();

        return results;
    } catch (error) {
        console.error('Lỗi khi lấy cấu hình thu thập:', error);
        return null;
    }
}

// Lấy tất cả cấu hình của một user
exports.getAllByUserId = async (userId) => {
    try {
        const results = await crawlConfigs.findAll({
            where: {
                user_id: userId,
            }
        });

        return results;
    } catch (error) {
        console.error('Lỗi khi lấy cấu hình thu thập:', error);
        return null;
    }
}

// Lấy danh sách các cấu hình cần cập nhật (update_at quá 7 ngày, is_complete = true)
exports.getOutdatedConfigs = async () => {
    try {
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);

        const results = await crawlConfigs.findAll({
            where: {
                update_at: { [Op.lte]: sevenDaysAgo },
                is_complete: true
            }
        });

    return results;
    } catch (error) {
        console.error('Lỗi khi lấy các configs cần cập nhật:', error);
        return [];
    }
};

// Tạo mới
exports.create = async (userId, name, description) => {
    try {
        // Tạo mới cấu hình
        const newCrawlConfig = await crawlConfigs.create({
            user_id: userId,
            name: name,
            description: description,
            is_complete: false
        });

        // Cập nhật số lượng cấu hình đã tạo của user đó (tăng thêm 1)
        await userService.increaseConfigCount(userId);

        return newCrawlConfig;
    } catch (error) {
        console.error('Lỗi khi tạo mới cấu hình thu thập:', error);
        return null;
    }
}

// Tạo cấu hình thu thập con
const createChildConfig = async (parentId, configData) => {
    try {
        // Tạo mới cấu hình
        const newCrawlConfig = await crawlConfigs.create({
            user_id: -1,
            name: '',
            description: '',
            item_type_id: null,
            url: '',
            website_id: null,
            is_complete: false,
            update_at: new Date(),

            // Chỉ quan tâm các thông tin bên dưới khi là cấu hình con
            parent_id: parentId,
            crawl_type_id: configData.crawl_type_id,
            result_type_id: configData.result_type_id,
            item_selector: configData.item_selector,http_method_type_id: configData.http_method_type_id,
            body_api: configData.body_api,
            headers_api: configData.headers_api,
        });

        return newCrawlConfig;
    } catch (error) {
        console.error('Lỗi khi tạo cấu hình thu thập con:', error);
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
        crawlConfig.parent_id = crawlConfig.parent_id || null;
        crawlConfig.item_selector = crawlConfigData.item_selector || null;
        crawlConfig.item_type_id = crawlConfigData.item_type_id;
        crawlConfig.url = crawlConfigData.url;
        crawlConfig.website_id = crawlConfigData.website_id;
        crawlConfig.http_method_type_id = crawlConfigData.http_method_type_id;
        crawlConfig.body_api = crawlConfigData.body_api;
        crawlConfig.headers_api = crawlConfigData.headers_api;
        crawlConfig.is_complete = crawlConfigData.is_complete || false;
        crawlConfig.update_at = new Date();
        
        crawlConfig.save();

        return crawlConfig;
    } catch (error) {
        console.error('Lỗi khi cập nhật cấu hình thu thập:', error);
        return null;
    }
}

// Cập nhật ngày cập nhật dữ liệu
exports.updateDate = async (id) => {
    try {
        const crawlConfig = await crawlConfigs.findByPk(id);
        if (!crawlConfig) {
            return false;
        }

        crawlConfig.update_at = new Date();
        await crawlConfig.save();

        return true;
    } catch (error) {
        console.error('Lỗi khi cập nhật ngày cập nhật dữ liệu:', error);
        return false;
    }
}

// Đánh dấu hoàn thành
exports.complete = async (id) => {
    try {
        const crawlConfig = await crawlConfigs.findByPk(id);
        
        crawlConfig.is_complete = true;
        crawlConfig.update_at = new Date();
        
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

// Lấy danh sách các cấu hình con
exports.getListChildConfigs = async (parentId) => {
    try {
        const results = await crawlConfigs.findAll({
            where: {
                parent_id: parentId,
            }
        });

        return results;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách cấu hình con:', error);
        return null;
    }
}

// Xóa các cấu hình con của cấu hình này
const deleteAllChildConfig = async (parentId) => {
    try {
        // Tìm và xóa tất cả các cấu hình con của cấu hình cha
        const results = await crawlConfigs.destroy({
            where: {
                parent_id: parentId
            }
        });

        return true;
    } catch (error) {
        console.error('Lỗi khi xóa danh sách cấu hình con:', error);
        return false;
    }
}
