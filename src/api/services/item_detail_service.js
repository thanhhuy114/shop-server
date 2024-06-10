const itemDetails = require('../models/item_details_model');

// Lấy tất cả item
exports.getAll = async () => {
    try {
        return await itemDetails.findAll();
    } catch (error) {
        console.error('Lỗi khi lấy tất cả chi tiết item:', error);
        return [];
    }
}

// Lấy tất cả item details theo item_id
exports.getListItemDetailsByItemId = async (itemId) => {
    try {
        return await itemDetails.findAll({
            where: {
                item_id: itemId
            }
        });
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết item theo item_id:', error);
        return [];
    }
}

// Lấy tất cả item details theo item_id
exports.getItemDetailContainUrl = async (itemId) => {
    try {
        return await itemDetails.findOne({
            where: {
                item_id: itemId,
                is_primary_key: true
            }
        });
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết item theo item_id:', error);
        return null;
    }
}

// Thêm mới
exports.add = async (itemId, itemDetailData) => {
    try {
        return await itemDetails.create({
            item_id: itemId,
            name: itemDetailData.name,
            value: itemDetailData.value,
            is_primary_key: itemDetailData.is_primary_key || false,
        });
    } catch (error) {
        console.error('Lỗi khi thêm mới chi tiết item:', error);
        return null;
    }
}

// Cập nhật
exports.update = async (id, newItemDetailData) => {
    try {
        let itemDetail = await itemDetails.findByPk(id);

        itemDetail.name = newItemDetailData.name;
        itemDetail.value = newItemDetailData.value;

        await itemDetail.save();

        return itemDetail;
    } catch (error) {
        console.error('Lỗi khi cập nhật chi tiết item:', error);
        return null
    }
}
