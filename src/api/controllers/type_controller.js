const typeService = require('../services/type_service');

// Bảng loại thu thập
exports.getCrawlType = (req, res) => {
    const id = parseInt(req.params.id);
    res.json(typeService.getCrawlType(id));
}

exports.getAllCrawlTypes = (req, res) => {
    res.json(typeService.getAllCrawlTypes());
}

// Bảng loại kết quả
exports.getCrawlResultType = (req, res) => {
    const id = parseInt(req.params.id);
    res.json(typeService.getCrawlResultType(id));
}

exports.getAllCrawlResultTypes = (req, res) => {
    res.json(typeService.getAllCrawlResultTypes());
}

// Bảng loại hành động
exports.getCrawlActionType = (req, res) => {
    const id = parseInt(req.params.id);
    res.json(typeService.getCrawlActionType(id));
}

exports.getAllCrawlActionTypes = (req, res) => {
    res.json(typeService.getAllCrawlActionTypes());
}

// Bảng loại dữ liệu
exports.getCrawlDataType = (req, res) => {
    const id = parseInt(req.params.id);
    res.json(typeService.getCrawlDataType(id));
}

exports.getAllCrawlDataTypes = (req, res) => {
    res.json(typeService.getAllCrawlDataTypes());
}

// Bảng loại lựa chọn
exports.getCrawlOptionType = (req, res) => {
    const id = parseInt(req.params.id);
    res.json(typeService.getCrawlOptionType(id));
}

exports.getAllCrawlOptionTypes = (req, res) => {
    res.json(typeService.getAllCrawlOptionTypes());
}

// Bảng loại điều kiện lựa chọn
exports.getCrawlOptionConditionType = (req, res) => {
    const id = parseInt(req.params.id);
    res.json(typeService.getCrawlOptionConditionType(id));
}

exports.getAllCrawlOptionConditionTypes = (req, res) => {
    res.json(typeService.getAllCrawlOptionConditionTypes());
}

// Bảng loại sản phẩm
exports.getItemType = (req, res) => {
    const id = parseInt(req.params.id);
    res.json(typeService.getItemType(id));
}

exports.getAllItemTypes = (req, res) => {
    res.json(typeService.getAllItemTypes());
}

// Bảng tên website
exports.getWebsiteName = (req, res) => {
    const id = parseInt(req.params.id);
    res.json(typeService.getWebsiteName(id));
}

exports.getAllWebsiteNames = (req, res) => {
    res.json(typeService.getAllWebsiteNames());
}
