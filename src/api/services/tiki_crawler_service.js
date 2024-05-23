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

        // Tìm đến trang chứa danh sách tất cả sản phẩm
        const allProductUlr = await getAllProductPage(page);

        // Lấy danh sách tất cả sản phẩm
        const products = await getProducts(page, allProductUlr);

        // Đóng trình duyệt
        browser.close();

        return products;
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy tất cả điện thoại trên Tiki:', error);
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
        console.error('Đã xảy ra lỗi khi tìm kiếm bằng từ khóa trên Tiki:', error);
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
        console.error('Đã xảy ra lỗi khi lấy chi tiết sản phẩm Tiki:', error);
        throw error;
    }
};

// Hàm đồng bộ sản phẩm
exports.syncProduct = async (product) => {
    try {
        // Tìm trong bảng products sản phẩm có bằng url
        const existingProduct = await CheckExistingProduct(product.product_url)

        // Nếu sản phẩm đã tồn tại, thực hiện đồng bộ hóa
        if (existingProduct){
            const updatedProduct = await productService.updateProduct(product);
            return updatedProduct;
        } else {
            // Nếu sản phẩm chưa tồn tại, thêm mới
            const newProduct = await addProduct(product);
            return newProduct;
        }
    } catch (error) {
        console.error('Lỗi khi đồng bộ sản phẩm Tiki:', error);
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
            website_id: 1, // id tiki trong bảng website
            product_url: product.product_url,
            update_at: Date.now()
        });

        console.log("thêm mới sản phẩm thành công!");
        return newProduct
    }catch(error){
        console.error(`Lỗi khi thêm sản phẩm Tiki:`, error);
        return null;
    }
};

// Hàm tìm kiếm url chứa tất cả sản phẩm có loại sản phẩm là điện thoại
const getAllProductPage = async (page) => {
    try {
        // Thẻ chứa loại sản phẩm 'Điện thoại - Máy tính bảng'
            // <div class="styles__StyledItemV2-sc-oho8ay-1 bHIPhv"><a title="Điện Thoại - Máy Tính Bảng" href="/dien-thoai-may-tinh-bang/c1789"> ... </a></div>
        
        // Thẻ chứa 'Điện thoại Smartphone'
            // <a href="/dien-thoai-smartphone/c1795">
            //     <div class="styles__TreeItemStyled-sc-1uq9a9i-2 ThXqv">
            //         <div class="styles__TreeName-sc-1uq9a9i-3 hFhoJP">Điện thoại Smartphone</div>
            //     </div>
            // </a>
        
        // Xác định Selector
        const phoneAndTabletSelector = 'div.styles__StyledItemV2-sc-oho8ay-1.bHIPhv a[title="Điện Thoại - Máy Tính Bảng"]';
        const SmartphoneSelector = 'a[href="/dien-thoai-smartphone/c1795"]';

        // Truy cập trang chủ Tiki: 'https://tiki.vn'
        await page.goto('https://tiki.vn', { waitUntil: 'networkidle2' });

        // Click vào danh mục "Điện thoại - Máy tính bảng"
        await page.click(phoneAndTabletSelector);

        // Chờ cho chuyển trang xong
        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        // Click vào danh mục "Điện thoại - Smartphone"
        await page.click(SmartphoneSelector);

        // Chờ cho chuyển trang xong
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        
        // Lấy url của trang kết quả
        const url = page.url();

        return url;
    } catch (error) {
        console.error('Lỗi khi lấy url trang danh sách sản phẩm điện thoại của Tiki:', error);
        throw error;
    }
};

// Hiện tất cả sản phẩm trong trang (bằng cách nhấn nút "Xem thêm" cho đến khi nút không hiển thị nữa)
const ShowAllProduct = async (page, url) => {
    try {
        // Nút "xem thêm" có dạng
        // <div data-view-id="category_infinity_view.more" class="styles__Button-sc-143954l-1 gVFXpZ">Xem thêm</div>

        // Xác định Selector
        const selector = 'div[data-view-id="category_infinity_view.more"]';

        // Thời gian chờ nút "xem thêm" hiện ra là 5 giây
        const timeout = 5000;
        
        // Mở lại trang cần lấy danh sách sản phẩm
        await page.goto(url, { waitUntil: 'networkidle2' });

        while (true) {
            try {
                // Click nút "Xem thêm"
                await page.click(selector);

                // Chờ cho đến khi selector hiện ra
                await page.waitForSelector(selector, { visible: true , timeout});
            } catch (error) {
                // Kết thúc khi không tìm thấy nút "Xem thêm"
                break;
            }
        }
    } catch (error) {
        console.error('Lỗi khi cho hiện tất cả sản phẩm của Tiki:', error);
        throw error;
    }
};

