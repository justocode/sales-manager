'use strict';

var React = require('react'),
		Pagination = require('./../components/Pagination'),
		DropDownList = require('./../components/DropDownList');

module.exports = React.createClass({
	getInitialState: function() {
		return ({
			orderListData: [],
			categories: [],
			currentCat: '',
			pages: 1,
			currentPage: 1,
			ordersPerPage: 5
		});
	},
	componentWillMount: function() {
		// get categories
		this.getCategoies();
		// get orders
		this.getOrderList(this.state.ordersPerPage, this.state.currentPage);
	},
	getOrderList: function(perPage, page, catId) {
		// Request get orders list
		var url = '/api/orders/'+ perPage +'/'+ page;
		url += catId ? '/'+ catId : '';
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
	getCategoies: function() {
		var getCats = $.get('/api/categories');

		getCats.done(function(data) {
				var cats = data.categories;
				cats.splice(0, 0, { _id: '', categoryName: 'All' });
				this.setState({ categories: cats });
			}.bind(this));

		getCats.fail(function(xhr, status, err) {
				console.error('/api/catigories', status, err.toString());
			}.bind(this));
	},
	changeCategory: function(catId) {
		this.getOrderList(this.state.ordersPerPage, 1, catId);
		this.setState({currentCat: catId, currentPage: 1});
	},
	changeOrdersPerPage: function(perPage) {
		// Update orders list
		this.getOrderList(perPage, 1, this.state.currentCat);
		// update this.state
		this.setState({ordersPerPage: perPage, currentPage: 1});
	},
	moveToPage: function(pageIndex) {
		if(this.state.currentPage !== pageIndex) {
			this.setState({currentPage: pageIndex});

			// Options default
			var perPage = this.state.ordersPerPage,
					page  = pageIndex;

			// Update data list
			this.getOrderList(perPage, page, this.state.currentCat);
		}
	},
	render: function() {
		var pageSizes = [
			{ key: 5, value: 5 },
			{ key: 10, value: 10 },
			{ key: 15, value: 15 },
			{ key: 20, value: 20 },
			{ key: 25, value: 25 }
		];
		var formReturn = (
			<div className='form-group col-xs-12 col-sm-12'>
				<div className='panel panel-default'>
					<div className='panel-heading'>
						orders
					</div>
					<div className='panel-body'>
						<div className='row'>
							<div className='col-sm-6'>
								<label><DropDownList
									dataList={pageSizes}
									onChangeData={this.changeOrdersPerPage}
									_class='input-sm'/></label>
							</div>
							<div className="col-sm-6">
								<DropDownList
									dataList={this.state.categories}
									onChangeData={this.changeCategory}
									_key='_id' _value='categoryName' _class='input-sm'/>
							</div>
						</div>
						<div className='table-responsive'>
							<table className='table table-striped table-bordered table-hover'>
								<thead>
									<tr>
										<th>#</th>
										<th>CreatedAt</th>
										<th>Shop Name</th>
										<th>Order status</th>
										<th>Amount</th>
										<th>Note</th>
									</tr>
								</thead>
								<tbody>
									{
										this.state.orderListData.map(function(order, index) {
											return (
												<tr key={'order-'+order._id}>
												<a href='#'>
													<td>{index}</td>
													<td>{new Date(order.createdAt).toLocaleDateString()}</td>
													<td>{order.shopName}</td>
													<td>{order.orderStatus}</td>
													<td>{parseInt(order.amount).toLocaleString('en-IN', { maximumSignificantDigits: 3 })}</td>
													<td>{order.customerNote}</td>
												</a>
												</tr>
											)
										})
									}
								</tbody>
							</table>
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
