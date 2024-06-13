const actionDetails = require('../models/crawl_action_details_model');

// Lấy danh sách hành động của một thu thập
exports.getList = async (crawlConfigId) => {
    try {
        const actionDetailList = await actionDetails.findAll({
            where: {
                crawl_config_id: crawlConfigId,
            }
        })

        return actionDetailList;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách lựa chọn của một chi tiết thu thập:', error);
        return [];
    }
}

// Lưu lại
exports.save = async (crawlConfigId, actionDetailDatas) => {
    try {
        // Kiểm tra null
        if(!actionDetailDatas) return null;
        if(actionDetailDatas.length <= 0) return null;

        const actionDetailResults = [];

        // Kiểm tra tồn tại
        const checkResult = await checkExist(crawlConfigId);

        // Nếu tồn tại thì xóa các action cũ
        if (checkResult) await deleteAll(crawlConfigId);
        
        // Thêm mới
        for (const actionDetailData of actionDetailDatas) {
            const newActionDetail = await add(crawlConfigId, actionDetailData);

            actionDetailResults.push(newActionDetail);
        }

        return actionDetailResults;
    } catch (error) {
        console.error('Lỗi khi lưu chi tiết hành động của một phiên thu thập:', error);
        return [];
    }
}

// Kiểm tra tồn tại
const checkExist = async (crawlConfidId) => {
    try {
        const actionDetailList = await actionDetails.findAll({
            where: {
                crawl_config_id: crawlConfidId,
            }
        });

        if (actionDetailList) {
            if (actionDetailList.length > 0) return true;
        }

        return false;
    } catch (error) {
        console.error('Lỗi khi kiểm tra tồn tại của chi tiết hành động của một phiên thu thập:', error);
        return false;
    }
}

// Thêm mới
const add = async (crawlConfigId, actionDetailData) => {
    try {
        return await actionDetails.create({
            crawl_config_id: crawlConfigId,
            action_type_id: actionDetailData.action_type_id,
            selector: actionDetailData.selector
        });
    } catch (error) {
        console.error('Lỗi khi tạo mới chi tiết hành động của một phiên thu thập:', error);
        return null;
    }
}

// Xóa tất cả action bằng của config
const deleteAll = async (crawlConfigId) => {
    try {
        await actionDetails.destroy({
            where: {
                crawl_config_id: crawlConfigId,
            }
        });

        return true;
    } catch (error) {
        console.error('Lỗi khi xóa tất cả chi tiết hành động của một phiên thu thập:', error);
        return false;
    }
}