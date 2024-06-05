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

// Thêm mới
exports.add = async (itemDetail) => {
    try {
        return await itemDetails.create({
            item_id: itemDetail.item_id,
            name: itemDetail.name,
            value: itemDetail.value,
            is_primary_key: itemDetail.is_primary_key || false,
        });
    } catch (error) {
        console.error('Lỗi khi thêm mới chi tiết item:', error);
        return null;
    }
}

// Cập nhật
exports.update = async (data) => {
    try {
        let itemDetail = await itemDetails.findOne({
            where: {
                id: data.id
            }
        });

        itemDetail.name = data.name;
        itemDetail.value = data.value;

        await itemDetail.save();

        return itemDetail;
    } catch (error) {
        console.error('Lỗi khi cập nhật chi tiết item:', error);
        return null
    }
}
