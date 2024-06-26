/* Tất cả các hằng được lưu trữ ở đây */


// Hằng số về HTTP Status Codes
const HTTP_STATUS = {
    OK: 200, // gọi api thành công
    CREATED: 201,
    BAD_REQUEST: 400, //gọi api gặp lỗi như: xóa dữ liệu thất bại vì id không tồn tại
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500 // gọi api gặp lỗi
};

/* Các hằng số bên dưới bắt buộc phải trùng khớp với các bảng trong database */

// Hằng số HTTP Method Types
const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
};

// Hằng số về các hành động mô phỏng người dùng khi thu thập bằng HTML
const ACTIONS = {
    CLICK_WHEN_APPEAR: 'Click when appear',
    SHOW_ALL: 'Show all'
};

// Hằng số về các lựa chọn
const OPTIONS = {
    APPEND: 'append',
    PREPEND: 'prepend',
    TO_NUMBER: 'to number',
    REMOVE: 'remove',
    REMOVE_ALL: 'remove all',
    REPLACE: 'replace',
    REPLACE_ALL: 'replace all'
};

// Hằng số về các lựa chọn
const CONDITIONS = {
    START_WITH: 'Start with',
    END_WITH: 'End with',
    CONTAINS: 'Contains'
};

// Hằng số về loại thu thập
const CRAWL_TYPES = {
    HTML: 'HTML',
    API: 'API',
    RSS: 'RSS'
};

// Hằng số về kết quả thu thập
const CRAWL_RESULT_TYPES = {
    SINGLE: 'Single',
    MULTIPLE: 'Multiple'
};

// Hằng số về cách thu thập
const CRAWL_DATA_TYPES = {
    CONTENT: 'content',
    COUNT: 'count',
    ATTRIBUTE: 'attribute'
};

// Export các hằng số
module.exports = {
    HTTP_METHODS,
    HTTP_STATUS,
    ACTIONS,
    OPTIONS,
    CONDITIONS,
    CRAWL_TYPES,
    CRAWL_RESULT_TYPES,
    CRAWL_DATA_TYPES
};
