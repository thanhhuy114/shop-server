const axios = require('axios');
const optionDetailService = require('../services/crawl_option_detail_service');
const typeService = require('./type_service');
const {HTTP_METHODS} = require('../untils/constans/constans');

// Lấy dữ liệu 1 đối tượng
exports.singleCrawl = async (crawlConfig, crawlDetails, crawlOptionDetails) => {
    try {
        // Lấy kết quả trả về của API (API = crawlConfig.url)
            // Khai báo kết quả gọi API
            let apiResults;

            // Lấy các thông tin của API từ client
            const url = crawlConfig.url;
            const headers = crawlConfig.headers_api;
            const body = crawlConfig.body_api;

            // Lấy phương thức gọi API
            const httpMethodType = (await typeService.getHttpMethodType(crawlConfig.http_method_type_id)).type;

            // Lấy kết quả trả về của API
            if(httpMethodType === HTTP_METHODS.GET) {
                const response = await axios.get(url, { headers });
                apiResults = response.data;
            } else if(httpMethodType === HTTP_METHODS.POST) {
                const response = await axios.post(crawlConfig.url, body, { headers });
                apiResults = response.data;
            } else if (httpMethodType === HTTP_METHODS.PUT) {
                const response = await axios.put(url, body, { headers });
                apiResults = response.data;
            } else if (httpMethodType === HTTP_METHODS.PATCH) {
                const response = await axios.patch(url, body, { headers });
                apiResults = response.data;
            } else if (httpMethodType === HTTP_METHODS.DELETE) {
                const response = await axios.delete(url, { headers });
                apiResults = response.data;
            }

        // Mảng lưu kết quả trả về
        const data = [];

        // Duyệt qua từng chi tiết cần crawl
        for (const crawlDetail of crawlDetails) {
            const { id, name, attribute, is_contain_keywords, is_primary_key } = crawlDetail;

            // Lấy giá trị của thuộc tính cần lấy
                // Tách các thuộc tính lồng nhau bằng cách sử dụng dấu chấm
                const attributes = attribute.split('.');

                // Lấy giá trị của thuộc tính cần lấy
                let value = apiResults;
                for (const attr of attributes) {
                    if (value) {
                        value = value[attr];
                    }
                }

                if (!value) value = '';

            // Thực hiện các option
            if (crawlOptionDetails) value = await optionDetailService.handleOptions(crawlOptionDetails, id, value);

            // Thêm vào mảng kết quả
            data.push({ id, name, value, is_contain_keywords, is_primary_key });
        }

        return [data];
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu của 1 item bằng API:', error);
        return [];
    }
};

// Lấy dữ liệu tất cả đối tượng
exports.multiCrawl = async (crawlConfig, crawlDetails, crawlOptionDetails) => {
    // Khai báo mảng kết quả
    const results = [];

    try {
        // Lấy kết quả trả về của API (API = crawlConfig.url)
            // Khai báo kết quả gọi API
            let apiResults;

            // Lấy phương thức gọi API
            const httpMethodType = (await typeService.getHttpMethodType(crawlConfig.http_method_type_id)).type;

            // Lấy các thông tin của API từ client
            const url = crawlConfig.url;
            const headers = crawlConfig.headers_api;
            const body = crawlConfig.body_api;
            

            // Lấy kết quả trả về của API
            if(httpMethodType === HTTP_METHODS.GET) {
                const response = await axios.get(url, { headers });
                apiResults = response.data;
            } else if(httpMethodType === HTTP_METHODS.POST) {
                const response = await axios.post(crawlConfig.url, body, { headers });
                apiResults = response.data;
            } else if (httpMethodType === HTTP_METHODS.PUT) {
                const response = await axios.put(url, body, { headers });
                apiResults = response.data;
            } else if (httpMethodType === HTTP_METHODS.PATCH) {
                const response = await axios.patch(url, body, { headers });
                apiResults = response.data;
            } else if (httpMethodType === HTTP_METHODS.DELETE) {
                const response = await axios.delete(url, { headers });
                apiResults = response.data;
            }

        // Lấy danh sách item dạng json trong trang
        const itemDatas = apiResults[crawlConfig.item_selector];

        // duyệt qua từ item
        for (const itemData of itemDatas) {
            const data = [];

            // Duyệt qua các selector
            for (const crawlDetail of crawlDetails) {
                const { id, name, attribute, is_contain_keywords, is_primary_key } = crawlDetail;

                // Tách các thuộc tính lồng nhau bằng cách sử dụng dấu chấm
                const attributes = attribute.split('.');

                // Lấy giá trị của thuộc tính cần lấy
                let value = itemData;
                for (const attr of attributes) {
                    if (value) {
                        value = value[attr];
                    }
                }

                if (!value) value = '';

                // Thực hiện các option
                if (crawlOptionDetails) value = await optionDetailService.handleOptions(crawlOptionDetails, id, value);

                // Thêm vào kết quả
                data.push({ id, name, value, is_contain_keywords, is_primary_key });
            }

            results.push(data);
        }
        
        return results;
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tất cả item bằng API:', error);
        throw error;
    }
};
