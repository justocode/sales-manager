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
	var options = { select: '_id productName category price stock description image createdAt' };
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
		select: '_id productName category price stock description image createdAt',
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
 * Create an Product
 * Upload an image
 */
exports.create = function (req, res, next) {
	var newProduct = new Product(req.body);
	var images = req.file ? [req.file] : undefined;

	var insertNew = newProduct.uploadAndSave(images);
	insertNew.then(function (product) {
		res.json({ product: product });
	}, function (err) {
		next(err);
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
 * Delete an Product
 */
exports.destroy = function (req, res) {
	var Product = req.product;
	Product.remove(function (err) {
		req.flash('info', 'Deleted successfully');
		res.redirect('/products');
	});
};
