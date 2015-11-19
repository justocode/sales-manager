'use strict';

var Products = require('./ProductsService');

module.exports.productsGet = function productsGet (req, res) {

	var pName = req.swagger.params['p_name'].value;
	console.log(pName);

	var examples = {};

	examples['application/json'] = [ {
		'product_id' : 'abcxyz123',
		'description' : 'Ram for PC',
		'display_name' : 'Ram DDRII 1GB',
		'price' : 250000,
		'stock' : 100,
		'image' : 'image0001'
	} ];

	var result = examples[Object.keys(examples)[0]];

	if(typeof result !== 'undefined') {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(result || {}, null, 2));
		// res.json(result);
	} else {
		res.end();
	}

};
