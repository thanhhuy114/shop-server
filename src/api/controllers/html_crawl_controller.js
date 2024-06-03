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
            let data;
            if(result_type === 'single') {
                data = await htmlCrawlService.get(body);
            } else if (result_type === 'multi') {
                data = await htmlCrawlService.getAll(body);
            }

        // Gửi kết quả về client
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi thu thập dữ liệu'});
    }
};
