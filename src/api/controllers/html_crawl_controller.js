const htmlCrawlService = require('../services/html_crawl_service');
const database = require('../services/database_demo');

// Hàm thực hiện thu thập dữ liệu
exports.crawlingData = async (req, res) => {
    try {
        // Lấy tham số
        // const { url, selectors } = req.body;
        const body = body_demo_tiki_get_all;

        // Lưu lại cấu hình của lần thu thập
        //

        // Lấy danh sách item
            // Lấy loại thu thập (trang danh sách hay trang chi tiết)
            const result_type = database.getCrawlResultType(body.crawl_config.result_type_id);

            // Thực hiện thu thập theo từng loại
            let data;
            if(result_type === 'single') {
                data = await htmlCrawlService.get(body);
            } else if (result_type === 'multi') {
                data = await htmlCrawlService.getAll(body);
            }

        // Gửi kết quả về client
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi thu thập dữ liệu' });
    }
};

// ví dụ đây là phần body của api (cellphoneS)
const body_demo_celphones_get_all = {
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
    "crawl_action_details": [
        {
            "id": 1,
            "crawl_config_id": 1,
            "action_type_id": 1,
            "selector": ".cancel-button-top"
        },
        {
            "id": 2,
            "crawl_config_id": 1,
            "action_type_id": 2,
            "selector": ".button.btn-show-more.button__show-more-product"
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
            "selector": "img.product__img",
            "attribute": "src",
            "data_type_id": 3
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
            "option_value": "https://cellphones.com.vn/",
            "type_option_condition_id": null,
            "condition_value": null
        },
        {
            "id": 2,
            "crawl_detail_id": 3,
            "option_type_id": 3,
            "option_value": null,
            "type_option_condition_id": null,
            "condition_value": null
        },
        {
            "id": 3,
            "crawl_detail_id": 4,
            "option_type_id": 3,
            "option_value": null,
            "type_option_condition_id": null,
            "condition_value": null
        }
    ]
};

const body_demo_celphones_get = {
    "crawl_config": {
        "id": 1,
        "name": "Crawl danh sách sản phẩm",
        "description": "Thu thập dữ liệu từ trang chi tiết sản phẩm",
        "url": "https://cellphones.com.vn/iphone-13.html",
        "item_selector": null,
        "result_type_id": 1,
        "crawl_type_id": 1,
        "item_type_id": 1,
        "website_id": 1
    },
    "crawl_action_details": [],
    "crawl_details": [
        {
            "id": 1,
            "crawl_config_id": 1,
            "name": "Tên sản phẩm",
            "selector": "h1",
            "attribute": null,
            "data_type_id": 1 
        },
        {
            "id": 2,
            "crawl_config_id": 1,
            "name": "Giá sản phẩm",
            "selector": "div.tpt-box.active p.tpt---sale-price",
            "attribute": null,
            "data_type_id": 1
        },
        {
            "id": 3,
            "crawl_config_id": 1,
            "name": "Lượt đánh giá",
            "selector": ".box-rating",
            "attribute": null,
            "data_type_id": 2
        },
        {
            "id": 4,
            "crawl_config_id": 1,
            "name": "url ảnh",
            "selector": "div.swiper-slide.button__view-gallery.swiper-slide-visible img",
            "attribute": "src",
            "data_type_id": 3
        },
        {
            "id": 5,
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
            "crawl_detail_id": 2,
            "option_type_id": 3,
            "option_value": null,
            "type_option_condition_id": null,
            "condition_value": null
        }
    ]
};

