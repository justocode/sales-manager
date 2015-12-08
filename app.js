'use strict';

var join = require('path').join,
		fs = require('fs'),
		express = require('express'),
		mongoose = require('mongoose'),
		passport = require('passport'),
		promise = require('bluebird'),
		mongoose = promise.promisifyAll(mongoose),
		config = require('config');

var app = express();
var port = process.env.PORT || 3000;

// setup connect to mongodb
var connect = function() {
	var options = { server: { socketOptions: { keepAlive: 1 } } };
	mongoose.connect(config.db.mongodb, options, function() {
		console.log('connect to mongodb successfully');
	});
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// setup bootstrap models
// fs.readdirSync(join(__dirname, 'api/models')).forEach(function(file) {
// 	if(~file.indexOf('.js')) { require(join(__dirname, 'api/models', file)); }
// });

// Bootstrap passport config
require('./config/passport')(passport);

// Bootstrap application settings
require('./config/express')(app, passport);

// Bootstrap swagger config
require('./config/swagger')(app);

// app.use('/', app.router);
// Bootstrap routes
require('./config/routes')(app, passport);
	// var productRouter = express.Router();
	// require('./config/routes/products')(productRouter);
	// app.use('/api/products', productRouter);

// setup Server
app.listen(port, function() {
	console.log('Server started at http://localhost:%d', port);
	console.log('Swagger-ui is available on http://localhost:%d/docs', port);
});

module.exports = app;
