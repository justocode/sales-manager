var express = require('express')
  , path = require('path')
  , app = express()
  , cons = require('consolidate')
  , info = require('./package.json')
  ;

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'build/' + info.version)));
console.log(info.version);

app.use(app.router);

app.get('/', function(req, res) {
  res.render('index', {title: 'hello'});
});

app.get('*', function(req, res) {
  res.send('Page not found!', 404);
});

app.listen(3000);
console.log('Server ran at port 3000');
