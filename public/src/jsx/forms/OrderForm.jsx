'use strict';

var React = require('react'),
		OrderList = require('./../components/OrderList'),
		Pagination = require('./../components/Pagination'),
		DropDownList = require('./../components/DropDownList');

module.exports = React.createClass({
	getInitialState: function() {
		return ({
			orderListData: [],
			shops: [],
			currentShop: 'all',
			currentStatus: 'all',
			pages: 1,
			currentPage: 1,
			ordersPerPage: 5
		});
	},
	componentWillMount: function() {
		// get shops
		this.getShops();
		// get orders
		this.getOrderList(this.state.ordersPerPage, this.state.currentPage);
	},
	getOrderList: function(perPage, page, shopId, status) {
		// Request get orders list
		var url = '/api/orders/'+ perPage +'/'+ page;
		url += shopId ? '/'+ shopId : '';
		url += status ? '/'+ status : '';
		var orders = $.get(url);

		orders.done(function(data) {
				var _pages = Math.floor(data.total/perPage);
				_pages += (data.total%perPage > 0) ? 1 : 0;
				this.setState({
					orderListData: data.orders,
					pages: _pages
				});
			}.bind(this));

		orders.fail(function(xhr, status, err) {
				console.error('/api/orders', status, err.toString());
			}.bind(this));
	},
	getOrderStatusList: function() {
		// Define Order status
		var orderStatus = [
			{
				key: 'all',
				value: 'All Status'
			},
			{
				key: 'opening',
				value: 'Opening'
			},
			{
				key: 'processing',
				value: 'Processing'
			},
			{
				key: 'finish',
				value: 'Finish'
			},
			{
				key: 'depending',
				value: 'Depending'
			},
			{
				key: 'fail',
				value: 'Fail'
			}
		];
		return orderStatus;
	},
	getShops: function() {
		return [
			{
				key: 'all',
				value: 'All shops'
			},
			{
				key: 'danang',
				value: 'Da Nang'
			},
			{
				key: 'hanoi',
				value: 'Ha Noi'
			},
			{
				key: 'hcm',
				value: 'Ho Chi Minh'
			}
		];
	},
	getPageSizes: function() {
		return [
			{ key: 5, value: 5 },
			{ key: 10, value: 10 },
			{ key: 15, value: 15 },
			{ key: 20, value: 20 },
			{ key: 25, value: 25 }
		];
	},
	changeShop: function(shopId) {
		this.getOrderList(this.state.ordersPerPage, 1, shopId, this.state.currentStatus);
		this.setState({currentShop: shopId, currentPage: 1});
	},
	changeStatus: function(status) {
		this.getOrderList(this.state.ordersPerPage, 1, this.state.currentShop, status);
		this.setState({currentStatus: status, currentPage: 1});
	},
	changeOrdersPerPage: function(perPage) {
		// Update orders list
		this.getOrderList(perPage, 1, this.state.currentShop, this.state.currentStatus);
		// update this.state
		this.setState({ordersPerPage: perPage, currentPage: 1});
	},
	moveToPage: function(pageIndex) {
		if(this.state.currentPage !== pageIndex) {
			this.getOrderList(this.state.ordersPerPage, pageIndex, this.state.currentShop, this.state.currentStatus);
			this.setState({currentPage: pageIndex});
		}
	},
	render: function() {
		var formReturn = (
			<div className='form-group col-xs-12 col-sm-12'>
				<div className='panel panel-default'>
					<div className='panel-heading'>Orders</div>
					<div className='panel-body'>
						<div className='row'>
							<div className='col-sm-6'>
								<label><DropDownList
									dataList={this.getPageSizes()}
									onChangeData={this.changeOrdersPerPage}
									_class='input-sm'/></label>
							</div>
							<div className="col-sm-6">
								<div className="col-sm-6">
									<DropDownList
										dataList={this.getShops()}
										onChangeData={this.changeShop}
										_class='input-sm'/>
								</div>
								<div className="col-sm-6">
									<DropDownList
										dataList={this.getOrderStatusList()}
										onChangeData={this.changeStatus}
										_class='input-sm'/>
								</div>
							</div>
						</div>
						<div className='table-responsive'>
							<OrderList orderListData={this.state.orderListData} />
						</div>
					</div>
					<Pagination
						pages={this.state.pages}
						currentPage={this.state.currentPage}
						moveToPage={this.moveToPage}/>
				</div>
			</div>
		);

		return formReturn;
	}
});
