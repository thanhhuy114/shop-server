const htmlCrawlService = require('../services/html_crawl_service');
const typeService = require('../services/type_service');
const crawlConfigService = require('../services/crawl_config_service');

// Hàm thực hiện thu thập dữ liệu, với cấu hình thu tập được gửi từ client
exports.crawlingData = async (req, res) => {
    try {
        // Lấy tham số
        const crawlConfigInfor = req.body;

        // Lưu lại cấu hình của lần thu thập
        const newCrawlConfigInfor = await crawlConfigService.saveConfigInfor(
            crawlConfigInfor.crawl_config,
            crawlConfigInfor.crawl_action_details, 
            crawlConfigInfor.crawl_details, 
            crawlConfigInfor.crawl_option_details
        );

        // Thực hiện thu thập
        const items = await handleCrawlingData(crawlConfigInfor);

        // Gửi kết quả về client
        res.status(200).json({ crawl_config_infor: newCrawlConfigInfor, items });
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi thu thập dữ liệu'});
        console.log(error);
    }
};

// Hàm thực hiện cập nhật lại dữ liệu thu thập, với cấu hình thu tập được lấy từ database theo id
exports.reCrawlingData = async (req, res) => {
    try {
        // Lấy tham số
        const {id} = req.params;

        // Lấy cấu hình thu thập từ database
        const crawlConfigInfor = await crawlConfigService.getConfigInfor(id);

        //  Thực hiện thu thập
        const items = await handleCrawlingData(crawlConfigInfor);

        // Gửi kết quả về client
        res.status(200).json({ crawl_config_infor: crawlConfigInfor, items });
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật lại dữ liệu thu thập'});
        console.log(error);
    }
};

// Hàm thực hiện thu thập dữ liệu
const handleCrawlingData = async (crawlConfigInfor) => {
    // Lấy loại thu thập (trang danh sách hay trang chi tiết)
    const result_type = (await typeService.getCrawlResultType(crawlConfigInfor.crawl_config.result_type_id)).type;

    // Thực hiện thu thập theo từng loại
    let crawlResult;
    if(result_type === 'single') {
        crawlResult = await htmlCrawlService.singleCrawl(
            crawlConfigInfor.crawl_config, 
            crawlConfigInfor.crawl_action_details, 
            crawlConfigInfor.crawl_details, 
            crawlConfigInfor.crawl_option_details
        );
    } else if (result_type === 'multi') {
        crawlResult = await htmlCrawlService.multiCrawl(
            crawlConfigInfor.crawl_config, 
            crawlConfigInfor.crawl_action_details, 
            crawlConfigInfor.crawl_details, 
            crawlConfigInfor.crawl_option_details
        );
    }

    // Lưu lại danh sách items
    const items = await htmlCrawlService.saveCrawlResult(
        crawlResult,
        crawlConfigInfor.crawl_config.item_type_id,
        crawlConfigInfor.crawl_config.website_id,
        crawlConfigInfor.crawl_config.id
    );

    return items;
};
