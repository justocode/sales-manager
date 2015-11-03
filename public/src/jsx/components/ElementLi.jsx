'use strict';

var React = require('react'),
    UL = require('./../components/ElementUl');

module.exports = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    url: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string,
    span: React.PropTypes.string,
    sublist: React.PropTypes.objectOf({
      className: React.PropTypes.string,
      list: React.PropTypes.array
    })
  },
  getDefaultProps: function() {
    return {
      className: '',
      url: '#',
      title: 'null',
      icon: '',
      span: '',
      sublist: ''
    };
  },
  render: function() {
    return (
      <li className={this.props.className}>
        <a href={this.props.url}>
          { this.props.icon ? <i className={this.props.icon}></i> : '' }
          { this.props.title }
          { this.props.span ? <span className={this.props.span}></span> : '' }
        </a>
        {
          this.props.sublist && this.props.sublist.list.length > 0 ?
            <UL className={this.props.sublist.className} list={this.props.sublist.list}/> : ''
        }
      </li>
    );
  }
});
