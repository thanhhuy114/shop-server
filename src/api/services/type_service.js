const websites = require('../models/websites_model');
const crawlTypes = require('../models/crawl_types_model');
const crawlActionTypes = require('../models/crawl_action_types_model');
const itemTypes = require('../models/item_types_model');
const crawlOptionConditionTypes = require('../models/crawl_option_condition_types_model');
const crawlOptionTypes = require('../models/crawl_option_types_model');
const crawlResultTypes = require('../models/crawl_result_types_model');
const crawlDataTypes = require('../models/crawl_data_types_model');

// Bảng loại sản phẩm
exports.getItemType = async (id) => {
    try {
        const itemType = await itemTypes.findByPk(id);
        return itemType ? itemType : null;
    } catch (error) {
        console.error('Lỗi khi lấy loại sản phẩm:', error);
        return null;
    }
}

exports.getAllItemTypes = async () => {
    try {
        return await itemTypes.findAll();
    } catch (error) {
        console.error('Lỗi khi lấy tất cả loại sản phẩm:', error);
        return [];
    }
}

exports.addItemType = async (data) => {
    try {
        return await itemTypes.create({
            type: data.type,
            description: data.description
        });
    } catch (error) {
        console.error('Lỗi khi thêm loại sản phẩm:', error);
        return null;
    }
}

exports.updateItemType = async (data) => {
    try {
        let itemType = await itemTypes.findOne({
            where: {
                id: data.id
            }
        });

        itemType.type = data.type;
        itemType.description = data.description;

        await itemType.save();

        return itemType;
    } catch (error) {
        console.error('Lỗi khi cập nhật loại sản phẩm:', error);
        return null
    }
}

exports.deleteItemType = async (id) => {
    try {
        const itemType = await itemTypes.findByPk(id);
        
        if(!itemType) return false;

        await itemType.destroy();
        
        return itemType;
    } catch (error) {
        console.error('Lỗi khi xóa loại sản phẩm:', error);
        return null;
    }
}

// Bảng tên website
exports.getWebsite = async (id) => {
    try {
        const website = await websites.findByPk(id);
        return website ? website : null;
    } catch (error) {
        console.error('Lỗi khi lấy tên website:', error);
        throw error;
    }
}

exports.getAllWebsites = async () => {
    try {
        return await websites.findAll();
    } catch (error) {
        console.error('Lỗi khi lấy tất cả website:', error);
        throw error;
    }
}

exports.addWebsite = async (data) => {
    try {
        return await websites.create({
            name: data.name,
            url: data.url
        });
    } catch (error) {
        console.error('Lỗi khi thêm website:', error);
        return null;
    }
}

exports.updateWebsite = async (data) => {
    try {
        let website = await websites.findOne({
            where: {
                id: data.id
            }
        });

        website.name = data.name;
        website.url = data.url;

        await website.save();

        return website;
    } catch (error) {
        console.error('Lỗi khi cập nhật website:', error);
        return null
    }
}

exports.deleteWebsite = async (id) => {
    try {
        const website = await websites.findByPk(id);
        
        if(!website) return false;

        await website.destroy();
        
        return true;
    } catch (error) {
        console.error('Lỗi khi xóa website:', error);
        return false;
    }
}

// Bảng loại thu thập
exports.getCrawlType = async (id) => {
    try {
        const crawlType = await crawlTypes.findByPk(id);
        return crawlType ? crawlType : null;
    } catch (error) {
        console.error('Lỗi khi lấy loại thu thập:', error);
        throw error;
    }
}

exports.getAllCrawlTypes = async () => {
    try {
        return await crawlTypes.findAll();
    } catch (error) {
        console.error('Lỗi khi lấy tất cả loại thu thập:', error);
        throw error;
    }
}

// Bảng loại kết quả
exports.getCrawlResultType = async (id) => {
    try {
        const crawlResultType = await crawlResultTypes.findByPk(id);
        return crawlResultType ? crawlResultType : null;
    } catch (error) {
        console.error('Lỗi khi lấy loại kết quả:', error);
        throw error;
    }
}

exports.getAllCrawlResultTypes = async () => {
    try {
        return await crawlResultTypes.findAll();
    } catch (error) {
        console.error('Lỗi khi lấy tất cả loại kết quả:', error);
        throw error;
    }
}

// Bảng loại hành động
exports.getCrawlActionType = async (id) => {
    try {
        const crawlActionType = await crawlActionTypes.findByPk(id);
        return crawlActionType ? crawlActionType : null;
    } catch (error) {
        console.error('Lỗi khi lấy loại hành động:', error);
        throw error;
    }
}

exports.getAllCrawlActionTypes = async () => {
    try {
        return await crawlActionTypes.findAll();
    } catch (error) {
        console.error('Lỗi khi lấy tất cả loại hành động:', error);
        throw error;
    }
}

// Bảng loại lấy dữ liệu
exports.getCrawlDataType = async (id) => {///////////////////////
    try {
        const crawlDataType = await crawlDataTypes.findByPk(id);
        return crawlDataType ? crawlDataType : null;
    } catch (error) {
        console.error('Lỗi khi lấy loại dữ liệu:', error);
        throw error;
    }
}

exports.getAllCrawlDataTypes = async () => {
    try {
        return await crawlDataTypes.findAll();
    } catch (error) {
        console.error('Lỗi khi lấy tất cả loại dữ liệu:', error);
        throw error;
    }
}

// Bảng loại lựa chọn
exports.getCrawlOptionType = async (id) => {
    try {
        const crawlOptionType = await crawlOptionTypes.findByPk(id);
        return crawlOptionType ? crawlOptionType : null;
    } catch (error) {
        console.error('Lỗi khi lấy loại lựa chọn:', error);
        throw error;
    }
}

exports.getAllCrawlOptionTypes = async () => {
    try {
        return await crawlOptionTypes.findAll();
    } catch (error) {
        console.error('Lỗi khi lấy tất cả loại lựa chọn:', error);
        throw error;
    }
}

// Bảng loại điều kiện lựa chọn
exports.getCrawlOptionConditionType = async (id) => {
    try {
        const crawlOptionConditionType = await crawlOptionConditionTypes.findByPk(id);
        return crawlOptionConditionType ? crawlOptionConditionType : null;
    } catch (error) {
        console.error('Lỗi khi lấy loại điều kiện áp dụng lựa chọn:', error);
        throw error;
    }
}

exports.getAllCrawlOptionConditionTypes = async () => {
    try {
        return await crawlOptionConditionTypes.findAll();
    } catch (error) {
        console.error('Lỗi khi lấy tất cả loại điều kiện áp dụng lựa chọn:', error);
        throw error;
    }
}
