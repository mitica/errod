var errors = require('../lib/errors');

var FatalError = errors.create({
  name: 'FatalError',
  message: 'Fatal',
  statusCode: 500
});

var UnknownError = errors.create({
  parent: FatalError,
  name: 'UnknownError',
  message: 'Unknown error',
  explanation: 'Some problems'
});

var fatal = new FatalError('Super error');

var unknown = new UnknownError({
  statusCode: 401,
  message: 'Test error'
});


console.log(fatal, fatal.stack);

try {
  throw unknown;
} catch (e) {
  console.error(e, e.stack);
}
