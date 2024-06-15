const puppeteer = require('puppeteer');
const xml2js = require('xml2js');
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

        // Lấy nội dung XML từ trang
        const xmlContent = await page.$eval(crawlConfig.item_selector, el => el.textContent.trim());

        // Phân tích cú pháp XML sang đối tượng JavaScript
        const parser = new xml2js.Parser({ explicitArray: false });
        const parsedData = await parser.parseStringPromise(xmlContent);

        // Lấy danh sách item
        const itemData = parsedData.rss.channel;

        // Mảng lưu kết quả trả về
        const itemDetails = [];

        // Duyệt qua từng chi tiết cần crawl
        for (const crawlDetail of crawlDetails) {
            const { id, name, selector, is_primary_key } = crawlDetail;

            // Lấy giá trị của thuộc tính cần lấy
                // Tách các thuộc tính lồng nhau bằng cách sử dụng dấu chấm
                const attributes = selector.split('.');

                // Lấy giá trị của thuộc tính cần lấy
                let value = itemData;
                for (const attr of attributes) {
                    value = value[attr];
                }
                    
                if (!value) value = '';

            // Thực hiện các option
            if (crawlOptionDetails) value = await handleOptions(crawlOptionDetails, id, value);

            // Thêm vào kết quả
            itemDetails.push({ id, name, value, is_primary_key });
        }

        browser.close();

        return [itemDetails];
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

        // Lấy nội dung XML từ trang
        const xmlContent = await page.$eval(crawlConfig.item_selector, el => el.textContent.trim());

        // Phân tích cú pháp XML sang đối tượng JavaScript
        const parser = new xml2js.Parser({ explicitArray: false });
        const parsedData = await parser.parseStringPromise(xmlContent);

        // Lấy danh sách item
        const itemDatas = parsedData.rss.channel.item;

        // Duyệt qua từ item
        for (const itemData of itemDatas) {
            const itemDetails = [];

            // Duyệt qua các selector
            for (const crawlDetail of crawlDetails) {
                const { id, name, selector, is_primary_key } = crawlDetail;

                // Lấy giá trị của thuộc tính cần lấy
                    // Tách các thuộc tính lồng nhau bằng cách sử dụng dấu chấm
                    const attributes = selector.split('.');

                    // Lấy giá trị của thuộc tính cần lấy
                    let value = itemData;
                    for (const attr of attributes) {
                        value = itemData[attr];
                    }

                    if (!value) value = '';

                // Thực hiện các option
                if (crawlOptionDetails) value = await handleOptions(crawlOptionDetails, id, value);

                // Thêm vào kết quả
                itemDetails.push({ id, name, value, is_primary_key });
            }

            results.push(itemDetails);
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