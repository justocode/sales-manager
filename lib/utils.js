'use strict';

/**
 * Formats mongoose errors into proper array
 *
 * @param {Array} errors
 * @return {Array}
 * @api public
 */
exports.errors = function (errors) {
	if (typeof errors === 'string') { return [errors]; }

	errors = errors || {};
	var keys = Object.keys(errors);
	var errs = [];

	// if there is no validation error, just display a generic error
	if (!keys) {
		errs.push('Oops! There was an error');
		return errs;
	}

	for(var key in keys) {
		if (errors[key]) { errs.push(errors[key].message); }
	}

	return errs;
};
