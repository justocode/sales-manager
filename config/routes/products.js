'use strict';

var express = require('express'),
		router = express.Router(),
		products = require('../../api/controllers/Products');

router.get('/:perPage/:page/:catId', products.loadAllProductsByCat);
router.get('/:perPage/:page', products.loadAllProductsByCat);

module.exports = router;
