const actionDetails = require('../models/crawl_action_details_model');
const typeService = require('../services/type_service');
const {ACTIONS} = require('../untils/constans/constans');

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

// Hàm thực hiện xử lý các hành động
exports.handleActions = async (page, actions) => {
    for (const action of actions) {
        const actionType = (await typeService.getCrawlActionType(action.action_type_id)).type;

        if (actionType == ACTIONS.CLICK_WHEN_APPEA) {
            clickWhenAppear(page, action.selector);
        } else if (actionType == ACTIONS.SHOW_AL) {
            await showAll(page, action.selector);
        }
    }
};

// Xử lý sự kiện Show all
const showAll = async (page, selector) => {	
    while (true) {	
        try {	
            await page.click(selector);	
            await page.waitForSelector(selector, { visible: true, timeout: 5000 });	

            // Chờ 0.5 giây	
            await new Promise(resolve => setTimeout(resolve, 500));	
        } catch (error) {	
            break;	
        }
    }
};

// Xử lý sự kiện clickWhenAppear
const clickWhenAppear = async (page, selector) => {
    while (!page.isClosed()) {
        try {
            // Kiểm tra phần tử có tồn tại
            const isElementVisible = await page.evaluate((selector) => {
                const element = document.querySelector(selector);
                return element != null;
            }, selector);

            // Click phần tử nếu có
            if (isElementVisible) {
                await page.click(selector);
                await new Promise(resolve => setTimeout(resolve, 500));
            } else {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        } catch (error) {	
            break;
        }
    }
};
