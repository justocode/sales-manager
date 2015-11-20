'use strict';

var React = require('react');

module.exports = React.createClass({
	getInitialState: function () {
		return ({
			isShowDetail: false
		});
	},
	showDetail: function () {
		$('tr#'+this.props.product._id).slideToggle().slideToggle();
		this.setState({ isShowDetail: !this.state.isShowDetail });
	},
	deleteProduct: function(e) {
		e.preventDefault();

		var comfirmination = confirm('Are you sure?');

		if(comfirmination) {
			$.ajax({
				type: 'DELETE',
				dataType: 'json',
				url: '/api/products/' + this.props.product._id,
				success: function(product) {
					if(!$.isEmptyObject(product)) {
						console.log('Delete product successfully!');
						this.props.deleteCallback(product._id);
					}
				}.bind(this),
				error: function(xhr, status, err) {
					console.error('/api/products', status, err.toString());
				}
			});
		}
	},
	render: function() {
		return (
			this.state.isShowDetail ?
				<ProductDetail showDetail={this.showDetail} product={this.props.product}/>
				:
				<ProductInfo showDetail={this.showDetail} product={this.props.product}/>
		);
	}
});

var ProductDetail = React.createClass({
	render: function () {
		var product = this.props.product;
		return (
			<tr id={product._id}>
				<td colSpan='7'>
					<div className='panel panel-default'>
						<div className='panel-heading heading-button' onClick={this.props.showDetail}>
							Product Detail
						</div>
						<div className='col-sm-6'>
							<img src={product.image.cdnUri + '/mini_' + product.image.files[0]} alt={product.image.cdnUri} className='img-rounded pull-left'/>
						</div>
						<div className='col-sm-6'>
							<p>Shop Name: <span>{product.productName}</span></p>
							<p>Category: <span>{product.category.categoryName}</span></p>
							<p>Price: <span>{formatCurrency(product.price)}</span></p>
							<p>Stock: <span>{formatCurrency(product.stock)}</span></p>
							<p>Create Date: <span>{new Date(product.createdAt).toLocaleDateString()}</span></p>
							<p>Description: <span>{product.description}</span></p>
						</div>
					</div>
				</td>
			</tr>
		);
	}
});

var ProductInfo = React.createClass({
	render: function () {
		var product = this.props.product;
		return (
			<tr id={product._id} onClick={this.props.showDetail}>
				<td>{this.props.index}</td>
				<td>{product.productName}</td>
				<td>{product.category.categoryName}</td>
				<td className='text-right'>{formatCurrency(product.price)}</td>
				<td className='text-right'>{formatCurrency(product.stock)}</td>
				<td>{product.description}</td>
				<td><a href='#' onClick={this.deleteProduct}>delete</a></td>
			</tr>
		);
	}
});

var TextInfo = React.createClass({
	render: function () {
		return (
			<div className={'input-group col-xs-6 col-sm-6 '+this.props.styleClass}>
				<span className='input-group-addon w20'>{this.props.title}</span>
				<input className='form-control disabled' value={this.props.value}/>
			</div>
		)
	}
});

function formatCurrency (number) {
	number = number ? number : 0;
	// return parseInt(number).toLocaleString('de-DE', { style: 'currency', currency: 'VND' })
	return parseInt(number).toLocaleString('en-IN', { maximumSignificantDigits: 3 });
}
