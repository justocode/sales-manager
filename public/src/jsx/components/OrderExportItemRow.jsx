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
	getCategoryName: function (catId) {
		return catId;
	},
	getProductName: function (productId) {
		return productId;
	},
	render: function() {
		var rowData = this.props.rowData;
		return (
			<tr>
				<td>{this.props.index + 1}</td>
				<td>{rowData.category}</td>
				<td>{this.getProductName(rowData.product)}</td>
				<td>{parseInt(rowData.quantity).toLocaleString('en-IN', { maximumSignificantDigits: 3 })}</td>
				<td>{parseInt(rowData.price).toLocaleString('en-IN', { maximumSignificantDigits: 3 })}</td>
				<td>{parseInt(rowData.amount).toLocaleString('en-IN', { maximumSignificantDigits: 3 })}</td>
				<td>{rowData.discount}</td>
				<td>{rowData.note}</td>
				<td><a href='#' onClick={this.deleteRow}>delete</a></td>
			</tr>
		)
	}
});
