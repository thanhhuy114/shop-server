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
        return itemType ? itemType.type : null;
    } catch (error) {
        console.error('Lỗi khi lấy loại sản phẩm:', error);
        throw error;
    }
}

exports.getAllItemTypes = async () => {
    try {
        return await itemTypes.findAll();
    } catch (error) {
        console.error('Lỗi khi lấy tất cả loại sản phẩm:', error);
        throw error;
    }
}

// Bảng tên website
exports.getWebsiteName = async (id) => {
    try {
        const website = await websites.findByPk(id);
        return website ? website.name : null;
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

// Bảng loại thu thập
exports.getCrawlType = async (id) => {
    try {
        const crawlType = await crawlTypes.findByPk(id);
        return crawlType ? crawlType.type : null;
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
        return crawlResultType ? crawlResultType.type : null;
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
        return crawlActionType ? crawlActionType.type : null;
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

// Bảng loại dữ liệu
exports.getCrawlDataType = async (id) => {
    try {
        const crawlDataType = await crawlDataTypes.findByPk(id);
        return crawlDataType ? crawlDataType.type : null;
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
        return crawlOptionType ? crawlOptionType.type : null;
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
        return crawlOptionConditionType ? crawlOptionConditionType.type : null;
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
