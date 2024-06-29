const crawlConfigService = require('../services/crawl_config_service');
const userService = require('../services/user_service');
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

// Lấy tất cả cấu hình thu thập
exports.getAll = async (req, res) => {
    try {
        const allCrawlConfigInfor = await crawlConfigService.getAll();
        
        res.status(HTTP_STATUS.OK).json(allCrawlConfigInfor);
    } catch (error) {
        console.error(`Lỗi khi tất cả lấy cấu hình:`, error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: `Lỗi khi lấy tất cả cấu hình` });
    }
}

// Lấy tất cả cấu hình của một user
exports.getAllByUserId = async (req, res) => {
    try {
        const {user_id} = req.params;

        const crawlConfigInfors = await crawlConfigService.getAllByUserId(user_id);
        
        res.status(HTTP_STATUS.OK).json(crawlConfigInfors);
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
        const { user_id, name, description } = req.body;

        if (!user_id) res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Cần cung cấp user_id để tạo mới cấu hình' });

        else {
            // Kiểm tra tài khoãn có thể tạo thêm cấu hình hay không
            const checkConfigLimit = await userService.checkConfigLimit(user_id);

            if(checkConfigLimit) {
                // Tạo mới
                const newCrawlConfig = await crawlConfigService.create(user_id, name, description);
                
                if (newCrawlConfig) {
                    res.status(HTTP_STATUS.OK).json({ success: 'Tạo mới cấu hình thu thập thành công!' , crawl_config: newCrawlConfig});
                } else {
                    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Tạo mới cấu hình thu thập thất bại!' });
                }
            } else {
                res.status(HTTP_STATUS.FORBIDDEN).json({ error: 'Tài khoản đã đạt giới hạn tạo mới cấu hình!' });
            }
        }
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: `Lỗi khi tạo mới cấu hình` });
    }
}
