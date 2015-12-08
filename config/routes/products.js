'use strict';

var join = require('path').join,
		router = require('express').Router(),
		products = require('../../api/controllers/Products'),
		config = require('config'),
		multer  = require('multer'),
		upload = multer({ dest: join(config.root, 'public', 'uploads') });

router.get('/:perPage/:page/:catId', products.loadAllProductsByCat);
router.get('/:perPage/:page', products.loadAllProductsByCat);
router.post('', upload.single('image'), products.create);
router.delete('/:productId', products.delete);

module.exports = router;
