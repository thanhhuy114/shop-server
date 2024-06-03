const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();
const htmlCrawlRoutes = require('./api/routes/html_crawl_routes.js');
const productRoutes = require('./api/routes/product_routes.js');
const typeRoutes = require('./api/routes/type_routes.js');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes thu thập dữ liệu từ HTML
app.use('/api/html-crawl', htmlCrawlRoutes);

// routes sản phẩm
//app.use('/api/product', productRoutes);

// routes các loại
app.use('/api/type', typeRoutes);

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
