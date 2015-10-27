var express = require('express')
  , path = require('path')
  , app = express()
  , cons = require('consolidate')
  , info = require('./package.json')
  ;

// setup template engine
app.engine('html', cons.swig);
app.set('view engine', 'html');

// setup views folder
app.set('views', __dirname + '/views');

// setup public client-side folder
app.use(express.static(path.join(__dirname, 'build/' + info.version)));

// apply using express.router
app.use(app.router);

app.get('/', function(req, res) {
  res.render('index', {title: 'hello'});
});

app.get('*', function(req, res) {
  res.send('Page not found!', 404);
});

// setup server port
app.listen(3000);
console.log('Server started at port 3000');
