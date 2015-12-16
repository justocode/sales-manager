'use strict';

var AppConstants = require('./../constants/AppConstants'),
		AppDispatcher = require('./../dispatcher/AppDispatcher'),
		ProductAPI = require('./../utils/ProductAPI');

var Promise = require('bluebird');

var AppActions = {

	loadData: function(state) {
		Promise.all([
				this.getCategories(),
				this.getProducts(state.currentCat, state.perPage, state.currentPage)
			]).then(function() {
				console.log('Load data success');
				// AppDispatcher.handleServerAction({
				// 	actionType: AppConstants.LOAD_DATA_FROM_SERVER
				// });
			});
	},

	getCategories: function() {
		var getCats = ProductAPI.getCategories();
		getCats.then(function(data) {
			AppDispatcher.handleServerAction({
				actionType: AppConstants.GET_CATS_FROM_SERVER,
				data: data
			});
		}).catch(function(err) {
			console.error(err.toString());
		});
	},

	getProducts: function(catId, perPage, page) {
		var getProducts = ProductAPI.getProducts(catId, perPage, page);
		getProducts.then(function(data) {
			AppDispatcher.handleServerAction({
				actionType: AppConstants.GET_PRODUCTS_FROM_SERVER,
				data: data
			});
		}).catch(function(err) {
			console.error(err.toString());
		});
	},

	changeTab: function(tabKey) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.CHANGE_TAB,
			tabKey: tabKey
		});
	}

};

module.exports = AppActions;
