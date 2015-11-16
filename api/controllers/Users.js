'use strict';

var url = require('url'),
		Users = require('./UsersService');

module.exports.productsGet = function productsGet (req, res, next) {

	var name = req.swagger.params['name'].value;

	var result = Products.productsGet(name);

	if(typeof result !== 'undefined') {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(result || {}, null, 2));
		// res.json(result);
	} else {
		res.end();
	}

};
