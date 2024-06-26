const crawlService = require('../services/crawl_service');
const crawlConfigService = require('../services/crawl_config_service');
const {HTTP_STATUS} = require('../untils/constans/constans');

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
        const {items, errors} = await crawlService.handleCrawlingData(crawlConfigInfor);

        // Gửi kết quả về client
        res.status(HTTP_STATUS.OK).json({ crawl_config_infor: newCrawlConfigInfor, items, errors });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Đã xảy ra lỗi khi thu thập dữ liệu'});
        console.log('Lỗi khi thực hiện thu thập dữ liệu, với cấu hình thu tập được gửi từ client', error);
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
        const {items, errors} = await crawlService.handleCrawlingData(crawlConfigInfor);

        // Gửi kết quả về client
        res.status(HTTP_STATUS.OK).json({ crawl_config_infor: crawlConfigInfor, items, errors });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Đã xảy ra lỗi khi thu thập dữ liệu' });
        console.log('Lỗi khi thực hiện cập nhật lại dữ liệu thu thập, với cấu hình thu tập được lấy từ database theo id', error);
    }
};

// Hàm thực hiện lưu lại dữ liệu thu thập
exports.saveCrawlResult = async (req, res) => {
    try {
        const { crawl_config_infor, items } = req.body;

        const results = await crawlService.saveCrawlResult(
            items, 
            crawl_config_infor.crawl_config.item_type_id, 
            crawl_config_infor.crawl_config.website_id, 
            crawl_config_infor.crawl_config.id
        );

        const completed = await crawlConfigService.complete(crawl_config_infor.crawl_config.id);

        if (completed) {
            res.status(HTTP_STATUS.OK).json({ items : results });
        } else {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ 
                error: 'Đánh dấu hoàn thành cấu hình thất bại!',
                items: []
            });
        }
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Lỗi khi lưu kết quả thu thập:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Đã xảy ra lỗi khi lưu lại kết quả thu thập' });
    }
};
