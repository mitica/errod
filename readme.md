## Errod

80 code lines custom error module for node.

### Usage

```
var errors = require('errod');

errors.create({
  name: 'BaseError',
  message: 'Just an error',
  statusCode: 500,
  log: function(){
    console.error(this.message);
  }
});

errors.create({
  parent: errors.BaseError,
  name: 'InvalidApiKey',
  message: 'Invalid api key',
  statusCode: 401
});

var noApiKey = new errors.InvalidApiKey({details: 'Test error', any: 789});

noApiKey.log();

throw noApiKey;

```