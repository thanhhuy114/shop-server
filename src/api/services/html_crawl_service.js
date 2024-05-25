const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

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

// Lấy dữ liệu 1 đối tượng
exports.get = async (url, selectors) => {
    try {
        // Khởi tạo trình duyệt
        const { browser, page } = await initPage();

        // Chuyển đến trang
        await page.goto(url, { waitUntil: "networkidle2"});

        // Mảng kết quả để chứa id và value
        const results = [];

        // Duyệt qua các selector
        for (const selectorObj of selectors) {
            const { id, selector, attribute, type } = selectorObj;
            
            let value;
            if (attribute) {
                // Lấy giá trị thuộc tính của element
                value = await page.$eval(selector, (el, attr) => el.getAttribute(attr), attribute);
            } else if (type === 'count') {
                // Đếm số lượng phần tử
                value = await page.$$eval(selector, elements => elements.length);
            } else {
                // Lấy nội dung text của element
                value = await page.$eval(selector, el => el.textContent.trim());
            }

            // Thêm vào mảng kết quả
            results.push({ id, value });
        }

        browser.close();

        return results;
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu của 1 đối tượng:', error);
        throw error;
    }
};

// Lấy dữ liệu tất cả đối tượng
exports.getAll = async (url, selectors, itemSelector, viewMoreSelector, closeNotiFicationSelector) => {
    // Khai báo mảng kết quả
    const results = [];

    try {
        // Khởi tạo trình duyệt
        const { browser, page } = await initPage();

        // Chuyển đến trang 
        await page.goto(url, { waitUntil: 'networkidle2' });
        
        // Hiện tất cả sản phẩm trong trang
        await showAll(page, viewMoreSelector, closeNotiFicationSelector);
        
        // Lấy nội dung HTML của danh sách sản phẩm lưu vào mảng
        const datasHtml = await page.$$eval(itemSelector, elements => {
            return elements.map(element => element.outerHTML);
        });

        // Truy xuất mảng, lấy thông tin từng sản phẩm
        for (let dataHtml of datasHtml) {
            // Chuyển đổi chuỗi HTML thành một đối tượng DOM ảo
            const $ = cheerio.load(dataHtml);

            // khai báo mảng chứa 1 item
            const data = [];

            // Duyệt qua các selector
            for (const selectorObj of selectors) {
                const { id, selector, type, attribute } = selectorObj;

                let value;
                if (attribute) {
                    if (type === 'count') {
                        // Đếm số lượng phần tử
                        value = $(selector).attr(attribute).length;
                    }
                    // Lấy giá trị thuộc tính của element
                    value = $(selector).attr(attribute) || null;
                } else if (type === 'count') {
                    // Đếm số lượng phần tử
                    value = value = $(selector).length;
                } else {
                    // Lấy nội dung text của element
                    value = $(selector).text().trim() || null;
                }

                data.push({ id, value });
            }

            results.push(data);
        }

        browser.close();
        
        return results;
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tất cả đối tượng:', error);
        throw error;
    }
};

// Tìm kiếm dữ liệu các dối tượng phù hợp
exports.search = async (keySearch) => {
    // try {
    //     // Khởi tạo trình duyệt
    //     const { browser, page } = await initPage();

    //     // Nhập và tìm kiếm
    //     const searchResultUrl = await getSearchResultPage(page, keySearch);

    //     // Lấy danh sách sản phẩm trong trang kết quả tìm kiếm
    //     const products = await getProducts(page, searchResultUrl);

    //     // Đóng trình duyệt
    //     browser.close();

    //     return products;
    // } catch (error) {
    //     console.error('Đã xảy ra lỗi khi tìm kiếm dữ liệu các đối tượng phù hợp:', error);
    //     throw error;
    // }
};

// Hiện tất cả dữ liệu trong trang (bằng cách nhấn nút "Xem thêm" cho đến khi nút không hiển thị nữa)
const showAll = async (page, viewMoreSelector, closeNotiFicationSelector) => {
    try {
        while (true) {
            // Kiểm tra xem có thông báo đăng ký nhận khuyến mãi xuất hiện không
            const isNotificationVisible = await page.evaluate((closeNotiFicationSelector) => {
                const btnClose = document.querySelector(closeNotiFicationSelector);
                return btnClose != null;
            }, closeNotiFicationSelector);

            // Nếu có thông báo xuất hiện, tắt thông báo
            if (isNotificationVisible) {
                await page.click(closeNotiFicationSelector);
            }

            else{
                try {
                    await page.click(viewMoreSelector);
                    await page.waitForSelector(viewMoreSelector, { visible: true, timeout: 5000 });

                    // Chờ 500 mili giây
                    await new Promise(resolve => setTimeout(resolve, 500));
                } catch (error) {
                    break;
                }
            }
        }
    } catch (error) {
        console.error('Lỗi khi cho hiển thị tất cả:', error);
        throw error;
    }
};