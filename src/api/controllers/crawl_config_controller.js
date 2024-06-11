const crawlConfigService = require('../services/crawl_config_service');

// Kiểm tra tên cấu hình đã tồn tại chưa
exports.checkNameExists = async (req, res) => {
    try {
        const { name } = req.params;

        const checkResult = await crawlConfigService.checkNameExists(name);

        res.status(200).json(checkResult);
    } catch (error) {
        console.error('Lỗi khi kiểm tran tên cấu hình:', error);
        res.status(500).json({ error: 'Lỗi khi kiểm tra tên cấu hình' });
    }
}

// Tạo mới một phiên cấu hình thu thập
exports.create = async (req, res) => {
    try {
        const { name, description } = req.body;

        const newCrawlConfig = await crawlConfigService.create(name, description);
        
        res.status(200).json(newCrawlConfig);
    } catch (error) {
        console.error(`Lỗi khi tạo mới cấu hình:`, error);
        res.status(500).json({ error: `Lỗi khi tạo mới cấu hình` });
    }
}