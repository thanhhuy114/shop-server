const Product = require('../models/product_model');
const { Op } = require('sequelize');

// Lấy danh sách tất cả sản phẩm
exports.getAllProduct = async () => {
    return await Product.findAll();
};

const cache = {};

exports.getSuggestions = async (key) => {
    try {
        // Kiểm tra và lấy dữ liệu từ cache nếu có
        if (!cache.products) {
            const products = await Product.findAll();
            cache.products = products.map(product => product.name);
            cache.combinationCounts = generateAndCountCombinations(cache.products);
        }

        // Lấy các gợi ý phù hợp với key
        const suggestions = getTopSuggestions(cache.combinationCounts, key);
       // return suggestions.slice(0, 10);
       return suggestions;
    } catch (error) {
        console.error('Lỗi lấy danh sách gợi ý tìm kiếm: ', error);
        return [];
    }
};

// Hàm tạo và đếm các tổ hợp từ
const generateAndCountCombinations = (names) => {
    const combinationCounts = new Map();

    names.forEach(name => {
        const words = name.split(' ').map(word => word.toLowerCase());
        const combinations = new Set();

        for (let start = 0; start < words.length; start++) {
            let combination = '';
            for (let end = start; end < words.length; end++) {
                combination = combination ? `${combination} ${words[end]}` : words[end];
                if (combination.length > 5 && isValidCombination(combination)) {
                    combinations.add(combination);
                }
            }
        }

        combinations.forEach(combination => {
            combinationCounts.set(combination, (combinationCounts.get(combination) || 0) + 1);
        });
    });

    return combinationCounts;
};

// Hàm kiểm tra tính hợp lệ của tổ hợp từ
const isValidCombination = (combination) => {
    const forbiddenStartWords = ['thoại', 'hàng', 'chính', 'hãng', '(', '['];
    if (combination.match(/\(|\)/) || !isNaN(parseInt(combination[0])) || forbiddenStartWords.some(word => combination.startsWith(word))) {
        return false;
    }
    return true;
};

// Hàm lấy ra các gợi ý phù hợp
const getTopSuggestions = (combinationCounts, key) => {
    const sortedCombinations = Array.from(combinationCounts.entries())
        .filter(([combination]) => combination.includes(key.toLowerCase()))
        .sort(([, countA], [, countB]) => countB - countA)
        .map(([combination]) => combination);

    return sortedCombinations;
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