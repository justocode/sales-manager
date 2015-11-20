'use strict';

var React = require('react'),
		InputElm = require('./../components/InputElement'),
		DropDownList = require('./../components/DropDownList'),
		OrderExportItemList = require('./../components/OrderExportItemList');

module.exports = React.createClass({
	getInitialState: function() {
		return ({
			orderItems: []
		});
	},
	getOrderStatusList: function() {
		// Define Order status
		var orderStatus = [
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
				key: '',
				value: ''
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
	componentDidMount: function() {
		$('#inputCreateAt').datetimepicker();
		$('#inputBillingDate').datetimepicker();
	},
	pushOrderItem: function(newItem) {
		// Push new orderItem to orderItems
		var newOrderItems = this.state.orderItems;
		newOrderItems.push(newItem);
		this.setState({orderItems: newOrderItems});
	},
	pullOrderItem: function(index) {
			var newOrderItems = this.state.orderItems;
			newOrderItems.splice(index, 1);
			this.setState({orderItems: newOrderItems});
	},
	addOrder: function(e) {
		e.preventDefault();

		// get total amount from orderItems
		var amountTotal = 0;
		for (var i = 0; i < this.state.orderItems.length; i++) {
			amountTotal += parseInt(this.state.orderItems[i].amount);
		}

		// create new object Order
		var newOrder = {
			orderStatus: React.findDOMNode(this.refs.inputOrderStatus).value,
			createAt: $('#inputCreateAt').data('DateTimePicker').date(),
			billingDate: $('#inputBillingDate').data('DateTimePicker').date(),
			amount: amountTotal,
			shopName: React.findDOMNode(this.refs.inputShopName).value,
			customerName: $('#inputCustomerName').val(),
			customerPhone: $('#inputCustomerPhone').val(),
			customerAddress: $('#inputCustomerAddress').val(),
			customerNote: $('#inputCustomerNote').val(),
			orderItems: this.state.orderItems
		};

		// convert type Date
		if (this.isStringNull(newOrder.createAt)) {
			newOrder.createAt = new Date();
		}
		if (this.isStringNull(newOrder.billingDate)) {
			newOrder.billingDate = new Date();
		}
		newOrder.createAt = newOrder.createAt.toISOString();
		newOrder.billingDate = newOrder.billingDate.toISOString();

		// Checking data inputs not null
		var isError = (
				this.isStringNull(newOrder.customerName) ||
				this.isStringNull(newOrder.customerPhone) ||
				this.isStringNull(newOrder.customerAddress) ||
				this.isStringNull(newOrder.orderItems)
			);

		// Check and make sure is not Error
		if(!isError) {

			var addNewOrder = $.post('/api/orders', newOrder);

			addNewOrder.done(function (data) {
				console.log(data.message);
				this.resetInput();
			}.bind(this));

			addNewOrder.fail(function (xhr, status, err) {
				console.error('/api/orders', status, err.toString());
			});

		} else {
			// If errorCount is more than 0, error out
			console.error('Please fill in all fields');
		}
	},
	resetInput: function() {
		React.findDOMNode(this.refs.inputShopName).value = '';
		React.findDOMNode(this.refs.inputOrderStatus).value = 'opening';
		$('#inputCreateAt').data('DateTimePicker');
		$('#inputBillingDate').data('DateTimePicker');
		$('#inputShopName').val('');
		$('#inputCustomerName').val('');
		$('#inputCustomerPhone').val('');
		$('#inputCustomerAddress').val('');
		$('#inputCustomerNote').val('');
		this.setState({orderItems: []});
	},
	onChangeStatus: function(status) {
		console.log('onChangeStatus()');
	},
	onChangeShop: function(shopId) {
		console.log('onChangeShops()');
	},
	isStringNull: function (str) {
		return (typeof str === undefined) || (str === null) || (str === '');
	},
	render: function() {
		var formReturn = (
			<div className='form-group col-xs-12 col-sm-12'>
				<div className='panel panel-default'>
					<div className='panel-heading heading-button'>
						Create new Order
						<button ref='btnAddOrder' className='btn btn-primary col-xs-2 col-sm-2 pull-right' onClick={this.addOrder}>Save</button>
					</div>
					<fieldset>
						<div className='input-group col-xs-6 col-sm-6 pull-left'>
							<span className='input-group-addon w20'>Shop Name</span>
							<DropDownList
								dataList={this.getShops()}
								onChangeData={this.onChangeShop}
								ref='inputShopName'/>
						</div>
						<InputElm _ref='inputCustomerName' styleClass='pull-right' title='Customer Name' placeholder='customerName'/>

						<div className='input-group col-xs-6 col-sm-6 pull-left'>
							<span className='input-group-addon w20'>Order Status</span>
							<DropDownList
								dataList={this.getOrderStatusList()}
								onChangeData={this.onChangeStatus}
								ref='inputOrderStatus'/>
						</div>
						<InputElm _ref='inputCustomerPhone' styleClass='pull-right' title='Customer Phone' placeholder='customerPhone'/>

						<InputElm _ref='inputCreateAt' styleClass='pull-left' title='Order Date' placeholder=''/>
						<InputElm _ref='inputCustomerAddress' styleClass='pull-right' title='Customer Address' placeholder='customerAddress'/>

						<InputElm _ref='inputBillingDate' styleClass='pull-left' title='Billing Date' placeholder=''/>
						<InputElm _ref='inputCustomerNote' styleClass='pull-right' title='Customer Note' placeholder='customerNote'/>
					</fieldset>
				</div>

				<OrderExportItemList
					orderItems={this.state.orderItems}
					pushOrderItem={this.pushOrderItem}
					pullOrderItem={this.pullOrderItem}/>

			</div>
		);

		return formReturn;
	}
});
