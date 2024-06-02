const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const type_service = require('./type_service');

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
exports.get = async (body) => {
    try {
        // Tách dữ liệu thành từ phần
        const { crawl_config, crawl_action_details, crawl_details, crawl_option_details } = body;

        // Khởi tạo trình duyệt và chuyển đến trang chứa dữ liệu
        const { browser, page } = await initPage();
        await page.goto(crawl_config.url, { waitUntil: "networkidle2"});

        // Thực hiện các hành động trong quá trình lấy dữ liệu
        if (crawl_action_details) await handleActions(page, crawl_action_details)

        // Mảng lưu kết quả trả về
        const data = [];

        // Duyệt qua từng chi tiết cần crawl
        for (const crawl_detail of crawl_details) {
            const { id, name, selector, attribute, data_type_id } = crawl_detail;
            const type = type_service.getCrawlDataType(data_type_id);
            
            let value;
            if (type === 'attribute') {
                value = await page.$eval(selector, (el, attr) => el.getAttribute(attr), attribute);
            } else if (type === 'content') {
                value = await page.$eval(selector, el => el.textContent.trim());
            } else if (type === 'count') {
                value = await page.$$eval(selector, elements => elements.length);
            }

            // Thực hiện các option
            if (crawl_option_details) value = await handleOptions(crawl_option_details, id, value);

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
exports.getAll = async (body) => {
    // Khai báo mảng kết quả
    const results = [];

    try {
        // Tách dữ liệu thành từ phần
        const { crawl_config, crawl_action_details, crawl_details, crawl_option_details } = body;

        // Khởi tạo trình duyệt
        const { browser, page } = await initPage();

        // Chuyển đến trang 
        await page.goto(crawl_config.url, { waitUntil: 'networkidle2' });
        
        // Thực hiện các hành động trong lúc thu thập 
        if (crawl_action_details) await handleActions(page, crawl_action_details)
        
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
                const type = type_service.getCrawlDataType(data_type_id);

                let value;
                if (type === 'attribute') {
                    value = $(selector).attr(attribute);
                } else if (type === 'count') {
                    value = $(selector).length;
                } else if (type === 'content') {
                    value = $(selector).text();
                }

                // Thực hiện các option
                if (crawl_option_details) value = await handleOptions(crawl_option_details, id, value);

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

// Hàm thực hiện xử lý các hành động
const handleActions = async (page, actions) => {
    for (const event of actions) {
        const event_type = type_service.getCrawlActionType(event.action_type_id);
        const { selector } = event;

        if (event_type === 'Click when appear') {
            clickWhenAppear(page, selector);
        } else if (event_type === 'Show all') {
            await showAll(page, selector);
        }
    }
};

// Xử lý sự kiện Show all
const showAll = async (page, selector) => {	
    while (true) {	
        try {	
            await page.click(selector);	
            await page.waitForSelector(selector, { visible: true, timeout: 5000 });	

            // Chờ 0.5 giây	
            await new Promise(resolve => setTimeout(resolve, 500));	
        } catch (error) {	
            break;	
        }
    }
};

// Xử lý sự kiện clickWhenAppear
const clickWhenAppear = async (page, selector) => {
    while (!page.isClosed()) {
        try {
            // Kiểm tra phần tử có tồn tại
            const isElementVisible = await page.evaluate((selector) => {
                const element = document.querySelector(selector);
                return element != null;
            }, selector);

            // Click phần tử nếu có
            if (isElementVisible) {
                await page.click(selector);
                await new Promise(resolve => setTimeout(resolve, 500));
            } else {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        } catch (error) {	
            break;
        }
    }
};

// Hàm thực hiện xử lý các hành động
const handleOptions = async (options, crawl_detail_id, value) => {
    for (const option of options) {
        if(option.crawl_detail_id === crawl_detail_id) {
            const { option_type_id, option_value, type_option_condition_id, condition_value } = option;

            const type_option = type_service.getCrawlOptionType(option_type_id);

            // Thêm vào đầu chuỗi
            if (type_option === 'prepend') {
                if (type_option_condition_id) {
                    const type_option_condition = type_service.getCrawlOptionConditionType(type_option_condition_id);

                    // Kiểm tra điều kiện thực hiện
                        // 
                        if (true) {
                            value = option_value + value;
                        }
                    
                } else {
                    value = option_value + value;
                }
            }

            // Thêm vào cuối chuỗi
            if (type_option === 'append') {
                if (type_option_condition_id) {
                    const type_option_condition = type_service.getCrawlOptionConditionType(type_option_condition_id);

                    // Kiểm tra điều kiện thực hiện
                        // 
                        if (true) {
                            value = value + option_value;
                        }
                    
                } else {
                    value = value + option_value;
                }
            }

            // Loại bỏ ký tự không phải số
            if (type_option === 'to number') {
                if (type_option_condition_id) {
                    const type_option_condition = type_service.getCrawlOptionConditionType(type_option_condition_id);

                    // Kiểm tra điều kiện thực hiện
                        // 
                        if (true) {
                            value = value.replace(/\D/g, '');
                        }
                    
                } else {
                    value = value.replace(/\D/g, '');
                }
            }
        }
    }

    return value;
};