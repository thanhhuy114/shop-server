const productService = require('../services/product_service');

// Lấy danh sách tất cả sản phẩm
exports.getAllProduct = async (req, res) => {
    try {
        const products = await productService.getAllProduct();

        res.status(200).json({ products });
    } catch (error) {
        console.error('Lỗi khi lấy tất cả sản phẩm:', error);
        res.status(500).json({ error: 'Lỗi Khi lấy tất cả sản phẩm' });
    }
};

// Tìm kiếm sản phẩm theo tên
exports.searchProductByName = async (req, res) => {
    try {
        const name = req.body.name;

        const products = await productService.searchProductByName(name);

        res.status(200).json({ products });
    } catch (error) {
        console.error('Lỗi khi tìm kiếm sản phầm có tên phù hợp với từ khóa:', error);
        res.status(500).json({ error: 'Lỗi khi tìm kiếm sản phầm có tên phù hợp với từ khóa' });
    }
};

// Lấy sản phẩm bằng id
exports.getProductById = async (req, res) => {
    try {
        const id = req.body.id;

        const product = await productService.getProductById(id);

        if (product) {
            res.status(200).json({ product });
        } else {
            res.status(404).json({ error: 'Không tìm thấy sản phẩm có id:', id });
        }
    } catch (error) {
        console.error('Lỗi khi lấy sản phẩm bằng id:', error);
        res.status(500).json({ error: 'Lỗi khi lấy sản phẩm bằng id' });
    }
};

// Lấy sản phẩm bằng URL trang chi tiết
exports.getProductByUrlProduct = async (req, res) => {
    try {
        const url = req.body.url;

        const product = await productService.getProductByUrlProduct(url);

        if (product) {
            res.status(200).json({ product });
        } else {
            res.status(404).json({ error: 'Không tìm thấy sản phẩm có url:', url });
        }
    } catch (error) {
        console.error('Lỗi khi tìm kiếm sản phẩm bằng url', error);
        res.status(500).json({ error: 'Lỗi khi tìm kiếm sản phẩm bằng url' });
    }
};

// Thêm mới sản phẩm
exports.addProduct = async (req, res) => {
    try {
        const productData = req.body.product;

        const newProduct = await productService.addProduct(productData);

        res.status(201).json({newProduct});
    } catch (error) {
        console.error('Lỗi khi thêm mới sản phẩm:', error);
        res.status(500).json({ error: 'Lỗi khi thêm mới sản phẩm' });
    }
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
    try {
        const productData  = req.body.product;

        const updatedProduct = await productService.updateProduct(productData);

        if (updatedProduct) {
            res.status(200).json({updatedProduct});
        } else {
            res.status(404).json({ error: 'Cập nhật thất bại!'});
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
        res.status(500).json({ error: 'Lỗi khi cập nhật sản phẩm' });
    }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
    try {
        const id = req.body.id;

        const deletedProduct = await productService.deleteProduct(id);

        if (deletedProduct) {
            res.status(200).json({ success: "Xóa thành công!" });
        } else {
            res.status(404).json({ error: 'Không tìm thấy sản phẩm có id:', id });
        }
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        res.status(500).json({ error: 'Lỗi khi xóa sản phẩm!' });
    }
};