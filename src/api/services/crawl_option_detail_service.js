const optionDetails = require('../models/crawl_option_details_model');
const typeService = require('../services/type_service');

// Lấy danh sách lựa chọn của một chi tiết thu thập
exports.getList = async (crawlDetailId) => {
    try {
        const optionDetailList = await optionDetails.findAll({
            where: {
                crawl_detail_id: crawlDetailId,
            }
        })

        return optionDetailList;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách lựa chọn của một chi tiết thu thập:', error);
        return [];
    }
}

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
            option_value: optionDetailData.option_value,
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

// Hàm thực hiện xử lý các lựa chọn để chuyển đổi kết quả về dạng mong muốn
exports.handleOptions = async (options, crawl_detail_id, value) => {
    for (const option of options) {
        if(option.crawl_detail_id === crawl_detail_id) {
            const { option_type_id, option_value, type_option_condition_id, condition_value } = option;

            // Lấy loại option
            const type_option = (await typeService.getCrawlOptionType(option_type_id)).type;

            // Kiểm tra điều kiện thực hiện
            const checkConditionResult = await checkCondition(type_option_condition_id, condition_value, value);

            // Thêm vào đầu chuỗi
            if (type_option === 'prepend') {
                // Thực hiện option nếu điều kiện đúng
                if (checkConditionResult) {
                    value = option_value + value;
                }
            }

            // Thêm vào cuối chuỗi
            if (type_option === 'append') {
                // Thực hiện option nếu điều kiện đúng
                if (checkConditionResult) {
                    value = value + option_value;
                }
            }

            // Loại bỏ ký tự không phải số
            if (type_option === 'to number') {
                // Thực hiện option nếu điều kiện đúng
                if (checkConditionResult) {
                    value = value.replace(/\D/g, '');
                }
            }
        }
    }

    return value;
};

// Hàm kiểm tra điều kiện
const checkCondition = async (conditionId, conditionValue, value) => {
    // TRUE nếu không có điều kiện cần kiểm tra
    if(!conditionId) return true;
    if(!conditionValue) return true;

    // Lấy tên loại điều kiện
    const conditionType = (await typeService.getCrawlOptionConditionType(conditionId)).type;

    // Kiểm tra cho từng loại điều kiện
    if (conditionType === 'Start with') {
        return value.toLowerCase().startsWith(conditionValue.toLowerCase());
    } else if (conditionType === 'End with') {
        return value.toLowerCase().endsWith(conditionValue.toLowerCase());
    } else if (conditionType === 'Contain') {
        return value.toLowerCase().includes(conditionValue.toLowerCase());
    } else {
        console.error('Loại điều kiện chưa được định nghĩa:', conditionType);
        return false;
    }
};
