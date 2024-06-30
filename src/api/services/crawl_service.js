const typeService = require('./type_service');
const itemService = require('./item_service');
const htmlCrawlService = require('./html_crawl_service');
const apiCrawlService = require('./api_crawl_service');
const rssCrawlService = require('./rss_crawl_service');
const crawlConfigService = require('./crawl_config_service');
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

    // Thực hiện vào trang chi tiết của từng item (nếu có cấu hình con)
    const childConfigs = crawlConfigInfor.child_configs;
    if (childConfigs) {
        if (childConfigs.length > 0) {
            for (const childConfigInfor of childConfigs) {
                for (let i = 0; i < crawlResult.items.length; i++) {
                    for (const itemDetail of crawlResult.items[i]) {
                        if (itemDetail.is_detail_url) {
                            childConfigInfor.crawl_config.url = itemDetail.value;

                            const childCrawlResult = await this.handleCrawlingData(childConfigInfor);

                            for ( const itemDetail of childCrawlResult.items){
                                crawlResult.items[i].push(...itemDetail);
                            }

                            break;
                        }
                    }
                }
            }
        }
    }

    // Trả về danh sách item thu thập được và các lỗi trong quá trình thu thập
    return {items: crawlResult.items, errors: crawlResult.errors};
}

// Hàm lưu kết quả thu thập được vào database
exports.saveCrawlResult = async (itemDatas, itemTypeId, websiteId, crawlConfigId) => {
    // Khai báo
    const results = [];

    try {
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
    } catch {
        return results;
    }

}

// Kiểm tra và cập nhật dữ liệu thu thập khi
exports.checkAndUpdateData = async () => {
    try {
        // Lấy danh sách cần cập nhật (thu thập lại)
        const outdateConfigs = await crawlConfigService.getOutdatedConfigs();

        if (outdateConfigs.length == 0) { 
            console.log('Không có các kết quả thu thập quá hạn cần cập nhật');
        }

        for (crawlConfig of outdateConfigs) {
            updateCrawlResult(crawlConfig.id);
        }

    } catch (err) {
        console.log('Lỗi khi cập nhật các kết quả thu thập quá hạn');
    }
}

// Cập nhật dữ liệu thu thập cho các cấu hình quá hạn
const updateCrawlResult = async (id) => {
    // Lấy cấu hình thu thập từ database
    const crawlConfigInfor = await crawlConfigService.getConfigInfor(id);

    //  Thực hiện thu thập
    const {items} = await this.handleCrawlingData(crawlConfigInfor);

    const crawlConfig = crawlConfigInfor.crawl_config;

    // Lưu lại kết quả
    await this.saveCrawlResult(
        items, 
        crawlConfig.item_type_id, 
        crawlConfig.website_id, 
        crawlConfig.id
    );

    // Cập nhật lại ngày cập nhật
    const updated = await crawlConfigService.updateDate(id);

    if (updated) {
        console.log('Cập nhật lại dữ liệu thu thập thành công cho cấu hình có id:', id);
    } else {
        console.log('Cập nhật lại dữ liệu thu thập thất bại cho cấu hình có id:', id);
    }
}
