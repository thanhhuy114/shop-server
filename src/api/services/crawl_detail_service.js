const crawlDetails = require('../models/crawl_details_model');
const optionDetailService = require('./crawl_option_detail_service');

// Lấy danh sách chi tiết cấu hình của 1 phiên thu thập
exports.getList = async (crawlConfigId) => {
    try {
        // Lấy danh sách chi tiết cấu hình
        const crawlDetailList = await crawlDetails.findAll({
            where: {
                crawl_config_id: crawlConfigId,
            }
        });

        const crawlOptionDetailResults = [];

        // Lấy danh sách lựa chọn của từ chi tiết cấu hình
        for (const crawlDetail of crawlDetailList) {
            const crawl_option_details = await optionDetailService.getList(crawlDetail.id);

            crawlOptionDetailResults.push(...crawl_option_details);
        }

        return { crawl_details: crawlDetailList, crawl_option_details: crawlOptionDetailResults };
    } catch (error) {
        console.error('Lỗi khi lấy danh sách chi tiết cấu hình của 1 phiên thu thập:', error);
        return null;
    }
};

// Lưu lại
exports.save = async (crawlConfigId, crawlDetailDatas, crawlOptionDetails) => {
    try {
        // Kiểm tra null
        if(crawlDetailDatas.length <= 0) {
            return null;
        }

        const crawlDetailResults = [];
        const crawlOptionDetailResults = [];

        // Xóa các CrawlDetail cũ
            // Kiểm tra tồn tại
            const checkCrawlDetailExist = await checkExist(crawlConfigId);

            // nếu tồn tại thì xóa các cấu hình chi tiết item cũ
            if (checkCrawlDetailExist) await deleteAll(crawlConfigId);
        
        // Thêm mới
        for (const crawlDetailData of crawlDetailDatas) {
            const { crawl_detail, crawl_option_details } = await add(crawlConfigId, crawlDetailData, crawlOptionDetails);

            crawlDetailResults.push(crawl_detail);
            crawlOptionDetailResults.push(...crawl_option_details);
        }

        return { crawl_details: crawlDetailResults, crawl_option_details: crawlOptionDetailResults };
    } catch (error) {
        console.error('Lỗi khi lưu cấu hình chi tiết item của 1 phiên thu thập:', error);
        return null;
    }
}

// Kiểm tra tồn tại
const checkExist = async (crawlConfigId) => {
    try {
        const crawlDetailList = await crawlDetails.findAll({
            where: {
                crawl_config_id: crawlConfigId,
            }
        });

        if (crawlDetailList) {
            if (crawlDetailList.length > 0) return true;
        }

        return false;
    } catch (error) {
        console.error('Lỗi khi kiểm tra tồn tại của cấu hình chi tiết item của 1 phiên thu thập:', error);
        return false;
    }
}

// Thêm mới
const add = async (crawlConfigId, crawlDetailData, crawlOptionDetails) => {
    /*
        - crawlOptionDetails: chứa tất cả các lựa chọn của tất cả các thuộc tính
        - options: chứa tất cả các lựa chọn của 1 thuộc tính
        - crawlDetailData.id và crawlOptionDetail.crawl_detail_id: 
            + các id này là id tạm thời, 
            + được gửi từ client
            + chỉ dùng để xác định option nào của thuộc tính nào
            + không dùng để lưu vào database
    */
    try {
        const newCrawlDetail = await crawlDetails.create({
            crawl_config_id: crawlConfigId,
            name: crawlDetailData.name,
            selector: crawlDetailData.selector,
            attribute: crawlDetailData.attribute,
            data_type_id: crawlDetailData.data_type_id,
            is_detail_url: crawlDetailData.is_detail_url || false,
            is_primary_key: crawlDetailData.is_primary_key || false,
            is_contain_keywords: crawlDetailData.is_contain_keywords || false
        });

        // Xóa các OptionDetail cũ
            // Kiểm tra tồn tại
            const checkCrawlOptionDetailExist = await optionDetailService.checkExist(newCrawlDetail.id);

            // nếu tồn tại thì xóa các option cũ
            if (checkCrawlOptionDetailExist) await optionDetailService.deleteAll(newCrawlDetail.id);

        const options = [];
        
        // Lấy option của từng crawlDetail
        if(crawlOptionDetails)
            for (const crawlOptionDetail of crawlOptionDetails) {
                if(crawlDetailData.id == crawlOptionDetail.crawl_detail_id) {
                    options.push(crawlOptionDetail);
                }
            }

        // Lưu vào bảng crawl_option_details
        const newOptionDetails = await optionDetailService.save(newCrawlDetail.id, options);

        return { crawl_detail: newCrawlDetail, crawl_option_details: newOptionDetails };
    } catch (error) {
        console.error('Lỗi khi tạo mới cấu hình chi tiết item của 1 phiên thu thập:', error);
        return null;
    }
}

// Xóa tất cả cấu hình chi tiết item của 1 phiên thu thập
const deleteAll = async (crawlConfigId) => {
    try {
        // Lấy tất cả crawlDetailIds của một phiên cấu hình
        const crawlDetailIds = await getAllCrawlDetailIdOfCrawlConfig(crawlConfigId);

        // Xóa tất cả crawlDetail của một phiên cấu hình
        await crawlDetails.destroy({
            where: {
                crawl_config_id: crawlConfigId,
            }
        });

        // Xóa tất cả các lựa chọn của từng crawlDetail
        for (const crawlDetailId of crawlDetailIds) {
            const deleted = await optionDetailService.deleteAll(crawlDetailId);

            if (!deleted) return false;
        }

        return true;
    } catch (error) {
        console.error('Lỗi khi xóa tất cả cấu hình chi tiết item của 1 phiên thu thập:', error);
        return false;
    }
}

// Lấy tất cả crawlDetailIds của một phiên cấu hình
const getAllCrawlDetailIdOfCrawlConfig = async (crawlConfigId) => {
    try {
        const crawlDetailList = await crawlDetails.findAll({
            where: {
                crawl_config_id: crawlConfigId,
            }
        });

        return crawlDetailList.map(e => e.id);
    } catch (error) {
        console.error('Lỗi khi Lấy tất cả crawlDetailIds của một phiên cấu hình:', error);
        return [];
    }
}