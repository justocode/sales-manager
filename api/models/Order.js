'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var OrderSchema = new Schema({
	orderStatus: { type: String, default: 'opening' },
	createdAt: { type: Date, default: Date.now },
	billingDate: { type: Date, default: Date.now },
	amount: { type: Number, default: 0 },
	shopName: { type: String, default: '' },
	customerName: { type: String, default: '', trim : true },
	customerPhone: { type: String, default: '' },
	customerAddress: { type: String, default: '', trim : true },
	customerNote: { type: String, default: '', trim : true },
	orderItems:[{
		productId: { type: String, default: '' },
		quantity: { type: Number, default: 0 },
		price: { type: Number, default: 0 },
		coupon: { type: Number, default: 0 },
		amount: { type: Number, default: 0 },
	}]
});

/*
 * Validations
 */
OrderSchema.path('customerName').required(true, '');
OrderSchema.path('customerName').required(true, '');
OrderSchema.path('customerName').required(true, '');

/*
 * Methods
 */
OrderSchema.methods = {

};

/*
* Statics
*/
OrderSchema.statics = {

};

mongoose.model('Order', OrderSchema);
