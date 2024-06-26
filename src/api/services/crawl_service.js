const typeService = require('./type_service');
const itemService = require('./item_service');
const htmlCrawlService = require('./html_crawl_service');
const apiCrawlService = require('./api_crawl_service');
const rssCrawlService = require('./rss_crawl_service');
const {CRAWL_TYPES, CRAWL_RESULT_TYPES} = require('../untils/constans/constans');

// Hàm thực hiện thu thập dữ liệu
exports.handleCrawlingData = async (crawlConfigInfor) => {
    // Lấy loại thu thập (trang danh sách hay trang chi tiết)
    const crawlType = (await typeService.getCrawlType(crawlConfigInfor.crawl_config.crawl_type_id)).type;
    const resultType = (await typeService.getCrawlResultType(crawlConfigInfor.crawl_config.result_type_id)).type;

    // Kết quả thu thập
    let crawlResult = [];

    // Thực hiện thu thập theo từng loại
    if (crawlType == CRAWL_TYPES.HTML) {
        if(resultType == CRAWL_RESULT_TYPES.SINGLE) {
            crawlResult = await htmlCrawlService.singleCrawl(
                crawlConfigInfor.crawl_config, 
                crawlConfigInfor.crawl_action_details, 
                crawlConfigInfor.crawl_details, 
                crawlConfigInfor.crawl_option_details
            );
        } else if (resultType == CRAWL_RESULT_TYPES.MULTIPLE) {
            crawlResult = await htmlCrawlService.multiCrawl(
                crawlConfigInfor.crawl_config, 
                crawlConfigInfor.crawl_action_details, 
                crawlConfigInfor.crawl_details, 
                crawlConfigInfor.crawl_option_details
            );
        }
    } else if (crawlType == CRAWL_TYPES.API) {
        if(resultType == CRAWL_RESULT_TYPES.SINGLE) {
            crawlResult = await apiCrawlService.singleCrawl(
                crawlConfigInfor.crawl_config, 
                crawlConfigInfor.crawl_details, 
                crawlConfigInfor.crawl_option_details
            );
        } else if (resultType == CRAWL_RESULT_TYPES.MULTIPLE) {
            crawlResult = await apiCrawlService.multiCrawl(
                crawlConfigInfor.crawl_config, 
                crawlConfigInfor.crawl_details, 
                crawlConfigInfor.crawl_option_details
            );
        }
    } else if (crawlType == CRAWL_TYPES.RSS) {
        if(resultType == CRAWL_RESULT_TYPES.SINGLE) {
            crawlResult = await rssCrawlService.singleCrawl(
                crawlConfigInfor.crawl_config, 
                crawlConfigInfor.crawl_details, 
                crawlConfigInfor.crawl_option_details
            );
        } else if (resultType == CRAWL_RESULT_TYPES.MULTIPLE) {
            crawlResult = await rssCrawlService.multiCrawl(
                crawlConfigInfor.crawl_config,
                crawlConfigInfor.crawl_details, 
                crawlConfigInfor.crawl_option_details
            );
        }
    }

    // Trả về danh sách item thu thập được và các lỗi trong quá trình thu thập
    return {items: crawlResult.items, errors: crawlResult.errors};
};

// Hàm lưu kết quả thu thập được vào database
exports.saveCrawlResult = async (itemDatas, itemTypeId, websiteId, crawlConfigId) => {
    // Khai báo
    const results = [];

    // Duyệt qua kết quả thu được - danh sách item
    for (const item of itemDatas) {
        const itemDetails = [];

        // Duyệt qua từng phần tử JSON trong mảng con
        for (const itemDetail of item) {
            // Lưu vào mảng để trả về
            itemDetails.push({
                name: itemDetail.name, 
                value: itemDetail.value, 
                is_contain_keywords: itemDetail.is_contain_keywords,
                is_primary_key: itemDetail.is_primary_key
            });
        }

        const saveResult = await itemService.save(
            {item_type_id: itemTypeId, website_id: websiteId, crawl_config_id: crawlConfigId},
            itemDetails
        );
        
        // Lưu vào mảng để trả về
        results.push(saveResult);
    }

    return results;
}
