const Product = require('../models/product_model');
const { Op } = require('sequelize');

// Lấy danh sách tất cả sản phẩm
exports.getAllProduct = async () => {
    return await Product.findAll();
};

// Tìm kiếm sản phẩm theo tên
exports.searchProductByName = async (name) => {
    return await Product.findAll({
        where: {
            name: {
                [Op.like]: `%${name}%`
            }
        }
    });
};

// Lấy sản phẩm bằng id
exports.getProductById = async (id) => {
    return await Product.findByPk(id);
};

// Lấy sản phẩm bằng URL trang chi tiết
exports.getProductByUrlProduct = async (url) => {
    // Tạm thời
    return await Product.findOne({
        where: {
            product_url: url
        }
    });

    // các bước
        // b1: lấy tên website bán sản phẩm
        // b2: gọi hàm crawl của website tương ứng
        // b3: trả về kết quả thu được
};

// Thêm mới sản phẩm
exports.addProduct = async (product) => {
    return await Product.create({
        image_url: product.image_url,
        name: product.name,
        price: product.price,
        promotion: product.promotion,
        rate_starts: product.rate_starts,
        rate_count: product.rate_count,
        sold_count: product.sold_count,
        website_id: null, // sản phẩm của bản thân shop
        product_url: product.product_url,
        update_at: Date.now()
    });
};

// Cập nhật sản phẩm
exports.updateProduct = async (productData) => {
    try {
        let product = null;

        // Kiểm tra xem id có trong productData hay không
        if (productData.id) {
            product = await Product.findOne({
                where: {
                    id: productData.id
                }
            });
        }

        // Nếu không tìm thấy sản phẩm bằng id hoặc không có id, tìm bằng product_url
        if (!product) {
            product = await Product.findOne({
                where: {
                    product_url: productData.product_url
                }
            });
        }

        // Cập nhật dữ liệu chỉ khi dữ liệu mới khác null
        const fieldsToUpdate = ['image_url', 'name', 'price', 'promotion', 'rate_starts', 'rate_count', 'sold_count'];
        let isUpdated = false;

        // Cập nhật dữ liệu chỉ khi dữ liệu mới khác null
        fieldsToUpdate.forEach(field => {
            if (productData[field] !== null && productData[field] !== product[field]) {
                product[field] = productData[field];
                isUpdated = true;
            }
        });

        // Cập nhật update_at nếu có thay đổi
        if (isUpdated) {
            product.update_at = Date.now();

            // Lưu sản phẩm đã cập nhật vào cơ sở dữ liệu
            await product.save();
            console.log("Cập nhật sản phẩm thành công!");
        } else {
            console.log("Không có dữ liệu cần cập nhật!");
        }

        return product;
    }catch(error){
        console.error(`Lỗi khi thêm sản phẩm:`, error);
        return null;
    }
};

// Xóa sản phẩm
exports.deleteProduct = async (id) => {
    const product = await Product.findByPk(id);
    if (product) {
        await product.destroy();
        return product;
    }
    return null;
};