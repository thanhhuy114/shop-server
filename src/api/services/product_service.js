const Product = require('../models/product_model');
const { Op } = require('sequelize');

// Lấy danh sách tất cả sản phẩm
exports.getAllProduct = async () => {
    return await Product.findAll();
};

// Tìm kiếm sản phẩm theo tên
exports.getSuggestions = async (key) => {
    // Ở mỗi tên sản phẩm, tách tên thành các từ (cụm từ) lưu vào mảng [{word,count},{word,count}]
        // (ví dụ: iphone 15 promax 1TB 
        // -> các từ (cụm từ): iphone, 15, promax, 1TB, 
        //    iphone 15, iphone 15 promax, iphone 15 promax 1TB,
        //    15 promax, 15 promax 1TB. )
    // Sau đó đếm số lần xuất hiện của các từ (cụm từ)
    // Sắp xếp danh sách theo thứ tự lượt xuất hiện giảm dần
    // Lấy ra 10 từ (cụm từ) phù hợp với key truyền vào (có chứa key, số lượt xuất hiện cao - phổ biến)

    try{
        // Lấy danh sách tất cả sản phẩm từ cơ sở dữ liệu
        const products = await Product.findAll();
        const combinationCounts = new Map();

        // Tách các tên sản phẩm thành các tổ hợp từ và đếm số lần xuất hiện
        products.forEach(product => {
            // tách tên sàn phẩn thành 1 mảng chứa các từ và tạo các tổ hợp
            const words = product.name.split(" ");
            const combinations = generateCombinations(words);

            // đếm số lần xuất hiện
            combinations.forEach(combination => {
                if (combinationCounts.has(combination)) {
                    combinationCounts.set(combination, combinationCounts.get(combination) + 1);
                } else {
                    combinationCounts.set(combination, 1);
                }
            });
        });

        // Xắp xếp theo tần suất (sau khi sắp xếp, nếu lấy 10 kết quả đầu tiên thì sẻ lấy 10 kết quả phổ biến nhất)
        const sortedCombinations = Array.from(combinationCounts.entries())
            .sort((a, b) => b[1] - a[1]); // màng có dạng {0: "128GB", 1: 53} => 0 là từ khóa, 1 là số lần xuất hiện

        // Lọc các tổ hợp phù hợp với key và lấy ra 10 tổ hợp phổ biến nhất
        const suggestions = [];
        let count = 0;

        for (let i = 0; i < sortedCombinations.length; i++) {
            if(sortedCombinations[i][0].toLowerCase().includes(key.toLowerCase())) {
                suggestions.push(sortedCombinations[i][0]);
                count ++;
                //if(count == 10) break;
            }
        };

        return suggestions;
    }catch(error){
        return [];
    }
};

// Hàm tạo ra tất cả các tổ hợp từ
const generateCombinations = (words) => {
    const combinations = [];
    for (let start = 0; start < words.length; start++) {
        let combination = "";
        for (let end = start; end < words.length; end++) {
            combination += (end === start ? "" : " ") + words[end];
            combinations.push(combination);
        }
    }
    return combinations;
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