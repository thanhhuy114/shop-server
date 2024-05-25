const tikiCrawlService = require('../services/tiki_crawler_service');

// Lấy danh sách tất cả sản phẩm là điện thoại
exports.getAllProduct = async (req, res) => {
    try {
        // Lấy danh sách tên các sản phẩm
        const productsData = await tikiCrawlService.getAllProduct();

        // Danh sách sản phẩm sau khi thêm vào database
        let products = [];

        // Thêm danh sách tên sản phẩm vào database
        for (const product of productsData) {
            // Thêm vào và đồng bộ
            const newProduct = await tikiCrawlService.syncProduct(product);

            // lưu lại kết quả vừa thêm nếu chưa tồn tại để tránh bị trùng
            const isExist = products.some(existingProduct => existingProduct.product_url === product.product_url);
            if(!isExist)
                products.push(newProduct);
        }

        // Gửi kết quả về client
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy tất cả sản phẩm từ Tiki' });
    }
};

// Tìm danh sách sản phẩm phù hợp với từ khóa
exports.searchProductsWithKey = async (req, res) => {
    try {
        // Từ khóa cần tìm
        const keySearch = req.body.key;

        // Lấy danh sách tên các sản phẩm
        const productsData = await tikiCrawlService.searchProductsWithKey(keySearch);

        // Danh sách sản phẩm sau khi thêm vào database
        let products = [];

        // Thêm danh sách tên sản phẩm vào database
        for (const product of productsData) {
            const newProduct = await tikiCrawlService.syncProduct(product);

            // lưu lại kết quả vừa thêm nếu chưa tồn tại để tránh bị trùng
            if(!isExist)
                products.push(newProduct);
        }

        // Gửi kết quả về client
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tìm kiếm danh sách sản phẩm phù hợp từ Tiki' });
    }
};

// Lấy chi tiết sản phẩm bằng url trang chi tiết
exports.getProductDetail = async (req, res) => {
    try {
        // Url trang chi tiết của sản phẩm
        const url = req.body.url;

        // test cellphoneS
        const selectors = [
            { id: 'name', selector: 'h1' },
            { id: 'imageUrlList', selector: 'div.swiper-slide.button__view-gallery.swiper-slide-visible img', attribute: 'src', isList: true },
            { id: 'price', selector: 'div.tpt-box.active p.tpt---sale-price' },
            { id: 'originalPrice', selector: 'p.tpt---price' },
            { id: 'rateCount', selector: '.box-rating' },
            { id: 'rateStars', selector: '.box-rating .icon.is-active', isList: true }
        ];
        
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

        // Lấy danh sách item 
        const items = await tikiCrawlService.getProductDetail(url, selectors);

        // Đồng bộ sản phẩm
        //const newProduct= await tikiCrawlService.syncProduct(product);

        // Gửi kết quả về client
        res.status(200).json({ items });
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin sản phẩm từ trang chi tiết Tiki!' });
    }
};