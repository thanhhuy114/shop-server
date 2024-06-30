const axios = require('axios');
const xml2js = require('xml2js');
const optionDetailService = require('./crawl_option_detail_service');
const {ERROR_CODES} = require('../untils/constans/constans');

// Lấy dữ liệu 1 đối tượng
exports.singleCrawl = async (crawlConfig, crawlDetails, crawlOptionDetails) => {
    // Mảng lưu trữ lỗi
    const errors = [];

    // Mảng lưu kết quả trả về
    const itemDetails = [];

    try {
        // Lấy rss
        const response = await axios.get(crawlConfig.url);
        const   apiResults = response.data;

        // Phân tích cú pháp XML sang đối tượng JavaScript
        const parser = new xml2js.Parser({ explicitArray: false });
        const parsedData = await parser.parseStringPromise(apiResults);

        // Lấy danh sách item
            // Tách các thuộc tính lồng nhau
            const attributes = crawlConfig.item_selector.split('.');

            // Truy cập vào nơi chứa item
            let itemDatas = parsedData;
            for (const attr of attributes) {
                itemDatas = itemDatas[attr];
            }

            if (!itemDatas) {
                value = '';
                if (!checkErrorExists(errors, item_selector)) {
                    errors.push({ error_at: item_selector, errorCode: ERROR_CODES.item_selector, error_message: 'Element attribute not found!' });
                }
            }

        // Duyệt qua từng chi tiết cần crawl
        for (const crawlDetail of crawlDetails) {
            const { id, name, selector, is_detail_url, is_contain_keywords, is_primary_key } = crawlDetail;

            // Lấy giá trị của thuộc tính cần lấy
                // Tách các thuộc tính lồng nhau bằng cách sử dụng dấu chấm
                const attributes = selector.split('.');

                // Lấy giá trị của thuộc tính cần lấy
                let value = itemDatas;
                for (const attr of attributes) {
                    value = value[attr];
                }

                if (!value) {
                    value = '';
                    if (!checkErrorExists(errors, name)) {
                        errors.push({ error_at: name, errorCode: ERROR_CODES.ELEMENT_VALUE_NOT_FOUND, error_message: 'Element attribute not found!' });
                    }
                }

            // Thực hiện các option
            if (crawlOptionDetails) value = await optionDetailService.handleOptions(crawlOptionDetails, id, value);

            // Thêm vào kết quả
            itemDetails.push({ id, name, value, is_detail_url, is_contain_keywords, is_primary_key });
        }

        return {items: itemDetails, errors};
    } catch (error) {
        errors.push({ error_at: '?', error_code: ERROR_CODES.UNKNOWN_ERROR, error_message: error.message});

        return {items: itemDetails, errors};
    }
};

// Lấy dữ liệu tất cả đối tượng
exports.multiCrawl = async (crawlConfig, crawlDetails, crawlOptionDetails) => {
    // Khai báo mảng kết quả
    const results = [];

    // Mảng lưu trữ lỗi
    const errors = [];

    try {
        // Lấy rss
        const response = await axios.get(crawlConfig.url);
        const   apiResults = response.data;

        // Phân tích cú pháp XML sang đối tượng JavaScript
        const parser = new xml2js.Parser({ explicitArray: false });
        const parsedData = await parser.parseStringPromise(apiResults);

        // Lấy danh sách item
            // Tách các thuộc tính lồng nhau
            const attributes = crawlConfig.item_selector.split('.');

            // Truy cập vào nơi chứa item
            let itemDatas = parsedData;
            for (const attr of attributes) {
                itemDatas = itemDatas[attr];
            }

            if (!itemDatas) {
                itemDatas = [];
                if (!checkErrorExists(errors, item_selector)) {
                    errors.push({ error_at: item_selector, errorCode: ERROR_CODES.item_selector, error_message: 'Element attribute not found!' });
                }
            }

        // Duyệt qua từ item
        for (const itemData of itemDatas) {
            const itemDetails = [];

            // Duyệt qua các selector
            for (const crawlDetail of crawlDetails) {
                const { id, name, selector, is_detail_url, is_contain_keywords, is_primary_key } = crawlDetail;

                // Lấy giá trị của thuộc tính cần lấy
                    // Tách các thuộc tính lồng nhau bằng cách sử dụng dấu chấm
                    const attributes = selector.split('.');

                    // Lấy giá trị của thuộc tính cần lấy
                    let value = itemData;
                    for (const attr of attributes) {
                        value = itemData[attr];
                    }

                    if (!value) {
                        value = '';
                        if (!checkErrorExists(errors, name)) {
                            errors.push({ error_at: name, errorCode: ERROR_CODES.ELEMENT_VALUE_NOT_FOUND, error_message: 'Element attribute not found!' });
                        }
                    }

                // Thực hiện các option
                if (crawlOptionDetails) value = await optionDetailService.handleOptions(crawlOptionDetails, id, value);

                // Thêm vào kết quả
                itemDetails.push({ id, name, value, is_detail_url, is_contain_keywords, is_primary_key });
            }

            results.push(itemDetails);
        }
        
        return {items: results, errors};
    } catch (error) {
        errors.push({ error_at: '?', error_code: ERROR_CODES.UNKNOWN_ERROR, error_message: error.message});

        return {items: results, errors};
    }
};

// Hàm kiểm tra xem một lỗi đã tồn tại trong mảng errors chưa
function checkErrorExists(errors, name) {
    return errors.some(error => error.error_at === name);
}
