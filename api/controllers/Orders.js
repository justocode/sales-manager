'use strict';

var mongoose = require('mongoose'),
		// promise = require('bluebird'),
		// mongoose = promise.promisifyAll(mongoose),
		Order = mongoose.model('Order'),
		utils = require('utils');

/**
 * Load all Orders
 */
exports.loadAllOrders = function (req, res, next) {
	var options = { select: '_id categoryName' };
	var getOrders = Order.list(options);

	getOrders.then(function (orders) {
			res.json({ orders: orders });
		}, function(err) {
			next(err);
		});
};

/**
 * Create an Order
 */
exports.create = function (req, res) {
	var order = new Order(req.body);
	order.save(function (err) {
		if (!err) {
			console.log('Create successfully');
			return res.json(200, { message: 'successfully' });
		}
		console.log('Could not create order. Error');
		res.json(500, { message: 'Could not create order. Error: ' + err });
	});
};

/**
 * Edit an Order
 */
// exports.edit = function (req, res) {
// 	res.json();
// };

/**
 * Delete a Order
 */
// exports.destroy = function (req, res) {
// 	var order = req.order;
// 	order.remove(function (err) {
// 		res.json({ success: true });
// 	});
// };
