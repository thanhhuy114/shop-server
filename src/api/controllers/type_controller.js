const typeService = require('../services/type_service');


// Bảng loại item
exports.getAllItemTypes = async (req, res) => {
    res.json(await typeService.getAllItemTypes());
}
exports.addItemType = async (req, res) => {
    const data = req.body.data;

    res.json(await typeService.addItemType(data));
}
exports.updateItemType = async (req, res) => {
    const data = req.body.data;

    res.json(await typeService.updateItemType(data));
}
exports.deleteItemType = async (req, res) => {
    const id = req.body.id;

    const result = await typeService.deleteItemType(id);

    if(result) res.json({success: "Xóa loại sản phẩm thành công!"});
    else res.json({error: "Xóa loại sản phẩm thất bại!"});
}

// Bảng tên website
exports.getAllWebsites = async (req, res) => {
    res.json(await typeService.getAllWebsites());
}
exports.addWebsite = async (req, res) => {
    const data = req.body.data;

    res.json(await typeService.addWebsite(data));
}
exports.updateWebsite = async (req, res) => {
    const data = req.body.data;

    res.json(await typeService.updateWebsite(data));
}
exports.deleteWebsite = async (req, res) => {
    const id = req.body.id;

    const result = await typeService.deleteWebsite(id)

    if(result) res.json({success: "Xóa website thành công!"});
    else res.json({error: "Xóa website thất bại!"});
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
