// Các bảng dữ liệu có sẵn
// Bảng loại thu thập
const crawl_types = [
    {
      "id": 1,
      "type": "HTML",
      "description": "Phương pháp này sử dụng các selector để trích xuất dữ liệu"
    }
]; 

// Bảng loại dữ liệu trả về
const crawl_result_types = [
    {
        "id": 1,
        "type": "single",
        "description": "Lựa chọn này sẽ trả về kết quả kiểu 1 item"
    },
    {
        "id": 2,
        "type": "multi",
        "description": "Lựa chọn này sẽ trả về kết quả là tất cả item trong trang"
    }
];

// Bảng loại sự kiện
const crawl_action_types = [
    {
        "id": 1,
        "type": "Click when appear",
        "description": "Ấn mỗi khi phần tử xuất hiện trên màn hình"
    },
    {
        "id": 2,
        "type": "Show all",
        "description": "Ấn cho đến khi tất cả dữ liệu được hiện ra"
    }
];

// Bảng loại lấy dữ liệu (cách lấy)
const crawl_data_types = [
    {
        "id": 1,
        "type": "content",
        "description": "Lấy nội dung của thẻ html"
    },
    {
        "id": 2,
        "type": "count",
        "description": "đếm số lượng thẻ html"
    },
    {
        "id": 3,
        "type": "attribute",
        "description": "lấy nội thuộc tính thẻ html"
    }
];

// Bảng loại lựa chọn
const crawl_option_types = [
    {
        "id": 1,
        "type": "prepend",
        "description": "Thêm vào đầu chuỗi"
    },
    {
        "id": 2,
        "type": "append",
        "description": "Thêm vào cuối chuỗi"
    },
    {
        "id": 3,
        "type": "to number",
        "description": "Loại bỏ ký tự không phải số trong chuỗi"
    }
];

// Bảng loại
const crawl_option_condition_types = [
    {
        "id": 1,
        "type": "startWith",
        "description": "Lựa chọn này sẽ thực hiện So sánh kết quả thu được có bắt đầu <chuỗi so sánh> hay không"
    }
];

// Bảng loại tiem
const item_types = [
    {
        "id": 1,
        "type": "điện thoại",
        "description": "Loại sản phẩm của các item là điện thoại"
    }
];

// Bảng các website nguồn chứa dữ liệu cần thu thập
const websites = [
    {
        "id": 1,
        "name": "CellphoneS",
        "url": "https://cellphones.com.vn/"
    },
    {
        "id": 2,
        "name": "Tiki",
        "url": "https://Tiki.vn/"
    }
];

// Hàm lấy loại thu thập dựa trên id
exports.getCrawlType = (id) => {
    return crawl_types.find(type => type.id === id).type;
}

// Hàm lấy loại kết quả dựa trên id
exports.getCrawlResultType = (id) => {
    return crawl_result_types.find(type => type.id === id).type;
}

// Hàm lấy loại hành động dựa trên id
exports.getCrawlActionType = (id) => {
    return crawl_action_types.find(type => type.id === id).type;
}

// Hàm lấy loại dữ liệu dựa trên id
exports.getCrawlDataType = (id) => {
    return crawl_data_types.find(type => type.id === id).type;
}

// Hàm lấy loại lựa chọn dựa trên id
exports.getCrawlOptionType = (id) => {
    return crawl_option_types.find(type => type.id === id).type;
}

// Hàm lấy loại điều kiện lựa chọn dựa trên id
exports.getCrawlOptionConditionType = (id) => {
    return crawl_option_condition_types.find(type => type.id === id).type;
}

// Hàm lấy loại sản phẩm dựa trên id
exports.getItemType = (id) => {
    return item_types.find(type => type.id === id).type;
}

// Hàm lấy tên website
exports.getWebsiteName = (id) => {
    return websites.find(type => type.id === id).name;
}