'use strict';

var join = require('path').join,
		express = require('express'),
		session = require('express-session'),
		compression = require('compression'),
		morgan = require('morgan'),
		cookieParser = require('cookie-parser'),
		cookieSession = require('cookie-session'),
		bodyParser = require('body-parser'),
		methodOverride = require('method-override'),
		multer = require('multer'),

		mongoStore = require('connect-mongo')(session),
		winston = require('winston'),
		cons = require('consolidate'),
		pkg = require('../package.json'),
		config = require('../config/config');

var env = process.env.NODE_ENV || 'development';

module.exports = function(app, passport) {

	// compression middleware (should be placed before express.static)
	app.use(compression({
		threshold: 512
	}));

	// setup public client-side folder
	// app.use(express.static(join(config.root, 'build', pkg.version)));
	app.use(express.static(join(config.root, 'public')));

	// Use winston on production
	var log;
	if (env !== 'development') {
		log = {
			stream: {
				write: function (message, encoding) {
					winston.info(message, encoding);
				}
			}
		};
	} else {
		log = 'dev';
	}

	// Don't log during tests
	// Logging middleware
	if (env !== 'test') { app.use(morgan(log)); }

	// setup template engine
	app.engine('html', cons.swig);
	app.set('view engine', 'html');

	// setup views folder
	app.set('views', join(config.root, 'views'));

	// expose package.json to views
	app.use(function (req, res, next) {
		res.locals.pkg = pkg;
		res.locals.env = env;
		next();
	});

	// uncomment after placing your favicon in /public
	// app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(multer());
	app.use(methodOverride(function (req, res) {
		if (req.body && typeof req.body === 'object' && '_method' in req.body) {
			// look in urlencoded POST bodies and delete it
			var method = req.body._method;
			delete req.body._method;
			return method;
		}
	}));

	// CookieParser should be above session
	app.use(cookieParser());
	app.use(cookieSession({ secret: 'secret' }));
	app.use(session({
		resave: true,
		saveUninitialized: true,
		secret: pkg.name,
		store: new mongoStore({
			url: config.db.mongodb,
			collection : 'sessions'
		})
	}));

	// use passport session
	app.use(passport.initialize());
	app.use(passport.session());
};
