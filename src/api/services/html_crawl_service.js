const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const database = require('./database_demo');

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
exports.get = async (crawl_config, crawl_event_details, crawl_details, crawl_option_details) => {
    try {
        // Khởi tạo trình duyệt và chuyển đến trang chứa dữ liệu
        const { browser, page } = await initPage();
        await page.goto(crawl_config.url, { waitUntil: "networkidle2"});

        // Thực hiện các sự kiện trong quá trình lấy dữ liệu

        // Mảng lưu kết quả trả về
        const data = [];

        // Duyệt qua từng chi tiết cần crawl
        for (const crawl_detail of crawl_details) {
            const { id, name, selector, attribute, data_type_id } = crawl_detail;
            const type = database.getCrawlDataType(data_type_id);
            
            let value;
            if (type === 'attribute') {
                value = await page.$eval(selector, (el, attr) => el.getAttribute(attr), attribute);
            } else if (type === 'content') {
                value = await page.$eval(selector, el => el.textContent.trim());
            } else if (type === 'count') {
                value = await page.$$eval(selector, elements => elements.length);
            }

            // Thực hiện các option
            //

            // Thêm vào mảng kết quả
            data.push({ id, name, value });
        }

        browser.close();

        return data;
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu của 1 đối tượng:', error);
        throw error;
    }
};

// Lấy dữ liệu tất cả đối tượng
exports.getAll = async (crawl_config, crawl_event_details, crawl_details, crawl_option_details) => {
    // Khai báo mảng kết quả
    const results = [];

    try {
        // Khởi tạo trình duyệt
        const { browser, page } = await initPage();

        // Chuyển đến trang 
        await page.goto(crawl_config.url, { waitUntil: 'networkidle2' });
        
        // Xử lý các sự kiện trong lúc thu thập 
        //
        
        // Lấy nội dung HTML của danh sách sản phẩm lưu vào mảng
        const datasHtml = await page.$$eval(crawl_config.item_selector, elements => {
            return elements.map(element => element.outerHTML);
        });

        // Truy xuất mảng, lấy thông tin từng item
        for (let dataHtml of datasHtml) {
            // Chuyển đổi chuỗi HTML thành một đối tượng DOM ảo
            const $ = cheerio.load(dataHtml);

            // khai báo mảng chứa 1 item
            let data = [];

            // Duyệt qua các selector
            for (const crawl_detail of crawl_details) {
                const { id, name, selector, attribute, data_type_id } = crawl_detail;
                const type = database.getCrawlDataType(data_type_id);

                let value;
                if (type === 'attribute') {
                    value = $(selector).attr(attribute);
                } else if (type === 'count') {
                    value = $(selector).length;
                } else if (type === 'content') {
                    value = $(selector).text();
                }

                // Thực hiện các option
                //

                // Thêm vào kết quả
                data.push({ id, name, value });
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
