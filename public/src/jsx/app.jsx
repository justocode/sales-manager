'use strict';

var React = require('react'),
		NavigationTop = require('./components/NavigationTop'),
		AboutForm = require('./forms/AboutForm'),
		ProductForm = require('./forms/ProductForm'),
		OrderForm = require('./forms/OrderForm'),
		OrderInForm = require('./forms/OrderImportForm'),
		OrderOutForm = require('./forms/OrderExportForm'),
		LoginForm = require('./forms/LoginForm'),
		ProductFormNew = require('./forms/ProductFormNew');

var MyApp = React.createClass({
	getInitialState: function () {
		var _tabListData = [
			{
				key: 'Home',
				content: ProductFormNew
			},
			{
				key: 'Products',
				content: ProductFormNew
			},
			{
				key: 'Orders',
				content: OrderOutForm
			},
			{
				key: 'About',
				content: AboutForm
			},
			{
				key: 'Login',
				content: LoginForm
			},
		];
		return ({
			currentTab: 'Orders',
			tabListData: _tabListData
		});
	},
	changeTab: function (tabKey) {
		var checkTabKey = this.state.tabListData.map(function (tab) {
			return tab.key === tabKey;
		});
		if(checkTabKey) {
			this.setState({currentTab: tabKey});
		}
	},
	getContentTab: function () {
		var contentTab = this.state.tabListData.filter(function (tab) {
			return (tab.key === this.state.currentTab);
		}, this)[0];

		return contentTab ? contentTab.content : ProductForm;
	},
	render: function () {
		var ContentTab = this.getContentTab();
		var currentForm = (
			<div>
				<NavigationTop
					currentTab={this.state.currentTab}
					tabListData={this.state.tabListData}
					onChangeTab={this.changeTab}/>
				<ContentTab />
			</div>
		);
		return currentForm;
	}
});

React.render(
	<MyApp />,
	document.getElementById('content')
);
