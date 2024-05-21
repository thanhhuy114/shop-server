const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const Product = require('../models/product_model');
const productService = require('../services/product_service');

// Hàm khởi tạo trình duyệt
const initPage = async () => {
    try{
        // Khởi tạo trình duyệt
        const browser = await puppeteer.launch({
            headless:false
        });

        // Lấy page hiện tại
        const page = (await browser.pages())[0];

        return { browser, page };
    }catch(error){
        console.log("Đã xảy ra lỗi khi khởi tạo browser:", error);
        throw(error);
    }
};

// Lấy danh sách tất cả sản phẩm điện thoại
exports.getAllProduct = async () => {
    try {
        // Khởi tạo trình duyệt
        const { browser, page } = await initPage();

        // url trang danh sách điện thoại
        const allProductUlr = 'https://cellphones.com.vn/mobile.html';

        // Lấy danh sách tất cả sản phẩm
        const products = await getProducts(page, allProductUlr);

        // Đóng trình duyệt
        browser.close();

        return products;
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy tất cả điện thoại trên CellphoneS:', error);
        throw error;
    }
};

// Tìm kiếm danh sách sản phẩm phù hợp với từ khóa
exports.searchProductsWithKey = async (keySearch) => {
    try {
        // Khởi tạo trình duyệt
        const { browser, page } = await initPage();

        // Nhập và tìm kiếm
        const searchResultUrl = await getSearchResultPage(page, keySearch);

        // Lấy danh sách sản phẩm trong trang kết quả tìm kiếm
        const products = await getProducts(page, searchResultUrl);

        // Đóng trình duyệt
        browser.close();

        return products;
    } catch (error) {
        console.error('Đã xảy ra lỗi khi tìm kiếm bằng từ khóa trên CellphoneS:', error);
        throw error;
    }
};

// Lấy chi tiết sản phẩm bằng url trang chi tiết
exports.getProductDetail = async (url) => {
    try {
        // Khởi tạo trình duyệt
        const { browser, page } = await initPage();

        // Lấy chi tiết sản phẩm
        const product = await getProductDetail(page, url);

        // Đóng trình duyệt
        browser.close();

        return product;
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy chi tiết sản phẩm CellphoneS:', error);
        throw error;
    }
};

// Hàm đồng bộ sản phẩm
exports.syncProduct = async (product) => {
    try {
        // Tính toán giá trị thời gian 1 ngày trước
        const day  = 1;
        const timeNeedUpdate = Date.now() - (day * 24 * 60 * 60 * 1000);

        // Tìm trong bảng products sản phẩm có bằng url
        const existingProduct = await CheckExistingProduct(product.product_url)

        // Nếu sản phẩm đã tồn tại, thực hiện đồng bộ hóa
        if (existingProduct){
            // Nếu sản phẩm đã quá 1 ngày chưa cập nhật => cập nhật lại
            if(new Date(existingProduct.update_at).getTime() < timeNeedUpdate) {
                const updatedProduct = await productService.updateProduct(product);
                return updatedProduct;
            }else{
                console.log("sản phẩm đã được cập trong vòng 24h trước!");
                return existingProduct;
            }
        } else {
            // Nếu sản phẩm chưa tồn tại, thêm mới
            const newProduct = await addProduct(product);
            return newProduct;
        }
    } catch (error) {
        console.error('Lỗi khi đồng bộ sản phẩm CellphoneS:', error);
        console.log(product);
        throw error;
    }
};

// Hàm kiểm tra sản phẩm có tồn tại
const CheckExistingProduct = async (product_url) => {
    try {
        // Tìm trong bảng products sản phẩm có bằng url
        const existingProduct = await Product.findOne({ 
            where: { 
                product_url: product_url
            } 
        });

        return existingProduct;
    } catch (error) {
        console.error('Lỗi khi kiểm tra sản phẩm có tồn tại:', error);
        throw error;
    }
};

// Hàm thêm sản phẩm
const addProduct = async (product) => {
    try{
        const newProduct = await Product.create({
            image_url: product.image_url,
            name: product.name,
            price: product.price,
            promotion: product.promotion,
            rate_starts: product.rate_starts,
            rate_count: product.rate_count,
            sold_count: product.sold_count,
            website_id: 2, // id CellPhoneS trong bảng websites
            product_url: product.product_url,
            update_at: Date.now()
        });

        console.log("thêm mới sản phẩm thành công!");
        return newProduct
    }catch(error){
        console.error(`Lỗi khi thêm sản phẩm CellphoneS:`, error);
        return null;
    }
};

// Hàm tìm kiếm url kết quả tìm kiếm
const getSearchResultPage = async (page, keySearch) => {
    try {
        // Xác định Selector
        const inputSelector = 'input.cps-input';
        const searchButtonSelector = '.input-group-btn button[type="submit"]';

        // Truy cập trang chủ CellphoneS: 'https://cellphones.com.vn'
        await page.goto('https://cellphones.com.vn', { waitUntil: 'networkidle2' });

        // Nhập từ khóa cần tìm vào ô tìm kiếm
        await page.type(inputSelector, keySearch);

        // Nhấn nút tìm kiếm
        await page.click(searchButtonSelector);

        // Chờ cho chuyển trang xong
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        
        // Lấy url của trang kết quả
        const searchResultUrl = page.url();

        return searchResultUrl;
    } catch (error) {
        console.error('Lỗi khi lấy url kết quả tìm kiếm của CellphoneS:', error);
        throw error;
    }
};

