const itemService = require('../services/item_service');

// Lấy tất cả item
exports.getAll = async (req, res) => {
    res.json(await itemService.getAll());
}