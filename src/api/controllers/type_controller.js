const typeService = require('../services/type_service');


// Bảng loại item
exports.getAllItemTypes = async (req, res) => {
    res.json(await typeService.getAllItemTypes());
}

// Bảng tên website
exports.getAllWebsites = async (req, res) => {
    res.json(await typeService.getAllWebsites());
}

// Bảng loại thu thập
exports.getAllCrawlTypes = async (req, res) => {
    res.json(await typeService.getAllCrawlTypes());
}

// Bảng loại kết quả
exports.getAllCrawlResultTypes = async (req, res) => {
    res.json(await typeService.getAllCrawlResultTypes());
}

// Bảng loại hành động
exports.getAllCrawlActionTypes = async (req, res) => {
    res.json(await typeService.getAllCrawlActionTypes());
}

// Bảng loại dữ liệu
exports.getAllCrawlDataTypes = async (req, res) => {
    res.json(await typeService.getAllCrawlDataTypes());
}

// Bảng loại lựa chọn (dùng chỉnh sửa dữ liệu thu thập được)
exports.getAllCrawlOptionTypes = async (req, res) => {
    res.json(await typeService.getAllCrawlOptionTypes());
}

// Bảng loại điều kiện lựa chọn (Dùng xác định khi nào lựa chọn được thực hiện)
exports.getAllCrawlOptionConditionTypes = async (req, res) => {
    res.json(await typeService.getAllCrawlOptionConditionTypes());
}
