const htmlCrawlService = require('../services/html_crawl_service');

// Lấy chi tiết sản phẩm bằng url trang chi tiết
exports.get = async (req, res) => {

    // test cellphoneS (có thể thay đổi url)
    // {
    //     "url": "https://cellphones.com.vn/iphone-15-pro-max.html",
    //     "selectors": [
    //         { "id": 1, "selector": "h1" },
    //         { "id": 2, "selector": "div.swiper-slide.button__view-gallery.swiper-slide-visible img", "attribute": "src", "isList": true },
    //         { "id": 3, "selector": "div.tpt-box.active p.tpt---sale-price" },
    //         { "id": 4, "selector": "p.tpt---price" },
    //         { "id": 5, "selector": ".box-rating" },
    //         { "id": 6, "selector": ".box-rating .icon.is-active", "type": "count" }
    //     ]
    // }
    
    // test tiki (có thể thay đổi url)
    // {
    //     "url": "https://tiki.vn/apple-iphone-13-hang-chinh-hang-p184059211.html?spid=123547403",
    //     "selectors": [
    //         { "id": 1, "selector": ".Title__TitledStyled-sc-c64ni5-0.iXccQY" },
    //         { "id": 2, "selector": ".slider img", "attribute": "src" },
    //         { "id": 3, "selector": ".product-price__current-price" },
    //         { "id": 4, "selector": ".product-price__discount-rate" },
    //         { "id": 5, "selector": ".styles__StyledReview-sc-1onuk2l-1 > div:first-child" },
    //         { "id": 6, "selector": ".number" },
    //         { "id": 7, "selector": "[data-view-id=\"pdp_quantity_sold\"]" }
    //     ]
    // }

    try {
        // Lấy tham số
        const { url, selectors } = req.body;

        // Lấy danh sách item 
        const items = await htmlCrawlService.get(url, selectors);

        // Gửi kết quả về client
        res.status(200).json({ items });
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy dữ liệu của 1 đối tượng' });
    }
};

// Lấy danh sách tất cả sản phẩm là điện thoại
exports.getAll = async (req, res) => {

    // test tiki
    // {
    //     "url": "https://tiki.vn/dien-thoai-smartphone/c1795",
    //     "selectors": [
    //         { "id": 1, "selector": ".style__NameStyled-sc-139nb47-8" },
    //         { "id": 2, "selector": ".styles__StyledImg-sc-p9s3t3-0.hbqSye", "attribute": "srcset"},
    //         { "id": 3, "selector": ".price-discount__price" },
    //         { "id": 4, "selector": ".price-discount__percent" },
    //         { "id": 5, "selector": "svg path[fill=\"#FFC400\"]", "type": "count" },
    //         { "id": 6, "selector": "a.style__ProductLink-sc-139nb47-2", "attribute": "href" }
    //     ],
    //     "itemSelector": ".styles__ProductItemContainerStyled-sc-bszvl7-0.elOGIo",
    //     "viewMoreSelector": "div[data-view-id='category_infinity_view.more']"
    // }

    try {
        // Lấy tham số
        const { url, selectors, itemSelector, viewMoreSelector, closeNotificationSelector } = req.body;

        // Lấy danh sách tên các sản phẩm
        const results = await htmlCrawlService.getAll(url, selectors, itemSelector, viewMoreSelector, closeNotificationSelector);

        res.status(200).json({ results });
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy tất dữ liệu của tất cả đối tượng' });
    }
};

// Tìm danh sách sản phẩm phù hợp với từ khóa
exports.search = async (req, res) => {
    try {
        // Từ khóa cần tìm
        const keySearch = req.body.key;

        // Lấy danh sách tên các sản phẩm
        const productsData = await htmlCrawlService.search(keySearch);

        // Danh sách sản phẩm sau khi thêm vào database
        const products = [];

        // lưu lại kết quả vừa thêm nếu chưa tồn tại để tránh bị trùng
        for (const product of productsData) {
            if(!isExist)
                products.push(product);
        }

        // Gửi kết quả về client
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tìm kiếm danh sách đối tượng phù hợp' });
    }
};