// Hàm tìm kiếm url kết quả tìm kiếm
const getSearchResultPage = async (page, keySearch) => {
    try {
        // Thẻ chứa thanh tìm kiếm
            // <div class="styles__FormRevamp-sc-6cbqeh-1 cTCXTh">
            //     <img class="icon-search" src="https://salt.tikicdn.com/ts/upload/33/d0/37/6fef2e788f00a16dc7d5a1dfc5d0e97a.png" alt="icon-search">
            //     <input type="text" data-view-id="main_search_form_input" value="" placeholder="Giao nhanh 2H &amp; đúng khung giờ" class="styles__InputRevamp-sc-6cbqeh-2 IXqBC">
            //     <button data-view-id="main_search_form_button" class="styles__ButtonRevamp-sc-6cbqeh-3 LdVUr">Tìm kiếm</button>
            // </div>

            // => thông tin cần xác định
            // ô nhập từ khóa = <input type="text" data-view-id="main_search_form_input" value="" placeholder="Giao nhanh 2H &amp; đúng khung giờ" class="styles__InputRevamp-sc-6cbqeh-2 IXqBC">
            // nút tìm kiếm = <button data-view-id="main_search_form_button" class="styles__ButtonRevamp-sc-6cbqeh-3 LdVUr">Tìm kiếm</button>
        
        // Xác định Selector
        const inputSelector = 'input[data-view-id="main_search_form_input"]';
        const buttonSelector = 'button[data-view-id="main_search_form_button"]';

        // Truy cập trang chủ Tiki: 'https://tiki.vn'
        await page.goto('https://tiki.vn', { waitUntil: 'networkidle2' });

        // Nhập từ khóa cần tìm vào ô tìm kiếm
        await page.type(inputSelector, keySearch);

        // Click nút tìm kiếm
        await page.click(buttonSelector);

        // Chờ cho chuyển trang xong
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        
        // Lấy url của trang kết quả
        const searchResultUrl = page.url();

        return searchResultUrl;
    } catch (error) {
        console.error('Lỗi khi lấy url kết quả tìm kiếm của Tiki:', error);
        throw error;
    }
};

