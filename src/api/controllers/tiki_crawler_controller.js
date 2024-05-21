const tikiCrawlService = require('../services/tiki_crawler_service');

// Lấy danh sách tất cả sản phẩm là điện thoại
exports.getAllProduct = async (req, res) => {
    try {
        // Lấy danh sách tên các sản phẩm
        const productsData = await tikiCrawlService.getAllProduct();

        // Danh sách sản phẩm sau khi thêm vào database
        let products = [];

        // Thêm danh sách tên sản phẩm vào database
        for (const product of productsData) {
            // Thêm vào và đồng bộ
            const newProduct = await tikiCrawlService.syncProduct(product);

            // lưu lại kết quả vừa thêm nếu chưa tồn tại để tránh bị trùng
            const isExist = products.some(existingProduct => existingProduct.product_url === product.product_url);
            if(!isExist)
                products.push(newProduct);
        }

        // Gửi kết quả về client
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy tất cả sản phẩm từ Tiki' });
    }
};

// Tìm danh sách sản phẩm phù hợp với từ khóa
exports.searchProductsWithKey = async (req, res) => {
    try {
        // Từ khóa cần tìm
        const keySearch = req.body.key;

        // Lấy danh sách tên các sản phẩm
        const productsData = await tikiCrawlService.searchProductsWithKey(keySearch);

        // Danh sách sản phẩm sau khi thêm vào database
        let products = [];

        // Thêm danh sách tên sản phẩm vào database
        for (const product of productsData) {
            const newProduct = await tikiCrawlService.syncProduct(product);

            // lưu lại kết quả vừa thêm nếu chưa tồn tại để tránh bị trùng
            if(!isExist)
                products.push(newProduct);
        }

        // Gửi kết quả về client
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tìm kiếm danh sách sản phẩm phù hợp từ Tiki' });
    }
};

// Lấy chi tiết sản phẩm bằng url trang chi tiết
exports.getProductDetail = async (req, res) => {
    try {
        // Url trang chi tiết của sản phẩm
        const url = req.body.url;

        // Lấy sản phẩm
        const product = await tikiCrawlService.getProductDetail(url);

        // Đồng bộ sản phẩm
        const newProduct= await tikiCrawlService.syncProduct(product);

        // Gửi kết quả về client
        res.status(200).json({ newProduct });
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin sản phẩm từ trang chi tiết Tiki!' });
    }
};