// test tiki (trang chi tiết)
const body_demo_tiki_get = {
    "crawl_config": {
        "id": 1,
        "name": "Crawl danh sách sản phẩm",
        "description": "Thu thập dữ liệu từ trang chi tiết sản phẩm",
        "url": "https://tiki.vn/dien-thoai-xiaomi-redmi-10a-2gb-32gb-hang-chinh-hang-p189466001.html?spid=189466007",
        "item_selector": null,
        "result_type_id": 1,
        "crawl_type_id": 1,
        "item_type_id": 1,
        "website_id": 1
    },
    "crawl_action_details": [],
    "crawl_details": [
        {
            "id": 1,
            "crawl_config_id": 1,
            "name": "Tên sản phẩm",
            "selector": ".Title__TitledStyled-sc-c64ni5-0.iXccQY",
            "attribute": null,
            "data_type_id": 1 
        },
        {
            "id": 2,
            "crawl_config_id": 1,
            "name": "Giá sản phẩm",
            "selector": ".product-price__current-price",
            "attribute": null,
            "data_type_id": 1
        },
        {
            "id": 3,
            "crawl_config_id": 1,
            "name": "Lượt đánh giá",
            "selector": ".number",
            "attribute": null,
            "data_type_id": 1
        },
        {
            "id": 4,
            "crawl_config_id": 1,
            "name": "url ảnh",
            "selector": ".slider img",
            "attribute": "src",
            "data_type_id": 3
        },
        {
            "id": 5,
            "crawl_config_id": 1,
            "name": "Số sao đánh giá",
            "selector": ".styles__StyledReview-sc-1onuk2l-1 > div:first-child",
            "attribute": null,
            "data_type_id": 2
        },
        {
            "id": 6,
            "crawl_config_id": 1,
            "name": "Đã bán",
            "selector": '[data-view-id="pdp_quantity_sold"]',
            "attribute": null,
            "data_type_id": 1
        },
        {
            "id": 6,
            "crawl_config_id": 1,
            "name": "Khuyến mãi",
            "selector": '.product-price__discount-rate',
            "attribute": null,
            "data_type_id": 1
        }
    ],
    "crawl_option_details": [
        {
            "id": 1,
            "crawl_detail_id": 2,
            "option_type_id": 3,
            "option_value": null,
            "type_option_condition_id": null,
            "condition_value": null
        }
    ]
};

// test tiki trang danh sách
const body_demo_tiki_get_all = {
    "crawl_config": {
        "id": 1,
        "name": "Crawl danh sách sản phẩm",
        "description": "Thu thập dữ liệu từ trang danh sách sản phẩm",
        "url": "https://tiki.vn/dien-thoai-smartphone/c1795",
        "item_selector": ".styles__ProductItemContainerStyled-sc-bszvl7-0.elOGIo",
        "result_type_id": 2,
        "crawl_type_id": 1,
        "item_type_id": 1,
        "website_id": 1
    },
    "crawl_action_details": [
        {
            "id": 1,
            "crawl_config_id": 1,
            "action_type_id": 2,
            "selector": ".styles__Button-sc-143954l-1.gVFXpZ"
        }
    ],
    "crawl_details": [
        {
            "id": 1,
            "crawl_config_id": 1,
            "name": "Link chi tiết sản phẩm",
            "selector": "a.style__ProductLink-sc-139nb47-2",
            "attribute": "href",
            "data_type_id": 3
        },
        {
            "id": 2,
            "crawl_config_id": 1,
            "name": "Tên sản phẩm",
            "selector": ".style__NameStyled-sc-139nb47-8",
            "attribute": null,
            "data_type_id": 1 
        },
        {
            "id": 3,
            "crawl_config_id": 1,
            "name": "Giá sản phẩm",
            "selector": ".price-discount__price",
            "attribute": null,
            "data_type_id": 1
        },
        {
            "id": 4,
            "crawl_config_id": 1,
            "name": "Khuyến mãi",
            "selector": ".price-discount__percent",
            "attribute": null,
            "data_type_id": 1
        },
        {
            "id": 5,
            "crawl_config_id": 1,
            "name": "url ảnh",
            "selector": ".styles__StyledImg-sc-p9s3t3-0.hbqSye",
            "attribute": "srcset",
            "data_type_id": 3
        },
        {
            "id": 6,
            "crawl_config_id": 1,
            "name": "Số sao đánh giá",
            "selector": "svg path[fill=\"#FFC400\"]",
            "attribute": null,
            "data_type_id": 2
        }
    ],
    "crawl_option_details": [
        
    ]
};
