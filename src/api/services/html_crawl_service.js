const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const typeService = require('./type_service');
const optionDetailService = require('./crawl_option_detail_service');
const actionDetailService = require('./crawl_action_detail_service');

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
exports.singleCrawl = async (crawlConfig, crawlActionDetails, crawlDetails, crawlOptionDetails) => {
    try {
        // Khởi tạo trình duyệt và chuyển đến trang chứa dữ liệu
        const { browser, page } = await initPage();
        await page.goto(crawlConfig.url, { waitUntil: "networkidle2"});

        // Thực hiện các hành động trong quá trình lấy dữ liệu
        if (crawlActionDetails) await actionDetailService.handleActions(page, crawlActionDetails);

        // Mảng lưu kết quả trả về
        const data = [];

        // Duyệt qua từng chi tiết cần crawl
        for (const crawlDetail of crawlDetails) {
            const { id, name, selector, attribute, data_type_id, is_contain_keywords, is_primary_key } = crawlDetail;
            const type = (await typeService.getCrawlDataType(data_type_id)).type;
            
            let value;
            if (type === 'attribute') {
                value = await page.$eval(selector, (el, attr) => el.getAttribute(attr), attribute);
            } else if (type === 'content') {
                value = await page.$eval(selector, el => el.textContent.trim());
            } else if (type === 'count') {
                value = await page.$$eval(selector, elements => elements.length);
            }

            // Thực hiện các option
            if (crawlOptionDetails) value = await optionDetailService.handleOptions(crawlOptionDetails, id, value);

            // Thêm vào mảng kết quả
            data.push({ id, name, value, is_contain_keywords, is_primary_key });
        }

        browser.close();

        return [data];
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu của 1 item:', error);
        return [];
    }
};

// Lấy dữ liệu tất cả đối tượng
exports.multiCrawl = async (crawlConfig, crawlActionDetails, crawlDetails, crawlOptionDetails) => {
    // Khai báo mảng kết quả
    const results = [];

    try {
        // Khởi tạo trình duyệt
        const { browser, page } = await initPage();

        // Chuyển đến trang 
        await page.goto(crawlConfig.url, { waitUntil: 'networkidle2' });
        
        // Thực hiện các hành động trong lúc thu thập 
        if (crawlActionDetails) await actionDetailService.handleActions(page, crawlActionDetails);
        
        // Lấy nội dung HTML của danh sách sản phẩm lưu vào mảng
        const datasHtml = await page.$$eval(crawlConfig.item_selector, elements => {
            return elements.map(element => element.outerHTML);
        });

        // Truy xuất mảng, lấy thông tin từng item
        for (let dataHtml of datasHtml) {
            // Chuyển đổi chuỗi HTML thành một đối tượng DOM ảo
            const $ = cheerio.load(dataHtml);

            // khai báo mảng chứa 1 item
            let data = [];

            // Duyệt qua các selector
            for (const crawlDetail of crawlDetails) {
                const { id, name, selector, attribute, data_type_id, is_contain_keywords, is_primary_key } = crawlDetail;
                const type = (await typeService.getCrawlDataType(data_type_id)).type;

                let value;
                if (type === 'attribute') {
                    value = $(selector).attr(attribute);
                } else if (type === 'count') {
                    value = $(selector).length;
                } else if (type === 'content') {
                    value = $(selector).text();
                }

                // Thực hiện các option
                if (crawlOptionDetails) value = await optionDetailService.handleOptions(crawlOptionDetails, id, value);

                // Thêm vào kết quả
                data.push({ id, name, value, is_contain_keywords, is_primary_key });
            }

            results.push(data);
        }

        browser.close();
        
        return results;
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tất cả item:', error);
        throw error;
    }
};
