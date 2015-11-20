'use strict';

var express = require('express'),
		router = express.Router(),
		orders = require('../../api/controllers/Orders');

router.post('/', orders.create);

module.exports = router;
