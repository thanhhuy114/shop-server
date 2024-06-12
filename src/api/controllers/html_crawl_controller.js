const htmlCrawlService = require('../services/html_crawl_service');
const typeService = require('../services/type_service');
const crawlConfigService = require('../services/crawl_config_service');

// Hàm thực hiện thu thập dữ liệu
exports.crawlingData = async (req, res) => {
    try {
        // Lấy tham số
        const body = req.body;

        // Lưu lại cấu hình của lần thu thập (bất đồng bộ)
            // Lưu thêm các thuộc tính khác vào bảng crawl_configs
            await crawlConfigService.update(body.crawl_config.id, body.crawl_config);

            // Lưu vào bảng crawl_action_details
            // Lưu vào bảng crawl_details
            // Lưu vào bảng crawl_option_details

        // Lấy danh sách item
            // Lấy loại thu thập (trang danh sách hay trang chi tiết)
            const result_type = (await typeService.getCrawlResultType(body.crawl_config.result_type_id)).type;

            // Thực hiện thu thập theo từng loại
            let crawlResult;
            if(result_type === 'single') {
                crawlResult = await htmlCrawlService.singleCrawl(
                    body.crawl_config, 
                    body.crawl_action_details, 
                    body.crawl_details, 
                    body.crawl_option_details
                );
            } else if (result_type === 'multi') {
                crawlResult = await htmlCrawlService.multiCrawl(
                    body.crawl_config, 
                    body.crawl_action_details, 
                    body.crawl_details, 
                    body.crawl_option_details
                );
            }

            // Lưu lại danh sách items
            const items = await htmlCrawlService.saveCrawlResult(
                crawlResult,
                body.crawl_config.item_type_id,
                body.crawl_config.website_id,
                body.crawl_config.id
            );

        // Gửi kết quả về client
        res.status(200).json( items );
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi thu thập dữ liệu'});
        console.log(error);
    }
};
