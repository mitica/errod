var errors = module.exports;

errors.Error = Error;
errors.EvalError = EvalError;
errors.RangeError = RangeError;
errors.ReferenceError = ReferenceError;
errors.SyntaxError = SyntaxError;
errors.TypeError = TypeError;
errors.URIError = URIError;

errors.create = function(options) {
  if (!options)
    throw new Error('options is required');

  if (!isString(options.name))
    throw new Error('options.name is required');

  var name = options.name;
  var parent = options.parent || Error;
  delete options.parent;
  delete options.stack;

  if (!isFunction(parent))
    throw new Error('parent must be e function');

  if (errors[name]) return errors[name];

  errors[name] = function error(opts) {
    opts = opts || {};
    delete opts.name;
    delete opts.stack;
    if (isString(opts)) {
      opts = {
        message: opts
      };
    }

    var err = parent.apply(this, arguments);
    var formattedStack;
    var stack={};

    assign(this, options);
    assign(this, opts);

    Error.captureStackTrace(stack, errors[name]);

    Object.defineProperty(this, 'stack', {
      configurable: true,
      enumerable: false,
      get: function() {
        if (!formattedStack) {
          formattedStack = stack.stack.replace('[object Object]', 'Error: ' + this.message);
        }
        return formattedStack;
      }
    });

    return this;
  };

  return errors[name];
};


function isFunction(target) {
  return typeof target === 'function';
}

function isString(target) {
  return typeof target === 'string';
}

function assign(target, obj) {
  for (var prop in obj) {
    target[prop] = obj[prop];
  }
  return target;
}
