'use strict';

var React = require('react'),
    AdminHeader = require('./components/AdminHeader');

var AdminPage = React.createClass({
  render: function() {
    return (
      <div>
        <AdminHeader />
      </div>
    );
  }
});

React.render(
  <AdminPage />,
  document.getElementById('wrapper')
);
