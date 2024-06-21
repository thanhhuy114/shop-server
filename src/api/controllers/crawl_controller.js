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
        const items = await crawlService.handleCrawlingData(crawlConfigInfor);

        // Gửi kết quả về client
        res.status(HTTP_STATUS.OK).json({ crawl_config_infor: newCrawlConfigInfor, items });
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
        const items = await crawlService.handleCrawlingData(crawlConfigInfor);

        // Gửi kết quả về client
        res.status(HTTP_STATUS.OK).json({ crawl_config_infor: crawlConfigInfor, items });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Đã xảy ra lỗi khi thu thập dữ liệu'});
        console.log('Lỗi khi thực hiện cập nhật lại dữ liệu thu thập, với cấu hình thu tập được lấy từ database theo id', error);
    }
};
