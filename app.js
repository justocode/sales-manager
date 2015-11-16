'use strict';

var join = require('path').join,
		fs = require('fs'),
		express = require('express'),
		mongoose = require('mongoose'),
		config = require('./config/config');

var app = express();
var port = process.env.PORT || 3000;

// setup connect to mongodb
var connect = function() {
	var options = { server: { socketOptions: { keepAlive: 1 } } };
	mongoose.connect(config.db.mongodb, options);
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// setup bootstrap models
fs.readdirSync(join(__dirname, 'api/models')).forEach(function(file) {
	if(~file.indexOf('.js')) { require(join(__dirname, 'api/models', file)); }
});

// Bootstrap application settings
require('./config/express')(app);

// Bootstrap routes
// require('./config/routes')(app);



// apply using express.router
app.use(app.router);

app.get('/', function(req, res) {
	res.render('index', {title: 'hello'});
});

app.get('/admin', function(req, res) {
	res.render('admin', {title: 'admin'});
});

app.get('*', function(req, res) {
	res.send('Page not found!', 404);
});


// setup swagger
var swagger = require('swagger-noodle')({
	API_SPEC_FILE: join(__dirname, 'api/swagger.json'),
	CONTROLLERS_DIR: join(__dirname, 'api/controllers'),
	MOCK_MODE: true
});
app.use(swagger);

// setup Server
app.listen(port, function() {
	console.log('Server started at http://localhost:%d', port);
	console.log('Swagger-ui is available on http://localhost:%d/docs', port);
});

module.exports = app;
