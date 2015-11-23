'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		Imager = require('imager'),
		config = require('config'),
		imagerConfig = require(config.root + '/config/imager.js');

/**
 * Product Schema
 */
var ProductSchema = new Schema({
	productName: { type : String, default : '', trim : true },
	description: { type : String, default : '', trim : true },
	price: { type : Number, default : 0 },
	stock: { type : Number, default : 0 },
	category: { type: Number, ref: 'Category' },
	image: {
		cdnUri: String,
		files: []
	},
	createdAt : { type: Date, default: Date.now }
});

/**
 * Validations
 */
ProductSchema.path('productName').required(true, 'Product\'s name cannot be blank');
ProductSchema.path('category').required(true, 'Product\'s category cannot be blank');
ProductSchema.path('price').validate(function (price) {
	return price >= 0;
}, 'Product\'s price cannot less than blank');

/**
 * Pre-remove hook
 */
ProductSchema.pre('remove', function (next) {
	var imager = new Imager(imagerConfig, 'S3');
	var files = this.image.files;

	// if there are files associated with the item, remove from the cloud too
	imager.remove(files, function (err) {
		if (err) { return next(err); }
	}, 'product');

	next();
});

/**
 * Pre-save hook
 */
ProductSchema.pre('save', function (next) {
	if (this.isNew) {
		var findOne = this.findOne({ productName: this.productName });
		findOne.then(function(product) {
				if (product) {
					next(new Error('This product was existed'));
				}
				next();
			}, function(err) {
				console.error(err);
				next(err);
			});
	}
});

/**
 * Methods
 */
ProductSchema.methods = {

	uploadAndSave: function (images) {

		// if (!images || !images.length) {
			this.image = { cdnUri: images.destination, files: images };
			return this.save();
		// } else {
			// var imager = new Imager(imagerConfig, 'S3');
			// var self = this;

			// var err = this.validate();
			// if(err && err.toString()) {
			// 	console.error(err);
			// }

			// imager.upload(images, function (err, files) {
			// 	if (err) {
			// 		console.error('image.upload() - '+err);
			// 	}
				// console.log(cdnUri);
			// 	console.log(files);
			// 	if (files.length) {
			// 		console.log(files.length);
			// 		// self.image = { cdnUri: cdnUri, files: files };
			// 	}
			// 	return self.save();
			// }, 'product');
		// }
	}
};

/**
 * Statics
 */
ProductSchema.statics = {

	load: function (options) {
		return this.findOne(options.criteria).select(options.select).populate('category').exec();
	},

	list: function (options) {
		var _criteria = options.criteria || {},
				_select = options.select || {},
				_limit = options.perPage || 0,
				_skip = (options.page || 0) * _limit,
				_sort = options.sort || {'createdAt': -1};

		return this.find(_criteria)
			.select(_select)
			.sort(_sort)
			.limit(_limit)
			.skip(_skip)
			.populate('category')
			.exec();
	},

	count: function (options) {
		var _criteria = options.criteria || {};

		return this.find(_criteria)
			.count()
			.exec();
	}
};

mongoose.model('Product', ProductSchema);
