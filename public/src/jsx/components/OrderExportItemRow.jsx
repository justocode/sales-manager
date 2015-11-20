'use strict';

var React = require('react');

module.exports = React.createClass({
	propTypes: {
		deleteRow: React.PropTypes.func.isRequired
	},
	deleteRow: function (e) {
		e.preventDefault();
		// invoke to parent's function
		this.props.deleteRow(this.props.index);
	},
	formatCurrency: function (number) {
		number = number ? number : 0;
		return parseInt(number).toLocaleString('en-IN', { maximumSignificantDigits: 3 });
	},
	render: function() {
		var rowData = this.props.rowData;
		return (
			<tr>
				<td>{this.props.index + 1}</td>
				<td>{rowData.category.categoryName}</td>
				<td>{rowData.product.productName}</td>
				<td>{this.formatCurrency(orderItem.quantity)}</td>
				<td>{this.formatCurrency(orderItem.price)}</td>
				<td>{this.formatCurrency(orderItem.amount)}</td>
				<td>{rowData.discount}</td>
				<td>{rowData.note}</td>
				<td><a href='#' onClick={this.deleteRow}>delete</a></td>
			</tr>
		)
	}
});
