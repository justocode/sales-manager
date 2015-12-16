'use strict';

var AppDispatcher = require('./../dispatcher/AppDispatcher');
var AppConstants = require('./../constants/AppConstants');

module.exports = {

	receiveCategories: function(data) {
		AppDispatcher.handleServerAction({
			actionType: AppConstants.GET_CATS_FROM_SERVER,
			data: data
		});
	},

	receiveProducts: function(data) {
		AppDispatcher.handleServerAction({
			actionType: AppConstants.GET_PRODUCT_FROM_SERVER,
			data: data
		});
	}
};
