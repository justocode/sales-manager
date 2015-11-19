'use strict';

var React = require('react');
var OrderRow = require('./../components/OrderRow');

module.exports = React.createClass({
	render: function() {
		return (
			<div id='orderList' className='panel panel-default'>
				<div className='panel-heading'>Order List</div>
				<table className='table table-bordered table-striped menu-items'>
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
						this.props.orderListData.map(function(product, index) {
							return (
								<OrderRow
									key={'OrderRow-'+index}
									index={index}
									product={product}
									{...this.props}/>
							);
						}, this)
					}
					</tbody>
				</table>
			</div>
		);
	}
});
