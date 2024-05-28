const htmlCrawlService = require('../services/html_crawl_service');
const database = require('../services/database_demo');

// Hàm thực hiện thu thập dữ liệu
exports.crawlingData = async (req, res) => {
    try {
        // Lấy tham số
        // const { url, selectors } = req.body;
        const body = body_demo_get_all;

        // Tách dữ liệu thành từ phần
        const { crawl_config, crawl_event_details, crawl_details, crawl_option_details } = body;

        // Lưu lại cấu hình của lần thu thập
        //

        // Lấy danh sách item
            // Lấy loại thu thập (trang danh sách hay trang chi tiết)
            const result_type = database.getCrawlResultType(crawl_config.result_type_id);

            // Thực hiện thu thập theo từng loại
            let data;
            if(result_type === 'single') {
                data = await htmlCrawlService.get(crawl_config, crawl_event_details, crawl_details, crawl_option_details);
            } else if (result_type === 'multi') {
                data = await htmlCrawlService.getAll(crawl_config, crawl_event_details, crawl_details, crawl_option_details);
            }

        // Gửi kết quả về client
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi thu thập dữ liệu' });
    }
};

// ví dụ đây là phần body của api (cellphoneS)
const body_demo_get_all = {
    "crawl_config": {
        "id": 1,
        "name": "Crawl danh sách sản phẩm",
        "description": "Thu thập dữ liệu từ trang danh sách sản phẩm",
        "url": "https://cellphones.com.vn/mobile.html",
        "item_selector": ".product-info-container.product-item",
        "result_type_id": 2,
        "crawl_type_id": 1,
        "item_type_id": 1,
        "website_id": 1
    },
    "crawl_event_details": [
        {
            "id": 1,
            "crawl_config_id": 1,
            "event_type_id": 1,
            "selector": ".cancel-button-top"
        }
    ],
    "crawl_details": [
        {
            "id": 1,
            "crawl_config_id": 1,
            "name": "Link chi tiết sản phẩm",
            "selector": "a.product__link",
            "attribute": "href",
            "data_type_id": 3
        },
        {
            "id": 2,
            "crawl_config_id": 1,
            "name": "Tên sản phẩm",
            "selector": "h3",
            "attribute": null,
            "data_type_id": 1 
        },
        {
            "id": 3,
            "crawl_config_id": 1,
            "name": "Giá sản phẩm",
            "selector": ".product__price--show",
            "attribute": null,
            "data_type_id": 1
        },
        {
            "id": 4,
            "crawl_config_id": 1,
            "name": "Khuyến mãi",
            "selector": ".product__price--percent-detail",
            "attribute": null,
            "data_type_id": 1
        },
        {
            "id": 5,
            "crawl_config_id": 1,
            "name": "url ảnh",
            "selector": "img",
            "attribute": "src",
            "data_type_id": 1
        },
        {
            "id": 6,
            "crawl_config_id": 1,
            "name": "Số sao đánh giá",
            "selector": ".icon-star.is-active",
            "attribute": null,
            "data_type_id": 2
        }
    ],
    "crawl_option_details": [
        {
            "id": 1,
            "crawl_detail_id": 1,
            "option_type_id": 1,
            "type_option_condition_id": 1,
            "condition_value": "http",
            "value": "AddString"
        }
    ]
};

const body_demo_get = {
    "crawl_config": {
        "id": 1,
        "name": "Crawl danh sách sản phẩm",
        "description": "Thu thập dữ liệu từ trang danh sách sản phẩm",
        "url": "https://cellphones.com.vn/iphone-13.html",
        "item_selector": null,
        "result_type_id": 1,
        "crawl_type_id": 1,
        "item_type_id": 1,
        "website_id": 1
    },
    "crawl_event_details": [
        {
            "id": 1,
            "crawl_config_id": 1,
            "event_type_id": 1,
            "selector": ".cancel-button-top"
        }
    ],
    "crawl_details": [
        {
            "id": 2,
            "crawl_config_id": 1,
            "name": "Tên sản phẩm",
            "selector": "h1",
            "attribute": null,
            "data_type_id": 1 
        },
        {
            "id": 3,
            "crawl_config_id": 1,
            "name": "Giá sản phẩm",
            "selector": "div.tpt-box.active p.tpt---sale-price",
            "attribute": null,
            "data_type_id": 1
        },
        {
            "id": 4,
            "crawl_config_id": 1,
            "name": "Lượt đánh giá",
            "selector": ".box-rating",
            "attribute": null,
            "data_type_id": 2
        },
        {
            "id": 5,
            "crawl_config_id": 1,
            "name": "url ảnh",
            "selector": "div.swiper-slide.button__view-gallery.swiper-slide-visible img",
            "attribute": "src",
            "data_type_id": 3
        },
        {
            "id": 6,
            "crawl_config_id": 1,
            "name": "Số sao đánh giá",
            "selector": ".box-rating .icon.is-active",
            "attribute": null,
            "data_type_id": 2
        }
    ],
    "crawl_option_details": [
        {
            "id": 1,
            "crawl_detail_id": 1,
            "option_type_id": 1,
            "type_option_condition_id": 1,
            "condition_value": "http",
            "value": "AddString"
        }
    ]
};

// test tiki
        // const selectors = [
        //     { id: 1, selector: '.Title__TitledStyled-sc-c64ni5-0.iXccQY' },
        //     { id: 2, selector: '.slider img', attribute: 'src' },
        //     { id: 3, selector: '.product-price__current-price' },
        //     { id: 4, selector: '.product-price__discount-rate' },
        //     { id: 5, selector: '.styles__StyledReview-sc-1onuk2l-1 > div:first-child' },
        //     { id: 6, selector: '.number' },
        //     { id: 7, selector: '[data-view-id="pdp_quantity_sold"]' }
        // ];