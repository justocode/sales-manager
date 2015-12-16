'use strict';

var request = require('superagent');
var Promise = require('bluebird');

module.exports = {

  addNewOrder: function(newOrder) {
    return new Promise(function(fulfill, reject) {
      request.post('/api/orders')
        .set('Accept', 'application/json')
        .send(newOrder)
        .end(function(err, res) {
          if (err) {
            reject(err);
          }
          fulfill(res.body);
        });
    });
  }

};
