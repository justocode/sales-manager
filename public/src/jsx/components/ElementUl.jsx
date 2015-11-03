'use strict';

var React = require('react'),
    LI = require('./../components/ElementLi');

module.exports = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    list: React.PropTypes.array
  },
  getDefaultProps: function() {
    return {
      className: '',
      list: []
    };
  },
  render: function() {
    return (
      <ul className={this.props.className}>
      {
        this.props.list.map(function(li) {
          return (
            <LI className={li.className}
              url={li.url}
              title={li.title}
              icon={li.icon}
              span={li.span}
              sublist={li.sublist}/>
          );
        })
      }
      </ul>
    );
  }
});
