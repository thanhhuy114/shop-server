/* Tất cả các hằng được lưu trữ ở đây */


// Hằng số về HTTP Status Codes
const HTTP_STATUS = {
    OK: 200, // gọi api thành công
    CREATED: 201, // tạo thành công
    BAD_REQUEST: 400, // lỗi như: xóa dữ liệu thất bại vì id không tồn tại...
    UNAUTHORIZED: 401, // thông tin xác thực sai
    FORBIDDEN: 403, // người dùng không đủ quyền
    NOT_FOUND: 404, // không tìm thấy
    INTERNAL_SERVER_ERROR: 500 // gọi api gặp lỗi không xác định
};

// Hằng số về lỗi trong quá trình thu thập
const ERROR_CODES = {
    // Lỗi không xác định 
    UNKNOWN_ERROR: 'E000',

    // Lỗi không tìm thấy phần tử
    ELEMENT_NOT_FOUND: 'E001',

    // Lỗi không lấy được giá trị từ phần tử (tìm thấy phần tử nhưng không lấy được giá trị: cách lấy sai, truyền attribute sai)
    ELEMENT_VALUE_NOT_FOUND: 'E002',

    // Lỗi khi tìm danh sách item (item_selector lỗi)
    ITEM_LIST_NOT_FOUND: 'E003',

    // Lỗi không tìm thấy API (url không hợp lệ)
    API_NOT_FOUND: 'E004',
};

/* 
    ###
    Các hằng số bên dưới bắt buộc phải trùng khớp với các bảng trong database 
    ###
*/

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

// Hằng số về loại tài khoản
const USER_TYPES = {
    DEFAULT: 'Default', // loại tài khoản mặc định khi vừa tạo
};

// Hằng số cho cấu hình "con" khi tạo mới 
// - Các giá trị này chỉ dùng để hiển thị
// - Không bao giờ được dùng để kiểm tra logic
// - Vì các thông tin này đã có ở cấu hình "cha"
const CHILD_CONFIGS = {
    user_id: -1,
    name: '',
    description: '',
    item_type_id: null,
    url: '',
    website_id: null,
    is_complete: false,
    update_at: new Date()
}

// Export các hằng số
module.exports = {
    HTTP_METHODS,
    HTTP_STATUS,
    ERROR_CODES,
    ACTIONS,
    OPTIONS,
    CONDITIONS,
    CRAWL_TYPES,
    CRAWL_RESULT_TYPES,
    CRAWL_DATA_TYPES,
    USER_TYPES,
    CHILD_CONFIGS,

};
