const websites = require('../models/websites_model');
const crawlTypes = require('../models/crawl_types_model');
const crawlActionTypes = require('../models/crawl_action_types_model');
const itemTypes = require('../models/item_types_model');
const crawlOptionConditionTypes = require('../models/crawl_option_condition_types_model');
const crawlOptionTypes = require('../models/crawl_option_types_model');
const crawlResultTypes = require('../models/crawl_result_types_model');
const crawlDataTypes = require('../models/crawl_data_types_model');
const htmlMethodTypes = require('../models/http_method_types_model');
const userTypes = require('../models/user_types_model');
const packageTypes = require('../models/package_types_model');

// Bảng loại sản phẩm
exports.getItemType = async (id) => {
    return await itemTypes.findByPk(id);
}

exports.getAllItemTypes = async () => {
    return await itemTypes.findAll();
}

exports.addItemType = async (data) => {
    return await itemTypes.create({
        type: data.type,
        description: data.description
    });
}

exports.updateItemType = async (data) => {
    let itemType = await itemTypes.findOne({
        where: {
            id: data.id
        }
    });

    itemType.type = data.type;
    itemType.description = data.description;

    return await itemType.save();
}

exports.deleteItemType = async (id) => {
    const itemType = await itemTypes.findByPk(id);
    
    if(!itemType) return false;

    try { await itemType.destroy(); } catch { return false; }
    
    return true;
}

// Bảng tên website
exports.getWebsite = async (id) => {
    return await websites.findByPk(id);
}

exports.getAllWebsites = async () => {
    return await websites.findAll();
}

exports.addWebsite = async (data) => {
    return await websites.create({
        name: data.name,
        url: data.url
    });
}

exports.updateWebsite = async (data) => {
    let website = await websites.findOne({
        where: {
            id: data.id
        }
    });

    website.name = data.name;
    website.url = data.url;

    return await website.save();
}

exports.deleteWebsite = async (id) => {
    const website = await websites.findByPk(id);
    
    if(!website) return false;

    try { await website.destroy(); } catch { return false; }
    
    return true;
}

// Bảng loại thu thập
exports.getCrawlType = async (id) => {
    return await crawlTypes.findByPk(id);
}

exports.getAllCrawlTypes = async () => {
    return await crawlTypes.findAll();
}

// Bảng loại kết quả
exports.getCrawlResultType = async (id) => {
    return await crawlResultTypes.findByPk(id);
}

exports.getAllCrawlResultTypes = async () => {
    return await crawlResultTypes.findAll();
}

// Bảng loại hành động
exports.getCrawlActionType = async (id) => {
    return await crawlActionTypes.findByPk(id);
}

exports.getAllCrawlActionTypes = async () => {
    return await crawlActionTypes.findAll();
}

// Bảng loại lấy dữ liệu
exports.getCrawlDataType = async (id) => {
    return await crawlDataTypes.findByPk(id);
}

exports.getAllCrawlDataTypesByCrawlTypeId = async (crawlTypeId) => {
    return await crawlDataTypes.findAll({
        where: {
            crawl_type_id: crawlTypeId,
        }
    });
}

exports.getAllCrawlDataTypes = async () => {
    return await crawlDataTypes.findAll();
}

// Bảng loại lựa chọn
exports.getCrawlOptionType = async (id) => {
    return await crawlOptionTypes.findByPk(id);
}

exports.getAllCrawlOptionTypes = async () => {
    return await crawlOptionTypes.findAll();
}

// Bảng loại điều kiện lựa chọn
exports.getCrawlOptionConditionType = async (id) => {
    return await crawlOptionConditionTypes.findByPk(id);
}

exports.getAllCrawlOptionConditionTypes = async () => {
    return await crawlOptionConditionTypes.findAll();
}

// Bảng loại Phương thức gửi API
exports.getHttpMethodType = async (id) => {
    return await htmlMethodTypes.findByPk(id);
}

exports.getAllHttpMethodTypes = async () => {
    return await htmlMethodTypes.findAll();
}

// Bảng loại user
exports.getUserType = async (id) => {
    return await userTypes.findByPk(id);
}

exports.getAllUserTypes = async () => {
    return await userTypes.findAll({
        where:{
            deleted: false,
        }
    });
}

// Bảng loại gói đăng ký
exports.getPackageType = async (id) => {
    return await packageTypes.findByPk(id);
}

exports.getAllPackageTypes = async () => {
    return await packageTypes.findAll({
        where:{
            deleted: false,
        }
    });
}
