const typeService = require('../services/type_service');
const {HTTP_STATUS} = require('../untils/constans/constans');

// Bảng loại item
exports.getAllItemTypes = async (req, res) => {
    try {
        const itemTypes = await typeService.getAllItemTypes();
        res.status(HTTP_STATUS.OK).json(itemTypes);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi lấy danh sách loại sản phẩm.' });
    }
};

exports.addItemType = async (req, res) => {
    try {
        const data = req.body.data;
        const newItemType = await typeService.addItemType(data);
        res.status(HTTP_STATUS.CREATED).json(newItemType);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi thêm loại sản phẩm.' });
    }
};

exports.updateItemType = async (req, res) => {
    try {
        const data = req.body.data;
        const updatedItemType = await typeService.updateItemType(data);
        res.status(HTTP_STATUS.OK).json(updatedItemType);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi cập nhật loại sản phẩm.' });
    }
};

exports.deleteItemType = async (req, res) => {
    try {
        const id = req.body.id;
        const result = await typeService.deleteItemType(id);
        if (result) {
            res.status(HTTP_STATUS.OK).json({ success: 'Xóa loại sản phẩm thành công!' });
        } else {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Xóa loại sản phẩm thất bại!' });
        }
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi xóa loại sản phẩm.' });
    }
};

// Bảng tên website
exports.getAllWebsites = async (req, res) => {
    try {
        const websites = await typeService.getAllWebsites();
        res.status(HTTP_STATUS.OK).json(websites);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi lấy danh sách website.' });
    }
};

exports.addWebsite = async (req, res) => {
    try {
        const data = req.body.data;
        const newWebsite = await typeService.addWebsite(data);
        res.status(HTTP_STATUS.CREATED).json(newWebsite);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi thêm website.' });
    }
};

exports.updateWebsite = async (req, res) => {
    try {
        const data = req.body.data;
        const updatedWebsite = await typeService.updateWebsite(data);
        res.status(HTTP_STATUS.OK).json(updatedWebsite);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi cập nhật website.' });
    }
};

exports.deleteWebsite = async (req, res) => {
    try {
        const id = req.body.id;
        const result = await typeService.deleteWebsite(id);
        if (result) {
            res.status(HTTP_STATUS.OK).json({ success: 'Xóa website thành công!' });
        } else {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Xóa website thất bại!' });
        }
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi xóa website.' });
    }
};

// Bảng loại thu thập
exports.getAllCrawlTypes = async (req, res) => {
    try {
        const crawlTypes = await typeService.getAllCrawlTypes();
        res.status(HTTP_STATUS.OK).json(crawlTypes);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi lấy danh sách loại thu thập.' });
    }
};

// Bảng loại kết quả
exports.getAllCrawlResultTypes = async (req, res) => {
    try {
        const crawlResultTypes = await typeService.getAllCrawlResultTypes();
        res.status(HTTP_STATUS.OK).json(crawlResultTypes);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi lấy danh sách loại kết quả thu thập.' });
    }
};

// Bảng loại hành động
exports.getAllCrawlActionTypes = async (req, res) => {
    try {
        const crawlActionTypes = await typeService.getAllCrawlActionTypes();
        res.status(HTTP_STATUS.OK).json(crawlActionTypes);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi lấy danh sách loại hành động thu thập.' });
    }
};

// Bảng loại dữ liệu
exports.getAllCrawlDataTypes = async (req, res) => {
    try {
        const crawlDataTypes = await typeService.getAllCrawlDataTypes();
        res.status(HTTP_STATUS.OK).json(crawlDataTypes);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi lấy danh sách loại dữ liệu thu thập.' });
    }
};

exports.getAllCrawlDataTypesByCrawlTypeId = async (req, res) => {
    try {
        const { id } = req.params;
        const crawlDataTypes = await typeService.getAllCrawlDataTypesByCrawlTypeId(id);
        res.status(HTTP_STATUS.OK).json(crawlDataTypes);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi lấy danh sách loại dữ liệu thu thập.' });
    }
};

// Bảng loại lựa chọn (dùng chỉnh sửa dữ liệu thu thập được)
exports.getAllCrawlOptionTypes = async (req, res) => {
    try {
        const crawlOptionTypes = await typeService.getAllCrawlOptionTypes();
        res.status(HTTP_STATUS.OK).json(crawlOptionTypes);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi lấy danh sách loại lựa chọn thu thập.' });
    }
};

// Bảng loại điều kiện lựa chọn (Dùng xác định khi nào lựa chọn được thực hiện)
exports.getAllCrawlOptionConditionTypes = async (req, res) => {
    try {
        const crawlOptionConditionTypes = await typeService.getAllCrawlOptionConditionTypes();
        res.status(HTTP_STATUS.OK).json(crawlOptionConditionTypes);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi lấy danh sách loại điều kiện lựa chọn thu thập.' });
    }
};

// Bảng loại phương thức gọi API
exports.getAllHttpMethodTypes = async (req, res) => {
    try {
        const httpMethodTypes = await typeService.getAllHttpMethodTypes();
        res.status(HTTP_STATUS.OK).json(httpMethodTypes);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi lấy danh sách loại phương thức gọi API.' });
    }
};

// Bảng loại user
exports.getAllUserTypes = async (req, res) => {
    try {
        const userTypes = await typeService.getAllUserTypes();
        res.status(HTTP_STATUS.OK).json(userTypes);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi lấy danh sách loại tài khoản người dùng.' });
    }
};

// Bảng loại gói đăng ký
exports.getAllPackageTypes = async (req, res) => {
    try {
        const packageTypes = await typeService.getAllPackageTypes();
        res.status(HTTP_STATUS.OK).json(packageTypes);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi lấy danh sách loại gói đăng ký.' });
    }
};
