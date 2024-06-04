const htmlCrawlService = require('../services/html_crawl_service');
const typeService = require('../services/type_service');

// Hàm thực hiện thu thập dữ liệu
exports.crawlingData = async (req, res) => {
    try {
        // Lấy tham số
        const body = req.body;

        // Lưu lại cấu hình của lần thu thập
        // 

        // Lấy danh sách item
            // Lấy loại thu thập (trang danh sách hay trang chi tiết)
            const result_type = await typeService.getCrawlResultType(body.crawl_config.result_type_id);

            // Thực hiện thu thập theo từng loại
            let crawlResult;
            if(result_type === 'single') {
                crawlResult = await htmlCrawlService.singleCrawl(body);
            } else if (result_type === 'multi') {
                crawlResult = await htmlCrawlService.multiCrawl(body);
            }

            // Lưu lại danh sách items
            // 

        // Gửi kết quả về client
        res.status(200).json({ crawlResult });
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi thu thập dữ liệu'});
    }
};
