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

// Thêm mới
exports.add = async (data) => {
    try {
        return await itemDetails.create({
            item_id: data.item_id,
            name: data.name,
            value: data.value
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
