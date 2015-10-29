'use strict';

var url = require('url');
var Products = require('./ProductsService');

module.exports.productsGet = function productsGet (req, res, next) {

  var p_name = req.swagger.params['p_name'].value;

  var result = Products.productsGet(p_name);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
    // res.json(result);
  } else {
    res.end();
  }

};
