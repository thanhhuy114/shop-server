const crawlConfigService = require('../services/crawl_config_service');
const {HTTP_STATUS} = require('../untils/constans/constans');

// Lấy thông tin một phiên cấu hình thu thập
exports.get = async (req, res) => {
    try {
        const { id } = req.params;

        const crawlConfigInfor = await crawlConfigService.getConfigInfor(id);
        
        res.status(HTTP_STATUS.OK).json(crawlConfigInfor);
    } catch (error) {
        console.error(`Lỗi khi lấy cấu hình:`, error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: `Lỗi khi lấy cấu hình` });
    }
}

// Lấy thông tin một phiên cấu hình thu thập
exports.getAll = async (req, res) => {
    try {
        const allCrawlConfigInfor = await crawlConfigService.getAll();
        
        res.status(HTTP_STATUS.OK).json(allCrawlConfigInfor);
    } catch (error) {
        console.error(`Lỗi khi tất cả lấy cấu hình:`, error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: `Lỗi khi lấy tất cả cấu hình` });
    }
}

// Kiểm tra tên cấu hình đã tồn tại chưa
exports.checkNameExists = async (req, res) => {
    try {
        const { name } = req.params;

        const checkResult = await crawlConfigService.checkNameExists(name);

        res.status(HTTP_STATUS.OK).json(checkResult);
    } catch (error) {
        console.error('Lỗi khi kiểm tran tên cấu hình:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi kiểm tra tên cấu hình' });
    }
}

// Tạo mới một phiên cấu hình thu thập
exports.create = async (req, res) => {
    try {
        const { name, description } = req.body;

        const newCrawlConfig = await crawlConfigService.create(name, description);
        
        res.status(HTTP_STATUS.OK).json(newCrawlConfig);
    } catch (error) {
        console.error(`Lỗi khi tạo mới cấu hình:`, error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: `Lỗi khi tạo mới cấu hình` });
    }
}
