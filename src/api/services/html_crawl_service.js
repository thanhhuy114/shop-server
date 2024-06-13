const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const typeService = require('./type_service');
const itemService = require('./item_service');

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
        if (crawlActionDetails) await handleActions(page, crawlActionDetails);

        // Mảng lưu kết quả trả về
        const data = [];

        // Lưu lại url
        data.push({ id, name : 'url', value: crawlConfig.url, is_primary_key: true });

        // Duyệt qua từng chi tiết cần crawl
        for (const crawlDetail of crawlDetails) {
            const { id, name, selector, attribute, data_type_id, is_primary_key } = crawlDetail;
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
            if (crawlOptionDetails) value = await handleOptions(crawlOptionDetails, id, value);

            // Thêm vào mảng kết quả
            data.push({ id, name, value, is_primary_key });
        }

        browser.close();

        return data;
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu của 1 item:', error);
        throw error;
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
        if (crawlActionDetails) await handleActions(page, crawlActionDetails)
        
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
                const { id, name, selector, attribute, data_type_id, is_primary_key } = crawlDetail;
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
                if (crawlOptionDetails) value = await handleOptions(crawlOptionDetails, id, value);

                // Thêm vào kết quả
                data.push({ id, name, value, is_primary_key });
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

// Hàm lưu kết quả thu thập được vào database
exports.saveCrawlResult = async (crawlResult, itemTypeId, websiteId, crawlConfigId) => {
    // Khai báo
    const results = [];

    // Duyệt qua kết quả thu được (crawlResult - danh sách item)
    for (const item of crawlResult) {
        const itemDetails = [];

        // Duyệt qua từng phần tử JSON trong mảng con
        for (const itemDetail of item) {
            // Lưu vào mảng để trả về
            itemDetails.push({
                name: itemDetail.name, 
                value: itemDetail.value, 
                is_primary_key: itemDetail.is_primary_key
            });
        }

        const saveResult = await itemService.save(
            {item_type_id: itemTypeId, website_id: websiteId, crawl_config_id: crawlConfigId},
            itemDetails
        )
        
        // Lưu vào mảng để trả về
        results.push(saveResult);
    }

    return results;
}

// Hàm thực hiện xử lý các hành động
const handleActions = async (page, actions) => {
    for (const event of actions) {
        const event_type = (await typeService.getCrawlActionType(event.action_type_id)).type;
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

// Hàm thực hiện xử lý các lựa chọn để chuyển đổi kết quả về dạng mong muốn
const handleOptions = async (options, crawl_detail_id, value) => {
    for (const option of options) {
        if(option.crawl_detail_id === crawl_detail_id) {
            const { option_type_id, option_value, type_option_condition_id, condition_value } = option;

            const type_option = (await typeService.getCrawlOptionType(option_type_id)).type;

            // Thêm vào đầu chuỗi
            if (type_option === 'prepend') {
                // Kiểm tra điều kiện thực hiện
                const checkConditionResult = await checkCondition(type_option_condition_id, condition_value, value);

                // Thực hiện option nếu điều kiện đúng
                if (checkConditionResult) {
                    value = option_value + value;
                }
            }

            // Thêm vào cuối chuỗi
            if (type_option === 'append') {
                // Kiểm tra điều kiện thực hiện
                const checkConditionResult = await checkCondition(type_option_condition_id, condition_value, value);

                // Thực hiện option nếu điều kiện đúng
                if (checkConditionResult) {
                    value = value + option_value;
                }
            }

            // Loại bỏ ký tự không phải số
            if (type_option === 'to number') {
                // Kiểm tra điều kiện thực hiện
                const checkConditionResult = await checkCondition(type_option_condition_id, condition_value, value);

                // Thực hiện option nếu điều kiện đúng
                if (checkConditionResult) {
                    value = value.replace(/\D/g, '');
                }
            }
        }
    }

    return value;
};

// Hàm kiểm tra điều kiện
const checkCondition = async (conditionId, conditionValue, value) => {
    // TRUE nếu không có điều kiện cần kiểm tra
    if(!conditionId) return true;
    if(!conditionValue) return true;

    // Lấy tên loại điều kiện
    const conditionType = (await typeService.getCrawlOptionConditionType(conditionId)).type;

    // Kiểm tra cho từng loại điều kiện
    if (conditionType === 'Start with') {
        return value.toLowerCase().startsWith(conditionValue.toLowerCase());
    } else if (conditionType === 'End with') {
        return value.toLowerCase().endsWith(conditionValue.toLowerCase());
    } else if (conditionType === 'Contain') {
        return value.toLowerCase().includes(conditionValue.toLowerCase());
    } else {
        console.error('Loại điều kiện chưa được định nghĩa:', conditionType);
        return false;
    }
};