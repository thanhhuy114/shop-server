const axios = require('axios');
const optionDetailService = require('../services/crawl_option_detail_service');
const typeService = require('./type_service');
const {HTTP_METHODS, ERROR_CODES} = require('../untils/constans/constans');

// Lấy dữ liệu 1 đối tượng
exports.singleCrawl = async (crawlConfig, crawlDetails, crawlOptionDetails) => {
    // Mảng lưu trữ lỗi
    const errors = [];

    // Mảng lưu kết quả trả về
    const data = [];

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
            try {
                if(httpMethodType == HTTP_METHODS.GET) {
                    const response = await axios.get(url, { headers });
                    apiResults = response.data;
                } else if(httpMethodType == HTTP_METHODS.POST) {
                    const response = await axios.post(crawlConfig.url, body, { headers });
                    apiResults = response.data;
                } else if (httpMethodType == HTTP_METHODS.PUT) {
                    const response = await axios.put(url, body, { headers });
                    apiResults = response.data;
                } else if (httpMethodType == HTTP_METHODS.PATCH) {
                    const response = await axios.patch(url, body, { headers });
                    apiResults = response.data;
                } else if (httpMethodType == HTTP_METHODS.DELETE) {
                    const response = await axios.delete(url, { headers });
                    apiResults = response.data;
                }
            } catch (error) {
                errors.push({ error_at: url, errorCode: ERROR_CODES.API_NOT_FOUND, error_message: error.message });

                return {items: data, errors};
            }

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

                if (!value) {
                    value = '';
                    if (!checkErrorExists(errors, name)) {
                        errors.push({ error_at: name, errorCode: ERROR_CODES.ELEMENT_VALUE_NOT_FOUND, error_message: 'Element attribute not found!' });
                    }
                }

            // Thực hiện các option
            if (crawlOptionDetails) value = await optionDetailService.handleOptions(crawlOptionDetails, id, value);

            // Thêm vào mảng kết quả
            data.push({ id, name, value, is_contain_keywords, is_primary_key });
        }

        return {items: data, errors};
    } catch (error) {
        errors.push({ error_at: '?', error_code: ERROR_CODES.UNKNOWN_ERROR, error_message: error.message});

        return {items: data, errors};
    }
};

// Lấy dữ liệu tất cả đối tượng
exports.multiCrawl = async (crawlConfig, crawlDetails, crawlOptionDetails) => {
    // Khai báo mảng kết quả
    const results = [];
    
    // Mảng lưu trữ lỗi
    const errors = [];

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
            try {
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
            } catch (error) {
                errors.push({ error_at: url, errorCode: ERROR_CODES.API_NOT_FOUND, error_message: error.message });

                return {items: results, errors};
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

                if (!value) {
                    value = '';
                    if (!checkErrorExists(errors, name)) {
                        errors.push({ error_at: name, errorCode: ERROR_CODES.ELEMENT_VALUE_NOT_FOUND, error_message: 'Element attribute not found!' });
                    }
                }

                // Thực hiện các option
                if (crawlOptionDetails) value = await optionDetailService.handleOptions(crawlOptionDetails, id, value);

                // Thêm vào kết quả
                data.push({ id, name, value, is_contain_keywords, is_primary_key });
            }

            results.push(data);
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
