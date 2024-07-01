const itemService = require('../services/item_service');
const {HTTP_STATUS} = require('../untils/constans/constans');

// Lấy tất cả item
exports.getAll = async (req, res) => {
    try {
        const items = await itemService.getAll();
        res.status(HTTP_STATUS.OK).json({items});
    } catch (error) {
        console.error('Lỗi khi lấy tất cả item:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi lấy tất cả item' });
    }
}
// Lấy danh sách item theo loại item
exports.getListItemByItemType = async (req, res) => {
    try {
        const { id } = req.params; 

        const items = await itemService.getListItemByItemType(id);
        
        res.status(HTTP_STATUS.OK).json({items});
    } catch (error) {
        console.error(`Lỗi khi lấy item theo item_type_id ${id}:`, error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: `Lỗi khi lấy item theo item_type_id ${id}` });
    }
}