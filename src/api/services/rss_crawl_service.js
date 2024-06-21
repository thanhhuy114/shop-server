const axios = require('axios');
const xml2js = require('xml2js');
const optionDetailService = require('./crawl_option_detail_service');

// Lấy dữ liệu 1 đối tượng
exports.singleCrawl = async (crawlConfig, crawlDetails, crawlOptionDetails) => {
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

        // Mảng lưu kết quả trả về
        const itemDetails = [];

        // Duyệt qua từng chi tiết cần crawl
        for (const crawlDetail of crawlDetails) {
            const { id, name, selector, is_contain_keywords, is_primary_key } = crawlDetail;

            // Lấy giá trị của thuộc tính cần lấy
                // Tách các thuộc tính lồng nhau bằng cách sử dụng dấu chấm
                const attributes = selector.split('.');

                // Lấy giá trị của thuộc tính cần lấy
                let value = itemDatas;
                for (const attr of attributes) {
                    value = value[attr];
                }
                    
                if (!value) value = '';

            // Thực hiện các option
            if (crawlOptionDetails) value = await optionDetailService.handleOptions(crawlOptionDetails, id, value);

            // Thêm vào kết quả
            itemDetails.push({ id, name, value, is_contain_keywords, is_primary_key });
        }

        return [itemDetails];
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu của 1 item:', error);
        return [];
    }
};

// Lấy dữ liệu tất cả đối tượng
exports.multiCrawl = async (crawlConfig, crawlDetails, crawlOptionDetails) => {
    // Khai báo mảng kết quả
    const results = [];

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

        // Duyệt qua từ item
        for (const itemData of itemDatas) {
            const itemDetails = [];

            // Duyệt qua các selector
            for (const crawlDetail of crawlDetails) {
                const { id, name, selector, is_contain_keywords, is_primary_key } = crawlDetail;

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
                if (crawlOptionDetails) value = await optionDetailService.handleOptions(crawlOptionDetails, id, value);

                // Thêm vào kết quả
                itemDetails.push({ id, name, value, is_contain_keywords, is_primary_key });
            }

            results.push(itemDetails);
        }
        
        return results;
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tất cả item:', error);
        return [];
    }
};
