var assert = require('assert');
var errors = require('../lib/errors');

var BaseError = errors.create({
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

var fatal = new FatalError('Super error');

assert(fatal instanceof Error);

var unknown = new UnknownError({
  statusCode: 401,
  message: 'Test error'
});

unknown.log();

console.log(fatal);

try {
  throw unknown;
} catch (e) {
  console.error(e, e.stack);
}