// Hàm lấy danh sách url của tất cả sản phẩm có trong trang danh sách
const getProducts = async (page, url) => {
    // khai báo selector chứa thông tin của mỗi sản phẩm trong trang danh sách
    const productSelector = '.styles__ProductItemContainerStyled-sc-bszvl7-0';

    // Các Selector chứa thông tin sản phẩm
        // url ảnh
        const strStartImgUrl = 'srcset="';
        const strEndImgUrl = '"';

        // tên sản phẩm
        const nameSelector = '.style__NameStyled-sc-139nb47-8';

        // giá
        const priceSelector = '.price-discount__price';

        // khuyến mãi
        const promotionSelector = '.price-discount__percent';

        // số sao đánh giá
        const rateStartSelector = 'svg path[fill="#FFC400"]';
        
        // số lượng đã bán
        const soldCountSelector = '.quantity';

        // url trang chi tiết
        const productUrlSelector = 'a.style__ProductLink-sc-139nb47-2';

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
                // Tìm vị trí của "srcset=" trong chuỗi
                const startIndex = productsHtml[i].indexOf(strStartImgUrl) + strStartImgUrl.length;
                const endIndex = productsHtml[i].indexOf(strEndImgUrl, startIndex + strStartImgUrl.length);
                const srcsetSubstring = productsHtml[i].substring(startIndex, endIndex);

                // Chia chuỗi thành mảng các đường dẫn
                const srcsetArray = srcsetSubstring.split(',');

                // Lấy ra URL hợp lệ từ phần tử đầu tiên trong mảng
                const image_url = srcsetArray[0].trim().split(' ')[0];
            
            // Lấy tên sản phẩm
            const name = $(nameSelector).text();

            // Lấy giá bán
                // lấy text giá sản phẩm
                const priceText = $(priceSelector).text();

                // Loại bỏ các ký tự không phải là số và chuyển thành số nguyên
                const price = parseInt(priceText.replace(/[^0-9]/g, ''), 10);

            // Lấy khuyến mãi
                // Lấy text % giảm giá
                const promotionText = $(promotionSelector).text();
                
                // Loại bỏ các ký tự không phải là số và chuyển thành số nguyên
                const promotion = parseInt(promotionText.replace(/[^0-9]/g, ''), 10);

            // Lấy số sao đánh giá
            const rate_starts = $(rateStartSelector).length || null;

            // Lấy số lượng đã bán
            const sold_count = $(soldCountSelector).text() || null;

            // Lấy link trang chi tiết (lưu ý: href trong thẻ <a> có 2 dạng)
                // Dạng 1: href="//tka.tiki.vn/pixel/pixel?data=Xp2gecKbvhfMOCdQJO0W9Mu9ujiT0SEx..." => thêm 'https:'
                // Dạng 2: href="/op-lung-da-nh-cho-iphone-5-5s-5se-mau-hoa-nho-li-ti-p55691768.html?spid=55691769" => thêm 'https://tiki.vn'
                let product_url = $(productUrlSelector).attr('href');
                product_url = product_url.startsWith('//tka.tiki.vn') ? 'https:' + product_url : 'https://tiki.vn' + product_url;
            
            products.push({ image_url, name, price, promotion, rate_starts, rate_count: null, sold_count, product_url });
        }

        return products;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm của Tiki:', error);
        throw error;
    }
};

// Hàm lấy chi tiết sản phẩm 
const getProductDetail = async (page, productUrl) => {
    // Các Selector chứa thông tin sản phẩm
    const nameSelector = '.Title__TitledStyled-sc-c64ni5-0.iXccQY';
    const imageUrlSelector = '.slider img';
    const priceSelector = '.product-price__current-price';
    const promotionSelector = '.product-price__discount-rate';
    const rateStartsSelector = '.styles__StyledReview-sc-1onuk2l-1 > div:first-child';
    const rateCountSelector = '.number';
    const soldCountSelector = '[data-view-id="pdp_quantity_sold"]';
    
    try {
        await page.goto(productUrl, { waitUntil: "networkidle2"});

        // Lấy tên sản phẩm
        const name = await page.$eval(nameSelector, e => e.textContent);

        // Lấy danh sách url ảnh của sản phẩm
        const imageUrls = await page.$$eval(imageUrlSelector, imgs => {
            return imgs.map(img => img.getAttribute('src'));
        });

        // Lấy giá bán
        const priceText = await page.$eval(priceSelector, e => e.textContent);
        const price = parseInt((priceText.replace(/[^0-9]/g, '')), 10);

        // promotion
        const promotionText = await page.$eval(promotionSelector, el => el.textContent);
        const promotion = parseInt(promotionText.replace(/[^0-9]/g, ''), 10);

        // rate_starts
        const rateStartsText = await page.$eval(rateStartsSelector, el => el.textContent);
        const rate_starts = parseFloat(rateStartsText);

        // rate_count
        const rateCountText = await page.$eval(rateCountSelector, el => el.textContent);
        const rate_count = parseInt(rateCountText.match(/\d+/)[0], 10);

        // sold_count
        const sold_count = await page.$eval(soldCountSelector, el => el.textContent);

        // Lấy ảnh sản phẩm đầu tiên
        const image_url = imageUrls?.[0]

        // Đồng bộ sản phẩm
        const newProduct = { image_url, name, price, promotion, rate_starts, rate_count, sold_count, product_url: productUrl };

        return newProduct;
    } catch (error) {
        console.error(`Lỗi khi lấy chi tiết sản phẩm của Tiki có url ${productUrl}`, error);
        return null;
    }
};
