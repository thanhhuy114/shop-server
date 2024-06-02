const {
    crawl_types,
    crawl_result_types,
    crawl_action_types,
    crawl_data_types,
    crawl_option_types,
    crawl_option_condition_types,
    item_types,
    websites
} = require('./database_demo');

// Bảng loại thu thập
exports.getCrawlType = (id) => {
    return crawl_types.find(type => type.id === id).type;
}

exports.getAllCrawlTypes = () => {
    return crawl_types.map(type => ({ id: type.id, type: type.type, description: type.description }));
}

// Bảng loại kết quả
exports.getCrawlResultType = (id) => {
    return crawl_result_types.find(type => type.id === id).type;
}

exports.getAllCrawlResultTypes = () => {
    return crawl_result_types.map(type => ({ id: type.id, type: type.type, description: type.description }));
}

// Bảng loại hành động
exports.getCrawlActionType = (id) => {
    return crawl_action_types.find(type => type.id === id).type;
}

exports.getAllCrawlActionTypes = () => {
    return crawl_action_types.map(type => ({ id: type.id, type: type.type, description: type.description }));
}

// Bảng loại dữ liệu
exports.getCrawlDataType = (id) => {
    return crawl_data_types.find(type => type.id === id).type;
}

exports.getAllCrawlDataTypes = () => {
    return crawl_data_types.map(type => ({ id: type.id, type: type.type, description: type.description }));
}

// Bảng loại lựa chọn
exports.getCrawlOptionType = (id) => {
    return crawl_option_types.find(type => type.id === id).type;
}

exports.getAllCrawlOptionTypes = () => {
    return crawl_option_types.map(type => ({ id: type.id, type: type.type, description: type.description }));
}

// Bảng loại điều kiện lựa chọn
exports.getCrawlOptionConditionType = (id) => {
    return crawl_option_condition_types.find(type => type.id === id).type;
}

exports.getAllCrawlOptionConditionTypes = () => {
    return crawl_option_condition_types.map(type => ({ id: type.id, type: type.type, description: type.description }));
}

// Bảng loại sản phẩm
exports.getItemType = (id) => {
    return item_types.find(type => type.id === id).type;
}

exports.getAllItemTypes = () => {
    return item_types.map(type => ({ id: type.id, type: type.type, description: type.description }));
}

// Bảng tên website
exports.getWebsiteName = (id) => {
    return websites.find(type => type.id === id).name;
}

exports.getAllWebsites = () => {
    return websites.map(type => ({ id: type.id, name: type.name, url: type.url }));
}
