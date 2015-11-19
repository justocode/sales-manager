'use strict';

var React = require('react'),
		DropDownList = require('./../components/DropDownList'),
		OrderExportItemRow = require('./../components/OrderExportItemRow');

module.exports = React.createClass({
	getInitialState: function() {
		return ({
			categories: [],
			productList: []
		});
	},
	componentWillMount: function() {
		this.getCategoies();
	},
	componentDidMount: function() {
		this.resetInput();
	},
	getCategoies: function() {
		var getCats = $.get('/api/categories');
		var catList = [];

		getCats.done(function(data) {
				catList = data.categories;
				catList.splice(0, 0, { _id: '', categoryName: 'Choose' });
				this.setState({ categories: catList });
			}.bind(this));

		getCats.fail(function(xhr, status, err) {
				console.error('/api/catigories', status, err.toString());
			});
	},
	getProductsByCat: function(catId) {
		// Get products by Category
		var url = '/api/products/50/1';
		url += catId ? '/'+ catId : '';
		var getProducts = $.get(url);

		getProducts.done(function(data) {
				var newProductList = [{}];
				newProductList = newProductList.concat(data.products);
				this.setState({ productList: newProductList });
			}.bind(this));

		getProducts.fail(function(xhr, status, err) {
				console.error('/api/products', status, err.toString());
			}.bind(this));
	},
	onChangeCategory: function(catId) {
		// update productList
		this.getProductsByCat(catId);
	},
	onChangeProduct: function(productId) {
		var price = 0;
		var index = this.state.productList.map(function(product) {
			return product._id;
		}).indexOf(productId);

		if(index > -1) {
			price = this.state.productList[index].price;
		}

		$('#inputPrice').val(price);

		// and calculate amount
		var quantity = parseInt($('#inputQuantity').val());
		if (quantity && quantity >= 0) {
			$('#inputAmount').val(quantity * parseInt(price));
		} else {
			$('#inputAmount').val(0);
		}
	},
	onChangePrice: function(e) {
		e.preventDefault();

		var price = parseInt($('#inputPrice').val());

		// Calculate amount
		var quantity = parseInt($('#inputQuantity').val());
		if (quantity >= 0 && price >= 0) {
			$('#inputAmount').val(quantity * price);
		}
	},
	pushOrderItem: function(e) {
		e.preventDefault();
		// Push new orderItem to orderItemList
		var newOrderItem = {
			product: React.findDOMNode(this.refs.inputProduct).value || '',
			quantity: parseInt($('#inputQuantity').val()) || 0,
			price: $('#inputPrice').val() || 0,
			discount: $('#inputDiscount').val() || 0,
			amount: $('#inputAmount').val() || 0,
			note: $('#inputNote').val()
		};

		if (this.checkOrderItem(newOrderItem)) {
			this.resetInput();
			this.props.pushOrderItem(newOrderItem);
		}
	},
	checkOrderItem: function(orderItem) {
		var err = true;
		if (orderItem.product.length < 24 || orderItem.quantity < 1) {
			err = false;
		}
		return err;
	},
	resetInput: function() {
		React.findDOMNode(this.refs.inputProduct).value = '';
		$('#inputQuantity').val(0);
		$('#inputPrice').val(0);
		$('#inputDiscount').val(0);
		$('#inputAmount').val(0);
		$('#inputNote').val('');
	},
	render: function() {
		return (
			<div id='newOrderItemList' className='panel panel-default'>
				<div className='panel-heading'>Add new OrderItem</div>
				<table className='table table-bordered table-striped menu-items'>
					<thead>
						<tr>
							<th>No.</th>
							<th>Category</th>
							<th>Product</th>
							<th>Quatity</th>
							<th>Price out</th>
							<th>Amount</th>
							<th>Discount</th>
							<th>Note</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{this.props.orderItems.map(function(orderItem, index) {
							return (
								<OrderExportItemRow
									key={'orderItemRow-' + index}
									index={index}
									rowData={orderItem}
									deleteRow={this.props.pullOrderItem}/>
						)}, this)}
						<tr>
							<td></td>
							<td>
								<DropDownList
									dataList={this.state.categories}
									onChangeData={this.onChangeCategory}
									_key='_id' _value='categoryName'/>
							</td>
							<td>
								<DropDownList
									dataList={this.state.productList}
									onChangeData={this.onChangeProduct}
									_key='_id' _value='productName'
									ref='inputProduct'/>
							</td>
							<td><input type='number' className='form-control' id='inputQuantity' placeholder='quatity' onChange={this.onChangePrice}/></td>
							<td><input type='number' className='form-control' id='inputPrice' placeholder='price' onChange={this.onChangePrice}/></td>
							<td><input className='form-control' id='inputAmount' disabled></input></td>
							<td><input type='number' className='form-control' id='inputDiscount' placeholder='discount'/></td>
							<td><input type='text' className='form-control' id='inputNote' placeholder='note'/></td>
							<td><button id='btnPushOrderItem' className='btn btn-primary col-xs-12 col-sm-12' onClick={this.pushOrderItem}>Add</button></td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
});
