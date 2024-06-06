const itemService = require('../services/item_service');

// Lấy tất cả item
exports.getAll = async (req, res) => {
    try {
        const items = await itemService.getAll();
        res.json(items);
    } catch (error) {
        console.error('Lỗi khi lấy tất cả item:', error);
        res.status(500).json({ error: 'Lỗi khi lấy tất cả item' });
    }
}
// Lấy danh sách item theo loại item
exports.getListItemByItemType = async (req, res) => {
    try {
        const { id } = req.params; 

        const items = await itemService.getListItemByItemType(id);
        res.json(items);
    } catch (error) {
        console.error(`Lỗi khi lấy item theo item_type_id ${id}:`, error);
        res.status(500).json({ error: `Lỗi khi lấy item theo item_type_id ${id}` });
    }
}