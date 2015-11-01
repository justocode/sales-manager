'use strict';

var express = require('express'),
    app = express(),
    http = require('http'),
    path = require('path'),
    cons = require('consolidate'),
    info = require('./package.json');

// setup template engine
app.engine('html', cons.swig);
app.set('view engine', 'html');

// setup views folder
app.set('views', path.join(__dirname, 'views'));

// setup public client-side folder
// app.use(express.static(path.join(__dirname, 'build', info.version)));
app.use(express.static(path.join(__dirname, 'public')));

// setup swagger
var swagger = require('swagger-noodle')({
  API_SPEC_FILE: path.join(__dirname, 'api/swagger.json'),
  CONTROLLERS_DIR: path.join(__dirname, 'api/controllers'),
  MOCK_MODE: true
});
app.use(swagger);

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

// setup Server
http.createServer(app).listen(3000, function() {
  console.log('Server started at http://localhost:%d', 3000);
  console.log('Swagger-ui is available on http://localhost:%d/docs', 3000);
});
