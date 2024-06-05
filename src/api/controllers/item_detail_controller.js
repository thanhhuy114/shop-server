const itemDetailService = require('../services/item_detail_service');

// Lấy tất cả chi tiết item của 1 item
exports.getListItemDetails = async (req, res) => {
    const itemId = req.body.itemId;

    res.json(await itemDetailService.getListItemDetailsByItemId(itemId));
}
