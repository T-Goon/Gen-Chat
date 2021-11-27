var express = require('express');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var cors = require('cors');
var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    require('dotenv').config();
}

const configureWS = require('./ws/ws');

var indexRouter = require('./routes/index');

var app = express();

app.use(
    cors({
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
    })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch((err) => {
        console.error(err);
    });

var port = process.env.PORT || '3000';
app.set('port', port);

var server = http.createServer(app);

configureWS(server);

module.exports.server = server;
module.exports.port = port;
