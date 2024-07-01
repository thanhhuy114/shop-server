const ItemDetails = require('../models/item_details_model');
const itemDetailService = require('../services/item_detail_service');
const {HTTP_STATUS} = require('../untils/constans/constans');

// Lấy tất cả chi tiết item của 1 item
exports.getListItemDetails = async (req, res) => {
    try {
        const {id} = req.params;

        const itemDetails = await itemDetailService.getListItemDetailsByItemId(id);

        res.status(HTTP_STATUS.OK).json({itemDetails});
    } catch (error) {
        console.error(`Lỗi khi lấy chi tiết item theo item_id ${id}:`, error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: `Lỗi khi lấy chi tiết item theo item_id ${id}` });
    }
}
