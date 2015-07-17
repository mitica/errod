'use strict';

var errors = require('../lib/errors');
var assert = require('assert');

errors.create({
	log: function() {
		console.log('error:', this.message);
	},
	name: 'BaseError',
	message: 'Base',
	statusCode: 500
});

var FatalError = errors.create({
	parent: errors.BaseError,
	name: 'FatalError',
	message: 'Fatal'
});

var UnknownError = errors.create({
	parent: FatalError,
	name: 'UnknownError',
	message: 'Unknown error',
	details: 'Some problems'
});

describe('Errors', function() {
	it('BaseError', function() {
		var error = new errors.BaseError();
		assert.equal('Base', error.message);
		assert.throws(function() {
			throw error;
		});
		error = new errors.BaseError({
			message: 'My message',
			foo: 102
		});
		assert.equal('My message', error.message);
		assert.equal(102, error.foo);
	});

	it('FatalError', function() {
		var error = new errors.FatalError();
		if (!(error instanceof FatalError)) {
			throw error;
		}
		assert.equal('Fatal', error.message);
		assert.equal('FatalError', error.name);
		error = new FatalError({
			message: 'Error',
			foo: 102
		});
		assert.equal('Error', error.message);
		assert.equal(102, error.foo);
	});
});
