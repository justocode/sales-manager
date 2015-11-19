'use strict';

var React = require('react');

module.exports = React.createClass({
	propTypes: {
		dataList: React.PropTypes.array,
		onChangeData: React.PropTypes.func
	},
	getDefaultProps: function() {
		return {
			_key: 'key',
			_value: 'value',
			_class: ''
		};
	},
	onChangeData: function(e) {
		e.preventDefault();
		var value = e.target.value;
		this.props.onChangeData(value);
	},
	render: function() {
		var propKey = this.props._key;
		var propValue = this.props._value;
		return (
			<select className={'form-control '+ this.props._class} ref={this.props.ref}
							value={this.props.value} onChange={this.onChangeData}>
			{
				this.props.dataList.map(function(data) {
					return (<option key={'opt-'+data[propKey]+propKey} value={data[propKey]}>{data[propValue]}</option>);
				})
			}
			</select>
		);
	}
});
