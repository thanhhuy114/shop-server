const htmlCrawlService = require('../services/html_crawl_service');
const typeService = require('../services/type_service');
const crawlConfigService = require('../services/crawl_config_service');

// Hàm thực hiện thu thập dữ liệu
exports.crawlingData = async (req, res) => {
    try {
        // Lấy tham số
        const body = req.body;

        // Lưu lại cấu hình của lần thu thập
        const crawlConfig = await crawlConfigService.add(body.crawl_config);

        // Lấy danh sách item
            // Lấy loại thu thập (trang danh sách hay trang chi tiết)
            const result_type = await typeService.getCrawlResultType(crawlConfig.result_type_id);

            // Thực hiện thu thập theo từng loại
            let crawlResult;
            if(result_type === 'single') {
                crawlResult = await htmlCrawlService.singleCrawl(crawlConfig, body);
            } else if (result_type === 'multi') {
                crawlResult = await htmlCrawlService.multiCrawl(crawlConfig, body);
            }

            // Lưu lại danh sách items
            const items = await htmlCrawlService.saveCrawlResult(
                crawlResult, 
                crawlConfig.item_type_id, 
                crawlConfig.website_id, 
                crawlConfig.id
            );

        // Gửi kết quả về client
        res.status(200).json( items );
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi thu thập dữ liệu'});
    }
};