// Hàm lấy danh sách url của tất cả sản phẩm có trong trang danh sách
const getProducts = async (page, url) => {
    // khai báo selector chứa thông tin của mỗi sản phẩm trong trang danh sách
    const productSelector = '.product-info-container.product-item';

    // Các Selector chứa thông tin sản phẩm
    const imgUrlSelector = 'img';
    const nameSelector = 'h3';
    const priceSelector = '.product__price--show';
    const promotionSelector = '.product__price--percent-detail';
    const rateStartSelector = '.icon-star.is-active';
    const productUrlSelector = 'a.product__link';

    // Danh sách sản phẩm
    let products = [];

    try {
        // Hiện tất cả sản phẩm trong trang
        await ShowAllProduct(page, url);

        // Lấy nội dung HTML của danh sách sản phẩm lưu vào mảng
        const productsHtml = await page.$$eval(productSelector, elements => {
            return elements.map(element => {
                return element.outerHTML;
            });
        });
        
        // truy xuất mảng, lấy thông tin từng sản phẩm
        for(let i = 0; i< productsHtml.length; i++){
            // Chuyển đổi chuỗi HTML thành một đối tượng DOM ảo
            const $ = cheerio.load(productsHtml[i]);

            // Lấy url ảnh
            const image_url = $(imgUrlSelector).attr("src");
            
            // Lấy tên sản phẩm
            const name = $(nameSelector).text();

            // Lấy giá bán
                // lấy text giá sản phẩm
                const priceText = $(priceSelector).text();

                // Loại bỏ các ký tự không phải là số và chuyển thành số nguyên
                const price = parseInt(priceText.replace(/[^0-9]/g, ''), 10);

                // kết thúc khi lấy đến sản phẩm không có giá (Hiện chưa có hàng tại CellPhoneS)
                if(!price) break;

            // Lấy khuyến mãi
                // Lấy text % giảm giá
                const promotionText = $(promotionSelector).text();
                
                // Loại bỏ các ký tự không phải là số và chuyển thành số nguyên
                const promotion = parseInt(promotionText.replace(/[^0-9]/g, ''), 10);

            // Lấy số sao đánh giá
            const rate_starts = $(rateStartSelector).length || null;

            // Lấy link trang chi tiết
            const product_url = 'https://cellphones.com.vn' + $(productUrlSelector).attr('href');
            
            // Lưu lại sản phẩm vào mảng kết quả
            products.push({ image_url, name, price, promotion, rate_starts, rate_count: null, sold_count: null, product_url });
        }

        return products;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm của CellphoneS:', error);
        throw error;
    }
};

// Hiện tất cả sản phẩm trong trang (bằng cách nhấn nút "Xem thêm" cho đến khi nút không hiển thị nữa)
const ShowAllProduct = async (page, url) => {
    // Xác định Selector nút xem thêm
    const showMoreSelector = '.cps-block-content_btn-showmore a.button.btn-show-more.button__show-more-product';
    const cancelSelector = '.cancel-button-top';

    // Thời gian chờ nút "xem thêm" hiện ra là 5 giây
    const timeout = 5000;
    
    // Mở lại trang cần lấy danh sách sản phẩm
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Ấn 'xem thêm' cho đến khi không còn
    while (true) {

        // Kiểm tra xem có thông báo đăng ký nhận khuyến mãi xuất hiện không
        const isNotificationVisible = await page.evaluate((cancelSelector) => {
            const btnCancel = document.querySelector(cancelSelector);
            return btnCancel != null;
        }, cancelSelector);

        // Nếu có thông báo xuất hiện, tắt thông báo
        if (isNotificationVisible) {
            await page.click(cancelSelector);
        } else {
            try {
                // Click nút "Xem thêm"
                await page.click(showMoreSelector);

                // Chờ cho đến khi selector hiện ra
                await page.waitForSelector(showMoreSelector, { visible: true , timeout});

                // Chờ 1 giây
                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (error) {
                // Kết thúc khi không tìm thấy nút "Xem thêm"
                break;
            }
        }
    }
};

// Hàm lấy chi tiết sản phẩm 
const getProductDetail = async (page, productUrl) => {
    // Các Selector chứa thông tin sản phẩm
    const nameSelector = 'h1';
    const imageUrlSelector = 'div.swiper-slide.button__view-gallery.swiper-slide-visible img';
    const priceSelector = 'div.tpt-box.active .tpt---sale-price';
    const originalPriceSelector = 'p.tpt---price';
    
    try {
        await page.goto(productUrl, { waitUntil: "networkidle2"});

        // Lấy tên sản phẩm
        const name = await page.$eval(nameSelector, e => e.textContent);

        // Lấy danh sách url ảnh của sản phẩm
        const imageUrlList = await page.$$eval(imageUrlSelector, imgs => {
            return imgs.map(img => img.getAttribute('src'));
        });

        // Lấy giá bán
        const priceText = await page.$eval(priceSelector, e => e.textContent);
        const price = parseInt((priceText.replace(/[^0-9]/g, '')), 10);

        // Lấy giá gốc
        const originalPriceText = await page.$eval(originalPriceSelector, el => el.textContent);
        const originalPrice = parseInt(originalPriceText.replace(/[^0-9]/g, ''), 10);

        // Tính % khuyến mãi
        const promotion = Math.round(((originalPrice - price) / originalPrice) * 100);

        // Đồng bộ sản phẩm
        const newProduct = { image_url: imageUrlList[0], name, price, promotion, rate_starts : null, rate_count : null, sold_count : null, product_url: productUrl };

        return newProduct;
    } catch (error) {
        console.error(`Lỗi khi lấy chi tiết sản phẩm của CellphoneS có url ${productUrl}`, error);
        return null;
    }
};
