'use strict';

var React = require('react'),
		DropDownList = require('./../components/DropDownList'),
		OrderExportItemRow = require('./../components/OrderExportItemRow');

module.exports = React.createClass({
	getInitialState: function() {
		return ({
			categories: [],
			products: []
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
		if (catId !== '') {
			var url = '/api/products/50/1';
			url += '/'+ catId;
			var getProducts = $.get(url);

			getProducts.done(function(data) {
					var newProducts = [{}];
					newProducts = newProducts.concat(data.products);
					this.setState({ products: newProducts });
				}.bind(this));

			getProducts.fail(function(xhr, status, err) {
					console.error('/api/products', status, err.toString());
				}.bind(this));
		}
		else {
			this.setState({ products: [] });
			this.resetInput();
		}
	},
	onChangeCategory: function(catId) {
		// update products
		this.getProductsByCat(catId);
	},
	onChangeProduct: function(productId) {
		var price = 0;
		var index = this.state.products.map(function(product) {
			return product._id;
		}).indexOf(productId);

		if(index > -1) {
			price = parseInt(this.state.products[index].price);
		}
		$('#inputPrice').val(price.toLocaleString('en-IN', { maximumSignificantDigits: 3 }));

		var quantity = parseInt($('#inputQuantity').val());
		var discount = parseInt($('#inputDiscount').val());

		// and calculate amount
		if (quantity && quantity >= 0) {
			var amount = quantity * price;
			if (discount > 0 && discount <= 100) {
				amount = amount - (amount * discount) / 100;
			}
			$('#inputAmount').val(amount.toLocaleString('en-IN', { maximumSignificantDigits: 3 }));
		} else {
			$('#inputAmount').val(0);
		}
	},
	onChangePrice: function(e) {
		e.preventDefault();

		var price = $('#inputPrice').val();
		price = parseInt(this.removeComma(price));
		var quantity = parseInt($('#inputQuantity').val());
		var discount = parseInt($('#inputDiscount').val());

		// Calculate amount
		if (quantity >= 0 && price >= 0) {
			var amount = quantity * price;
			if (discount > 0 && discount <= 100) {
				amount = amount - (amount * discount) / 100;
			}
			$('#inputAmount').val(amount.toLocaleString('en-IN', { maximumSignificantDigits: 3 }));
		}
	},
	pushOrderItem: function(e) {
		e.preventDefault();

		var _categoryId = React.findDOMNode(this.refs.inputCategory).value || '',
				_catName = '';
		for (var i = 0; i < this.state.categories.length; i++) {
			if (this.state.categories[i]._id == _categoryId) {
				_catName = this.state.categories[i].categoryName;
				break;
			}
		}
		var _productId = React.findDOMNode(this.refs.inputProduct).value || '',
				_productName = '';
		for (var j = 0; j < this.state.products.length; j++) {
			if (this.state.products[j]._id === _productId) {
				_productName = this.state.products[j].productName;
				break;
			}
		}
		var _quantity = this.removeComma($('#inputQuantity').val()) || 0;
		var _price = this.removeComma($('#inputPrice').val()) || 0;
		var _discount = this.removeComma($('#inputDiscount').val()) || 0;
		var _amount = this.removeComma($('#inputAmount').val()) || 0;
		var _note = $('#inputNote').val();

		// Push new orderItem to orderItemList
		var newOrderItem = {
			category: _catName,
			productName: _productName,
			product: _productId,
			quantity: _quantity,
			price: _price,
			discount: _discount,
			amount: _amount,
			note: _note
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
	removeComma: function (str) {
		return str.replace(/[^0-9.]/g, '');
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
							<th>Discount(%)</th>
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
								<DropDownList ref='inputCategory'
									dataList={this.state.categories}
									onChangeData={this.onChangeCategory}
									_key='_id' _value='categoryName'/>
							</td>
							<td>
								<DropDownList ref='inputProduct'
									dataList={this.state.products}
									onChangeData={this.onChangeProduct}
									_key='_id' _value='productName'/>
							</td>
							<td><input type='number' className='form-control' id='inputQuantity' placeholder='0' onChange={this.onChangePrice}/></td>
							<td><input type='text' className='form-control' id='inputPrice' disabled placeholder='0' onChange={this.onChangePrice}/></td>
							<td><input type='text' className='form-control' id='inputAmount' disabled></input></td>
							<td><input type='number' className='form-control' id='inputDiscount' placeholder='0' onChange={this.onChangePrice}/></td>
							<td><input type='text' className='form-control' id='inputNote' placeholder='note'/></td>
							<td><button id='btnPushOrderItem' className='btn btn-primary col-xs-12 col-sm-12' onClick={this.pushOrderItem}>Add</button></td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
});
