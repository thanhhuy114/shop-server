const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();
const indexRouter = require('./api/routers/index.js')
const crawlRoutes = require('./api/routers/crawler_routes.js');
const productRoutes = require('./api/routers/crawler_routes.js');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', indexRouter);

// routes thu thập dữ liệu
app.use('/api/crawl', crawlRoutes);

// routes sản phẩm
app.use('/api/product', productRoutes);

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
