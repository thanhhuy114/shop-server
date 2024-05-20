const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();
const indexRouter = require('./api/routers/index.js')

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/', indexRouter);

const port = process.env.PORT
app.listen(port, () => {
    console.log(`localhost:${port}`)
})
