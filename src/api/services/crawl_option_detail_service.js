const optionDetails = require('../models/crawl_action_details_model');

// Lưu lại
exports.save = async (optionDetailData) => {
    try {
        // Kiểm tra tồn tại
        const exists = await checkExist(optionDetailData.crawl_detail_id);

        // nếu tồn tại thì xóa các option cũ
        if (exists) await deleteAll(optionDetailData.crawl_detail_id);
        
        // thêm mới
        const newOptionDetail = await add(optionDetailData);

        return newOptionDetail;
    } catch (error) {
        console.error('Lỗi khi lưu lựa chọn của một chi tiết item:', error);
        return null;
    }
}

// Kiểm tra tồn tại
const checkExist = async (itemDetailId) => {
    try {
        const optionDetailList = await optionDetails.findAll({
            where: {
                crawl_detail_id: itemDetailId,
            }
        });

        if (optionDetailList) {
            if (optionDetailList.length > 0) return true;
        }

        return false;
    } catch (error) {
        console.error('Lỗi khi kiểm tra tồn tại của lựa chọn:', error);
        return false;
    }
}

// Thêm mới
const add = async (optionDetailData) => {
    try {
        return await optionDetails.create({
            crawl_detail_id: optionDetailData.crawl_detail_id,
            option_type_id: optionDetailData.option_type_id,
            option_condition_type_id: optionDetailData.option_condition_type_id,
            condition_value: optionDetailData.condition_value
        });
    } catch (error) {
        console.error('Lỗi khi tạo mới lựa chọn của một chi tiết item:', error);
        return null;
    }
}

// Xóa tất cả option của 1 chi tiết item
const deleteAll = async (itemDetailId) => {
    try {
        // Xóa tất cả option bằng itemDetailId
        await optionDetails.destroy({
            where: {
                crawl_detail_id: itemDetailId,
            }
        });

        return true;
    } catch (error) {
        console.error('Lỗi khi xóa tất cả lựa chọn của một chi tiết item:', error);
        return false;
    }
}