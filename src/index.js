const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();
const htmlCrawlRoutes = require('./api/routers/html_crawl_routes.js');
const productRoutes = require('./api/routers/product_routes.js');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes thu thập dữ liệu từ HTML
app.use('/api/html_crawl', htmlCrawlRoutes);

// routes sản phẩm
app.use('/api/product', productRoutes);

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
