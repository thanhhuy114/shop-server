const itemDetailService = require('../services/item_detail_service');
const {HTTP_STATUS} = require('../untils/constans/constans');

// Lấy tất cả chi tiết item của 1 item
exports.getListItemDetails = async (req, res) => {
    try {
        const itemId = req.body.itemId;

        res.status(HTTP_STATUS.OK).json(await itemDetailService.getListItemDetailsByItemId(itemId));
    } catch (error) {
        console.error(`Lỗi khi lấy chi tiết item theo item_id ${id}:`, error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: `Lỗi khi lấy chi tiết item theo item_id ${id}` });
    }
}
