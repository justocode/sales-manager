'use strict';

var mongoose = require('mongoose'),
		promise = require('bluebird'),
		mongoose = promise.promisifyAll(mongoose),
		Product = mongoose.model('Product'),
		utils = require('../../lib/utils'),
		extend = require('util')._extend;

/**
 * Load all products
 */
exports.loadAllProducts = function (req, res, next) {
	var options = { select: '_id productName category price stock description' };
	var getProducts = Product.list(options);

	getProducts.then(function (products) {
			res.json({ products: products });
		}, function(err) {
			next(err);
		});
};

/**
 * List products per page
 */
exports.loadAllProductsByCat = function (req, res, next) {
	var _criteria = req.params.catId ? { category: req.params.catId } : '';
	var _page = (req.params.page > 0 ? req.params.page : 1) - 1;
	var _perPage = req.params.perPage > 0 ? req.params.perPage : 20;
	var options = {
		criteria: _criteria,
		select: '_id productName category price stock description',
		perPage: _perPage,
		page: _page
	};

	var getList = Product.list(options);
	getList.then(function (products) {
			var count = Product.count({ criteria: _criteria });
			count.then(function(total) {
				res.json({ products: products, total: total });
			}, function(err) {
				console.log(err);
				res.json({ products: products });
			});
		}, function(err) {
			next(err);
		});
};

/**
 * New Product
 */
exports.new = function (req, res) {
	res.render('Products/new', {
		title: 'New Product',
		Product: new Product({})
	});
};

/**
 * Create an Product
 * Upload an image
 */
exports.create = function (req, res, next) {
	var product = new Product(req.body);
	var images = req.files.image ? [req.files.image] : undefined;

	var upload = Product.uploadAndSave(images);
	upload.then(function () { res.json({product: product}); })
		.error(function(err) { next(err); });
};

/**
 * Edit an Product
 */
exports.edit = function (req, res) {
	res.render('Products/edit', {
		title: 'Edit ' + req.product.title,
		Product: req.product
	});
};

/**
 * Update Product
 */
exports.update = function (req, res) {
	var Product = req.product;
	var images = req.files.image ? [req.files.image] : undefined;

	// make sure no one changes the user
	delete req.body.user;
	Product = extend(Product, req.body);

	Product.uploadAndSave(images, function (err) {
		if (!err) {
			return res.redirect('/Products/' + Product._id);
		}

		res.render('Products/edit', {
			title: 'Edit Product',
			Product: Product,
			errors: utils.errors(err.errors || err)
		});
	});
};

/**
 * Show
 */
exports.show = function (req, res) {
	res.render('Products/show', {
		title: req.product.title,
		Product: req.product
	});
};

/**
 * Delete an Product
 */
exports.destroy = function (req, res) {
	var Product = req.product;
	Product.remove(function (err) {
		req.flash('info', 'Deleted successfully');
		res.redirect('/products');
	});
};
