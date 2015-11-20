'use strict';

var express = require('express'),
		router = express.Router(),
		categories = require('../../api/controllers/Categories');

router.get('/', categories.loadAllCategories);

module.exports = router;
