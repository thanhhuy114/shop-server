const optionDetails = require('../models/crawl_option_details_model');

// Lưu lại
exports.save = async (crawlDetailId, optionDetailDatas) => {
    try {
        // Kiểm tra null
        if(optionDetailDatas.length <= 0) {
            return [];
        }
        
        const newOptionDetails = []

        // thêm mới
        for (const optionDetailData of optionDetailDatas) {
            const newOptionDetail = await add(crawlDetailId, optionDetailData);

            newOptionDetails.push(newOptionDetail);
        }

        return newOptionDetails;
    } catch (error) {
        console.error('Lỗi khi lưu lựa chọn của một chi tiết item:', error);
        return [];
    }
}

// Kiểm tra tồn tại
exports.checkExist = async (crawlDetailId) => {
    try {
        const optionDetailList = await optionDetails.findAll({
            where: {
                crawl_detail_id: crawlDetailId,
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
const add = async (crawlDetailId, optionDetailData) => {
    try {
        return await optionDetails.create({
            crawl_detail_id: crawlDetailId,
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
exports.deleteAll = async (itemDetailId) => {
    try {
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