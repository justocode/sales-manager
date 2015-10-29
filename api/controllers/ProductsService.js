'use strict';

exports.productsGet = function(p_name) {

  var examples = {};

  examples['application/json'] = [ {
    "product_id" : "abcxyz123",
    "description" : "Ram for PC",
    "display_name" : "Ram DDRII 1GB",
    "price" : 250000,
    "stock" : 100,
    "image" : "image0001"
  } ];

  if(Object.keys(examples).length > 0) {
    return examples[Object.keys(examples)[0]];
  }

}
