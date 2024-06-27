const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cron = require('node-cron');
require('dotenv').config();

const crawlConfigRoutes = require('./api/routes/crawl_config_routes.js');
const crawlRoutes = require('./api/routes/crawl_routes.js');
const itemRoutes = require('./api/routes/item_routes.js');
const itemDetailRoutes = require('./api/routes/item_detail_routes.js');
const typeRoutes = require('./api/routes/type_routes.js');

const crawlService = require('./api/services/crawl_service.js')

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require('cors')

app.use(cors())

// Lên lịch cập nhật các kết quả thu thập: mỗi ngày một lần vào lúc 0h00
cron.schedule('0 0 * * *', () => {
    console.log('Đang thực hiện kiểm tra và cập nhật dữ liệu thu thập...');
    crawlService.checkAndUpdateData();
});

// routes thu thập dữ liệu từ HTML
app.use('/api/crawl-config', crawlConfigRoutes);

// routes thu thập dữ liệu
app.use('/api/crawl/', crawlRoutes);

// routes item
app.use('/api/item', itemRoutes);

// routes chi tiết item
app.use('/api/item-detail', itemDetailRoutes);

// routes của các bảng chứa loại
app.use('/api/type', typeRoutes);

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})

// kiểm tra và cập nhật khi vửa khởi động server
console.log('Đang thực hiện kiểm tra và cập nhật dữ liệu thu thập...');
crawlService.checkAndUpdateData();
