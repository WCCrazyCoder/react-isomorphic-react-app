webpackJsonp([1],[
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(23);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(17);

var ReactCurrentOwner = __webpack_require__(18);

var warning = __webpack_require__(6);
var canDefineProperty = __webpack_require__(19);
var hasOwnProperty = Object.prototype.hasOwnProperty;

var REACT_ELEMENT_TYPE = __webpack_require__(36);

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown, specialPropRefWarningShown;

function hasValidRef(config) {
  if (process.env.NODE_ENV !== 'production') {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  if (process.env.NODE_ENV !== 'production') {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  if (process.env.NODE_ENV !== 'production') {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    if (canDefineProperty) {
      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      });
      // self and source are DEV only properties.
      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      });
      // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.
      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });
    } else {
      element._store.validated = false;
      element._self = self;
      element._source = source;
    }
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
 */
ReactElement.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    if (process.env.NODE_ENV !== 'production') {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
};

/**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
 */
ReactElement.createFactory = function (type) {
  var factory = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory.type = type;
  return factory;
};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
 */
ReactElement.cloneElement = function (element, config, children) {
  var propName;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
};

/**
 * Verifies the object is a ReactElement.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement.isValidElement = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
};

module.exports = ReactElement;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */


/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

function reactProdInvariant(code) {
  var argCount = arguments.length - 1;

  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

  for (var argIdx = 0; argIdx < argCount; argIdx++) {
    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
  }

  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

  var error = new Error(message);
  error.name = 'Invariant Violation';
  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

  throw error;
}

module.exports = reactProdInvariant;

/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {

  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null

};

module.exports = ReactCurrentOwner;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var canDefineProperty = false;
if (process.env.NODE_ENV !== 'production') {
  try {
    // $FlowFixMe https://github.com/facebook/flow/issues/285
    Object.defineProperty({}, 'x', { get: function () {} });
    canDefineProperty = true;
  } catch (x) {
    // IE will fail on defineProperty
  }
}

module.exports = canDefineProperty;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(11);

var ReactNoopUpdateQueue = __webpack_require__(27);

var canDefineProperty = __webpack_require__(19);
var emptyObject = __webpack_require__(24);
var invariant = __webpack_require__(7);
var warning = __webpack_require__(6);

/**
 * Base class helpers for the updating state of a component.
 */
function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

ReactComponent.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
ReactComponent.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : _prodInvariant('85') : void 0;
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
ReactComponent.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'forceUpdate');
  }
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
if (process.env.NODE_ENV !== 'production') {
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    if (canDefineProperty) {
      Object.defineProperty(ReactComponent.prototype, methodName, {
        get: function () {
          process.env.NODE_ENV !== 'production' ? warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]) : void 0;
          return undefined;
        }
      });
    }
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

module.exports = ReactComponent;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(11);

var ReactCurrentOwner = __webpack_require__(18);

var invariant = __webpack_require__(7);
var warning = __webpack_require__(6);

function isNative(fn) {
  // Based on isNative() from Lodash
  var funcToString = Function.prototype.toString;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var reIsNative = RegExp('^' + funcToString
  // Take an example native function source for comparison
  .call(hasOwnProperty)
  // Strip regex characters so we can use it for regex
  .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  // Remove hasOwnProperty from the template to make it generic
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  try {
    var source = funcToString.call(fn);
    return reIsNative.test(source);
  } catch (err) {
    return false;
  }
}

var canUseCollections =
// Array.from
typeof Array.from === 'function' &&
// Map
typeof Map === 'function' && isNative(Map) &&
// Map.prototype.keys
Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
// Set
typeof Set === 'function' && isNative(Set) &&
// Set.prototype.keys
Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

var setItem;
var getItem;
var removeItem;
var getItemIDs;
var addRoot;
var removeRoot;
var getRootIDs;

if (canUseCollections) {
  var itemMap = new Map();
  var rootIDSet = new Set();

  setItem = function (id, item) {
    itemMap.set(id, item);
  };
  getItem = function (id) {
    return itemMap.get(id);
  };
  removeItem = function (id) {
    itemMap['delete'](id);
  };
  getItemIDs = function () {
    return Array.from(itemMap.keys());
  };

  addRoot = function (id) {
    rootIDSet.add(id);
  };
  removeRoot = function (id) {
    rootIDSet['delete'](id);
  };
  getRootIDs = function () {
    return Array.from(rootIDSet.keys());
  };
} else {
  var itemByKey = {};
  var rootByKey = {};

  // Use non-numeric keys to prevent V8 performance issues:
  // https://github.com/facebook/react/pull/7232
  var getKeyFromID = function (id) {
    return '.' + id;
  };
  var getIDFromKey = function (key) {
    return parseInt(key.substr(1), 10);
  };

  setItem = function (id, item) {
    var key = getKeyFromID(id);
    itemByKey[key] = item;
  };
  getItem = function (id) {
    var key = getKeyFromID(id);
    return itemByKey[key];
  };
  removeItem = function (id) {
    var key = getKeyFromID(id);
    delete itemByKey[key];
  };
  getItemIDs = function () {
    return Object.keys(itemByKey).map(getIDFromKey);
  };

  addRoot = function (id) {
    var key = getKeyFromID(id);
    rootByKey[key] = true;
  };
  removeRoot = function (id) {
    var key = getKeyFromID(id);
    delete rootByKey[key];
  };
  getRootIDs = function () {
    return Object.keys(rootByKey).map(getIDFromKey);
  };
}

var unmountedIDs = [];

function purgeDeep(id) {
  var item = getItem(id);
  if (item) {
    var childIDs = item.childIDs;

    removeItem(id);
    childIDs.forEach(purgeDeep);
  }
}

function describeComponentFrame(name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
}

function getDisplayName(element) {
  if (element == null) {
    return '#empty';
  } else if (typeof element === 'string' || typeof element === 'number') {
    return '#text';
  } else if (typeof element.type === 'string') {
    return element.type;
  } else {
    return element.type.displayName || element.type.name || 'Unknown';
  }
}

function describeID(id) {
  var name = ReactComponentTreeHook.getDisplayName(id);
  var element = ReactComponentTreeHook.getElement(id);
  var ownerID = ReactComponentTreeHook.getOwnerID(id);
  var ownerName;
  if (ownerID) {
    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
  }
  process.env.NODE_ENV !== 'production' ? warning(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id) : void 0;
  return describeComponentFrame(name, element && element._source, ownerName);
}

var ReactComponentTreeHook = {
  onSetChildren: function (id, nextChildIDs) {
    var item = getItem(id);
    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.childIDs = nextChildIDs;

    for (var i = 0; i < nextChildIDs.length; i++) {
      var nextChildID = nextChildIDs[i];
      var nextChild = getItem(nextChildID);
      !nextChild ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('140') : void 0;
      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : _prodInvariant('141') : void 0;
      !nextChild.isMounted ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
      if (nextChild.parentID == null) {
        nextChild.parentID = id;
        // TODO: This shouldn't be necessary but mounting a new root during in
        // componentWillMount currently causes not-yet-mounted components to
        // be purged from our tree data so their parent id is missing.
      }
      !(nextChild.parentID === id) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('142', nextChildID, nextChild.parentID, id) : void 0;
    }
  },
  onBeforeMountComponent: function (id, element, parentID) {
    var item = {
      element: element,
      parentID: parentID,
      text: null,
      childIDs: [],
      isMounted: false,
      updateCount: 0
    };
    setItem(id, item);
  },
  onBeforeUpdateComponent: function (id, element) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.element = element;
  },
  onMountComponent: function (id) {
    var item = getItem(id);
    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.isMounted = true;
    var isRoot = item.parentID === 0;
    if (isRoot) {
      addRoot(id);
    }
  },
  onUpdateComponent: function (id) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.updateCount++;
  },
  onUnmountComponent: function (id) {
    var item = getItem(id);
    if (item) {
      // We need to check if it exists.
      // `item` might not exist if it is inside an error boundary, and a sibling
      // error boundary child threw while mounting. Then this instance never
      // got a chance to mount, but it still gets an unmounting event during
      // the error boundary cleanup.
      item.isMounted = false;
      var isRoot = item.parentID === 0;
      if (isRoot) {
        removeRoot(id);
      }
    }
    unmountedIDs.push(id);
  },
  purgeUnmountedComponents: function () {
    if (ReactComponentTreeHook._preventPurging) {
      // Should only be used for testing.
      return;
    }

    for (var i = 0; i < unmountedIDs.length; i++) {
      var id = unmountedIDs[i];
      purgeDeep(id);
    }
    unmountedIDs.length = 0;
  },
  isMounted: function (id) {
    var item = getItem(id);
    return item ? item.isMounted : false;
  },
  getCurrentStackAddendum: function (topElement) {
    var info = '';
    if (topElement) {
      var name = getDisplayName(topElement);
      var owner = topElement._owner;
      info += describeComponentFrame(name, topElement._source, owner && owner.getName());
    }

    var currentOwner = ReactCurrentOwner.current;
    var id = currentOwner && currentOwner._debugID;

    info += ReactComponentTreeHook.getStackAddendumByID(id);
    return info;
  },
  getStackAddendumByID: function (id) {
    var info = '';
    while (id) {
      info += describeID(id);
      id = ReactComponentTreeHook.getParentID(id);
    }
    return info;
  },
  getChildIDs: function (id) {
    var item = getItem(id);
    return item ? item.childIDs : [];
  },
  getDisplayName: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element) {
      return null;
    }
    return getDisplayName(element);
  },
  getElement: function (id) {
    var item = getItem(id);
    return item ? item.element : null;
  },
  getOwnerID: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element || !element._owner) {
      return null;
    }
    return element._owner._debugID;
  },
  getParentID: function (id) {
    var item = getItem(id);
    return item ? item.parentID : null;
  },
  getSource: function (id) {
    var item = getItem(id);
    var element = item ? item.element : null;
    var source = element != null ? element._source : null;
    return source;
  },
  getText: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (typeof element === 'string') {
      return element;
    } else if (typeof element === 'number') {
      return '' + element;
    } else {
      return null;
    }
  },
  getUpdateCount: function (id) {
    var item = getItem(id);
    return item ? item.updateCount : 0;
  },


  getRootIDs: getRootIDs,
  getRegisteredIDs: getItemIDs
};

module.exports = ReactComponentTreeHook;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var warning = __webpack_require__(6);

function warnNoop(publicInstance, callerName) {
  if (process.env.NODE_ENV !== 'production') {
    var constructor = publicInstance.constructor;
    process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass') : void 0;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {

  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Enqueue a callback that will be executed after all the pending updates
   * have processed.
   *
   * @param {ReactClass} publicInstance The instance to use as `this` context.
   * @param {?function} callback Called after state is updated.
   * @internal
   */
  enqueueCallback: function (publicInstance, callback) {},

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState) {
    warnNoop(publicInstance, 'setState');
  }
};

module.exports = ReactNoopUpdateQueue;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(83);


/***/ }),
/* 34 */,
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.

var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

module.exports = REACT_ELEMENT_TYPE;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */



var ReactCurrentOwner = __webpack_require__(18);
var ReactComponentTreeHook = __webpack_require__(26);
var ReactElement = __webpack_require__(10);

var checkReactTypeSpec = __webpack_require__(91);

var canDefineProperty = __webpack_require__(19);
var getIteratorFn = __webpack_require__(39);
var warning = __webpack_require__(6);

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = ReactCurrentOwner.current.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return ' Check your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = ' Check the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var memoizer = ownerHasKeyUseWarning.uniqueKey || (ownerHasKeyUseWarning.uniqueKey = {});

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (memoizer[currentComponentErrorInfo]) {
    return;
  }
  memoizer[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
  }

  process.env.NODE_ENV !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, ReactComponentTreeHook.getCurrentStackAddendum(element)) : void 0;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (ReactElement.isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (ReactElement.isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    // Entry iterators provide implicit keys.
    if (iteratorFn) {
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (ReactElement.isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  if (componentClass.propTypes) {
    checkReactTypeSpec(componentClass.propTypes, element.props, 'prop', name, element, null);
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    process.env.NODE_ENV !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
  }
}

var ReactElementValidator = {

  createElement: function (type, props, children) {
    var validType = typeof type === 'string' || typeof type === 'function';
    // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.
    if (!validType) {
      if (typeof type !== 'function' && typeof type !== 'string') {
        var info = '';
        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + 'it\'s defined in.';
        }

        var sourceInfo = getSourceInfoErrorAddendum(props);
        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        info += ReactComponentTreeHook.getCurrentStackAddendum();

        process.env.NODE_ENV !== 'production' ? warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info) : void 0;
      }
    }

    var element = ReactElement.createElement.apply(this, arguments);

    // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.
    if (element == null) {
      return element;
    }

    // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    validatePropTypes(element);

    return element;
  },

  createFactory: function (type) {
    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
    // Legacy hook TODO: Warn if this is accessed
    validatedFactory.type = type;

    if (process.env.NODE_ENV !== 'production') {
      if (canDefineProperty) {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function () {
            process.env.NODE_ENV !== 'production' ? warning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.') : void 0;
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
    }

    return validatedFactory;
  },

  cloneElement: function (element, props, children) {
    var newElement = ReactElement.cloneElement.apply(this, arguments);
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    return newElement;
  }

};

module.exports = ReactElementValidator;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var ReactPropTypeLocationNames = {};

if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
}

module.exports = ReactPropTypeLocationNames;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/* global Symbol */

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

/**
 * Returns the iterator method function contained on the iterable object.
 *
 * Be sure to invoke the function with the iterable as context:
 *
 *     var iteratorFn = getIteratorFn(myIterable);
 *     if (iteratorFn) {
 *       var iterator = iteratorFn.call(myIterable);
 *       ...
 *     }
 *
 * @param {?object} maybeIterable
 * @return {?function}
 */
function getIteratorFn(maybeIterable) {
  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}

module.exports = getIteratorFn;

/***/ }),
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;/**
 * ReactDOM v15.5.4
 *
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
!function(e){if(true)module.exports=e(__webpack_require__(33));else if("function"==typeof define&&define.amd)define(["react"],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.ReactDOM=e(t.React)}}(function(e){return function(t){return function(){return function e(t,n,r){function o(a,s){if(!n[a]){if(!t[a]){var u="function"==typeof require&&require;if(!s&&u)return require(a,!0);if(i)return require(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var c=n[a]={exports:{}};t[a][0].call(c.exports,function(e){var n=t[a][1][e];return o(n||e)},c,c.exports,e,t,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(e,t,n){"use strict";var r={Properties:{"aria-current":0,"aria-details":0,"aria-disabled":0,"aria-hidden":0,"aria-invalid":0,"aria-keyshortcuts":0,"aria-label":0,"aria-roledescription":0,"aria-autocomplete":0,"aria-checked":0,"aria-expanded":0,"aria-haspopup":0,"aria-level":0,"aria-modal":0,"aria-multiline":0,"aria-multiselectable":0,"aria-orientation":0,"aria-placeholder":0,"aria-pressed":0,"aria-readonly":0,"aria-required":0,"aria-selected":0,"aria-sort":0,"aria-valuemax":0,"aria-valuemin":0,"aria-valuenow":0,"aria-valuetext":0,"aria-atomic":0,"aria-busy":0,"aria-live":0,"aria-relevant":0,"aria-dropeffect":0,"aria-grabbed":0,"aria-activedescendant":0,"aria-colcount":0,"aria-colindex":0,"aria-colspan":0,"aria-controls":0,"aria-describedby":0,"aria-errormessage":0,"aria-flowto":0,"aria-labelledby":0,"aria-owns":0,"aria-posinset":0,"aria-rowcount":0,"aria-rowindex":0,"aria-rowspan":0,"aria-setsize":0},DOMAttributeNames:{},DOMPropertyNames:{}};t.exports=r},{}],2:[function(e,t,n){"use strict";var r=e(33),o=e(131),i={focusDOMComponent:function(){o(r.getNodeFromInstance(this))}};t.exports=i},{131:131,33:33}],3:[function(e,t,n){"use strict";function r(e){return(e.ctrlKey||e.altKey||e.metaKey)&&!(e.ctrlKey&&e.altKey)}function o(e){switch(e){case"topCompositionStart":return T.compositionStart;case"topCompositionEnd":return T.compositionEnd;case"topCompositionUpdate":return T.compositionUpdate}}function i(e,t){return"topKeyDown"===e&&t.keyCode===y}function a(e,t){switch(e){case"topKeyUp":return-1!==g.indexOf(t.keyCode);case"topKeyDown":return t.keyCode!==y;case"topKeyPress":case"topMouseDown":case"topBlur":return!0;default:return!1}}function s(e){var t=e.detail;return"object"==typeof t&&"data"in t?t.data:null}function u(e,t,n,r){var u,l;if(_?u=o(e):P?a(e,n)&&(u=T.compositionEnd):i(e,n)&&(u=T.compositionStart),!u)return null;E&&(P||u!==T.compositionStart?u===T.compositionEnd&&P&&(l=P.getData()):P=h.getPooled(r));var c=m.getPooled(u,t,n,r);if(l)c.data=l;else{var p=s(n);null!==p&&(c.data=p)}return d.accumulateTwoPhaseDispatches(c),c}function l(e,t){switch(e){case"topCompositionEnd":return s(t);case"topKeyPress":return t.which!==x?null:(k=!0,w);case"topTextInput":var n=t.data;return n===w&&k?null:n;default:return null}}function c(e,t){if(P){if("topCompositionEnd"===e||!_&&a(e,t)){var n=P.getData();return h.release(P),P=null,n}return null}switch(e){case"topPaste":return null;case"topKeyPress":return t.which&&!r(t)?String.fromCharCode(t.which):null;case"topCompositionEnd":return E?null:t.data;default:return null}}function p(e,t,n,r){var o;if(!(o=b?l(e,n):c(e,n)))return null;var i=v.getPooled(T.beforeInput,t,n,r);return i.data=o,d.accumulateTwoPhaseDispatches(i),i}var d=e(19),f=e(123),h=e(20),m=e(78),v=e(82),g=[9,13,27,32],y=229,_=f.canUseDOM&&"CompositionEvent"in window,C=null;f.canUseDOM&&"documentMode"in document&&(C=document.documentMode);var b=f.canUseDOM&&"TextEvent"in window&&!C&&!function(){var e=window.opera;return"object"==typeof e&&"function"==typeof e.version&&parseInt(e.version(),10)<=12}(),E=f.canUseDOM&&(!_||C&&C>8&&C<=11),x=32,w=String.fromCharCode(x),T={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["topCompositionEnd","topKeyPress","topTextInput","topPaste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:["topBlur","topCompositionEnd","topKeyDown","topKeyPress","topKeyUp","topMouseDown"]},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",captured:"onCompositionStartCapture"},dependencies:["topBlur","topCompositionStart","topKeyDown","topKeyPress","topKeyUp","topMouseDown"]},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:["topBlur","topCompositionUpdate","topKeyDown","topKeyPress","topKeyUp","topMouseDown"]}},k=!1,P=null,S={eventTypes:T,extractEvents:function(e,t,n,r){return[u(e,t,n,r),p(e,t,n,r)]}};t.exports=S},{123:123,19:19,20:20,78:78,82:82}],4:[function(e,t,n){"use strict";function r(e,t){return e+t.charAt(0).toUpperCase()+t.substring(1)}var o={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridRow:!0,gridColumn:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},i=["Webkit","ms","Moz","O"];Object.keys(o).forEach(function(e){i.forEach(function(t){o[r(t,e)]=o[e]})});var a={background:{backgroundAttachment:!0,backgroundColor:!0,backgroundImage:!0,backgroundPositionX:!0,backgroundPositionY:!0,backgroundRepeat:!0},backgroundPosition:{backgroundPositionX:!0,backgroundPositionY:!0},border:{borderWidth:!0,borderStyle:!0,borderColor:!0},borderBottom:{borderBottomWidth:!0,borderBottomStyle:!0,borderBottomColor:!0},borderLeft:{borderLeftWidth:!0,borderLeftStyle:!0,borderLeftColor:!0},borderRight:{borderRightWidth:!0,borderRightStyle:!0,borderRightColor:!0},borderTop:{borderTopWidth:!0,borderTopStyle:!0,borderTopColor:!0},font:{fontStyle:!0,fontVariant:!0,fontWeight:!0,fontSize:!0,lineHeight:!0,fontFamily:!0},outline:{outlineWidth:!0,outlineStyle:!0,outlineColor:!0}},s={isUnitlessNumber:o,shorthandPropertyExpansions:a};t.exports=s},{}],5:[function(e,t,n){"use strict";var r=e(4),o=e(123),i=(e(58),e(125),e(94)),a=e(136),s=e(140),u=(e(142),s(function(e){return a(e)})),l=!1,c="cssFloat";if(o.canUseDOM){var p=document.createElement("div").style;try{p.font=""}catch(e){l=!0}void 0===document.documentElement.style.cssFloat&&(c="styleFloat")}var d={createMarkupForStyles:function(e,t){var n="";for(var r in e)if(e.hasOwnProperty(r)){var o=e[r];null!=o&&(n+=u(r)+":",n+=i(r,o,t)+";")}return n||null},setValueForStyles:function(e,t,n){var o=e.style;for(var a in t)if(t.hasOwnProperty(a)){var s=i(a,t[a],n);if("float"!==a&&"cssFloat"!==a||(a=c),s)o[a]=s;else{var u=l&&r.shorthandPropertyExpansions[a];if(u)for(var p in u)o[p]="";else o[a]=""}}}};t.exports=d},{123:123,125:125,136:136,140:140,142:142,4:4,58:58,94:94}],6:[function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=e(112),i=e(24),a=(e(137),function(){function e(t){r(this,e),this._callbacks=null,this._contexts=null,this._arg=t}return e.prototype.enqueue=function(e,t){this._callbacks=this._callbacks||[],this._callbacks.push(e),this._contexts=this._contexts||[],this._contexts.push(t)},e.prototype.notifyAll=function(){var e=this._callbacks,t=this._contexts,n=this._arg;if(e&&t){e.length!==t.length&&o("24"),this._callbacks=null,this._contexts=null;for(var r=0;r<e.length;r++)e[r].call(t[r],n);e.length=0,t.length=0}},e.prototype.checkpoint=function(){return this._callbacks?this._callbacks.length:0},e.prototype.rollback=function(e){this._callbacks&&this._contexts&&(this._callbacks.length=e,this._contexts.length=e)},e.prototype.reset=function(){this._callbacks=null,this._contexts=null},e.prototype.destructor=function(){this.reset()},e}());t.exports=i.addPoolingTo(a)},{112:112,137:137,24:24}],7:[function(e,t,n){"use strict";function r(e){var t=e.nodeName&&e.nodeName.toLowerCase();return"select"===t||"input"===t&&"file"===e.type}function o(e){var t=w.getPooled(S.change,M,e,T(e));C.accumulateTwoPhaseDispatches(t),x.batchedUpdates(i,t)}function i(e){_.enqueueEvents(e),_.processEventQueue(!1)}function a(e,t){N=e,M=t,N.attachEvent("onchange",o)}function s(){N&&(N.detachEvent("onchange",o),N=null,M=null)}function u(e,t){if("topChange"===e)return t}function l(e,t,n){"topFocus"===e?(s(),a(t,n)):"topBlur"===e&&s()}function c(e,t){N=e,M=t,I=e.value,O=Object.getOwnPropertyDescriptor(e.constructor.prototype,"value"),Object.defineProperty(N,"value",D),N.attachEvent?N.attachEvent("onpropertychange",d):N.addEventListener("propertychange",d,!1)}function p(){N&&(delete N.value,N.detachEvent?N.detachEvent("onpropertychange",d):N.removeEventListener("propertychange",d,!1),N=null,M=null,I=null,O=null)}function d(e){if("value"===e.propertyName){var t=e.srcElement.value;t!==I&&(I=t,o(e))}}function f(e,t){if("topInput"===e)return t}function h(e,t,n){"topFocus"===e?(p(),c(t,n)):"topBlur"===e&&p()}function m(e,t){if(("topSelectionChange"===e||"topKeyUp"===e||"topKeyDown"===e)&&N&&N.value!==I)return I=N.value,M}function v(e){return e.nodeName&&"input"===e.nodeName.toLowerCase()&&("checkbox"===e.type||"radio"===e.type)}function g(e,t){if("topClick"===e)return t}function y(e,t){if(null!=e){var n=e._wrapperState||t._wrapperState;if(n&&n.controlled&&"number"===t.type){var r=""+t.value;t.getAttribute("value")!==r&&t.setAttribute("value",r)}}}var _=e(16),C=e(19),b=e(123),E=e(33),x=e(71),w=e(80),T=e(102),k=e(109),P=e(110),S={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:["topBlur","topChange","topClick","topFocus","topInput","topKeyDown","topKeyUp","topSelectionChange"]}},N=null,M=null,I=null,O=null,R=!1;b.canUseDOM&&(R=k("change")&&(!document.documentMode||document.documentMode>8));var A=!1;b.canUseDOM&&(A=k("input")&&(!document.documentMode||document.documentMode>11));var D={get:function(){return O.get.call(this)},set:function(e){I=""+e,O.set.call(this,e)}},L={eventTypes:S,extractEvents:function(e,t,n,o){var i,a,s=t?E.getNodeFromInstance(t):window;if(r(s)?R?i=u:a=l:P(s)?A?i=f:(i=m,a=h):v(s)&&(i=g),i){var c=i(e,t);if(c){var p=w.getPooled(S.change,c,n,o);return p.type="change",C.accumulateTwoPhaseDispatches(p),p}}a&&a(e,s,t),"topBlur"===e&&y(t,s)}};t.exports=L},{102:102,109:109,110:110,123:123,16:16,19:19,33:33,71:71,80:80}],8:[function(e,t,n){"use strict";function r(e,t){return Array.isArray(t)&&(t=t[1]),t?t.nextSibling:e.firstChild}function o(e,t,n){c.insertTreeBefore(e,t,n)}function i(e,t,n){Array.isArray(t)?s(e,t[0],t[1],n):m(e,t,n)}function a(e,t){if(Array.isArray(t)){var n=t[1];t=t[0],u(e,t,n),e.removeChild(n)}e.removeChild(t)}function s(e,t,n,r){for(var o=t;;){var i=o.nextSibling;if(m(e,o,r),o===n)break;o=i}}function u(e,t,n){for(;;){var r=t.nextSibling;if(r===n)break;e.removeChild(r)}}function l(e,t,n){var r=e.parentNode,o=e.nextSibling;o===t?n&&m(r,document.createTextNode(n),o):n?(h(o,n),u(r,o,t)):u(r,e,t)}var c=e(9),p=e(13),d=(e(33),e(58),e(93)),f=e(114),h=e(115),m=d(function(e,t,n){e.insertBefore(t,n)}),v=p.dangerouslyReplaceNodeWithMarkup,g={dangerouslyReplaceNodeWithMarkup:v,replaceDelimitedText:l,processUpdates:function(e,t){for(var n=0;n<t.length;n++){var s=t[n];switch(s.type){case"INSERT_MARKUP":o(e,s.content,r(e,s.afterNode));break;case"MOVE_EXISTING":i(e,s.fromNode,r(e,s.afterNode));break;case"SET_MARKUP":f(e,s.content);break;case"TEXT_CONTENT":h(e,s.content);break;case"REMOVE_NODE":a(e,s.fromNode)}}}};t.exports=g},{114:114,115:115,13:13,33:33,58:58,9:9,93:93}],9:[function(e,t,n){"use strict";function r(e){if(h){var t=e.node,n=e.children;if(n.length)for(var r=0;r<n.length;r++)m(t,n[r],null);else null!=e.html?p(t,e.html):null!=e.text&&f(t,e.text)}}function o(e,t){e.parentNode.replaceChild(t.node,e),r(t)}function i(e,t){h?e.children.push(t):e.node.appendChild(t.node)}function a(e,t){h?e.html=t:p(e.node,t)}function s(e,t){h?e.text=t:f(e.node,t)}function u(){return this.node.nodeName}function l(e){return{node:e,children:[],html:null,text:null,toString:u}}var c=e(10),p=e(114),d=e(93),f=e(115),h="undefined"!=typeof document&&"number"==typeof document.documentMode||"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent&&/\bEdge\/\d/.test(navigator.userAgent),m=d(function(e,t,n){11===t.node.nodeType||1===t.node.nodeType&&"object"===t.node.nodeName.toLowerCase()&&(null==t.node.namespaceURI||t.node.namespaceURI===c.html)?(r(t),e.insertBefore(t.node,n)):(e.insertBefore(t.node,n),r(t))});l.insertTreeBefore=m,l.replaceChildWithTree=o,l.queueChild=i,l.queueHTML=a,l.queueText=s,t.exports=l},{10:10,114:114,115:115,93:93}],10:[function(e,t,n){"use strict";var r={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};t.exports=r},{}],11:[function(e,t,n){"use strict";function r(e,t){return(e&t)===t}var o=e(112),i=(e(137),{MUST_USE_PROPERTY:1,HAS_BOOLEAN_VALUE:4,HAS_NUMERIC_VALUE:8,HAS_POSITIVE_NUMERIC_VALUE:24,HAS_OVERLOADED_BOOLEAN_VALUE:32,injectDOMPropertyConfig:function(e){var t=i,n=e.Properties||{},a=e.DOMAttributeNamespaces||{},u=e.DOMAttributeNames||{},l=e.DOMPropertyNames||{},c=e.DOMMutationMethods||{};e.isCustomAttribute&&s._isCustomAttributeFunctions.push(e.isCustomAttribute);for(var p in n){s.properties.hasOwnProperty(p)&&o("48",p);var d=p.toLowerCase(),f=n[p],h={attributeName:d,attributeNamespace:null,propertyName:p,mutationMethod:null,mustUseProperty:r(f,t.MUST_USE_PROPERTY),hasBooleanValue:r(f,t.HAS_BOOLEAN_VALUE),hasNumericValue:r(f,t.HAS_NUMERIC_VALUE),hasPositiveNumericValue:r(f,t.HAS_POSITIVE_NUMERIC_VALUE),hasOverloadedBooleanValue:r(f,t.HAS_OVERLOADED_BOOLEAN_VALUE)};if(h.hasBooleanValue+h.hasNumericValue+h.hasOverloadedBooleanValue<=1||o("50",p),u.hasOwnProperty(p)){var m=u[p];h.attributeName=m}a.hasOwnProperty(p)&&(h.attributeNamespace=a[p]),l.hasOwnProperty(p)&&(h.propertyName=l[p]),c.hasOwnProperty(p)&&(h.mutationMethod=c[p]),s.properties[p]=h}}}),a=":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",s={ID_ATTRIBUTE_NAME:"data-reactid",ROOT_ATTRIBUTE_NAME:"data-reactroot",ATTRIBUTE_NAME_START_CHAR:a,ATTRIBUTE_NAME_CHAR:a+"\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040",properties:{},getPossibleStandardName:null,_isCustomAttributeFunctions:[],isCustomAttribute:function(e){for(var t=0;t<s._isCustomAttributeFunctions.length;t++)if((0,s._isCustomAttributeFunctions[t])(e))return!0;return!1},injection:i};t.exports=s},{112:112,137:137}],12:[function(e,t,n){"use strict";function r(e){return!!l.hasOwnProperty(e)||!u.hasOwnProperty(e)&&(s.test(e)?(l[e]=!0,!0):(u[e]=!0,!1))}function o(e,t){return null==t||e.hasBooleanValue&&!t||e.hasNumericValue&&isNaN(t)||e.hasPositiveNumericValue&&t<1||e.hasOverloadedBooleanValue&&!1===t}var i=e(11),a=(e(33),e(58),e(111)),s=(e(142),new RegExp("^["+i.ATTRIBUTE_NAME_START_CHAR+"]["+i.ATTRIBUTE_NAME_CHAR+"]*$")),u={},l={},c={createMarkupForID:function(e){return i.ID_ATTRIBUTE_NAME+"="+a(e)},setAttributeForID:function(e,t){e.setAttribute(i.ID_ATTRIBUTE_NAME,t)},createMarkupForRoot:function(){return i.ROOT_ATTRIBUTE_NAME+'=""'},setAttributeForRoot:function(e){e.setAttribute(i.ROOT_ATTRIBUTE_NAME,"")},createMarkupForProperty:function(e,t){var n=i.properties.hasOwnProperty(e)?i.properties[e]:null;if(n){if(o(n,t))return"";var r=n.attributeName;return n.hasBooleanValue||n.hasOverloadedBooleanValue&&!0===t?r+'=""':r+"="+a(t)}return i.isCustomAttribute(e)?null==t?"":e+"="+a(t):null},createMarkupForCustomAttribute:function(e,t){return r(e)&&null!=t?e+"="+a(t):""},setValueForProperty:function(e,t,n){var r=i.properties.hasOwnProperty(t)?i.properties[t]:null;if(r){var a=r.mutationMethod;if(a)a(e,n);else{if(o(r,n))return void this.deleteValueForProperty(e,t);if(r.mustUseProperty)e[r.propertyName]=n;else{var s=r.attributeName,u=r.attributeNamespace;u?e.setAttributeNS(u,s,""+n):r.hasBooleanValue||r.hasOverloadedBooleanValue&&!0===n?e.setAttribute(s,""):e.setAttribute(s,""+n)}}}else if(i.isCustomAttribute(t))return void c.setValueForAttribute(e,t,n)},setValueForAttribute:function(e,t,n){r(t)&&(null==n?e.removeAttribute(t):e.setAttribute(t,""+n))},deleteValueForAttribute:function(e,t){e.removeAttribute(t)},deleteValueForProperty:function(e,t){var n=i.properties.hasOwnProperty(t)?i.properties[t]:null;if(n){var r=n.mutationMethod;if(r)r(e,void 0);else if(n.mustUseProperty){var o=n.propertyName;n.hasBooleanValue?e[o]=!1:e[o]=""}else e.removeAttribute(n.attributeName)}else i.isCustomAttribute(t)&&e.removeAttribute(t)}};t.exports=c},{11:11,111:111,142:142,33:33,58:58}],13:[function(e,t,n){"use strict";var r=e(112),o=e(9),i=e(123),a=e(128),s=e(129),u=(e(137),{dangerouslyReplaceNodeWithMarkup:function(e,t){if(i.canUseDOM||r("56"),t||r("57"),"HTML"===e.nodeName&&r("58"),"string"==typeof t){var n=a(t,s)[0];e.parentNode.replaceChild(n,e)}else o.replaceChildWithTree(e,t)}});t.exports=u},{112:112,123:123,128:128,129:129,137:137,9:9}],14:[function(e,t,n){"use strict";var r=["ResponderEventPlugin","SimpleEventPlugin","TapEventPlugin","EnterLeaveEventPlugin","ChangeEventPlugin","SelectEventPlugin","BeforeInputEventPlugin"];t.exports=r},{}],15:[function(e,t,n){"use strict";var r=e(19),o=e(33),i=e(84),a={mouseEnter:{registrationName:"onMouseEnter",dependencies:["topMouseOut","topMouseOver"]},mouseLeave:{registrationName:"onMouseLeave",dependencies:["topMouseOut","topMouseOver"]}},s={eventTypes:a,extractEvents:function(e,t,n,s){if("topMouseOver"===e&&(n.relatedTarget||n.fromElement))return null;if("topMouseOut"!==e&&"topMouseOver"!==e)return null;var u;if(s.window===s)u=s;else{var l=s.ownerDocument;u=l?l.defaultView||l.parentWindow:window}var c,p;if("topMouseOut"===e){c=t;var d=n.relatedTarget||n.toElement;p=d?o.getClosestInstanceFromNode(d):null}else c=null,p=t;if(c===p)return null;var f=null==c?u:o.getNodeFromInstance(c),h=null==p?u:o.getNodeFromInstance(p),m=i.getPooled(a.mouseLeave,c,n,s);m.type="mouseleave",m.target=f,m.relatedTarget=h;var v=i.getPooled(a.mouseEnter,p,n,s);return v.type="mouseenter",v.target=h,v.relatedTarget=f,r.accumulateEnterLeaveDispatches(m,v,c,p),[m,v]}};t.exports=s},{19:19,33:33,84:84}],16:[function(e,t,n){"use strict";function r(e){return"button"===e||"input"===e||"select"===e||"textarea"===e}function o(e,t,n){switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":return!(!n.disabled||!r(t));default:return!1}}var i=e(112),a=e(17),s=e(18),u=e(50),l=e(91),c=e(98),p=(e(137),{}),d=null,f=function(e,t){e&&(s.executeDispatchesInOrder(e,t),e.isPersistent()||e.constructor.release(e))},h=function(e){return f(e,!0)},m=function(e){return f(e,!1)},v=function(e){return"."+e._rootNodeID},g={injection:{injectEventPluginOrder:a.injectEventPluginOrder,injectEventPluginsByName:a.injectEventPluginsByName},putListener:function(e,t,n){"function"!=typeof n&&i("94",t,typeof n);var r=v(e);(p[t]||(p[t]={}))[r]=n;var o=a.registrationNameModules[t];o&&o.didPutListener&&o.didPutListener(e,t,n)},getListener:function(e,t){var n=p[t];if(o(t,e._currentElement.type,e._currentElement.props))return null;var r=v(e);return n&&n[r]},deleteListener:function(e,t){var n=a.registrationNameModules[t];n&&n.willDeleteListener&&n.willDeleteListener(e,t);var r=p[t];r&&delete r[v(e)]},deleteAllListeners:function(e){var t=v(e);for(var n in p)if(p.hasOwnProperty(n)&&p[n][t]){var r=a.registrationNameModules[n];r&&r.willDeleteListener&&r.willDeleteListener(e,n),delete p[n][t]}},extractEvents:function(e,t,n,r){for(var o,i=a.plugins,s=0;s<i.length;s++){var u=i[s];if(u){var c=u.extractEvents(e,t,n,r);c&&(o=l(o,c))}}return o},enqueueEvents:function(e){e&&(d=l(d,e))},processEventQueue:function(e){var t=d;d=null,e?c(t,h):c(t,m),d&&i("95"),u.rethrowCaughtError()},__purge:function(){p={}},__getListenerBank:function(){return p}};t.exports=g},{112:112,137:137,17:17,18:18,50:50,91:91,98:98}],17:[function(e,t,n){"use strict";function r(){if(s)for(var e in u){var t=u[e],n=s.indexOf(e);if(n>-1||a("96",e),!l.plugins[n]){t.extractEvents||a("97",e),l.plugins[n]=t;var r=t.eventTypes;for(var i in r)o(r[i],t,i)||a("98",i,e)}}}function o(e,t,n){l.eventNameDispatchConfigs.hasOwnProperty(n)&&a("99",n),l.eventNameDispatchConfigs[n]=e;var r=e.phasedRegistrationNames;if(r){for(var o in r)if(r.hasOwnProperty(o)){var s=r[o];i(s,t,n)}return!0}return!!e.registrationName&&(i(e.registrationName,t,n),!0)}function i(e,t,n){l.registrationNameModules[e]&&a("100",e),l.registrationNameModules[e]=t,l.registrationNameDependencies[e]=t.eventTypes[n].dependencies}var a=e(112),s=(e(137),null),u={},l={plugins:[],eventNameDispatchConfigs:{},registrationNameModules:{},registrationNameDependencies:{},possibleRegistrationNames:null,injectEventPluginOrder:function(e){s&&a("101"),s=Array.prototype.slice.call(e),r()},injectEventPluginsByName:function(e){var t=!1;for(var n in e)if(e.hasOwnProperty(n)){var o=e[n];u.hasOwnProperty(n)&&u[n]===o||(u[n]&&a("102",n),u[n]=o,t=!0)}t&&r()},getPluginModuleForEvent:function(e){var t=e.dispatchConfig;if(t.registrationName)return l.registrationNameModules[t.registrationName]||null;if(void 0!==t.phasedRegistrationNames){var n=t.phasedRegistrationNames;for(var r in n)if(n.hasOwnProperty(r)){var o=l.registrationNameModules[n[r]];if(o)return o}}return null},_resetEventPlugins:function(){s=null;for(var e in u)u.hasOwnProperty(e)&&delete u[e];l.plugins.length=0;var t=l.eventNameDispatchConfigs;for(var n in t)t.hasOwnProperty(n)&&delete t[n];var r=l.registrationNameModules;for(var o in r)r.hasOwnProperty(o)&&delete r[o]}};t.exports=l},{112:112,137:137}],18:[function(e,t,n){"use strict";function r(e){return"topMouseUp"===e||"topTouchEnd"===e||"topTouchCancel"===e}function o(e){return"topMouseMove"===e||"topTouchMove"===e}function i(e){return"topMouseDown"===e||"topTouchStart"===e}function a(e,t,n,r){var o=e.type||"unknown-event";e.currentTarget=g.getNodeFromInstance(r),t?m.invokeGuardedCallbackWithCatch(o,n,e):m.invokeGuardedCallback(o,n,e),e.currentTarget=null}function s(e,t){var n=e._dispatchListeners,r=e._dispatchInstances;if(Array.isArray(n))for(var o=0;o<n.length&&!e.isPropagationStopped();o++)a(e,t,n[o],r[o]);else n&&a(e,t,n,r);e._dispatchListeners=null,e._dispatchInstances=null}function u(e){var t=e._dispatchListeners,n=e._dispatchInstances;if(Array.isArray(t)){for(var r=0;r<t.length&&!e.isPropagationStopped();r++)if(t[r](e,n[r]))return n[r]}else if(t&&t(e,n))return n;return null}function l(e){var t=u(e);return e._dispatchInstances=null,e._dispatchListeners=null,t}function c(e){var t=e._dispatchListeners,n=e._dispatchInstances;Array.isArray(t)&&h("103"),e.currentTarget=t?g.getNodeFromInstance(n):null;var r=t?t(e):null;return e.currentTarget=null,e._dispatchListeners=null,e._dispatchInstances=null,r}function p(e){return!!e._dispatchListeners}var d,f,h=e(112),m=e(50),v=(e(137),e(142),{injectComponentTree:function(e){d=e},injectTreeTraversal:function(e){f=e}}),g={isEndish:r,isMoveish:o,isStartish:i,executeDirectDispatch:c,executeDispatchesInOrder:s,executeDispatchesInOrderStopAtTrue:l,hasDispatches:p,getInstanceFromNode:function(e){return d.getInstanceFromNode(e)},getNodeFromInstance:function(e){return d.getNodeFromInstance(e)},isAncestor:function(e,t){return f.isAncestor(e,t)},getLowestCommonAncestor:function(e,t){return f.getLowestCommonAncestor(e,t)},getParentInstance:function(e){return f.getParentInstance(e)},traverseTwoPhase:function(e,t,n){return f.traverseTwoPhase(e,t,n)},traverseEnterLeave:function(e,t,n,r,o){return f.traverseEnterLeave(e,t,n,r,o)},injection:v};t.exports=g},{112:112,137:137,142:142,50:50}],19:[function(e,t,n){"use strict";function r(e,t,n){var r=t.dispatchConfig.phasedRegistrationNames[n];return g(e,r)}function o(e,t,n){var o=r(e,n,t);o&&(n._dispatchListeners=m(n._dispatchListeners,o),n._dispatchInstances=m(n._dispatchInstances,e))}function i(e){e&&e.dispatchConfig.phasedRegistrationNames&&h.traverseTwoPhase(e._targetInst,o,e)}function a(e){if(e&&e.dispatchConfig.phasedRegistrationNames){var t=e._targetInst,n=t?h.getParentInstance(t):null;h.traverseTwoPhase(n,o,e)}}function s(e,t,n){if(n&&n.dispatchConfig.registrationName){var r=n.dispatchConfig.registrationName,o=g(e,r);o&&(n._dispatchListeners=m(n._dispatchListeners,o),n._dispatchInstances=m(n._dispatchInstances,e))}}function u(e){e&&e.dispatchConfig.registrationName&&s(e._targetInst,null,e)}function l(e){v(e,i)}function c(e){v(e,a)}function p(e,t,n,r){h.traverseEnterLeave(n,r,s,e,t)}function d(e){v(e,u)}var f=e(16),h=e(18),m=e(91),v=e(98),g=(e(142),f.getListener),y={accumulateTwoPhaseDispatches:l,accumulateTwoPhaseDispatchesSkipTarget:c,accumulateDirectDispatches:d,accumulateEnterLeaveDispatches:p};t.exports=y},{142:142,16:16,18:18,91:91,98:98}],20:[function(e,t,n){"use strict";function r(e){this._root=e,this._startText=this.getText(),this._fallbackText=null}var o=e(143),i=e(24),a=e(106);o(r.prototype,{destructor:function(){this._root=null,this._startText=null,this._fallbackText=null},getText:function(){return"value"in this._root?this._root.value:this._root[a()]},getData:function(){if(this._fallbackText)return this._fallbackText;var e,t,n=this._startText,r=n.length,o=this.getText(),i=o.length;for(e=0;e<r&&n[e]===o[e];e++);var a=r-e;for(t=1;t<=a&&n[r-t]===o[i-t];t++);var s=t>1?1-t:void 0;return this._fallbackText=o.slice(e,s),this._fallbackText}}),i.addPoolingTo(r),t.exports=r},{106:106,143:143,24:24}],21:[function(e,t,n){"use strict";var r=e(11),o=r.injection.MUST_USE_PROPERTY,i=r.injection.HAS_BOOLEAN_VALUE,a=r.injection.HAS_NUMERIC_VALUE,s=r.injection.HAS_POSITIVE_NUMERIC_VALUE,u=r.injection.HAS_OVERLOADED_BOOLEAN_VALUE,l={isCustomAttribute:RegExp.prototype.test.bind(new RegExp("^(data|aria)-["+r.ATTRIBUTE_NAME_CHAR+"]*$")),Properties:{accept:0,acceptCharset:0,accessKey:0,action:0,allowFullScreen:i,allowTransparency:0,alt:0,as:0,async:i,autoComplete:0,autoPlay:i,capture:i,cellPadding:0,cellSpacing:0,charSet:0,challenge:0,checked:o|i,cite:0,classID:0,className:0,cols:s,colSpan:0,content:0,contentEditable:0,contextMenu:0,controls:i,coords:0,crossOrigin:0,data:0,dateTime:0,default:i,defer:i,dir:0,disabled:i,download:u,draggable:0,encType:0,form:0,formAction:0,formEncType:0,formMethod:0,formNoValidate:i,formTarget:0,frameBorder:0,headers:0,height:0,hidden:i,high:0,href:0,hrefLang:0,htmlFor:0,httpEquiv:0,icon:0,id:0,inputMode:0,integrity:0,is:0,keyParams:0,keyType:0,kind:0,label:0,lang:0,list:0,loop:i,low:0,manifest:0,marginHeight:0,marginWidth:0,max:0,maxLength:0,media:0,mediaGroup:0,method:0,min:0,minLength:0,multiple:o|i,muted:o|i,name:0,nonce:0,noValidate:i,open:i,optimum:0,pattern:0,placeholder:0,playsInline:i,poster:0,preload:0,profile:0,radioGroup:0,readOnly:i,referrerPolicy:0,rel:0,required:i,reversed:i,role:0,rows:s,rowSpan:a,sandbox:0,scope:0,scoped:i,scrolling:0,seamless:i,selected:o|i,shape:0,size:s,sizes:0,span:s,spellCheck:0,src:0,srcDoc:0,srcLang:0,srcSet:0,start:a,step:0,style:0,summary:0,tabIndex:0,target:0,title:0,type:0,useMap:0,value:0,width:0,wmode:0,wrap:0,about:0,datatype:0,inlist:0,prefix:0,property:0,resource:0,typeof:0,vocab:0,autoCapitalize:0,autoCorrect:0,autoSave:0,color:0,itemProp:0,itemScope:i,itemType:0,itemID:0,itemRef:0,results:0,security:0,unselectable:0},DOMAttributeNames:{acceptCharset:"accept-charset",className:"class",htmlFor:"for",httpEquiv:"http-equiv"},DOMPropertyNames:{},DOMMutationMethods:{value:function(e,t){if(null==t)return e.removeAttribute("value");"number"!==e.type||!1===e.hasAttribute("value")?e.setAttribute("value",""+t):e.validity&&!e.validity.badInput&&e.ownerDocument.activeElement!==e&&e.setAttribute("value",""+t)}}};t.exports=l},{11:11}],22:[function(e,t,n){"use strict";function r(e){var t={"=":"=0",":":"=2"};return"$"+(""+e).replace(/[=:]/g,function(e){return t[e]})}function o(e){var t={"=0":"=","=2":":"};return(""+("."===e[0]&&"$"===e[1]?e.substring(2):e.substring(1))).replace(/(=0|=2)/g,function(e){return t[e]})}var i={escape:r,unescape:o};t.exports=i},{}],23:[function(e,t,n){"use strict";function r(e){null!=e.checkedLink&&null!=e.valueLink&&s("87")}function o(e){r(e),(null!=e.value||null!=e.onChange)&&s("88")}function i(e){r(e),(null!=e.checked||null!=e.onChange)&&s("89")}function a(e){if(e){var t=e.getName();if(t)return" Check the render method of `"+t+"`."}return""}var s=e(112),u=e(64),l=e(145),c=e(120),p=l(c.isValidElement),d=(e(137),e(142),{button:!0,checkbox:!0,image:!0,hidden:!0,radio:!0,reset:!0,submit:!0}),f={value:function(e,t,n){return!e[t]||d[e.type]||e.onChange||e.readOnly||e.disabled?null:new Error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.")},checked:function(e,t,n){return!e[t]||e.onChange||e.readOnly||e.disabled?null:new Error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.")},onChange:p.func},h={},m={checkPropTypes:function(e,t,n){for(var r in f){if(f.hasOwnProperty(r))var o=f[r](t,r,e,"prop",null,u);o instanceof Error&&!(o.message in h)&&(h[o.message]=!0,a(n))}},getValue:function(e){return e.valueLink?(o(e),e.valueLink.value):e.value},getChecked:function(e){return e.checkedLink?(i(e),e.checkedLink.value):e.checked},executeOnChange:function(e,t){return e.valueLink?(o(e),e.valueLink.requestChange(t.target.value)):e.checkedLink?(i(e),e.checkedLink.requestChange(t.target.checked)):e.onChange?e.onChange.call(void 0,t):void 0}};t.exports=m},{112:112,120:120,137:137,142:142,145:145,64:64}],24:[function(e,t,n){"use strict";var r=e(112),o=(e(137),function(e){var t=this;if(t.instancePool.length){var n=t.instancePool.pop();return t.call(n,e),n}return new t(e)}),i=function(e,t){var n=this;if(n.instancePool.length){var r=n.instancePool.pop();return n.call(r,e,t),r}return new n(e,t)},a=function(e,t,n){var r=this;if(r.instancePool.length){var o=r.instancePool.pop();return r.call(o,e,t,n),o}return new r(e,t,n)},s=function(e,t,n,r){var o=this;if(o.instancePool.length){var i=o.instancePool.pop();return o.call(i,e,t,n,r),i}return new o(e,t,n,r)},u=function(e){var t=this;e instanceof t||r("25"),e.destructor(),t.instancePool.length<t.poolSize&&t.instancePool.push(e)},l=o,c=function(e,t){var n=e;return n.instancePool=[],n.getPooled=t||l,n.poolSize||(n.poolSize=10),n.release=u,n},p={addPoolingTo:c,oneArgumentPooler:o,twoArgumentPooler:i,threeArgumentPooler:a,fourArgumentPooler:s};t.exports=p},{112:112,137:137}],25:[function(e,t,n){"use strict";function r(e){return Object.prototype.hasOwnProperty.call(e,m)||(e[m]=f++,p[e[m]]={}),p[e[m]]}var o,i=e(143),a=e(17),s=e(51),u=e(90),l=e(107),c=e(109),p={},d=!1,f=0,h={topAbort:"abort",topAnimationEnd:l("animationend")||"animationend",topAnimationIteration:l("animationiteration")||"animationiteration",topAnimationStart:l("animationstart")||"animationstart",topBlur:"blur",topCanPlay:"canplay",topCanPlayThrough:"canplaythrough",topChange:"change",topClick:"click",topCompositionEnd:"compositionend",topCompositionStart:"compositionstart",topCompositionUpdate:"compositionupdate",topContextMenu:"contextmenu",topCopy:"copy",topCut:"cut",topDoubleClick:"dblclick",topDrag:"drag",topDragEnd:"dragend",topDragEnter:"dragenter",topDragExit:"dragexit",topDragLeave:"dragleave",topDragOver:"dragover",topDragStart:"dragstart",topDrop:"drop",topDurationChange:"durationchange",topEmptied:"emptied",topEncrypted:"encrypted",topEnded:"ended",topError:"error",
topFocus:"focus",topInput:"input",topKeyDown:"keydown",topKeyPress:"keypress",topKeyUp:"keyup",topLoadedData:"loadeddata",topLoadedMetadata:"loadedmetadata",topLoadStart:"loadstart",topMouseDown:"mousedown",topMouseMove:"mousemove",topMouseOut:"mouseout",topMouseOver:"mouseover",topMouseUp:"mouseup",topPaste:"paste",topPause:"pause",topPlay:"play",topPlaying:"playing",topProgress:"progress",topRateChange:"ratechange",topScroll:"scroll",topSeeked:"seeked",topSeeking:"seeking",topSelectionChange:"selectionchange",topStalled:"stalled",topSuspend:"suspend",topTextInput:"textInput",topTimeUpdate:"timeupdate",topTouchCancel:"touchcancel",topTouchEnd:"touchend",topTouchMove:"touchmove",topTouchStart:"touchstart",topTransitionEnd:l("transitionend")||"transitionend",topVolumeChange:"volumechange",topWaiting:"waiting",topWheel:"wheel"},m="_reactListenersID"+String(Math.random()).slice(2),v=i({},s,{ReactEventListener:null,injection:{injectReactEventListener:function(e){e.setHandleTopLevel(v.handleTopLevel),v.ReactEventListener=e}},setEnabled:function(e){v.ReactEventListener&&v.ReactEventListener.setEnabled(e)},isEnabled:function(){return!(!v.ReactEventListener||!v.ReactEventListener.isEnabled())},listenTo:function(e,t){for(var n=t,o=r(n),i=a.registrationNameDependencies[e],s=0;s<i.length;s++){var u=i[s];o.hasOwnProperty(u)&&o[u]||("topWheel"===u?c("wheel")?v.ReactEventListener.trapBubbledEvent("topWheel","wheel",n):c("mousewheel")?v.ReactEventListener.trapBubbledEvent("topWheel","mousewheel",n):v.ReactEventListener.trapBubbledEvent("topWheel","DOMMouseScroll",n):"topScroll"===u?c("scroll",!0)?v.ReactEventListener.trapCapturedEvent("topScroll","scroll",n):v.ReactEventListener.trapBubbledEvent("topScroll","scroll",v.ReactEventListener.WINDOW_HANDLE):"topFocus"===u||"topBlur"===u?(c("focus",!0)?(v.ReactEventListener.trapCapturedEvent("topFocus","focus",n),v.ReactEventListener.trapCapturedEvent("topBlur","blur",n)):c("focusin")&&(v.ReactEventListener.trapBubbledEvent("topFocus","focusin",n),v.ReactEventListener.trapBubbledEvent("topBlur","focusout",n)),o.topBlur=!0,o.topFocus=!0):h.hasOwnProperty(u)&&v.ReactEventListener.trapBubbledEvent(u,h[u],n),o[u]=!0)}},trapBubbledEvent:function(e,t,n){return v.ReactEventListener.trapBubbledEvent(e,t,n)},trapCapturedEvent:function(e,t,n){return v.ReactEventListener.trapCapturedEvent(e,t,n)},supportsEventPageXY:function(){if(!document.createEvent)return!1;var e=document.createEvent("MouseEvent");return null!=e&&"pageX"in e},ensureScrollValueMonitoring:function(){if(void 0===o&&(o=v.supportsEventPageXY()),!o&&!d){var e=u.refreshScrollValues;v.ReactEventListener.monitorScrollValue(e),d=!0}}});t.exports=v},{107:107,109:109,143:143,17:17,51:51,90:90}],26:[function(e,t,n){(function(n){"use strict";function r(e,t,n,r){var o=void 0===e[n];null!=t&&o&&(e[n]=i(t,!0))}var o=e(66),i=e(108),a=(e(22),e(116)),s=e(117);e(142);void 0!==n&&n.env;var u={instantiateChildren:function(e,t,n,o){if(null==e)return null;var i={};return s(e,r,i),i},updateChildren:function(e,t,n,r,s,u,l,c,p){if(t||e){var d,f;for(d in t)if(t.hasOwnProperty(d)){f=e&&e[d];var h=f&&f._currentElement,m=t[d];if(null!=f&&a(h,m))o.receiveComponent(f,m,s,c),t[d]=f;else{f&&(r[d]=o.getHostNode(f),o.unmountComponent(f,!1));var v=i(m,!0);t[d]=v;var g=o.mountComponent(v,s,u,l,c,p);n.push(g)}}for(d in e)!e.hasOwnProperty(d)||t&&t.hasOwnProperty(d)||(f=e[d],r[d]=o.getHostNode(f),o.unmountComponent(f,!1))}},unmountChildren:function(e,t){for(var n in e)if(e.hasOwnProperty(n)){var r=e[n];o.unmountComponent(r,t)}}};t.exports=u}).call(this,void 0)},{108:108,116:116,117:117,142:142,22:22,66:66}],27:[function(e,t,n){"use strict";var r=e(8),o=e(37),i={processChildrenUpdates:o.dangerouslyProcessChildrenUpdates,replaceNodeWithMarkup:r.dangerouslyReplaceNodeWithMarkup};t.exports=i},{37:37,8:8}],28:[function(e,t,n){"use strict";var r=e(112),o=(e(137),!1),i={replaceNodeWithMarkup:null,processChildrenUpdates:null,injection:{injectEnvironment:function(e){o&&r("104"),i.replaceNodeWithMarkup=e.replaceNodeWithMarkup,i.processChildrenUpdates=e.processChildrenUpdates,o=!0}}};t.exports=i},{112:112,137:137}],29:[function(e,t,n){"use strict";function r(e){}function o(e){return!(!e.prototype||!e.prototype.isReactComponent)}function i(e){return!(!e.prototype||!e.prototype.isPureReactComponent)}var a=e(112),s=e(143),u=e(120),l=e(28),c=e(119),p=e(50),d=e(57),f=(e(58),e(62)),h=e(66),m=e(130),v=(e(137),e(141)),g=e(116),y=(e(142),{ImpureClass:0,PureClass:1,StatelessFunctional:2});r.prototype.render=function(){var e=d.get(this)._currentElement.type,t=e(this.props,this.context,this.updater);return t};var _=1,C={construct:function(e){this._currentElement=e,this._rootNodeID=0,this._compositeType=null,this._instance=null,this._hostParent=null,this._hostContainerInfo=null,this._updateBatchNumber=null,this._pendingElement=null,this._pendingStateQueue=null,this._pendingReplaceState=!1,this._pendingForceUpdate=!1,this._renderedNodeType=null,this._renderedComponent=null,this._context=null,this._mountOrder=0,this._topLevelWrapper=null,this._pendingCallbacks=null,this._calledComponentWillUnmount=!1},mountComponent:function(e,t,n,s){this._context=s,this._mountOrder=_++,this._hostParent=t,this._hostContainerInfo=n;var l,c=this._currentElement.props,p=this._processContext(s),f=this._currentElement.type,h=e.getUpdateQueue(),v=o(f),g=this._constructComponent(v,c,p,h);v||null!=g&&null!=g.render?i(f)?this._compositeType=y.PureClass:this._compositeType=y.ImpureClass:(l=g,null===g||!1===g||u.isValidElement(g)||a("105",f.displayName||f.name||"Component"),g=new r(f),this._compositeType=y.StatelessFunctional),g.props=c,g.context=p,g.refs=m,g.updater=h,this._instance=g,d.set(g,this);var C=g.state;void 0===C&&(g.state=C=null),("object"!=typeof C||Array.isArray(C))&&a("106",this.getName()||"ReactCompositeComponent"),this._pendingStateQueue=null,this._pendingReplaceState=!1,this._pendingForceUpdate=!1;var b;return b=g.unstable_handleError?this.performInitialMountWithErrorHandling(l,t,n,e,s):this.performInitialMount(l,t,n,e,s),g.componentDidMount&&e.getReactMountReady().enqueue(g.componentDidMount,g),b},_constructComponent:function(e,t,n,r){return this._constructComponentWithoutOwner(e,t,n,r)},_constructComponentWithoutOwner:function(e,t,n,r){var o=this._currentElement.type;return e?new o(t,n,r):o(t,n,r)},performInitialMountWithErrorHandling:function(e,t,n,r,o){var i,a=r.checkpoint();try{i=this.performInitialMount(e,t,n,r,o)}catch(s){r.rollback(a),this._instance.unstable_handleError(s),this._pendingStateQueue&&(this._instance.state=this._processPendingState(this._instance.props,this._instance.context)),a=r.checkpoint(),this._renderedComponent.unmountComponent(!0),r.rollback(a),i=this.performInitialMount(e,t,n,r,o)}return i},performInitialMount:function(e,t,n,r,o){var i=this._instance;i.componentWillMount&&(i.componentWillMount(),this._pendingStateQueue&&(i.state=this._processPendingState(i.props,i.context))),void 0===e&&(e=this._renderValidatedComponent());var a=f.getType(e);this._renderedNodeType=a;var s=this._instantiateReactComponent(e,a!==f.EMPTY);return this._renderedComponent=s,h.mountComponent(s,r,t,n,this._processChildContext(o),0)},getHostNode:function(){return h.getHostNode(this._renderedComponent)},unmountComponent:function(e){if(this._renderedComponent){var t=this._instance;if(t.componentWillUnmount&&!t._calledComponentWillUnmount)if(t._calledComponentWillUnmount=!0,e){var n=this.getName()+".componentWillUnmount()";p.invokeGuardedCallback(n,t.componentWillUnmount.bind(t))}else t.componentWillUnmount();this._renderedComponent&&(h.unmountComponent(this._renderedComponent,e),this._renderedNodeType=null,this._renderedComponent=null,this._instance=null),this._pendingStateQueue=null,this._pendingReplaceState=!1,this._pendingForceUpdate=!1,this._pendingCallbacks=null,this._pendingElement=null,this._context=null,this._rootNodeID=0,this._topLevelWrapper=null,d.remove(t)}},_maskContext:function(e){var t=this._currentElement.type,n=t.contextTypes;if(!n)return m;var r={};for(var o in n)r[o]=e[o];return r},_processContext:function(e){return this._maskContext(e)},_processChildContext:function(e){var t,n=this._currentElement.type,r=this._instance;if(r.getChildContext&&(t=r.getChildContext()),t){"object"!=typeof n.childContextTypes&&a("107",this.getName()||"ReactCompositeComponent");for(var o in t)o in n.childContextTypes||a("108",this.getName()||"ReactCompositeComponent",o);return s({},e,t)}return e},_checkContextTypes:function(e,t,n){},receiveComponent:function(e,t,n){var r=this._currentElement,o=this._context;this._pendingElement=null,this.updateComponent(t,r,e,o,n)},performUpdateIfNecessary:function(e){null!=this._pendingElement?h.receiveComponent(this,this._pendingElement,e,this._context):null!==this._pendingStateQueue||this._pendingForceUpdate?this.updateComponent(e,this._currentElement,this._currentElement,this._context,this._context):this._updateBatchNumber=null},updateComponent:function(e,t,n,r,o){var i=this._instance;null==i&&a("136",this.getName()||"ReactCompositeComponent");var s,u=!1;this._context===o?s=i.context:(s=this._processContext(o),u=!0);var l=t.props,c=n.props;t!==n&&(u=!0),u&&i.componentWillReceiveProps&&i.componentWillReceiveProps(c,s);var p=this._processPendingState(c,s),d=!0;this._pendingForceUpdate||(i.shouldComponentUpdate?d=i.shouldComponentUpdate(c,p,s):this._compositeType===y.PureClass&&(d=!v(l,c)||!v(i.state,p))),this._updateBatchNumber=null,d?(this._pendingForceUpdate=!1,this._performComponentUpdate(n,c,p,s,e,o)):(this._currentElement=n,this._context=o,i.props=c,i.state=p,i.context=s)},_processPendingState:function(e,t){var n=this._instance,r=this._pendingStateQueue,o=this._pendingReplaceState;if(this._pendingReplaceState=!1,this._pendingStateQueue=null,!r)return n.state;if(o&&1===r.length)return r[0];for(var i=s({},o?r[0]:n.state),a=o?1:0;a<r.length;a++){var u=r[a];s(i,"function"==typeof u?u.call(n,i,e,t):u)}return i},_performComponentUpdate:function(e,t,n,r,o,i){var a,s,u,l=this._instance,c=Boolean(l.componentDidUpdate);c&&(a=l.props,s=l.state,u=l.context),l.componentWillUpdate&&l.componentWillUpdate(t,n,r),this._currentElement=e,this._context=i,l.props=t,l.state=n,l.context=r,this._updateRenderedComponent(o,i),c&&o.getReactMountReady().enqueue(l.componentDidUpdate.bind(l,a,s,u),l)},_updateRenderedComponent:function(e,t){var n=this._renderedComponent,r=n._currentElement,o=this._renderValidatedComponent();if(g(r,o))h.receiveComponent(n,o,e,this._processChildContext(t));else{var i=h.getHostNode(n);h.unmountComponent(n,!1);var a=f.getType(o);this._renderedNodeType=a;var s=this._instantiateReactComponent(o,a!==f.EMPTY);this._renderedComponent=s;var u=h.mountComponent(s,e,this._hostParent,this._hostContainerInfo,this._processChildContext(t),0);this._replaceNodeWithMarkup(i,u,n)}},_replaceNodeWithMarkup:function(e,t,n){l.replaceNodeWithMarkup(e,t,n)},_renderValidatedComponentWithoutOwnerOrContext:function(){return this._instance.render()},_renderValidatedComponent:function(){var e;if(this._compositeType!==y.StatelessFunctional){c.current=this;try{e=this._renderValidatedComponentWithoutOwnerOrContext()}finally{c.current=null}}else e=this._renderValidatedComponentWithoutOwnerOrContext();return null===e||!1===e||u.isValidElement(e)||a("109",this.getName()||"ReactCompositeComponent"),e},attachRef:function(e,t){var n=this.getPublicInstance();null==n&&a("110");var r=t.getPublicInstance();(n.refs===m?n.refs={}:n.refs)[e]=r},detachRef:function(e){delete this.getPublicInstance().refs[e]},getName:function(){var e=this._currentElement.type,t=this._instance&&this._instance.constructor;return e.displayName||t&&t.displayName||e.name||t&&t.name||null},getPublicInstance:function(){var e=this._instance;return this._compositeType===y.StatelessFunctional?null:e},_instantiateReactComponent:null};t.exports=C},{112:112,116:116,119:119,120:120,130:130,137:137,141:141,142:142,143:143,28:28,50:50,57:57,58:58,62:62,66:66}],30:[function(e,t,n){"use strict";var r=e(33),o=e(47),i=e(60),a=e(66),s=e(71),u=e(72),l=e(96),c=e(103),p=e(113);e(142);o.inject();var d={findDOMNode:l,render:i.render,unmountComponentAtNode:i.unmountComponentAtNode,version:u,unstable_batchedUpdates:s.batchedUpdates,unstable_renderSubtreeIntoContainer:p};"undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject&&__REACT_DEVTOOLS_GLOBAL_HOOK__.inject({ComponentTree:{getClosestInstanceFromNode:r.getClosestInstanceFromNode,getNodeFromInstance:function(e){return e._renderedComponent&&(e=c(e)),e?r.getNodeFromInstance(e):null}},Mount:i,Reconciler:a});t.exports=d},{103:103,113:113,142:142,33:33,47:47,60:60,66:66,71:71,72:72,96:96}],31:[function(e,t,n){"use strict";function r(e){if(e){var t=e._currentElement._owner||null;if(t){var n=t.getName();if(n)return" This DOM node was rendered by `"+n+"`."}}return""}function o(e,t){t&&(Y[e._tag]&&(null!=t.children||null!=t.dangerouslySetInnerHTML)&&m("137",e._tag,e._currentElement._owner?" Check the render method of "+e._currentElement._owner.getName()+".":""),null!=t.dangerouslySetInnerHTML&&(null!=t.children&&m("60"),"object"==typeof t.dangerouslySetInnerHTML&&B in t.dangerouslySetInnerHTML||m("61")),null!=t.style&&"object"!=typeof t.style&&m("62",r(e)))}function i(e,t,n,r){if(!(r instanceof R)){var o=e._hostContainerInfo,i=o._node&&o._node.nodeType===H,s=i?o._node:o._ownerDocument;F(t,s),r.getReactMountReady().enqueue(a,{inst:e,registrationName:t,listener:n})}}function a(){var e=this;x.putListener(e.inst,e.registrationName,e.listener)}function s(){var e=this;S.postMountWrapper(e)}function u(){var e=this;I.postMountWrapper(e)}function l(){var e=this;N.postMountWrapper(e)}function c(){var e=this;e._rootNodeID||m("63");var t=U(e);switch(t||m("64"),e._tag){case"iframe":case"object":e._wrapperState.listeners=[T.trapBubbledEvent("topLoad","load",t)];break;case"video":case"audio":e._wrapperState.listeners=[];for(var n in q)q.hasOwnProperty(n)&&e._wrapperState.listeners.push(T.trapBubbledEvent(n,q[n],t));break;case"source":e._wrapperState.listeners=[T.trapBubbledEvent("topError","error",t)];break;case"img":e._wrapperState.listeners=[T.trapBubbledEvent("topError","error",t),T.trapBubbledEvent("topLoad","load",t)];break;case"form":e._wrapperState.listeners=[T.trapBubbledEvent("topReset","reset",t),T.trapBubbledEvent("topSubmit","submit",t)];break;case"input":case"select":case"textarea":e._wrapperState.listeners=[T.trapBubbledEvent("topInvalid","invalid",t)]}}function p(){M.postUpdateWrapper(this)}function d(e){G.call(Q,e)||(X.test(e)||m("65",e),Q[e]=!0)}function f(e,t){return e.indexOf("-")>=0||null!=t.is}function h(e){var t=e.type;d(t),this._currentElement=e,this._tag=t.toLowerCase(),this._namespaceURI=null,this._renderedChildren=null,this._previousStyle=null,this._previousStyleCopy=null,this._hostNode=null,this._hostParent=null,this._rootNodeID=0,this._domID=0,this._hostContainerInfo=null,this._wrapperState=null,this._topLevelWrapper=null,this._flags=0}var m=e(112),v=e(143),g=e(2),y=e(5),_=e(9),C=e(10),b=e(11),E=e(12),x=e(16),w=e(17),T=e(25),k=e(32),P=e(33),S=e(38),N=e(39),M=e(40),I=e(43),O=(e(58),e(61)),R=e(68),A=(e(129),e(95)),D=(e(137),e(109),e(141),e(118),e(142),k),L=x.deleteListener,U=P.getNodeFromInstance,F=T.listenTo,j=w.registrationNameModules,V={string:!0,number:!0},B="__html",W={children:null,dangerouslySetInnerHTML:null,suppressContentEditableWarning:null},H=11,q={topAbort:"abort",topCanPlay:"canplay",topCanPlayThrough:"canplaythrough",topDurationChange:"durationchange",topEmptied:"emptied",topEncrypted:"encrypted",topEnded:"ended",topError:"error",topLoadedData:"loadeddata",topLoadedMetadata:"loadedmetadata",topLoadStart:"loadstart",topPause:"pause",topPlay:"play",topPlaying:"playing",topProgress:"progress",topRateChange:"ratechange",topSeeked:"seeked",topSeeking:"seeking",topStalled:"stalled",topSuspend:"suspend",topTimeUpdate:"timeupdate",topVolumeChange:"volumechange",topWaiting:"waiting"},K={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0},z={listing:!0,pre:!0,textarea:!0},Y=v({menuitem:!0},K),X=/^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,Q={},G={}.hasOwnProperty,$=1;h.displayName="ReactDOMComponent",h.Mixin={mountComponent:function(e,t,n,r){this._rootNodeID=$++,this._domID=n._idCounter++,this._hostParent=t,this._hostContainerInfo=n;var i=this._currentElement.props;switch(this._tag){case"audio":case"form":case"iframe":case"img":case"link":case"object":case"source":case"video":this._wrapperState={listeners:null},e.getReactMountReady().enqueue(c,this);break;case"input":S.mountWrapper(this,i,t),i=S.getHostProps(this,i),e.getReactMountReady().enqueue(c,this);break;case"option":N.mountWrapper(this,i,t),i=N.getHostProps(this,i);break;case"select":M.mountWrapper(this,i,t),i=M.getHostProps(this,i),e.getReactMountReady().enqueue(c,this);break;case"textarea":I.mountWrapper(this,i,t),i=I.getHostProps(this,i),e.getReactMountReady().enqueue(c,this)}o(this,i);var a,p;null!=t?(a=t._namespaceURI,p=t._tag):n._tag&&(a=n._namespaceURI,p=n._tag),(null==a||a===C.svg&&"foreignobject"===p)&&(a=C.html),a===C.html&&("svg"===this._tag?a=C.svg:"math"===this._tag&&(a=C.mathml)),this._namespaceURI=a;var d;if(e.useCreateElement){var f,h=n._ownerDocument;if(a===C.html)if("script"===this._tag){var m=h.createElement("div"),v=this._currentElement.type;m.innerHTML="<"+v+"></"+v+">",f=m.removeChild(m.firstChild)}else f=i.is?h.createElement(this._currentElement.type,i.is):h.createElement(this._currentElement.type);else f=h.createElementNS(a,this._currentElement.type);P.precacheNode(this,f),this._flags|=D.hasCachedChildNodes,this._hostParent||E.setAttributeForRoot(f),this._updateDOMProperties(null,i,e);var y=_(f);this._createInitialChildren(e,i,r,y),d=y}else{var b=this._createOpenTagMarkupAndPutListeners(e,i),x=this._createContentMarkup(e,i,r);d=!x&&K[this._tag]?b+"/>":b+">"+x+"</"+this._currentElement.type+">"}switch(this._tag){case"input":e.getReactMountReady().enqueue(s,this),i.autoFocus&&e.getReactMountReady().enqueue(g.focusDOMComponent,this);break;case"textarea":e.getReactMountReady().enqueue(u,this),i.autoFocus&&e.getReactMountReady().enqueue(g.focusDOMComponent,this);break;case"select":case"button":i.autoFocus&&e.getReactMountReady().enqueue(g.focusDOMComponent,this);break;case"option":e.getReactMountReady().enqueue(l,this)}return d},_createOpenTagMarkupAndPutListeners:function(e,t){var n="<"+this._currentElement.type;for(var r in t)if(t.hasOwnProperty(r)){var o=t[r];if(null!=o)if(j.hasOwnProperty(r))o&&i(this,r,o,e);else{"style"===r&&(o&&(o=this._previousStyleCopy=v({},t.style)),o=y.createMarkupForStyles(o,this));var a=null;null!=this._tag&&f(this._tag,t)?W.hasOwnProperty(r)||(a=E.createMarkupForCustomAttribute(r,o)):a=E.createMarkupForProperty(r,o),a&&(n+=" "+a)}}return e.renderToStaticMarkup?n:(this._hostParent||(n+=" "+E.createMarkupForRoot()),n+=" "+E.createMarkupForID(this._domID))},_createContentMarkup:function(e,t,n){var r="",o=t.dangerouslySetInnerHTML;if(null!=o)null!=o.__html&&(r=o.__html);else{var i=V[typeof t.children]?t.children:null,a=null!=i?null:t.children;if(null!=i)r=A(i);else if(null!=a){var s=this.mountChildren(a,e,n);r=s.join("")}}return z[this._tag]&&"\n"===r.charAt(0)?"\n"+r:r},_createInitialChildren:function(e,t,n,r){var o=t.dangerouslySetInnerHTML;if(null!=o)null!=o.__html&&_.queueHTML(r,o.__html);else{var i=V[typeof t.children]?t.children:null,a=null!=i?null:t.children;if(null!=i)""!==i&&_.queueText(r,i);else if(null!=a)for(var s=this.mountChildren(a,e,n),u=0;u<s.length;u++)_.queueChild(r,s[u])}},receiveComponent:function(e,t,n){var r=this._currentElement;this._currentElement=e,this.updateComponent(t,r,e,n)},updateComponent:function(e,t,n,r){var i=t.props,a=this._currentElement.props;switch(this._tag){case"input":i=S.getHostProps(this,i),a=S.getHostProps(this,a);break;case"option":i=N.getHostProps(this,i),a=N.getHostProps(this,a);break;case"select":i=M.getHostProps(this,i),a=M.getHostProps(this,a);break;case"textarea":i=I.getHostProps(this,i),a=I.getHostProps(this,a)}switch(o(this,a),this._updateDOMProperties(i,a,e),this._updateDOMChildren(i,a,e,r),this._tag){case"input":S.updateWrapper(this);break;case"textarea":I.updateWrapper(this);break;case"select":e.getReactMountReady().enqueue(p,this)}},_updateDOMProperties:function(e,t,n){var r,o,a;for(r in e)if(!t.hasOwnProperty(r)&&e.hasOwnProperty(r)&&null!=e[r])if("style"===r){var s=this._previousStyleCopy;for(o in s)s.hasOwnProperty(o)&&(a=a||{},a[o]="");this._previousStyleCopy=null}else j.hasOwnProperty(r)?e[r]&&L(this,r):f(this._tag,e)?W.hasOwnProperty(r)||E.deleteValueForAttribute(U(this),r):(b.properties[r]||b.isCustomAttribute(r))&&E.deleteValueForProperty(U(this),r);for(r in t){var u=t[r],l="style"===r?this._previousStyleCopy:null!=e?e[r]:void 0;if(t.hasOwnProperty(r)&&u!==l&&(null!=u||null!=l))if("style"===r)if(u?u=this._previousStyleCopy=v({},u):this._previousStyleCopy=null,l){for(o in l)!l.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(a=a||{},a[o]="");for(o in u)u.hasOwnProperty(o)&&l[o]!==u[o]&&(a=a||{},a[o]=u[o])}else a=u;else if(j.hasOwnProperty(r))u?i(this,r,u,n):l&&L(this,r);else if(f(this._tag,t))W.hasOwnProperty(r)||E.setValueForAttribute(U(this),r,u);else if(b.properties[r]||b.isCustomAttribute(r)){var c=U(this);null!=u?E.setValueForProperty(c,r,u):E.deleteValueForProperty(c,r)}}a&&y.setValueForStyles(U(this),a,this)},_updateDOMChildren:function(e,t,n,r){var o=V[typeof e.children]?e.children:null,i=V[typeof t.children]?t.children:null,a=e.dangerouslySetInnerHTML&&e.dangerouslySetInnerHTML.__html,s=t.dangerouslySetInnerHTML&&t.dangerouslySetInnerHTML.__html,u=null!=o?null:e.children,l=null!=i?null:t.children,c=null!=o||null!=a,p=null!=i||null!=s;null!=u&&null==l?this.updateChildren(null,n,r):c&&!p&&this.updateTextContent(""),null!=i?o!==i&&this.updateTextContent(""+i):null!=s?a!==s&&this.updateMarkup(""+s):null!=l&&this.updateChildren(l,n,r)},getHostNode:function(){return U(this)},unmountComponent:function(e){switch(this._tag){case"audio":case"form":case"iframe":case"img":case"link":case"object":case"source":case"video":var t=this._wrapperState.listeners;if(t)for(var n=0;n<t.length;n++)t[n].remove();break;case"html":case"head":case"body":m("66",this._tag)}this.unmountChildren(e),P.uncacheNode(this),x.deleteAllListeners(this),this._rootNodeID=0,this._domID=0,this._wrapperState=null},getPublicInstance:function(){return U(this)}},v(h.prototype,h.Mixin,O.Mixin),t.exports=h},{10:10,109:109,11:11,112:112,118:118,12:12,129:129,137:137,141:141,142:142,143:143,16:16,17:17,2:2,25:25,32:32,33:33,38:38,39:39,40:40,43:43,5:5,58:58,61:61,68:68,9:9,95:95}],32:[function(e,t,n){"use strict";var r={hasCachedChildNodes:1};t.exports=r},{}],33:[function(e,t,n){"use strict";function r(e,t){return 1===e.nodeType&&e.getAttribute(h)===String(t)||8===e.nodeType&&e.nodeValue===" react-text: "+t+" "||8===e.nodeType&&e.nodeValue===" react-empty: "+t+" "}function o(e){for(var t;t=e._renderedComponent;)e=t;return e}function i(e,t){var n=o(e);n._hostNode=t,t[v]=n}function a(e){var t=e._hostNode;t&&(delete t[v],e._hostNode=null)}function s(e,t){if(!(e._flags&m.hasCachedChildNodes)){var n=e._renderedChildren,a=t.firstChild;e:for(var s in n)if(n.hasOwnProperty(s)){var u=n[s],l=o(u)._domID;if(0!==l){for(;null!==a;a=a.nextSibling)if(r(a,l)){i(u,a);continue e}p("32",l)}}e._flags|=m.hasCachedChildNodes}}function u(e){if(e[v])return e[v];for(var t=[];!e[v];){if(t.push(e),!e.parentNode)return null;e=e.parentNode}for(var n,r;e&&(r=e[v]);e=t.pop())n=r,t.length&&s(r,e);return n}function l(e){var t=u(e);return null!=t&&t._hostNode===e?t:null}function c(e){if(void 0===e._hostNode&&p("33"),e._hostNode)return e._hostNode;for(var t=[];!e._hostNode;)t.push(e),e._hostParent||p("34"),e=e._hostParent;for(;t.length;e=t.pop())s(e,e._hostNode);return e._hostNode}var p=e(112),d=e(11),f=e(32),h=(e(137),d.ID_ATTRIBUTE_NAME),m=f,v="__reactInternalInstance$"+Math.random().toString(36).slice(2),g={getClosestInstanceFromNode:u,getInstanceFromNode:l,getNodeFromInstance:c,precacheChildNodes:s,precacheNode:i,uncacheNode:a};t.exports=g},{11:11,112:112,137:137,32:32}],34:[function(e,t,n){"use strict";function r(e,t){return{_topLevelWrapper:e,_idCounter:1,_ownerDocument:t?t.nodeType===o?t:t.ownerDocument:null,_node:t,_tag:t?t.nodeName.toLowerCase():null,_namespaceURI:t?t.namespaceURI:null}}var o=(e(118),9);t.exports=r},{118:118}],35:[function(e,t,n){"use strict";var r=e(143),o=e(9),i=e(33),a=function(e){this._currentElement=null,this._hostNode=null,this._hostParent=null,this._hostContainerInfo=null,this._domID=0};r(a.prototype,{mountComponent:function(e,t,n,r){var a=n._idCounter++;this._domID=a,this._hostParent=t,this._hostContainerInfo=n;var s=" react-empty: "+this._domID+" ";if(e.useCreateElement){var u=n._ownerDocument,l=u.createComment(s);return i.precacheNode(this,l),o(l)}return e.renderToStaticMarkup?"":"<!--"+s+"-->"},receiveComponent:function(){},getHostNode:function(){return i.getNodeFromInstance(this)},unmountComponent:function(){i.uncacheNode(this)}}),t.exports=a},{143:143,33:33,9:9}],36:[function(e,t,n){"use strict";var r={useCreateElement:!0,useFiber:!1};t.exports=r},{}],37:[function(e,t,n){"use strict";var r=e(8),o=e(33),i={dangerouslyProcessChildrenUpdates:function(e,t){var n=o.getNodeFromInstance(e);r.processUpdates(n,t)}};t.exports=i},{33:33,8:8}],38:[function(e,t,n){"use strict";function r(){this._rootNodeID&&d.updateWrapper(this)}function o(e){return"checkbox"===e.type||"radio"===e.type?null!=e.checked:null!=e.value}function i(e){var t=this._currentElement.props,n=l.executeOnChange(t,e);p.asap(r,this);var o=t.name;if("radio"===t.type&&null!=o){for(var i=c.getNodeFromInstance(this),s=i;s.parentNode;)s=s.parentNode;for(var u=s.querySelectorAll("input[name="+JSON.stringify(""+o)+'][type="radio"]'),d=0;d<u.length;d++){var f=u[d];if(f!==i&&f.form===i.form){var h=c.getInstanceFromNode(f);h||a("90"),p.asap(r,h)}}}return n}var a=e(112),s=e(143),u=e(12),l=e(23),c=e(33),p=e(71),d=(e(137),e(142),{getHostProps:function(e,t){var n=l.getValue(t),r=l.getChecked(t);return s({type:void 0,step:void 0,min:void 0,max:void 0},t,{defaultChecked:void 0,defaultValue:void 0,value:null!=n?n:e._wrapperState.initialValue,checked:null!=r?r:e._wrapperState.initialChecked,onChange:e._wrapperState.onChange})},mountWrapper:function(e,t){var n=t.defaultValue;e._wrapperState={initialChecked:null!=t.checked?t.checked:t.defaultChecked,initialValue:null!=t.value?t.value:n,listeners:null,onChange:i.bind(e),controlled:o(t)}},updateWrapper:function(e){var t=e._currentElement.props,n=t.checked;null!=n&&u.setValueForProperty(c.getNodeFromInstance(e),"checked",n||!1);var r=c.getNodeFromInstance(e),o=l.getValue(t);if(null!=o)if(0===o&&""===r.value)r.value="0";else if("number"===t.type){var i=parseFloat(r.value,10)||0;o!=i&&(r.value=""+o)}else o!=r.value&&(r.value=""+o);else null==t.value&&null!=t.defaultValue&&r.defaultValue!==""+t.defaultValue&&(r.defaultValue=""+t.defaultValue),null==t.checked&&null!=t.defaultChecked&&(r.defaultChecked=!!t.defaultChecked)},postMountWrapper:function(e){var t=e._currentElement.props,n=c.getNodeFromInstance(e);switch(t.type){case"submit":case"reset":break;case"color":case"date":case"datetime":case"datetime-local":case"month":case"time":case"week":n.value="",n.value=n.defaultValue;break;default:n.value=n.value}var r=n.name;""!==r&&(n.name=""),n.defaultChecked=!n.defaultChecked,n.defaultChecked=!n.defaultChecked,""!==r&&(n.name=r)}});t.exports=d},{112:112,12:12,137:137,142:142,143:143,23:23,33:33,71:71}],39:[function(e,t,n){"use strict";function r(e){var t="";return i.Children.forEach(e,function(e){null!=e&&("string"==typeof e||"number"==typeof e?t+=e:u||(u=!0))}),t}var o=e(143),i=e(120),a=e(33),s=e(40),u=(e(142),!1),l={mountWrapper:function(e,t,n){var o=null;if(null!=n){var i=n;"optgroup"===i._tag&&(i=i._hostParent),null!=i&&"select"===i._tag&&(o=s.getSelectValueContext(i))}var a=null;if(null!=o){var u;if(u=null!=t.value?t.value+"":r(t.children),a=!1,Array.isArray(o)){for(var l=0;l<o.length;l++)if(""+o[l]===u){a=!0;break}}else a=""+o===u}e._wrapperState={selected:a}},postMountWrapper:function(e){var t=e._currentElement.props;null!=t.value&&a.getNodeFromInstance(e).setAttribute("value",t.value)},getHostProps:function(e,t){var n=o({selected:void 0,children:void 0},t);null!=e._wrapperState.selected&&(n.selected=e._wrapperState.selected);var i=r(t.children);return i&&(n.children=i),n}};t.exports=l},{120:120,142:142,143:143,33:33,40:40}],40:[function(e,t,n){"use strict";function r(){if(this._rootNodeID&&this._wrapperState.pendingUpdate){this._wrapperState.pendingUpdate=!1;var e=this._currentElement.props,t=s.getValue(e);null!=t&&o(this,Boolean(e.multiple),t)}}function o(e,t,n){var r,o,i=u.getNodeFromInstance(e).options;if(t){for(r={},o=0;o<n.length;o++)r[""+n[o]]=!0;for(o=0;o<i.length;o++){var a=r.hasOwnProperty(i[o].value);i[o].selected!==a&&(i[o].selected=a)}}else{for(r=""+n,o=0;o<i.length;o++)if(i[o].value===r)return void(i[o].selected=!0);i.length&&(i[0].selected=!0)}}function i(e){var t=this._currentElement.props,n=s.executeOnChange(t,e);return this._rootNodeID&&(this._wrapperState.pendingUpdate=!0),l.asap(r,this),n}var a=e(143),s=e(23),u=e(33),l=e(71),c=(e(142),!1),p={getHostProps:function(e,t){return a({},t,{onChange:e._wrapperState.onChange,value:void 0})},mountWrapper:function(e,t){var n=s.getValue(t);e._wrapperState={pendingUpdate:!1,initialValue:null!=n?n:t.defaultValue,listeners:null,onChange:i.bind(e),wasMultiple:Boolean(t.multiple)},void 0===t.value||void 0===t.defaultValue||c||(c=!0)},getSelectValueContext:function(e){return e._wrapperState.initialValue},postUpdateWrapper:function(e){var t=e._currentElement.props;e._wrapperState.initialValue=void 0;var n=e._wrapperState.wasMultiple;e._wrapperState.wasMultiple=Boolean(t.multiple);var r=s.getValue(t);null!=r?(e._wrapperState.pendingUpdate=!1,o(e,Boolean(t.multiple),r)):n!==Boolean(t.multiple)&&(null!=t.defaultValue?o(e,Boolean(t.multiple),t.defaultValue):o(e,Boolean(t.multiple),t.multiple?[]:""))}};t.exports=p},{142:142,143:143,23:23,33:33,71:71}],41:[function(e,t,n){"use strict";function r(e,t,n,r){return e===n&&t===r}function o(e){var t=document.selection,n=t.createRange(),r=n.text.length,o=n.duplicate();o.moveToElementText(e),o.setEndPoint("EndToStart",n);var i=o.text.length;return{start:i,end:i+r}}function i(e){var t=window.getSelection&&window.getSelection();if(!t||0===t.rangeCount)return null;var n=t.anchorNode,o=t.anchorOffset,i=t.focusNode,a=t.focusOffset,s=t.getRangeAt(0);try{s.startContainer.nodeType,s.endContainer.nodeType}catch(e){return null}var u=r(t.anchorNode,t.anchorOffset,t.focusNode,t.focusOffset),l=u?0:s.toString().length,c=s.cloneRange();c.selectNodeContents(e),c.setEnd(s.startContainer,s.startOffset);var p=r(c.startContainer,c.startOffset,c.endContainer,c.endOffset),d=p?0:c.toString().length,f=d+l,h=document.createRange();h.setStart(n,o),h.setEnd(i,a);var m=h.collapsed;return{start:m?f:d,end:m?d:f}}function a(e,t){var n,r,o=document.selection.createRange().duplicate();void 0===t.end?(n=t.start,r=n):t.start>t.end?(n=t.end,r=t.start):(n=t.start,r=t.end),o.moveToElementText(e),o.moveStart("character",n),o.setEndPoint("EndToStart",o),o.moveEnd("character",r-n),o.select()}function s(e,t){if(window.getSelection){var n=window.getSelection(),r=e[c()].length,o=Math.min(t.start,r),i=void 0===t.end?o:Math.min(t.end,r);if(!n.extend&&o>i){var a=i;i=o,o=a}var s=l(e,o),u=l(e,i);if(s&&u){var p=document.createRange();p.setStart(s.node,s.offset),n.removeAllRanges(),o>i?(n.addRange(p),n.extend(u.node,u.offset)):(p.setEnd(u.node,u.offset),n.addRange(p))}}}var u=e(123),l=e(105),c=e(106),p=u.canUseDOM&&"selection"in document&&!("getSelection"in window),d={getOffsets:p?o:i,setOffsets:p?a:s};t.exports=d},{105:105,106:106,123:123}],42:[function(e,t,n){"use strict";var r=e(112),o=e(143),i=e(8),a=e(9),s=e(33),u=e(95),l=(e(137),e(118),function(e){this._currentElement=e,this._stringText=""+e,
this._hostNode=null,this._hostParent=null,this._domID=0,this._mountIndex=0,this._closingComment=null,this._commentNodes=null});o(l.prototype,{mountComponent:function(e,t,n,r){var o=n._idCounter++,i=" react-text: "+o+" ";if(this._domID=o,this._hostParent=t,e.useCreateElement){var l=n._ownerDocument,c=l.createComment(i),p=l.createComment(" /react-text "),d=a(l.createDocumentFragment());return a.queueChild(d,a(c)),this._stringText&&a.queueChild(d,a(l.createTextNode(this._stringText))),a.queueChild(d,a(p)),s.precacheNode(this,c),this._closingComment=p,d}var f=u(this._stringText);return e.renderToStaticMarkup?f:"<!--"+i+"-->"+f+"<!-- /react-text -->"},receiveComponent:function(e,t){if(e!==this._currentElement){this._currentElement=e;var n=""+e;if(n!==this._stringText){this._stringText=n;var r=this.getHostNode();i.replaceDelimitedText(r[0],r[1],n)}}},getHostNode:function(){var e=this._commentNodes;if(e)return e;if(!this._closingComment)for(var t=s.getNodeFromInstance(this),n=t.nextSibling;;){if(null==n&&r("67",this._domID),8===n.nodeType&&" /react-text "===n.nodeValue){this._closingComment=n;break}n=n.nextSibling}return e=[this._hostNode,this._closingComment],this._commentNodes=e,e},unmountComponent:function(){this._closingComment=null,this._commentNodes=null,s.uncacheNode(this)}}),t.exports=l},{112:112,118:118,137:137,143:143,33:33,8:8,9:9,95:95}],43:[function(e,t,n){"use strict";function r(){this._rootNodeID&&c.updateWrapper(this)}function o(e){var t=this._currentElement.props,n=s.executeOnChange(t,e);return l.asap(r,this),n}var i=e(112),a=e(143),s=e(23),u=e(33),l=e(71),c=(e(137),e(142),{getHostProps:function(e,t){return null!=t.dangerouslySetInnerHTML&&i("91"),a({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue,onChange:e._wrapperState.onChange})},mountWrapper:function(e,t){var n=s.getValue(t),r=n;if(null==n){var a=t.defaultValue,u=t.children;null!=u&&(null!=a&&i("92"),Array.isArray(u)&&(u.length<=1||i("93"),u=u[0]),a=""+u),null==a&&(a=""),r=a}e._wrapperState={initialValue:""+r,listeners:null,onChange:o.bind(e)}},updateWrapper:function(e){var t=e._currentElement.props,n=u.getNodeFromInstance(e),r=s.getValue(t);if(null!=r){var o=""+r;o!==n.value&&(n.value=o),null==t.defaultValue&&(n.defaultValue=o)}null!=t.defaultValue&&(n.defaultValue=t.defaultValue)},postMountWrapper:function(e){var t=u.getNodeFromInstance(e),n=t.textContent;n===e._wrapperState.initialValue&&(t.value=n)}});t.exports=c},{112:112,137:137,142:142,143:143,23:23,33:33,71:71}],44:[function(e,t,n){"use strict";function r(e,t){"_hostNode"in e||u("33"),"_hostNode"in t||u("33");for(var n=0,r=e;r;r=r._hostParent)n++;for(var o=0,i=t;i;i=i._hostParent)o++;for(;n-o>0;)e=e._hostParent,n--;for(;o-n>0;)t=t._hostParent,o--;for(var a=n;a--;){if(e===t)return e;e=e._hostParent,t=t._hostParent}return null}function o(e,t){"_hostNode"in e||u("35"),"_hostNode"in t||u("35");for(;t;){if(t===e)return!0;t=t._hostParent}return!1}function i(e){return"_hostNode"in e||u("36"),e._hostParent}function a(e,t,n){for(var r=[];e;)r.push(e),e=e._hostParent;var o;for(o=r.length;o-- >0;)t(r[o],"captured",n);for(o=0;o<r.length;o++)t(r[o],"bubbled",n)}function s(e,t,n,o,i){for(var a=e&&t?r(e,t):null,s=[];e&&e!==a;)s.push(e),e=e._hostParent;for(var u=[];t&&t!==a;)u.push(t),t=t._hostParent;var l;for(l=0;l<s.length;l++)n(s[l],"bubbled",o);for(l=u.length;l-- >0;)n(u[l],"captured",i)}var u=e(112);e(137);t.exports={isAncestor:o,getLowestCommonAncestor:r,getParentInstance:i,traverseTwoPhase:a,traverseEnterLeave:s}},{112:112,137:137}],45:[function(e,t,n){"use strict";var r=e(120),o=e(30),i=o;r.addons&&(r.__SECRET_INJECTED_REACT_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=i),t.exports=i},{120:120,30:30}],46:[function(e,t,n){"use strict";function r(){this.reinitializeTransaction()}var o=e(143),i=e(71),a=e(89),s=e(129),u={initialize:s,close:function(){d.isBatchingUpdates=!1}},l={initialize:s,close:i.flushBatchedUpdates.bind(i)},c=[l,u];o(r.prototype,a,{getTransactionWrappers:function(){return c}});var p=new r,d={isBatchingUpdates:!1,batchedUpdates:function(e,t,n,r,o,i){var a=d.isBatchingUpdates;return d.isBatchingUpdates=!0,a?e(t,n,r,o,i):p.perform(e,null,t,n,r,o,i)}};t.exports=d},{129:129,143:143,71:71,89:89}],47:[function(e,t,n){"use strict";function r(){x||(x=!0,y.EventEmitter.injectReactEventListener(g),y.EventPluginHub.injectEventPluginOrder(s),y.EventPluginUtils.injectComponentTree(d),y.EventPluginUtils.injectTreeTraversal(h),y.EventPluginHub.injectEventPluginsByName({SimpleEventPlugin:E,EnterLeaveEventPlugin:u,ChangeEventPlugin:a,SelectEventPlugin:b,BeforeInputEventPlugin:i}),y.HostComponent.injectGenericComponentClass(p),y.HostComponent.injectTextComponentClass(m),y.DOMProperty.injectDOMPropertyConfig(o),y.DOMProperty.injectDOMPropertyConfig(l),y.DOMProperty.injectDOMPropertyConfig(C),y.EmptyComponent.injectEmptyComponentFactory(function(e){return new f(e)}),y.Updates.injectReconcileTransaction(_),y.Updates.injectBatchingStrategy(v),y.Component.injectEnvironment(c))}var o=e(1),i=e(3),a=e(7),s=e(14),u=e(15),l=e(21),c=e(27),p=e(31),d=e(33),f=e(35),h=e(44),m=e(42),v=e(46),g=e(52),y=e(55),_=e(65),C=e(73),b=e(74),E=e(75),x=!1;t.exports={inject:r}},{1:1,14:14,15:15,21:21,27:27,3:3,31:31,33:33,35:35,42:42,44:44,46:46,52:52,55:55,65:65,7:7,73:73,74:74,75:75}],48:[function(e,t,n){"use strict";var r="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;t.exports=r},{}],49:[function(e,t,n){"use strict";var r,o={injectEmptyComponentFactory:function(e){r=e}},i={create:function(e){return r(e)}};i.injection=o,t.exports=i},{}],50:[function(e,t,n){"use strict";function r(e,t,n){try{t(n)}catch(e){null===o&&(o=e)}}var o=null,i={invokeGuardedCallback:r,invokeGuardedCallbackWithCatch:r,rethrowCaughtError:function(){if(o){var e=o;throw o=null,e}}};t.exports=i},{}],51:[function(e,t,n){"use strict";function r(e){o.enqueueEvents(e),o.processEventQueue(!1)}var o=e(16),i={handleTopLevel:function(e,t,n,i){r(o.extractEvents(e,t,n,i))}};t.exports=i},{16:16}],52:[function(e,t,n){"use strict";function r(e){for(;e._hostParent;)e=e._hostParent;var t=p.getNodeFromInstance(e),n=t.parentNode;return p.getClosestInstanceFromNode(n)}function o(e,t){this.topLevelType=e,this.nativeEvent=t,this.ancestors=[]}function i(e){var t=f(e.nativeEvent),n=p.getClosestInstanceFromNode(t),o=n;do{e.ancestors.push(o),o=o&&r(o)}while(o);for(var i=0;i<e.ancestors.length;i++)n=e.ancestors[i],m._handleTopLevel(e.topLevelType,n,e.nativeEvent,f(e.nativeEvent))}function a(e){e(h(window))}var s=e(143),u=e(122),l=e(123),c=e(24),p=e(33),d=e(71),f=e(102),h=e(134);s(o.prototype,{destructor:function(){this.topLevelType=null,this.nativeEvent=null,this.ancestors.length=0}}),c.addPoolingTo(o,c.twoArgumentPooler);var m={_enabled:!0,_handleTopLevel:null,WINDOW_HANDLE:l.canUseDOM?window:null,setHandleTopLevel:function(e){m._handleTopLevel=e},setEnabled:function(e){m._enabled=!!e},isEnabled:function(){return m._enabled},trapBubbledEvent:function(e,t,n){return n?u.listen(n,t,m.dispatchEvent.bind(null,e)):null},trapCapturedEvent:function(e,t,n){return n?u.capture(n,t,m.dispatchEvent.bind(null,e)):null},monitorScrollValue:function(e){var t=a.bind(null,e);u.listen(window,"scroll",t)},dispatchEvent:function(e,t){if(m._enabled){var n=o.getPooled(e,t);try{d.batchedUpdates(i,n)}finally{o.release(n)}}}};t.exports=m},{102:102,122:122,123:123,134:134,143:143,24:24,33:33,71:71}],53:[function(e,t,n){"use strict";var r={logTopLevelRenders:!1};t.exports=r},{}],54:[function(e,t,n){"use strict";function r(e){return s||a("111",e.type),new s(e)}function o(e){return new u(e)}function i(e){return e instanceof u}var a=e(112),s=(e(137),null),u=null,l={injectGenericComponentClass:function(e){s=e},injectTextComponentClass:function(e){u=e}},c={createInternalComponent:r,createInstanceForText:o,isTextComponent:i,injection:l};t.exports=c},{112:112,137:137}],55:[function(e,t,n){"use strict";var r=e(11),o=e(16),i=e(18),a=e(28),s=e(49),u=e(25),l=e(54),c=e(71),p={Component:a.injection,DOMProperty:r.injection,EmptyComponent:s.injection,EventPluginHub:o.injection,EventPluginUtils:i.injection,EventEmitter:u.injection,HostComponent:l.injection,Updates:c.injection};t.exports=p},{11:11,16:16,18:18,25:25,28:28,49:49,54:54,71:71}],56:[function(e,t,n){"use strict";function r(e){return i(document.documentElement,e)}var o=e(41),i=e(126),a=e(131),s=e(132),u={hasSelectionCapabilities:function(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&"text"===e.type||"textarea"===t||"true"===e.contentEditable)},getSelectionInformation:function(){var e=s();return{focusedElem:e,selectionRange:u.hasSelectionCapabilities(e)?u.getSelection(e):null}},restoreSelection:function(e){var t=s(),n=e.focusedElem,o=e.selectionRange;t!==n&&r(n)&&(u.hasSelectionCapabilities(n)&&u.setSelection(n,o),a(n))},getSelection:function(e){var t;if("selectionStart"in e)t={start:e.selectionStart,end:e.selectionEnd};else if(document.selection&&e.nodeName&&"input"===e.nodeName.toLowerCase()){var n=document.selection.createRange();n.parentElement()===e&&(t={start:-n.moveStart("character",-e.value.length),end:-n.moveEnd("character",-e.value.length)})}else t=o.getOffsets(e);return t||{start:0,end:0}},setSelection:function(e,t){var n=t.start,r=t.end;if(void 0===r&&(r=n),"selectionStart"in e)e.selectionStart=n,e.selectionEnd=Math.min(r,e.value.length);else if(document.selection&&e.nodeName&&"input"===e.nodeName.toLowerCase()){var i=e.createTextRange();i.collapse(!0),i.moveStart("character",n),i.moveEnd("character",r-n),i.select()}else o.setOffsets(e,t)}};t.exports=u},{126:126,131:131,132:132,41:41}],57:[function(e,t,n){"use strict";var r={remove:function(e){e._reactInternalInstance=void 0},get:function(e){return e._reactInternalInstance},has:function(e){return void 0!==e._reactInternalInstance},set:function(e,t){e._reactInternalInstance=t}};t.exports=r},{}],58:[function(e,t,n){"use strict";t.exports={debugTool:null}},{}],59:[function(e,t,n){"use strict";var r=e(92),o=/^<\!\-\-/,i={CHECKSUM_ATTR_NAME:"data-react-checksum",addChecksumToMarkup:function(e){var t=r(e);return o.test(e)?e:e.replace(/\/?>/," "+i.CHECKSUM_ATTR_NAME+'="'+t+'"$&')},canReuseMarkup:function(e,t){var n=t.getAttribute(i.CHECKSUM_ATTR_NAME);return n=n&&parseInt(n,10),r(e)===n}};t.exports=i},{92:92}],60:[function(e,t,n){"use strict";function r(e,t){for(var n=Math.min(e.length,t.length),r=0;r<n;r++)if(e.charAt(r)!==t.charAt(r))return r;return e.length===t.length?-1:n}function o(e){return e?e.nodeType===A?e.documentElement:e.firstChild:null}function i(e){return e.getAttribute&&e.getAttribute(I)||""}function a(e,t,n,r,o){var i;if(b.logTopLevelRenders){var a=e._currentElement.props.child,s=a.type;i="React mount: "+("string"==typeof s?s:s.displayName||s.name),console.time(i)}var u=w.mountComponent(e,n,null,_(e,t),o,0);i&&console.timeEnd(i),e._renderedComponent._topLevelWrapper=e,j._mountImageIntoNode(u,t,e,r,n)}function s(e,t,n,r){var o=k.ReactReconcileTransaction.getPooled(!n&&C.useCreateElement);o.perform(a,null,e,t,o,n,r),k.ReactReconcileTransaction.release(o)}function u(e,t,n){for(w.unmountComponent(e,n),t.nodeType===A&&(t=t.documentElement);t.lastChild;)t.removeChild(t.lastChild)}function l(e){var t=o(e);if(t){var n=y.getInstanceFromNode(t);return!(!n||!n._hostParent)}}function c(e){return!(!e||e.nodeType!==R&&e.nodeType!==A&&e.nodeType!==D)}function p(e){var t=o(e),n=t&&y.getInstanceFromNode(t);return n&&!n._hostParent?n:null}function d(e){var t=p(e);return t?t._hostContainerInfo._topLevelWrapper:null}var f=e(112),h=e(9),m=e(11),v=e(120),g=e(25),y=(e(119),e(33)),_=e(34),C=e(36),b=e(53),E=e(57),x=(e(58),e(59)),w=e(66),T=e(70),k=e(71),P=e(130),S=e(108),N=(e(137),e(114)),M=e(116),I=(e(142),m.ID_ATTRIBUTE_NAME),O=m.ROOT_ATTRIBUTE_NAME,R=1,A=9,D=11,L={},U=1,F=function(){this.rootID=U++};F.prototype.isReactComponent={},F.prototype.render=function(){return this.props.child},F.isReactTopLevelWrapper=!0;var j={TopLevelWrapper:F,_instancesByReactRootID:L,scrollMonitor:function(e,t){t()},_updateRootComponent:function(e,t,n,r,o){return j.scrollMonitor(r,function(){T.enqueueElementInternal(e,t,n),o&&T.enqueueCallbackInternal(e,o)}),e},_renderNewRootComponent:function(e,t,n,r){c(t)||f("37"),g.ensureScrollValueMonitoring();var o=S(e,!1);k.batchedUpdates(s,o,t,n,r);var i=o._instance.rootID;return L[i]=o,o},renderSubtreeIntoContainer:function(e,t,n,r){return null!=e&&E.has(e)||f("38"),j._renderSubtreeIntoContainer(e,t,n,r)},_renderSubtreeIntoContainer:function(e,t,n,r){T.validateCallback(r,"ReactDOM.render"),v.isValidElement(t)||f("39","string"==typeof t?" Instead of passing a string like 'div', pass React.createElement('div') or <div />.":"function"==typeof t?" Instead of passing a class like Foo, pass React.createElement(Foo) or <Foo />.":null!=t&&void 0!==t.props?" This may be caused by unintentionally loading two independent copies of React.":"");var a,s=v.createElement(F,{child:t});if(e){var u=E.get(e);a=u._processChildContext(u._context)}else a=P;var c=d(n);if(c){var p=c._currentElement,h=p.props.child;if(M(h,t)){var m=c._renderedComponent.getPublicInstance(),g=r&&function(){r.call(m)};return j._updateRootComponent(c,s,a,n,g),m}j.unmountComponentAtNode(n)}var y=o(n),_=y&&!!i(y),C=l(n),b=_&&!c&&!C,x=j._renderNewRootComponent(s,n,b,a)._renderedComponent.getPublicInstance();return r&&r.call(x),x},render:function(e,t,n){return j._renderSubtreeIntoContainer(null,e,t,n)},unmountComponentAtNode:function(e){c(e)||f("40");var t=d(e);return t?(delete L[t._instance.rootID],k.batchedUpdates(u,t,e,!1),!0):(l(e),1===e.nodeType&&e.hasAttribute(O),!1)},_mountImageIntoNode:function(e,t,n,i,a){if(c(t)||f("41"),i){var s=o(t);if(x.canReuseMarkup(e,s))return void y.precacheNode(n,s);var u=s.getAttribute(x.CHECKSUM_ATTR_NAME);s.removeAttribute(x.CHECKSUM_ATTR_NAME);var l=s.outerHTML;s.setAttribute(x.CHECKSUM_ATTR_NAME,u);var p=e,d=r(p,l),m=" (client) "+p.substring(d-20,d+20)+"\n (server) "+l.substring(d-20,d+20);t.nodeType===A&&f("42",m)}if(t.nodeType===A&&f("43"),a.useCreateElement){for(;t.lastChild;)t.removeChild(t.lastChild);h.insertTreeBefore(t,e,null)}else N(t,e),y.precacheNode(n,t.firstChild)}};t.exports=j},{108:108,11:11,112:112,114:114,116:116,119:119,120:120,130:130,137:137,142:142,25:25,33:33,34:34,36:36,53:53,57:57,58:58,59:59,66:66,70:70,71:71,9:9}],61:[function(e,t,n){"use strict";function r(e,t,n){return{type:"INSERT_MARKUP",content:e,fromIndex:null,fromNode:null,toIndex:n,afterNode:t}}function o(e,t,n){return{type:"MOVE_EXISTING",content:null,fromIndex:e._mountIndex,fromNode:d.getHostNode(e),toIndex:n,afterNode:t}}function i(e,t){return{type:"REMOVE_NODE",content:null,fromIndex:e._mountIndex,fromNode:t,toIndex:null,afterNode:null}}function a(e){return{type:"SET_MARKUP",content:e,fromIndex:null,fromNode:null,toIndex:null,afterNode:null}}function s(e){return{type:"TEXT_CONTENT",content:e,fromIndex:null,fromNode:null,toIndex:null,afterNode:null}}function u(e,t){return t&&(e=e||[],e.push(t)),e}function l(e,t){p.processChildrenUpdates(e,t)}var c=e(112),p=e(28),d=(e(57),e(58),e(119),e(66)),f=e(26),h=(e(129),e(97)),m=(e(137),{Mixin:{_reconcilerInstantiateChildren:function(e,t,n){return f.instantiateChildren(e,t,n)},_reconcilerUpdateChildren:function(e,t,n,r,o,i){var a;return a=h(t,0),f.updateChildren(e,a,n,r,o,this,this._hostContainerInfo,i,0),a},mountChildren:function(e,t,n){var r=this._reconcilerInstantiateChildren(e,t,n);this._renderedChildren=r;var o=[],i=0;for(var a in r)if(r.hasOwnProperty(a)){var s=r[a],u=d.mountComponent(s,t,this,this._hostContainerInfo,n,0);s._mountIndex=i++,o.push(u)}return o},updateTextContent:function(e){var t=this._renderedChildren;f.unmountChildren(t,!1);for(var n in t)t.hasOwnProperty(n)&&c("118");l(this,[s(e)])},updateMarkup:function(e){var t=this._renderedChildren;f.unmountChildren(t,!1);for(var n in t)t.hasOwnProperty(n)&&c("118");l(this,[a(e)])},updateChildren:function(e,t,n){this._updateChildren(e,t,n)},_updateChildren:function(e,t,n){var r=this._renderedChildren,o={},i=[],a=this._reconcilerUpdateChildren(r,e,i,o,t,n);if(a||r){var s,c=null,p=0,f=0,h=0,m=null;for(s in a)if(a.hasOwnProperty(s)){var v=r&&r[s],g=a[s];v===g?(c=u(c,this.moveChild(v,m,p,f)),f=Math.max(v._mountIndex,f),v._mountIndex=p):(v&&(f=Math.max(v._mountIndex,f)),c=u(c,this._mountChildAtIndex(g,i[h],m,p,t,n)),h++),p++,m=d.getHostNode(g)}for(s in o)o.hasOwnProperty(s)&&(c=u(c,this._unmountChild(r[s],o[s])));c&&l(this,c),this._renderedChildren=a}},unmountChildren:function(e){var t=this._renderedChildren;f.unmountChildren(t,e),this._renderedChildren=null},moveChild:function(e,t,n,r){if(e._mountIndex<r)return o(e,t,n)},createChild:function(e,t,n){return r(n,t,e._mountIndex)},removeChild:function(e,t){return i(e,t)},_mountChildAtIndex:function(e,t,n,r,o,i){return e._mountIndex=r,this.createChild(e,n,t)},_unmountChild:function(e,t){var n=this.removeChild(e,t);return e._mountIndex=null,n}}});t.exports=m},{112:112,119:119,129:129,137:137,26:26,28:28,57:57,58:58,66:66,97:97}],62:[function(e,t,n){"use strict";var r=e(112),o=e(120),i=(e(137),{HOST:0,COMPOSITE:1,EMPTY:2,getType:function(e){return null===e||!1===e?i.EMPTY:o.isValidElement(e)?"function"==typeof e.type?i.COMPOSITE:i.HOST:void r("26",e)}});t.exports=i},{112:112,120:120,137:137}],63:[function(e,t,n){"use strict";function r(e){return!(!e||"function"!=typeof e.attachRef||"function"!=typeof e.detachRef)}var o=e(112),i=(e(137),{addComponentAsRefTo:function(e,t,n){r(n)||o("119"),n.attachRef(t,e)},removeComponentAsRefFrom:function(e,t,n){r(n)||o("120");var i=n.getPublicInstance();i&&i.refs[t]===e.getPublicInstance()&&n.detachRef(t)}});t.exports=i},{112:112,137:137}],64:[function(e,t,n){"use strict";t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},{}],65:[function(e,t,n){"use strict";function r(e){this.reinitializeTransaction(),this.renderToStaticMarkup=!1,this.reactMountReady=i.getPooled(null),this.useCreateElement=e}var o=e(143),i=e(6),a=e(24),s=e(25),u=e(56),l=(e(58),e(89)),c=e(70),p={initialize:u.getSelectionInformation,close:u.restoreSelection},d={initialize:function(){var e=s.isEnabled();return s.setEnabled(!1),e},close:function(e){s.setEnabled(e)}},f={initialize:function(){this.reactMountReady.reset()},close:function(){this.reactMountReady.notifyAll()}},h=[p,d,f],m={getTransactionWrappers:function(){return h},getReactMountReady:function(){return this.reactMountReady},getUpdateQueue:function(){return c},checkpoint:function(){return this.reactMountReady.checkpoint()},rollback:function(e){this.reactMountReady.rollback(e)},destructor:function(){i.release(this.reactMountReady),this.reactMountReady=null}};o(r.prototype,l,m),a.addPoolingTo(r),t.exports=r},{143:143,24:24,25:25,56:56,58:58,6:6,70:70,89:89}],66:[function(e,t,n){"use strict";function r(){o.attachRefs(this,this._currentElement)}var o=e(67),i=(e(58),e(142),{mountComponent:function(e,t,n,o,i,a){var s=e.mountComponent(t,n,o,i,a);return e._currentElement&&null!=e._currentElement.ref&&t.getReactMountReady().enqueue(r,e),s},getHostNode:function(e){return e.getHostNode()},unmountComponent:function(e,t){o.detachRefs(e,e._currentElement),e.unmountComponent(t)},receiveComponent:function(e,t,n,i){var a=e._currentElement;if(t!==a||i!==e._context){var s=o.shouldUpdateRefs(a,t);s&&o.detachRefs(e,a),e.receiveComponent(t,n,i),s&&e._currentElement&&null!=e._currentElement.ref&&n.getReactMountReady().enqueue(r,e)}},performUpdateIfNecessary:function(e,t,n){e._updateBatchNumber===n&&e.performUpdateIfNecessary(t)}});t.exports=i},{142:142,58:58,67:67}],67:[function(e,t,n){"use strict";function r(e,t,n){"function"==typeof e?e(t.getPublicInstance()):i.addComponentAsRefTo(t,e,n)}function o(e,t,n){"function"==typeof e?e(null):i.removeComponentAsRefFrom(t,e,n)}var i=e(63),a={};a.attachRefs=function(e,t){if(null!==t&&"object"==typeof t){var n=t.ref;null!=n&&r(n,e,t._owner)}},a.shouldUpdateRefs=function(e,t){var n=null,r=null;null!==e&&"object"==typeof e&&(n=e.ref,r=e._owner);var o=null,i=null;return null!==t&&"object"==typeof t&&(o=t.ref,i=t._owner),n!==o||"string"==typeof o&&i!==r},a.detachRefs=function(e,t){if(null!==t&&"object"==typeof t){var n=t.ref;null!=n&&o(n,e,t._owner)}},t.exports=a},{63:63}],68:[function(e,t,n){"use strict";function r(e){this.reinitializeTransaction(),this.renderToStaticMarkup=e,this.useCreateElement=!1,this.updateQueue=new s(this)}var o=e(143),i=e(24),a=e(89),s=(e(58),e(69)),u=[],l={enqueue:function(){}},c={getTransactionWrappers:function(){return u},getReactMountReady:function(){return l},getUpdateQueue:function(){return this.updateQueue},destructor:function(){},checkpoint:function(){},rollback:function(){}};o(r.prototype,a,c),i.addPoolingTo(r),t.exports=r},{143:143,24:24,58:58,69:69,89:89}],69:[function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=e(70),i=(e(142),function(){function e(t){r(this,e),this.transaction=t}return e.prototype.isMounted=function(e){return!1},e.prototype.enqueueCallback=function(e,t,n){this.transaction.isInTransaction()&&o.enqueueCallback(e,t,n)},e.prototype.enqueueForceUpdate=function(e){this.transaction.isInTransaction()&&o.enqueueForceUpdate(e)},e.prototype.enqueueReplaceState=function(e,t){this.transaction.isInTransaction()&&o.enqueueReplaceState(e,t)},e.prototype.enqueueSetState=function(e,t){this.transaction.isInTransaction()&&o.enqueueSetState(e,t)},e}());t.exports=i},{142:142,70:70}],70:[function(e,t,n){"use strict";function r(e){u.enqueueUpdate(e)}function o(e){var t=typeof e;if("object"!==t)return t;var n=e.constructor&&e.constructor.name||t,r=Object.keys(e);return r.length>0&&r.length<20?n+" (keys: "+r.join(", ")+")":n}function i(e,t){var n=s.get(e);return n||null}var a=e(112),s=(e(119),e(57)),u=(e(58),e(71)),l=(e(137),e(142),{isMounted:function(e){var t=s.get(e);return!!t&&!!t._renderedComponent},enqueueCallback:function(e,t,n){l.validateCallback(t,n);var o=i(e);if(!o)return null;o._pendingCallbacks?o._pendingCallbacks.push(t):o._pendingCallbacks=[t],r(o)},enqueueCallbackInternal:function(e,t){e._pendingCallbacks?e._pendingCallbacks.push(t):e._pendingCallbacks=[t],r(e)},enqueueForceUpdate:function(e){var t=i(e,"forceUpdate");t&&(t._pendingForceUpdate=!0,r(t))},enqueueReplaceState:function(e,t,n){var o=i(e,"replaceState");o&&(o._pendingStateQueue=[t],o._pendingReplaceState=!0,void 0!==n&&null!==n&&(l.validateCallback(n,"replaceState"),o._pendingCallbacks?o._pendingCallbacks.push(n):o._pendingCallbacks=[n]),r(o))},enqueueSetState:function(e,t){var n=i(e,"setState");n&&((n._pendingStateQueue||(n._pendingStateQueue=[])).push(t),r(n))},enqueueElementInternal:function(e,t,n){e._pendingElement=t,e._context=n,r(e)},validateCallback:function(e,t){e&&"function"!=typeof e&&a("122",t,o(e))}});t.exports=l},{112:112,119:119,137:137,142:142,57:57,58:58,71:71}],71:[function(e,t,n){"use strict";function r(){P.ReactReconcileTransaction&&b||c("123")}function o(){this.reinitializeTransaction(),this.dirtyComponentsLength=null,this.callbackQueue=d.getPooled(),this.reconcileTransaction=P.ReactReconcileTransaction.getPooled(!0)}function i(e,t,n,o,i,a){return r(),b.batchedUpdates(e,t,n,o,i,a)}function a(e,t){return e._mountOrder-t._mountOrder}function s(e){var t=e.dirtyComponentsLength;t!==g.length&&c("124",t,g.length),g.sort(a),y++;for(var n=0;n<t;n++){var r=g[n],o=r._pendingCallbacks;r._pendingCallbacks=null;var i;if(h.logTopLevelRenders){var s=r;r._currentElement.type.isReactTopLevelWrapper&&(s=r._renderedComponent),i="React update: "+s.getName(),console.time(i)}if(m.performUpdateIfNecessary(r,e.reconcileTransaction,y),i&&console.timeEnd(i),o)for(var u=0;u<o.length;u++)e.callbackQueue.enqueue(o[u],r.getPublicInstance())}}function u(e){if(r(),!b.isBatchingUpdates)return void b.batchedUpdates(u,e);g.push(e),null==e._updateBatchNumber&&(e._updateBatchNumber=y+1)}function l(e,t){b.isBatchingUpdates||c("125"),_.enqueue(e,t),C=!0}var c=e(112),p=e(143),d=e(6),f=e(24),h=e(53),m=e(66),v=e(89),g=(e(137),[]),y=0,_=d.getPooled(),C=!1,b=null,E={initialize:function(){this.dirtyComponentsLength=g.length},close:function(){this.dirtyComponentsLength!==g.length?(g.splice(0,this.dirtyComponentsLength),T()):g.length=0}},x={initialize:function(){this.callbackQueue.reset()},close:function(){this.callbackQueue.notifyAll()}},w=[E,x];p(o.prototype,v,{getTransactionWrappers:function(){return w},destructor:function(){this.dirtyComponentsLength=null,d.release(this.callbackQueue),this.callbackQueue=null,P.ReactReconcileTransaction.release(this.reconcileTransaction),this.reconcileTransaction=null},perform:function(e,t,n){return v.perform.call(this,this.reconcileTransaction.perform,this.reconcileTransaction,e,t,n)}}),f.addPoolingTo(o);var T=function(){for(;g.length||C;){if(g.length){var e=o.getPooled();e.perform(s,null,e),o.release(e)}if(C){C=!1;var t=_;_=d.getPooled(),t.notifyAll(),d.release(t)}}},k={injectReconcileTransaction:function(e){e||c("126"),P.ReactReconcileTransaction=e},injectBatchingStrategy:function(e){e||c("127"),"function"!=typeof e.batchedUpdates&&c("128"),"boolean"!=typeof e.isBatchingUpdates&&c("129"),b=e}},P={ReactReconcileTransaction:null,batchedUpdates:i,enqueueUpdate:u,flushBatchedUpdates:T,injection:k,asap:l};t.exports=P},{112:112,137:137,143:143,24:24,53:53,6:6,66:66,89:89}],72:[function(e,t,n){"use strict";t.exports="15.5.4"},{}],73:[function(e,t,n){"use strict";var r={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"},o={accentHeight:"accent-height",accumulate:0,additive:0,alignmentBaseline:"alignment-baseline",allowReorder:"allowReorder",alphabetic:0,amplitude:0,arabicForm:"arabic-form",ascent:0,attributeName:"attributeName",attributeType:"attributeType",autoReverse:"autoReverse",azimuth:0,baseFrequency:"baseFrequency",baseProfile:"baseProfile",baselineShift:"baseline-shift",bbox:0,begin:0,bias:0,by:0,calcMode:"calcMode",capHeight:"cap-height",clip:0,clipPath:"clip-path",clipRule:"clip-rule",clipPathUnits:"clipPathUnits",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",contentScriptType:"contentScriptType",contentStyleType:"contentStyleType",cursor:0,cx:0,cy:0,d:0,decelerate:0,descent:0,diffuseConstant:"diffuseConstant",direction:0,display:0,divisor:0,dominantBaseline:"dominant-baseline",dur:0,dx:0,dy:0,edgeMode:"edgeMode",elevation:0,enableBackground:"enable-background",end:0,exponent:0,externalResourcesRequired:"externalResourcesRequired",fill:0,fillOpacity:"fill-opacity",fillRule:"fill-rule",filter:0,filterRes:"filterRes",filterUnits:"filterUnits",floodColor:"flood-color",floodOpacity:"flood-opacity",focusable:0,fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",format:0,from:0,fx:0,fy:0,g1:0,g2:0,glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",glyphRef:"glyphRef",gradientTransform:"gradientTransform",gradientUnits:"gradientUnits",hanging:0,horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",ideographic:0,imageRendering:"image-rendering",in:0,in2:0,intercept:0,k:0,k1:0,k2:0,k3:0,k4:0,kernelMatrix:"kernelMatrix",kernelUnitLength:"kernelUnitLength",kerning:0,keyPoints:"keyPoints",keySplines:"keySplines",keyTimes:"keyTimes",lengthAdjust:"lengthAdjust",letterSpacing:"letter-spacing",lightingColor:"lighting-color",limitingConeAngle:"limitingConeAngle",local:0,markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",markerHeight:"markerHeight",markerUnits:"markerUnits",markerWidth:"markerWidth",mask:0,maskContentUnits:"maskContentUnits",maskUnits:"maskUnits",mathematical:0,mode:0,numOctaves:"numOctaves",offset:0,opacity:0,operator:0,order:0,orient:0,orientation:0,origin:0,overflow:0,overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pathLength:"pathLength",patternContentUnits:"patternContentUnits",patternTransform:"patternTransform",patternUnits:"patternUnits",pointerEvents:"pointer-events",points:0,pointsAtX:"pointsAtX",pointsAtY:"pointsAtY",pointsAtZ:"pointsAtZ",preserveAlpha:"preserveAlpha",preserveAspectRatio:"preserveAspectRatio",primitiveUnits:"primitiveUnits",r:0,radius:0,refX:"refX",refY:"refY",renderingIntent:"rendering-intent",repeatCount:"repeatCount",repeatDur:"repeatDur",requiredExtensions:"requiredExtensions",requiredFeatures:"requiredFeatures",restart:0,result:0,rotate:0,rx:0,ry:0,scale:0,seed:0,shapeRendering:"shape-rendering",slope:0,spacing:0,specularConstant:"specularConstant",specularExponent:"specularExponent",speed:0,spreadMethod:"spreadMethod",startOffset:"startOffset",stdDeviation:"stdDeviation",stemh:0,stemv:0,stitchTiles:"stitchTiles",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",string:0,stroke:0,strokeDasharray:"stroke-dasharray",strokeDashoffset:"stroke-dashoffset",strokeLinecap:"stroke-linecap",strokeLinejoin:"stroke-linejoin",strokeMiterlimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",surfaceScale:"surfaceScale",systemLanguage:"systemLanguage",tableValues:"tableValues",targetX:"targetX",targetY:"targetY",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",textLength:"textLength",to:0,transform:0,u1:0,u2:0,underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicode:0,unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",values:0,vectorEffect:"vector-effect",version:0,vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",viewBox:"viewBox",viewTarget:"viewTarget",visibility:0,widths:0,wordSpacing:"word-spacing",writingMode:"writing-mode",x:0,xHeight:"x-height",x1:0,x2:0,xChannelSelector:"xChannelSelector",xlinkActuate:"xlink:actuate",xlinkArcrole:"xlink:arcrole",xlinkHref:"xlink:href",xlinkRole:"xlink:role",xlinkShow:"xlink:show",xlinkTitle:"xlink:title",xlinkType:"xlink:type",xmlBase:"xml:base",xmlns:0,xmlnsXlink:"xmlns:xlink",xmlLang:"xml:lang",xmlSpace:"xml:space",y:0,y1:0,y2:0,yChannelSelector:"yChannelSelector",z:0,zoomAndPan:"zoomAndPan"},i={Properties:{},DOMAttributeNamespaces:{xlinkActuate:r.xlink,xlinkArcrole:r.xlink,xlinkHref:r.xlink,xlinkRole:r.xlink,xlinkShow:r.xlink,xlinkTitle:r.xlink,xlinkType:r.xlink,xmlBase:r.xml,xmlLang:r.xml,xmlSpace:r.xml},DOMAttributeNames:{}};Object.keys(o).forEach(function(e){i.Properties[e]=0,o[e]&&(i.DOMAttributeNames[e]=o[e])}),t.exports=i},{}],74:[function(e,t,n){"use strict";function r(e){if("selectionStart"in e&&u.hasSelectionCapabilities(e))return{start:e.selectionStart,end:e.selectionEnd};if(window.getSelection){var t=window.getSelection();return{anchorNode:t.anchorNode,anchorOffset:t.anchorOffset,focusNode:t.focusNode,focusOffset:t.focusOffset}}if(document.selection){var n=document.selection.createRange();return{parentElement:n.parentElement(),text:n.text,top:n.boundingTop,left:n.boundingLeft}}}function o(e,t){if(y||null==m||m!==c())return null;var n=r(m);if(!g||!d(g,n)){g=n;var o=l.getPooled(h.select,v,e,t);return o.type="select",o.target=m,i.accumulateTwoPhaseDispatches(o),o}return null}var i=e(19),a=e(123),s=e(33),u=e(56),l=e(80),c=e(132),p=e(110),d=e(141),f=a.canUseDOM&&"documentMode"in document&&document.documentMode<=11,h={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},dependencies:["topBlur","topContextMenu","topFocus","topKeyDown","topKeyUp","topMouseDown","topMouseUp","topSelectionChange"]}},m=null,v=null,g=null,y=!1,_=!1,C={eventTypes:h,extractEvents:function(e,t,n,r){if(!_)return null;var i=t?s.getNodeFromInstance(t):window;switch(e){case"topFocus":(p(i)||"true"===i.contentEditable)&&(m=i,v=t,g=null);break
;case"topBlur":m=null,v=null,g=null;break;case"topMouseDown":y=!0;break;case"topContextMenu":case"topMouseUp":return y=!1,o(n,r);case"topSelectionChange":if(f)break;case"topKeyDown":case"topKeyUp":return o(n,r)}return null},didPutListener:function(e,t,n){"onSelect"===t&&(_=!0)}};t.exports=C},{110:110,123:123,132:132,141:141,19:19,33:33,56:56,80:80}],75:[function(e,t,n){"use strict";function r(e){return"."+e._rootNodeID}function o(e){return"button"===e||"input"===e||"select"===e||"textarea"===e}var i=e(112),a=e(122),s=e(19),u=e(33),l=e(76),c=e(77),p=e(80),d=e(81),f=e(83),h=e(84),m=e(79),v=e(85),g=e(86),y=e(87),_=e(88),C=e(129),b=e(99),E=(e(137),{}),x={};["abort","animationEnd","animationIteration","animationStart","blur","canPlay","canPlayThrough","click","contextMenu","copy","cut","doubleClick","drag","dragEnd","dragEnter","dragExit","dragLeave","dragOver","dragStart","drop","durationChange","emptied","encrypted","ended","error","focus","input","invalid","keyDown","keyPress","keyUp","load","loadedData","loadedMetadata","loadStart","mouseDown","mouseMove","mouseOut","mouseOver","mouseUp","paste","pause","play","playing","progress","rateChange","reset","scroll","seeked","seeking","stalled","submit","suspend","timeUpdate","touchCancel","touchEnd","touchMove","touchStart","transitionEnd","volumeChange","waiting","wheel"].forEach(function(e){var t=e[0].toUpperCase()+e.slice(1),n="on"+t,r="top"+t,o={phasedRegistrationNames:{bubbled:n,captured:n+"Capture"},dependencies:[r]};E[e]=o,x[r]=o});var w={},T={eventTypes:E,extractEvents:function(e,t,n,r){var o=x[e];if(!o)return null;var a;switch(e){case"topAbort":case"topCanPlay":case"topCanPlayThrough":case"topDurationChange":case"topEmptied":case"topEncrypted":case"topEnded":case"topError":case"topInput":case"topInvalid":case"topLoad":case"topLoadedData":case"topLoadedMetadata":case"topLoadStart":case"topPause":case"topPlay":case"topPlaying":case"topProgress":case"topRateChange":case"topReset":case"topSeeked":case"topSeeking":case"topStalled":case"topSubmit":case"topSuspend":case"topTimeUpdate":case"topVolumeChange":case"topWaiting":a=p;break;case"topKeyPress":if(0===b(n))return null;case"topKeyDown":case"topKeyUp":a=f;break;case"topBlur":case"topFocus":a=d;break;case"topClick":if(2===n.button)return null;case"topDoubleClick":case"topMouseDown":case"topMouseMove":case"topMouseUp":case"topMouseOut":case"topMouseOver":case"topContextMenu":a=h;break;case"topDrag":case"topDragEnd":case"topDragEnter":case"topDragExit":case"topDragLeave":case"topDragOver":case"topDragStart":case"topDrop":a=m;break;case"topTouchCancel":case"topTouchEnd":case"topTouchMove":case"topTouchStart":a=v;break;case"topAnimationEnd":case"topAnimationIteration":case"topAnimationStart":a=l;break;case"topTransitionEnd":a=g;break;case"topScroll":a=y;break;case"topWheel":a=_;break;case"topCopy":case"topCut":case"topPaste":a=c}a||i("86",e);var u=a.getPooled(o,t,n,r);return s.accumulateTwoPhaseDispatches(u),u},didPutListener:function(e,t,n){if("onClick"===t&&!o(e._tag)){var i=r(e),s=u.getNodeFromInstance(e);w[i]||(w[i]=a.listen(s,"click",C))}},willDeleteListener:function(e,t){if("onClick"===t&&!o(e._tag)){var n=r(e);w[n].remove(),delete w[n]}}};t.exports=T},{112:112,122:122,129:129,137:137,19:19,33:33,76:76,77:77,79:79,80:80,81:81,83:83,84:84,85:85,86:86,87:87,88:88,99:99}],76:[function(e,t,n){"use strict";function r(e,t,n,r){return o.call(this,e,t,n,r)}var o=e(80),i={animationName:null,elapsedTime:null,pseudoElement:null};o.augmentClass(r,i),t.exports=r},{80:80}],77:[function(e,t,n){"use strict";function r(e,t,n,r){return o.call(this,e,t,n,r)}var o=e(80),i={clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}};o.augmentClass(r,i),t.exports=r},{80:80}],78:[function(e,t,n){"use strict";function r(e,t,n,r){return o.call(this,e,t,n,r)}var o=e(80),i={data:null};o.augmentClass(r,i),t.exports=r},{80:80}],79:[function(e,t,n){"use strict";function r(e,t,n,r){return o.call(this,e,t,n,r)}var o=e(84),i={dataTransfer:null};o.augmentClass(r,i),t.exports=r},{84:84}],80:[function(e,t,n){"use strict";function r(e,t,n,r){this.dispatchConfig=e,this._targetInst=t,this.nativeEvent=n;var o=this.constructor.Interface;for(var i in o)if(o.hasOwnProperty(i)){var s=o[i];s?this[i]=s(n):"target"===i?this.target=r:this[i]=n[i]}var u=null!=n.defaultPrevented?n.defaultPrevented:!1===n.returnValue;return this.isDefaultPrevented=u?a.thatReturnsTrue:a.thatReturnsFalse,this.isPropagationStopped=a.thatReturnsFalse,this}var o=e(143),i=e(24),a=e(129),s=(e(142),["dispatchConfig","_targetInst","nativeEvent","isDefaultPrevented","isPropagationStopped","_dispatchListeners","_dispatchInstances"]),u={type:null,target:null,currentTarget:a.thatReturnsNull,eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};o(r.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!=typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=a.thatReturnsTrue)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!=typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=a.thatReturnsTrue)},persist:function(){this.isPersistent=a.thatReturnsTrue},isPersistent:a.thatReturnsFalse,destructor:function(){var e=this.constructor.Interface;for(var t in e)this[t]=null;for(var n=0;n<s.length;n++)this[s[n]]=null}}),r.Interface=u,r.augmentClass=function(e,t){var n=this,r=function(){};r.prototype=n.prototype;var a=new r;o(a,e.prototype),e.prototype=a,e.prototype.constructor=e,e.Interface=o({},n.Interface,t),e.augmentClass=n.augmentClass,i.addPoolingTo(e,i.fourArgumentPooler)},i.addPoolingTo(r,i.fourArgumentPooler),t.exports=r},{129:129,142:142,143:143,24:24}],81:[function(e,t,n){"use strict";function r(e,t,n,r){return o.call(this,e,t,n,r)}var o=e(87),i={relatedTarget:null};o.augmentClass(r,i),t.exports=r},{87:87}],82:[function(e,t,n){"use strict";function r(e,t,n,r){return o.call(this,e,t,n,r)}var o=e(80),i={data:null};o.augmentClass(r,i),t.exports=r},{80:80}],83:[function(e,t,n){"use strict";function r(e,t,n,r){return o.call(this,e,t,n,r)}var o=e(87),i=e(99),a=e(100),s=e(101),u={key:a,location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:s,charCode:function(e){return"keypress"===e.type?i(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?i(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}};o.augmentClass(r,u),t.exports=r},{100:100,101:101,87:87,99:99}],84:[function(e,t,n){"use strict";function r(e,t,n,r){return o.call(this,e,t,n,r)}var o=e(87),i=e(90),a=e(101),s={screenX:null,screenY:null,clientX:null,clientY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:a,button:function(e){var t=e.button;return"which"in e?t:2===t?2:4===t?1:0},buttons:null,relatedTarget:function(e){return e.relatedTarget||(e.fromElement===e.srcElement?e.toElement:e.fromElement)},pageX:function(e){return"pageX"in e?e.pageX:e.clientX+i.currentScrollLeft},pageY:function(e){return"pageY"in e?e.pageY:e.clientY+i.currentScrollTop}};o.augmentClass(r,s),t.exports=r},{101:101,87:87,90:90}],85:[function(e,t,n){"use strict";function r(e,t,n,r){return o.call(this,e,t,n,r)}var o=e(87),i=e(101),a={touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:i};o.augmentClass(r,a),t.exports=r},{101:101,87:87}],86:[function(e,t,n){"use strict";function r(e,t,n,r){return o.call(this,e,t,n,r)}var o=e(80),i={propertyName:null,elapsedTime:null,pseudoElement:null};o.augmentClass(r,i),t.exports=r},{80:80}],87:[function(e,t,n){"use strict";function r(e,t,n,r){return o.call(this,e,t,n,r)}var o=e(80),i=e(102),a={view:function(e){if(e.view)return e.view;var t=i(e);if(t.window===t)return t;var n=t.ownerDocument;return n?n.defaultView||n.parentWindow:window},detail:function(e){return e.detail||0}};o.augmentClass(r,a),t.exports=r},{102:102,80:80}],88:[function(e,t,n){"use strict";function r(e,t,n,r){return o.call(this,e,t,n,r)}var o=e(84),i={deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:null,deltaMode:null};o.augmentClass(r,i),t.exports=r},{84:84}],89:[function(e,t,n){"use strict";var r=e(112),o=(e(137),{}),i={reinitializeTransaction:function(){this.transactionWrappers=this.getTransactionWrappers(),this.wrapperInitData?this.wrapperInitData.length=0:this.wrapperInitData=[],this._isInTransaction=!1},_isInTransaction:!1,getTransactionWrappers:null,isInTransaction:function(){return!!this._isInTransaction},perform:function(e,t,n,o,i,a,s,u){this.isInTransaction()&&r("27");var l,c;try{this._isInTransaction=!0,l=!0,this.initializeAll(0),c=e.call(t,n,o,i,a,s,u),l=!1}finally{try{if(l)try{this.closeAll(0)}catch(e){}else this.closeAll(0)}finally{this._isInTransaction=!1}}return c},initializeAll:function(e){for(var t=this.transactionWrappers,n=e;n<t.length;n++){var r=t[n];try{this.wrapperInitData[n]=o,this.wrapperInitData[n]=r.initialize?r.initialize.call(this):null}finally{if(this.wrapperInitData[n]===o)try{this.initializeAll(n+1)}catch(e){}}}},closeAll:function(e){this.isInTransaction()||r("28");for(var t=this.transactionWrappers,n=e;n<t.length;n++){var i,a=t[n],s=this.wrapperInitData[n];try{i=!0,s!==o&&a.close&&a.close.call(this,s),i=!1}finally{if(i)try{this.closeAll(n+1)}catch(e){}}}this.wrapperInitData.length=0}};t.exports=i},{112:112,137:137}],90:[function(e,t,n){"use strict";var r={currentScrollLeft:0,currentScrollTop:0,refreshScrollValues:function(e){r.currentScrollLeft=e.x,r.currentScrollTop=e.y}};t.exports=r},{}],91:[function(e,t,n){"use strict";function r(e,t){return null==t&&o("30"),null==e?t:Array.isArray(e)?Array.isArray(t)?(e.push.apply(e,t),e):(e.push(t),e):Array.isArray(t)?[e].concat(t):[e,t]}var o=e(112);e(137);t.exports=r},{112:112,137:137}],92:[function(e,t,n){"use strict";function r(e){for(var t=1,n=0,r=0,i=e.length,a=-4&i;r<a;){for(var s=Math.min(r+4096,a);r<s;r+=4)n+=(t+=e.charCodeAt(r))+(t+=e.charCodeAt(r+1))+(t+=e.charCodeAt(r+2))+(t+=e.charCodeAt(r+3));t%=o,n%=o}for(;r<i;r++)n+=t+=e.charCodeAt(r);return t%=o,n%=o,t|n<<16}var o=65521;t.exports=r},{}],93:[function(e,t,n){"use strict";var r=function(e){return"undefined"!=typeof MSApp&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,o)})}:e};t.exports=r},{}],94:[function(e,t,n){"use strict";function r(e,t,n){return null==t||"boolean"==typeof t||""===t?"":isNaN(t)||0===t||i.hasOwnProperty(e)&&i[e]?""+t:("string"==typeof t&&(t=t.trim()),t+"px")}var o=e(4),i=(e(142),o.isUnitlessNumber);t.exports=r},{142:142,4:4}],95:[function(e,t,n){"use strict";function r(e){var t=""+e,n=i.exec(t);if(!n)return t;var r,o="",a=0,s=0;for(a=n.index;a<t.length;a++){switch(t.charCodeAt(a)){case 34:r="&quot;";break;case 38:r="&amp;";break;case 39:r="&#x27;";break;case 60:r="&lt;";break;case 62:r="&gt;";break;default:continue}s!==a&&(o+=t.substring(s,a)),s=a+1,o+=r}return s!==a?o+t.substring(s,a):o}function o(e){return"boolean"==typeof e||"number"==typeof e?""+e:r(e)}var i=/["'&<>]/;t.exports=o},{}],96:[function(e,t,n){"use strict";function r(e){if(null==e)return null;if(1===e.nodeType)return e;var t=a.get(e);if(t)return t=s(t),t?i.getNodeFromInstance(t):null;"function"==typeof e.render?o("44"):o("45",Object.keys(e))}var o=e(112),i=(e(119),e(33)),a=e(57),s=e(103);e(137),e(142);t.exports=r},{103:103,112:112,119:119,137:137,142:142,33:33,57:57}],97:[function(e,t,n){(function(n){"use strict";function r(e,t,n,r){if(e&&"object"==typeof e){var o=e;void 0===o[n]&&null!=t&&(o[n]=t)}}function o(e,t){if(null==e)return e;var n={};return i(e,r,n),n}var i=(e(22),e(117));e(142);void 0!==n&&n.env,t.exports=o}).call(this,void 0)},{117:117,142:142,22:22}],98:[function(e,t,n){"use strict";function r(e,t,n){Array.isArray(e)?e.forEach(t,n):e&&t.call(n,e)}t.exports=r},{}],99:[function(e,t,n){"use strict";function r(e){var t,n=e.keyCode;return"charCode"in e?0===(t=e.charCode)&&13===n&&(t=13):t=n,t>=32||13===t?t:0}t.exports=r},{}],100:[function(e,t,n){"use strict";function r(e){if(e.key){var t=i[e.key]||e.key;if("Unidentified"!==t)return t}if("keypress"===e.type){var n=o(e);return 13===n?"Enter":String.fromCharCode(n)}return"keydown"===e.type||"keyup"===e.type?a[e.keyCode]||"Unidentified":""}var o=e(99),i={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},a={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"};t.exports=r},{99:99}],101:[function(e,t,n){"use strict";function r(e){var t=this,n=t.nativeEvent;if(n.getModifierState)return n.getModifierState(e);var r=i[e];return!!r&&!!n[r]}function o(e){return r}var i={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};t.exports=o},{}],102:[function(e,t,n){"use strict";function r(e){var t=e.target||e.srcElement||window;return t.correspondingUseElement&&(t=t.correspondingUseElement),3===t.nodeType?t.parentNode:t}t.exports=r},{}],103:[function(e,t,n){"use strict";function r(e){for(var t;(t=e._renderedNodeType)===o.COMPOSITE;)e=e._renderedComponent;return t===o.HOST?e._renderedComponent:t===o.EMPTY?null:void 0}var o=e(62);t.exports=r},{62:62}],104:[function(e,t,n){"use strict";function r(e){var t=e&&(o&&e[o]||e[i]);if("function"==typeof t)return t}var o="function"==typeof Symbol&&Symbol.iterator,i="@@iterator";t.exports=r},{}],105:[function(e,t,n){"use strict";function r(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function o(e){for(;e;){if(e.nextSibling)return e.nextSibling;e=e.parentNode}}function i(e,t){for(var n=r(e),i=0,a=0;n;){if(3===n.nodeType){if(a=i+n.textContent.length,i<=t&&a>=t)return{node:n,offset:t-i};i=a}n=r(o(n))}}t.exports=i},{}],106:[function(e,t,n){"use strict";function r(){return!i&&o.canUseDOM&&(i="textContent"in document.documentElement?"textContent":"innerText"),i}var o=e(123),i=null;t.exports=r},{123:123}],107:[function(e,t,n){"use strict";function r(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n["ms"+e]="MS"+t,n["O"+e]="o"+t.toLowerCase(),n}function o(e){if(s[e])return s[e];if(!a[e])return e;var t=a[e];for(var n in t)if(t.hasOwnProperty(n)&&n in u)return s[e]=t[n];return""}var i=e(123),a={animationend:r("Animation","AnimationEnd"),animationiteration:r("Animation","AnimationIteration"),animationstart:r("Animation","AnimationStart"),transitionend:r("Transition","TransitionEnd")},s={},u={};i.canUseDOM&&(u=document.createElement("div").style,"AnimationEvent"in window||(delete a.animationend.animation,delete a.animationiteration.animation,delete a.animationstart.animation),"TransitionEvent"in window||delete a.transitionend.transition),t.exports=o},{123:123}],108:[function(e,t,n){"use strict";function r(e){if(e){var t=e.getName();if(t)return" Check the render method of `"+t+"`."}return""}function o(e){return"function"==typeof e&&void 0!==e.prototype&&"function"==typeof e.prototype.mountComponent&&"function"==typeof e.prototype.receiveComponent}function i(e,t){var n;if(null===e||!1===e)n=l.create(i);else if("object"==typeof e){var s=e,u=s.type;if("function"!=typeof u&&"string"!=typeof u){var d="";d+=r(s._owner),a("130",null==u?u:typeof u,d)}"string"==typeof s.type?n=c.createInternalComponent(s):o(s.type)?(n=new s.type(s),n.getHostNode||(n.getHostNode=n.getNativeNode)):n=new p(s)}else"string"==typeof e||"number"==typeof e?n=c.createInstanceForText(e):a("131",typeof e);return n._mountIndex=0,n._mountImage=null,n}var a=e(112),s=e(143),u=e(29),l=e(49),c=e(54),p=(e(121),e(137),e(142),function(e){this.construct(e)});s(p.prototype,u,{_instantiateReactComponent:i}),t.exports=i},{112:112,121:121,137:137,142:142,143:143,29:29,49:49,54:54}],109:[function(e,t,n){"use strict";function r(e,t){if(!i.canUseDOM||t&&!("addEventListener"in document))return!1;var n="on"+e,r=n in document;if(!r){var a=document.createElement("div");a.setAttribute(n,"return;"),r="function"==typeof a[n]}return!r&&o&&"wheel"===e&&(r=document.implementation.hasFeature("Events.wheel","3.0")),r}var o,i=e(123);i.canUseDOM&&(o=document.implementation&&document.implementation.hasFeature&&!0!==document.implementation.hasFeature("","")),t.exports=r},{123:123}],110:[function(e,t,n){"use strict";function r(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!o[e.type]:"textarea"===t}var o={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};t.exports=r},{}],111:[function(e,t,n){"use strict";function r(e){return'"'+o(e)+'"'}var o=e(95);t.exports=r},{95:95}],112:[function(e,t,n){"use strict";function r(e){for(var t=arguments.length-1,n="Minified React error #"+e+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant="+e,r=0;r<t;r++)n+="&args[]="+encodeURIComponent(arguments[r+1]);n+=" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";var o=new Error(n);throw o.name="Invariant Violation",o.framesToPop=1,o}t.exports=r},{}],113:[function(e,t,n){"use strict";var r=e(60);t.exports=r.renderSubtreeIntoContainer},{60:60}],114:[function(e,t,n){"use strict";var r,o=e(123),i=e(10),a=/^[ \r\n\t\f]/,s=/<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/,u=e(93),l=u(function(e,t){if(e.namespaceURI!==i.svg||"innerHTML"in e)e.innerHTML=t;else{r=r||document.createElement("div"),r.innerHTML="<svg>"+t+"</svg>";for(var n=r.firstChild;n.firstChild;)e.appendChild(n.firstChild)}});if(o.canUseDOM){var c=document.createElement("div");c.innerHTML=" ",""===c.innerHTML&&(l=function(e,t){if(e.parentNode&&e.parentNode.replaceChild(e,e),a.test(t)||"<"===t[0]&&s.test(t)){e.innerHTML=String.fromCharCode(65279)+t;var n=e.firstChild;1===n.data.length?e.removeChild(n):n.deleteData(0,1)}else e.innerHTML=t}),c=null}t.exports=l},{10:10,123:123,93:93}],115:[function(e,t,n){"use strict";var r=e(123),o=e(95),i=e(114),a=function(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t};r.canUseDOM&&("textContent"in document.documentElement||(a=function(e,t){if(3===e.nodeType)return void(e.nodeValue=t);i(e,o(t))})),t.exports=a},{114:114,123:123,95:95}],116:[function(e,t,n){"use strict";function r(e,t){var n=null===e||!1===e,r=null===t||!1===t;if(n||r)return n===r;var o=typeof e,i=typeof t;return"string"===o||"number"===o?"string"===i||"number"===i:"object"===i&&e.type===t.type&&e.key===t.key}t.exports=r},{}],117:[function(e,t,n){"use strict";function r(e,t){return e&&"object"==typeof e&&null!=e.key?l.escape(e.key):t.toString(36)}function o(e,t,n,i){var d=typeof e;if("undefined"!==d&&"boolean"!==d||(e=null),null===e||"string"===d||"number"===d||"object"===d&&e.$$typeof===s)return n(i,e,""===t?c+r(e,0):t),1;var f,h,m=0,v=""===t?c:t+p;if(Array.isArray(e))for(var g=0;g<e.length;g++)f=e[g],h=v+r(f,g),m+=o(f,h,n,i);else{var y=u(e);if(y){var _,C=y.call(e);if(y!==e.entries)for(var b=0;!(_=C.next()).done;)f=_.value,h=v+r(f,b++),m+=o(f,h,n,i);else for(;!(_=C.next()).done;){var E=_.value;E&&(f=E[1],h=v+l.escape(E[0])+p+r(f,0),m+=o(f,h,n,i))}}else if("object"===d){var x=String(e);a("31","[object Object]"===x?"object with keys {"+Object.keys(e).join(", ")+"}":x,"")}}return m}function i(e,t,n){return null==e?0:o(e,"",t,n)}var a=e(112),s=(e(119),e(48)),u=e(104),l=(e(137),e(22)),c=(e(142),"."),p=":";t.exports=i},{104:104,112:112,119:119,137:137,142:142,22:22,48:48}],118:[function(e,t,n){"use strict";var r=(e(143),e(129)),o=(e(142),r);t.exports=o},{129:129,142:142,143:143}],119:[function(t,n,r){"use strict";var o=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;n.exports=o.ReactCurrentOwner},{}],120:[function(t,n,r){"use strict";n.exports=e},{}],121:[function(t,n,r){"use strict";var o=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;n.exports=o.getNextDebugID},{}],122:[function(e,t,n){"use strict";var r=e(129),o={listen:function(e,t,n){return e.addEventListener?(e.addEventListener(t,n,!1),{remove:function(){e.removeEventListener(t,n,!1)}}):e.attachEvent?(e.attachEvent("on"+t,n),{remove:function(){e.detachEvent("on"+t,n)}}):void 0},capture:function(e,t,n){return e.addEventListener?(e.addEventListener(t,n,!0),{remove:function(){e.removeEventListener(t,n,!0)}}):{remove:r}},registerDefault:function(){}};t.exports=o},{129:129}],123:[function(e,t,n){"use strict";var r=!("undefined"==typeof window||!window.document||!window.document.createElement),o={canUseDOM:r,canUseWorkers:"undefined"!=typeof Worker,canUseEventListeners:r&&!(!window.addEventListener&&!window.attachEvent),canUseViewport:r&&!!window.screen,isInWorker:!r};t.exports=o},{}],124:[function(e,t,n){"use strict";function r(e){return e.replace(o,function(e,t){return t.toUpperCase()})}var o=/-(.)/g;t.exports=r},{}],125:[function(e,t,n){"use strict";function r(e){return o(e.replace(i,"ms-"))}var o=e(124),i=/^-ms-/;t.exports=r},{124:124}],126:[function(e,t,n){"use strict";function r(e,t){return!(!e||!t)&&(e===t||!o(e)&&(o(t)?r(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}var o=e(139);t.exports=r},{139:139}],127:[function(e,t,n){"use strict";function r(e){var t=e.length;if((Array.isArray(e)||"object"!=typeof e&&"function"!=typeof e)&&a(!1),"number"!=typeof t&&a(!1),0===t||t-1 in e||a(!1),"function"==typeof e.callee&&a(!1),e.hasOwnProperty)try{return Array.prototype.slice.call(e)}catch(e){}for(var n=Array(t),r=0;r<t;r++)n[r]=e[r];return n}function o(e){return!!e&&("object"==typeof e||"function"==typeof e)&&"length"in e&&!("setInterval"in e)&&"number"!=typeof e.nodeType&&(Array.isArray(e)||"callee"in e||"item"in e)}function i(e){return o(e)?Array.isArray(e)?e.slice():r(e):[e]}var a=e(137);t.exports=i},{137:137}],128:[function(e,t,n){"use strict";function r(e){var t=e.match(c);return t&&t[1].toLowerCase()}function o(e,t){var n=l;l||u(!1);var o=r(e),i=o&&s(o);if(i){n.innerHTML=i[1]+e+i[2];for(var c=i[0];c--;)n=n.lastChild}else n.innerHTML=e;var p=n.getElementsByTagName("script");p.length&&(t||u(!1),a(p).forEach(t));for(var d=Array.from(n.childNodes);n.lastChild;)n.removeChild(n.lastChild);return d}var i=e(123),a=e(127),s=e(133),u=e(137),l=i.canUseDOM?document.createElement("div"):null,c=/^\s*<(\w+)/;t.exports=o},{123:123,127:127,133:133,137:137}],129:[function(e,t,n){"use strict";function r(e){return function(){return e}}var o=function(){};o.thatReturns=r,o.thatReturnsFalse=r(!1),o.thatReturnsTrue=r(!0),o.thatReturnsNull=r(null),o.thatReturnsThis=function(){return this},o.thatReturnsArgument=function(e){return e},t.exports=o},{}],130:[function(e,t,n){"use strict";var r={};t.exports=r},{}],131:[function(e,t,n){"use strict";function r(e){try{e.focus()}catch(e){}}t.exports=r},{}],132:[function(e,t,n){"use strict";function r(e){if(void 0===(e=e||("undefined"!=typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}t.exports=r},{}],133:[function(e,t,n){"use strict";function r(e){return a||i(!1),d.hasOwnProperty(e)||(e="*"),s.hasOwnProperty(e)||(a.innerHTML="*"===e?"<link />":"<"+e+"></"+e+">",s[e]=!a.firstChild),s[e]?d[e]:null}var o=e(123),i=e(137),a=o.canUseDOM?document.createElement("div"):null,s={},u=[1,'<select multiple="true">',"</select>"],l=[1,"<table>","</table>"],c=[3,"<table><tbody><tr>","</tr></tbody></table>"],p=[1,'<svg xmlns="http://www.w3.org/2000/svg">',"</svg>"],d={"*":[1,"?<div>","</div>"],area:[1,"<map>","</map>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],legend:[1,"<fieldset>","</fieldset>"],param:[1,"<object>","</object>"],tr:[2,"<table><tbody>","</tbody></table>"],optgroup:u,option:u,caption:l,colgroup:l,tbody:l,tfoot:l,thead:l,td:c,th:c};["circle","clipPath","defs","ellipse","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","text","tspan"].forEach(function(e){d[e]=p,s[e]=!0}),t.exports=r},{123:123,137:137}],134:[function(e,t,n){"use strict";function r(e){return e.Window&&e instanceof e.Window?{x:e.pageXOffset||e.document.documentElement.scrollLeft,y:e.pageYOffset||e.document.documentElement.scrollTop}:{x:e.scrollLeft,y:e.scrollTop}}t.exports=r},{}],135:[function(e,t,n){"use strict";function r(e){return e.replace(o,"-$1").toLowerCase()}var o=/([A-Z])/g;t.exports=r},{}],136:[function(e,t,n){"use strict";function r(e){return o(e).replace(i,"-ms-")}var o=e(135),i=/^ms-/;t.exports=r},{135:135}],137:[function(e,t,n){"use strict";function r(e,t,n,r,i,a,s,u){if(o(t),!e){var l;if(void 0===t)l=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[n,r,i,a,s,u],p=0;l=new Error(t.replace(/%s/g,function(){return c[p++]})),l.name="Invariant Violation"}throw l.framesToPop=1,l}}var o=function(e){};t.exports=r},{}],138:[function(e,t,n){"use strict";function r(e){var t=e?e.ownerDocument||e:document,n=t.defaultView||window;return!(!e||!("function"==typeof n.Node?e instanceof n.Node:"object"==typeof e&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName))}t.exports=r},{}],139:[function(e,t,n){"use strict";function r(e){return o(e)&&3==e.nodeType}var o=e(138);t.exports=r},{138:138}],140:[function(e,t,n){"use strict";function r(e){var t={};return function(n){return t.hasOwnProperty(n)||(t[n]=e.call(this,n)),t[n]}}t.exports=r},{}],141:[function(e,t,n){"use strict";function r(e,t){return e===t?0!==e||0!==t||1/e==1/t:e!==e&&t!==t}function o(e,t){if(r(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;var n=Object.keys(e),o=Object.keys(t);if(n.length!==o.length)return!1;for(var a=0;a<n.length;a++)if(!i.call(t,n[a])||!r(e[n[a]],t[n[a]]))return!1;return!0}var i=Object.prototype.hasOwnProperty;t.exports=o},{}],142:[function(e,t,n){"use strict";var r=e(129),o=r;t.exports=o},{129:129}],143:[function(e,t,n){"use strict";function r(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}var o=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable;t.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map(function(e){return t[e]}).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach(function(e){r[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var n,s,u=r(e),l=1;l<arguments.length;l++){n=Object(arguments[l]);for(var c in n)i.call(n,c)&&(u[c]=n[c]);if(o){s=o(n);for(var p=0;p<s.length;p++)a.call(n,s[p])&&(u[s[p]]=n[s[p]])}}return u}},{}],144:[function(e,t,n){"use strict";function r(e,t,n,r,o){}t.exports=r},{137:137,142:142,147:147}],145:[function(e,t,n){"use strict";var r=e(146);t.exports=function(e){return r(e,!1)}},{146:146}],146:[function(e,t,n){"use strict";var r=e(129),o=e(137),i=(e(142),e(147)),a=e(144);t.exports=function(e,t){function n(e){var t=e&&(E&&e[E]||e[x]);if("function"==typeof t)return t}function s(e,t){return e===t?0!==e||1/e==1/t:e!==e&&t!==t}function u(e){this.message=e,this.stack=""}function l(e){function n(n,r,a,s,l,c,p){if(s=s||w,c=c||a,p!==i)if(t)o(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");else;return null==r[a]?n?new u(null===r[a]?"The "+l+" `"+c+"` is marked as required in `"+s+"`, but its value is `null`.":"The "+l+" `"+c+"` is marked as required in `"+s+"`, but its value is `undefined`."):null:e(r,a,s,l,c)}var r=n.bind(null,!1);return r.isRequired=n.bind(null,!0),r}function c(e){function t(t,n,r,o,i,a){var s=t[n];if(_(s)!==e)return new u("Invalid "+o+" `"+i+"` of type `"+C(s)+"` supplied to `"+r+"`, expected `"+e+"`.");return null}return l(t)}function p(e){function t(t,n,r,o,a){if("function"!=typeof e)return new u("Property `"+a+"` of component `"+r+"` has invalid PropType notation inside arrayOf.");var s=t[n];if(!Array.isArray(s)){return new u("Invalid "+o+" `"+a+"` of type `"+_(s)+"` supplied to `"+r+"`, expected an array.")}for(var l=0;l<s.length;l++){var c=e(s,l,r,o,a+"["+l+"]",i);if(c instanceof Error)return c}return null}return l(t)}function d(e){function t(t,n,r,o,i){if(!(t[n]instanceof e)){var a=e.name||w;return new u("Invalid "+o+" `"+i+"` of type `"+b(t[n])+"` supplied to `"+r+"`, expected instance of `"+a+"`.")}return null}return l(t)}function f(e){function t(t,n,r,o,i){for(var a=t[n],l=0;l<e.length;l++)if(s(a,e[l]))return null;return new u("Invalid "+o+" `"+i+"` of value `"+a+"` supplied to `"+r+"`, expected one of "+JSON.stringify(e)+".")}return Array.isArray(e)?l(t):r.thatReturnsNull}function h(e){function t(t,n,r,o,a){if("function"!=typeof e)return new u("Property `"+a+"` of component `"+r+"` has invalid PropType notation inside objectOf.");var s=t[n],l=_(s);if("object"!==l)return new u("Invalid "+o+" `"+a+"` of type `"+l+"` supplied to `"+r+"`, expected an object.");for(var c in s)if(s.hasOwnProperty(c)){var p=e(s,c,r,o,a+"."+c,i);if(p instanceof Error)return p}return null}return l(t)}function m(e){function t(t,n,r,o,a){for(var s=0;s<e.length;s++){if(null==(0,e[s])(t,n,r,o,a,i))return null}return new u("Invalid "+o+" `"+a+"` supplied to `"+r+"`.")}return Array.isArray(e)?l(t):r.thatReturnsNull}function v(e){function t(t,n,r,o,a){var s=t[n],l=_(s);if("object"!==l)return new u("Invalid "+o+" `"+a+"` of type `"+l+"` supplied to `"+r+"`, expected `object`.");for(var c in e){var p=e[c];if(p){var d=p(s,c,r,o,a+"."+c,i);if(d)return d}}return null}return l(t)}function g(t){switch(typeof t){case"number":case"string":case"undefined":return!0;case"boolean":return!t;case"object":if(Array.isArray(t))return t.every(g);if(null===t||e(t))return!0;var r=n(t);if(!r)return!1;var o,i=r.call(t);if(r!==t.entries){for(;!(o=i.next()).done;)if(!g(o.value))return!1}else for(;!(o=i.next()).done;){var a=o.value;if(a&&!g(a[1]))return!1}return!0;default:return!1}}function y(e,t){return"symbol"===e||("Symbol"===t["@@toStringTag"]||"function"==typeof Symbol&&t instanceof Symbol)}function _(e){var t=typeof e;return Array.isArray(e)?"array":e instanceof RegExp?"object":y(t,e)?"symbol":t}function C(e){var t=_(e);if("object"===t){if(e instanceof Date)return"date";if(e instanceof RegExp)return"regexp"}return t}function b(e){return e.constructor&&e.constructor.name?e.constructor.name:w}var E="function"==typeof Symbol&&Symbol.iterator,x="@@iterator",w="<<anonymous>>",T={array:c("array"),bool:c("boolean"),func:c("function"),number:c("number"),object:c("object"),string:c("string"),symbol:c("symbol"),any:function(){return l(r.thatReturnsNull)}(),arrayOf:p,element:function(){function t(t,n,r,o,i){var a=t[n];if(!e(a)){return new u("Invalid "+o+" `"+i+"` of type `"+_(a)+"` supplied to `"+r+"`, expected a single ReactElement.")}return null}return l(t)}(),instanceOf:d,node:function(){function e(e,t,n,r,o){return g(e[t])?null:new u("Invalid "+r+" `"+o+"` supplied to `"+n+"`, expected a ReactNode.")}return l(e)}(),objectOf:h,oneOf:f,oneOfType:m,shape:v}
;return u.prototype=Error.prototype,T.checkPropTypes=a,T.PropTypes=T,T}},{129:129,137:137,142:142,144:144,147:147}],147:[function(e,t,n){"use strict";t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},{}]},{},[45])(45)}()}()});

/***/ }),
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(7);
  var warning = __webpack_require__(6);
  var ReactPropTypesSecret = __webpack_require__(35);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



// React 15.5 references this module, and assumes PropTypes are still callable in production.
// Therefore we re-export development-only version with all the PropTypes checks here.
// However if one is migrating to the `prop-types` npm library, they will go through the
// `index.js` entry point, and it will branch depending on the environment.
var factory = __webpack_require__(75);
module.exports = function(isValidElement) {
  // It is still allowed in 15.5.
  var throwOnDirectAccess = false;
  return factory(isValidElement, throwOnDirectAccess);
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(23);
var invariant = __webpack_require__(7);
var warning = __webpack_require__(6);

var ReactPropTypesSecret = __webpack_require__(35);
var checkPropTypes = __webpack_require__(73);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * Unescape and unwrap key for human-readable display
 *
 * @param {string} key to unescape.
 * @return {string} the unescaped key.
 */
function unescape(key) {
  var unescapeRegex = /(=0|=2)/g;
  var unescaperLookup = {
    '=0': '=',
    '=2': ':'
  };
  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

  return ('' + keySubstring).replace(unescapeRegex, function (match) {
    return unescaperLookup[match];
  });
}

var KeyEscapeUtils = {
  escape: escape,
  unescape: unescape
};

module.exports = KeyEscapeUtils;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(11);

var invariant = __webpack_require__(7);

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var standardReleaser = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : _prodInvariant('25') : void 0;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function (CopyConstructor, pooler) {
  // Casting as any so that flow ignores the actual implementation and trusts
  // it to match the type we declared
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler
};

module.exports = PooledClass;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(17);

var ReactChildren = __webpack_require__(84);
var ReactComponent = __webpack_require__(25);
var ReactPureComponent = __webpack_require__(89);
var ReactClass = __webpack_require__(85);
var ReactDOMFactories = __webpack_require__(86);
var ReactElement = __webpack_require__(10);
var ReactPropTypes = __webpack_require__(87);
var ReactVersion = __webpack_require__(90);

var onlyChild = __webpack_require__(92);
var warning = __webpack_require__(6);

var createElement = ReactElement.createElement;
var createFactory = ReactElement.createFactory;
var cloneElement = ReactElement.cloneElement;

if (process.env.NODE_ENV !== 'production') {
  var canDefineProperty = __webpack_require__(19);
  var ReactElementValidator = __webpack_require__(37);
  var didWarnPropTypesDeprecated = false;
  createElement = ReactElementValidator.createElement;
  createFactory = ReactElementValidator.createFactory;
  cloneElement = ReactElementValidator.cloneElement;
}

var __spread = _assign;

if (process.env.NODE_ENV !== 'production') {
  var warned = false;
  __spread = function () {
    process.env.NODE_ENV !== 'production' ? warning(warned, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.') : void 0;
    warned = true;
    return _assign.apply(null, arguments);
  };
}

var React = {

  // Modern

  Children: {
    map: ReactChildren.map,
    forEach: ReactChildren.forEach,
    count: ReactChildren.count,
    toArray: ReactChildren.toArray,
    only: onlyChild
  },

  Component: ReactComponent,
  PureComponent: ReactPureComponent,

  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement.isValidElement,

  // Classic

  PropTypes: ReactPropTypes,
  createClass: ReactClass.createClass,
  createFactory: createFactory,
  createMixin: function (mixin) {
    // Currently a noop. Will be used to validate and trace mixins.
    return mixin;
  },

  // This looks DOM specific but these are actually isomorphic helpers
  // since they are just generating DOM strings.
  DOM: ReactDOMFactories,

  version: ReactVersion,

  // Deprecated hook for JSX spread, don't use this for anything.
  __spread: __spread
};

// TODO: Fix tests so that this deprecation warning doesn't cause failures.
if (process.env.NODE_ENV !== 'production') {
  if (canDefineProperty) {
    Object.defineProperty(React, 'PropTypes', {
      get: function () {
        process.env.NODE_ENV !== 'production' ? warning(didWarnPropTypesDeprecated, 'Accessing PropTypes via the main React package is deprecated. Use ' + 'the prop-types package from npm instead.') : void 0;
        didWarnPropTypesDeprecated = true;
        return ReactPropTypes;
      }
    });
  }
}

module.exports = React;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var PooledClass = __webpack_require__(82);
var ReactElement = __webpack_require__(10);

var emptyFunction = __webpack_require__(23);
var traverseAllChildren = __webpack_require__(93);

var twoArgumentPooler = PooledClass.twoArgumentPooler;
var fourArgumentPooler = PooledClass.fourArgumentPooler;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * traversal. Allows avoiding binding callbacks.
 *
 * @constructor ForEachBookKeeping
 * @param {!function} forEachFunction Function to perform traversal with.
 * @param {?*} forEachContext Context to perform context with.
 */
function ForEachBookKeeping(forEachFunction, forEachContext) {
  this.func = forEachFunction;
  this.context = forEachContext;
  this.count = 0;
}
ForEachBookKeeping.prototype.destructor = function () {
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  ForEachBookKeeping.release(traverseContext);
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * mapping. Allows avoiding binding callbacks.
 *
 * @constructor MapBookKeeping
 * @param {!*} mapResult Object containing the ordered map of results.
 * @param {!function} mapFunction Function to perform mapping with.
 * @param {?*} mapContext Context to perform mapping with.
 */
function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
  this.result = mapResult;
  this.keyPrefix = keyPrefix;
  this.func = mapFunction;
  this.context = mapContext;
  this.count = 0;
}
MapBookKeeping.prototype.destructor = function () {
  this.result = null;
  this.keyPrefix = null;
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement.isValidElement(mappedChild)) {
      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  MapBookKeeping.release(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

function forEachSingleChildDummy(traverseContext, child, name) {
  return null;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, forEachSingleChildDummy, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren,
  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
  count: countChildren,
  toArray: toArray
};

module.exports = ReactChildren;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(11),
    _assign = __webpack_require__(17);

var ReactComponent = __webpack_require__(25);
var ReactElement = __webpack_require__(10);
var ReactPropTypeLocationNames = __webpack_require__(38);
var ReactNoopUpdateQueue = __webpack_require__(27);

var emptyObject = __webpack_require__(24);
var invariant = __webpack_require__(7);
var warning = __webpack_require__(6);

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

/**
 * Policies that describe methods in `ReactClassInterface`.
 */


var injectedMixins = [];

/**
 * Composite components are higher-level components that compose other composite
 * or host components.
 *
 * To create a new type of `ReactClass`, pass a specification of
 * your new class to `React.createClass`. The only requirement of your class
 * specification is that you implement a `render` method.
 *
 *   var MyComponent = React.createClass({
 *     render: function() {
 *       return <div>Hello World</div>;
 *     }
 *   });
 *
 * The class specification supports a specific protocol of methods that have
 * special meaning (e.g. `render`). See `ReactClassInterface` for
 * more the comprehensive protocol. Any other properties and methods in the
 * class specification will be available on the prototype.
 *
 * @interface ReactClassInterface
 * @internal
 */
var ReactClassInterface = {

  /**
   * An array of Mixin objects to include when defining your component.
   *
   * @type {array}
   * @optional
   */
  mixins: 'DEFINE_MANY',

  /**
   * An object containing properties and methods that should be defined on
   * the component's constructor instead of its prototype (static methods).
   *
   * @type {object}
   * @optional
   */
  statics: 'DEFINE_MANY',

  /**
   * Definition of prop types for this component.
   *
   * @type {object}
   * @optional
   */
  propTypes: 'DEFINE_MANY',

  /**
   * Definition of context types for this component.
   *
   * @type {object}
   * @optional
   */
  contextTypes: 'DEFINE_MANY',

  /**
   * Definition of context types this component sets for its children.
   *
   * @type {object}
   * @optional
   */
  childContextTypes: 'DEFINE_MANY',

  // ==== Definition methods ====

  /**
   * Invoked when the component is mounted. Values in the mapping will be set on
   * `this.props` if that prop is not specified (i.e. using an `in` check).
   *
   * This method is invoked before `getInitialState` and therefore cannot rely
   * on `this.state` or use `this.setState`.
   *
   * @return {object}
   * @optional
   */
  getDefaultProps: 'DEFINE_MANY_MERGED',

  /**
   * Invoked once before the component is mounted. The return value will be used
   * as the initial value of `this.state`.
   *
   *   getInitialState: function() {
   *     return {
   *       isOn: false,
   *       fooBaz: new BazFoo()
   *     }
   *   }
   *
   * @return {object}
   * @optional
   */
  getInitialState: 'DEFINE_MANY_MERGED',

  /**
   * @return {object}
   * @optional
   */
  getChildContext: 'DEFINE_MANY_MERGED',

  /**
   * Uses props from `this.props` and state from `this.state` to render the
   * structure of the component.
   *
   * No guarantees are made about when or how often this method is invoked, so
   * it must not have side effects.
   *
   *   render: function() {
   *     var name = this.props.name;
   *     return <div>Hello, {name}!</div>;
   *   }
   *
   * @return {ReactComponent}
   * @required
   */
  render: 'DEFINE_ONCE',

  // ==== Delegate methods ====

  /**
   * Invoked when the component is initially created and about to be mounted.
   * This may have side effects, but any external subscriptions or data created
   * by this method must be cleaned up in `componentWillUnmount`.
   *
   * @optional
   */
  componentWillMount: 'DEFINE_MANY',

  /**
   * Invoked when the component has been mounted and has a DOM representation.
   * However, there is no guarantee that the DOM node is in the document.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been mounted (initialized and rendered) for the first time.
   *
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidMount: 'DEFINE_MANY',

  /**
   * Invoked before the component receives new props.
   *
   * Use this as an opportunity to react to a prop transition by updating the
   * state using `this.setState`. Current props are accessed via `this.props`.
   *
   *   componentWillReceiveProps: function(nextProps, nextContext) {
   *     this.setState({
   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
   *     });
   *   }
   *
   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
   * transition may cause a state change, but the opposite is not true. If you
   * need it, you are probably looking for `componentWillUpdate`.
   *
   * @param {object} nextProps
   * @optional
   */
  componentWillReceiveProps: 'DEFINE_MANY',

  /**
   * Invoked while deciding if the component should be updated as a result of
   * receiving new props, state and/or context.
   *
   * Use this as an opportunity to `return false` when you're certain that the
   * transition to the new props/state/context will not require a component
   * update.
   *
   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
   *     return !equal(nextProps, this.props) ||
   *       !equal(nextState, this.state) ||
   *       !equal(nextContext, this.context);
   *   }
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @return {boolean} True if the component should update.
   * @optional
   */
  shouldComponentUpdate: 'DEFINE_ONCE',

  /**
   * Invoked when the component is about to update due to a transition from
   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
   * and `nextContext`.
   *
   * Use this as an opportunity to perform preparation before an update occurs.
   *
   * NOTE: You **cannot** use `this.setState()` in this method.
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @param {ReactReconcileTransaction} transaction
   * @optional
   */
  componentWillUpdate: 'DEFINE_MANY',

  /**
   * Invoked when the component's DOM representation has been updated.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been updated.
   *
   * @param {object} prevProps
   * @param {?object} prevState
   * @param {?object} prevContext
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidUpdate: 'DEFINE_MANY',

  /**
   * Invoked when the component is about to be removed from its parent and have
   * its DOM representation destroyed.
   *
   * Use this as an opportunity to deallocate any external resources.
   *
   * NOTE: There is no `componentDidUnmount` since your component will have been
   * destroyed by that point.
   *
   * @optional
   */
  componentWillUnmount: 'DEFINE_MANY',

  // ==== Advanced methods ====

  /**
   * Updates the component's currently mounted DOM representation.
   *
   * By default, this implements React's rendering and reconciliation algorithm.
   * Sophisticated clients may wish to override this.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   * @overridable
   */
  updateComponent: 'OVERRIDE_BASE'

};

/**
 * Mapping from class specification keys to special processing functions.
 *
 * Although these are declared like instance properties in the specification
 * when defining classes using `React.createClass`, they are actually static
 * and are accessible on the constructor instead of the prototype. Despite
 * being static, they must be defined outside of the "statics" key under
 * which all other static methods are defined.
 */
var RESERVED_SPEC_KEYS = {
  displayName: function (Constructor, displayName) {
    Constructor.displayName = displayName;
  },
  mixins: function (Constructor, mixins) {
    if (mixins) {
      for (var i = 0; i < mixins.length; i++) {
        mixSpecIntoComponent(Constructor, mixins[i]);
      }
    }
  },
  childContextTypes: function (Constructor, childContextTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, childContextTypes, 'childContext');
    }
    Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
  },
  contextTypes: function (Constructor, contextTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, contextTypes, 'context');
    }
    Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
  },
  /**
   * Special case getDefaultProps which should move into statics but requires
   * automatic merging.
   */
  getDefaultProps: function (Constructor, getDefaultProps) {
    if (Constructor.getDefaultProps) {
      Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
    } else {
      Constructor.getDefaultProps = getDefaultProps;
    }
  },
  propTypes: function (Constructor, propTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, propTypes, 'prop');
    }
    Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
  },
  statics: function (Constructor, statics) {
    mixStaticSpecIntoComponent(Constructor, statics);
  },
  autobind: function () {} };

function validateTypeDef(Constructor, typeDef, location) {
  for (var propName in typeDef) {
    if (typeDef.hasOwnProperty(propName)) {
      // use a warning instead of an invariant so components
      // don't show up in prod but only in __DEV__
      process.env.NODE_ENV !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
    }
  }
}

function validateMethodOverride(isAlreadyDefined, name) {
  var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

  // Disallow overriding of base class methods unless explicitly allowed.
  if (ReactClassMixin.hasOwnProperty(name)) {
    !(specPolicy === 'OVERRIDE_BASE') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.', name) : _prodInvariant('73', name) : void 0;
  }

  // Disallow defining methods more than once unless explicitly allowed.
  if (isAlreadyDefined) {
    !(specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('74', name) : void 0;
  }
}

/**
 * Mixin helper which handles policy validation and reserved
 * specification keys when building React classes.
 */
function mixSpecIntoComponent(Constructor, spec) {
  if (!spec) {
    if (process.env.NODE_ENV !== 'production') {
      var typeofSpec = typeof spec;
      var isMixinValid = typeofSpec === 'object' && spec !== null;

      process.env.NODE_ENV !== 'production' ? warning(isMixinValid, '%s: You\'re attempting to include a mixin that is either null ' + 'or not an object. Check the mixins included by the component, ' + 'as well as any mixins they include themselves. ' + 'Expected object but got %s.', Constructor.displayName || 'ReactClass', spec === null ? null : typeofSpec) : void 0;
    }

    return;
  }

  !(typeof spec !== 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component class or function as a mixin. Instead, just use a regular object.') : _prodInvariant('75') : void 0;
  !!ReactElement.isValidElement(spec) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component as a mixin. Instead, just use a regular object.') : _prodInvariant('76') : void 0;

  var proto = Constructor.prototype;
  var autoBindPairs = proto.__reactAutoBindPairs;

  // By handling mixins before any other properties, we ensure the same
  // chaining order is applied to methods with DEFINE_MANY policy, whether
  // mixins are listed before or after these methods in the spec.
  if (spec.hasOwnProperty(MIXINS_KEY)) {
    RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
  }

  for (var name in spec) {
    if (!spec.hasOwnProperty(name)) {
      continue;
    }

    if (name === MIXINS_KEY) {
      // We have already handled mixins in a special case above.
      continue;
    }

    var property = spec[name];
    var isAlreadyDefined = proto.hasOwnProperty(name);
    validateMethodOverride(isAlreadyDefined, name);

    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
      RESERVED_SPEC_KEYS[name](Constructor, property);
    } else {
      // Setup methods on prototype:
      // The following member methods should not be automatically bound:
      // 1. Expected ReactClass methods (in the "interface").
      // 2. Overridden methods (that were mixed in).
      var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
      var isFunction = typeof property === 'function';
      var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

      if (shouldAutoBind) {
        autoBindPairs.push(name, property);
        proto[name] = property;
      } else {
        if (isAlreadyDefined) {
          var specPolicy = ReactClassInterface[name];

          // These cases should already be caught by validateMethodOverride.
          !(isReactClassMethod && (specPolicy === 'DEFINE_MANY_MERGED' || specPolicy === 'DEFINE_MANY')) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.', specPolicy, name) : _prodInvariant('77', specPolicy, name) : void 0;

          // For methods which are defined more than once, call the existing
          // methods before calling the new property, merging if appropriate.
          if (specPolicy === 'DEFINE_MANY_MERGED') {
            proto[name] = createMergedResultFunction(proto[name], property);
          } else if (specPolicy === 'DEFINE_MANY') {
            proto[name] = createChainedFunction(proto[name], property);
          }
        } else {
          proto[name] = property;
          if (process.env.NODE_ENV !== 'production') {
            // Add verbose displayName to the function, which helps when looking
            // at profiling tools.
            if (typeof property === 'function' && spec.displayName) {
              proto[name].displayName = spec.displayName + '_' + name;
            }
          }
        }
      }
    }
  }
}

function mixStaticSpecIntoComponent(Constructor, statics) {
  if (!statics) {
    return;
  }
  for (var name in statics) {
    var property = statics[name];
    if (!statics.hasOwnProperty(name)) {
      continue;
    }

    var isReserved = name in RESERVED_SPEC_KEYS;
    !!isReserved ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.', name) : _prodInvariant('78', name) : void 0;

    var isInherited = name in Constructor;
    !!isInherited ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('79', name) : void 0;
    Constructor[name] = property;
  }
}

/**
 * Merge two objects, but throw if both contain the same key.
 *
 * @param {object} one The first object, which is mutated.
 * @param {object} two The second object
 * @return {object} one after it has been mutated to contain everything in two.
 */
function mergeIntoWithNoDuplicateKeys(one, two) {
  !(one && two && typeof one === 'object' && typeof two === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : _prodInvariant('80') : void 0;

  for (var key in two) {
    if (two.hasOwnProperty(key)) {
      !(one[key] === undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.', key) : _prodInvariant('81', key) : void 0;
      one[key] = two[key];
    }
  }
  return one;
}

/**
 * Creates a function that invokes two functions and merges their return values.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createMergedResultFunction(one, two) {
  return function mergedResult() {
    var a = one.apply(this, arguments);
    var b = two.apply(this, arguments);
    if (a == null) {
      return b;
    } else if (b == null) {
      return a;
    }
    var c = {};
    mergeIntoWithNoDuplicateKeys(c, a);
    mergeIntoWithNoDuplicateKeys(c, b);
    return c;
  };
}

/**
 * Creates a function that invokes two functions and ignores their return vales.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createChainedFunction(one, two) {
  return function chainedFunction() {
    one.apply(this, arguments);
    two.apply(this, arguments);
  };
}

/**
 * Binds a method to the component.
 *
 * @param {object} component Component whose method is going to be bound.
 * @param {function} method Method to be bound.
 * @return {function} The bound method.
 */
function bindAutoBindMethod(component, method) {
  var boundMethod = method.bind(component);
  if (process.env.NODE_ENV !== 'production') {
    boundMethod.__reactBoundContext = component;
    boundMethod.__reactBoundMethod = method;
    boundMethod.__reactBoundArguments = null;
    var componentName = component.constructor.displayName;
    var _bind = boundMethod.bind;
    boundMethod.bind = function (newThis) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      // User is trying to bind() an autobound method; we effectively will
      // ignore the value of "this" that the user is trying to use, so
      // let's warn.
      if (newThis !== component && newThis !== null) {
        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
      } else if (!args.length) {
        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
        return boundMethod;
      }
      var reboundMethod = _bind.apply(boundMethod, arguments);
      reboundMethod.__reactBoundContext = component;
      reboundMethod.__reactBoundMethod = method;
      reboundMethod.__reactBoundArguments = args;
      return reboundMethod;
    };
  }
  return boundMethod;
}

/**
 * Binds all auto-bound methods in a component.
 *
 * @param {object} component Component whose method is going to be bound.
 */
function bindAutoBindMethods(component) {
  var pairs = component.__reactAutoBindPairs;
  for (var i = 0; i < pairs.length; i += 2) {
    var autoBindKey = pairs[i];
    var method = pairs[i + 1];
    component[autoBindKey] = bindAutoBindMethod(component, method);
  }
}

/**
 * Add more to the ReactClass base class. These are all legacy features and
 * therefore not already part of the modern ReactComponent.
 */
var ReactClassMixin = {

  /**
   * TODO: This will be deprecated because state should always keep a consistent
   * type signature and the only use case for this, is to avoid that.
   */
  replaceState: function (newState, callback) {
    this.updater.enqueueReplaceState(this, newState);
    if (callback) {
      this.updater.enqueueCallback(this, callback, 'replaceState');
    }
  },

  /**
   * Checks whether or not this composite component is mounted.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function () {
    return this.updater.isMounted(this);
  }
};

var ReactClassComponent = function () {};
_assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

var didWarnDeprecated = false;

/**
 * Module for creating composite components.
 *
 * @class ReactClass
 */
var ReactClass = {

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  createClass: function (spec) {
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(didWarnDeprecated, '%s: React.createClass is deprecated and will be removed in version 16. ' + 'Use plain JavaScript classes instead. If you\'re not yet ready to ' + 'migrate, create-react-class is available on npm as a ' + 'drop-in replacement.', spec && spec.displayName || 'A Component') : void 0;
      didWarnDeprecated = true;
    }

    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function (props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
      }

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (process.env.NODE_ENV !== 'production') {
        // We allow auto-mocks to proceed as if they're returning null.
        if (initialState === undefined && this.getInitialState._isMockFunction) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      !(typeof initialState === 'object' && !Array.isArray(initialState)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : _prodInvariant('82', Constructor.displayName || 'ReactCompositeComponent') : void 0;

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, spec);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (process.env.NODE_ENV !== 'production') {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    !Constructor.prototype.render ? process.env.NODE_ENV !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : _prodInvariant('83') : void 0;

    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  },

  injection: {
    injectMixin: function (mixin) {
      injectedMixins.push(mixin);
    }
  }

};

module.exports = ReactClass;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var ReactElement = __webpack_require__(10);

/**
 * Create a factory that creates HTML tag elements.
 *
 * @private
 */
var createDOMFactory = ReactElement.createFactory;
if (process.env.NODE_ENV !== 'production') {
  var ReactElementValidator = __webpack_require__(37);
  createDOMFactory = ReactElementValidator.createFactory;
}

/**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 * This is also accessible via `React.DOM`.
 *
 * @public
 */
var ReactDOMFactories = {
  a: createDOMFactory('a'),
  abbr: createDOMFactory('abbr'),
  address: createDOMFactory('address'),
  area: createDOMFactory('area'),
  article: createDOMFactory('article'),
  aside: createDOMFactory('aside'),
  audio: createDOMFactory('audio'),
  b: createDOMFactory('b'),
  base: createDOMFactory('base'),
  bdi: createDOMFactory('bdi'),
  bdo: createDOMFactory('bdo'),
  big: createDOMFactory('big'),
  blockquote: createDOMFactory('blockquote'),
  body: createDOMFactory('body'),
  br: createDOMFactory('br'),
  button: createDOMFactory('button'),
  canvas: createDOMFactory('canvas'),
  caption: createDOMFactory('caption'),
  cite: createDOMFactory('cite'),
  code: createDOMFactory('code'),
  col: createDOMFactory('col'),
  colgroup: createDOMFactory('colgroup'),
  data: createDOMFactory('data'),
  datalist: createDOMFactory('datalist'),
  dd: createDOMFactory('dd'),
  del: createDOMFactory('del'),
  details: createDOMFactory('details'),
  dfn: createDOMFactory('dfn'),
  dialog: createDOMFactory('dialog'),
  div: createDOMFactory('div'),
  dl: createDOMFactory('dl'),
  dt: createDOMFactory('dt'),
  em: createDOMFactory('em'),
  embed: createDOMFactory('embed'),
  fieldset: createDOMFactory('fieldset'),
  figcaption: createDOMFactory('figcaption'),
  figure: createDOMFactory('figure'),
  footer: createDOMFactory('footer'),
  form: createDOMFactory('form'),
  h1: createDOMFactory('h1'),
  h2: createDOMFactory('h2'),
  h3: createDOMFactory('h3'),
  h4: createDOMFactory('h4'),
  h5: createDOMFactory('h5'),
  h6: createDOMFactory('h6'),
  head: createDOMFactory('head'),
  header: createDOMFactory('header'),
  hgroup: createDOMFactory('hgroup'),
  hr: createDOMFactory('hr'),
  html: createDOMFactory('html'),
  i: createDOMFactory('i'),
  iframe: createDOMFactory('iframe'),
  img: createDOMFactory('img'),
  input: createDOMFactory('input'),
  ins: createDOMFactory('ins'),
  kbd: createDOMFactory('kbd'),
  keygen: createDOMFactory('keygen'),
  label: createDOMFactory('label'),
  legend: createDOMFactory('legend'),
  li: createDOMFactory('li'),
  link: createDOMFactory('link'),
  main: createDOMFactory('main'),
  map: createDOMFactory('map'),
  mark: createDOMFactory('mark'),
  menu: createDOMFactory('menu'),
  menuitem: createDOMFactory('menuitem'),
  meta: createDOMFactory('meta'),
  meter: createDOMFactory('meter'),
  nav: createDOMFactory('nav'),
  noscript: createDOMFactory('noscript'),
  object: createDOMFactory('object'),
  ol: createDOMFactory('ol'),
  optgroup: createDOMFactory('optgroup'),
  option: createDOMFactory('option'),
  output: createDOMFactory('output'),
  p: createDOMFactory('p'),
  param: createDOMFactory('param'),
  picture: createDOMFactory('picture'),
  pre: createDOMFactory('pre'),
  progress: createDOMFactory('progress'),
  q: createDOMFactory('q'),
  rp: createDOMFactory('rp'),
  rt: createDOMFactory('rt'),
  ruby: createDOMFactory('ruby'),
  s: createDOMFactory('s'),
  samp: createDOMFactory('samp'),
  script: createDOMFactory('script'),
  section: createDOMFactory('section'),
  select: createDOMFactory('select'),
  small: createDOMFactory('small'),
  source: createDOMFactory('source'),
  span: createDOMFactory('span'),
  strong: createDOMFactory('strong'),
  style: createDOMFactory('style'),
  sub: createDOMFactory('sub'),
  summary: createDOMFactory('summary'),
  sup: createDOMFactory('sup'),
  table: createDOMFactory('table'),
  tbody: createDOMFactory('tbody'),
  td: createDOMFactory('td'),
  textarea: createDOMFactory('textarea'),
  tfoot: createDOMFactory('tfoot'),
  th: createDOMFactory('th'),
  thead: createDOMFactory('thead'),
  time: createDOMFactory('time'),
  title: createDOMFactory('title'),
  tr: createDOMFactory('tr'),
  track: createDOMFactory('track'),
  u: createDOMFactory('u'),
  ul: createDOMFactory('ul'),
  'var': createDOMFactory('var'),
  video: createDOMFactory('video'),
  wbr: createDOMFactory('wbr'),

  // SVG
  circle: createDOMFactory('circle'),
  clipPath: createDOMFactory('clipPath'),
  defs: createDOMFactory('defs'),
  ellipse: createDOMFactory('ellipse'),
  g: createDOMFactory('g'),
  image: createDOMFactory('image'),
  line: createDOMFactory('line'),
  linearGradient: createDOMFactory('linearGradient'),
  mask: createDOMFactory('mask'),
  path: createDOMFactory('path'),
  pattern: createDOMFactory('pattern'),
  polygon: createDOMFactory('polygon'),
  polyline: createDOMFactory('polyline'),
  radialGradient: createDOMFactory('radialGradient'),
  rect: createDOMFactory('rect'),
  stop: createDOMFactory('stop'),
  svg: createDOMFactory('svg'),
  text: createDOMFactory('text'),
  tspan: createDOMFactory('tspan')
};

module.exports = ReactDOMFactories;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _require = __webpack_require__(10),
    isValidElement = _require.isValidElement;

var factory = __webpack_require__(74);

module.exports = factory(isValidElement);

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(17);

var ReactComponent = __webpack_require__(25);
var ReactNoopUpdateQueue = __webpack_require__(27);

var emptyObject = __webpack_require__(24);

/**
 * Base class helpers for the updating state of a component.
 */
function ReactPureComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

function ComponentDummy() {}
ComponentDummy.prototype = ReactComponent.prototype;
ReactPureComponent.prototype = new ComponentDummy();
ReactPureComponent.prototype.constructor = ReactPureComponent;
// Avoid an extra prototype jump for these methods.
_assign(ReactPureComponent.prototype, ReactComponent.prototype);
ReactPureComponent.prototype.isPureReactComponent = true;

module.exports = ReactPureComponent;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



module.exports = '15.5.4';

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(11);

var ReactPropTypeLocationNames = __webpack_require__(38);
var ReactPropTypesSecret = __webpack_require__(88);

var invariant = __webpack_require__(7);
var warning = __webpack_require__(6);

var ReactComponentTreeHook;

if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
  // Temporary hack.
  // Inline requires don't work well with Jest:
  // https://github.com/facebook/react/issues/7240
  // Remove the inline requires when we don't need them anymore:
  // https://github.com/facebook/react/pull/7178
  ReactComponentTreeHook = __webpack_require__(26);
}

var loggedTypeFailures = {};

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?object} element The React element that is being type-checked
 * @param {?number} debugID The React component instance that is being type-checked
 * @private
 */
function checkReactTypeSpec(typeSpecs, values, location, componentName, element, debugID) {
  for (var typeSpecName in typeSpecs) {
    if (typeSpecs.hasOwnProperty(typeSpecName)) {
      var error;
      // Prop type validation may throw. In case they do, we don't want to
      // fail the render phase where it didn't fail before. So we log it.
      // After these have been cleaned up, we'll let them throw.
      try {
        // This is intentionally an invariant that gets caught. It's the same
        // behavior as without this statement except with a better message.
        !(typeof typeSpecs[typeSpecName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : _prodInvariant('84', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : void 0;
        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
      } catch (ex) {
        error = ex;
      }
      process.env.NODE_ENV !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName, typeof error) : void 0;
      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
        // Only monitor this failure once because there tends to be a lot of the
        // same error.
        loggedTypeFailures[error.message] = true;

        var componentStackInfo = '';

        if (process.env.NODE_ENV !== 'production') {
          if (!ReactComponentTreeHook) {
            ReactComponentTreeHook = __webpack_require__(26);
          }
          if (debugID !== null) {
            componentStackInfo = ReactComponentTreeHook.getStackAddendumByID(debugID);
          } else if (element !== null) {
            componentStackInfo = ReactComponentTreeHook.getCurrentStackAddendum(element);
          }
        }

        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed %s type: %s%s', location, error.message, componentStackInfo) : void 0;
      }
    }
  }
}

module.exports = checkReactTypeSpec;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */


var _prodInvariant = __webpack_require__(11);

var ReactElement = __webpack_require__(10);

var invariant = __webpack_require__(7);

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !ReactElement.isValidElement(children) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'React.Children.only expected to receive a single React element child.') : _prodInvariant('143') : void 0;
  return children;
}

module.exports = onlyChild;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(11);

var ReactCurrentOwner = __webpack_require__(18);
var REACT_ELEMENT_TYPE = __webpack_require__(36);

var getIteratorFn = __webpack_require__(39);
var invariant = __webpack_require__(7);
var KeyEscapeUtils = __webpack_require__(81);
var warning = __webpack_require__(6);

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * This is inlined from ReactElement since this file is shared between
 * isomorphic and renderers. We could extract this to a
 *
 */

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (component && typeof component === 'object' && component.key != null) {
    // Explicit key
    return KeyEscapeUtils.escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' ||
  // The following is inlined from ReactElement. This means we can optimize
  // some checks. React Fiber also inlines this logic for similar purposes.
  type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (iteratorFn) {
      var iterator = iteratorFn.call(children);
      var step;
      if (iteratorFn !== children.entries) {
        var ii = 0;
        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getComponentKey(child, ii++);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        if (process.env.NODE_ENV !== 'production') {
          var mapsAsChildrenAddendum = '';
          if (ReactCurrentOwner.current) {
            var mapsAsChildrenOwnerName = ReactCurrentOwner.current.getName();
            if (mapsAsChildrenOwnerName) {
              mapsAsChildrenAddendum = ' Check the render method of `' + mapsAsChildrenOwnerName + '`.';
            }
          }
          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.%s', mapsAsChildrenAddendum) : void 0;
          didWarnAboutMaps = true;
        }
        // Iterator will provide entry [k,v] tuples rather than values.
        while (!(step = iterator.next()).done) {
          var entry = step.value;
          if (entry) {
            child = entry[1];
            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        }
      }
    } else if (type === 'object') {
      var addendum = '';
      if (process.env.NODE_ENV !== 'production') {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
        if (children._isReactElement) {
          addendum = ' It looks like you\'re using an element created by a different ' + 'version of React. Make sure to use only one copy of React.';
        }
        if (ReactCurrentOwner.current) {
          var name = ReactCurrentOwner.current.getName();
          if (name) {
            addendum += ' Check the render method of `' + name + '`.';
          }
        }
      }
      var childrenString = String(children);
       true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : _prodInvariant('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : void 0;
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

module.exports = traverseAllChildren;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(56);


/***/ })
],[134]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9+L3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZianMvbGliL3dhcm5pbmcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9pbnZhcmlhbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RFbGVtZW50LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL3JlYWN0UHJvZEludmFyaWFudC5qcyIsIndlYnBhY2s6Ly8vLi9+L29iamVjdC1hc3NpZ24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RDdXJyZW50T3duZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvY2FuRGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9lbXB0eUZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL34vZmJqcy9saWIvZW1wdHlPYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RDb21wb25lbnRUcmVlSG9vay5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdE5vb3BVcGRhdGVRdWV1ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L3JlYWN0LmpzIiwid2VicGFjazovLy8uL34vcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RFbGVtZW50U3ltYm9sLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0RWxlbWVudFZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9nZXRJdGVyYXRvckZuLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QtZG9tL2Rpc3QvcmVhY3QtZG9tLm1pbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9wcm9wLXR5cGVzL2ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL0tleUVzY2FwZVV0aWxzLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1Bvb2xlZENsYXNzLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0Q2hpbGRyZW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RDbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdERPTUZhY3Rvcmllcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdFByb3BUeXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdFB1cmVDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RWZXJzaW9uLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL2NoZWNrUmVhY3RUeXBlU3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9vbmx5Q2hpbGQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvdHJhdmVyc2VBbGxDaGlsZHJlbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7OztBQ25MdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtB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OztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGdCQUFnQjtBQUMzQjtBQUNBLFdBQVcsVUFBVTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsVUFBVTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdDOzs7Ozs7OztBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLHlCQUF5QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIseUJBQXlCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBOztBQUVBLHdDOzs7Ozs7OztBQzVVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLFdBQVc7QUFDeEIsY0FBYyxRQUFRO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxXQUFXO0FBQ3hCLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0EseURBQXlEOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsV0FBVztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFdBQVc7QUFDeEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFdBQVc7QUFDeEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQzs7Ozs7Ozs7Ozs7OztBQzlGQTs7QUFFQTs7Ozs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLG9DOzs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixXQUFXLEVBQUU7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUZBQXlGOztBQUV6RjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsV0FBVyxFQUFFO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixzQkFBc0I7QUFDM0M7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSx1Qzs7Ozs7Ozs7QUMzUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEM7Ozs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0Esd0NBQXdDOztBQUV4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxrREFBMkYsa0VBQWtFLEtBQUssTUFBTSxnSUFBZ0ksYUFBYSxtQkFBbUIsa0JBQWtCLHlCQUF5QixnQkFBZ0IsVUFBVSxVQUFVLDBDQUEwQyw4QkFBd0IsMEJBQW9CLDhDQUE4QyxrQ0FBa0MsWUFBWSxZQUFZLG1DQUFtQyxpQkFBaUIsZUFBZSxzQkFBc0Isb0JBQW9CLGtEQUFrRCxXQUFXLFlBQVksU0FBUyxFQUFFLG1CQUFtQixhQUFhLE9BQU8sWUFBWSx5MkJBQXkyQixxQkFBcUIsc0JBQXNCLFlBQVksR0FBRyxxQkFBcUIsYUFBYSx3QkFBd0IsNkJBQTZCLGlDQUFpQyxZQUFZLEVBQUUsY0FBYyxxQkFBcUIsYUFBYSxjQUFjLCtEQUErRCxjQUFjLFVBQVUsb0RBQW9ELGdEQUFnRCx1REFBdUQsZ0JBQWdCLHNDQUFzQyxnQkFBZ0IsVUFBVSwrQ0FBK0Msc0NBQXNDLDREQUE0RCxrQkFBa0IsY0FBYyxlQUFlLGlEQUFpRCxvQkFBb0IsUUFBUSx5RkFBeUYseUZBQXlGLDJCQUEyQixjQUFjLEtBQUssV0FBVyxxQkFBcUIsMkNBQTJDLGdCQUFnQixVQUFVLG9DQUFvQyxtREFBbUQsZ0NBQWdDLHVCQUF1QixxQkFBcUIsZ0JBQWdCLE1BQU0sd0NBQXdDLGtCQUFrQiw2QkFBNkIsWUFBWSxVQUFVLDJCQUEyQiwwRUFBMEUsNkNBQTZDLHFCQUFxQixvQkFBb0IsTUFBTSxvQ0FBb0MsdUNBQXVDLG9EQUFvRCxvSEFBb0gsa0VBQWtFLHlEQUF5RCxtQkFBbUIscUZBQXFGLHVFQUF1RSxhQUFhLHlCQUF5Qix3REFBd0QsNEVBQTRFLGlCQUFpQix5QkFBeUIsOERBQThELG1HQUFtRyxtQkFBbUIseUJBQXlCLGtFQUFrRSxxR0FBcUcsb0JBQW9CLHlCQUF5QixvRUFBb0UsdUdBQXVHLGdCQUFnQiw2Q0FBNkMsZ0NBQWdDLFlBQVksRUFBRSxnQ0FBZ0MscUJBQXFCLGFBQWEsZ0JBQWdCLGtEQUFrRCxPQUFPLHFmQUFxZiw2QkFBNkIsbUNBQW1DLHNCQUFzQixlQUFlLEVBQUUsRUFBRSxPQUFPLFlBQVksZ0lBQWdJLHFCQUFxQiw4Q0FBOEMsU0FBUyw2Q0FBNkMsZUFBZSwrREFBK0QsYUFBYSx5REFBeUQsY0FBYyw0REFBNEQsWUFBWSxzREFBc0QsT0FBTyxrRkFBa0YsVUFBVSxpREFBaUQsSUFBSSxrREFBa0QsWUFBWSxHQUFHLHFCQUFxQixhQUFhLHFGQUFxRixZQUFZLHFCQUFxQixnQkFBZ0IsMENBQTBDLElBQUksVUFBVSxTQUFTLEtBQUssbUVBQW1FLE9BQU8sb0NBQW9DLFNBQVMsdUNBQXVDLFdBQVcsb0NBQW9DLEdBQUcsZUFBZSxtQ0FBbUMsY0FBYyx1Q0FBdUMsa0JBQWtCLCtDQUErQyxLQUFLLDBDQUEwQyw0QkFBNEIsaUJBQWlCLFlBQVksRUFBRSx3REFBd0QscUJBQXFCLGFBQWEsZ0JBQWdCLDhFQUE4RSwwQ0FBMEMsY0FBYywrREFBK0QseUNBQXlDLHFIQUFxSCxrQ0FBa0MsbURBQW1ELFNBQVMsc0VBQXNFLFlBQVksV0FBVyxzQkFBc0IsdUJBQXVCLG1DQUFtQyxnREFBZ0Qsa0NBQWtDLG9GQUFvRiw4QkFBOEIseUNBQXlDLG1DQUFtQyxhQUFhLEdBQUcsSUFBSSw0QkFBNEIsRUFBRSxzQkFBc0IscUJBQXFCLGFBQWEsY0FBYywyQ0FBMkMsaURBQWlELGNBQWMscUNBQXFDLHdEQUF3RCxjQUFjLDJDQUEyQyxnQkFBZ0Isb0NBQW9DLGFBQWEsK0NBQStDLGdCQUFnQiw0QkFBNEIsa0JBQWtCLCtDQUErQyxnQkFBZ0Isb05BQW9OLGFBQWEsK0lBQStJLGNBQWMsNkJBQTZCLHlCQUF5QixtQkFBbUIsZ0JBQWdCLDJCQUEyQixrQkFBa0IsK0NBQStDLGdCQUFnQixtR0FBbUcsY0FBYywrRkFBK0YsZ0JBQWdCLDJCQUEyQixnQkFBZ0IsWUFBWSx1Q0FBdUMsdUNBQXVDLGlCQUFpQix5REFBeUQsbUZBQW1GLFFBQVEseUJBQXlCLDhDQUE4QyxxSEFBcUgsa0NBQWtDLGdGQUFnRixTQUFTLGdGQUFnRixPQUFPLGVBQWUsd0JBQXdCLGlCQUFpQiwyQkFBMkIsSUFBSSw2Q0FBNkMsNENBQTRDLHNEQUFzRCxhQUFhLE1BQU0sa0NBQWtDLDREQUE0RCxvQ0FBb0MsWUFBWSxFQUFFLDhEQUE4RCxxQkFBcUIsYUFBYSxnQkFBZ0IsK0RBQStELGtCQUFrQiwwQkFBMEIsa0JBQWtCLDJDQUEyQyxnQkFBZ0IscUJBQXFCLFdBQVcsaUNBQWlDLGlCQUFpQixvQkFBb0IsYUFBYSxFQUFFLG9CQUFvQix3QkFBd0IsS0FBSyxrQkFBa0IsTUFBTSxFQUFFLG9CQUFvQixlQUFlLGtCQUFrQixrQkFBa0IsbUNBQW1DLHdFQUF3RSwrRUFBK0Usb0JBQW9CLDBDQUEwQyx1RkFBdUYsWUFBWSxXQUFXLEtBQUssV0FBVyxlQUFlLG9EQUFvRCxNQUFNLHFEQUFxRCxNQUFNLGdDQUFnQyxNQUFNLGtDQUFrQyxNQUFNLHNDQUFzQyxZQUFZLEVBQUUsNENBQTRDLHFCQUFxQixhQUFhLGNBQWMsTUFBTSwwQkFBMEIsd0JBQXdCLFdBQVcsbUJBQW1CLHlEQUF5RCxnQkFBZ0IseUNBQXlDLGdCQUFnQixnREFBZ0QsZ0JBQWdCLHVCQUF1QixnQkFBZ0IsdUJBQXVCLGFBQWEsMEJBQTBCLGNBQWMsT0FBTyxtREFBbUQsOE9BQThPLCtNQUErTSxFQUFFLHFHQUFxRyxFQUFFLDRCQUE0QixzQkFBc0IsYUFBYSxPQUFPLGtIQUFrSCxZQUFZLEdBQUcsc0JBQXNCLGFBQWEsZ0JBQWdCLGdCQUFnQix3QkFBd0IsOEpBQThKLDBCQUEwQiwrQkFBK0IsMEJBQTBCLHlCQUF5Qiw0QkFBNEIsNkVBQTZFLGdCQUFnQiwwQ0FBMEMsZ0NBQWdDLCtUQUErVCxzR0FBc0csV0FBVyxrQkFBa0IsNkpBQTZKLHVMQUF1TCxvTEFBb0wsMkZBQTJGLFlBQVksdUNBQXVDLHdEQUF3RCxTQUFTLGNBQWMsWUFBWSxFQUFFLGdCQUFnQixzQkFBc0IsYUFBYSxjQUFjLHlGQUF5RixnQkFBZ0Isd0lBQXdJLGdJQUFnSSxLQUFLLElBQUksOEJBQThCLG9DQUFvQyxpQ0FBaUMsc0NBQXNDLGdDQUFnQyxtQ0FBbUMsaUNBQWlDLHlDQUF5Qyx1Q0FBdUMsMERBQTBELE1BQU0sbUJBQW1CLHNCQUFzQixpRkFBaUYseURBQXlELDhDQUE4QyxtQ0FBbUMscUNBQXFDLDBEQUEwRCxNQUFNLHVCQUF1QixZQUFZLEtBQUssdURBQXVELHlDQUF5QyxLQUFLLDZDQUE2QyxrSUFBa0kseUVBQXlFLHNDQUFzQyw0REFBNEQsdUNBQXVDLHFCQUFxQixzQ0FBc0MsMERBQTBELE1BQU0sdUJBQXVCLGlCQUFpQiwyQkFBMkIscUJBQXFCLGtDQUFrQyx3Q0FBd0Msb0RBQW9ELFlBQVksRUFBRSxrQ0FBa0Msc0JBQXNCLGFBQWEsMERBQTBELCtDQUErQyxvRkFBb0YsZ0JBQWdCLCtCQUErQixrQ0FBa0MsRUFBRSxZQUFZLEVBQUUsNENBQTRDLHNCQUFzQixhQUFhLDZKQUE2SixZQUFZLEdBQUcsc0JBQXNCLGFBQWEsK0JBQStCLFlBQVksNEVBQTRFLGFBQWEsNkVBQTZFLElBQUksNkNBQTZDLG9FQUFvRSxxREFBcUQsTUFBTSxvQkFBb0IsS0FBSyxzQkFBc0IseUNBQXlDLFFBQVEsc0JBQXNCLElBQUksbUNBQW1DLHlDQUF5QyxnQkFBZ0IscUJBQXFCLGdIQUFnSCxpREFBaUQsc0NBQXNDLDBHQUEwRyxZQUFZLEVBQUUsa0JBQWtCLHNCQUFzQixhQUFhLGNBQWMsOERBQThELGtCQUFrQixVQUFVLDJPQUEyTyxrQkFBa0IsaUVBQWlFLHlCQUF5QixnRkFBZ0YsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLHdCQUF3QixJQUFJLFdBQVcsb0dBQW9HLDZCQUE2Qix5Q0FBeUMsV0FBVyxlQUFlLFFBQVEsbUNBQW1DLDZDQUE2QywyQkFBMkIsV0FBVyxtRUFBbUUsV0FBVyxlQUFlLDhCQUE4QixtQ0FBbUMsbURBQW1ELFdBQVcsa0JBQWtCLGdDQUFnQyxXQUFXLGdEQUFnRCxtQ0FBbUMsbUVBQW1FLGlDQUFpQywwQkFBMEIsV0FBVyxLQUFLLFdBQVcsTUFBTSwrQkFBK0IsZUFBZSxTQUFTLDJCQUEyQixjQUFjLCtCQUErQixRQUFRLHlEQUF5RCxvQkFBb0IsS0FBSyw4QkFBOEIsV0FBVyxZQUFZLEVBQUUsOENBQThDLHNCQUFzQixhQUFhLGFBQWEscUJBQXFCLDBCQUEwQixrQ0FBa0MsMENBQTBDLG1CQUFtQiwwQ0FBMEMsa0JBQWtCLHdGQUF3RixnQ0FBZ0MsTUFBTSx1Q0FBdUMsV0FBVyxTQUFTLFNBQVMsMkRBQTJELGtCQUFrQix1SUFBdUksaUNBQWlDLElBQUksc0NBQXNDLDJCQUEyQixnQ0FBZ0MsbUVBQW1FLGdEQUFnRCxzQ0FBc0MsU0FBUyx1Q0FBdUMsV0FBVyw4REFBOEQsT0FBTyxxQ0FBcUMsdUJBQXVCLGlGQUFpRix1Q0FBdUMsZ0NBQWdDLHVDQUF1QyxzQ0FBc0MsZUFBZSxZQUFZLCtCQUErQixPQUFPLGdEQUFnRCxtQkFBbUIsaUNBQWlDLGdEQUFnRCxnQ0FBZ0Msa0RBQWtELFlBQVksRUFBRSxnQkFBZ0Isc0JBQXNCLGFBQWEsY0FBYyxnRUFBZ0UsY0FBYyw2Q0FBNkMsY0FBYyw4Q0FBOEMsb0JBQW9CLDhCQUE4Qix1SUFBdUksZ0JBQWdCLGtEQUFrRCxnQ0FBZ0Msc0NBQXNDLHFCQUFxQixtQkFBbUIsb0RBQW9ELGNBQWMsa0RBQWtELHFCQUFxQixZQUFZLHNDQUFzQyxnQ0FBZ0MsMkJBQTJCLFlBQVksY0FBYyxXQUFXLDZEQUE2RCxjQUFjLGtEQUFrRCwyRUFBMkUsa0JBQWtCLGtGQUFrRixjQUFjLDZCQUE2QiwyQ0FBMkMsZ0NBQWdDLElBQUksaUNBQWlDLEtBQUssS0FBSyw0S0FBNEssZ0NBQWdDLGlDQUFpQyxnQ0FBZ0MsMEJBQTBCLHlCQUF5Qix1Q0FBdUMsc0NBQXNDLCtCQUErQiw4QkFBOEIsa0NBQWtDLGlDQUFpQyx3Q0FBd0MsdUNBQXVDLGNBQWMsWUFBWSxFQUFFLDhCQUE4QixzQkFBc0IsYUFBYSxrQkFBa0Isa0RBQWtELGNBQWMsa0JBQWtCLGVBQWUsbUdBQW1HLGNBQWMsbUZBQW1GLGNBQWMsZ0RBQWdELG9EQUFvRCwyQkFBMkIsa0JBQWtCLHlDQUF5QyxpREFBaUQsb0dBQW9HLGNBQWMsOERBQThELGNBQWMsT0FBTyxjQUFjLE9BQU8sb0JBQW9CLGdDQUFnQyxjQUFjLE9BQU8sZ0VBQWdFLHVJQUF1SSxZQUFZLEVBQUUsZ0NBQWdDLHNCQUFzQixhQUFhLGNBQWMsb0VBQW9FLDhCQUE4QixlQUFlLHNCQUFzQiw2REFBNkQsb0JBQW9CLDREQUE0RCxvQkFBb0IsZ0RBQWdELGlFQUFpRSxRQUFRLGlCQUFpQixLQUFLLFVBQVUsUUFBUSxzQkFBc0IsS0FBSyxxQkFBcUIsMkRBQTJELGdDQUFnQyxFQUFFLHNCQUFzQixzQkFBc0IsYUFBYSxtTUFBbU0sbUhBQW1ILHE4Q0FBcThDLG9CQUFvQixzRkFBc0Ysb0JBQW9CLHFCQUFxQixvQkFBb0IsNkNBQTZDLGtMQUFrTCxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsYUFBYSxjQUFjLE9BQU8sbUJBQW1CLDZDQUE2QyxZQUFZLEVBQUUsY0FBYyxPQUFPLG1CQUFtQixpR0FBaUcsWUFBWSxFQUFFLE9BQU8scUJBQXFCLFlBQVksR0FBRyxzQkFBc0IsYUFBYSxjQUFjLGdEQUFnRCxjQUFjLGdEQUFnRCxjQUFjLGtEQUFrRCxjQUFjLE1BQU0sa0JBQWtCLGtEQUFrRCxTQUFTLCtFQUErRSxxRUFBcUUsS0FBSyxzQkFBc0IsK1JBQStSLHlCQUF5Qix3UkFBd1IsaUJBQWlCLEtBQUssSUFBSSwrQkFBK0IsZ0JBQWdCLHVEQUF1RCwrREFBK0Qsc0JBQXNCLG9EQUFvRCx3QkFBd0IsMERBQTBELCtCQUErQixxTEFBcUwsWUFBWSxFQUFFLDhDQUE4QyxzQkFBc0IsYUFBYSxtQ0FBbUMsV0FBVywwQkFBMEIsMkJBQTJCLHFCQUFxQixnQkFBZ0Isa0JBQWtCLFdBQVcsMEJBQTBCLDJCQUEyQix1QkFBdUIsa0JBQWtCLG1CQUFtQixXQUFXLDBCQUEwQiwyQkFBMkIseUJBQXlCLG9CQUFvQixxQkFBcUIsV0FBVywwQkFBMEIsMkJBQTJCLDJCQUEyQixzQkFBc0IsZUFBZSxXQUFXLGdHQUFnRyxxQkFBcUIsUUFBUSxvRkFBb0YsSUFBSSxtR0FBbUcsWUFBWSxFQUFFLGdCQUFnQixzQkFBc0IsYUFBYSxjQUFjLHNFQUFzRSxVQUFVLDZEQUE2RCxhQUFhO0FBQ2orOEIscTBCQUFxMEIsNERBQTRELElBQUksbUNBQW1DLHFDQUFxQyw4REFBOEQsd0JBQXdCLHlEQUF5RCxzQkFBc0Isa0VBQWtFLHdCQUF3QiwyREFBMkQsV0FBVyxLQUFLLFdBQVcsbTJCQUFtMkIsa0NBQWtDLG9EQUFvRCxtQ0FBbUMscURBQXFELGdDQUFnQyxrQ0FBa0MseUNBQXlDLDRCQUE0Qix3Q0FBd0MsbURBQW1ELDRCQUE0QixrREFBa0QsRUFBRSxZQUFZLEVBQUUsMENBQTBDLHNCQUFzQixhQUFhLGFBQWEsb0JBQW9CLG9CQUFvQiwyQkFBMkIsK0NBQStDLE9BQU8sa0JBQWtCLE9BQU8sc0NBQXNDLHVCQUF1QixTQUFTLGtCQUFrQiw0Q0FBNEMsU0FBUyxRQUFRLG1DQUFtQyxVQUFVLGtDQUFrQyxzREFBc0QsS0FBSyxvREFBb0QsY0FBYyxPQUFPLG9DQUFvQyxXQUFXLGtIQUFrSCwrQkFBK0IsdUNBQXVDLFdBQVcsMkJBQTJCLFlBQVksb0JBQW9CLEVBQUUsNENBQTRDLHNCQUFzQixhQUFhLHNCQUFzQixxSEFBcUgsWUFBWSxFQUFFLFVBQVUsc0JBQXNCLGFBQWEsOEJBQThCLGtFQUFrRSw4QkFBOEIsc0hBQXNILFlBQVksRUFBRSxnQkFBZ0Isc0JBQXNCLGFBQWEsZUFBZSxjQUFjLHFEQUFxRCxjQUFjLHlEQUF5RCx1SUFBdUksZ0RBQWdELEVBQUUsOEJBQThCLGlGQUFpRixVQUFVLFdBQVcsc0JBQXNCLGlkQUFpZCxrQ0FBa0Msa0ZBQWtGLHlKQUF5SiwwVEFBMFQsY0FBYyw4TUFBOE0sTUFBTSxzTUFBc00sdUNBQXVDLHFEQUFxRCxtREFBbUQsZ0NBQWdDLCtCQUErQiwwREFBMEQsdUJBQXVCLElBQUksc0NBQXNDLFNBQVMsOFJBQThSLFNBQVMseUNBQXlDLHFCQUFxQixnTEFBZ0wsbUJBQW1CLHlCQUF5QixxREFBcUQsMEZBQTBGLHdCQUF3Qiw4Q0FBOEMsOEJBQThCLDRCQUE0QixxQkFBcUIsaUdBQWlHLCtDQUErQywwREFBMEQsOEJBQThCLGdYQUFnWCwwQkFBMEIsaURBQWlELGVBQWUsU0FBUyx5QkFBeUIsU0FBUyw2QkFBNkIsNEJBQTRCLGtDQUFrQyxtREFBbUQsaURBQWlELHlGQUF5Riw4RkFBOEYsV0FBVyxNQUFNLFNBQVMscUNBQXFDLGtDQUFrQywyQ0FBMkMsMERBQTBELHNDQUFzQyw2UUFBNlEscUNBQXFDLHFCQUFxQiw0REFBNEQsV0FBVywrREFBK0Qsd0JBQXdCLCtFQUErRSwwQ0FBMEMsbVVBQW1VLG9DQUFvQywyRUFBMkUsK0VBQStFLCtCQUErQixjQUFjLHlCQUF5QixXQUFXLEtBQUssV0FBVyw0Q0FBNEMsU0FBUywrQ0FBK0MsMkRBQTJELDJRQUEyUSx3Q0FBd0MscUZBQXFGLGlFQUFpRSxLQUFLLHVCQUF1Qix5QkFBeUIsbUJBQW1CLHlCQUF5QixxREFBcUQsMEJBQTBCLG9HQUFvRyxvQ0FBb0Msd0NBQXdDLCtCQUErQiwyREFBMkQsK0JBQStCLHNDQUFzQyxNQUFNLGdEQUFnRCxlQUFlLElBQUksd0RBQXdELFFBQVEsZ0JBQWdCLDZEQUE2RCxtR0FBbUcseUJBQXlCLCtCQUErQixrQkFBa0IsNEJBQTRCLHFCQUFxQixjQUFjLHVCQUF1Qix3Q0FBd0Msb0JBQW9CLDZFQUE2RSxnRUFBZ0UsOEJBQThCLHFCQUFxQiwwREFBMEQsa0NBQWtDLFlBQVksRUFBRSw0R0FBNEcsc0JBQXNCLGFBQWEsOEVBQThFLE9BQU8sV0FBVyxPQUFPLHdLQUF3SyxxSkFBcUosZUFBZSx3RkFBd0YsdUVBQXVFLHNCQUFzQixFQUFFLFlBQVksRUFBRSxrRUFBa0Usc0JBQXNCLGFBQWEsY0FBYyxNQUFNLHFDQUFxQyxNQUFNLGtCQUFrQixzREFBc0QsU0FBUyxnQkFBZ0IsOFhBQThYLG9CQUFvQixzQkFBc0Isd0ZBQXdGLHlDQUF5QyxxQ0FBcUMsR0FBRyxhQUFhLFdBQVcsb0RBQW9ELGFBQWEsV0FBVyxzQkFBc0IsYUFBYSxXQUFXLHNCQUFzQixhQUFhLFdBQVcsc0JBQXNCLGFBQWEsV0FBVyx1QkFBdUIsV0FBVywwQkFBMEIsNkZBQTZGLE1BQU0scURBQXFELGlHQUFpRyxNQUFNLGtGQUFrRixNQUFNLHNIQUFzSCxNQUFNLDJIQUEySCxNQUFNLGtIQUFrSCxhQUFhLDBCQUEwQixjQUFjLDRDQUE0QyxnQkFBZ0IscUNBQXFDLGNBQWMsYUFBYSx5VUFBeVUsb1RBQW9ULG9CQUFvQixlQUFlLCtFQUErRSxTQUFTLDJoQkFBMmhCLElBQUkseUhBQXlILElBQUksOEJBQThCLE1BQU0sWUFBWSx3Q0FBd0MsS0FBSyxvQkFBb0IsMkNBQTJDLGlDQUFpQyw2RkFBNkYsaUNBQWlDLGtCQUFrQixtSEFBbUgsZUFBZSx3Q0FBd0MsTUFBTSxxR0FBcUcsTUFBTSwrREFBK0QsTUFBTSxzR0FBc0csTUFBTSx3R0FBd0csVUFBVSxRQUFRLDhOQUE4TixNQUFNLHVCQUF1Qix5QkFBeUIsdUNBQXVDLHlEQUF5RCw0REFBNEQsdUdBQXVHLHNEQUFzRCx5SUFBeUksV0FBVyx5Q0FBeUMsS0FBSyx1RkFBdUYscUVBQXFFLGtCQUFrQix5SEFBeUgsTUFBTSw0SEFBNEgsTUFBTSxnR0FBZ0csTUFBTSxvREFBb0QsU0FBUyxtREFBbUQsb0NBQW9DLHVDQUF1QyxXQUFXLG1EQUFtRCxLQUFLLGdEQUFnRCw4Q0FBOEMsV0FBVywrSUFBK0ksNkhBQTZILHNDQUFzQyxxQ0FBcUMsd0NBQXdDLEtBQUsscUVBQXFFLGtCQUFrQixpQkFBaUIsZ0NBQWdDLGNBQWMsaURBQWlELDBDQUEwQyxnQ0FBZ0MsbURBQW1ELEtBQUsscUVBQXFFLG9DQUFvQyx3REFBd0QsV0FBVywwQkFBMEIsa0NBQWtDLDJCQUEyQixxREFBcUQsbUNBQW1DLDJDQUEyQyxrQkFBa0IsOERBQThELE1BQU0sK0RBQStELE1BQU0sK0RBQStELE1BQU0saUVBQWlFLDhGQUE4RixrQ0FBa0MsTUFBTSxxQ0FBcUMsTUFBTSxxREFBcUQsc0NBQXNDLFVBQVUsb0ZBQW9GLDhCQUE4Qix3Q0FBd0MsVUFBVSw2QkFBNkIsaU1BQWlNLFlBQVkscUVBQXFFLG9HQUFvRyxvQ0FBb0MsaUVBQWlFLFVBQVUscURBQXFELFlBQVksU0FBUyx5REFBeUQsZ0ZBQWdGLGlEQUFpRCxjQUFjLG9FQUFvRSx1Q0FBdUMsc0NBQXNDLHdTQUF3Uyx3TUFBd00sd0JBQXdCLGVBQWUsOEJBQThCLGtCQUFrQixrSUFBa0ksaUJBQWlCLFdBQVcsa0JBQWtCLE1BQU0sbURBQW1ELGdJQUFnSSw4QkFBOEIsZ0JBQWdCLDRDQUE0QyxFQUFFLDRLQUE0SyxzQkFBc0IsYUFBYSxPQUFPLHVCQUF1QixZQUFZLEdBQUcsc0JBQXNCLGFBQWEsZ0JBQWdCLGdLQUFnSyxjQUFjLFVBQVUsdUJBQXVCLEtBQUssU0FBUyxnQkFBZ0IsV0FBVyxxQkFBcUIsY0FBYyxrQkFBa0Isa0NBQWtDLGdCQUFnQixzQ0FBc0MseUNBQXlDLHlDQUF5Qyx5QkFBeUIsVUFBVSxLQUFLLFNBQVMsMkJBQTJCLE9BQU8sV0FBVyxXQUFXLGlDQUFpQyxjQUFjLG9CQUFvQixhQUFhLE1BQU0sRUFBRSx1Q0FBdUMsZUFBZSxZQUFZLFlBQVksK0JBQStCLFNBQVMsY0FBYyxXQUFXLHVDQUF1QyxjQUFjLGdFQUFnRSxhQUFhLGFBQWEsa0RBQWtELEtBQUssU0FBUywyQkFBMkIsbUJBQW1CLG9JQUFvSSw0SEFBNEgsWUFBWSxFQUFFLDRCQUE0QixzQkFBc0IsYUFBYSxnQkFBZ0IsT0FBTyx5S0FBeUssaUJBQWlCLFlBQVksRUFBRSxRQUFRLHNCQUFzQixhQUFhLDBDQUEwQyxnSEFBZ0gsZUFBZSxpQ0FBaUMscUJBQXFCLDJEQUEyRCx1Q0FBdUMsdUJBQXVCLDRDQUE0QyxtQ0FBbUMsZ0RBQWdELDhCQUE4Qix3QkFBd0IsbUNBQW1DLDZCQUE2QixxQkFBcUIsY0FBYyxFQUFFLGtCQUFrQixzQkFBc0IsYUFBYSxPQUFPLGlDQUFpQyxZQUFZLEdBQUcsc0JBQXNCLGFBQWEsc0JBQXNCLGdEQUFnRCwrQkFBK0Isd0JBQXdCLFlBQVksRUFBRSxVQUFVLHNCQUFzQixhQUFhLGFBQWEsd0NBQXdDLGNBQWMsMEVBQTBFLGNBQWMsMERBQTBELGVBQWUsYUFBYSw4QkFBOEIsMENBQTBDLGFBQWEsZ0JBQWdCLHVGQUF1RixXQUFXLEtBQUssV0FBVywyQkFBMkIsK0JBQStCLHlCQUF5QixTQUFTLHdFQUF3RSwyQkFBMkIsc0NBQXNDLFVBQVUsOENBQThDLElBQUksMEtBQTBLLEVBQUUsNEJBQTRCLHFCQUFxQixpQkFBaUIsa0pBQWtKLDJCQUEyQiwwQ0FBMEMseUVBQXlFLCtDQUErQyw4Q0FBOEMsMkJBQTJCLGdDQUFnQyxxQkFBcUIsZ0NBQWdDLGdNQUFnTSw4QkFBOEIseURBQXlELGVBQWUsK0JBQStCLCtIQUErSCxNQUFNLHdCQUF3QixhQUFhLDhHQUE4RyxFQUFFLFlBQVksRUFBRSx3REFBd0Qsc0JBQXNCLGFBQWEsY0FBYyxTQUFTLHdDQUF3QyxpRUFBaUUsSUFBSSx1REFBdUQsNkJBQTZCLFdBQVcsWUFBWSxRQUFRLGtHQUFrRyxXQUFXLFlBQVksTUFBTSxtRUFBbUUsWUFBWSxXQUFXLG9CQUFvQixLQUFLLE9BQU8sZ0JBQWdCLGlCQUFpQixZQUFZLDhCQUE4Qiw4QkFBOEIsc0VBQXNFLDRCQUE0QixTQUFTLGdDQUFnQyxJQUFJLHNFQUFzRSxvQkFBb0IsNkJBQTZCLFlBQVksRUFBRSxvQ0FBb0Msc0JBQXNCLGFBQWEsYUFBYSx1REFBdUQsb0NBQW9DLGlEQUFpRCx3Q0FBd0Msa0JBQWtCLDJDQUEyQyxNQUFNLFFBQVEsS0FBSyxXQUFXLGtCQUFrQixRQUFRLFdBQVcsS0FBSyxtQ0FBbUMsc0NBQXNDLEtBQUssZUFBZSxXQUFXLG9EQUFvRCw4QkFBOEIsY0FBYywwREFBMEQsZ0ZBQWdGLHNEQUFzRCwyQkFBMkIsV0FBVyxJQUFJLCtDQUErQyxFQUFFLDRCQUE0QixvQkFBb0IsaUJBQWlCLHlIQUF5SCxzREFBc0QsbUNBQW1DLG9DQUFvQywrQkFBK0IsOEJBQThCLG9DQUFvQyxrQ0FBa0MsZ0RBQWdELG9CQUFvQiwwTUFBME0sWUFBWSxFQUFFLGtDQUFrQyxzQkFBc0IsYUFBYSxvQkFBb0Isb0JBQW9CLGNBQWMsMkVBQTJFLHFEQUFxRCxvQkFBb0IsT0FBTyxpQkFBaUIsY0FBYyxpREFBaUQsb0NBQW9DLG9GQUFvRixJQUFJLGtEQUFrRCxTQUFTLFlBQVksMEdBQTBHLGlFQUFpRSw0SEFBNEgsOEJBQThCLGtCQUFrQixPQUFPLHVCQUF1QixnQkFBZ0IsdURBQXVELDJNQUEyTSxnQkFBZ0Isd0JBQXdCLHVHQUF1RyxtQkFBbUIsUUFBUSxRQUFRLHNCQUFzQixTQUFTLDZCQUE2QiwwSUFBMEksb0dBQW9HLG1DQUFtQyxZQUFZLEVBQUUsd0JBQXdCLHNCQUFzQixhQUFhLGlGQUFpRjtBQUNscytCLDZIQUE2SCxFQUFFLGVBQWUsaUNBQWlDLDZDQUE2Qyx3REFBd0QsK0dBQStHLHlLQUF5SywwQkFBMEIsd0VBQXdFLGdDQUFnQyw2QkFBNkIsdUJBQXVCLFdBQVcseUJBQXlCLG1CQUFtQix5QkFBeUIsc0NBQXNDLHdCQUF3Qix5QkFBeUIsY0FBYyxnRkFBZ0YsRUFBRSwrRUFBK0UsdUJBQXVCLE1BQU0sZ0JBQWdCLHNFQUFzRSw2QkFBNkIsdUVBQXVFLGNBQWMsRUFBRSxvREFBb0Qsc0JBQXNCLGFBQWEsYUFBYSx3Q0FBd0MsY0FBYywwREFBMEQsd0JBQXdCLGdFQUFnRSwyQkFBMkIsb0RBQW9ELElBQUksNEdBQTRHLEVBQUUsNEJBQTRCLHdCQUF3QixZQUFZLGtDQUFrQyx1R0FBdUcsaUJBQWlCLHFEQUFxRCwyQkFBMkIseUVBQXlFLFlBQVksV0FBVyxrRUFBa0Usc0RBQXNELDhCQUE4QiwrQ0FBK0MsK0NBQStDLEVBQUUsWUFBWSxFQUFFLGtEQUFrRCxzQkFBc0IsYUFBYSxnQkFBZ0Isa0RBQWtELGdCQUFnQixFQUFFLG9CQUFvQixnQkFBZ0IsRUFBRSxvQkFBb0IsS0FBSyxNQUFNLHFCQUFxQixLQUFLLE1BQU0scUJBQXFCLFlBQVksSUFBSSxFQUFFLGtCQUFrQixnQ0FBZ0MsWUFBWSxnQkFBZ0Isa0RBQWtELEtBQUssRUFBRSxFQUFFLGtCQUFrQixnQkFBZ0IsU0FBUyxjQUFjLDZDQUE2QyxrQkFBa0IsYUFBYSxFQUFFLDJCQUEyQixNQUFNLGVBQWUsT0FBTyxzQkFBc0IsUUFBUSxXQUFXLHdCQUF3QixzQkFBc0IsZ0NBQWdDLFNBQVMsMkJBQTJCLGFBQWEsU0FBUywyQkFBMkIsTUFBTSxRQUFRLFdBQVcsd0JBQXdCLGVBQWUsT0FBTyxzQkFBc0IsYUFBYSxPQUFPLFdBQVcsb0dBQW9HLEVBQUUsZ0JBQWdCLHNCQUFzQixhQUFhLHlCQUF5Qix3RkFBd0YsRUFBRSxjQUFjLHNCQUFzQixhQUFhLGFBQWEsK0JBQStCLHlDQUF5Qyw4QkFBOEIsd0JBQXdCLElBQUksaURBQWlELFNBQVMsaUJBQWlCLGtDQUFrQyxVQUFVLEVBQUUsZUFBZSwwREFBMEQsMEJBQTBCLDJFQUEyRSxZQUFZLEVBQUUsNEJBQTRCLHNCQUFzQixhQUFhLGFBQWEsOE5BQThOLDZHQUE2RyxpUkFBaVIsZ0JBQWdCLGdIQUFnSCw4SkFBOEosV0FBVyxVQUFVLEVBQUUsNEdBQTRHLHNCQUFzQixhQUFhLGdGQUFnRixZQUFZLEdBQUcsc0JBQXNCLGFBQWEsU0FBUyx3Q0FBd0MsS0FBSyxJQUFJLG1CQUFtQixjQUFjLDBCQUEwQixHQUFHLHNCQUFzQixhQUFhLGtCQUFrQixJQUFJLEtBQUssU0FBUyxpQkFBaUIsY0FBYyx1RkFBdUYsTUFBTSxRQUFRLGtCQUFrQixZQUFZLEdBQUcsc0JBQXNCLGFBQWEsY0FBYywyQ0FBMkMsZUFBZSxpQ0FBaUMsOEJBQThCLFlBQVksRUFBRSxNQUFNLHNCQUFzQixhQUFhLGNBQWMsS0FBSyxjQUFjLGlCQUFpQiw4Q0FBOEMsdUNBQXVDLGdCQUFnQix5REFBeUQsY0FBYyw2REFBNkQsR0FBRyw4QkFBOEIsU0FBUyxZQUFZLHFCQUFxQix3RkFBd0YsY0FBYyxhQUFhLHlFQUF5RSxlQUFlLHNCQUFzQixzRUFBc0Usd0NBQXdDLE9BQU8scUdBQXFHLG9CQUFvQix3QkFBd0IsZUFBZSxzQkFBc0Isa0JBQWtCLGtDQUFrQyx5REFBeUQsbUNBQW1DLDBEQUEwRCxnQ0FBZ0MscUJBQXFCLDRCQUE0Qiw2QkFBNkIsZUFBZSx1QkFBdUIsSUFBSSxzQkFBc0IsUUFBUSxpQkFBaUIsWUFBWSxFQUFFLDBEQUEwRCxzQkFBc0IsYUFBYSxPQUFPLHVCQUF1QixZQUFZLEdBQUcsc0JBQXNCLGFBQWEsY0FBYyxtQ0FBbUMsY0FBYyxnQkFBZ0IsY0FBYyxzQkFBc0IsdUNBQXVDLHdDQUF3QyxJQUFJLHNDQUFzQyxLQUFLLElBQUksaUZBQWlGLFlBQVksRUFBRSxnQkFBZ0Isc0JBQXNCLGFBQWEsdUVBQXVFLHlNQUF5TSxZQUFZLEVBQUUsZ0RBQWdELHNCQUFzQixhQUFhLGNBQWMscUNBQXFDLDBDQUEwQyxxQ0FBcUMsOENBQThDLHFGQUFxRixvQ0FBb0MsVUFBVSxPQUFPLG1GQUFtRiw4QkFBOEIsNkNBQTZDLHVFQUF1RSwwQkFBMEIsTUFBTSwyQkFBMkIsMkNBQTJDLDRFQUE0RSx1Q0FBdUMsMkJBQTJCLDRGQUE0RixFQUFFLHVCQUF1QixXQUFXLGVBQWUsNEJBQTRCLHNCQUFzQix1R0FBdUcsNEVBQTRFLDBCQUEwQixnRkFBZ0YseUJBQXlCLFlBQVksRUFBRSw4QkFBOEIsc0JBQXNCLGFBQWEsT0FBTyxtQkFBbUIsZ0NBQWdDLGlCQUFpQixnQ0FBZ0MsaUJBQWlCLHlDQUF5QyxtQkFBbUIsNkJBQTZCLFlBQVksR0FBRyxzQkFBc0IsYUFBYSxXQUFXLGdCQUFnQixHQUFHLHNCQUFzQixhQUFhLDRCQUE0Qix5RUFBeUUsV0FBVywyRUFBMkUsOEJBQThCLDJDQUEyQyxzQ0FBc0MsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLGFBQWEsZ0JBQWdCLDBDQUEwQyxJQUFJLDBDQUEwQyxnQ0FBZ0MsY0FBYyw0REFBNEQsY0FBYyw2Q0FBNkMsc0JBQXNCLE1BQU0seUJBQXlCLDZDQUE2QywrRUFBK0UsNENBQTRDLCtGQUErRixvQkFBb0Isb0VBQW9FLG1FQUFtRSxrQkFBa0Isa0VBQWtFLFlBQVksNEJBQTRCLGNBQWMsV0FBVyxNQUFNLCtCQUErQiw2QkFBNkIsY0FBYyw0REFBNEQsY0FBYyx5Q0FBeUMsZ0NBQWdDLGNBQWMsV0FBVyxvREFBb0QsMlBBQTJQLGtCQUFrQixpQkFBaUIsK0JBQStCLCtCQUErQix3QkFBd0IsNkJBQTZCLE9BQU8sd0VBQXdFLElBQUksMENBQTBDLG9DQUFvQyxrRUFBa0UsSUFBSSwyQ0FBMkMsOENBQThDLGNBQWMsNEJBQTRCLHlCQUF5QixnQkFBZ0IsOENBQThDLHlFQUF5RSwrQ0FBK0MscVlBQXFZLDJCQUEyQixRQUFRLEVBQUUsTUFBTSxlQUFlLHFDQUFxQyxTQUFTLFdBQVcsTUFBTSx3Q0FBd0MsV0FBVywrREFBK0QsV0FBVywyQ0FBMkMsNEJBQTRCLHNIQUFzSCxzQkFBc0Isd0JBQXdCLGlEQUFpRCxvQ0FBb0MsY0FBYyxXQUFXLGtIQUFrSCx5Q0FBeUMsb0JBQW9CLFdBQVcseURBQXlELDJDQUEyQyx3Q0FBd0Msa0JBQWtCLHVDQUF1Qyw2RkFBNkYsMEJBQTBCLCtDQUErQyxLQUFLLFlBQVksNEJBQTRCLDZCQUE2Qiw2Q0FBNkMsWUFBWSxFQUFFLG9KQUFvSixzQkFBc0IsYUFBYSxrQkFBa0IsT0FBTyxtRkFBbUYsa0JBQWtCLE9BQU8sMkdBQTJHLGdCQUFnQixPQUFPLGdHQUFnRyxjQUFjLE9BQU8sc0ZBQXNGLGNBQWMsT0FBTyx3RkFBd0YsZ0JBQWdCLGdDQUFnQyxnQkFBZ0IsOEJBQThCLHNGQUFzRixPQUFPLCtDQUErQyxvQ0FBb0MsaURBQWlELE1BQU0sK0VBQStFLCtCQUErQixpREFBaUQseUJBQXlCLGFBQWEsdUNBQXVDLG9FQUFvRSw0QkFBNEIsU0FBUywrQkFBK0IsNkJBQTZCLHdCQUF3Qiw2Q0FBNkMsZUFBZSwwQkFBMEIsNkJBQTZCLHdCQUF3Qiw2Q0FBNkMsZUFBZSxnQ0FBZ0MsNEJBQTRCLGlDQUFpQyxpQ0FBaUMsb0RBQW9ELFNBQVMsZ0NBQWdDLG1DQUFtQyxxQkFBcUIsZ01BQWdNLHVFQUF1RSx1Q0FBdUMsNkJBQTZCLDZCQUE2QixtREFBbUQsNkJBQTZCLG1DQUFtQyw2QkFBNkIsNEJBQTRCLDJCQUEyQixjQUFjLDBDQUEwQywrQ0FBK0MsNkJBQTZCLDRCQUE0Qiw4QkFBOEIsRUFBRSxZQUFZLEVBQUUsb0VBQW9FLHNCQUFzQixhQUFhLGlDQUFpQywrQ0FBK0MsaUhBQWlILEVBQUUsWUFBWSxFQUFFLHdCQUF3QixzQkFBc0IsYUFBYSxjQUFjLDRFQUE0RSx3QkFBd0Isb0NBQW9DLGdDQUFnQywwQ0FBMEMsZUFBZSw0QkFBNEIsc0RBQXNELEVBQUUsWUFBWSxFQUFFLGdCQUFnQixzQkFBc0IsYUFBYSx5REFBeUQsR0FBRyxzQkFBc0IsYUFBYSxjQUFjLDJIQUEySCx1RUFBdUUsOERBQThELElBQUksc0JBQXNCLG9CQUFvQiwwQkFBMEIsbUJBQW1CLGlCQUFpQixJQUFJLHNCQUFzQiw2QkFBNkIsa0JBQWtCLGtDQUFrQyxjQUFjLGtDQUFrQyxTQUFTLCtCQUErQiw0QkFBNEIsMkJBQTJCLFNBQVMsdUJBQXVCLHlDQUF5QyxzQkFBc0IsaUNBQWlDLHVCQUF1Qiw0REFBNEQsaURBQWlELEVBQUUsZ0RBQWdELHNCQUFzQixhQUFhLGFBQWEsd0NBQXdDLDZCQUE2QixxQ0FBcUMsa0NBQWtDLDZGQUE2Rix5QkFBeUIsdUJBQXVCLGdDQUFnQyx3REFBd0Qsb0NBQW9DLHdCQUF3QiwwQkFBMEIsOEJBQThCLHVJQUF1SSwwQ0FBMEMseURBQXlELEVBQUUsWUFBWSxFQUFFLG9CQUFvQixzQkFBc0IsYUFBYSxrQkFBa0IsMkVBQTJFLGtCQUFrQiwrREFBK0QsaUJBQWlCLDJCQUEyQixpQ0FBaUMsWUFBWSwwQkFBMEIsa0NBQWtDLGtCQUFrQixtREFBbUQsa0JBQWtCLDJGQUEyRiw0QkFBNEIsaUNBQWlDLFlBQVksMEJBQTBCLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixhQUFhLGNBQWMsaUhBQWlILHFEQUFxRCxxQkFBcUIsSUFBSSxrQ0FBa0MsU0FBUywrQkFBK0IsU0FBUywyQkFBMkIsd0JBQXdCLHdCQUF3Qix3QkFBd0Isd0JBQXdCLGlEQUFpRCxFQUFFLGdDQUFnQyxzQkFBc0IsYUFBYSxnQkFBZ0IsOEVBQThFLGlDQUFpQyxjQUFjLDZCQUE2Qix5Q0FBeUMsU0FBUyw2Q0FBNkMsNkRBQTZELDRDQUE0Qyw0REFBNEQsK0NBQStDLCtEQUErRCwyQ0FBMkMsMkRBQTJELEdBQUcsSUFBSSxZQUFZLEVBQUUsY0FBYyxzQkFBc0IsYUFBYSxjQUFjLG1CQUFtQixjQUFjLGVBQWUseUJBQXlCLDREQUE0RCwrREFBK0QsZ0JBQWdCLGVBQWUsZUFBZSxnRUFBZ0Usc0JBQXNCLGVBQWUsa0NBQWtDLGlDQUFpQyx3QkFBd0IsV0FBVyxrQkFBa0IsNkVBQTZFLHVDQUF1Qyw2RUFBNkUsZ0NBQWdDLHlCQUF5QixtQ0FBbUMscUNBQXFDLDBCQUEwQixrTUFBa00sK0JBQStCLHNCQUFzQixvRUFBb0Usd0NBQXdDLHNDQUFzQyxnQ0FBZ0MsMENBQTBDLEVBQUUsWUFBWSxFQUFFLGtEQUFrRCxzQkFBc0IsYUFBYSxhQUFhLHlDQUF5QyxhQUFhLG9LQUFvSyx3QkFBd0IseUNBQXlDLGdCQUFnQixtQ0FBbUMsY0FBYyw4QkFBOEIsZ0RBQWdELFlBQVksSUFBSSxLQUFLLGlDQUFpQyx5QkFBeUIsTUFBTSx5QkFBeUIsUUFBUSx1SEFBdUgsOEZBQThGLFdBQVcseURBQXlELGNBQWMsOERBQThELGlFQUFpRSxnQkFBZ0Isa0RBQWtELDhHQUE4RyxzQkFBc0Isb0NBQW9DLGtCQUFrQiwrRkFBK0YsSUFBSSxzQkFBc0IsMkJBQTJCLGtCQUFrQixnQ0FBZ0MsU0FBUyxpQkFBaUIsa0NBQWtDLFNBQVMsdUJBQXVCLG9MQUFvTCx5QkFBeUIsK0ZBQStGLG9CQUFvQixpQkFBaUIsS0FBSyxZQUFZLEVBQUUsYUFBYSxvQkFBb0IsaUNBQWlDLE1BQU0sS0FBSyxRQUFRLDZDQUE2QyxJQUFJLHVDQUF1QywwQ0FBMEMsb0NBQW9DLCtHQUErRyxJQUFJLDBHQUEwRyxZQUFZLEVBQUUsb0RBQW9ELHNCQUFzQixhQUFhLG1CQUFtQixHQUFHLHNCQUFzQixhQUFhLE9BQU8sZ0ZBQWdGLElBQUksODRKQUE4NEosSUFBSSxhQUFhLHlCQUF5QixnTEFBZ0wsdUJBQXVCLG1DQUFtQyxzREFBc0QsY0FBYyxHQUFHLHNCQUFzQixhQUFhLGNBQWMsOERBQThELDJDQUEyQyx3QkFBd0IsNEJBQTRCLE9BQU8scUdBQXFHLHVCQUF1Qix1Q0FBdUMsT0FBTyxvRkFBb0YsZ0JBQWdCLG1DQUFtQyxXQUFXLGdCQUFnQixJQUFJLGtDQUFrQyxzRUFBc0UsWUFBWSwrSUFBK0ksUUFBUSx5QkFBeUIsOENBQThDLGdJQUFnSSxtQ0FBbUMsNkNBQTZDLGtCQUFrQix3Q0FBd0MsVUFBVSxvRUFBb0U7QUFDcHYrQixDQUFDLG1DQUFtQyxNQUFNLHdCQUF3QixNQUFNLHlEQUF5RCxvQ0FBb0MsOENBQThDLFlBQVksZ0NBQWdDLHlCQUF5QixZQUFZLEVBQUUsd0RBQXdELHNCQUFzQixhQUFhLGNBQWMsd0JBQXdCLGNBQWMsOERBQThELDJKQUEySixPQUFPLDByQkFBMHJCLDBEQUEwRCx5QkFBeUIsK0JBQStCLG1CQUFtQixjQUFjLEVBQUUsUUFBUSxJQUFJLDZDQUE2QyxXQUFXLGtCQUFrQixNQUFNLFVBQVUsb2ZBQW9mLE1BQU0sMENBQTBDLG9DQUFvQyxNQUFNLGlDQUFpQyxNQUFNLDJDQUEyQywwSUFBMEksTUFBTSw4SUFBOEksTUFBTSxrRkFBa0YsTUFBTSw4RUFBOEUsTUFBTSwyQkFBMkIsTUFBTSxvQkFBb0IsTUFBTSxtQkFBbUIsTUFBTSw4Q0FBOEMsYUFBYSwyQkFBMkIsMkNBQTJDLGdDQUFnQyw4QkFBOEIsc0NBQXNDLG9DQUFvQyxrQ0FBa0MsOEJBQThCLFdBQVcsNkJBQTZCLFlBQVksRUFBRSxvSEFBb0gsc0JBQXNCLGFBQWEsb0JBQW9CLDRCQUE0QixlQUFlLHdEQUF3RCxnQ0FBZ0MsRUFBRSxNQUFNLHNCQUFzQixhQUFhLG9CQUFvQiw0QkFBNEIsZUFBZSwwQkFBMEIsaUVBQWlFLGdDQUFnQyxFQUFFLE1BQU0sc0JBQXNCLGFBQWEsb0JBQW9CLDRCQUE0QixlQUFlLFdBQVcsZ0NBQWdDLEVBQUUsTUFBTSxzQkFBc0IsYUFBYSxvQkFBb0IsNEJBQTRCLGVBQWUsbUJBQW1CLGdDQUFnQyxFQUFFLE1BQU0sc0JBQXNCLGFBQWEsb0JBQW9CLDREQUE0RCxpQ0FBaUMsdUNBQXVDLFdBQVcsdURBQXVELHFFQUFxRSx3SEFBd0gsaUxBQWlMLHlIQUF5SCwrQkFBK0IsdUNBQXVDLGVBQWUsMEJBQTBCLHlCQUF5Qix1QkFBdUIsdUlBQXVJLDRCQUE0Qix1QkFBdUIsNklBQTZJLG9CQUFvQixvQ0FBb0MsdURBQXVELGlDQUFpQyw0QkFBNEIsWUFBWSxXQUFXLHFCQUFxQiw2Q0FBNkMsMEJBQTBCLHdCQUF3QixZQUFZLHlFQUF5RSxxRkFBcUYsb0RBQW9ELEVBQUUsOEJBQThCLHNCQUFzQixhQUFhLG9CQUFvQiw0QkFBNEIsZUFBZSxvQkFBb0IsZ0NBQWdDLEVBQUUsTUFBTSxzQkFBc0IsYUFBYSxvQkFBb0IsNEJBQTRCLGVBQWUsV0FBVyxnQ0FBZ0MsRUFBRSxNQUFNLHNCQUFzQixhQUFhLG9CQUFvQiw0QkFBNEIseUNBQXlDLHdJQUF3SSxpQ0FBaUMscUJBQXFCLHVEQUF1RCxtQkFBbUIsa0ZBQWtGLGdDQUFnQyxFQUFFLDRCQUE0QixzQkFBc0IsYUFBYSxvQkFBb0IsNEJBQTRCLGdDQUFnQyw4SUFBOEksZUFBZSxzQ0FBc0Msd0NBQXdDLGlGQUFpRixtQkFBbUIsd0RBQXdELG1CQUFtQix5REFBeUQsZ0NBQWdDLEVBQUUsb0JBQW9CLHNCQUFzQixhQUFhLG9CQUFvQiw0QkFBNEIsd0JBQXdCLDRIQUE0SCxnQ0FBZ0MsRUFBRSxjQUFjLHNCQUFzQixhQUFhLG9CQUFvQiw0QkFBNEIsZUFBZSx1REFBdUQsZ0NBQWdDLEVBQUUsTUFBTSxzQkFBc0IsYUFBYSxvQkFBb0IsNEJBQTRCLHdCQUF3QixpQkFBaUIsd0JBQXdCLFdBQVcseUJBQXlCLHNCQUFzQiw4Q0FBOEMsb0JBQW9CLHFCQUFxQixnQ0FBZ0MsRUFBRSxjQUFjLHNCQUFzQixhQUFhLG9CQUFvQiw0QkFBNEIsZUFBZSxtQkFBbUIsK0RBQStELG9CQUFvQiw4RkFBOEYsNkJBQTZCLGdDQUFnQyxFQUFFLE1BQU0sc0JBQXNCLGFBQWEseUJBQXlCLEtBQUssbUNBQW1DLDJKQUEySiw0RUFBNEUsOEJBQThCLG1DQUFtQyxnQ0FBZ0MsUUFBUSxJQUFJLGlGQUFpRixRQUFRLElBQUksU0FBUyxpQkFBaUIsVUFBVSxzQkFBc0IsUUFBUSwwQkFBMEIsU0FBUywyQkFBMkIsdUNBQXVDLFdBQVcsS0FBSyxXQUFXLElBQUksNEZBQTRGLFFBQVEsbUNBQW1DLHdCQUF3QixhQUFhLHNCQUFzQixnQ0FBZ0MsdUNBQXVDLFdBQVcsS0FBSyx1Q0FBdUMsSUFBSSwrQ0FBK0MsUUFBUSxTQUFTLG1CQUFtQixZQUFZLGdDQUFnQyxZQUFZLEVBQUUsZ0JBQWdCLHNCQUFzQixhQUFhLE9BQU8sdUVBQXVFLGlEQUFpRCxZQUFZLEdBQUcsc0JBQXNCLGFBQWEsZ0JBQWdCLDZJQUE2SSxhQUFhLE9BQU8sWUFBWSxFQUFFLGdCQUFnQixzQkFBc0IsYUFBYSxjQUFjLHNDQUFzQyxJQUFJLEVBQUUsNkJBQTZCLElBQUksa0dBQWtHLFVBQVUsS0FBSyxJQUFJLDBCQUEwQix5QkFBeUIsWUFBWSxZQUFZLEdBQUcsc0JBQXNCLGFBQWEsa0JBQWtCLGlGQUFpRix5Q0FBeUMsa0JBQWtCLEVBQUUsSUFBSSxZQUFZLEdBQUcsc0JBQXNCLGFBQWEsa0JBQWtCLHlJQUF5SSx5Q0FBeUMsWUFBWSxFQUFFLFlBQVksc0JBQXNCLGFBQWEsY0FBYyx1QkFBdUIsZUFBZSxtQkFBbUIsY0FBYyxXQUFXLEtBQUssd0JBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsRUFBRSxNQUFNLGVBQWUsRUFBRSxNQUFNLGlCQUFpQix3Q0FBd0Msa0NBQWtDLGNBQWMsd0RBQXdELGdCQUFnQixZQUFZLEdBQUcsc0JBQXNCLGFBQWEsY0FBYyx1QkFBdUIsMkJBQTJCLGVBQWUsbURBQW1ELDJEQUEyRCwrQ0FBK0MsY0FBYyxZQUFZLEVBQUUsb0RBQW9ELHNCQUFzQixhQUFhLGFBQWEsb0JBQW9CLDBCQUEwQixRQUFRLGtDQUFrQyxnQkFBZ0Isb0JBQW9CLFNBQVMsa0JBQWtCLHFCQUFxQixPQUFPLDhCQUE4QixvQkFBb0IsRUFBRSxzQkFBc0Isc0JBQXNCLGFBQWEsa0JBQWtCLCtDQUErQyxZQUFZLEdBQUcsc0JBQXNCLGFBQWEsY0FBYyxrQkFBa0IsOEVBQThFLFlBQVksR0FBRyx1QkFBdUIsYUFBYSxjQUFjLFVBQVUsc0JBQXNCLCtCQUErQix3QkFBd0IsV0FBVyw2Q0FBNkMsMkVBQTJFLGVBQWUsMk1BQTJNLElBQUksbVpBQW1aLFlBQVksRUFBRSxNQUFNLHVCQUF1QixhQUFhLGNBQWMsMkJBQTJCLG1EQUFtRCxXQUFXLGtCQUFrQixjQUFjLFNBQVMsT0FBTyxnRUFBZ0UsWUFBWSxHQUFHLHVCQUF1QixhQUFhLGNBQWMscUNBQXFDLDhGQUE4RixZQUFZLEdBQUcsdUJBQXVCLGFBQWEsY0FBYyxVQUFVLHNDQUFzQyx3QkFBd0IsK0RBQStELFlBQVksWUFBWSxFQUFFLE1BQU0sdUJBQXVCLGFBQWEsY0FBYyx5QkFBeUIsaUNBQWlDLGdFQUFnRSxZQUFZLEdBQUcsdUJBQXVCLGFBQWEsY0FBYyxLQUFLLGdCQUFnQixnQkFBZ0IsU0FBUyxjQUFjLEtBQUssRUFBRSxFQUFFLHNDQUFzQyxnQkFBZ0IsZ0JBQWdCLHVCQUF1QixFQUFFLEVBQUUsbUJBQW1CLDhDQUE4QyxtQkFBbUIsSUFBSSxXQUFXLFlBQVksR0FBRyx1QkFBdUIsYUFBYSxhQUFhLGdHQUFnRyxvQkFBb0IsWUFBWSxFQUFFLFFBQVEsdUJBQXVCLGFBQWEsZ0JBQWdCLFNBQVMsc0lBQXNJLGNBQWMsb0JBQW9CLGtCQUFrQixXQUFXLCtEQUErRCxTQUFTLGdCQUFnQiwrTEFBK0wsS0FBSyxNQUFNLG9RQUFvUSxFQUFFLFFBQVEsdUJBQXVCLGFBQWEsY0FBYyxNQUFNLGtCQUFrQixrREFBa0QsU0FBUyxjQUFjLGlKQUFpSixnQkFBZ0IsTUFBTSxrQ0FBa0MsNEJBQTRCLGlCQUFpQiw2Q0FBNkMsU0FBUyw2Q0FBNkMsNklBQTZJLDBGQUEwRiw0Q0FBNEMsa0ZBQWtGLGtCQUFrQixFQUFFLGlCQUFpQiw2QkFBNkIsY0FBYyxFQUFFLDBEQUEwRCx1QkFBdUIsYUFBYSxnQkFBZ0IsOERBQThELDZCQUE2QixPQUFPLG9DQUFvQyx5QkFBeUIsNkJBQTZCLHlGQUF5RixlQUFlLHlJQUF5SSxFQUFFLFFBQVEsdUJBQXVCLGFBQWEsY0FBYyw4Q0FBOEMsNkNBQTZDLE9BQU8sbUpBQW1KLFlBQVksR0FBRyx1QkFBdUIsYUFBYSxjQUFjLG1CQUFtQixZQUFZLFlBQVksRUFBRSxNQUFNLHVCQUF1QixhQUFhLGNBQWMsNERBQTRELGlGQUFpRixJQUFJLHFEQUFxRCxvSEFBb0gsbUJBQW1CLHFEQUFxRCxZQUFZLEdBQUcsdUJBQXVCLGFBQWEsWUFBWSx1Q0FBdUMsRUFBRSxNQUFNLHVCQUF1QixhQUFhLDJIQUEySCx5REFBeUQsS0FBSyxrRUFBa0UsdUJBQXVCLGFBQWEsOEJBQThCLEVBQUUsZ0JBQWdCLG9DQUFvQyxtREFBbUQsa0ZBQWtGLHlDQUF5QyxtQkFBbUIscURBQXFELG1CQUFtQixTQUFTLFlBQVksRUFBRSxvQkFBb0IsdUJBQXVCLGFBQWEsOENBQThDLE1BQU0sbUJBQW1CLGlFQUFpRSxpQkFBaUIseUVBQXlFLDZDQUE2QyxVQUFVLGVBQWUsRUFBRSxzQkFBc0IsdUJBQXVCLGFBQWEsZ0JBQWdCLDBDQUEwQyxxQkFBcUIsMEJBQTBCLHlHQUF5RyxZQUFZLEdBQUcsdUJBQXVCLGFBQWEsZ0JBQWdCLHlFQUF5RSxvQkFBb0IsZUFBZSxpSkFBaUosMkJBQTJCLGdDQUFnQyxXQUFXLG9DQUFvQyxLQUFLLFdBQVcsTUFBTSxrQkFBa0IsNkJBQTZCLG1CQUFtQixzQ0FBc0MsVUFBVSxtQkFBbUIsRUFBRSxjQUFjLHVEQUF1RCxzQkFBc0IsZ0JBQWdCLGdEQUFnRCw4QkFBOEIsU0FBUyxTQUFTLGtCQUFrQiw2QkFBNkIsNkVBQTZFLFlBQVksRUFBRSxvREFBb0QsdUJBQXVCLGFBQWEsbUNBQW1DLFlBQVksRUFBRSx3QkFBd0IsdUJBQXVCLGFBQWEsMkRBQTJELDhCQUE4QixHQUFHLHVCQUF1QixhQUFhLFlBQVksR0FBRyx1QkFBdUIsYUFBYSwyREFBMkQsMkJBQTJCLEdBQUcsdUJBQXVCLGFBQWEsZ0JBQWdCLHVCQUF1Qix1REFBdUQsa0JBQWtCLCtCQUErQiwwQ0FBMEMsa0JBQWtCLHlCQUF5QixTQUFTLHlCQUF5Qix1REFBdUQsa0JBQWtCLCtCQUErQixHQUFHLFVBQVUsK0JBQStCLFlBQVksRUFBRSxRQUFRLHVCQUF1QixhQUFhLHlGQUF5RiwrS0FBK0ssWUFBWSxHQUFHLHVCQUF1QixhQUFhLGNBQWMsaUNBQWlDLHVCQUF1QixFQUFFLGNBQWMsWUFBWSxHQUFHLHVCQUF1QixhQUFhLGNBQWMsNkJBQTZCLHVCQUF1QixZQUFZLEVBQUUsUUFBUSx1QkFBdUIsYUFBYSxnQkFBZ0Isd0pBQXdKLGFBQWEsWUFBWSxFQUFFLFFBQVEsdUJBQXVCLGFBQWEsY0FBYyxlQUFlLGdMQUFnTCxxQ0FBcUMsVUFBVSx1QkFBdUIsSUFBSSxjQUFjLFNBQVMsY0FBYyxxS0FBcUssY0FBYyxnREFBZ0QsYUFBYSxZQUFZLEVBQUUsUUFBUSx1QkFBdUIsYUFBYSxjQUFjLGlCQUFpQiw2QkFBNkIsZ0JBQWdCLFFBQVEsU0FBUyxxQkFBcUIsTUFBTSx3QkFBd0IsZUFBZSxJQUFJLGVBQWUsbUJBQW1CLHVDQUF1QyxxQ0FBcUMsbUNBQW1DLFlBQVksNEJBQTRCLFNBQVMsd0dBQXdHLFlBQVksRUFBRSxnQ0FBZ0MsdUJBQXVCLGFBQWEsY0FBYyxrQkFBa0IsVUFBVSxtQkFBbUIsd0hBQXdILFlBQVksbUNBQW1DLFNBQVMsYUFBYSxHQUFHLHVCQUF1QixhQUFhLFNBQVMsWUFBWSxHQUFHLHVCQUF1QixhQUFhLGNBQWMsSUFBSSxVQUFVLFdBQVcsWUFBWSxHQUFHLHVCQUF1QixhQUFhLGNBQWMsOEVBQThFLElBQUksK0JBQStCLFNBQVMsZUFBZSxZQUFZLEdBQUcsdUJBQXVCLGFBQWEsY0FBYyx1SkFBdUosMkVBQTJFLHlMQUF5TCxtVEFBbVQsMExBQTBMLGVBQWUsY0FBYyxFQUFFLGdCQUFnQix1QkFBdUIsYUFBYSxjQUFjLHdDQUF3Qyw2R0FBNkcsRUFBRSw4QkFBOEIsWUFBWSxHQUFHLHVCQUF1QixhQUFhLGNBQWMsd0NBQXdDLGlCQUFpQixZQUFZLEdBQUcsdUJBQXVCLGFBQWEsY0FBYyw4QkFBOEIsc0JBQXNCLFlBQVksRUFBRSxRQUFRLHVCQUF1QixhQUFhLDRCQUE0QixZQUFZLE1BQU0sdURBQXVELG9HQUFvRyxLQUFLLHdCQUF3Qix1Q0FBdUMsY0FBYyxnQ0FBZ0MseUJBQXlCLG9CQUFvQixZQUFZLEdBQUcsdUJBQXVCLGFBQWEsY0FBYyw0REFBNEQsMklBQTJJLFlBQVksR0FBRyx1QkFBdUIsYUFBYSxjQUFjLDJCQUEyQixhQUFhLFlBQVksRUFBRSxRQUFRLHVCQUF1QixhQUFhLGNBQWMsU0FBUyxtQkFBbUIsd0RBQXdELFlBQVksR0FBRyx1QkFBdUIsYUFBYSxnQkFBZ0IsaURBQWlELGdCQUFnQixtQkFBbUIsdUVBQXVFLHNDQUFzQyxnQ0FBZ0MsWUFBWSxXQUFXLHFEQUFxRCxTQUFTLHNDQUFzQyxZQUFZLEdBQUcsdUJBQXVCLGFBQWEsaUJBQWlCLFlBQVksRUFBRSxRQUFRLHVCQUF1QixhQUFhLGNBQWMscUdBQXFHLGlCQUFpQiw2R0FBNkcscUJBQXFCLElBQUksMkJBQTJCLHdCQUF3Qiw2REFBNkQsWUFBWSxLQUFLLEtBQUssb0NBQW9DLGdFQUFnRSxZQUFZLG9CQUFvQixTQUFTLDJEQUEyRCxPQUFPLHVEQUF1RCxjQUFjLFNBQVMsVUFBVSwrQkFBK0IsdUJBQXVCLG1CQUFtQixLQUFLLHVCQUF1Qix3Q0FBd0MsTUFBTSxPQUFPLFlBQVksV0FBVyx1Q0FBdUMsVUFBVSxHQUFHLHVCQUF1QixhQUFhLHVCQUF1QixZQUFZLEVBQUUsd0JBQXdCLHVCQUF1QixhQUFhLGFBQWEsc0JBQXNCLGdCQUFnQixFQUFFLFFBQVEsdUJBQXVCLGFBQWEsaURBQWlELHdCQUF3QixjQUFjLHlCQUF5QixpQ0FBaUMsZ0JBQWdCLDBDQUEwQyxjQUFjLDZCQUE2QixjQUFjLDBCQUEwQixzTkFBc04sS0FBSyw0TkFBNE4sc0JBQXNCLHNDQUFzQyxjQUFjLHdCQUF3QixXQUFXLDRHQUE0RyxZQUFZLFlBQVksY0FBYyxzQkFBc0IsNEhBQTRILFdBQVcsc0JBQXNCLGlHQUFpRyxZQUFZLFdBQVcsS0FBSywrQkFBK0IsK0JBQStCLFlBQVksWUFBWSxjQUFjLHNCQUFzQix3QkFBd0IsZ0JBQWdCLCtHQUErRyxZQUFZLFlBQVksY0FBYyxzQkFBc0IsbUJBQW1CLFdBQVcsNkJBQTZCLG1IQUFtSCwrQ0FBK0MsY0FBYyxzQkFBc0IsNkhBQTZILGtCQUFrQiwrR0FBK0csdUNBQXVDLDJCQUEyQiwrQkFBK0IsWUFBWSxZQUFZLGNBQWMsc0JBQXNCLFlBQVksV0FBVyxLQUFLLDJDQUEyQywyREFBMkQsK0NBQStDLGNBQWMsc0JBQXNCLGtCQUFrQiw4R0FBOEcsZ0JBQWdCLFdBQVcsTUFBTSwyQkFBMkIsZUFBZSxZQUFZLFlBQVksY0FBYyxpQkFBaUIsbURBQW1ELHVCQUF1QixtREFBbUQsMkJBQTJCLFdBQVcsZUFBZSxrQkFBa0Isa0JBQWtCLEtBQUssbUJBQW1CLHlCQUF5QixVQUFVLG1CQUFtQixFQUFFLGNBQWMsd0JBQXdCLFNBQVMsa0JBQWtCLGdCQUFnQixvR0FBb0csY0FBYyxlQUFlLCtFQUErRSxjQUFjLFdBQVcsaUJBQWlCLGtDQUFrQyxzQ0FBc0MsU0FBUyxjQUFjLDhEQUE4RCxxRkFBcUYsaUpBQWlKLDRCQUE0QixnQ0FBZ0Msc0JBQXNCLFdBQVcsVUFBVSw4R0FBOEcsWUFBWSxZQUFZLGdDQUFnQyxzQkFBc0IsOEZBQThGLFlBQVk7QUFDOXIrQixDQUFDLHVFQUF1RSxFQUFFLHdDQUF3Qyx1QkFBdUIsYUFBYSx5REFBeUQsR0FBRyxFQUFFLEdBQUcsV0FBVyxHQUFHLEdBQUcsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmeE87QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxVQUFVO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0dBQWdHO0FBQ2hHO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxnR0FBZ0c7QUFDaEc7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDViw2QkFBNkI7QUFDN0IsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLEtBQUs7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCw0QkFBNEI7QUFDNUIsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLDJCQUEyQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsZ0NBQWdDO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzdkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0M7Ozs7Ozs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZCOzs7Ozs7OztBQzlHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUEsdUI7Ozs7Ozs7O0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsR0FBRztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2QsV0FBVyxpQkFBaUI7QUFDNUIsV0FBVyxFQUFFO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZCxXQUFXLFVBQVU7QUFDckIsV0FBVyxHQUFHO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkLFdBQVcsaUJBQWlCO0FBQzVCLFdBQVcsRUFBRTtBQUNiLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtCOzs7Ozs7O0FDN0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLEtBQUs7QUFDbEM7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsV0FBVztBQUN4QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLFFBQVE7QUFDckIs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QUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLDRCOzs7Ozs7OztBQ2p0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwTEFBMkwseUNBQXlDLCtHQUErRyx5Q0FBeUM7QUFDNVg7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZCxXQUFXLFVBQVU7QUFDckIsV0FBVyxHQUFHO0FBQ2QsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxxQyIsImZpbGUiOiJyZWFjdGRvbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9lbXB0eUZ1bmN0aW9uJyk7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gZW1wdHlGdW5jdGlvbjtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGZvcm1hdCkge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgfSBjYXRjaCAoeCkge31cbiAgICB9O1xuXG4gICAgd2FybmluZyA9IGZ1bmN0aW9uIHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQpIHtcbiAgICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2B3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgKyAnbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZm9ybWF0LmluZGV4T2YoJ0ZhaWxlZCBDb21wb3NpdGUgcHJvcFR5cGU6ICcpID09PSAwKSB7XG4gICAgICAgIHJldHVybjsgLy8gSWdub3JlIENvbXBvc2l0ZUNvbXBvbmVudCBwcm9wdHlwZSBjaGVjay5cbiAgICAgIH1cblxuICAgICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIgPiAyID8gX2xlbjIgLSAyIDogMCksIF9rZXkyID0gMjsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICAgIGFyZ3NbX2tleTIgLSAyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICAgIH1cblxuICAgICAgICBwcmludFdhcm5pbmcuYXBwbHkodW5kZWZpbmVkLCBbZm9ybWF0XS5jb25jYXQoYXJncykpO1xuICAgICAgfVxuICAgIH07XG4gIH0pKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZmJqcy9saWIvd2FybmluZy5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIHZhbGlkYXRlRm9ybWF0ID0gZnVuY3Rpb24gdmFsaWRhdGVGb3JtYXQoZm9ybWF0KSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFsaWRhdGVGb3JtYXQgPSBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGludmFyaWFudChjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpO1xuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgKyAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KSk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZmJqcy9saWIvaW52YXJpYW50LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG5cbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xudmFyIGNhbkRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9jYW5EZWZpbmVQcm9wZXJ0eScpO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50U3ltYm9sJyk7XG5cbnZhciBSRVNFUlZFRF9QUk9QUyA9IHtcbiAga2V5OiB0cnVlLFxuICByZWY6IHRydWUsXG4gIF9fc2VsZjogdHJ1ZSxcbiAgX19zb3VyY2U6IHRydWVcbn07XG5cbnZhciBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biwgc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd247XG5cbmZ1bmN0aW9uIGhhc1ZhbGlkUmVmKGNvbmZpZykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgJ3JlZicpKSB7XG4gICAgICB2YXIgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25maWcsICdyZWYnKS5nZXQ7XG4gICAgICBpZiAoZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb25maWcucmVmICE9PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGhhc1ZhbGlkS2V5KGNvbmZpZykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgJ2tleScpKSB7XG4gICAgICB2YXIgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25maWcsICdrZXknKS5nZXQ7XG4gICAgICBpZiAoZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb25maWcua2V5ICE9PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSkge1xuICB2YXIgd2FybkFib3V0QWNjZXNzaW5nS2V5ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24pIHtcbiAgICAgIHNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duID0gdHJ1ZTtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXM6IGBrZXlgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgJyArICdpbiBgdW5kZWZpbmVkYCBiZWluZyByZXR1cm5lZC4gSWYgeW91IG5lZWQgdG8gYWNjZXNzIHRoZSBzYW1lICcgKyAndmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCAnICsgJ3Byb3AuIChodHRwczovL2ZiLm1lL3JlYWN0LXNwZWNpYWwtcHJvcHMpJywgZGlzcGxheU5hbWUpIDogdm9pZCAwO1xuICAgIH1cbiAgfTtcbiAgd2FybkFib3V0QWNjZXNzaW5nS2V5LmlzUmVhY3RXYXJuaW5nID0gdHJ1ZTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAna2V5Jywge1xuICAgIGdldDogd2FybkFib3V0QWNjZXNzaW5nS2V5LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuZnVuY3Rpb24gZGVmaW5lUmVmUHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKSB7XG4gIHZhciB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93bikge1xuICAgICAgc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24gPSB0cnVlO1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclczogYHJlZmAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vZmIubWUvcmVhY3Qtc3BlY2lhbC1wcm9wcyknLCBkaXNwbGF5TmFtZSkgOiB2b2lkIDA7XG4gICAgfVxuICB9O1xuICB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYuaXNSZWFjdFdhcm5pbmcgPSB0cnVlO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdyZWYnLCB7XG4gICAgZ2V0OiB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG4vKipcbiAqIEZhY3RvcnkgbWV0aG9kIHRvIGNyZWF0ZSBhIG5ldyBSZWFjdCBlbGVtZW50LiBUaGlzIG5vIGxvbmdlciBhZGhlcmVzIHRvXG4gKiB0aGUgY2xhc3MgcGF0dGVybiwgc28gZG8gbm90IHVzZSBuZXcgdG8gY2FsbCBpdC4gQWxzbywgbm8gaW5zdGFuY2VvZiBjaGVja1xuICogd2lsbCB3b3JrLiBJbnN0ZWFkIHRlc3QgJCR0eXBlb2YgZmllbGQgYWdhaW5zdCBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgdG8gY2hlY2tcbiAqIGlmIHNvbWV0aGluZyBpcyBhIFJlYWN0IEVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHsqfSB0eXBlXG4gKiBAcGFyYW0geyp9IGtleVxuICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSByZWZcbiAqIEBwYXJhbSB7Kn0gc2VsZiBBICp0ZW1wb3JhcnkqIGhlbHBlciB0byBkZXRlY3QgcGxhY2VzIHdoZXJlIGB0aGlzYCBpc1xuICogZGlmZmVyZW50IGZyb20gdGhlIGBvd25lcmAgd2hlbiBSZWFjdC5jcmVhdGVFbGVtZW50IGlzIGNhbGxlZCwgc28gdGhhdCB3ZVxuICogY2FuIHdhcm4uIFdlIHdhbnQgdG8gZ2V0IHJpZCBvZiBvd25lciBhbmQgcmVwbGFjZSBzdHJpbmcgYHJlZmBzIHdpdGggYXJyb3dcbiAqIGZ1bmN0aW9ucywgYW5kIGFzIGxvbmcgYXMgYHRoaXNgIGFuZCBvd25lciBhcmUgdGhlIHNhbWUsIHRoZXJlIHdpbGwgYmUgbm9cbiAqIGNoYW5nZSBpbiBiZWhhdmlvci5cbiAqIEBwYXJhbSB7Kn0gc291cmNlIEFuIGFubm90YXRpb24gb2JqZWN0IChhZGRlZCBieSBhIHRyYW5zcGlsZXIgb3Igb3RoZXJ3aXNlKVxuICogaW5kaWNhdGluZyBmaWxlbmFtZSwgbGluZSBudW1iZXIsIGFuZC9vciBvdGhlciBpbmZvcm1hdGlvbi5cbiAqIEBwYXJhbSB7Kn0gb3duZXJcbiAqIEBwYXJhbSB7Kn0gcHJvcHNcbiAqIEBpbnRlcm5hbFxuICovXG52YXIgUmVhY3RFbGVtZW50ID0gZnVuY3Rpb24gKHR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIG93bmVyLCBwcm9wcykge1xuICB2YXIgZWxlbWVudCA9IHtcbiAgICAvLyBUaGlzIHRhZyBhbGxvdyB1cyB0byB1bmlxdWVseSBpZGVudGlmeSB0aGlzIGFzIGEgUmVhY3QgRWxlbWVudFxuICAgICQkdHlwZW9mOiBSRUFDVF9FTEVNRU5UX1RZUEUsXG5cbiAgICAvLyBCdWlsdC1pbiBwcm9wZXJ0aWVzIHRoYXQgYmVsb25nIG9uIHRoZSBlbGVtZW50XG4gICAgdHlwZTogdHlwZSxcbiAgICBrZXk6IGtleSxcbiAgICByZWY6IHJlZixcbiAgICBwcm9wczogcHJvcHMsXG5cbiAgICAvLyBSZWNvcmQgdGhlIGNvbXBvbmVudCByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgdGhpcyBlbGVtZW50LlxuICAgIF9vd25lcjogb3duZXJcbiAgfTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIC8vIFRoZSB2YWxpZGF0aW9uIGZsYWcgaXMgY3VycmVudGx5IG11dGF0aXZlLiBXZSBwdXQgaXQgb25cbiAgICAvLyBhbiBleHRlcm5hbCBiYWNraW5nIHN0b3JlIHNvIHRoYXQgd2UgY2FuIGZyZWV6ZSB0aGUgd2hvbGUgb2JqZWN0LlxuICAgIC8vIFRoaXMgY2FuIGJlIHJlcGxhY2VkIHdpdGggYSBXZWFrTWFwIG9uY2UgdGhleSBhcmUgaW1wbGVtZW50ZWQgaW5cbiAgICAvLyBjb21tb25seSB1c2VkIGRldmVsb3BtZW50IGVudmlyb25tZW50cy5cbiAgICBlbGVtZW50Ll9zdG9yZSA9IHt9O1xuXG4gICAgLy8gVG8gbWFrZSBjb21wYXJpbmcgUmVhY3RFbGVtZW50cyBlYXNpZXIgZm9yIHRlc3RpbmcgcHVycG9zZXMsIHdlIG1ha2VcbiAgICAvLyB0aGUgdmFsaWRhdGlvbiBmbGFnIG5vbi1lbnVtZXJhYmxlICh3aGVyZSBwb3NzaWJsZSwgd2hpY2ggc2hvdWxkXG4gICAgLy8gaW5jbHVkZSBldmVyeSBlbnZpcm9ubWVudCB3ZSBydW4gdGVzdHMgaW4pLCBzbyB0aGUgdGVzdCBmcmFtZXdvcmtcbiAgICAvLyBpZ25vcmVzIGl0LlxuICAgIGlmIChjYW5EZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQuX3N0b3JlLCAndmFsaWRhdGVkJywge1xuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICAvLyBzZWxmIGFuZCBzb3VyY2UgYXJlIERFViBvbmx5IHByb3BlcnRpZXMuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudCwgJ19zZWxmJywge1xuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogc2VsZlxuICAgICAgfSk7XG4gICAgICAvLyBUd28gZWxlbWVudHMgY3JlYXRlZCBpbiB0d28gZGlmZmVyZW50IHBsYWNlcyBzaG91bGQgYmUgY29uc2lkZXJlZFxuICAgICAgLy8gZXF1YWwgZm9yIHRlc3RpbmcgcHVycG9zZXMgYW5kIHRoZXJlZm9yZSB3ZSBoaWRlIGl0IGZyb20gZW51bWVyYXRpb24uXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudCwgJ19zb3VyY2UnLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiBzb3VyY2VcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50Ll9zdG9yZS52YWxpZGF0ZWQgPSBmYWxzZTtcbiAgICAgIGVsZW1lbnQuX3NlbGYgPSBzZWxmO1xuICAgICAgZWxlbWVudC5fc291cmNlID0gc291cmNlO1xuICAgIH1cbiAgICBpZiAoT2JqZWN0LmZyZWV6ZSkge1xuICAgICAgT2JqZWN0LmZyZWV6ZShlbGVtZW50LnByb3BzKTtcbiAgICAgIE9iamVjdC5mcmVlemUoZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbmQgcmV0dXJuIGEgbmV3IFJlYWN0RWxlbWVudCBvZiB0aGUgZ2l2ZW4gdHlwZS5cbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jcmVhdGVlbGVtZW50XG4gKi9cblJlYWN0RWxlbWVudC5jcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gKHR5cGUsIGNvbmZpZywgY2hpbGRyZW4pIHtcbiAgdmFyIHByb3BOYW1lO1xuXG4gIC8vIFJlc2VydmVkIG5hbWVzIGFyZSBleHRyYWN0ZWRcbiAgdmFyIHByb3BzID0ge307XG5cbiAgdmFyIGtleSA9IG51bGw7XG4gIHZhciByZWYgPSBudWxsO1xuICB2YXIgc2VsZiA9IG51bGw7XG4gIHZhciBzb3VyY2UgPSBudWxsO1xuXG4gIGlmIChjb25maWcgIT0gbnVsbCkge1xuICAgIGlmIChoYXNWYWxpZFJlZihjb25maWcpKSB7XG4gICAgICByZWYgPSBjb25maWcucmVmO1xuICAgIH1cbiAgICBpZiAoaGFzVmFsaWRLZXkoY29uZmlnKSkge1xuICAgICAga2V5ID0gJycgKyBjb25maWcua2V5O1xuICAgIH1cblxuICAgIHNlbGYgPSBjb25maWcuX19zZWxmID09PSB1bmRlZmluZWQgPyBudWxsIDogY29uZmlnLl9fc2VsZjtcbiAgICBzb3VyY2UgPSBjb25maWcuX19zb3VyY2UgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb25maWcuX19zb3VyY2U7XG4gICAgLy8gUmVtYWluaW5nIHByb3BlcnRpZXMgYXJlIGFkZGVkIHRvIGEgbmV3IHByb3BzIG9iamVjdFxuICAgIGZvciAocHJvcE5hbWUgaW4gY29uZmlnKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsIHByb3BOYW1lKSAmJiAhUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ2hpbGRyZW4gY2FuIGJlIG1vcmUgdGhhbiBvbmUgYXJndW1lbnQsIGFuZCB0aG9zZSBhcmUgdHJhbnNmZXJyZWQgb250b1xuICAvLyB0aGUgbmV3bHkgYWxsb2NhdGVkIHByb3BzIG9iamVjdC5cbiAgdmFyIGNoaWxkcmVuTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCAtIDI7XG4gIGlmIChjaGlsZHJlbkxlbmd0aCA9PT0gMSkge1xuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gIH0gZWxzZSBpZiAoY2hpbGRyZW5MZW5ndGggPiAxKSB7XG4gICAgdmFyIGNoaWxkQXJyYXkgPSBBcnJheShjaGlsZHJlbkxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZEFycmF5W2ldID0gYXJndW1lbnRzW2kgKyAyXTtcbiAgICB9XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmIChPYmplY3QuZnJlZXplKSB7XG4gICAgICAgIE9iamVjdC5mcmVlemUoY2hpbGRBcnJheSk7XG4gICAgICB9XG4gICAgfVxuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgfVxuXG4gIC8vIFJlc29sdmUgZGVmYXVsdCBwcm9wc1xuICBpZiAodHlwZSAmJiB0eXBlLmRlZmF1bHRQcm9wcykge1xuICAgIHZhciBkZWZhdWx0UHJvcHMgPSB0eXBlLmRlZmF1bHRQcm9wcztcbiAgICBmb3IgKHByb3BOYW1lIGluIGRlZmF1bHRQcm9wcykge1xuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGRlZmF1bHRQcm9wc1twcm9wTmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGtleSB8fCByZWYpIHtcbiAgICAgIGlmICh0eXBlb2YgcHJvcHMuJCR0eXBlb2YgPT09ICd1bmRlZmluZWQnIHx8IHByb3BzLiQkdHlwZW9mICE9PSBSRUFDVF9FTEVNRU5UX1RZUEUpIHtcbiAgICAgICAgdmFyIGRpc3BsYXlOYW1lID0gdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgPyB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSB8fCAnVW5rbm93bicgOiB0eXBlO1xuICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgZGVmaW5lS2V5UHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVmKSB7XG4gICAgICAgICAgZGVmaW5lUmVmUHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gUmVhY3RFbGVtZW50KHR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQsIHByb3BzKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgZnVuY3Rpb24gdGhhdCBwcm9kdWNlcyBSZWFjdEVsZW1lbnRzIG9mIGEgZ2l2ZW4gdHlwZS5cbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jcmVhdGVmYWN0b3J5XG4gKi9cblJlYWN0RWxlbWVudC5jcmVhdGVGYWN0b3J5ID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgdmFyIGZhY3RvcnkgPSBSZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudC5iaW5kKG51bGwsIHR5cGUpO1xuICAvLyBFeHBvc2UgdGhlIHR5cGUgb24gdGhlIGZhY3RvcnkgYW5kIHRoZSBwcm90b3R5cGUgc28gdGhhdCBpdCBjYW4gYmVcbiAgLy8gZWFzaWx5IGFjY2Vzc2VkIG9uIGVsZW1lbnRzLiBFLmcuIGA8Rm9vIC8+LnR5cGUgPT09IEZvb2AuXG4gIC8vIFRoaXMgc2hvdWxkIG5vdCBiZSBuYW1lZCBgY29uc3RydWN0b3JgIHNpbmNlIHRoaXMgbWF5IG5vdCBiZSB0aGUgZnVuY3Rpb25cbiAgLy8gdGhhdCBjcmVhdGVkIHRoZSBlbGVtZW50LCBhbmQgaXQgbWF5IG5vdCBldmVuIGJlIGEgY29uc3RydWN0b3IuXG4gIC8vIExlZ2FjeSBob29rIFRPRE86IFdhcm4gaWYgdGhpcyBpcyBhY2Nlc3NlZFxuICBmYWN0b3J5LnR5cGUgPSB0eXBlO1xuICByZXR1cm4gZmFjdG9yeTtcbn07XG5cblJlYWN0RWxlbWVudC5jbG9uZUFuZFJlcGxhY2VLZXkgPSBmdW5jdGlvbiAob2xkRWxlbWVudCwgbmV3S2V5KSB7XG4gIHZhciBuZXdFbGVtZW50ID0gUmVhY3RFbGVtZW50KG9sZEVsZW1lbnQudHlwZSwgbmV3S2V5LCBvbGRFbGVtZW50LnJlZiwgb2xkRWxlbWVudC5fc2VsZiwgb2xkRWxlbWVudC5fc291cmNlLCBvbGRFbGVtZW50Ll9vd25lciwgb2xkRWxlbWVudC5wcm9wcyk7XG5cbiAgcmV0dXJuIG5ld0VsZW1lbnQ7XG59O1xuXG4vKipcbiAqIENsb25lIGFuZCByZXR1cm4gYSBuZXcgUmVhY3RFbGVtZW50IHVzaW5nIGVsZW1lbnQgYXMgdGhlIHN0YXJ0aW5nIHBvaW50LlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNsb25lZWxlbWVudFxuICovXG5SZWFjdEVsZW1lbnQuY2xvbmVFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQsIGNvbmZpZywgY2hpbGRyZW4pIHtcbiAgdmFyIHByb3BOYW1lO1xuXG4gIC8vIE9yaWdpbmFsIHByb3BzIGFyZSBjb3BpZWRcbiAgdmFyIHByb3BzID0gX2Fzc2lnbih7fSwgZWxlbWVudC5wcm9wcyk7XG5cbiAgLy8gUmVzZXJ2ZWQgbmFtZXMgYXJlIGV4dHJhY3RlZFxuICB2YXIga2V5ID0gZWxlbWVudC5rZXk7XG4gIHZhciByZWYgPSBlbGVtZW50LnJlZjtcbiAgLy8gU2VsZiBpcyBwcmVzZXJ2ZWQgc2luY2UgdGhlIG93bmVyIGlzIHByZXNlcnZlZC5cbiAgdmFyIHNlbGYgPSBlbGVtZW50Ll9zZWxmO1xuICAvLyBTb3VyY2UgaXMgcHJlc2VydmVkIHNpbmNlIGNsb25lRWxlbWVudCBpcyB1bmxpa2VseSB0byBiZSB0YXJnZXRlZCBieSBhXG4gIC8vIHRyYW5zcGlsZXIsIGFuZCB0aGUgb3JpZ2luYWwgc291cmNlIGlzIHByb2JhYmx5IGEgYmV0dGVyIGluZGljYXRvciBvZiB0aGVcbiAgLy8gdHJ1ZSBvd25lci5cbiAgdmFyIHNvdXJjZSA9IGVsZW1lbnQuX3NvdXJjZTtcblxuICAvLyBPd25lciB3aWxsIGJlIHByZXNlcnZlZCwgdW5sZXNzIHJlZiBpcyBvdmVycmlkZGVuXG4gIHZhciBvd25lciA9IGVsZW1lbnQuX293bmVyO1xuXG4gIGlmIChjb25maWcgIT0gbnVsbCkge1xuICAgIGlmIChoYXNWYWxpZFJlZihjb25maWcpKSB7XG4gICAgICAvLyBTaWxlbnRseSBzdGVhbCB0aGUgcmVmIGZyb20gdGhlIHBhcmVudC5cbiAgICAgIHJlZiA9IGNvbmZpZy5yZWY7XG4gICAgICBvd25lciA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQ7XG4gICAgfVxuICAgIGlmIChoYXNWYWxpZEtleShjb25maWcpKSB7XG4gICAgICBrZXkgPSAnJyArIGNvbmZpZy5rZXk7XG4gICAgfVxuXG4gICAgLy8gUmVtYWluaW5nIHByb3BlcnRpZXMgb3ZlcnJpZGUgZXhpc3RpbmcgcHJvcHNcbiAgICB2YXIgZGVmYXVsdFByb3BzO1xuICAgIGlmIChlbGVtZW50LnR5cGUgJiYgZWxlbWVudC50eXBlLmRlZmF1bHRQcm9wcykge1xuICAgICAgZGVmYXVsdFByb3BzID0gZWxlbWVudC50eXBlLmRlZmF1bHRQcm9wcztcbiAgICB9XG4gICAgZm9yIChwcm9wTmFtZSBpbiBjb25maWcpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgcHJvcE5hbWUpICYmICFSRVNFUlZFRF9QUk9QUy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgaWYgKGNvbmZpZ1twcm9wTmFtZV0gPT09IHVuZGVmaW5lZCAmJiBkZWZhdWx0UHJvcHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIFJlc29sdmUgZGVmYXVsdCBwcm9wc1xuICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGRlZmF1bHRQcm9wc1twcm9wTmFtZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gY29uZmlnW3Byb3BOYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENoaWxkcmVuIGNhbiBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBhbmQgdGhvc2UgYXJlIHRyYW5zZmVycmVkIG9udG9cbiAgLy8gdGhlIG5ld2x5IGFsbG9jYXRlZCBwcm9wcyBvYmplY3QuXG4gIHZhciBjaGlsZHJlbkxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAyO1xuICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgfVxuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgfVxuXG4gIHJldHVybiBSZWFjdEVsZW1lbnQoZWxlbWVudC50eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBvd25lciwgcHJvcHMpO1xufTtcblxuLyoqXG4gKiBWZXJpZmllcyB0aGUgb2JqZWN0IGlzIGEgUmVhY3RFbGVtZW50LlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmlzdmFsaWRlbGVtZW50XG4gKiBAcGFyYW0gez9vYmplY3R9IG9iamVjdFxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBgb2JqZWN0YCBpcyBhIHZhbGlkIGNvbXBvbmVudC5cbiAqIEBmaW5hbFxuICovXG5SZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwgJiYgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RWxlbWVudDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3QvbGliL1JlYWN0RWxlbWVudC5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogV0FSTklORzogRE8gTk9UIG1hbnVhbGx5IHJlcXVpcmUgdGhpcyBtb2R1bGUuXG4gKiBUaGlzIGlzIGEgcmVwbGFjZW1lbnQgZm9yIGBpbnZhcmlhbnQoLi4uKWAgdXNlZCBieSB0aGUgZXJyb3IgY29kZSBzeXN0ZW1cbiAqIGFuZCB3aWxsIF9vbmx5XyBiZSByZXF1aXJlZCBieSB0aGUgY29ycmVzcG9uZGluZyBiYWJlbCBwYXNzLlxuICogSXQgYWx3YXlzIHRocm93cy5cbiAqL1xuXG5mdW5jdGlvbiByZWFjdFByb2RJbnZhcmlhbnQoY29kZSkge1xuICB2YXIgYXJnQ291bnQgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcblxuICB2YXIgbWVzc2FnZSA9ICdNaW5pZmllZCBSZWFjdCBlcnJvciAjJyArIGNvZGUgKyAnOyB2aXNpdCAnICsgJ2h0dHA6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy9lcnJvci1kZWNvZGVyLmh0bWw/aW52YXJpYW50PScgKyBjb2RlO1xuXG4gIGZvciAodmFyIGFyZ0lkeCA9IDA7IGFyZ0lkeCA8IGFyZ0NvdW50OyBhcmdJZHgrKykge1xuICAgIG1lc3NhZ2UgKz0gJyZhcmdzW109JyArIGVuY29kZVVSSUNvbXBvbmVudChhcmd1bWVudHNbYXJnSWR4ICsgMV0pO1xuICB9XG5cbiAgbWVzc2FnZSArPSAnIGZvciB0aGUgZnVsbCBtZXNzYWdlIG9yIHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCcgKyAnIGZvciBmdWxsIGVycm9ycyBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLic7XG5cbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgcmVhY3RQcm9kSW52YXJpYW50J3Mgb3duIGZyYW1lXG5cbiAgdGhyb3cgZXJyb3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVhY3RQcm9kSW52YXJpYW50O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC9saWIvcmVhY3RQcm9kSW52YXJpYW50LmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L29iamVjdC1hc3NpZ24vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBLZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudCBvd25lci5cbiAqXG4gKiBUaGUgY3VycmVudCBvd25lciBpcyB0aGUgY29tcG9uZW50IHdobyBzaG91bGQgb3duIGFueSBjb21wb25lbnRzIHRoYXQgYXJlXG4gKiBjdXJyZW50bHkgYmVpbmcgY29uc3RydWN0ZWQuXG4gKi9cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHtcblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqIEB0eXBlIHtSZWFjdENvbXBvbmVudH1cbiAgICovXG4gIGN1cnJlbnQ6IG51bGxcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEN1cnJlbnRPd25lcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3QvbGliL1JlYWN0Q3VycmVudE93bmVyLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IGZhbHNlO1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdHJ5IHtcbiAgICAvLyAkRmxvd0ZpeE1lIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9mbG93L2lzc3Vlcy8yODVcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICd4JywgeyBnZXQ6IGZ1bmN0aW9uICgpIHt9IH0pO1xuICAgIGNhbkRlZmluZVByb3BlcnR5ID0gdHJ1ZTtcbiAgfSBjYXRjaCAoeCkge1xuICAgIC8vIElFIHdpbGwgZmFpbCBvbiBkZWZpbmVQcm9wZXJ0eVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FuRGVmaW5lUHJvcGVydHk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0L2xpYi9jYW5EZWZpbmVQcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG5mdW5jdGlvbiBtYWtlRW1wdHlGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYXJnO1xuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gYWNjZXB0cyBhbmQgZGlzY2FyZHMgaW5wdXRzOyBpdCBoYXMgbm8gc2lkZSBlZmZlY3RzLiBUaGlzIGlzXG4gKiBwcmltYXJpbHkgdXNlZnVsIGlkaW9tYXRpY2FsbHkgZm9yIG92ZXJyaWRhYmxlIGZ1bmN0aW9uIGVuZHBvaW50cyB3aGljaFxuICogYWx3YXlzIG5lZWQgdG8gYmUgY2FsbGFibGUsIHNpbmNlIEpTIGxhY2tzIGEgbnVsbC1jYWxsIGlkaW9tIGFsYSBDb2NvYS5cbiAqL1xudmFyIGVtcHR5RnVuY3Rpb24gPSBmdW5jdGlvbiBlbXB0eUZ1bmN0aW9uKCkge307XG5cbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnMgPSBtYWtlRW1wdHlGdW5jdGlvbjtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNGYWxzZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKGZhbHNlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUcnVlID0gbWFrZUVtcHR5RnVuY3Rpb24odHJ1ZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbCA9IG1ha2VFbXB0eUZ1bmN0aW9uKG51bGwpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RoaXMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzO1xufTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgcmV0dXJuIGFyZztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZW1wdHlGdW5jdGlvbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZmJqcy9saWIvZW1wdHlGdW5jdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eU9iamVjdCA9IHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBPYmplY3QuZnJlZXplKGVtcHR5T2JqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlbXB0eU9iamVjdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZmJqcy9saWIvZW1wdHlPYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IHJlcXVpcmUoJy4vcmVhY3RQcm9kSW52YXJpYW50Jyk7XG5cbnZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IHJlcXVpcmUoJy4vUmVhY3ROb29wVXBkYXRlUXVldWUnKTtcblxudmFyIGNhbkRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9jYW5EZWZpbmVQcm9wZXJ0eScpO1xudmFyIGVtcHR5T2JqZWN0ID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlPYmplY3QnKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgaGVscGVycyBmb3IgdGhlIHVwZGF0aW5nIHN0YXRlIG9mIGEgY29tcG9uZW50LlxuICovXG5mdW5jdGlvbiBSZWFjdENvbXBvbmVudChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICB0aGlzLnByb3BzID0gcHJvcHM7XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAvLyBXZSBpbml0aWFsaXplIHRoZSBkZWZhdWx0IHVwZGF0ZXIgYnV0IHRoZSByZWFsIG9uZSBnZXRzIGluamVjdGVkIGJ5IHRoZVxuICAvLyByZW5kZXJlci5cbiAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcbn1cblxuUmVhY3RDb21wb25lbnQucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQgPSB7fTtcblxuLyoqXG4gKiBTZXRzIGEgc3Vic2V0IG9mIHRoZSBzdGF0ZS4gQWx3YXlzIHVzZSB0aGlzIHRvIG11dGF0ZVxuICogc3RhdGUuIFlvdSBzaG91bGQgdHJlYXQgYHRoaXMuc3RhdGVgIGFzIGltbXV0YWJsZS5cbiAqXG4gKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBgdGhpcy5zdGF0ZWAgd2lsbCBiZSBpbW1lZGlhdGVseSB1cGRhdGVkLCBzb1xuICogYWNjZXNzaW5nIGB0aGlzLnN0YXRlYCBhZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kIG1heSByZXR1cm4gdGhlIG9sZCB2YWx1ZS5cbiAqXG4gKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBjYWxscyB0byBgc2V0U3RhdGVgIHdpbGwgcnVuIHN5bmNocm9ub3VzbHksXG4gKiBhcyB0aGV5IG1heSBldmVudHVhbGx5IGJlIGJhdGNoZWQgdG9nZXRoZXIuICBZb3UgY2FuIHByb3ZpZGUgYW4gb3B0aW9uYWxcbiAqIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBleGVjdXRlZCB3aGVuIHRoZSBjYWxsIHRvIHNldFN0YXRlIGlzIGFjdHVhbGx5XG4gKiBjb21wbGV0ZWQuXG4gKlxuICogV2hlbiBhIGZ1bmN0aW9uIGlzIHByb3ZpZGVkIHRvIHNldFN0YXRlLCBpdCB3aWxsIGJlIGNhbGxlZCBhdCBzb21lIHBvaW50IGluXG4gKiB0aGUgZnV0dXJlIChub3Qgc3luY2hyb25vdXNseSkuIEl0IHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIHVwIHRvIGRhdGVcbiAqIGNvbXBvbmVudCBhcmd1bWVudHMgKHN0YXRlLCBwcm9wcywgY29udGV4dCkuIFRoZXNlIHZhbHVlcyBjYW4gYmUgZGlmZmVyZW50XG4gKiBmcm9tIHRoaXMuKiBiZWNhdXNlIHlvdXIgZnVuY3Rpb24gbWF5IGJlIGNhbGxlZCBhZnRlciByZWNlaXZlUHJvcHMgYnV0IGJlZm9yZVxuICogc2hvdWxkQ29tcG9uZW50VXBkYXRlLCBhbmQgdGhpcyBuZXcgc3RhdGUsIHByb3BzLCBhbmQgY29udGV4dCB3aWxsIG5vdCB5ZXQgYmVcbiAqIGFzc2lnbmVkIHRvIHRoaXMuXG4gKlxuICogQHBhcmFtIHtvYmplY3R8ZnVuY3Rpb259IHBhcnRpYWxTdGF0ZSBOZXh0IHBhcnRpYWwgc3RhdGUgb3IgZnVuY3Rpb24gdG9cbiAqICAgICAgICBwcm9kdWNlIG5leHQgcGFydGlhbCBzdGF0ZSB0byBiZSBtZXJnZWQgd2l0aCBjdXJyZW50IHN0YXRlLlxuICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBzdGF0ZSBpcyB1cGRhdGVkLlxuICogQGZpbmFsXG4gKiBAcHJvdGVjdGVkXG4gKi9cblJlYWN0Q29tcG9uZW50LnByb3RvdHlwZS5zZXRTdGF0ZSA9IGZ1bmN0aW9uIChwYXJ0aWFsU3RhdGUsIGNhbGxiYWNrKSB7XG4gICEodHlwZW9mIHBhcnRpYWxTdGF0ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHBhcnRpYWxTdGF0ZSA9PT0gJ2Z1bmN0aW9uJyB8fCBwYXJ0aWFsU3RhdGUgPT0gbnVsbCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnc2V0U3RhdGUoLi4uKTogdGFrZXMgYW4gb2JqZWN0IG9mIHN0YXRlIHZhcmlhYmxlcyB0byB1cGRhdGUgb3IgYSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFuIG9iamVjdCBvZiBzdGF0ZSB2YXJpYWJsZXMuJykgOiBfcHJvZEludmFyaWFudCgnODUnKSA6IHZvaWQgMDtcbiAgdGhpcy51cGRhdGVyLmVucXVldWVTZXRTdGF0ZSh0aGlzLCBwYXJ0aWFsU3RhdGUpO1xuICBpZiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUNhbGxiYWNrKHRoaXMsIGNhbGxiYWNrLCAnc2V0U3RhdGUnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gKiBjZXJ0YWludHkgdGhhdCB3ZSBhcmUgKipub3QqKiBpbiBhIERPTSB0cmFuc2FjdGlvbi5cbiAqXG4gKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gKiBjb21wb25lbnQncyBzdGF0ZSBoYXMgY2hhbmdlZCBidXQgYHNldFN0YXRlYCB3YXMgbm90IGNhbGxlZC5cbiAqXG4gKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gKiBgY29tcG9uZW50V2lsbFVwZGF0ZWAgYW5kIGBjb21wb25lbnREaWRVcGRhdGVgLlxuICpcbiAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgdXBkYXRlIGlzIGNvbXBsZXRlLlxuICogQGZpbmFsXG4gKiBAcHJvdGVjdGVkXG4gKi9cblJlYWN0Q29tcG9uZW50LnByb3RvdHlwZS5mb3JjZVVwZGF0ZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUZvcmNlVXBkYXRlKHRoaXMpO1xuICBpZiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUNhbGxiYWNrKHRoaXMsIGNhbGxiYWNrLCAnZm9yY2VVcGRhdGUnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBEZXByZWNhdGVkIEFQSXMuIFRoZXNlIEFQSXMgdXNlZCB0byBleGlzdCBvbiBjbGFzc2ljIFJlYWN0IGNsYXNzZXMgYnV0IHNpbmNlXG4gKiB3ZSB3b3VsZCBsaWtlIHRvIGRlcHJlY2F0ZSB0aGVtLCB3ZSdyZSBub3QgZ29pbmcgdG8gbW92ZSB0aGVtIG92ZXIgdG8gdGhpc1xuICogbW9kZXJuIGJhc2UgY2xhc3MuIEluc3RlYWQsIHdlIGRlZmluZSBhIGdldHRlciB0aGF0IHdhcm5zIGlmIGl0J3MgYWNjZXNzZWQuXG4gKi9cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBkZXByZWNhdGVkQVBJcyA9IHtcbiAgICBpc01vdW50ZWQ6IFsnaXNNb3VudGVkJywgJ0luc3RlYWQsIG1ha2Ugc3VyZSB0byBjbGVhbiB1cCBzdWJzY3JpcHRpb25zIGFuZCBwZW5kaW5nIHJlcXVlc3RzIGluICcgKyAnY29tcG9uZW50V2lsbFVubW91bnQgdG8gcHJldmVudCBtZW1vcnkgbGVha3MuJ10sXG4gICAgcmVwbGFjZVN0YXRlOiBbJ3JlcGxhY2VTdGF0ZScsICdSZWZhY3RvciB5b3VyIGNvZGUgdG8gdXNlIHNldFN0YXRlIGluc3RlYWQgKHNlZSAnICsgJ2h0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMzIzNikuJ11cbiAgfTtcbiAgdmFyIGRlZmluZURlcHJlY2F0aW9uV2FybmluZyA9IGZ1bmN0aW9uIChtZXRob2ROYW1lLCBpbmZvKSB7XG4gICAgaWYgKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhY3RDb21wb25lbnQucHJvdG90eXBlLCBtZXRob2ROYW1lLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXMoLi4uKSBpcyBkZXByZWNhdGVkIGluIHBsYWluIEphdmFTY3JpcHQgUmVhY3QgY2xhc3Nlcy4gJXMnLCBpbmZvWzBdLCBpbmZvWzFdKSA6IHZvaWQgMDtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIGZvciAodmFyIGZuTmFtZSBpbiBkZXByZWNhdGVkQVBJcykge1xuICAgIGlmIChkZXByZWNhdGVkQVBJcy5oYXNPd25Qcm9wZXJ0eShmbk5hbWUpKSB7XG4gICAgICBkZWZpbmVEZXByZWNhdGlvbldhcm5pbmcoZm5OYW1lLCBkZXByZWNhdGVkQVBJc1tmbk5hbWVdKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdENvbXBvbmVudDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3QvbGliL1JlYWN0Q29tcG9uZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IHJlcXVpcmUoJy4vcmVhY3RQcm9kSW52YXJpYW50Jyk7XG5cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHJlcXVpcmUoJy4vUmVhY3RDdXJyZW50T3duZXInKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbmZ1bmN0aW9uIGlzTmF0aXZlKGZuKSB7XG4gIC8vIEJhc2VkIG9uIGlzTmF0aXZlKCkgZnJvbSBMb2Rhc2hcbiAgdmFyIGZ1bmNUb1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcbiAgdmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICsgZnVuY1RvU3RyaW5nXG4gIC8vIFRha2UgYW4gZXhhbXBsZSBuYXRpdmUgZnVuY3Rpb24gc291cmNlIGZvciBjb21wYXJpc29uXG4gIC5jYWxsKGhhc093blByb3BlcnR5KVxuICAvLyBTdHJpcCByZWdleCBjaGFyYWN0ZXJzIHNvIHdlIGNhbiB1c2UgaXQgZm9yIHJlZ2V4XG4gIC5yZXBsYWNlKC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZywgJ1xcXFwkJicpXG4gIC8vIFJlbW92ZSBoYXNPd25Qcm9wZXJ0eSBmcm9tIHRoZSB0ZW1wbGF0ZSB0byBtYWtlIGl0IGdlbmVyaWNcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnKTtcbiAgdHJ5IHtcbiAgICB2YXIgc291cmNlID0gZnVuY1RvU3RyaW5nLmNhbGwoZm4pO1xuICAgIHJldHVybiByZUlzTmF0aXZlLnRlc3Qoc291cmNlKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbnZhciBjYW5Vc2VDb2xsZWN0aW9ucyA9XG4vLyBBcnJheS5mcm9tXG50eXBlb2YgQXJyYXkuZnJvbSA9PT0gJ2Z1bmN0aW9uJyAmJlxuLy8gTWFwXG50eXBlb2YgTWFwID09PSAnZnVuY3Rpb24nICYmIGlzTmF0aXZlKE1hcCkgJiZcbi8vIE1hcC5wcm90b3R5cGUua2V5c1xuTWFwLnByb3RvdHlwZSAhPSBudWxsICYmIHR5cGVvZiBNYXAucHJvdG90eXBlLmtleXMgPT09ICdmdW5jdGlvbicgJiYgaXNOYXRpdmUoTWFwLnByb3RvdHlwZS5rZXlzKSAmJlxuLy8gU2V0XG50eXBlb2YgU2V0ID09PSAnZnVuY3Rpb24nICYmIGlzTmF0aXZlKFNldCkgJiZcbi8vIFNldC5wcm90b3R5cGUua2V5c1xuU2V0LnByb3RvdHlwZSAhPSBudWxsICYmIHR5cGVvZiBTZXQucHJvdG90eXBlLmtleXMgPT09ICdmdW5jdGlvbicgJiYgaXNOYXRpdmUoU2V0LnByb3RvdHlwZS5rZXlzKTtcblxudmFyIHNldEl0ZW07XG52YXIgZ2V0SXRlbTtcbnZhciByZW1vdmVJdGVtO1xudmFyIGdldEl0ZW1JRHM7XG52YXIgYWRkUm9vdDtcbnZhciByZW1vdmVSb290O1xudmFyIGdldFJvb3RJRHM7XG5cbmlmIChjYW5Vc2VDb2xsZWN0aW9ucykge1xuICB2YXIgaXRlbU1hcCA9IG5ldyBNYXAoKTtcbiAgdmFyIHJvb3RJRFNldCA9IG5ldyBTZXQoKTtcblxuICBzZXRJdGVtID0gZnVuY3Rpb24gKGlkLCBpdGVtKSB7XG4gICAgaXRlbU1hcC5zZXQoaWQsIGl0ZW0pO1xuICB9O1xuICBnZXRJdGVtID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgcmV0dXJuIGl0ZW1NYXAuZ2V0KGlkKTtcbiAgfTtcbiAgcmVtb3ZlSXRlbSA9IGZ1bmN0aW9uIChpZCkge1xuICAgIGl0ZW1NYXBbJ2RlbGV0ZSddKGlkKTtcbiAgfTtcbiAgZ2V0SXRlbUlEcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShpdGVtTWFwLmtleXMoKSk7XG4gIH07XG5cbiAgYWRkUm9vdCA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHJvb3RJRFNldC5hZGQoaWQpO1xuICB9O1xuICByZW1vdmVSb290ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgcm9vdElEU2V0WydkZWxldGUnXShpZCk7XG4gIH07XG4gIGdldFJvb3RJRHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20ocm9vdElEU2V0LmtleXMoKSk7XG4gIH07XG59IGVsc2Uge1xuICB2YXIgaXRlbUJ5S2V5ID0ge307XG4gIHZhciByb290QnlLZXkgPSB7fTtcblxuICAvLyBVc2Ugbm9uLW51bWVyaWMga2V5cyB0byBwcmV2ZW50IFY4IHBlcmZvcm1hbmNlIGlzc3VlczpcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L3B1bGwvNzIzMlxuICB2YXIgZ2V0S2V5RnJvbUlEID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgcmV0dXJuICcuJyArIGlkO1xuICB9O1xuICB2YXIgZ2V0SURGcm9tS2V5ID0gZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBwYXJzZUludChrZXkuc3Vic3RyKDEpLCAxMCk7XG4gIH07XG5cbiAgc2V0SXRlbSA9IGZ1bmN0aW9uIChpZCwgaXRlbSkge1xuICAgIHZhciBrZXkgPSBnZXRLZXlGcm9tSUQoaWQpO1xuICAgIGl0ZW1CeUtleVtrZXldID0gaXRlbTtcbiAgfTtcbiAgZ2V0SXRlbSA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBrZXkgPSBnZXRLZXlGcm9tSUQoaWQpO1xuICAgIHJldHVybiBpdGVtQnlLZXlba2V5XTtcbiAgfTtcbiAgcmVtb3ZlSXRlbSA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBrZXkgPSBnZXRLZXlGcm9tSUQoaWQpO1xuICAgIGRlbGV0ZSBpdGVtQnlLZXlba2V5XTtcbiAgfTtcbiAgZ2V0SXRlbUlEcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoaXRlbUJ5S2V5KS5tYXAoZ2V0SURGcm9tS2V5KTtcbiAgfTtcblxuICBhZGRSb290ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGtleSA9IGdldEtleUZyb21JRChpZCk7XG4gICAgcm9vdEJ5S2V5W2tleV0gPSB0cnVlO1xuICB9O1xuICByZW1vdmVSb290ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGtleSA9IGdldEtleUZyb21JRChpZCk7XG4gICAgZGVsZXRlIHJvb3RCeUtleVtrZXldO1xuICB9O1xuICBnZXRSb290SURzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhyb290QnlLZXkpLm1hcChnZXRJREZyb21LZXkpO1xuICB9O1xufVxuXG52YXIgdW5tb3VudGVkSURzID0gW107XG5cbmZ1bmN0aW9uIHB1cmdlRGVlcChpZCkge1xuICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICBpZiAoaXRlbSkge1xuICAgIHZhciBjaGlsZElEcyA9IGl0ZW0uY2hpbGRJRHM7XG5cbiAgICByZW1vdmVJdGVtKGlkKTtcbiAgICBjaGlsZElEcy5mb3JFYWNoKHB1cmdlRGVlcCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVzY3JpYmVDb21wb25lbnRGcmFtZShuYW1lLCBzb3VyY2UsIG93bmVyTmFtZSkge1xuICByZXR1cm4gJ1xcbiAgICBpbiAnICsgKG5hbWUgfHwgJ1Vua25vd24nKSArIChzb3VyY2UgPyAnIChhdCAnICsgc291cmNlLmZpbGVOYW1lLnJlcGxhY2UoL14uKltcXFxcXFwvXS8sICcnKSArICc6JyArIHNvdXJjZS5saW5lTnVtYmVyICsgJyknIDogb3duZXJOYW1lID8gJyAoY3JlYXRlZCBieSAnICsgb3duZXJOYW1lICsgJyknIDogJycpO1xufVxuXG5mdW5jdGlvbiBnZXREaXNwbGF5TmFtZShlbGVtZW50KSB7XG4gIGlmIChlbGVtZW50ID09IG51bGwpIHtcbiAgICByZXR1cm4gJyNlbXB0eSc7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbGVtZW50ID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiAnI3RleHQnO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBlbGVtZW50LnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQudHlwZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWxlbWVudC50eXBlLmRpc3BsYXlOYW1lIHx8IGVsZW1lbnQudHlwZS5uYW1lIHx8ICdVbmtub3duJztcbiAgfVxufVxuXG5mdW5jdGlvbiBkZXNjcmliZUlEKGlkKSB7XG4gIHZhciBuYW1lID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXREaXNwbGF5TmFtZShpZCk7XG4gIHZhciBlbGVtZW50ID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRFbGVtZW50KGlkKTtcbiAgdmFyIG93bmVySUQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldE93bmVySUQoaWQpO1xuICB2YXIgb3duZXJOYW1lO1xuICBpZiAob3duZXJJRCkge1xuICAgIG93bmVyTmFtZSA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0RGlzcGxheU5hbWUob3duZXJJRCk7XG4gIH1cbiAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZWxlbWVudCwgJ1JlYWN0Q29tcG9uZW50VHJlZUhvb2s6IE1pc3NpbmcgUmVhY3QgZWxlbWVudCBmb3IgZGVidWdJRCAlcyB3aGVuICcgKyAnYnVpbGRpbmcgc3RhY2snLCBpZCkgOiB2b2lkIDA7XG4gIHJldHVybiBkZXNjcmliZUNvbXBvbmVudEZyYW1lKG5hbWUsIGVsZW1lbnQgJiYgZWxlbWVudC5fc291cmNlLCBvd25lck5hbWUpO1xufVxuXG52YXIgUmVhY3RDb21wb25lbnRUcmVlSG9vayA9IHtcbiAgb25TZXRDaGlsZHJlbjogZnVuY3Rpb24gKGlkLCBuZXh0Q2hpbGRJRHMpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgICFpdGVtID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0l0ZW0gbXVzdCBoYXZlIGJlZW4gc2V0JykgOiBfcHJvZEludmFyaWFudCgnMTQ0JykgOiB2b2lkIDA7XG4gICAgaXRlbS5jaGlsZElEcyA9IG5leHRDaGlsZElEcztcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmV4dENoaWxkSURzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbmV4dENoaWxkSUQgPSBuZXh0Q2hpbGRJRHNbaV07XG4gICAgICB2YXIgbmV4dENoaWxkID0gZ2V0SXRlbShuZXh0Q2hpbGRJRCk7XG4gICAgICAhbmV4dENoaWxkID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0V4cGVjdGVkIGhvb2sgZXZlbnRzIHRvIGZpcmUgZm9yIHRoZSBjaGlsZCBiZWZvcmUgaXRzIHBhcmVudCBpbmNsdWRlcyBpdCBpbiBvblNldENoaWxkcmVuKCkuJykgOiBfcHJvZEludmFyaWFudCgnMTQwJykgOiB2b2lkIDA7XG4gICAgICAhKG5leHRDaGlsZC5jaGlsZElEcyAhPSBudWxsIHx8IHR5cGVvZiBuZXh0Q2hpbGQuZWxlbWVudCAhPT0gJ29iamVjdCcgfHwgbmV4dENoaWxkLmVsZW1lbnQgPT0gbnVsbCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRXhwZWN0ZWQgb25TZXRDaGlsZHJlbigpIHRvIGZpcmUgZm9yIGEgY29udGFpbmVyIGNoaWxkIGJlZm9yZSBpdHMgcGFyZW50IGluY2x1ZGVzIGl0IGluIG9uU2V0Q2hpbGRyZW4oKS4nKSA6IF9wcm9kSW52YXJpYW50KCcxNDEnKSA6IHZvaWQgMDtcbiAgICAgICFuZXh0Q2hpbGQuaXNNb3VudGVkID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0V4cGVjdGVkIG9uTW91bnRDb21wb25lbnQoKSB0byBmaXJlIGZvciB0aGUgY2hpbGQgYmVmb3JlIGl0cyBwYXJlbnQgaW5jbHVkZXMgaXQgaW4gb25TZXRDaGlsZHJlbigpLicpIDogX3Byb2RJbnZhcmlhbnQoJzcxJykgOiB2b2lkIDA7XG4gICAgICBpZiAobmV4dENoaWxkLnBhcmVudElEID09IG51bGwpIHtcbiAgICAgICAgbmV4dENoaWxkLnBhcmVudElEID0gaWQ7XG4gICAgICAgIC8vIFRPRE86IFRoaXMgc2hvdWxkbid0IGJlIG5lY2Vzc2FyeSBidXQgbW91bnRpbmcgYSBuZXcgcm9vdCBkdXJpbmcgaW5cbiAgICAgICAgLy8gY29tcG9uZW50V2lsbE1vdW50IGN1cnJlbnRseSBjYXVzZXMgbm90LXlldC1tb3VudGVkIGNvbXBvbmVudHMgdG9cbiAgICAgICAgLy8gYmUgcHVyZ2VkIGZyb20gb3VyIHRyZWUgZGF0YSBzbyB0aGVpciBwYXJlbnQgaWQgaXMgbWlzc2luZy5cbiAgICAgIH1cbiAgICAgICEobmV4dENoaWxkLnBhcmVudElEID09PSBpZCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRXhwZWN0ZWQgb25CZWZvcmVNb3VudENvbXBvbmVudCgpIHBhcmVudCBhbmQgb25TZXRDaGlsZHJlbigpIHRvIGJlIGNvbnNpc3RlbnQgKCVzIGhhcyBwYXJlbnRzICVzIGFuZCAlcykuJywgbmV4dENoaWxkSUQsIG5leHRDaGlsZC5wYXJlbnRJRCwgaWQpIDogX3Byb2RJbnZhcmlhbnQoJzE0MicsIG5leHRDaGlsZElELCBuZXh0Q2hpbGQucGFyZW50SUQsIGlkKSA6IHZvaWQgMDtcbiAgICB9XG4gIH0sXG4gIG9uQmVmb3JlTW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uIChpZCwgZWxlbWVudCwgcGFyZW50SUQpIHtcbiAgICB2YXIgaXRlbSA9IHtcbiAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICBwYXJlbnRJRDogcGFyZW50SUQsXG4gICAgICB0ZXh0OiBudWxsLFxuICAgICAgY2hpbGRJRHM6IFtdLFxuICAgICAgaXNNb3VudGVkOiBmYWxzZSxcbiAgICAgIHVwZGF0ZUNvdW50OiAwXG4gICAgfTtcbiAgICBzZXRJdGVtKGlkLCBpdGVtKTtcbiAgfSxcbiAgb25CZWZvcmVVcGRhdGVDb21wb25lbnQ6IGZ1bmN0aW9uIChpZCwgZWxlbWVudCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgaWYgKCFpdGVtIHx8ICFpdGVtLmlzTW91bnRlZCkge1xuICAgICAgLy8gV2UgbWF5IGVuZCB1cCBoZXJlIGFzIGEgcmVzdWx0IG9mIHNldFN0YXRlKCkgaW4gY29tcG9uZW50V2lsbFVubW91bnQoKS5cbiAgICAgIC8vIEluIHRoaXMgY2FzZSwgaWdub3JlIHRoZSBlbGVtZW50LlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpdGVtLmVsZW1lbnQgPSBlbGVtZW50O1xuICB9LFxuICBvbk1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgICFpdGVtID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0l0ZW0gbXVzdCBoYXZlIGJlZW4gc2V0JykgOiBfcHJvZEludmFyaWFudCgnMTQ0JykgOiB2b2lkIDA7XG4gICAgaXRlbS5pc01vdW50ZWQgPSB0cnVlO1xuICAgIHZhciBpc1Jvb3QgPSBpdGVtLnBhcmVudElEID09PSAwO1xuICAgIGlmIChpc1Jvb3QpIHtcbiAgICAgIGFkZFJvb3QoaWQpO1xuICAgIH1cbiAgfSxcbiAgb25VcGRhdGVDb21wb25lbnQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgaWYgKCFpdGVtIHx8ICFpdGVtLmlzTW91bnRlZCkge1xuICAgICAgLy8gV2UgbWF5IGVuZCB1cCBoZXJlIGFzIGEgcmVzdWx0IG9mIHNldFN0YXRlKCkgaW4gY29tcG9uZW50V2lsbFVubW91bnQoKS5cbiAgICAgIC8vIEluIHRoaXMgY2FzZSwgaWdub3JlIHRoZSBlbGVtZW50LlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpdGVtLnVwZGF0ZUNvdW50Kys7XG4gIH0sXG4gIG9uVW5tb3VudENvbXBvbmVudDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayBpZiBpdCBleGlzdHMuXG4gICAgICAvLyBgaXRlbWAgbWlnaHQgbm90IGV4aXN0IGlmIGl0IGlzIGluc2lkZSBhbiBlcnJvciBib3VuZGFyeSwgYW5kIGEgc2libGluZ1xuICAgICAgLy8gZXJyb3IgYm91bmRhcnkgY2hpbGQgdGhyZXcgd2hpbGUgbW91bnRpbmcuIFRoZW4gdGhpcyBpbnN0YW5jZSBuZXZlclxuICAgICAgLy8gZ290IGEgY2hhbmNlIHRvIG1vdW50LCBidXQgaXQgc3RpbGwgZ2V0cyBhbiB1bm1vdW50aW5nIGV2ZW50IGR1cmluZ1xuICAgICAgLy8gdGhlIGVycm9yIGJvdW5kYXJ5IGNsZWFudXAuXG4gICAgICBpdGVtLmlzTW91bnRlZCA9IGZhbHNlO1xuICAgICAgdmFyIGlzUm9vdCA9IGl0ZW0ucGFyZW50SUQgPT09IDA7XG4gICAgICBpZiAoaXNSb290KSB7XG4gICAgICAgIHJlbW92ZVJvb3QoaWQpO1xuICAgICAgfVxuICAgIH1cbiAgICB1bm1vdW50ZWRJRHMucHVzaChpZCk7XG4gIH0sXG4gIHB1cmdlVW5tb3VudGVkQ29tcG9uZW50czogZnVuY3Rpb24gKCkge1xuICAgIGlmIChSZWFjdENvbXBvbmVudFRyZWVIb29rLl9wcmV2ZW50UHVyZ2luZykge1xuICAgICAgLy8gU2hvdWxkIG9ubHkgYmUgdXNlZCBmb3IgdGVzdGluZy5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVubW91bnRlZElEcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkID0gdW5tb3VudGVkSURzW2ldO1xuICAgICAgcHVyZ2VEZWVwKGlkKTtcbiAgICB9XG4gICAgdW5tb3VudGVkSURzLmxlbmd0aCA9IDA7XG4gIH0sXG4gIGlzTW91bnRlZDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0uaXNNb3VudGVkIDogZmFsc2U7XG4gIH0sXG4gIGdldEN1cnJlbnRTdGFja0FkZGVuZHVtOiBmdW5jdGlvbiAodG9wRWxlbWVudCkge1xuICAgIHZhciBpbmZvID0gJyc7XG4gICAgaWYgKHRvcEVsZW1lbnQpIHtcbiAgICAgIHZhciBuYW1lID0gZ2V0RGlzcGxheU5hbWUodG9wRWxlbWVudCk7XG4gICAgICB2YXIgb3duZXIgPSB0b3BFbGVtZW50Ll9vd25lcjtcbiAgICAgIGluZm8gKz0gZGVzY3JpYmVDb21wb25lbnRGcmFtZShuYW1lLCB0b3BFbGVtZW50Ll9zb3VyY2UsIG93bmVyICYmIG93bmVyLmdldE5hbWUoKSk7XG4gICAgfVxuXG4gICAgdmFyIGN1cnJlbnRPd25lciA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQ7XG4gICAgdmFyIGlkID0gY3VycmVudE93bmVyICYmIGN1cnJlbnRPd25lci5fZGVidWdJRDtcblxuICAgIGluZm8gKz0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRTdGFja0FkZGVuZHVtQnlJRChpZCk7XG4gICAgcmV0dXJuIGluZm87XG4gIH0sXG4gIGdldFN0YWNrQWRkZW5kdW1CeUlEOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaW5mbyA9ICcnO1xuICAgIHdoaWxlIChpZCkge1xuICAgICAgaW5mbyArPSBkZXNjcmliZUlEKGlkKTtcbiAgICAgIGlkID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRQYXJlbnRJRChpZCk7XG4gICAgfVxuICAgIHJldHVybiBpbmZvO1xuICB9LFxuICBnZXRDaGlsZElEczogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0uY2hpbGRJRHMgOiBbXTtcbiAgfSxcbiAgZ2V0RGlzcGxheU5hbWU6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBlbGVtZW50ID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRFbGVtZW50KGlkKTtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0RGlzcGxheU5hbWUoZWxlbWVudCk7XG4gIH0sXG4gIGdldEVsZW1lbnQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLmVsZW1lbnQgOiBudWxsO1xuICB9LFxuICBnZXRPd25lcklEOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgZWxlbWVudCA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0RWxlbWVudChpZCk7XG4gICAgaWYgKCFlbGVtZW50IHx8ICFlbGVtZW50Ll9vd25lcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50Ll9vd25lci5fZGVidWdJRDtcbiAgfSxcbiAgZ2V0UGFyZW50SUQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLnBhcmVudElEIDogbnVsbDtcbiAgfSxcbiAgZ2V0U291cmNlOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIHZhciBlbGVtZW50ID0gaXRlbSA/IGl0ZW0uZWxlbWVudCA6IG51bGw7XG4gICAgdmFyIHNvdXJjZSA9IGVsZW1lbnQgIT0gbnVsbCA/IGVsZW1lbnQuX3NvdXJjZSA6IG51bGw7XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfSxcbiAgZ2V0VGV4dDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEVsZW1lbnQoaWQpO1xuICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gJycgKyBlbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH0sXG4gIGdldFVwZGF0ZUNvdW50OiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIHJldHVybiBpdGVtID8gaXRlbS51cGRhdGVDb3VudCA6IDA7XG4gIH0sXG5cblxuICBnZXRSb290SURzOiBnZXRSb290SURzLFxuICBnZXRSZWdpc3RlcmVkSURzOiBnZXRJdGVtSURzXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2s7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0L2xpYi9SZWFjdENvbXBvbmVudFRyZWVIb29rLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIENvcHlyaWdodCAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuZnVuY3Rpb24gd2Fybk5vb3AocHVibGljSW5zdGFuY2UsIGNhbGxlck5hbWUpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB2YXIgY29uc3RydWN0b3IgPSBwdWJsaWNJbnN0YW5jZS5jb25zdHJ1Y3RvcjtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJyVzKC4uLik6IENhbiBvbmx5IHVwZGF0ZSBhIG1vdW50ZWQgb3IgbW91bnRpbmcgY29tcG9uZW50LiAnICsgJ1RoaXMgdXN1YWxseSBtZWFucyB5b3UgY2FsbGVkICVzKCkgb24gYW4gdW5tb3VudGVkIGNvbXBvbmVudC4gJyArICdUaGlzIGlzIGEgbm8tb3AuIFBsZWFzZSBjaGVjayB0aGUgY29kZSBmb3IgdGhlICVzIGNvbXBvbmVudC4nLCBjYWxsZXJOYW1lLCBjYWxsZXJOYW1lLCBjb25zdHJ1Y3RvciAmJiAoY29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgY29uc3RydWN0b3IubmFtZSkgfHwgJ1JlYWN0Q2xhc3MnKSA6IHZvaWQgMDtcbiAgfVxufVxuXG4vKipcbiAqIFRoaXMgaXMgdGhlIGFic3RyYWN0IEFQSSBmb3IgYW4gdXBkYXRlIHF1ZXVlLlxuICovXG52YXIgUmVhY3ROb29wVXBkYXRlUXVldWUgPSB7XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGNvbXBvc2l0ZSBjb21wb25lbnQgaXMgbW91bnRlZC5cbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2Ugd2Ugd2FudCB0byB0ZXN0LlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIG1vdW50ZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAgICogQHByb3RlY3RlZFxuICAgKiBAZmluYWxcbiAgICovXG4gIGlzTW91bnRlZDogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBFbnF1ZXVlIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIGFmdGVyIGFsbCB0aGUgcGVuZGluZyB1cGRhdGVzXG4gICAqIGhhdmUgcHJvY2Vzc2VkLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0byB1c2UgYXMgYHRoaXNgIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgc3RhdGUgaXMgdXBkYXRlZC5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlQ2FsbGJhY2s6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgY2FsbGJhY2spIHt9LFxuXG4gIC8qKlxuICAgKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gICAqIGNlcnRhaW50eSB0aGF0IHdlIGFyZSAqKm5vdCoqIGluIGEgRE9NIHRyYW5zYWN0aW9uLlxuICAgKlxuICAgKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gICAqIGNvbXBvbmVudCdzIHN0YXRlIGhhcyBjaGFuZ2VkIGJ1dCBgc2V0U3RhdGVgIHdhcyBub3QgY2FsbGVkLlxuICAgKlxuICAgKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gICAqIGBjb21wb25lbnRXaWxsVXBkYXRlYCBhbmQgYGNvbXBvbmVudERpZFVwZGF0ZWAuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVGb3JjZVVwZGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlKSB7XG4gICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdmb3JjZVVwZGF0ZScpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyBhbGwgb2YgdGhlIHN0YXRlLiBBbHdheXMgdXNlIHRoaXMgb3IgYHNldFN0YXRlYCB0byBtdXRhdGUgc3RhdGUuXG4gICAqIFlvdSBzaG91bGQgdHJlYXQgYHRoaXMuc3RhdGVgIGFzIGltbXV0YWJsZS5cbiAgICpcbiAgICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgYHRoaXMuc3RhdGVgIHdpbGwgYmUgaW1tZWRpYXRlbHkgdXBkYXRlZCwgc29cbiAgICogYWNjZXNzaW5nIGB0aGlzLnN0YXRlYCBhZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kIG1heSByZXR1cm4gdGhlIG9sZCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb21wbGV0ZVN0YXRlIE5leHQgc3RhdGUuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZVJlcGxhY2VTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjb21wbGV0ZVN0YXRlKSB7XG4gICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdyZXBsYWNlU3RhdGUnKTtcbiAgfSxcblxuICAvKipcbiAgICogU2V0cyBhIHN1YnNldCBvZiB0aGUgc3RhdGUuIFRoaXMgb25seSBleGlzdHMgYmVjYXVzZSBfcGVuZGluZ1N0YXRlIGlzXG4gICAqIGludGVybmFsLiBUaGlzIHByb3ZpZGVzIGEgbWVyZ2luZyBzdHJhdGVneSB0aGF0IGlzIG5vdCBhdmFpbGFibGUgdG8gZGVlcFxuICAgKiBwcm9wZXJ0aWVzIHdoaWNoIGlzIGNvbmZ1c2luZy4gVE9ETzogRXhwb3NlIHBlbmRpbmdTdGF0ZSBvciBkb24ndCB1c2UgaXRcbiAgICogZHVyaW5nIHRoZSBtZXJnZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWFsU3RhdGUgTmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIHN0YXRlLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVTZXRTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBwYXJ0aWFsU3RhdGUpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ3NldFN0YXRlJyk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3ROb29wVXBkYXRlUXVldWU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0L2xpYi9SZWFjdE5vb3BVcGRhdGVRdWV1ZS5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL1JlYWN0Jyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3QvcmVhY3QuanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9wcm9wLXR5cGVzL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldC5qc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQgdHlwZS4gSWYgdGhlcmUgaXMgbm8gbmF0aXZlIFN5bWJvbFxuLy8gbm9yIHBvbHlmaWxsLCB0aGVuIGEgcGxhaW4gbnVtYmVyIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlLlxuXG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2xbJ2ZvciddICYmIFN5bWJvbFsnZm9yJ10oJ3JlYWN0LmVsZW1lbnQnKSB8fCAweGVhYzc7XG5cbm1vZHVsZS5leHBvcnRzID0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC9saWIvUmVhY3RFbGVtZW50U3ltYm9sLmpzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuLyoqXG4gKiBSZWFjdEVsZW1lbnRWYWxpZGF0b3IgcHJvdmlkZXMgYSB3cmFwcGVyIGFyb3VuZCBhIGVsZW1lbnQgZmFjdG9yeVxuICogd2hpY2ggdmFsaWRhdGVzIHRoZSBwcm9wcyBwYXNzZWQgdG8gdGhlIGVsZW1lbnQuIFRoaXMgaXMgaW50ZW5kZWQgdG8gYmVcbiAqIHVzZWQgb25seSBpbiBERVYgYW5kIGNvdWxkIGJlIHJlcGxhY2VkIGJ5IGEgc3RhdGljIHR5cGUgY2hlY2tlciBmb3IgbGFuZ3VhZ2VzXG4gKiB0aGF0IHN1cHBvcnQgaXQuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG52YXIgUmVhY3RDb21wb25lbnRUcmVlSG9vayA9IHJlcXVpcmUoJy4vUmVhY3RDb21wb25lbnRUcmVlSG9vaycpO1xudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG5cbnZhciBjaGVja1JlYWN0VHlwZVNwZWMgPSByZXF1aXJlKCcuL2NoZWNrUmVhY3RUeXBlU3BlYycpO1xuXG52YXIgY2FuRGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL2NhbkRlZmluZVByb3BlcnR5Jyk7XG52YXIgZ2V0SXRlcmF0b3JGbiA9IHJlcXVpcmUoJy4vZ2V0SXRlcmF0b3JGbicpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbmZ1bmN0aW9uIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpIHtcbiAgaWYgKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICB2YXIgbmFtZSA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQuZ2V0TmFtZSgpO1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gJyBDaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiBgJyArIG5hbWUgKyAnYC4nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbmZ1bmN0aW9uIGdldFNvdXJjZUluZm9FcnJvckFkZGVuZHVtKGVsZW1lbnRQcm9wcykge1xuICBpZiAoZWxlbWVudFByb3BzICE9PSBudWxsICYmIGVsZW1lbnRQcm9wcyAhPT0gdW5kZWZpbmVkICYmIGVsZW1lbnRQcm9wcy5fX3NvdXJjZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHNvdXJjZSA9IGVsZW1lbnRQcm9wcy5fX3NvdXJjZTtcbiAgICB2YXIgZmlsZU5hbWUgPSBzb3VyY2UuZmlsZU5hbWUucmVwbGFjZSgvXi4qW1xcXFxcXC9dLywgJycpO1xuICAgIHZhciBsaW5lTnVtYmVyID0gc291cmNlLmxpbmVOdW1iZXI7XG4gICAgcmV0dXJuICcgQ2hlY2sgeW91ciBjb2RlIGF0ICcgKyBmaWxlTmFtZSArICc6JyArIGxpbmVOdW1iZXIgKyAnLic7XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIFdhcm4gaWYgdGhlcmUncyBubyBrZXkgZXhwbGljaXRseSBzZXQgb24gZHluYW1pYyBhcnJheXMgb2YgY2hpbGRyZW4gb3JcbiAqIG9iamVjdCBrZXlzIGFyZSBub3QgdmFsaWQuIFRoaXMgYWxsb3dzIHVzIHRvIGtlZXAgdHJhY2sgb2YgY2hpbGRyZW4gYmV0d2VlblxuICogdXBkYXRlcy5cbiAqL1xudmFyIG93bmVySGFzS2V5VXNlV2FybmluZyA9IHt9O1xuXG5mdW5jdGlvbiBnZXRDdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvKHBhcmVudFR5cGUpIHtcbiAgdmFyIGluZm8gPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcblxuICBpZiAoIWluZm8pIHtcbiAgICB2YXIgcGFyZW50TmFtZSA9IHR5cGVvZiBwYXJlbnRUeXBlID09PSAnc3RyaW5nJyA/IHBhcmVudFR5cGUgOiBwYXJlbnRUeXBlLmRpc3BsYXlOYW1lIHx8IHBhcmVudFR5cGUubmFtZTtcbiAgICBpZiAocGFyZW50TmFtZSkge1xuICAgICAgaW5mbyA9ICcgQ2hlY2sgdGhlIHRvcC1sZXZlbCByZW5kZXIgY2FsbCB1c2luZyA8JyArIHBhcmVudE5hbWUgKyAnPi4nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaW5mbztcbn1cblxuLyoqXG4gKiBXYXJuIGlmIHRoZSBlbGVtZW50IGRvZXNuJ3QgaGF2ZSBhbiBleHBsaWNpdCBrZXkgYXNzaWduZWQgdG8gaXQuXG4gKiBUaGlzIGVsZW1lbnQgaXMgaW4gYW4gYXJyYXkuIFRoZSBhcnJheSBjb3VsZCBncm93IGFuZCBzaHJpbmsgb3IgYmVcbiAqIHJlb3JkZXJlZC4gQWxsIGNoaWxkcmVuIHRoYXQgaGF2ZW4ndCBhbHJlYWR5IGJlZW4gdmFsaWRhdGVkIGFyZSByZXF1aXJlZCB0b1xuICogaGF2ZSBhIFwia2V5XCIgcHJvcGVydHkgYXNzaWduZWQgdG8gaXQuIEVycm9yIHN0YXR1c2VzIGFyZSBjYWNoZWQgc28gYSB3YXJuaW5nXG4gKiB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50IEVsZW1lbnQgdGhhdCByZXF1aXJlcyBhIGtleS5cbiAqIEBwYXJhbSB7Kn0gcGFyZW50VHlwZSBlbGVtZW50J3MgcGFyZW50J3MgdHlwZS5cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVFeHBsaWNpdEtleShlbGVtZW50LCBwYXJlbnRUeXBlKSB7XG4gIGlmICghZWxlbWVudC5fc3RvcmUgfHwgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkIHx8IGVsZW1lbnQua2V5ICE9IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkID0gdHJ1ZTtcblxuICB2YXIgbWVtb2l6ZXIgPSBvd25lckhhc0tleVVzZVdhcm5pbmcudW5pcXVlS2V5IHx8IChvd25lckhhc0tleVVzZVdhcm5pbmcudW5pcXVlS2V5ID0ge30pO1xuXG4gIHZhciBjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvID0gZ2V0Q3VycmVudENvbXBvbmVudEVycm9ySW5mbyhwYXJlbnRUeXBlKTtcbiAgaWYgKG1lbW9pemVyW2N1cnJlbnRDb21wb25lbnRFcnJvckluZm9dKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIG1lbW9pemVyW2N1cnJlbnRDb21wb25lbnRFcnJvckluZm9dID0gdHJ1ZTtcblxuICAvLyBVc3VhbGx5IHRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBvZmZlbmRlciwgYnV0IGlmIGl0IGFjY2VwdHMgY2hpbGRyZW4gYXMgYVxuICAvLyBwcm9wZXJ0eSwgaXQgbWF5IGJlIHRoZSBjcmVhdG9yIG9mIHRoZSBjaGlsZCB0aGF0J3MgcmVzcG9uc2libGUgZm9yXG4gIC8vIGFzc2lnbmluZyBpdCBhIGtleS5cbiAgdmFyIGNoaWxkT3duZXIgPSAnJztcbiAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5fb3duZXIgJiYgZWxlbWVudC5fb3duZXIgIT09IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICAvLyBHaXZlIHRoZSBjb21wb25lbnQgdGhhdCBvcmlnaW5hbGx5IGNyZWF0ZWQgdGhpcyBjaGlsZC5cbiAgICBjaGlsZE93bmVyID0gJyBJdCB3YXMgcGFzc2VkIGEgY2hpbGQgZnJvbSAnICsgZWxlbWVudC5fb3duZXIuZ2V0TmFtZSgpICsgJy4nO1xuICB9XG5cbiAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdFYWNoIGNoaWxkIGluIGFuIGFycmF5IG9yIGl0ZXJhdG9yIHNob3VsZCBoYXZlIGEgdW5pcXVlIFwia2V5XCIgcHJvcC4nICsgJyVzJXMgU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1rZXlzIGZvciBtb3JlIGluZm9ybWF0aW9uLiVzJywgY3VycmVudENvbXBvbmVudEVycm9ySW5mbywgY2hpbGRPd25lciwgUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRDdXJyZW50U3RhY2tBZGRlbmR1bShlbGVtZW50KSkgOiB2b2lkIDA7XG59XG5cbi8qKlxuICogRW5zdXJlIHRoYXQgZXZlcnkgZWxlbWVudCBlaXRoZXIgaXMgcGFzc2VkIGluIGEgc3RhdGljIGxvY2F0aW9uLCBpbiBhblxuICogYXJyYXkgd2l0aCBhbiBleHBsaWNpdCBrZXlzIHByb3BlcnR5IGRlZmluZWQsIG9yIGluIGFuIG9iamVjdCBsaXRlcmFsXG4gKiB3aXRoIHZhbGlkIGtleSBwcm9wZXJ0eS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3ROb2RlfSBub2RlIFN0YXRpY2FsbHkgcGFzc2VkIGNoaWxkIG9mIGFueSB0eXBlLlxuICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIG5vZGUncyBwYXJlbnQncyB0eXBlLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUNoaWxkS2V5cyhub2RlLCBwYXJlbnRUeXBlKSB7XG4gIGlmICh0eXBlb2Ygbm9kZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGlsZCA9IG5vZGVbaV07XG4gICAgICBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KGNoaWxkKSkge1xuICAgICAgICB2YWxpZGF0ZUV4cGxpY2l0S2V5KGNoaWxkLCBwYXJlbnRUeXBlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KG5vZGUpKSB7XG4gICAgLy8gVGhpcyBlbGVtZW50IHdhcyBwYXNzZWQgaW4gYSB2YWxpZCBsb2NhdGlvbi5cbiAgICBpZiAobm9kZS5fc3RvcmUpIHtcbiAgICAgIG5vZGUuX3N0b3JlLnZhbGlkYXRlZCA9IHRydWU7XG4gICAgfVxuICB9IGVsc2UgaWYgKG5vZGUpIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obm9kZSk7XG4gICAgLy8gRW50cnkgaXRlcmF0b3JzIHByb3ZpZGUgaW1wbGljaXQga2V5cy5cbiAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IG5vZGUuZW50cmllcykge1xuICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobm9kZSk7XG4gICAgICAgIHZhciBzdGVwO1xuICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgaWYgKFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgdmFsaWRhdGVFeHBsaWNpdEtleShzdGVwLnZhbHVlLCBwYXJlbnRUeXBlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBHaXZlbiBhbiBlbGVtZW50LCB2YWxpZGF0ZSB0aGF0IGl0cyBwcm9wcyBmb2xsb3cgdGhlIHByb3BUeXBlcyBkZWZpbml0aW9uLFxuICogcHJvdmlkZWQgYnkgdGhlIHR5cGUuXG4gKlxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVQcm9wVHlwZXMoZWxlbWVudCkge1xuICB2YXIgY29tcG9uZW50Q2xhc3MgPSBlbGVtZW50LnR5cGU7XG4gIGlmICh0eXBlb2YgY29tcG9uZW50Q2xhc3MgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG5hbWUgPSBjb21wb25lbnRDbGFzcy5kaXNwbGF5TmFtZSB8fCBjb21wb25lbnRDbGFzcy5uYW1lO1xuICBpZiAoY29tcG9uZW50Q2xhc3MucHJvcFR5cGVzKSB7XG4gICAgY2hlY2tSZWFjdFR5cGVTcGVjKGNvbXBvbmVudENsYXNzLnByb3BUeXBlcywgZWxlbWVudC5wcm9wcywgJ3Byb3AnLCBuYW1lLCBlbGVtZW50LCBudWxsKTtcbiAgfVxuICBpZiAodHlwZW9mIGNvbXBvbmVudENsYXNzLmdldERlZmF1bHRQcm9wcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGNvbXBvbmVudENsYXNzLmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCwgJ2dldERlZmF1bHRQcm9wcyBpcyBvbmx5IHVzZWQgb24gY2xhc3NpYyBSZWFjdC5jcmVhdGVDbGFzcyAnICsgJ2RlZmluaXRpb25zLiBVc2UgYSBzdGF0aWMgcHJvcGVydHkgbmFtZWQgYGRlZmF1bHRQcm9wc2AgaW5zdGVhZC4nKSA6IHZvaWQgMDtcbiAgfVxufVxuXG52YXIgUmVhY3RFbGVtZW50VmFsaWRhdG9yID0ge1xuXG4gIGNyZWF0ZUVsZW1lbnQ6IGZ1bmN0aW9uICh0eXBlLCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgICB2YXIgdmFsaWRUeXBlID0gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nO1xuICAgIC8vIFdlIHdhcm4gaW4gdGhpcyBjYXNlIGJ1dCBkb24ndCB0aHJvdy4gV2UgZXhwZWN0IHRoZSBlbGVtZW50IGNyZWF0aW9uIHRvXG4gICAgLy8gc3VjY2VlZCBhbmQgdGhlcmUgd2lsbCBsaWtlbHkgYmUgZXJyb3JzIGluIHJlbmRlci5cbiAgICBpZiAoIXZhbGlkVHlwZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiB0eXBlICE9PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgaW5mbyA9ICcnO1xuICAgICAgICBpZiAodHlwZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiB0eXBlICE9PSBudWxsICYmIE9iamVjdC5rZXlzKHR5cGUpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGluZm8gKz0gJyBZb3UgbGlrZWx5IGZvcmdvdCB0byBleHBvcnQgeW91ciBjb21wb25lbnQgZnJvbSB0aGUgZmlsZSAnICsgJ2l0XFwncyBkZWZpbmVkIGluLic7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc291cmNlSW5mbyA9IGdldFNvdXJjZUluZm9FcnJvckFkZGVuZHVtKHByb3BzKTtcbiAgICAgICAgaWYgKHNvdXJjZUluZm8pIHtcbiAgICAgICAgICBpbmZvICs9IHNvdXJjZUluZm87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5mbyArPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluZm8gKz0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRDdXJyZW50U3RhY2tBZGRlbmR1bSgpO1xuXG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnUmVhY3QuY3JlYXRlRWxlbWVudDogdHlwZSBpcyBpbnZhbGlkIC0tIGV4cGVjdGVkIGEgc3RyaW5nIChmb3IgJyArICdidWlsdC1pbiBjb21wb25lbnRzKSBvciBhIGNsYXNzL2Z1bmN0aW9uIChmb3IgY29tcG9zaXRlICcgKyAnY29tcG9uZW50cykgYnV0IGdvdDogJXMuJXMnLCB0eXBlID09IG51bGwgPyB0eXBlIDogdHlwZW9mIHR5cGUsIGluZm8pIDogdm9pZCAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBlbGVtZW50ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIC8vIFRoZSByZXN1bHQgY2FuIGJlIG51bGxpc2ggaWYgYSBtb2NrIG9yIGEgY3VzdG9tIGZ1bmN0aW9uIGlzIHVzZWQuXG4gICAgLy8gVE9ETzogRHJvcCB0aGlzIHdoZW4gdGhlc2UgYXJlIG5vIGxvbmdlciBhbGxvd2VkIGFzIHRoZSB0eXBlIGFyZ3VtZW50LlxuICAgIGlmIChlbGVtZW50ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIC8vIFNraXAga2V5IHdhcm5pbmcgaWYgdGhlIHR5cGUgaXNuJ3QgdmFsaWQgc2luY2Ugb3VyIGtleSB2YWxpZGF0aW9uIGxvZ2ljXG4gICAgLy8gZG9lc24ndCBleHBlY3QgYSBub24tc3RyaW5nL2Z1bmN0aW9uIHR5cGUgYW5kIGNhbiB0aHJvdyBjb25mdXNpbmcgZXJyb3JzLlxuICAgIC8vIFdlIGRvbid0IHdhbnQgZXhjZXB0aW9uIGJlaGF2aW9yIHRvIGRpZmZlciBiZXR3ZWVuIGRldiBhbmQgcHJvZC5cbiAgICAvLyAoUmVuZGVyaW5nIHdpbGwgdGhyb3cgd2l0aCBhIGhlbHBmdWwgbWVzc2FnZSBhbmQgYXMgc29vbiBhcyB0aGUgdHlwZSBpc1xuICAgIC8vIGZpeGVkLCB0aGUga2V5IHdhcm5pbmdzIHdpbGwgYXBwZWFyLilcbiAgICBpZiAodmFsaWRUeXBlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMjsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YWxpZGF0ZUNoaWxkS2V5cyhhcmd1bWVudHNbaV0sIHR5cGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0sXG5cbiAgY3JlYXRlRmFjdG9yeTogZnVuY3Rpb24gKHR5cGUpIHtcbiAgICB2YXIgdmFsaWRhdGVkRmFjdG9yeSA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVFbGVtZW50LmJpbmQobnVsbCwgdHlwZSk7XG4gICAgLy8gTGVnYWN5IGhvb2sgVE9ETzogV2FybiBpZiB0aGlzIGlzIGFjY2Vzc2VkXG4gICAgdmFsaWRhdGVkRmFjdG9yeS50eXBlID0gdHlwZTtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZhbGlkYXRlZEZhY3RvcnksICd0eXBlJywge1xuICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdGYWN0b3J5LnR5cGUgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHRoZSBjbGFzcyBkaXJlY3RseSAnICsgJ2JlZm9yZSBwYXNzaW5nIGl0IHRvIGNyZWF0ZUZhY3RvcnkuJykgOiB2b2lkIDA7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3R5cGUnLCB7XG4gICAgICAgICAgICAgIHZhbHVlOiB0eXBlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRlZEZhY3Rvcnk7XG4gIH0sXG5cbiAgY2xvbmVFbGVtZW50OiBmdW5jdGlvbiAoZWxlbWVudCwgcHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgdmFyIG5ld0VsZW1lbnQgPSBSZWFjdEVsZW1lbnQuY2xvbmVFbGVtZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgZm9yICh2YXIgaSA9IDI7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbGlkYXRlQ2hpbGRLZXlzKGFyZ3VtZW50c1tpXSwgbmV3RWxlbWVudC50eXBlKTtcbiAgICB9XG4gICAgdmFsaWRhdGVQcm9wVHlwZXMobmV3RWxlbWVudCk7XG4gICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3I7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0L2xpYi9SZWFjdEVsZW1lbnRWYWxpZGF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0ge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0ge1xuICAgIHByb3A6ICdwcm9wJyxcbiAgICBjb250ZXh0OiAnY29udGV4dCcsXG4gICAgY2hpbGRDb250ZXh0OiAnY2hpbGQgY29udGV4dCdcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3QvbGliL1JlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qIGdsb2JhbCBTeW1ib2wgKi9cblxudmFyIElURVJBVE9SX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yO1xudmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InOyAvLyBCZWZvcmUgU3ltYm9sIHNwZWMuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgaXRlcmF0b3IgbWV0aG9kIGZ1bmN0aW9uIGNvbnRhaW5lZCBvbiB0aGUgaXRlcmFibGUgb2JqZWN0LlxuICpcbiAqIEJlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBpdGVyYWJsZSBhcyBjb250ZXh0OlxuICpcbiAqICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obXlJdGVyYWJsZSk7XG4gKiAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAqICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChteUl0ZXJhYmxlKTtcbiAqICAgICAgIC4uLlxuICogICAgIH1cbiAqXG4gKiBAcGFyYW0gez9vYmplY3R9IG1heWJlSXRlcmFibGVcbiAqIEByZXR1cm4gez9mdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gIHZhciBpdGVyYXRvckZuID0gbWF5YmVJdGVyYWJsZSAmJiAoSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXSk7XG4gIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBpdGVyYXRvckZuO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0SXRlcmF0b3JGbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3QvbGliL2dldEl0ZXJhdG9yRm4uanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKlxuICogUmVhY3RET00gdjE1LjUuNFxuICpcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cbiFmdW5jdGlvbihlKXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz1lKHJlcXVpcmUoXCJyZWFjdFwiKSk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtcInJlYWN0XCJdLGUpO2Vsc2V7dmFyIHQ7dD1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzpcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsP2dsb2JhbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOnRoaXMsdC5SZWFjdERPTT1lKHQuUmVhY3QpfX0oZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBvKGEscyl7aWYoIW5bYV0pe2lmKCF0W2FdKXt2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFzJiZ1KXJldHVybiB1KGEsITApO2lmKGkpcmV0dXJuIGkoYSwhMCk7dmFyIGw9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIithK1wiJ1wiKTt0aHJvdyBsLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsbH12YXIgYz1uW2FdPXtleHBvcnRzOnt9fTt0W2FdWzBdLmNhbGwoYy5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbYV1bMV1bZV07cmV0dXJuIG8obnx8ZSl9LGMsYy5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW2FdLmV4cG9ydHN9Zm9yKHZhciBpPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsYT0wO2E8ci5sZW5ndGg7YSsrKW8oclthXSk7cmV0dXJuIG99KHsxOltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9e1Byb3BlcnRpZXM6e1wiYXJpYS1jdXJyZW50XCI6MCxcImFyaWEtZGV0YWlsc1wiOjAsXCJhcmlhLWRpc2FibGVkXCI6MCxcImFyaWEtaGlkZGVuXCI6MCxcImFyaWEtaW52YWxpZFwiOjAsXCJhcmlhLWtleXNob3J0Y3V0c1wiOjAsXCJhcmlhLWxhYmVsXCI6MCxcImFyaWEtcm9sZWRlc2NyaXB0aW9uXCI6MCxcImFyaWEtYXV0b2NvbXBsZXRlXCI6MCxcImFyaWEtY2hlY2tlZFwiOjAsXCJhcmlhLWV4cGFuZGVkXCI6MCxcImFyaWEtaGFzcG9wdXBcIjowLFwiYXJpYS1sZXZlbFwiOjAsXCJhcmlhLW1vZGFsXCI6MCxcImFyaWEtbXVsdGlsaW5lXCI6MCxcImFyaWEtbXVsdGlzZWxlY3RhYmxlXCI6MCxcImFyaWEtb3JpZW50YXRpb25cIjowLFwiYXJpYS1wbGFjZWhvbGRlclwiOjAsXCJhcmlhLXByZXNzZWRcIjowLFwiYXJpYS1yZWFkb25seVwiOjAsXCJhcmlhLXJlcXVpcmVkXCI6MCxcImFyaWEtc2VsZWN0ZWRcIjowLFwiYXJpYS1zb3J0XCI6MCxcImFyaWEtdmFsdWVtYXhcIjowLFwiYXJpYS12YWx1ZW1pblwiOjAsXCJhcmlhLXZhbHVlbm93XCI6MCxcImFyaWEtdmFsdWV0ZXh0XCI6MCxcImFyaWEtYXRvbWljXCI6MCxcImFyaWEtYnVzeVwiOjAsXCJhcmlhLWxpdmVcIjowLFwiYXJpYS1yZWxldmFudFwiOjAsXCJhcmlhLWRyb3BlZmZlY3RcIjowLFwiYXJpYS1ncmFiYmVkXCI6MCxcImFyaWEtYWN0aXZlZGVzY2VuZGFudFwiOjAsXCJhcmlhLWNvbGNvdW50XCI6MCxcImFyaWEtY29saW5kZXhcIjowLFwiYXJpYS1jb2xzcGFuXCI6MCxcImFyaWEtY29udHJvbHNcIjowLFwiYXJpYS1kZXNjcmliZWRieVwiOjAsXCJhcmlhLWVycm9ybWVzc2FnZVwiOjAsXCJhcmlhLWZsb3d0b1wiOjAsXCJhcmlhLWxhYmVsbGVkYnlcIjowLFwiYXJpYS1vd25zXCI6MCxcImFyaWEtcG9zaW5zZXRcIjowLFwiYXJpYS1yb3djb3VudFwiOjAsXCJhcmlhLXJvd2luZGV4XCI6MCxcImFyaWEtcm93c3BhblwiOjAsXCJhcmlhLXNldHNpemVcIjowfSxET01BdHRyaWJ1dGVOYW1lczp7fSxET01Qcm9wZXJ0eU5hbWVzOnt9fTt0LmV4cG9ydHM9cn0se31dLDI6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1lKDMzKSxvPWUoMTMxKSxpPXtmb2N1c0RPTUNvbXBvbmVudDpmdW5jdGlvbigpe28oci5nZXROb2RlRnJvbUluc3RhbmNlKHRoaXMpKX19O3QuZXhwb3J0cz1pfSx7MTMxOjEzMSwzMzozM31dLDM6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe3JldHVybihlLmN0cmxLZXl8fGUuYWx0S2V5fHxlLm1ldGFLZXkpJiYhKGUuY3RybEtleSYmZS5hbHRLZXkpfWZ1bmN0aW9uIG8oZSl7c3dpdGNoKGUpe2Nhc2VcInRvcENvbXBvc2l0aW9uU3RhcnRcIjpyZXR1cm4gVC5jb21wb3NpdGlvblN0YXJ0O2Nhc2VcInRvcENvbXBvc2l0aW9uRW5kXCI6cmV0dXJuIFQuY29tcG9zaXRpb25FbmQ7Y2FzZVwidG9wQ29tcG9zaXRpb25VcGRhdGVcIjpyZXR1cm4gVC5jb21wb3NpdGlvblVwZGF0ZX19ZnVuY3Rpb24gaShlLHQpe3JldHVyblwidG9wS2V5RG93blwiPT09ZSYmdC5rZXlDb2RlPT09eX1mdW5jdGlvbiBhKGUsdCl7c3dpdGNoKGUpe2Nhc2VcInRvcEtleVVwXCI6cmV0dXJuLTEhPT1nLmluZGV4T2YodC5rZXlDb2RlKTtjYXNlXCJ0b3BLZXlEb3duXCI6cmV0dXJuIHQua2V5Q29kZSE9PXk7Y2FzZVwidG9wS2V5UHJlc3NcIjpjYXNlXCJ0b3BNb3VzZURvd25cIjpjYXNlXCJ0b3BCbHVyXCI6cmV0dXJuITA7ZGVmYXVsdDpyZXR1cm4hMX19ZnVuY3Rpb24gcyhlKXt2YXIgdD1lLmRldGFpbDtyZXR1cm5cIm9iamVjdFwiPT10eXBlb2YgdCYmXCJkYXRhXCJpbiB0P3QuZGF0YTpudWxsfWZ1bmN0aW9uIHUoZSx0LG4scil7dmFyIHUsbDtpZihfP3U9byhlKTpQP2EoZSxuKSYmKHU9VC5jb21wb3NpdGlvbkVuZCk6aShlLG4pJiYodT1ULmNvbXBvc2l0aW9uU3RhcnQpLCF1KXJldHVybiBudWxsO0UmJihQfHx1IT09VC5jb21wb3NpdGlvblN0YXJ0P3U9PT1ULmNvbXBvc2l0aW9uRW5kJiZQJiYobD1QLmdldERhdGEoKSk6UD1oLmdldFBvb2xlZChyKSk7dmFyIGM9bS5nZXRQb29sZWQodSx0LG4scik7aWYobCljLmRhdGE9bDtlbHNle3ZhciBwPXMobik7bnVsbCE9PXAmJihjLmRhdGE9cCl9cmV0dXJuIGQuYWNjdW11bGF0ZVR3b1BoYXNlRGlzcGF0Y2hlcyhjKSxjfWZ1bmN0aW9uIGwoZSx0KXtzd2l0Y2goZSl7Y2FzZVwidG9wQ29tcG9zaXRpb25FbmRcIjpyZXR1cm4gcyh0KTtjYXNlXCJ0b3BLZXlQcmVzc1wiOnJldHVybiB0LndoaWNoIT09eD9udWxsOihrPSEwLHcpO2Nhc2VcInRvcFRleHRJbnB1dFwiOnZhciBuPXQuZGF0YTtyZXR1cm4gbj09PXcmJms/bnVsbDpuO2RlZmF1bHQ6cmV0dXJuIG51bGx9fWZ1bmN0aW9uIGMoZSx0KXtpZihQKXtpZihcInRvcENvbXBvc2l0aW9uRW5kXCI9PT1lfHwhXyYmYShlLHQpKXt2YXIgbj1QLmdldERhdGEoKTtyZXR1cm4gaC5yZWxlYXNlKFApLFA9bnVsbCxufXJldHVybiBudWxsfXN3aXRjaChlKXtjYXNlXCJ0b3BQYXN0ZVwiOnJldHVybiBudWxsO2Nhc2VcInRvcEtleVByZXNzXCI6cmV0dXJuIHQud2hpY2gmJiFyKHQpP1N0cmluZy5mcm9tQ2hhckNvZGUodC53aGljaCk6bnVsbDtjYXNlXCJ0b3BDb21wb3NpdGlvbkVuZFwiOnJldHVybiBFP251bGw6dC5kYXRhO2RlZmF1bHQ6cmV0dXJuIG51bGx9fWZ1bmN0aW9uIHAoZSx0LG4scil7dmFyIG87aWYoIShvPWI/bChlLG4pOmMoZSxuKSkpcmV0dXJuIG51bGw7dmFyIGk9di5nZXRQb29sZWQoVC5iZWZvcmVJbnB1dCx0LG4scik7cmV0dXJuIGkuZGF0YT1vLGQuYWNjdW11bGF0ZVR3b1BoYXNlRGlzcGF0Y2hlcyhpKSxpfXZhciBkPWUoMTkpLGY9ZSgxMjMpLGg9ZSgyMCksbT1lKDc4KSx2PWUoODIpLGc9WzksMTMsMjcsMzJdLHk9MjI5LF89Zi5jYW5Vc2VET00mJlwiQ29tcG9zaXRpb25FdmVudFwiaW4gd2luZG93LEM9bnVsbDtmLmNhblVzZURPTSYmXCJkb2N1bWVudE1vZGVcImluIGRvY3VtZW50JiYoQz1kb2N1bWVudC5kb2N1bWVudE1vZGUpO3ZhciBiPWYuY2FuVXNlRE9NJiZcIlRleHRFdmVudFwiaW4gd2luZG93JiYhQyYmIWZ1bmN0aW9uKCl7dmFyIGU9d2luZG93Lm9wZXJhO3JldHVyblwib2JqZWN0XCI9PXR5cGVvZiBlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLnZlcnNpb24mJnBhcnNlSW50KGUudmVyc2lvbigpLDEwKTw9MTJ9KCksRT1mLmNhblVzZURPTSYmKCFffHxDJiZDPjgmJkM8PTExKSx4PTMyLHc9U3RyaW5nLmZyb21DaGFyQ29kZSh4KSxUPXtiZWZvcmVJbnB1dDp7cGhhc2VkUmVnaXN0cmF0aW9uTmFtZXM6e2J1YmJsZWQ6XCJvbkJlZm9yZUlucHV0XCIsY2FwdHVyZWQ6XCJvbkJlZm9yZUlucHV0Q2FwdHVyZVwifSxkZXBlbmRlbmNpZXM6W1widG9wQ29tcG9zaXRpb25FbmRcIixcInRvcEtleVByZXNzXCIsXCJ0b3BUZXh0SW5wdXRcIixcInRvcFBhc3RlXCJdfSxjb21wb3NpdGlvbkVuZDp7cGhhc2VkUmVnaXN0cmF0aW9uTmFtZXM6e2J1YmJsZWQ6XCJvbkNvbXBvc2l0aW9uRW5kXCIsY2FwdHVyZWQ6XCJvbkNvbXBvc2l0aW9uRW5kQ2FwdHVyZVwifSxkZXBlbmRlbmNpZXM6W1widG9wQmx1clwiLFwidG9wQ29tcG9zaXRpb25FbmRcIixcInRvcEtleURvd25cIixcInRvcEtleVByZXNzXCIsXCJ0b3BLZXlVcFwiLFwidG9wTW91c2VEb3duXCJdfSxjb21wb3NpdGlvblN0YXJ0OntwaGFzZWRSZWdpc3RyYXRpb25OYW1lczp7YnViYmxlZDpcIm9uQ29tcG9zaXRpb25TdGFydFwiLGNhcHR1cmVkOlwib25Db21wb3NpdGlvblN0YXJ0Q2FwdHVyZVwifSxkZXBlbmRlbmNpZXM6W1widG9wQmx1clwiLFwidG9wQ29tcG9zaXRpb25TdGFydFwiLFwidG9wS2V5RG93blwiLFwidG9wS2V5UHJlc3NcIixcInRvcEtleVVwXCIsXCJ0b3BNb3VzZURvd25cIl19LGNvbXBvc2l0aW9uVXBkYXRlOntwaGFzZWRSZWdpc3RyYXRpb25OYW1lczp7YnViYmxlZDpcIm9uQ29tcG9zaXRpb25VcGRhdGVcIixjYXB0dXJlZDpcIm9uQ29tcG9zaXRpb25VcGRhdGVDYXB0dXJlXCJ9LGRlcGVuZGVuY2llczpbXCJ0b3BCbHVyXCIsXCJ0b3BDb21wb3NpdGlvblVwZGF0ZVwiLFwidG9wS2V5RG93blwiLFwidG9wS2V5UHJlc3NcIixcInRvcEtleVVwXCIsXCJ0b3BNb3VzZURvd25cIl19fSxrPSExLFA9bnVsbCxTPXtldmVudFR5cGVzOlQsZXh0cmFjdEV2ZW50czpmdW5jdGlvbihlLHQsbixyKXtyZXR1cm5bdShlLHQsbixyKSxwKGUsdCxuLHIpXX19O3QuZXhwb3J0cz1TfSx7MTIzOjEyMywxOToxOSwyMDoyMCw3ODo3OCw4Mjo4Mn1dLDQ6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUsdCl7cmV0dXJuIGUrdC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSt0LnN1YnN0cmluZygxKX12YXIgbz17YW5pbWF0aW9uSXRlcmF0aW9uQ291bnQ6ITAsYm9yZGVySW1hZ2VPdXRzZXQ6ITAsYm9yZGVySW1hZ2VTbGljZTohMCxib3JkZXJJbWFnZVdpZHRoOiEwLGJveEZsZXg6ITAsYm94RmxleEdyb3VwOiEwLGJveE9yZGluYWxHcm91cDohMCxjb2x1bW5Db3VudDohMCxmbGV4OiEwLGZsZXhHcm93OiEwLGZsZXhQb3NpdGl2ZTohMCxmbGV4U2hyaW5rOiEwLGZsZXhOZWdhdGl2ZTohMCxmbGV4T3JkZXI6ITAsZ3JpZFJvdzohMCxncmlkQ29sdW1uOiEwLGZvbnRXZWlnaHQ6ITAsbGluZUNsYW1wOiEwLGxpbmVIZWlnaHQ6ITAsb3BhY2l0eTohMCxvcmRlcjohMCxvcnBoYW5zOiEwLHRhYlNpemU6ITAsd2lkb3dzOiEwLHpJbmRleDohMCx6b29tOiEwLGZpbGxPcGFjaXR5OiEwLGZsb29kT3BhY2l0eTohMCxzdG9wT3BhY2l0eTohMCxzdHJva2VEYXNoYXJyYXk6ITAsc3Ryb2tlRGFzaG9mZnNldDohMCxzdHJva2VNaXRlcmxpbWl0OiEwLHN0cm9rZU9wYWNpdHk6ITAsc3Ryb2tlV2lkdGg6ITB9LGk9W1wiV2Via2l0XCIsXCJtc1wiLFwiTW96XCIsXCJPXCJdO09iamVjdC5rZXlzKG8pLmZvckVhY2goZnVuY3Rpb24oZSl7aS5mb3JFYWNoKGZ1bmN0aW9uKHQpe29bcih0LGUpXT1vW2VdfSl9KTt2YXIgYT17YmFja2dyb3VuZDp7YmFja2dyb3VuZEF0dGFjaG1lbnQ6ITAsYmFja2dyb3VuZENvbG9yOiEwLGJhY2tncm91bmRJbWFnZTohMCxiYWNrZ3JvdW5kUG9zaXRpb25YOiEwLGJhY2tncm91bmRQb3NpdGlvblk6ITAsYmFja2dyb3VuZFJlcGVhdDohMH0sYmFja2dyb3VuZFBvc2l0aW9uOntiYWNrZ3JvdW5kUG9zaXRpb25YOiEwLGJhY2tncm91bmRQb3NpdGlvblk6ITB9LGJvcmRlcjp7Ym9yZGVyV2lkdGg6ITAsYm9yZGVyU3R5bGU6ITAsYm9yZGVyQ29sb3I6ITB9LGJvcmRlckJvdHRvbTp7Ym9yZGVyQm90dG9tV2lkdGg6ITAsYm9yZGVyQm90dG9tU3R5bGU6ITAsYm9yZGVyQm90dG9tQ29sb3I6ITB9LGJvcmRlckxlZnQ6e2JvcmRlckxlZnRXaWR0aDohMCxib3JkZXJMZWZ0U3R5bGU6ITAsYm9yZGVyTGVmdENvbG9yOiEwfSxib3JkZXJSaWdodDp7Ym9yZGVyUmlnaHRXaWR0aDohMCxib3JkZXJSaWdodFN0eWxlOiEwLGJvcmRlclJpZ2h0Q29sb3I6ITB9LGJvcmRlclRvcDp7Ym9yZGVyVG9wV2lkdGg6ITAsYm9yZGVyVG9wU3R5bGU6ITAsYm9yZGVyVG9wQ29sb3I6ITB9LGZvbnQ6e2ZvbnRTdHlsZTohMCxmb250VmFyaWFudDohMCxmb250V2VpZ2h0OiEwLGZvbnRTaXplOiEwLGxpbmVIZWlnaHQ6ITAsZm9udEZhbWlseTohMH0sb3V0bGluZTp7b3V0bGluZVdpZHRoOiEwLG91dGxpbmVTdHlsZTohMCxvdXRsaW5lQ29sb3I6ITB9fSxzPXtpc1VuaXRsZXNzTnVtYmVyOm8sc2hvcnRoYW5kUHJvcGVydHlFeHBhbnNpb25zOmF9O3QuZXhwb3J0cz1zfSx7fV0sNTpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3ZhciByPWUoNCksbz1lKDEyMyksaT0oZSg1OCksZSgxMjUpLGUoOTQpKSxhPWUoMTM2KSxzPWUoMTQwKSx1PShlKDE0MikscyhmdW5jdGlvbihlKXtyZXR1cm4gYShlKX0pKSxsPSExLGM9XCJjc3NGbG9hdFwiO2lmKG8uY2FuVXNlRE9NKXt2YXIgcD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLnN0eWxlO3RyeXtwLmZvbnQ9XCJcIn1jYXRjaChlKXtsPSEwfXZvaWQgMD09PWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5jc3NGbG9hdCYmKGM9XCJzdHlsZUZsb2F0XCIpfXZhciBkPXtjcmVhdGVNYXJrdXBGb3JTdHlsZXM6ZnVuY3Rpb24oZSx0KXt2YXIgbj1cIlwiO2Zvcih2YXIgciBpbiBlKWlmKGUuaGFzT3duUHJvcGVydHkocikpe3ZhciBvPWVbcl07bnVsbCE9byYmKG4rPXUocikrXCI6XCIsbis9aShyLG8sdCkrXCI7XCIpfXJldHVybiBufHxudWxsfSxzZXRWYWx1ZUZvclN0eWxlczpmdW5jdGlvbihlLHQsbil7dmFyIG89ZS5zdHlsZTtmb3IodmFyIGEgaW4gdClpZih0Lmhhc093blByb3BlcnR5KGEpKXt2YXIgcz1pKGEsdFthXSxuKTtpZihcImZsb2F0XCIhPT1hJiZcImNzc0Zsb2F0XCIhPT1hfHwoYT1jKSxzKW9bYV09cztlbHNle3ZhciB1PWwmJnIuc2hvcnRoYW5kUHJvcGVydHlFeHBhbnNpb25zW2FdO2lmKHUpZm9yKHZhciBwIGluIHUpb1twXT1cIlwiO2Vsc2Ugb1thXT1cIlwifX19fTt0LmV4cG9ydHM9ZH0sezEyMzoxMjMsMTI1OjEyNSwxMzY6MTM2LDE0MDoxNDAsMTQyOjE0Miw0OjQsNTg6NTgsOTQ6OTR9XSw2OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlLHQpe2lmKCEoZSBpbnN0YW5jZW9mIHQpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9dmFyIG89ZSgxMTIpLGk9ZSgyNCksYT0oZSgxMzcpLGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0KXtyKHRoaXMsZSksdGhpcy5fY2FsbGJhY2tzPW51bGwsdGhpcy5fY29udGV4dHM9bnVsbCx0aGlzLl9hcmc9dH1yZXR1cm4gZS5wcm90b3R5cGUuZW5xdWV1ZT1mdW5jdGlvbihlLHQpe3RoaXMuX2NhbGxiYWNrcz10aGlzLl9jYWxsYmFja3N8fFtdLHRoaXMuX2NhbGxiYWNrcy5wdXNoKGUpLHRoaXMuX2NvbnRleHRzPXRoaXMuX2NvbnRleHRzfHxbXSx0aGlzLl9jb250ZXh0cy5wdXNoKHQpfSxlLnByb3RvdHlwZS5ub3RpZnlBbGw9ZnVuY3Rpb24oKXt2YXIgZT10aGlzLl9jYWxsYmFja3MsdD10aGlzLl9jb250ZXh0cyxuPXRoaXMuX2FyZztpZihlJiZ0KXtlLmxlbmd0aCE9PXQubGVuZ3RoJiZvKFwiMjRcIiksdGhpcy5fY2FsbGJhY2tzPW51bGwsdGhpcy5fY29udGV4dHM9bnVsbDtmb3IodmFyIHI9MDtyPGUubGVuZ3RoO3IrKyllW3JdLmNhbGwodFtyXSxuKTtlLmxlbmd0aD0wLHQubGVuZ3RoPTB9fSxlLnByb3RvdHlwZS5jaGVja3BvaW50PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2NhbGxiYWNrcz90aGlzLl9jYWxsYmFja3MubGVuZ3RoOjB9LGUucHJvdG90eXBlLnJvbGxiYWNrPWZ1bmN0aW9uKGUpe3RoaXMuX2NhbGxiYWNrcyYmdGhpcy5fY29udGV4dHMmJih0aGlzLl9jYWxsYmFja3MubGVuZ3RoPWUsdGhpcy5fY29udGV4dHMubGVuZ3RoPWUpfSxlLnByb3RvdHlwZS5yZXNldD1mdW5jdGlvbigpe3RoaXMuX2NhbGxiYWNrcz1udWxsLHRoaXMuX2NvbnRleHRzPW51bGx9LGUucHJvdG90eXBlLmRlc3RydWN0b3I9ZnVuY3Rpb24oKXt0aGlzLnJlc2V0KCl9LGV9KCkpO3QuZXhwb3J0cz1pLmFkZFBvb2xpbmdUbyhhKX0sezExMjoxMTIsMTM3OjEzNywyNDoyNH1dLDc6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe3ZhciB0PWUubm9kZU5hbWUmJmUubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtyZXR1cm5cInNlbGVjdFwiPT09dHx8XCJpbnB1dFwiPT09dCYmXCJmaWxlXCI9PT1lLnR5cGV9ZnVuY3Rpb24gbyhlKXt2YXIgdD13LmdldFBvb2xlZChTLmNoYW5nZSxNLGUsVChlKSk7Qy5hY2N1bXVsYXRlVHdvUGhhc2VEaXNwYXRjaGVzKHQpLHguYmF0Y2hlZFVwZGF0ZXMoaSx0KX1mdW5jdGlvbiBpKGUpe18uZW5xdWV1ZUV2ZW50cyhlKSxfLnByb2Nlc3NFdmVudFF1ZXVlKCExKX1mdW5jdGlvbiBhKGUsdCl7Tj1lLE09dCxOLmF0dGFjaEV2ZW50KFwib25jaGFuZ2VcIixvKX1mdW5jdGlvbiBzKCl7TiYmKE4uZGV0YWNoRXZlbnQoXCJvbmNoYW5nZVwiLG8pLE49bnVsbCxNPW51bGwpfWZ1bmN0aW9uIHUoZSx0KXtpZihcInRvcENoYW5nZVwiPT09ZSlyZXR1cm4gdH1mdW5jdGlvbiBsKGUsdCxuKXtcInRvcEZvY3VzXCI9PT1lPyhzKCksYSh0LG4pKTpcInRvcEJsdXJcIj09PWUmJnMoKX1mdW5jdGlvbiBjKGUsdCl7Tj1lLE09dCxJPWUudmFsdWUsTz1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGUuY29uc3RydWN0b3IucHJvdG90eXBlLFwidmFsdWVcIiksT2JqZWN0LmRlZmluZVByb3BlcnR5KE4sXCJ2YWx1ZVwiLEQpLE4uYXR0YWNoRXZlbnQ/Ti5hdHRhY2hFdmVudChcIm9ucHJvcGVydHljaGFuZ2VcIixkKTpOLmFkZEV2ZW50TGlzdGVuZXIoXCJwcm9wZXJ0eWNoYW5nZVwiLGQsITEpfWZ1bmN0aW9uIHAoKXtOJiYoZGVsZXRlIE4udmFsdWUsTi5kZXRhY2hFdmVudD9OLmRldGFjaEV2ZW50KFwib25wcm9wZXJ0eWNoYW5nZVwiLGQpOk4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInByb3BlcnR5Y2hhbmdlXCIsZCwhMSksTj1udWxsLE09bnVsbCxJPW51bGwsTz1udWxsKX1mdW5jdGlvbiBkKGUpe2lmKFwidmFsdWVcIj09PWUucHJvcGVydHlOYW1lKXt2YXIgdD1lLnNyY0VsZW1lbnQudmFsdWU7dCE9PUkmJihJPXQsbyhlKSl9fWZ1bmN0aW9uIGYoZSx0KXtpZihcInRvcElucHV0XCI9PT1lKXJldHVybiB0fWZ1bmN0aW9uIGgoZSx0LG4pe1widG9wRm9jdXNcIj09PWU/KHAoKSxjKHQsbikpOlwidG9wQmx1clwiPT09ZSYmcCgpfWZ1bmN0aW9uIG0oZSx0KXtpZigoXCJ0b3BTZWxlY3Rpb25DaGFuZ2VcIj09PWV8fFwidG9wS2V5VXBcIj09PWV8fFwidG9wS2V5RG93blwiPT09ZSkmJk4mJk4udmFsdWUhPT1JKXJldHVybiBJPU4udmFsdWUsTX1mdW5jdGlvbiB2KGUpe3JldHVybiBlLm5vZGVOYW1lJiZcImlucHV0XCI9PT1lLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkmJihcImNoZWNrYm94XCI9PT1lLnR5cGV8fFwicmFkaW9cIj09PWUudHlwZSl9ZnVuY3Rpb24gZyhlLHQpe2lmKFwidG9wQ2xpY2tcIj09PWUpcmV0dXJuIHR9ZnVuY3Rpb24geShlLHQpe2lmKG51bGwhPWUpe3ZhciBuPWUuX3dyYXBwZXJTdGF0ZXx8dC5fd3JhcHBlclN0YXRlO2lmKG4mJm4uY29udHJvbGxlZCYmXCJudW1iZXJcIj09PXQudHlwZSl7dmFyIHI9XCJcIit0LnZhbHVlO3QuZ2V0QXR0cmlidXRlKFwidmFsdWVcIikhPT1yJiZ0LnNldEF0dHJpYnV0ZShcInZhbHVlXCIscil9fX12YXIgXz1lKDE2KSxDPWUoMTkpLGI9ZSgxMjMpLEU9ZSgzMykseD1lKDcxKSx3PWUoODApLFQ9ZSgxMDIpLGs9ZSgxMDkpLFA9ZSgxMTApLFM9e2NoYW5nZTp7cGhhc2VkUmVnaXN0cmF0aW9uTmFtZXM6e2J1YmJsZWQ6XCJvbkNoYW5nZVwiLGNhcHR1cmVkOlwib25DaGFuZ2VDYXB0dXJlXCJ9LGRlcGVuZGVuY2llczpbXCJ0b3BCbHVyXCIsXCJ0b3BDaGFuZ2VcIixcInRvcENsaWNrXCIsXCJ0b3BGb2N1c1wiLFwidG9wSW5wdXRcIixcInRvcEtleURvd25cIixcInRvcEtleVVwXCIsXCJ0b3BTZWxlY3Rpb25DaGFuZ2VcIl19fSxOPW51bGwsTT1udWxsLEk9bnVsbCxPPW51bGwsUj0hMTtiLmNhblVzZURPTSYmKFI9ayhcImNoYW5nZVwiKSYmKCFkb2N1bWVudC5kb2N1bWVudE1vZGV8fGRvY3VtZW50LmRvY3VtZW50TW9kZT44KSk7dmFyIEE9ITE7Yi5jYW5Vc2VET00mJihBPWsoXCJpbnB1dFwiKSYmKCFkb2N1bWVudC5kb2N1bWVudE1vZGV8fGRvY3VtZW50LmRvY3VtZW50TW9kZT4xMSkpO3ZhciBEPXtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gTy5nZXQuY2FsbCh0aGlzKX0sc2V0OmZ1bmN0aW9uKGUpe0k9XCJcIitlLE8uc2V0LmNhbGwodGhpcyxlKX19LEw9e2V2ZW50VHlwZXM6UyxleHRyYWN0RXZlbnRzOmZ1bmN0aW9uKGUsdCxuLG8pe3ZhciBpLGEscz10P0UuZ2V0Tm9kZUZyb21JbnN0YW5jZSh0KTp3aW5kb3c7aWYocihzKT9SP2k9dTphPWw6UChzKT9BP2k9ZjooaT1tLGE9aCk6dihzKSYmKGk9ZyksaSl7dmFyIGM9aShlLHQpO2lmKGMpe3ZhciBwPXcuZ2V0UG9vbGVkKFMuY2hhbmdlLGMsbixvKTtyZXR1cm4gcC50eXBlPVwiY2hhbmdlXCIsQy5hY2N1bXVsYXRlVHdvUGhhc2VEaXNwYXRjaGVzKHApLHB9fWEmJmEoZSxzLHQpLFwidG9wQmx1clwiPT09ZSYmeSh0LHMpfX07dC5leHBvcnRzPUx9LHsxMDI6MTAyLDEwOToxMDksMTEwOjExMCwxMjM6MTIzLDE2OjE2LDE5OjE5LDMzOjMzLDcxOjcxLDgwOjgwfV0sODpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSx0KXtyZXR1cm4gQXJyYXkuaXNBcnJheSh0KSYmKHQ9dFsxXSksdD90Lm5leHRTaWJsaW5nOmUuZmlyc3RDaGlsZH1mdW5jdGlvbiBvKGUsdCxuKXtjLmluc2VydFRyZWVCZWZvcmUoZSx0LG4pfWZ1bmN0aW9uIGkoZSx0LG4pe0FycmF5LmlzQXJyYXkodCk/cyhlLHRbMF0sdFsxXSxuKTptKGUsdCxuKX1mdW5jdGlvbiBhKGUsdCl7aWYoQXJyYXkuaXNBcnJheSh0KSl7dmFyIG49dFsxXTt0PXRbMF0sdShlLHQsbiksZS5yZW1vdmVDaGlsZChuKX1lLnJlbW92ZUNoaWxkKHQpfWZ1bmN0aW9uIHMoZSx0LG4scil7Zm9yKHZhciBvPXQ7Oyl7dmFyIGk9by5uZXh0U2libGluZztpZihtKGUsbyxyKSxvPT09bilicmVhaztvPWl9fWZ1bmN0aW9uIHUoZSx0LG4pe2Zvcig7Oyl7dmFyIHI9dC5uZXh0U2libGluZztpZihyPT09bilicmVhaztlLnJlbW92ZUNoaWxkKHIpfX1mdW5jdGlvbiBsKGUsdCxuKXt2YXIgcj1lLnBhcmVudE5vZGUsbz1lLm5leHRTaWJsaW5nO289PT10P24mJm0ocixkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShuKSxvKTpuPyhoKG8sbiksdShyLG8sdCkpOnUocixlLHQpfXZhciBjPWUoOSkscD1lKDEzKSxkPShlKDMzKSxlKDU4KSxlKDkzKSksZj1lKDExNCksaD1lKDExNSksbT1kKGZ1bmN0aW9uKGUsdCxuKXtlLmluc2VydEJlZm9yZSh0LG4pfSksdj1wLmRhbmdlcm91c2x5UmVwbGFjZU5vZGVXaXRoTWFya3VwLGc9e2Rhbmdlcm91c2x5UmVwbGFjZU5vZGVXaXRoTWFya3VwOnYscmVwbGFjZURlbGltaXRlZFRleHQ6bCxwcm9jZXNzVXBkYXRlczpmdW5jdGlvbihlLHQpe2Zvcih2YXIgbj0wO248dC5sZW5ndGg7bisrKXt2YXIgcz10W25dO3N3aXRjaChzLnR5cGUpe2Nhc2VcIklOU0VSVF9NQVJLVVBcIjpvKGUscy5jb250ZW50LHIoZSxzLmFmdGVyTm9kZSkpO2JyZWFrO2Nhc2VcIk1PVkVfRVhJU1RJTkdcIjppKGUscy5mcm9tTm9kZSxyKGUscy5hZnRlck5vZGUpKTticmVhaztjYXNlXCJTRVRfTUFSS1VQXCI6ZihlLHMuY29udGVudCk7YnJlYWs7Y2FzZVwiVEVYVF9DT05URU5UXCI6aChlLHMuY29udGVudCk7YnJlYWs7Y2FzZVwiUkVNT1ZFX05PREVcIjphKGUscy5mcm9tTm9kZSl9fX19O3QuZXhwb3J0cz1nfSx7MTE0OjExNCwxMTU6MTE1LDEzOjEzLDMzOjMzLDU4OjU4LDk6OSw5Mzo5M31dLDk6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe2lmKGgpe3ZhciB0PWUubm9kZSxuPWUuY2hpbGRyZW47aWYobi5sZW5ndGgpZm9yKHZhciByPTA7cjxuLmxlbmd0aDtyKyspbSh0LG5bcl0sbnVsbCk7ZWxzZSBudWxsIT1lLmh0bWw/cCh0LGUuaHRtbCk6bnVsbCE9ZS50ZXh0JiZmKHQsZS50ZXh0KX19ZnVuY3Rpb24gbyhlLHQpe2UucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQodC5ub2RlLGUpLHIodCl9ZnVuY3Rpb24gaShlLHQpe2g/ZS5jaGlsZHJlbi5wdXNoKHQpOmUubm9kZS5hcHBlbmRDaGlsZCh0Lm5vZGUpfWZ1bmN0aW9uIGEoZSx0KXtoP2UuaHRtbD10OnAoZS5ub2RlLHQpfWZ1bmN0aW9uIHMoZSx0KXtoP2UudGV4dD10OmYoZS5ub2RlLHQpfWZ1bmN0aW9uIHUoKXtyZXR1cm4gdGhpcy5ub2RlLm5vZGVOYW1lfWZ1bmN0aW9uIGwoZSl7cmV0dXJue25vZGU6ZSxjaGlsZHJlbjpbXSxodG1sOm51bGwsdGV4dDpudWxsLHRvU3RyaW5nOnV9fXZhciBjPWUoMTApLHA9ZSgxMTQpLGQ9ZSg5MyksZj1lKDExNSksaD1cInVuZGVmaW5lZFwiIT10eXBlb2YgZG9jdW1lbnQmJlwibnVtYmVyXCI9PXR5cGVvZiBkb2N1bWVudC5kb2N1bWVudE1vZGV8fFwidW5kZWZpbmVkXCIhPXR5cGVvZiBuYXZpZ2F0b3ImJlwic3RyaW5nXCI9PXR5cGVvZiBuYXZpZ2F0b3IudXNlckFnZW50JiYvXFxiRWRnZVxcL1xcZC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSxtPWQoZnVuY3Rpb24oZSx0LG4pezExPT09dC5ub2RlLm5vZGVUeXBlfHwxPT09dC5ub2RlLm5vZGVUeXBlJiZcIm9iamVjdFwiPT09dC5ub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkmJihudWxsPT10Lm5vZGUubmFtZXNwYWNlVVJJfHx0Lm5vZGUubmFtZXNwYWNlVVJJPT09Yy5odG1sKT8ocih0KSxlLmluc2VydEJlZm9yZSh0Lm5vZGUsbikpOihlLmluc2VydEJlZm9yZSh0Lm5vZGUsbikscih0KSl9KTtsLmluc2VydFRyZWVCZWZvcmU9bSxsLnJlcGxhY2VDaGlsZFdpdGhUcmVlPW8sbC5xdWV1ZUNoaWxkPWksbC5xdWV1ZUhUTUw9YSxsLnF1ZXVlVGV4dD1zLHQuZXhwb3J0cz1sfSx7MTA6MTAsMTE0OjExNCwxMTU6MTE1LDkzOjkzfV0sMTA6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj17aHRtbDpcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIixtYXRobWw6XCJodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MXCIsc3ZnOlwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIn07dC5leHBvcnRzPXJ9LHt9XSwxMTpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSx0KXtyZXR1cm4oZSZ0KT09PXR9dmFyIG89ZSgxMTIpLGk9KGUoMTM3KSx7TVVTVF9VU0VfUFJPUEVSVFk6MSxIQVNfQk9PTEVBTl9WQUxVRTo0LEhBU19OVU1FUklDX1ZBTFVFOjgsSEFTX1BPU0lUSVZFX05VTUVSSUNfVkFMVUU6MjQsSEFTX09WRVJMT0FERURfQk9PTEVBTl9WQUxVRTozMixpbmplY3RET01Qcm9wZXJ0eUNvbmZpZzpmdW5jdGlvbihlKXt2YXIgdD1pLG49ZS5Qcm9wZXJ0aWVzfHx7fSxhPWUuRE9NQXR0cmlidXRlTmFtZXNwYWNlc3x8e30sdT1lLkRPTUF0dHJpYnV0ZU5hbWVzfHx7fSxsPWUuRE9NUHJvcGVydHlOYW1lc3x8e30sYz1lLkRPTU11dGF0aW9uTWV0aG9kc3x8e307ZS5pc0N1c3RvbUF0dHJpYnV0ZSYmcy5faXNDdXN0b21BdHRyaWJ1dGVGdW5jdGlvbnMucHVzaChlLmlzQ3VzdG9tQXR0cmlidXRlKTtmb3IodmFyIHAgaW4gbil7cy5wcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHApJiZvKFwiNDhcIixwKTt2YXIgZD1wLnRvTG93ZXJDYXNlKCksZj1uW3BdLGg9e2F0dHJpYnV0ZU5hbWU6ZCxhdHRyaWJ1dGVOYW1lc3BhY2U6bnVsbCxwcm9wZXJ0eU5hbWU6cCxtdXRhdGlvbk1ldGhvZDpudWxsLG11c3RVc2VQcm9wZXJ0eTpyKGYsdC5NVVNUX1VTRV9QUk9QRVJUWSksaGFzQm9vbGVhblZhbHVlOnIoZix0LkhBU19CT09MRUFOX1ZBTFVFKSxoYXNOdW1lcmljVmFsdWU6cihmLHQuSEFTX05VTUVSSUNfVkFMVUUpLGhhc1Bvc2l0aXZlTnVtZXJpY1ZhbHVlOnIoZix0LkhBU19QT1NJVElWRV9OVU1FUklDX1ZBTFVFKSxoYXNPdmVybG9hZGVkQm9vbGVhblZhbHVlOnIoZix0LkhBU19PVkVSTE9BREVEX0JPT0xFQU5fVkFMVUUpfTtpZihoLmhhc0Jvb2xlYW5WYWx1ZStoLmhhc051bWVyaWNWYWx1ZStoLmhhc092ZXJsb2FkZWRCb29sZWFuVmFsdWU8PTF8fG8oXCI1MFwiLHApLHUuaGFzT3duUHJvcGVydHkocCkpe3ZhciBtPXVbcF07aC5hdHRyaWJ1dGVOYW1lPW19YS5oYXNPd25Qcm9wZXJ0eShwKSYmKGguYXR0cmlidXRlTmFtZXNwYWNlPWFbcF0pLGwuaGFzT3duUHJvcGVydHkocCkmJihoLnByb3BlcnR5TmFtZT1sW3BdKSxjLmhhc093blByb3BlcnR5KHApJiYoaC5tdXRhdGlvbk1ldGhvZD1jW3BdKSxzLnByb3BlcnRpZXNbcF09aH19fSksYT1cIjpBLVpfYS16XFxcXHUwMEMwLVxcXFx1MDBENlxcXFx1MDBEOC1cXFxcdTAwRjZcXFxcdTAwRjgtXFxcXHUwMkZGXFxcXHUwMzcwLVxcXFx1MDM3RFxcXFx1MDM3Ri1cXFxcdTFGRkZcXFxcdTIwMEMtXFxcXHUyMDBEXFxcXHUyMDcwLVxcXFx1MjE4RlxcXFx1MkMwMC1cXFxcdTJGRUZcXFxcdTMwMDEtXFxcXHVEN0ZGXFxcXHVGOTAwLVxcXFx1RkRDRlxcXFx1RkRGMC1cXFxcdUZGRkRcIixzPXtJRF9BVFRSSUJVVEVfTkFNRTpcImRhdGEtcmVhY3RpZFwiLFJPT1RfQVRUUklCVVRFX05BTUU6XCJkYXRhLXJlYWN0cm9vdFwiLEFUVFJJQlVURV9OQU1FX1NUQVJUX0NIQVI6YSxBVFRSSUJVVEVfTkFNRV9DSEFSOmErXCJcXFxcLS4wLTlcXFxcdTAwQjdcXFxcdTAzMDAtXFxcXHUwMzZGXFxcXHUyMDNGLVxcXFx1MjA0MFwiLHByb3BlcnRpZXM6e30sZ2V0UG9zc2libGVTdGFuZGFyZE5hbWU6bnVsbCxfaXNDdXN0b21BdHRyaWJ1dGVGdW5jdGlvbnM6W10saXNDdXN0b21BdHRyaWJ1dGU6ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PTA7dDxzLl9pc0N1c3RvbUF0dHJpYnV0ZUZ1bmN0aW9ucy5sZW5ndGg7dCsrKWlmKCgwLHMuX2lzQ3VzdG9tQXR0cmlidXRlRnVuY3Rpb25zW3RdKShlKSlyZXR1cm4hMDtyZXR1cm4hMX0saW5qZWN0aW9uOml9O3QuZXhwb3J0cz1zfSx7MTEyOjExMiwxMzc6MTM3fV0sMTI6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe3JldHVybiEhbC5oYXNPd25Qcm9wZXJ0eShlKXx8IXUuaGFzT3duUHJvcGVydHkoZSkmJihzLnRlc3QoZSk/KGxbZV09ITAsITApOih1W2VdPSEwLCExKSl9ZnVuY3Rpb24gbyhlLHQpe3JldHVybiBudWxsPT10fHxlLmhhc0Jvb2xlYW5WYWx1ZSYmIXR8fGUuaGFzTnVtZXJpY1ZhbHVlJiZpc05hTih0KXx8ZS5oYXNQb3NpdGl2ZU51bWVyaWNWYWx1ZSYmdDwxfHxlLmhhc092ZXJsb2FkZWRCb29sZWFuVmFsdWUmJiExPT09dH12YXIgaT1lKDExKSxhPShlKDMzKSxlKDU4KSxlKDExMSkpLHM9KGUoMTQyKSxuZXcgUmVnRXhwKFwiXltcIitpLkFUVFJJQlVURV9OQU1FX1NUQVJUX0NIQVIrXCJdW1wiK2kuQVRUUklCVVRFX05BTUVfQ0hBUitcIl0qJFwiKSksdT17fSxsPXt9LGM9e2NyZWF0ZU1hcmt1cEZvcklEOmZ1bmN0aW9uKGUpe3JldHVybiBpLklEX0FUVFJJQlVURV9OQU1FK1wiPVwiK2EoZSl9LHNldEF0dHJpYnV0ZUZvcklEOmZ1bmN0aW9uKGUsdCl7ZS5zZXRBdHRyaWJ1dGUoaS5JRF9BVFRSSUJVVEVfTkFNRSx0KX0sY3JlYXRlTWFya3VwRm9yUm9vdDpmdW5jdGlvbigpe3JldHVybiBpLlJPT1RfQVRUUklCVVRFX05BTUUrJz1cIlwiJ30sc2V0QXR0cmlidXRlRm9yUm9vdDpmdW5jdGlvbihlKXtlLnNldEF0dHJpYnV0ZShpLlJPT1RfQVRUUklCVVRFX05BTUUsXCJcIil9LGNyZWF0ZU1hcmt1cEZvclByb3BlcnR5OmZ1bmN0aW9uKGUsdCl7dmFyIG49aS5wcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGUpP2kucHJvcGVydGllc1tlXTpudWxsO2lmKG4pe2lmKG8obix0KSlyZXR1cm5cIlwiO3ZhciByPW4uYXR0cmlidXRlTmFtZTtyZXR1cm4gbi5oYXNCb29sZWFuVmFsdWV8fG4uaGFzT3ZlcmxvYWRlZEJvb2xlYW5WYWx1ZSYmITA9PT10P3IrJz1cIlwiJzpyK1wiPVwiK2EodCl9cmV0dXJuIGkuaXNDdXN0b21BdHRyaWJ1dGUoZSk/bnVsbD09dD9cIlwiOmUrXCI9XCIrYSh0KTpudWxsfSxjcmVhdGVNYXJrdXBGb3JDdXN0b21BdHRyaWJ1dGU6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gcihlKSYmbnVsbCE9dD9lK1wiPVwiK2EodCk6XCJcIn0sc2V0VmFsdWVGb3JQcm9wZXJ0eTpmdW5jdGlvbihlLHQsbil7dmFyIHI9aS5wcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHQpP2kucHJvcGVydGllc1t0XTpudWxsO2lmKHIpe3ZhciBhPXIubXV0YXRpb25NZXRob2Q7aWYoYSlhKGUsbik7ZWxzZXtpZihvKHIsbikpcmV0dXJuIHZvaWQgdGhpcy5kZWxldGVWYWx1ZUZvclByb3BlcnR5KGUsdCk7aWYoci5tdXN0VXNlUHJvcGVydHkpZVtyLnByb3BlcnR5TmFtZV09bjtlbHNle3ZhciBzPXIuYXR0cmlidXRlTmFtZSx1PXIuYXR0cmlidXRlTmFtZXNwYWNlO3U/ZS5zZXRBdHRyaWJ1dGVOUyh1LHMsXCJcIituKTpyLmhhc0Jvb2xlYW5WYWx1ZXx8ci5oYXNPdmVybG9hZGVkQm9vbGVhblZhbHVlJiYhMD09PW4/ZS5zZXRBdHRyaWJ1dGUocyxcIlwiKTplLnNldEF0dHJpYnV0ZShzLFwiXCIrbil9fX1lbHNlIGlmKGkuaXNDdXN0b21BdHRyaWJ1dGUodCkpcmV0dXJuIHZvaWQgYy5zZXRWYWx1ZUZvckF0dHJpYnV0ZShlLHQsbil9LHNldFZhbHVlRm9yQXR0cmlidXRlOmZ1bmN0aW9uKGUsdCxuKXtyKHQpJiYobnVsbD09bj9lLnJlbW92ZUF0dHJpYnV0ZSh0KTplLnNldEF0dHJpYnV0ZSh0LFwiXCIrbikpfSxkZWxldGVWYWx1ZUZvckF0dHJpYnV0ZTpmdW5jdGlvbihlLHQpe2UucmVtb3ZlQXR0cmlidXRlKHQpfSxkZWxldGVWYWx1ZUZvclByb3BlcnR5OmZ1bmN0aW9uKGUsdCl7dmFyIG49aS5wcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHQpP2kucHJvcGVydGllc1t0XTpudWxsO2lmKG4pe3ZhciByPW4ubXV0YXRpb25NZXRob2Q7aWYocilyKGUsdm9pZCAwKTtlbHNlIGlmKG4ubXVzdFVzZVByb3BlcnR5KXt2YXIgbz1uLnByb3BlcnR5TmFtZTtuLmhhc0Jvb2xlYW5WYWx1ZT9lW29dPSExOmVbb109XCJcIn1lbHNlIGUucmVtb3ZlQXR0cmlidXRlKG4uYXR0cmlidXRlTmFtZSl9ZWxzZSBpLmlzQ3VzdG9tQXR0cmlidXRlKHQpJiZlLnJlbW92ZUF0dHJpYnV0ZSh0KX19O3QuZXhwb3J0cz1jfSx7MTE6MTEsMTExOjExMSwxNDI6MTQyLDMzOjMzLDU4OjU4fV0sMTM6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1lKDExMiksbz1lKDkpLGk9ZSgxMjMpLGE9ZSgxMjgpLHM9ZSgxMjkpLHU9KGUoMTM3KSx7ZGFuZ2Vyb3VzbHlSZXBsYWNlTm9kZVdpdGhNYXJrdXA6ZnVuY3Rpb24oZSx0KXtpZihpLmNhblVzZURPTXx8cihcIjU2XCIpLHR8fHIoXCI1N1wiKSxcIkhUTUxcIj09PWUubm9kZU5hbWUmJnIoXCI1OFwiKSxcInN0cmluZ1wiPT10eXBlb2YgdCl7dmFyIG49YSh0LHMpWzBdO2UucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobixlKX1lbHNlIG8ucmVwbGFjZUNoaWxkV2l0aFRyZWUoZSx0KX19KTt0LmV4cG9ydHM9dX0sezExMjoxMTIsMTIzOjEyMywxMjg6MTI4LDEyOToxMjksMTM3OjEzNyw5Ojl9XSwxNDpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3ZhciByPVtcIlJlc3BvbmRlckV2ZW50UGx1Z2luXCIsXCJTaW1wbGVFdmVudFBsdWdpblwiLFwiVGFwRXZlbnRQbHVnaW5cIixcIkVudGVyTGVhdmVFdmVudFBsdWdpblwiLFwiQ2hhbmdlRXZlbnRQbHVnaW5cIixcIlNlbGVjdEV2ZW50UGx1Z2luXCIsXCJCZWZvcmVJbnB1dEV2ZW50UGx1Z2luXCJdO3QuZXhwb3J0cz1yfSx7fV0sMTU6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1lKDE5KSxvPWUoMzMpLGk9ZSg4NCksYT17bW91c2VFbnRlcjp7cmVnaXN0cmF0aW9uTmFtZTpcIm9uTW91c2VFbnRlclwiLGRlcGVuZGVuY2llczpbXCJ0b3BNb3VzZU91dFwiLFwidG9wTW91c2VPdmVyXCJdfSxtb3VzZUxlYXZlOntyZWdpc3RyYXRpb25OYW1lOlwib25Nb3VzZUxlYXZlXCIsZGVwZW5kZW5jaWVzOltcInRvcE1vdXNlT3V0XCIsXCJ0b3BNb3VzZU92ZXJcIl19fSxzPXtldmVudFR5cGVzOmEsZXh0cmFjdEV2ZW50czpmdW5jdGlvbihlLHQsbixzKXtpZihcInRvcE1vdXNlT3ZlclwiPT09ZSYmKG4ucmVsYXRlZFRhcmdldHx8bi5mcm9tRWxlbWVudCkpcmV0dXJuIG51bGw7aWYoXCJ0b3BNb3VzZU91dFwiIT09ZSYmXCJ0b3BNb3VzZU92ZXJcIiE9PWUpcmV0dXJuIG51bGw7dmFyIHU7aWYocy53aW5kb3c9PT1zKXU9cztlbHNle3ZhciBsPXMub3duZXJEb2N1bWVudDt1PWw/bC5kZWZhdWx0Vmlld3x8bC5wYXJlbnRXaW5kb3c6d2luZG93fXZhciBjLHA7aWYoXCJ0b3BNb3VzZU91dFwiPT09ZSl7Yz10O3ZhciBkPW4ucmVsYXRlZFRhcmdldHx8bi50b0VsZW1lbnQ7cD1kP28uZ2V0Q2xvc2VzdEluc3RhbmNlRnJvbU5vZGUoZCk6bnVsbH1lbHNlIGM9bnVsbCxwPXQ7aWYoYz09PXApcmV0dXJuIG51bGw7dmFyIGY9bnVsbD09Yz91Om8uZ2V0Tm9kZUZyb21JbnN0YW5jZShjKSxoPW51bGw9PXA/dTpvLmdldE5vZGVGcm9tSW5zdGFuY2UocCksbT1pLmdldFBvb2xlZChhLm1vdXNlTGVhdmUsYyxuLHMpO20udHlwZT1cIm1vdXNlbGVhdmVcIixtLnRhcmdldD1mLG0ucmVsYXRlZFRhcmdldD1oO3ZhciB2PWkuZ2V0UG9vbGVkKGEubW91c2VFbnRlcixwLG4scyk7cmV0dXJuIHYudHlwZT1cIm1vdXNlZW50ZXJcIix2LnRhcmdldD1oLHYucmVsYXRlZFRhcmdldD1mLHIuYWNjdW11bGF0ZUVudGVyTGVhdmVEaXNwYXRjaGVzKG0sdixjLHApLFttLHZdfX07dC5leHBvcnRzPXN9LHsxOToxOSwzMzozMyw4NDo4NH1dLDE2OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtyZXR1cm5cImJ1dHRvblwiPT09ZXx8XCJpbnB1dFwiPT09ZXx8XCJzZWxlY3RcIj09PWV8fFwidGV4dGFyZWFcIj09PWV9ZnVuY3Rpb24gbyhlLHQsbil7c3dpdGNoKGUpe2Nhc2VcIm9uQ2xpY2tcIjpjYXNlXCJvbkNsaWNrQ2FwdHVyZVwiOmNhc2VcIm9uRG91YmxlQ2xpY2tcIjpjYXNlXCJvbkRvdWJsZUNsaWNrQ2FwdHVyZVwiOmNhc2VcIm9uTW91c2VEb3duXCI6Y2FzZVwib25Nb3VzZURvd25DYXB0dXJlXCI6Y2FzZVwib25Nb3VzZU1vdmVcIjpjYXNlXCJvbk1vdXNlTW92ZUNhcHR1cmVcIjpjYXNlXCJvbk1vdXNlVXBcIjpjYXNlXCJvbk1vdXNlVXBDYXB0dXJlXCI6cmV0dXJuISghbi5kaXNhYmxlZHx8IXIodCkpO2RlZmF1bHQ6cmV0dXJuITF9fXZhciBpPWUoMTEyKSxhPWUoMTcpLHM9ZSgxOCksdT1lKDUwKSxsPWUoOTEpLGM9ZSg5OCkscD0oZSgxMzcpLHt9KSxkPW51bGwsZj1mdW5jdGlvbihlLHQpe2UmJihzLmV4ZWN1dGVEaXNwYXRjaGVzSW5PcmRlcihlLHQpLGUuaXNQZXJzaXN0ZW50KCl8fGUuY29uc3RydWN0b3IucmVsZWFzZShlKSl9LGg9ZnVuY3Rpb24oZSl7cmV0dXJuIGYoZSwhMCl9LG09ZnVuY3Rpb24oZSl7cmV0dXJuIGYoZSwhMSl9LHY9ZnVuY3Rpb24oZSl7cmV0dXJuXCIuXCIrZS5fcm9vdE5vZGVJRH0sZz17aW5qZWN0aW9uOntpbmplY3RFdmVudFBsdWdpbk9yZGVyOmEuaW5qZWN0RXZlbnRQbHVnaW5PcmRlcixpbmplY3RFdmVudFBsdWdpbnNCeU5hbWU6YS5pbmplY3RFdmVudFBsdWdpbnNCeU5hbWV9LHB1dExpc3RlbmVyOmZ1bmN0aW9uKGUsdCxuKXtcImZ1bmN0aW9uXCIhPXR5cGVvZiBuJiZpKFwiOTRcIix0LHR5cGVvZiBuKTt2YXIgcj12KGUpOyhwW3RdfHwocFt0XT17fSkpW3JdPW47dmFyIG89YS5yZWdpc3RyYXRpb25OYW1lTW9kdWxlc1t0XTtvJiZvLmRpZFB1dExpc3RlbmVyJiZvLmRpZFB1dExpc3RlbmVyKGUsdCxuKX0sZ2V0TGlzdGVuZXI6ZnVuY3Rpb24oZSx0KXt2YXIgbj1wW3RdO2lmKG8odCxlLl9jdXJyZW50RWxlbWVudC50eXBlLGUuX2N1cnJlbnRFbGVtZW50LnByb3BzKSlyZXR1cm4gbnVsbDt2YXIgcj12KGUpO3JldHVybiBuJiZuW3JdfSxkZWxldGVMaXN0ZW5lcjpmdW5jdGlvbihlLHQpe3ZhciBuPWEucmVnaXN0cmF0aW9uTmFtZU1vZHVsZXNbdF07biYmbi53aWxsRGVsZXRlTGlzdGVuZXImJm4ud2lsbERlbGV0ZUxpc3RlbmVyKGUsdCk7dmFyIHI9cFt0XTtyJiZkZWxldGUgclt2KGUpXX0sZGVsZXRlQWxsTGlzdGVuZXJzOmZ1bmN0aW9uKGUpe3ZhciB0PXYoZSk7Zm9yKHZhciBuIGluIHApaWYocC5oYXNPd25Qcm9wZXJ0eShuKSYmcFtuXVt0XSl7dmFyIHI9YS5yZWdpc3RyYXRpb25OYW1lTW9kdWxlc1tuXTtyJiZyLndpbGxEZWxldGVMaXN0ZW5lciYmci53aWxsRGVsZXRlTGlzdGVuZXIoZSxuKSxkZWxldGUgcFtuXVt0XX19LGV4dHJhY3RFdmVudHM6ZnVuY3Rpb24oZSx0LG4scil7Zm9yKHZhciBvLGk9YS5wbHVnaW5zLHM9MDtzPGkubGVuZ3RoO3MrKyl7dmFyIHU9aVtzXTtpZih1KXt2YXIgYz11LmV4dHJhY3RFdmVudHMoZSx0LG4scik7YyYmKG89bChvLGMpKX19cmV0dXJuIG99LGVucXVldWVFdmVudHM6ZnVuY3Rpb24oZSl7ZSYmKGQ9bChkLGUpKX0scHJvY2Vzc0V2ZW50UXVldWU6ZnVuY3Rpb24oZSl7dmFyIHQ9ZDtkPW51bGwsZT9jKHQsaCk6Yyh0LG0pLGQmJmkoXCI5NVwiKSx1LnJldGhyb3dDYXVnaHRFcnJvcigpfSxfX3B1cmdlOmZ1bmN0aW9uKCl7cD17fX0sX19nZXRMaXN0ZW5lckJhbms6ZnVuY3Rpb24oKXtyZXR1cm4gcH19O3QuZXhwb3J0cz1nfSx7MTEyOjExMiwxMzc6MTM3LDE3OjE3LDE4OjE4LDUwOjUwLDkxOjkxLDk4Ojk4fV0sMTc6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKCl7aWYocylmb3IodmFyIGUgaW4gdSl7dmFyIHQ9dVtlXSxuPXMuaW5kZXhPZihlKTtpZihuPi0xfHxhKFwiOTZcIixlKSwhbC5wbHVnaW5zW25dKXt0LmV4dHJhY3RFdmVudHN8fGEoXCI5N1wiLGUpLGwucGx1Z2luc1tuXT10O3ZhciByPXQuZXZlbnRUeXBlcztmb3IodmFyIGkgaW4gcilvKHJbaV0sdCxpKXx8YShcIjk4XCIsaSxlKX19fWZ1bmN0aW9uIG8oZSx0LG4pe2wuZXZlbnROYW1lRGlzcGF0Y2hDb25maWdzLmhhc093blByb3BlcnR5KG4pJiZhKFwiOTlcIixuKSxsLmV2ZW50TmFtZURpc3BhdGNoQ29uZmlnc1tuXT1lO3ZhciByPWUucGhhc2VkUmVnaXN0cmF0aW9uTmFtZXM7aWYocil7Zm9yKHZhciBvIGluIHIpaWYoci5oYXNPd25Qcm9wZXJ0eShvKSl7dmFyIHM9cltvXTtpKHMsdCxuKX1yZXR1cm4hMH1yZXR1cm4hIWUucmVnaXN0cmF0aW9uTmFtZSYmKGkoZS5yZWdpc3RyYXRpb25OYW1lLHQsbiksITApfWZ1bmN0aW9uIGkoZSx0LG4pe2wucmVnaXN0cmF0aW9uTmFtZU1vZHVsZXNbZV0mJmEoXCIxMDBcIixlKSxsLnJlZ2lzdHJhdGlvbk5hbWVNb2R1bGVzW2VdPXQsbC5yZWdpc3RyYXRpb25OYW1lRGVwZW5kZW5jaWVzW2VdPXQuZXZlbnRUeXBlc1tuXS5kZXBlbmRlbmNpZXN9dmFyIGE9ZSgxMTIpLHM9KGUoMTM3KSxudWxsKSx1PXt9LGw9e3BsdWdpbnM6W10sZXZlbnROYW1lRGlzcGF0Y2hDb25maWdzOnt9LHJlZ2lzdHJhdGlvbk5hbWVNb2R1bGVzOnt9LHJlZ2lzdHJhdGlvbk5hbWVEZXBlbmRlbmNpZXM6e30scG9zc2libGVSZWdpc3RyYXRpb25OYW1lczpudWxsLGluamVjdEV2ZW50UGx1Z2luT3JkZXI6ZnVuY3Rpb24oZSl7cyYmYShcIjEwMVwiKSxzPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpLHIoKX0saW5qZWN0RXZlbnRQbHVnaW5zQnlOYW1lOmZ1bmN0aW9uKGUpe3ZhciB0PSExO2Zvcih2YXIgbiBpbiBlKWlmKGUuaGFzT3duUHJvcGVydHkobikpe3ZhciBvPWVbbl07dS5oYXNPd25Qcm9wZXJ0eShuKSYmdVtuXT09PW98fCh1W25dJiZhKFwiMTAyXCIsbiksdVtuXT1vLHQ9ITApfXQmJnIoKX0sZ2V0UGx1Z2luTW9kdWxlRm9yRXZlbnQ6ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5kaXNwYXRjaENvbmZpZztpZih0LnJlZ2lzdHJhdGlvbk5hbWUpcmV0dXJuIGwucmVnaXN0cmF0aW9uTmFtZU1vZHVsZXNbdC5yZWdpc3RyYXRpb25OYW1lXXx8bnVsbDtpZih2b2lkIDAhPT10LnBoYXNlZFJlZ2lzdHJhdGlvbk5hbWVzKXt2YXIgbj10LnBoYXNlZFJlZ2lzdHJhdGlvbk5hbWVzO2Zvcih2YXIgciBpbiBuKWlmKG4uaGFzT3duUHJvcGVydHkocikpe3ZhciBvPWwucmVnaXN0cmF0aW9uTmFtZU1vZHVsZXNbbltyXV07aWYobylyZXR1cm4gb319cmV0dXJuIG51bGx9LF9yZXNldEV2ZW50UGx1Z2luczpmdW5jdGlvbigpe3M9bnVsbDtmb3IodmFyIGUgaW4gdSl1Lmhhc093blByb3BlcnR5KGUpJiZkZWxldGUgdVtlXTtsLnBsdWdpbnMubGVuZ3RoPTA7dmFyIHQ9bC5ldmVudE5hbWVEaXNwYXRjaENvbmZpZ3M7Zm9yKHZhciBuIGluIHQpdC5oYXNPd25Qcm9wZXJ0eShuKSYmZGVsZXRlIHRbbl07dmFyIHI9bC5yZWdpc3RyYXRpb25OYW1lTW9kdWxlcztmb3IodmFyIG8gaW4gcilyLmhhc093blByb3BlcnR5KG8pJiZkZWxldGUgcltvXX19O3QuZXhwb3J0cz1sfSx7MTEyOjExMiwxMzc6MTM3fV0sMTg6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe3JldHVyblwidG9wTW91c2VVcFwiPT09ZXx8XCJ0b3BUb3VjaEVuZFwiPT09ZXx8XCJ0b3BUb3VjaENhbmNlbFwiPT09ZX1mdW5jdGlvbiBvKGUpe3JldHVyblwidG9wTW91c2VNb3ZlXCI9PT1lfHxcInRvcFRvdWNoTW92ZVwiPT09ZX1mdW5jdGlvbiBpKGUpe3JldHVyblwidG9wTW91c2VEb3duXCI9PT1lfHxcInRvcFRvdWNoU3RhcnRcIj09PWV9ZnVuY3Rpb24gYShlLHQsbixyKXt2YXIgbz1lLnR5cGV8fFwidW5rbm93bi1ldmVudFwiO2UuY3VycmVudFRhcmdldD1nLmdldE5vZGVGcm9tSW5zdGFuY2UociksdD9tLmludm9rZUd1YXJkZWRDYWxsYmFja1dpdGhDYXRjaChvLG4sZSk6bS5pbnZva2VHdWFyZGVkQ2FsbGJhY2sobyxuLGUpLGUuY3VycmVudFRhcmdldD1udWxsfWZ1bmN0aW9uIHMoZSx0KXt2YXIgbj1lLl9kaXNwYXRjaExpc3RlbmVycyxyPWUuX2Rpc3BhdGNoSW5zdGFuY2VzO2lmKEFycmF5LmlzQXJyYXkobikpZm9yKHZhciBvPTA7bzxuLmxlbmd0aCYmIWUuaXNQcm9wYWdhdGlvblN0b3BwZWQoKTtvKyspYShlLHQsbltvXSxyW29dKTtlbHNlIG4mJmEoZSx0LG4scik7ZS5fZGlzcGF0Y2hMaXN0ZW5lcnM9bnVsbCxlLl9kaXNwYXRjaEluc3RhbmNlcz1udWxsfWZ1bmN0aW9uIHUoZSl7dmFyIHQ9ZS5fZGlzcGF0Y2hMaXN0ZW5lcnMsbj1lLl9kaXNwYXRjaEluc3RhbmNlcztpZihBcnJheS5pc0FycmF5KHQpKXtmb3IodmFyIHI9MDtyPHQubGVuZ3RoJiYhZS5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpO3IrKylpZih0W3JdKGUsbltyXSkpcmV0dXJuIG5bcl19ZWxzZSBpZih0JiZ0KGUsbikpcmV0dXJuIG47cmV0dXJuIG51bGx9ZnVuY3Rpb24gbChlKXt2YXIgdD11KGUpO3JldHVybiBlLl9kaXNwYXRjaEluc3RhbmNlcz1udWxsLGUuX2Rpc3BhdGNoTGlzdGVuZXJzPW51bGwsdH1mdW5jdGlvbiBjKGUpe3ZhciB0PWUuX2Rpc3BhdGNoTGlzdGVuZXJzLG49ZS5fZGlzcGF0Y2hJbnN0YW5jZXM7QXJyYXkuaXNBcnJheSh0KSYmaChcIjEwM1wiKSxlLmN1cnJlbnRUYXJnZXQ9dD9nLmdldE5vZGVGcm9tSW5zdGFuY2Uobik6bnVsbDt2YXIgcj10P3QoZSk6bnVsbDtyZXR1cm4gZS5jdXJyZW50VGFyZ2V0PW51bGwsZS5fZGlzcGF0Y2hMaXN0ZW5lcnM9bnVsbCxlLl9kaXNwYXRjaEluc3RhbmNlcz1udWxsLHJ9ZnVuY3Rpb24gcChlKXtyZXR1cm4hIWUuX2Rpc3BhdGNoTGlzdGVuZXJzfXZhciBkLGYsaD1lKDExMiksbT1lKDUwKSx2PShlKDEzNyksZSgxNDIpLHtpbmplY3RDb21wb25lbnRUcmVlOmZ1bmN0aW9uKGUpe2Q9ZX0saW5qZWN0VHJlZVRyYXZlcnNhbDpmdW5jdGlvbihlKXtmPWV9fSksZz17aXNFbmRpc2g6cixpc01vdmVpc2g6byxpc1N0YXJ0aXNoOmksZXhlY3V0ZURpcmVjdERpc3BhdGNoOmMsZXhlY3V0ZURpc3BhdGNoZXNJbk9yZGVyOnMsZXhlY3V0ZURpc3BhdGNoZXNJbk9yZGVyU3RvcEF0VHJ1ZTpsLGhhc0Rpc3BhdGNoZXM6cCxnZXRJbnN0YW5jZUZyb21Ob2RlOmZ1bmN0aW9uKGUpe3JldHVybiBkLmdldEluc3RhbmNlRnJvbU5vZGUoZSl9LGdldE5vZGVGcm9tSW5zdGFuY2U6ZnVuY3Rpb24oZSl7cmV0dXJuIGQuZ2V0Tm9kZUZyb21JbnN0YW5jZShlKX0saXNBbmNlc3RvcjpmdW5jdGlvbihlLHQpe3JldHVybiBmLmlzQW5jZXN0b3IoZSx0KX0sZ2V0TG93ZXN0Q29tbW9uQW5jZXN0b3I6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZi5nZXRMb3dlc3RDb21tb25BbmNlc3RvcihlLHQpfSxnZXRQYXJlbnRJbnN0YW5jZTpmdW5jdGlvbihlKXtyZXR1cm4gZi5nZXRQYXJlbnRJbnN0YW5jZShlKX0sdHJhdmVyc2VUd29QaGFzZTpmdW5jdGlvbihlLHQsbil7cmV0dXJuIGYudHJhdmVyc2VUd29QaGFzZShlLHQsbil9LHRyYXZlcnNlRW50ZXJMZWF2ZTpmdW5jdGlvbihlLHQsbixyLG8pe3JldHVybiBmLnRyYXZlcnNlRW50ZXJMZWF2ZShlLHQsbixyLG8pfSxpbmplY3Rpb246dn07dC5leHBvcnRzPWd9LHsxMTI6MTEyLDEzNzoxMzcsMTQyOjE0Miw1MDo1MH1dLDE5OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlLHQsbil7dmFyIHI9dC5kaXNwYXRjaENvbmZpZy5waGFzZWRSZWdpc3RyYXRpb25OYW1lc1tuXTtyZXR1cm4gZyhlLHIpfWZ1bmN0aW9uIG8oZSx0LG4pe3ZhciBvPXIoZSxuLHQpO28mJihuLl9kaXNwYXRjaExpc3RlbmVycz1tKG4uX2Rpc3BhdGNoTGlzdGVuZXJzLG8pLG4uX2Rpc3BhdGNoSW5zdGFuY2VzPW0obi5fZGlzcGF0Y2hJbnN0YW5jZXMsZSkpfWZ1bmN0aW9uIGkoZSl7ZSYmZS5kaXNwYXRjaENvbmZpZy5waGFzZWRSZWdpc3RyYXRpb25OYW1lcyYmaC50cmF2ZXJzZVR3b1BoYXNlKGUuX3RhcmdldEluc3QsbyxlKX1mdW5jdGlvbiBhKGUpe2lmKGUmJmUuZGlzcGF0Y2hDb25maWcucGhhc2VkUmVnaXN0cmF0aW9uTmFtZXMpe3ZhciB0PWUuX3RhcmdldEluc3Qsbj10P2guZ2V0UGFyZW50SW5zdGFuY2UodCk6bnVsbDtoLnRyYXZlcnNlVHdvUGhhc2UobixvLGUpfX1mdW5jdGlvbiBzKGUsdCxuKXtpZihuJiZuLmRpc3BhdGNoQ29uZmlnLnJlZ2lzdHJhdGlvbk5hbWUpe3ZhciByPW4uZGlzcGF0Y2hDb25maWcucmVnaXN0cmF0aW9uTmFtZSxvPWcoZSxyKTtvJiYobi5fZGlzcGF0Y2hMaXN0ZW5lcnM9bShuLl9kaXNwYXRjaExpc3RlbmVycyxvKSxuLl9kaXNwYXRjaEluc3RhbmNlcz1tKG4uX2Rpc3BhdGNoSW5zdGFuY2VzLGUpKX19ZnVuY3Rpb24gdShlKXtlJiZlLmRpc3BhdGNoQ29uZmlnLnJlZ2lzdHJhdGlvbk5hbWUmJnMoZS5fdGFyZ2V0SW5zdCxudWxsLGUpfWZ1bmN0aW9uIGwoZSl7dihlLGkpfWZ1bmN0aW9uIGMoZSl7dihlLGEpfWZ1bmN0aW9uIHAoZSx0LG4scil7aC50cmF2ZXJzZUVudGVyTGVhdmUobixyLHMsZSx0KX1mdW5jdGlvbiBkKGUpe3YoZSx1KX12YXIgZj1lKDE2KSxoPWUoMTgpLG09ZSg5MSksdj1lKDk4KSxnPShlKDE0MiksZi5nZXRMaXN0ZW5lcikseT17YWNjdW11bGF0ZVR3b1BoYXNlRGlzcGF0Y2hlczpsLGFjY3VtdWxhdGVUd29QaGFzZURpc3BhdGNoZXNTa2lwVGFyZ2V0OmMsYWNjdW11bGF0ZURpcmVjdERpc3BhdGNoZXM6ZCxhY2N1bXVsYXRlRW50ZXJMZWF2ZURpc3BhdGNoZXM6cH07dC5leHBvcnRzPXl9LHsxNDI6MTQyLDE2OjE2LDE4OjE4LDkxOjkxLDk4Ojk4fV0sMjA6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe3RoaXMuX3Jvb3Q9ZSx0aGlzLl9zdGFydFRleHQ9dGhpcy5nZXRUZXh0KCksdGhpcy5fZmFsbGJhY2tUZXh0PW51bGx9dmFyIG89ZSgxNDMpLGk9ZSgyNCksYT1lKDEwNik7byhyLnByb3RvdHlwZSx7ZGVzdHJ1Y3RvcjpmdW5jdGlvbigpe3RoaXMuX3Jvb3Q9bnVsbCx0aGlzLl9zdGFydFRleHQ9bnVsbCx0aGlzLl9mYWxsYmFja1RleHQ9bnVsbH0sZ2V0VGV4dDpmdW5jdGlvbigpe3JldHVyblwidmFsdWVcImluIHRoaXMuX3Jvb3Q/dGhpcy5fcm9vdC52YWx1ZTp0aGlzLl9yb290W2EoKV19LGdldERhdGE6ZnVuY3Rpb24oKXtpZih0aGlzLl9mYWxsYmFja1RleHQpcmV0dXJuIHRoaXMuX2ZhbGxiYWNrVGV4dDt2YXIgZSx0LG49dGhpcy5fc3RhcnRUZXh0LHI9bi5sZW5ndGgsbz10aGlzLmdldFRleHQoKSxpPW8ubGVuZ3RoO2ZvcihlPTA7ZTxyJiZuW2VdPT09b1tlXTtlKyspO3ZhciBhPXItZTtmb3IodD0xO3Q8PWEmJm5bci10XT09PW9baS10XTt0KyspO3ZhciBzPXQ+MT8xLXQ6dm9pZCAwO3JldHVybiB0aGlzLl9mYWxsYmFja1RleHQ9by5zbGljZShlLHMpLHRoaXMuX2ZhbGxiYWNrVGV4dH19KSxpLmFkZFBvb2xpbmdUbyhyKSx0LmV4cG9ydHM9cn0sezEwNjoxMDYsMTQzOjE0MywyNDoyNH1dLDIxOltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9ZSgxMSksbz1yLmluamVjdGlvbi5NVVNUX1VTRV9QUk9QRVJUWSxpPXIuaW5qZWN0aW9uLkhBU19CT09MRUFOX1ZBTFVFLGE9ci5pbmplY3Rpb24uSEFTX05VTUVSSUNfVkFMVUUscz1yLmluamVjdGlvbi5IQVNfUE9TSVRJVkVfTlVNRVJJQ19WQUxVRSx1PXIuaW5qZWN0aW9uLkhBU19PVkVSTE9BREVEX0JPT0xFQU5fVkFMVUUsbD17aXNDdXN0b21BdHRyaWJ1dGU6UmVnRXhwLnByb3RvdHlwZS50ZXN0LmJpbmQobmV3IFJlZ0V4cChcIl4oZGF0YXxhcmlhKS1bXCIrci5BVFRSSUJVVEVfTkFNRV9DSEFSK1wiXSokXCIpKSxQcm9wZXJ0aWVzOnthY2NlcHQ6MCxhY2NlcHRDaGFyc2V0OjAsYWNjZXNzS2V5OjAsYWN0aW9uOjAsYWxsb3dGdWxsU2NyZWVuOmksYWxsb3dUcmFuc3BhcmVuY3k6MCxhbHQ6MCxhczowLGFzeW5jOmksYXV0b0NvbXBsZXRlOjAsYXV0b1BsYXk6aSxjYXB0dXJlOmksY2VsbFBhZGRpbmc6MCxjZWxsU3BhY2luZzowLGNoYXJTZXQ6MCxjaGFsbGVuZ2U6MCxjaGVja2VkOm98aSxjaXRlOjAsY2xhc3NJRDowLGNsYXNzTmFtZTowLGNvbHM6cyxjb2xTcGFuOjAsY29udGVudDowLGNvbnRlbnRFZGl0YWJsZTowLGNvbnRleHRNZW51OjAsY29udHJvbHM6aSxjb29yZHM6MCxjcm9zc09yaWdpbjowLGRhdGE6MCxkYXRlVGltZTowLGRlZmF1bHQ6aSxkZWZlcjppLGRpcjowLGRpc2FibGVkOmksZG93bmxvYWQ6dSxkcmFnZ2FibGU6MCxlbmNUeXBlOjAsZm9ybTowLGZvcm1BY3Rpb246MCxmb3JtRW5jVHlwZTowLGZvcm1NZXRob2Q6MCxmb3JtTm9WYWxpZGF0ZTppLGZvcm1UYXJnZXQ6MCxmcmFtZUJvcmRlcjowLGhlYWRlcnM6MCxoZWlnaHQ6MCxoaWRkZW46aSxoaWdoOjAsaHJlZjowLGhyZWZMYW5nOjAsaHRtbEZvcjowLGh0dHBFcXVpdjowLGljb246MCxpZDowLGlucHV0TW9kZTowLGludGVncml0eTowLGlzOjAsa2V5UGFyYW1zOjAsa2V5VHlwZTowLGtpbmQ6MCxsYWJlbDowLGxhbmc6MCxsaXN0OjAsbG9vcDppLGxvdzowLG1hbmlmZXN0OjAsbWFyZ2luSGVpZ2h0OjAsbWFyZ2luV2lkdGg6MCxtYXg6MCxtYXhMZW5ndGg6MCxtZWRpYTowLG1lZGlhR3JvdXA6MCxtZXRob2Q6MCxtaW46MCxtaW5MZW5ndGg6MCxtdWx0aXBsZTpvfGksbXV0ZWQ6b3xpLG5hbWU6MCxub25jZTowLG5vVmFsaWRhdGU6aSxvcGVuOmksb3B0aW11bTowLHBhdHRlcm46MCxwbGFjZWhvbGRlcjowLHBsYXlzSW5saW5lOmkscG9zdGVyOjAscHJlbG9hZDowLHByb2ZpbGU6MCxyYWRpb0dyb3VwOjAscmVhZE9ubHk6aSxyZWZlcnJlclBvbGljeTowLHJlbDowLHJlcXVpcmVkOmkscmV2ZXJzZWQ6aSxyb2xlOjAscm93czpzLHJvd1NwYW46YSxzYW5kYm94OjAsc2NvcGU6MCxzY29wZWQ6aSxzY3JvbGxpbmc6MCxzZWFtbGVzczppLHNlbGVjdGVkOm98aSxzaGFwZTowLHNpemU6cyxzaXplczowLHNwYW46cyxzcGVsbENoZWNrOjAsc3JjOjAsc3JjRG9jOjAsc3JjTGFuZzowLHNyY1NldDowLHN0YXJ0OmEsc3RlcDowLHN0eWxlOjAsc3VtbWFyeTowLHRhYkluZGV4OjAsdGFyZ2V0OjAsdGl0bGU6MCx0eXBlOjAsdXNlTWFwOjAsdmFsdWU6MCx3aWR0aDowLHdtb2RlOjAsd3JhcDowLGFib3V0OjAsZGF0YXR5cGU6MCxpbmxpc3Q6MCxwcmVmaXg6MCxwcm9wZXJ0eTowLHJlc291cmNlOjAsdHlwZW9mOjAsdm9jYWI6MCxhdXRvQ2FwaXRhbGl6ZTowLGF1dG9Db3JyZWN0OjAsYXV0b1NhdmU6MCxjb2xvcjowLGl0ZW1Qcm9wOjAsaXRlbVNjb3BlOmksaXRlbVR5cGU6MCxpdGVtSUQ6MCxpdGVtUmVmOjAscmVzdWx0czowLHNlY3VyaXR5OjAsdW5zZWxlY3RhYmxlOjB9LERPTUF0dHJpYnV0ZU5hbWVzOnthY2NlcHRDaGFyc2V0OlwiYWNjZXB0LWNoYXJzZXRcIixjbGFzc05hbWU6XCJjbGFzc1wiLGh0bWxGb3I6XCJmb3JcIixodHRwRXF1aXY6XCJodHRwLWVxdWl2XCJ9LERPTVByb3BlcnR5TmFtZXM6e30sRE9NTXV0YXRpb25NZXRob2RzOnt2YWx1ZTpmdW5jdGlvbihlLHQpe2lmKG51bGw9PXQpcmV0dXJuIGUucmVtb3ZlQXR0cmlidXRlKFwidmFsdWVcIik7XCJudW1iZXJcIiE9PWUudHlwZXx8ITE9PT1lLmhhc0F0dHJpYnV0ZShcInZhbHVlXCIpP2Uuc2V0QXR0cmlidXRlKFwidmFsdWVcIixcIlwiK3QpOmUudmFsaWRpdHkmJiFlLnZhbGlkaXR5LmJhZElucHV0JiZlLm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudCE9PWUmJmUuc2V0QXR0cmlidXRlKFwidmFsdWVcIixcIlwiK3QpfX19O3QuZXhwb3J0cz1sfSx7MTE6MTF9XSwyMjpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7dmFyIHQ9e1wiPVwiOlwiPTBcIixcIjpcIjpcIj0yXCJ9O3JldHVyblwiJFwiKyhcIlwiK2UpLnJlcGxhY2UoL1s9Ol0vZyxmdW5jdGlvbihlKXtyZXR1cm4gdFtlXX0pfWZ1bmN0aW9uIG8oZSl7dmFyIHQ9e1wiPTBcIjpcIj1cIixcIj0yXCI6XCI6XCJ9O3JldHVybihcIlwiKyhcIi5cIj09PWVbMF0mJlwiJFwiPT09ZVsxXT9lLnN1YnN0cmluZygyKTplLnN1YnN0cmluZygxKSkpLnJlcGxhY2UoLyg9MHw9MikvZyxmdW5jdGlvbihlKXtyZXR1cm4gdFtlXX0pfXZhciBpPXtlc2NhcGU6cix1bmVzY2FwZTpvfTt0LmV4cG9ydHM9aX0se31dLDIzOltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtudWxsIT1lLmNoZWNrZWRMaW5rJiZudWxsIT1lLnZhbHVlTGluayYmcyhcIjg3XCIpfWZ1bmN0aW9uIG8oZSl7cihlKSwobnVsbCE9ZS52YWx1ZXx8bnVsbCE9ZS5vbkNoYW5nZSkmJnMoXCI4OFwiKX1mdW5jdGlvbiBpKGUpe3IoZSksKG51bGwhPWUuY2hlY2tlZHx8bnVsbCE9ZS5vbkNoYW5nZSkmJnMoXCI4OVwiKX1mdW5jdGlvbiBhKGUpe2lmKGUpe3ZhciB0PWUuZ2V0TmFtZSgpO2lmKHQpcmV0dXJuXCIgQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYFwiK3QrXCJgLlwifXJldHVyblwiXCJ9dmFyIHM9ZSgxMTIpLHU9ZSg2NCksbD1lKDE0NSksYz1lKDEyMCkscD1sKGMuaXNWYWxpZEVsZW1lbnQpLGQ9KGUoMTM3KSxlKDE0Mikse2J1dHRvbjohMCxjaGVja2JveDohMCxpbWFnZTohMCxoaWRkZW46ITAscmFkaW86ITAscmVzZXQ6ITAsc3VibWl0OiEwfSksZj17dmFsdWU6ZnVuY3Rpb24oZSx0LG4pe3JldHVybiFlW3RdfHxkW2UudHlwZV18fGUub25DaGFuZ2V8fGUucmVhZE9ubHl8fGUuZGlzYWJsZWQ/bnVsbDpuZXcgRXJyb3IoXCJZb3UgcHJvdmlkZWQgYSBgdmFsdWVgIHByb3AgdG8gYSBmb3JtIGZpZWxkIHdpdGhvdXQgYW4gYG9uQ2hhbmdlYCBoYW5kbGVyLiBUaGlzIHdpbGwgcmVuZGVyIGEgcmVhZC1vbmx5IGZpZWxkLiBJZiB0aGUgZmllbGQgc2hvdWxkIGJlIG11dGFibGUgdXNlIGBkZWZhdWx0VmFsdWVgLiBPdGhlcndpc2UsIHNldCBlaXRoZXIgYG9uQ2hhbmdlYCBvciBgcmVhZE9ubHlgLlwiKX0sY2hlY2tlZDpmdW5jdGlvbihlLHQsbil7cmV0dXJuIWVbdF18fGUub25DaGFuZ2V8fGUucmVhZE9ubHl8fGUuZGlzYWJsZWQ/bnVsbDpuZXcgRXJyb3IoXCJZb3UgcHJvdmlkZWQgYSBgY2hlY2tlZGAgcHJvcCB0byBhIGZvcm0gZmllbGQgd2l0aG91dCBhbiBgb25DaGFuZ2VgIGhhbmRsZXIuIFRoaXMgd2lsbCByZW5kZXIgYSByZWFkLW9ubHkgZmllbGQuIElmIHRoZSBmaWVsZCBzaG91bGQgYmUgbXV0YWJsZSB1c2UgYGRlZmF1bHRDaGVja2VkYC4gT3RoZXJ3aXNlLCBzZXQgZWl0aGVyIGBvbkNoYW5nZWAgb3IgYHJlYWRPbmx5YC5cIil9LG9uQ2hhbmdlOnAuZnVuY30saD17fSxtPXtjaGVja1Byb3BUeXBlczpmdW5jdGlvbihlLHQsbil7Zm9yKHZhciByIGluIGYpe2lmKGYuaGFzT3duUHJvcGVydHkocikpdmFyIG89ZltyXSh0LHIsZSxcInByb3BcIixudWxsLHUpO28gaW5zdGFuY2VvZiBFcnJvciYmIShvLm1lc3NhZ2UgaW4gaCkmJihoW28ubWVzc2FnZV09ITAsYShuKSl9fSxnZXRWYWx1ZTpmdW5jdGlvbihlKXtyZXR1cm4gZS52YWx1ZUxpbms/KG8oZSksZS52YWx1ZUxpbmsudmFsdWUpOmUudmFsdWV9LGdldENoZWNrZWQ6ZnVuY3Rpb24oZSl7cmV0dXJuIGUuY2hlY2tlZExpbms/KGkoZSksZS5jaGVja2VkTGluay52YWx1ZSk6ZS5jaGVja2VkfSxleGVjdXRlT25DaGFuZ2U6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS52YWx1ZUxpbms/KG8oZSksZS52YWx1ZUxpbmsucmVxdWVzdENoYW5nZSh0LnRhcmdldC52YWx1ZSkpOmUuY2hlY2tlZExpbms/KGkoZSksZS5jaGVja2VkTGluay5yZXF1ZXN0Q2hhbmdlKHQudGFyZ2V0LmNoZWNrZWQpKTplLm9uQ2hhbmdlP2Uub25DaGFuZ2UuY2FsbCh2b2lkIDAsdCk6dm9pZCAwfX07dC5leHBvcnRzPW19LHsxMTI6MTEyLDEyMDoxMjAsMTM3OjEzNywxNDI6MTQyLDE0NToxNDUsNjQ6NjR9XSwyNDpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3ZhciByPWUoMTEyKSxvPShlKDEzNyksZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcztpZih0Lmluc3RhbmNlUG9vbC5sZW5ndGgpe3ZhciBuPXQuaW5zdGFuY2VQb29sLnBvcCgpO3JldHVybiB0LmNhbGwobixlKSxufXJldHVybiBuZXcgdChlKX0pLGk9ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzO2lmKG4uaW5zdGFuY2VQb29sLmxlbmd0aCl7dmFyIHI9bi5pbnN0YW5jZVBvb2wucG9wKCk7cmV0dXJuIG4uY2FsbChyLGUsdCkscn1yZXR1cm4gbmV3IG4oZSx0KX0sYT1mdW5jdGlvbihlLHQsbil7dmFyIHI9dGhpcztpZihyLmluc3RhbmNlUG9vbC5sZW5ndGgpe3ZhciBvPXIuaW5zdGFuY2VQb29sLnBvcCgpO3JldHVybiByLmNhbGwobyxlLHQsbiksb31yZXR1cm4gbmV3IHIoZSx0LG4pfSxzPWZ1bmN0aW9uKGUsdCxuLHIpe3ZhciBvPXRoaXM7aWYoby5pbnN0YW5jZVBvb2wubGVuZ3RoKXt2YXIgaT1vLmluc3RhbmNlUG9vbC5wb3AoKTtyZXR1cm4gby5jYWxsKGksZSx0LG4sciksaX1yZXR1cm4gbmV3IG8oZSx0LG4scil9LHU9ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcztlIGluc3RhbmNlb2YgdHx8cihcIjI1XCIpLGUuZGVzdHJ1Y3RvcigpLHQuaW5zdGFuY2VQb29sLmxlbmd0aDx0LnBvb2xTaXplJiZ0Lmluc3RhbmNlUG9vbC5wdXNoKGUpfSxsPW8sYz1mdW5jdGlvbihlLHQpe3ZhciBuPWU7cmV0dXJuIG4uaW5zdGFuY2VQb29sPVtdLG4uZ2V0UG9vbGVkPXR8fGwsbi5wb29sU2l6ZXx8KG4ucG9vbFNpemU9MTApLG4ucmVsZWFzZT11LG59LHA9e2FkZFBvb2xpbmdUbzpjLG9uZUFyZ3VtZW50UG9vbGVyOm8sdHdvQXJndW1lbnRQb29sZXI6aSx0aHJlZUFyZ3VtZW50UG9vbGVyOmEsZm91ckFyZ3VtZW50UG9vbGVyOnN9O3QuZXhwb3J0cz1wfSx7MTEyOjExMiwxMzc6MTM3fV0sMjU6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSxtKXx8KGVbbV09ZisrLHBbZVttXV09e30pLHBbZVttXV19dmFyIG8saT1lKDE0MyksYT1lKDE3KSxzPWUoNTEpLHU9ZSg5MCksbD1lKDEwNyksYz1lKDEwOSkscD17fSxkPSExLGY9MCxoPXt0b3BBYm9ydDpcImFib3J0XCIsdG9wQW5pbWF0aW9uRW5kOmwoXCJhbmltYXRpb25lbmRcIil8fFwiYW5pbWF0aW9uZW5kXCIsdG9wQW5pbWF0aW9uSXRlcmF0aW9uOmwoXCJhbmltYXRpb25pdGVyYXRpb25cIil8fFwiYW5pbWF0aW9uaXRlcmF0aW9uXCIsdG9wQW5pbWF0aW9uU3RhcnQ6bChcImFuaW1hdGlvbnN0YXJ0XCIpfHxcImFuaW1hdGlvbnN0YXJ0XCIsdG9wQmx1cjpcImJsdXJcIix0b3BDYW5QbGF5OlwiY2FucGxheVwiLHRvcENhblBsYXlUaHJvdWdoOlwiY2FucGxheXRocm91Z2hcIix0b3BDaGFuZ2U6XCJjaGFuZ2VcIix0b3BDbGljazpcImNsaWNrXCIsdG9wQ29tcG9zaXRpb25FbmQ6XCJjb21wb3NpdGlvbmVuZFwiLHRvcENvbXBvc2l0aW9uU3RhcnQ6XCJjb21wb3NpdGlvbnN0YXJ0XCIsdG9wQ29tcG9zaXRpb25VcGRhdGU6XCJjb21wb3NpdGlvbnVwZGF0ZVwiLHRvcENvbnRleHRNZW51OlwiY29udGV4dG1lbnVcIix0b3BDb3B5OlwiY29weVwiLHRvcEN1dDpcImN1dFwiLHRvcERvdWJsZUNsaWNrOlwiZGJsY2xpY2tcIix0b3BEcmFnOlwiZHJhZ1wiLHRvcERyYWdFbmQ6XCJkcmFnZW5kXCIsdG9wRHJhZ0VudGVyOlwiZHJhZ2VudGVyXCIsdG9wRHJhZ0V4aXQ6XCJkcmFnZXhpdFwiLHRvcERyYWdMZWF2ZTpcImRyYWdsZWF2ZVwiLHRvcERyYWdPdmVyOlwiZHJhZ292ZXJcIix0b3BEcmFnU3RhcnQ6XCJkcmFnc3RhcnRcIix0b3BEcm9wOlwiZHJvcFwiLHRvcER1cmF0aW9uQ2hhbmdlOlwiZHVyYXRpb25jaGFuZ2VcIix0b3BFbXB0aWVkOlwiZW1wdGllZFwiLHRvcEVuY3J5cHRlZDpcImVuY3J5cHRlZFwiLHRvcEVuZGVkOlwiZW5kZWRcIix0b3BFcnJvcjpcImVycm9yXCIsXG50b3BGb2N1czpcImZvY3VzXCIsdG9wSW5wdXQ6XCJpbnB1dFwiLHRvcEtleURvd246XCJrZXlkb3duXCIsdG9wS2V5UHJlc3M6XCJrZXlwcmVzc1wiLHRvcEtleVVwOlwia2V5dXBcIix0b3BMb2FkZWREYXRhOlwibG9hZGVkZGF0YVwiLHRvcExvYWRlZE1ldGFkYXRhOlwibG9hZGVkbWV0YWRhdGFcIix0b3BMb2FkU3RhcnQ6XCJsb2Fkc3RhcnRcIix0b3BNb3VzZURvd246XCJtb3VzZWRvd25cIix0b3BNb3VzZU1vdmU6XCJtb3VzZW1vdmVcIix0b3BNb3VzZU91dDpcIm1vdXNlb3V0XCIsdG9wTW91c2VPdmVyOlwibW91c2VvdmVyXCIsdG9wTW91c2VVcDpcIm1vdXNldXBcIix0b3BQYXN0ZTpcInBhc3RlXCIsdG9wUGF1c2U6XCJwYXVzZVwiLHRvcFBsYXk6XCJwbGF5XCIsdG9wUGxheWluZzpcInBsYXlpbmdcIix0b3BQcm9ncmVzczpcInByb2dyZXNzXCIsdG9wUmF0ZUNoYW5nZTpcInJhdGVjaGFuZ2VcIix0b3BTY3JvbGw6XCJzY3JvbGxcIix0b3BTZWVrZWQ6XCJzZWVrZWRcIix0b3BTZWVraW5nOlwic2Vla2luZ1wiLHRvcFNlbGVjdGlvbkNoYW5nZTpcInNlbGVjdGlvbmNoYW5nZVwiLHRvcFN0YWxsZWQ6XCJzdGFsbGVkXCIsdG9wU3VzcGVuZDpcInN1c3BlbmRcIix0b3BUZXh0SW5wdXQ6XCJ0ZXh0SW5wdXRcIix0b3BUaW1lVXBkYXRlOlwidGltZXVwZGF0ZVwiLHRvcFRvdWNoQ2FuY2VsOlwidG91Y2hjYW5jZWxcIix0b3BUb3VjaEVuZDpcInRvdWNoZW5kXCIsdG9wVG91Y2hNb3ZlOlwidG91Y2htb3ZlXCIsdG9wVG91Y2hTdGFydDpcInRvdWNoc3RhcnRcIix0b3BUcmFuc2l0aW9uRW5kOmwoXCJ0cmFuc2l0aW9uZW5kXCIpfHxcInRyYW5zaXRpb25lbmRcIix0b3BWb2x1bWVDaGFuZ2U6XCJ2b2x1bWVjaGFuZ2VcIix0b3BXYWl0aW5nOlwid2FpdGluZ1wiLHRvcFdoZWVsOlwid2hlZWxcIn0sbT1cIl9yZWFjdExpc3RlbmVyc0lEXCIrU3RyaW5nKE1hdGgucmFuZG9tKCkpLnNsaWNlKDIpLHY9aSh7fSxzLHtSZWFjdEV2ZW50TGlzdGVuZXI6bnVsbCxpbmplY3Rpb246e2luamVjdFJlYWN0RXZlbnRMaXN0ZW5lcjpmdW5jdGlvbihlKXtlLnNldEhhbmRsZVRvcExldmVsKHYuaGFuZGxlVG9wTGV2ZWwpLHYuUmVhY3RFdmVudExpc3RlbmVyPWV9fSxzZXRFbmFibGVkOmZ1bmN0aW9uKGUpe3YuUmVhY3RFdmVudExpc3RlbmVyJiZ2LlJlYWN0RXZlbnRMaXN0ZW5lci5zZXRFbmFibGVkKGUpfSxpc0VuYWJsZWQ6ZnVuY3Rpb24oKXtyZXR1cm4hKCF2LlJlYWN0RXZlbnRMaXN0ZW5lcnx8IXYuUmVhY3RFdmVudExpc3RlbmVyLmlzRW5hYmxlZCgpKX0sbGlzdGVuVG86ZnVuY3Rpb24oZSx0KXtmb3IodmFyIG49dCxvPXIobiksaT1hLnJlZ2lzdHJhdGlvbk5hbWVEZXBlbmRlbmNpZXNbZV0scz0wO3M8aS5sZW5ndGg7cysrKXt2YXIgdT1pW3NdO28uaGFzT3duUHJvcGVydHkodSkmJm9bdV18fChcInRvcFdoZWVsXCI9PT11P2MoXCJ3aGVlbFwiKT92LlJlYWN0RXZlbnRMaXN0ZW5lci50cmFwQnViYmxlZEV2ZW50KFwidG9wV2hlZWxcIixcIndoZWVsXCIsbik6YyhcIm1vdXNld2hlZWxcIik/di5SZWFjdEV2ZW50TGlzdGVuZXIudHJhcEJ1YmJsZWRFdmVudChcInRvcFdoZWVsXCIsXCJtb3VzZXdoZWVsXCIsbik6di5SZWFjdEV2ZW50TGlzdGVuZXIudHJhcEJ1YmJsZWRFdmVudChcInRvcFdoZWVsXCIsXCJET01Nb3VzZVNjcm9sbFwiLG4pOlwidG9wU2Nyb2xsXCI9PT11P2MoXCJzY3JvbGxcIiwhMCk/di5SZWFjdEV2ZW50TGlzdGVuZXIudHJhcENhcHR1cmVkRXZlbnQoXCJ0b3BTY3JvbGxcIixcInNjcm9sbFwiLG4pOnYuUmVhY3RFdmVudExpc3RlbmVyLnRyYXBCdWJibGVkRXZlbnQoXCJ0b3BTY3JvbGxcIixcInNjcm9sbFwiLHYuUmVhY3RFdmVudExpc3RlbmVyLldJTkRPV19IQU5ETEUpOlwidG9wRm9jdXNcIj09PXV8fFwidG9wQmx1clwiPT09dT8oYyhcImZvY3VzXCIsITApPyh2LlJlYWN0RXZlbnRMaXN0ZW5lci50cmFwQ2FwdHVyZWRFdmVudChcInRvcEZvY3VzXCIsXCJmb2N1c1wiLG4pLHYuUmVhY3RFdmVudExpc3RlbmVyLnRyYXBDYXB0dXJlZEV2ZW50KFwidG9wQmx1clwiLFwiYmx1clwiLG4pKTpjKFwiZm9jdXNpblwiKSYmKHYuUmVhY3RFdmVudExpc3RlbmVyLnRyYXBCdWJibGVkRXZlbnQoXCJ0b3BGb2N1c1wiLFwiZm9jdXNpblwiLG4pLHYuUmVhY3RFdmVudExpc3RlbmVyLnRyYXBCdWJibGVkRXZlbnQoXCJ0b3BCbHVyXCIsXCJmb2N1c291dFwiLG4pKSxvLnRvcEJsdXI9ITAsby50b3BGb2N1cz0hMCk6aC5oYXNPd25Qcm9wZXJ0eSh1KSYmdi5SZWFjdEV2ZW50TGlzdGVuZXIudHJhcEJ1YmJsZWRFdmVudCh1LGhbdV0sbiksb1t1XT0hMCl9fSx0cmFwQnViYmxlZEV2ZW50OmZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gdi5SZWFjdEV2ZW50TGlzdGVuZXIudHJhcEJ1YmJsZWRFdmVudChlLHQsbil9LHRyYXBDYXB0dXJlZEV2ZW50OmZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gdi5SZWFjdEV2ZW50TGlzdGVuZXIudHJhcENhcHR1cmVkRXZlbnQoZSx0LG4pfSxzdXBwb3J0c0V2ZW50UGFnZVhZOmZ1bmN0aW9uKCl7aWYoIWRvY3VtZW50LmNyZWF0ZUV2ZW50KXJldHVybiExO3ZhciBlPWRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudFwiKTtyZXR1cm4gbnVsbCE9ZSYmXCJwYWdlWFwiaW4gZX0sZW5zdXJlU2Nyb2xsVmFsdWVNb25pdG9yaW5nOmZ1bmN0aW9uKCl7aWYodm9pZCAwPT09byYmKG89di5zdXBwb3J0c0V2ZW50UGFnZVhZKCkpLCFvJiYhZCl7dmFyIGU9dS5yZWZyZXNoU2Nyb2xsVmFsdWVzO3YuUmVhY3RFdmVudExpc3RlbmVyLm1vbml0b3JTY3JvbGxWYWx1ZShlKSxkPSEwfX19KTt0LmV4cG9ydHM9dn0sezEwNzoxMDcsMTA5OjEwOSwxNDM6MTQzLDE3OjE3LDUxOjUxLDkwOjkwfV0sMjY6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24obil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlLHQsbixyKXt2YXIgbz12b2lkIDA9PT1lW25dO251bGwhPXQmJm8mJihlW25dPWkodCwhMCkpfXZhciBvPWUoNjYpLGk9ZSgxMDgpLGE9KGUoMjIpLGUoMTE2KSkscz1lKDExNyk7ZSgxNDIpO3ZvaWQgMCE9PW4mJm4uZW52O3ZhciB1PXtpbnN0YW50aWF0ZUNoaWxkcmVuOmZ1bmN0aW9uKGUsdCxuLG8pe2lmKG51bGw9PWUpcmV0dXJuIG51bGw7dmFyIGk9e307cmV0dXJuIHMoZSxyLGkpLGl9LHVwZGF0ZUNoaWxkcmVuOmZ1bmN0aW9uKGUsdCxuLHIscyx1LGwsYyxwKXtpZih0fHxlKXt2YXIgZCxmO2ZvcihkIGluIHQpaWYodC5oYXNPd25Qcm9wZXJ0eShkKSl7Zj1lJiZlW2RdO3ZhciBoPWYmJmYuX2N1cnJlbnRFbGVtZW50LG09dFtkXTtpZihudWxsIT1mJiZhKGgsbSkpby5yZWNlaXZlQ29tcG9uZW50KGYsbSxzLGMpLHRbZF09ZjtlbHNle2YmJihyW2RdPW8uZ2V0SG9zdE5vZGUoZiksby51bm1vdW50Q29tcG9uZW50KGYsITEpKTt2YXIgdj1pKG0sITApO3RbZF09djt2YXIgZz1vLm1vdW50Q29tcG9uZW50KHYscyx1LGwsYyxwKTtuLnB1c2goZyl9fWZvcihkIGluIGUpIWUuaGFzT3duUHJvcGVydHkoZCl8fHQmJnQuaGFzT3duUHJvcGVydHkoZCl8fChmPWVbZF0scltkXT1vLmdldEhvc3ROb2RlKGYpLG8udW5tb3VudENvbXBvbmVudChmLCExKSl9fSx1bm1vdW50Q2hpbGRyZW46ZnVuY3Rpb24oZSx0KXtmb3IodmFyIG4gaW4gZSlpZihlLmhhc093blByb3BlcnR5KG4pKXt2YXIgcj1lW25dO28udW5tb3VudENvbXBvbmVudChyLHQpfX19O3QuZXhwb3J0cz11fSkuY2FsbCh0aGlzLHZvaWQgMCl9LHsxMDg6MTA4LDExNjoxMTYsMTE3OjExNywxNDI6MTQyLDIyOjIyLDY2OjY2fV0sMjc6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1lKDgpLG89ZSgzNyksaT17cHJvY2Vzc0NoaWxkcmVuVXBkYXRlczpvLmRhbmdlcm91c2x5UHJvY2Vzc0NoaWxkcmVuVXBkYXRlcyxyZXBsYWNlTm9kZVdpdGhNYXJrdXA6ci5kYW5nZXJvdXNseVJlcGxhY2VOb2RlV2l0aE1hcmt1cH07dC5leHBvcnRzPWl9LHszNzozNyw4Ojh9XSwyODpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3ZhciByPWUoMTEyKSxvPShlKDEzNyksITEpLGk9e3JlcGxhY2VOb2RlV2l0aE1hcmt1cDpudWxsLHByb2Nlc3NDaGlsZHJlblVwZGF0ZXM6bnVsbCxpbmplY3Rpb246e2luamVjdEVudmlyb25tZW50OmZ1bmN0aW9uKGUpe28mJnIoXCIxMDRcIiksaS5yZXBsYWNlTm9kZVdpdGhNYXJrdXA9ZS5yZXBsYWNlTm9kZVdpdGhNYXJrdXAsaS5wcm9jZXNzQ2hpbGRyZW5VcGRhdGVzPWUucHJvY2Vzc0NoaWxkcmVuVXBkYXRlcyxvPSEwfX19O3QuZXhwb3J0cz1pfSx7MTEyOjExMiwxMzc6MTM3fV0sMjk6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe31mdW5jdGlvbiBvKGUpe3JldHVybiEoIWUucHJvdG90eXBlfHwhZS5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCl9ZnVuY3Rpb24gaShlKXtyZXR1cm4hKCFlLnByb3RvdHlwZXx8IWUucHJvdG90eXBlLmlzUHVyZVJlYWN0Q29tcG9uZW50KX12YXIgYT1lKDExMikscz1lKDE0MyksdT1lKDEyMCksbD1lKDI4KSxjPWUoMTE5KSxwPWUoNTApLGQ9ZSg1NyksZj0oZSg1OCksZSg2MikpLGg9ZSg2NiksbT1lKDEzMCksdj0oZSgxMzcpLGUoMTQxKSksZz1lKDExNikseT0oZSgxNDIpLHtJbXB1cmVDbGFzczowLFB1cmVDbGFzczoxLFN0YXRlbGVzc0Z1bmN0aW9uYWw6Mn0pO3IucHJvdG90eXBlLnJlbmRlcj1mdW5jdGlvbigpe3ZhciBlPWQuZ2V0KHRoaXMpLl9jdXJyZW50RWxlbWVudC50eXBlLHQ9ZSh0aGlzLnByb3BzLHRoaXMuY29udGV4dCx0aGlzLnVwZGF0ZXIpO3JldHVybiB0fTt2YXIgXz0xLEM9e2NvbnN0cnVjdDpmdW5jdGlvbihlKXt0aGlzLl9jdXJyZW50RWxlbWVudD1lLHRoaXMuX3Jvb3ROb2RlSUQ9MCx0aGlzLl9jb21wb3NpdGVUeXBlPW51bGwsdGhpcy5faW5zdGFuY2U9bnVsbCx0aGlzLl9ob3N0UGFyZW50PW51bGwsdGhpcy5faG9zdENvbnRhaW5lckluZm89bnVsbCx0aGlzLl91cGRhdGVCYXRjaE51bWJlcj1udWxsLHRoaXMuX3BlbmRpbmdFbGVtZW50PW51bGwsdGhpcy5fcGVuZGluZ1N0YXRlUXVldWU9bnVsbCx0aGlzLl9wZW5kaW5nUmVwbGFjZVN0YXRlPSExLHRoaXMuX3BlbmRpbmdGb3JjZVVwZGF0ZT0hMSx0aGlzLl9yZW5kZXJlZE5vZGVUeXBlPW51bGwsdGhpcy5fcmVuZGVyZWRDb21wb25lbnQ9bnVsbCx0aGlzLl9jb250ZXh0PW51bGwsdGhpcy5fbW91bnRPcmRlcj0wLHRoaXMuX3RvcExldmVsV3JhcHBlcj1udWxsLHRoaXMuX3BlbmRpbmdDYWxsYmFja3M9bnVsbCx0aGlzLl9jYWxsZWRDb21wb25lbnRXaWxsVW5tb3VudD0hMX0sbW91bnRDb21wb25lbnQ6ZnVuY3Rpb24oZSx0LG4scyl7dGhpcy5fY29udGV4dD1zLHRoaXMuX21vdW50T3JkZXI9XysrLHRoaXMuX2hvc3RQYXJlbnQ9dCx0aGlzLl9ob3N0Q29udGFpbmVySW5mbz1uO3ZhciBsLGM9dGhpcy5fY3VycmVudEVsZW1lbnQucHJvcHMscD10aGlzLl9wcm9jZXNzQ29udGV4dChzKSxmPXRoaXMuX2N1cnJlbnRFbGVtZW50LnR5cGUsaD1lLmdldFVwZGF0ZVF1ZXVlKCksdj1vKGYpLGc9dGhpcy5fY29uc3RydWN0Q29tcG9uZW50KHYsYyxwLGgpO3Z8fG51bGwhPWcmJm51bGwhPWcucmVuZGVyP2koZik/dGhpcy5fY29tcG9zaXRlVHlwZT15LlB1cmVDbGFzczp0aGlzLl9jb21wb3NpdGVUeXBlPXkuSW1wdXJlQ2xhc3M6KGw9ZyxudWxsPT09Z3x8ITE9PT1nfHx1LmlzVmFsaWRFbGVtZW50KGcpfHxhKFwiMTA1XCIsZi5kaXNwbGF5TmFtZXx8Zi5uYW1lfHxcIkNvbXBvbmVudFwiKSxnPW5ldyByKGYpLHRoaXMuX2NvbXBvc2l0ZVR5cGU9eS5TdGF0ZWxlc3NGdW5jdGlvbmFsKSxnLnByb3BzPWMsZy5jb250ZXh0PXAsZy5yZWZzPW0sZy51cGRhdGVyPWgsdGhpcy5faW5zdGFuY2U9ZyxkLnNldChnLHRoaXMpO3ZhciBDPWcuc3RhdGU7dm9pZCAwPT09QyYmKGcuc3RhdGU9Qz1udWxsKSwoXCJvYmplY3RcIiE9dHlwZW9mIEN8fEFycmF5LmlzQXJyYXkoQykpJiZhKFwiMTA2XCIsdGhpcy5nZXROYW1lKCl8fFwiUmVhY3RDb21wb3NpdGVDb21wb25lbnRcIiksdGhpcy5fcGVuZGluZ1N0YXRlUXVldWU9bnVsbCx0aGlzLl9wZW5kaW5nUmVwbGFjZVN0YXRlPSExLHRoaXMuX3BlbmRpbmdGb3JjZVVwZGF0ZT0hMTt2YXIgYjtyZXR1cm4gYj1nLnVuc3RhYmxlX2hhbmRsZUVycm9yP3RoaXMucGVyZm9ybUluaXRpYWxNb3VudFdpdGhFcnJvckhhbmRsaW5nKGwsdCxuLGUscyk6dGhpcy5wZXJmb3JtSW5pdGlhbE1vdW50KGwsdCxuLGUscyksZy5jb21wb25lbnREaWRNb3VudCYmZS5nZXRSZWFjdE1vdW50UmVhZHkoKS5lbnF1ZXVlKGcuY29tcG9uZW50RGlkTW91bnQsZyksYn0sX2NvbnN0cnVjdENvbXBvbmVudDpmdW5jdGlvbihlLHQsbixyKXtyZXR1cm4gdGhpcy5fY29uc3RydWN0Q29tcG9uZW50V2l0aG91dE93bmVyKGUsdCxuLHIpfSxfY29uc3RydWN0Q29tcG9uZW50V2l0aG91dE93bmVyOmZ1bmN0aW9uKGUsdCxuLHIpe3ZhciBvPXRoaXMuX2N1cnJlbnRFbGVtZW50LnR5cGU7cmV0dXJuIGU/bmV3IG8odCxuLHIpOm8odCxuLHIpfSxwZXJmb3JtSW5pdGlhbE1vdW50V2l0aEVycm9ySGFuZGxpbmc6ZnVuY3Rpb24oZSx0LG4scixvKXt2YXIgaSxhPXIuY2hlY2twb2ludCgpO3RyeXtpPXRoaXMucGVyZm9ybUluaXRpYWxNb3VudChlLHQsbixyLG8pfWNhdGNoKHMpe3Iucm9sbGJhY2soYSksdGhpcy5faW5zdGFuY2UudW5zdGFibGVfaGFuZGxlRXJyb3IocyksdGhpcy5fcGVuZGluZ1N0YXRlUXVldWUmJih0aGlzLl9pbnN0YW5jZS5zdGF0ZT10aGlzLl9wcm9jZXNzUGVuZGluZ1N0YXRlKHRoaXMuX2luc3RhbmNlLnByb3BzLHRoaXMuX2luc3RhbmNlLmNvbnRleHQpKSxhPXIuY2hlY2twb2ludCgpLHRoaXMuX3JlbmRlcmVkQ29tcG9uZW50LnVubW91bnRDb21wb25lbnQoITApLHIucm9sbGJhY2soYSksaT10aGlzLnBlcmZvcm1Jbml0aWFsTW91bnQoZSx0LG4scixvKX1yZXR1cm4gaX0scGVyZm9ybUluaXRpYWxNb3VudDpmdW5jdGlvbihlLHQsbixyLG8pe3ZhciBpPXRoaXMuX2luc3RhbmNlO2kuY29tcG9uZW50V2lsbE1vdW50JiYoaS5jb21wb25lbnRXaWxsTW91bnQoKSx0aGlzLl9wZW5kaW5nU3RhdGVRdWV1ZSYmKGkuc3RhdGU9dGhpcy5fcHJvY2Vzc1BlbmRpbmdTdGF0ZShpLnByb3BzLGkuY29udGV4dCkpKSx2b2lkIDA9PT1lJiYoZT10aGlzLl9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnQoKSk7dmFyIGE9Zi5nZXRUeXBlKGUpO3RoaXMuX3JlbmRlcmVkTm9kZVR5cGU9YTt2YXIgcz10aGlzLl9pbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50KGUsYSE9PWYuRU1QVFkpO3JldHVybiB0aGlzLl9yZW5kZXJlZENvbXBvbmVudD1zLGgubW91bnRDb21wb25lbnQocyxyLHQsbix0aGlzLl9wcm9jZXNzQ2hpbGRDb250ZXh0KG8pLDApfSxnZXRIb3N0Tm9kZTpmdW5jdGlvbigpe3JldHVybiBoLmdldEhvc3ROb2RlKHRoaXMuX3JlbmRlcmVkQ29tcG9uZW50KX0sdW5tb3VudENvbXBvbmVudDpmdW5jdGlvbihlKXtpZih0aGlzLl9yZW5kZXJlZENvbXBvbmVudCl7dmFyIHQ9dGhpcy5faW5zdGFuY2U7aWYodC5jb21wb25lbnRXaWxsVW5tb3VudCYmIXQuX2NhbGxlZENvbXBvbmVudFdpbGxVbm1vdW50KWlmKHQuX2NhbGxlZENvbXBvbmVudFdpbGxVbm1vdW50PSEwLGUpe3ZhciBuPXRoaXMuZ2V0TmFtZSgpK1wiLmNvbXBvbmVudFdpbGxVbm1vdW50KClcIjtwLmludm9rZUd1YXJkZWRDYWxsYmFjayhuLHQuY29tcG9uZW50V2lsbFVubW91bnQuYmluZCh0KSl9ZWxzZSB0LmNvbXBvbmVudFdpbGxVbm1vdW50KCk7dGhpcy5fcmVuZGVyZWRDb21wb25lbnQmJihoLnVubW91bnRDb21wb25lbnQodGhpcy5fcmVuZGVyZWRDb21wb25lbnQsZSksdGhpcy5fcmVuZGVyZWROb2RlVHlwZT1udWxsLHRoaXMuX3JlbmRlcmVkQ29tcG9uZW50PW51bGwsdGhpcy5faW5zdGFuY2U9bnVsbCksdGhpcy5fcGVuZGluZ1N0YXRlUXVldWU9bnVsbCx0aGlzLl9wZW5kaW5nUmVwbGFjZVN0YXRlPSExLHRoaXMuX3BlbmRpbmdGb3JjZVVwZGF0ZT0hMSx0aGlzLl9wZW5kaW5nQ2FsbGJhY2tzPW51bGwsdGhpcy5fcGVuZGluZ0VsZW1lbnQ9bnVsbCx0aGlzLl9jb250ZXh0PW51bGwsdGhpcy5fcm9vdE5vZGVJRD0wLHRoaXMuX3RvcExldmVsV3JhcHBlcj1udWxsLGQucmVtb3ZlKHQpfX0sX21hc2tDb250ZXh0OmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMuX2N1cnJlbnRFbGVtZW50LnR5cGUsbj10LmNvbnRleHRUeXBlcztpZighbilyZXR1cm4gbTt2YXIgcj17fTtmb3IodmFyIG8gaW4gbilyW29dPWVbb107cmV0dXJuIHJ9LF9wcm9jZXNzQ29udGV4dDpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5fbWFza0NvbnRleHQoZSl9LF9wcm9jZXNzQ2hpbGRDb250ZXh0OmZ1bmN0aW9uKGUpe3ZhciB0LG49dGhpcy5fY3VycmVudEVsZW1lbnQudHlwZSxyPXRoaXMuX2luc3RhbmNlO2lmKHIuZ2V0Q2hpbGRDb250ZXh0JiYodD1yLmdldENoaWxkQ29udGV4dCgpKSx0KXtcIm9iamVjdFwiIT10eXBlb2Ygbi5jaGlsZENvbnRleHRUeXBlcyYmYShcIjEwN1wiLHRoaXMuZ2V0TmFtZSgpfHxcIlJlYWN0Q29tcG9zaXRlQ29tcG9uZW50XCIpO2Zvcih2YXIgbyBpbiB0KW8gaW4gbi5jaGlsZENvbnRleHRUeXBlc3x8YShcIjEwOFwiLHRoaXMuZ2V0TmFtZSgpfHxcIlJlYWN0Q29tcG9zaXRlQ29tcG9uZW50XCIsbyk7cmV0dXJuIHMoe30sZSx0KX1yZXR1cm4gZX0sX2NoZWNrQ29udGV4dFR5cGVzOmZ1bmN0aW9uKGUsdCxuKXt9LHJlY2VpdmVDb21wb25lbnQ6ZnVuY3Rpb24oZSx0LG4pe3ZhciByPXRoaXMuX2N1cnJlbnRFbGVtZW50LG89dGhpcy5fY29udGV4dDt0aGlzLl9wZW5kaW5nRWxlbWVudD1udWxsLHRoaXMudXBkYXRlQ29tcG9uZW50KHQscixlLG8sbil9LHBlcmZvcm1VcGRhdGVJZk5lY2Vzc2FyeTpmdW5jdGlvbihlKXtudWxsIT10aGlzLl9wZW5kaW5nRWxlbWVudD9oLnJlY2VpdmVDb21wb25lbnQodGhpcyx0aGlzLl9wZW5kaW5nRWxlbWVudCxlLHRoaXMuX2NvbnRleHQpOm51bGwhPT10aGlzLl9wZW5kaW5nU3RhdGVRdWV1ZXx8dGhpcy5fcGVuZGluZ0ZvcmNlVXBkYXRlP3RoaXMudXBkYXRlQ29tcG9uZW50KGUsdGhpcy5fY3VycmVudEVsZW1lbnQsdGhpcy5fY3VycmVudEVsZW1lbnQsdGhpcy5fY29udGV4dCx0aGlzLl9jb250ZXh0KTp0aGlzLl91cGRhdGVCYXRjaE51bWJlcj1udWxsfSx1cGRhdGVDb21wb25lbnQ6ZnVuY3Rpb24oZSx0LG4scixvKXt2YXIgaT10aGlzLl9pbnN0YW5jZTtudWxsPT1pJiZhKFwiMTM2XCIsdGhpcy5nZXROYW1lKCl8fFwiUmVhY3RDb21wb3NpdGVDb21wb25lbnRcIik7dmFyIHMsdT0hMTt0aGlzLl9jb250ZXh0PT09bz9zPWkuY29udGV4dDoocz10aGlzLl9wcm9jZXNzQ29udGV4dChvKSx1PSEwKTt2YXIgbD10LnByb3BzLGM9bi5wcm9wczt0IT09biYmKHU9ITApLHUmJmkuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyYmaS5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKGMscyk7dmFyIHA9dGhpcy5fcHJvY2Vzc1BlbmRpbmdTdGF0ZShjLHMpLGQ9ITA7dGhpcy5fcGVuZGluZ0ZvcmNlVXBkYXRlfHwoaS5zaG91bGRDb21wb25lbnRVcGRhdGU/ZD1pLnNob3VsZENvbXBvbmVudFVwZGF0ZShjLHAscyk6dGhpcy5fY29tcG9zaXRlVHlwZT09PXkuUHVyZUNsYXNzJiYoZD0hdihsLGMpfHwhdihpLnN0YXRlLHApKSksdGhpcy5fdXBkYXRlQmF0Y2hOdW1iZXI9bnVsbCxkPyh0aGlzLl9wZW5kaW5nRm9yY2VVcGRhdGU9ITEsdGhpcy5fcGVyZm9ybUNvbXBvbmVudFVwZGF0ZShuLGMscCxzLGUsbykpOih0aGlzLl9jdXJyZW50RWxlbWVudD1uLHRoaXMuX2NvbnRleHQ9byxpLnByb3BzPWMsaS5zdGF0ZT1wLGkuY29udGV4dD1zKX0sX3Byb2Nlc3NQZW5kaW5nU3RhdGU6ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzLl9pbnN0YW5jZSxyPXRoaXMuX3BlbmRpbmdTdGF0ZVF1ZXVlLG89dGhpcy5fcGVuZGluZ1JlcGxhY2VTdGF0ZTtpZih0aGlzLl9wZW5kaW5nUmVwbGFjZVN0YXRlPSExLHRoaXMuX3BlbmRpbmdTdGF0ZVF1ZXVlPW51bGwsIXIpcmV0dXJuIG4uc3RhdGU7aWYobyYmMT09PXIubGVuZ3RoKXJldHVybiByWzBdO2Zvcih2YXIgaT1zKHt9LG8/clswXTpuLnN0YXRlKSxhPW8/MTowO2E8ci5sZW5ndGg7YSsrKXt2YXIgdT1yW2FdO3MoaSxcImZ1bmN0aW9uXCI9PXR5cGVvZiB1P3UuY2FsbChuLGksZSx0KTp1KX1yZXR1cm4gaX0sX3BlcmZvcm1Db21wb25lbnRVcGRhdGU6ZnVuY3Rpb24oZSx0LG4scixvLGkpe3ZhciBhLHMsdSxsPXRoaXMuX2luc3RhbmNlLGM9Qm9vbGVhbihsLmNvbXBvbmVudERpZFVwZGF0ZSk7YyYmKGE9bC5wcm9wcyxzPWwuc3RhdGUsdT1sLmNvbnRleHQpLGwuY29tcG9uZW50V2lsbFVwZGF0ZSYmbC5jb21wb25lbnRXaWxsVXBkYXRlKHQsbixyKSx0aGlzLl9jdXJyZW50RWxlbWVudD1lLHRoaXMuX2NvbnRleHQ9aSxsLnByb3BzPXQsbC5zdGF0ZT1uLGwuY29udGV4dD1yLHRoaXMuX3VwZGF0ZVJlbmRlcmVkQ29tcG9uZW50KG8saSksYyYmby5nZXRSZWFjdE1vdW50UmVhZHkoKS5lbnF1ZXVlKGwuY29tcG9uZW50RGlkVXBkYXRlLmJpbmQobCxhLHMsdSksbCl9LF91cGRhdGVSZW5kZXJlZENvbXBvbmVudDpmdW5jdGlvbihlLHQpe3ZhciBuPXRoaXMuX3JlbmRlcmVkQ29tcG9uZW50LHI9bi5fY3VycmVudEVsZW1lbnQsbz10aGlzLl9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnQoKTtpZihnKHIsbykpaC5yZWNlaXZlQ29tcG9uZW50KG4sbyxlLHRoaXMuX3Byb2Nlc3NDaGlsZENvbnRleHQodCkpO2Vsc2V7dmFyIGk9aC5nZXRIb3N0Tm9kZShuKTtoLnVubW91bnRDb21wb25lbnQobiwhMSk7dmFyIGE9Zi5nZXRUeXBlKG8pO3RoaXMuX3JlbmRlcmVkTm9kZVR5cGU9YTt2YXIgcz10aGlzLl9pbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50KG8sYSE9PWYuRU1QVFkpO3RoaXMuX3JlbmRlcmVkQ29tcG9uZW50PXM7dmFyIHU9aC5tb3VudENvbXBvbmVudChzLGUsdGhpcy5faG9zdFBhcmVudCx0aGlzLl9ob3N0Q29udGFpbmVySW5mbyx0aGlzLl9wcm9jZXNzQ2hpbGRDb250ZXh0KHQpLDApO3RoaXMuX3JlcGxhY2VOb2RlV2l0aE1hcmt1cChpLHUsbil9fSxfcmVwbGFjZU5vZGVXaXRoTWFya3VwOmZ1bmN0aW9uKGUsdCxuKXtsLnJlcGxhY2VOb2RlV2l0aE1hcmt1cChlLHQsbil9LF9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnRXaXRob3V0T3duZXJPckNvbnRleHQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5faW5zdGFuY2UucmVuZGVyKCl9LF9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnQ6ZnVuY3Rpb24oKXt2YXIgZTtpZih0aGlzLl9jb21wb3NpdGVUeXBlIT09eS5TdGF0ZWxlc3NGdW5jdGlvbmFsKXtjLmN1cnJlbnQ9dGhpczt0cnl7ZT10aGlzLl9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnRXaXRob3V0T3duZXJPckNvbnRleHQoKX1maW5hbGx5e2MuY3VycmVudD1udWxsfX1lbHNlIGU9dGhpcy5fcmVuZGVyVmFsaWRhdGVkQ29tcG9uZW50V2l0aG91dE93bmVyT3JDb250ZXh0KCk7cmV0dXJuIG51bGw9PT1lfHwhMT09PWV8fHUuaXNWYWxpZEVsZW1lbnQoZSl8fGEoXCIxMDlcIix0aGlzLmdldE5hbWUoKXx8XCJSZWFjdENvbXBvc2l0ZUNvbXBvbmVudFwiKSxlfSxhdHRhY2hSZWY6ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzLmdldFB1YmxpY0luc3RhbmNlKCk7bnVsbD09biYmYShcIjExMFwiKTt2YXIgcj10LmdldFB1YmxpY0luc3RhbmNlKCk7KG4ucmVmcz09PW0/bi5yZWZzPXt9Om4ucmVmcylbZV09cn0sZGV0YWNoUmVmOmZ1bmN0aW9uKGUpe2RlbGV0ZSB0aGlzLmdldFB1YmxpY0luc3RhbmNlKCkucmVmc1tlXX0sZ2V0TmFtZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMuX2N1cnJlbnRFbGVtZW50LnR5cGUsdD10aGlzLl9pbnN0YW5jZSYmdGhpcy5faW5zdGFuY2UuY29uc3RydWN0b3I7cmV0dXJuIGUuZGlzcGxheU5hbWV8fHQmJnQuZGlzcGxheU5hbWV8fGUubmFtZXx8dCYmdC5uYW1lfHxudWxsfSxnZXRQdWJsaWNJbnN0YW5jZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMuX2luc3RhbmNlO3JldHVybiB0aGlzLl9jb21wb3NpdGVUeXBlPT09eS5TdGF0ZWxlc3NGdW5jdGlvbmFsP251bGw6ZX0sX2luc3RhbnRpYXRlUmVhY3RDb21wb25lbnQ6bnVsbH07dC5leHBvcnRzPUN9LHsxMTI6MTEyLDExNjoxMTYsMTE5OjExOSwxMjA6MTIwLDEzMDoxMzAsMTM3OjEzNywxNDE6MTQxLDE0MjoxNDIsMTQzOjE0MywyODoyOCw1MDo1MCw1Nzo1Nyw1ODo1OCw2Mjo2Miw2Njo2Nn1dLDMwOltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9ZSgzMyksbz1lKDQ3KSxpPWUoNjApLGE9ZSg2Nikscz1lKDcxKSx1PWUoNzIpLGw9ZSg5NiksYz1lKDEwMykscD1lKDExMyk7ZSgxNDIpO28uaW5qZWN0KCk7dmFyIGQ9e2ZpbmRET01Ob2RlOmwscmVuZGVyOmkucmVuZGVyLHVubW91bnRDb21wb25lbnRBdE5vZGU6aS51bm1vdW50Q29tcG9uZW50QXROb2RlLHZlcnNpb246dSx1bnN0YWJsZV9iYXRjaGVkVXBkYXRlczpzLmJhdGNoZWRVcGRhdGVzLHVuc3RhYmxlX3JlbmRlclN1YnRyZWVJbnRvQ29udGFpbmVyOnB9O1widW5kZWZpbmVkXCIhPXR5cGVvZiBfX1JFQUNUX0RFVlRPT0xTX0dMT0JBTF9IT09LX18mJlwiZnVuY3Rpb25cIj09dHlwZW9mIF9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXy5pbmplY3QmJl9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXy5pbmplY3Qoe0NvbXBvbmVudFRyZWU6e2dldENsb3Nlc3RJbnN0YW5jZUZyb21Ob2RlOnIuZ2V0Q2xvc2VzdEluc3RhbmNlRnJvbU5vZGUsZ2V0Tm9kZUZyb21JbnN0YW5jZTpmdW5jdGlvbihlKXtyZXR1cm4gZS5fcmVuZGVyZWRDb21wb25lbnQmJihlPWMoZSkpLGU/ci5nZXROb2RlRnJvbUluc3RhbmNlKGUpOm51bGx9fSxNb3VudDppLFJlY29uY2lsZXI6YX0pO3QuZXhwb3J0cz1kfSx7MTAzOjEwMywxMTM6MTEzLDE0MjoxNDIsMzM6MzMsNDc6NDcsNjA6NjAsNjY6NjYsNzE6NzEsNzI6NzIsOTY6OTZ9XSwzMTpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7aWYoZSl7dmFyIHQ9ZS5fY3VycmVudEVsZW1lbnQuX293bmVyfHxudWxsO2lmKHQpe3ZhciBuPXQuZ2V0TmFtZSgpO2lmKG4pcmV0dXJuXCIgVGhpcyBET00gbm9kZSB3YXMgcmVuZGVyZWQgYnkgYFwiK24rXCJgLlwifX1yZXR1cm5cIlwifWZ1bmN0aW9uIG8oZSx0KXt0JiYoWVtlLl90YWddJiYobnVsbCE9dC5jaGlsZHJlbnx8bnVsbCE9dC5kYW5nZXJvdXNseVNldElubmVySFRNTCkmJm0oXCIxMzdcIixlLl90YWcsZS5fY3VycmVudEVsZW1lbnQuX293bmVyP1wiIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIFwiK2UuX2N1cnJlbnRFbGVtZW50Ll9vd25lci5nZXROYW1lKCkrXCIuXCI6XCJcIiksbnVsbCE9dC5kYW5nZXJvdXNseVNldElubmVySFRNTCYmKG51bGwhPXQuY2hpbGRyZW4mJm0oXCI2MFwiKSxcIm9iamVjdFwiPT10eXBlb2YgdC5kYW5nZXJvdXNseVNldElubmVySFRNTCYmQiBpbiB0LmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MfHxtKFwiNjFcIikpLG51bGwhPXQuc3R5bGUmJlwib2JqZWN0XCIhPXR5cGVvZiB0LnN0eWxlJiZtKFwiNjJcIixyKGUpKSl9ZnVuY3Rpb24gaShlLHQsbixyKXtpZighKHIgaW5zdGFuY2VvZiBSKSl7dmFyIG89ZS5faG9zdENvbnRhaW5lckluZm8saT1vLl9ub2RlJiZvLl9ub2RlLm5vZGVUeXBlPT09SCxzPWk/by5fbm9kZTpvLl9vd25lckRvY3VtZW50O0YodCxzKSxyLmdldFJlYWN0TW91bnRSZWFkeSgpLmVucXVldWUoYSx7aW5zdDplLHJlZ2lzdHJhdGlvbk5hbWU6dCxsaXN0ZW5lcjpufSl9fWZ1bmN0aW9uIGEoKXt2YXIgZT10aGlzO3gucHV0TGlzdGVuZXIoZS5pbnN0LGUucmVnaXN0cmF0aW9uTmFtZSxlLmxpc3RlbmVyKX1mdW5jdGlvbiBzKCl7dmFyIGU9dGhpcztTLnBvc3RNb3VudFdyYXBwZXIoZSl9ZnVuY3Rpb24gdSgpe3ZhciBlPXRoaXM7SS5wb3N0TW91bnRXcmFwcGVyKGUpfWZ1bmN0aW9uIGwoKXt2YXIgZT10aGlzO04ucG9zdE1vdW50V3JhcHBlcihlKX1mdW5jdGlvbiBjKCl7dmFyIGU9dGhpcztlLl9yb290Tm9kZUlEfHxtKFwiNjNcIik7dmFyIHQ9VShlKTtzd2l0Y2godHx8bShcIjY0XCIpLGUuX3RhZyl7Y2FzZVwiaWZyYW1lXCI6Y2FzZVwib2JqZWN0XCI6ZS5fd3JhcHBlclN0YXRlLmxpc3RlbmVycz1bVC50cmFwQnViYmxlZEV2ZW50KFwidG9wTG9hZFwiLFwibG9hZFwiLHQpXTticmVhaztjYXNlXCJ2aWRlb1wiOmNhc2VcImF1ZGlvXCI6ZS5fd3JhcHBlclN0YXRlLmxpc3RlbmVycz1bXTtmb3IodmFyIG4gaW4gcSlxLmhhc093blByb3BlcnR5KG4pJiZlLl93cmFwcGVyU3RhdGUubGlzdGVuZXJzLnB1c2goVC50cmFwQnViYmxlZEV2ZW50KG4scVtuXSx0KSk7YnJlYWs7Y2FzZVwic291cmNlXCI6ZS5fd3JhcHBlclN0YXRlLmxpc3RlbmVycz1bVC50cmFwQnViYmxlZEV2ZW50KFwidG9wRXJyb3JcIixcImVycm9yXCIsdCldO2JyZWFrO2Nhc2VcImltZ1wiOmUuX3dyYXBwZXJTdGF0ZS5saXN0ZW5lcnM9W1QudHJhcEJ1YmJsZWRFdmVudChcInRvcEVycm9yXCIsXCJlcnJvclwiLHQpLFQudHJhcEJ1YmJsZWRFdmVudChcInRvcExvYWRcIixcImxvYWRcIix0KV07YnJlYWs7Y2FzZVwiZm9ybVwiOmUuX3dyYXBwZXJTdGF0ZS5saXN0ZW5lcnM9W1QudHJhcEJ1YmJsZWRFdmVudChcInRvcFJlc2V0XCIsXCJyZXNldFwiLHQpLFQudHJhcEJ1YmJsZWRFdmVudChcInRvcFN1Ym1pdFwiLFwic3VibWl0XCIsdCldO2JyZWFrO2Nhc2VcImlucHV0XCI6Y2FzZVwic2VsZWN0XCI6Y2FzZVwidGV4dGFyZWFcIjplLl93cmFwcGVyU3RhdGUubGlzdGVuZXJzPVtULnRyYXBCdWJibGVkRXZlbnQoXCJ0b3BJbnZhbGlkXCIsXCJpbnZhbGlkXCIsdCldfX1mdW5jdGlvbiBwKCl7TS5wb3N0VXBkYXRlV3JhcHBlcih0aGlzKX1mdW5jdGlvbiBkKGUpe0cuY2FsbChRLGUpfHwoWC50ZXN0KGUpfHxtKFwiNjVcIixlKSxRW2VdPSEwKX1mdW5jdGlvbiBmKGUsdCl7cmV0dXJuIGUuaW5kZXhPZihcIi1cIik+PTB8fG51bGwhPXQuaXN9ZnVuY3Rpb24gaChlKXt2YXIgdD1lLnR5cGU7ZCh0KSx0aGlzLl9jdXJyZW50RWxlbWVudD1lLHRoaXMuX3RhZz10LnRvTG93ZXJDYXNlKCksdGhpcy5fbmFtZXNwYWNlVVJJPW51bGwsdGhpcy5fcmVuZGVyZWRDaGlsZHJlbj1udWxsLHRoaXMuX3ByZXZpb3VzU3R5bGU9bnVsbCx0aGlzLl9wcmV2aW91c1N0eWxlQ29weT1udWxsLHRoaXMuX2hvc3ROb2RlPW51bGwsdGhpcy5faG9zdFBhcmVudD1udWxsLHRoaXMuX3Jvb3ROb2RlSUQ9MCx0aGlzLl9kb21JRD0wLHRoaXMuX2hvc3RDb250YWluZXJJbmZvPW51bGwsdGhpcy5fd3JhcHBlclN0YXRlPW51bGwsdGhpcy5fdG9wTGV2ZWxXcmFwcGVyPW51bGwsdGhpcy5fZmxhZ3M9MH12YXIgbT1lKDExMiksdj1lKDE0MyksZz1lKDIpLHk9ZSg1KSxfPWUoOSksQz1lKDEwKSxiPWUoMTEpLEU9ZSgxMikseD1lKDE2KSx3PWUoMTcpLFQ9ZSgyNSksaz1lKDMyKSxQPWUoMzMpLFM9ZSgzOCksTj1lKDM5KSxNPWUoNDApLEk9ZSg0MyksTz0oZSg1OCksZSg2MSkpLFI9ZSg2OCksQT0oZSgxMjkpLGUoOTUpKSxEPShlKDEzNyksZSgxMDkpLGUoMTQxKSxlKDExOCksZSgxNDIpLGspLEw9eC5kZWxldGVMaXN0ZW5lcixVPVAuZ2V0Tm9kZUZyb21JbnN0YW5jZSxGPVQubGlzdGVuVG8saj13LnJlZ2lzdHJhdGlvbk5hbWVNb2R1bGVzLFY9e3N0cmluZzohMCxudW1iZXI6ITB9LEI9XCJfX2h0bWxcIixXPXtjaGlsZHJlbjpudWxsLGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOm51bGwsc3VwcHJlc3NDb250ZW50RWRpdGFibGVXYXJuaW5nOm51bGx9LEg9MTEscT17dG9wQWJvcnQ6XCJhYm9ydFwiLHRvcENhblBsYXk6XCJjYW5wbGF5XCIsdG9wQ2FuUGxheVRocm91Z2g6XCJjYW5wbGF5dGhyb3VnaFwiLHRvcER1cmF0aW9uQ2hhbmdlOlwiZHVyYXRpb25jaGFuZ2VcIix0b3BFbXB0aWVkOlwiZW1wdGllZFwiLHRvcEVuY3J5cHRlZDpcImVuY3J5cHRlZFwiLHRvcEVuZGVkOlwiZW5kZWRcIix0b3BFcnJvcjpcImVycm9yXCIsdG9wTG9hZGVkRGF0YTpcImxvYWRlZGRhdGFcIix0b3BMb2FkZWRNZXRhZGF0YTpcImxvYWRlZG1ldGFkYXRhXCIsdG9wTG9hZFN0YXJ0OlwibG9hZHN0YXJ0XCIsdG9wUGF1c2U6XCJwYXVzZVwiLHRvcFBsYXk6XCJwbGF5XCIsdG9wUGxheWluZzpcInBsYXlpbmdcIix0b3BQcm9ncmVzczpcInByb2dyZXNzXCIsdG9wUmF0ZUNoYW5nZTpcInJhdGVjaGFuZ2VcIix0b3BTZWVrZWQ6XCJzZWVrZWRcIix0b3BTZWVraW5nOlwic2Vla2luZ1wiLHRvcFN0YWxsZWQ6XCJzdGFsbGVkXCIsdG9wU3VzcGVuZDpcInN1c3BlbmRcIix0b3BUaW1lVXBkYXRlOlwidGltZXVwZGF0ZVwiLHRvcFZvbHVtZUNoYW5nZTpcInZvbHVtZWNoYW5nZVwiLHRvcFdhaXRpbmc6XCJ3YWl0aW5nXCJ9LEs9e2FyZWE6ITAsYmFzZTohMCxicjohMCxjb2w6ITAsZW1iZWQ6ITAsaHI6ITAsaW1nOiEwLGlucHV0OiEwLGtleWdlbjohMCxsaW5rOiEwLG1ldGE6ITAscGFyYW06ITAsc291cmNlOiEwLHRyYWNrOiEwLHdicjohMH0sej17bGlzdGluZzohMCxwcmU6ITAsdGV4dGFyZWE6ITB9LFk9dih7bWVudWl0ZW06ITB9LEspLFg9L15bYS16QS1aXVthLXpBLVo6X1xcLlxcLVxcZF0qJC8sUT17fSxHPXt9Lmhhc093blByb3BlcnR5LCQ9MTtoLmRpc3BsYXlOYW1lPVwiUmVhY3RET01Db21wb25lbnRcIixoLk1peGluPXttb3VudENvbXBvbmVudDpmdW5jdGlvbihlLHQsbixyKXt0aGlzLl9yb290Tm9kZUlEPSQrKyx0aGlzLl9kb21JRD1uLl9pZENvdW50ZXIrKyx0aGlzLl9ob3N0UGFyZW50PXQsdGhpcy5faG9zdENvbnRhaW5lckluZm89bjt2YXIgaT10aGlzLl9jdXJyZW50RWxlbWVudC5wcm9wcztzd2l0Y2godGhpcy5fdGFnKXtjYXNlXCJhdWRpb1wiOmNhc2VcImZvcm1cIjpjYXNlXCJpZnJhbWVcIjpjYXNlXCJpbWdcIjpjYXNlXCJsaW5rXCI6Y2FzZVwib2JqZWN0XCI6Y2FzZVwic291cmNlXCI6Y2FzZVwidmlkZW9cIjp0aGlzLl93cmFwcGVyU3RhdGU9e2xpc3RlbmVyczpudWxsfSxlLmdldFJlYWN0TW91bnRSZWFkeSgpLmVucXVldWUoYyx0aGlzKTticmVhaztjYXNlXCJpbnB1dFwiOlMubW91bnRXcmFwcGVyKHRoaXMsaSx0KSxpPVMuZ2V0SG9zdFByb3BzKHRoaXMsaSksZS5nZXRSZWFjdE1vdW50UmVhZHkoKS5lbnF1ZXVlKGMsdGhpcyk7YnJlYWs7Y2FzZVwib3B0aW9uXCI6Ti5tb3VudFdyYXBwZXIodGhpcyxpLHQpLGk9Ti5nZXRIb3N0UHJvcHModGhpcyxpKTticmVhaztjYXNlXCJzZWxlY3RcIjpNLm1vdW50V3JhcHBlcih0aGlzLGksdCksaT1NLmdldEhvc3RQcm9wcyh0aGlzLGkpLGUuZ2V0UmVhY3RNb3VudFJlYWR5KCkuZW5xdWV1ZShjLHRoaXMpO2JyZWFrO2Nhc2VcInRleHRhcmVhXCI6SS5tb3VudFdyYXBwZXIodGhpcyxpLHQpLGk9SS5nZXRIb3N0UHJvcHModGhpcyxpKSxlLmdldFJlYWN0TW91bnRSZWFkeSgpLmVucXVldWUoYyx0aGlzKX1vKHRoaXMsaSk7dmFyIGEscDtudWxsIT10PyhhPXQuX25hbWVzcGFjZVVSSSxwPXQuX3RhZyk6bi5fdGFnJiYoYT1uLl9uYW1lc3BhY2VVUkkscD1uLl90YWcpLChudWxsPT1hfHxhPT09Qy5zdmcmJlwiZm9yZWlnbm9iamVjdFwiPT09cCkmJihhPUMuaHRtbCksYT09PUMuaHRtbCYmKFwic3ZnXCI9PT10aGlzLl90YWc/YT1DLnN2ZzpcIm1hdGhcIj09PXRoaXMuX3RhZyYmKGE9Qy5tYXRobWwpKSx0aGlzLl9uYW1lc3BhY2VVUkk9YTt2YXIgZDtpZihlLnVzZUNyZWF0ZUVsZW1lbnQpe3ZhciBmLGg9bi5fb3duZXJEb2N1bWVudDtpZihhPT09Qy5odG1sKWlmKFwic2NyaXB0XCI9PT10aGlzLl90YWcpe3ZhciBtPWguY3JlYXRlRWxlbWVudChcImRpdlwiKSx2PXRoaXMuX2N1cnJlbnRFbGVtZW50LnR5cGU7bS5pbm5lckhUTUw9XCI8XCIrditcIj48L1wiK3YrXCI+XCIsZj1tLnJlbW92ZUNoaWxkKG0uZmlyc3RDaGlsZCl9ZWxzZSBmPWkuaXM/aC5jcmVhdGVFbGVtZW50KHRoaXMuX2N1cnJlbnRFbGVtZW50LnR5cGUsaS5pcyk6aC5jcmVhdGVFbGVtZW50KHRoaXMuX2N1cnJlbnRFbGVtZW50LnR5cGUpO2Vsc2UgZj1oLmNyZWF0ZUVsZW1lbnROUyhhLHRoaXMuX2N1cnJlbnRFbGVtZW50LnR5cGUpO1AucHJlY2FjaGVOb2RlKHRoaXMsZiksdGhpcy5fZmxhZ3N8PUQuaGFzQ2FjaGVkQ2hpbGROb2Rlcyx0aGlzLl9ob3N0UGFyZW50fHxFLnNldEF0dHJpYnV0ZUZvclJvb3QoZiksdGhpcy5fdXBkYXRlRE9NUHJvcGVydGllcyhudWxsLGksZSk7dmFyIHk9XyhmKTt0aGlzLl9jcmVhdGVJbml0aWFsQ2hpbGRyZW4oZSxpLHIseSksZD15fWVsc2V7dmFyIGI9dGhpcy5fY3JlYXRlT3BlblRhZ01hcmt1cEFuZFB1dExpc3RlbmVycyhlLGkpLHg9dGhpcy5fY3JlYXRlQ29udGVudE1hcmt1cChlLGkscik7ZD0heCYmS1t0aGlzLl90YWddP2IrXCIvPlwiOmIrXCI+XCIreCtcIjwvXCIrdGhpcy5fY3VycmVudEVsZW1lbnQudHlwZStcIj5cIn1zd2l0Y2godGhpcy5fdGFnKXtjYXNlXCJpbnB1dFwiOmUuZ2V0UmVhY3RNb3VudFJlYWR5KCkuZW5xdWV1ZShzLHRoaXMpLGkuYXV0b0ZvY3VzJiZlLmdldFJlYWN0TW91bnRSZWFkeSgpLmVucXVldWUoZy5mb2N1c0RPTUNvbXBvbmVudCx0aGlzKTticmVhaztjYXNlXCJ0ZXh0YXJlYVwiOmUuZ2V0UmVhY3RNb3VudFJlYWR5KCkuZW5xdWV1ZSh1LHRoaXMpLGkuYXV0b0ZvY3VzJiZlLmdldFJlYWN0TW91bnRSZWFkeSgpLmVucXVldWUoZy5mb2N1c0RPTUNvbXBvbmVudCx0aGlzKTticmVhaztjYXNlXCJzZWxlY3RcIjpjYXNlXCJidXR0b25cIjppLmF1dG9Gb2N1cyYmZS5nZXRSZWFjdE1vdW50UmVhZHkoKS5lbnF1ZXVlKGcuZm9jdXNET01Db21wb25lbnQsdGhpcyk7YnJlYWs7Y2FzZVwib3B0aW9uXCI6ZS5nZXRSZWFjdE1vdW50UmVhZHkoKS5lbnF1ZXVlKGwsdGhpcyl9cmV0dXJuIGR9LF9jcmVhdGVPcGVuVGFnTWFya3VwQW5kUHV0TGlzdGVuZXJzOmZ1bmN0aW9uKGUsdCl7dmFyIG49XCI8XCIrdGhpcy5fY3VycmVudEVsZW1lbnQudHlwZTtmb3IodmFyIHIgaW4gdClpZih0Lmhhc093blByb3BlcnR5KHIpKXt2YXIgbz10W3JdO2lmKG51bGwhPW8paWYoai5oYXNPd25Qcm9wZXJ0eShyKSlvJiZpKHRoaXMscixvLGUpO2Vsc2V7XCJzdHlsZVwiPT09ciYmKG8mJihvPXRoaXMuX3ByZXZpb3VzU3R5bGVDb3B5PXYoe30sdC5zdHlsZSkpLG89eS5jcmVhdGVNYXJrdXBGb3JTdHlsZXMobyx0aGlzKSk7dmFyIGE9bnVsbDtudWxsIT10aGlzLl90YWcmJmYodGhpcy5fdGFnLHQpP1cuaGFzT3duUHJvcGVydHkocil8fChhPUUuY3JlYXRlTWFya3VwRm9yQ3VzdG9tQXR0cmlidXRlKHIsbykpOmE9RS5jcmVhdGVNYXJrdXBGb3JQcm9wZXJ0eShyLG8pLGEmJihuKz1cIiBcIithKX19cmV0dXJuIGUucmVuZGVyVG9TdGF0aWNNYXJrdXA/bjoodGhpcy5faG9zdFBhcmVudHx8KG4rPVwiIFwiK0UuY3JlYXRlTWFya3VwRm9yUm9vdCgpKSxuKz1cIiBcIitFLmNyZWF0ZU1hcmt1cEZvcklEKHRoaXMuX2RvbUlEKSl9LF9jcmVhdGVDb250ZW50TWFya3VwOmZ1bmN0aW9uKGUsdCxuKXt2YXIgcj1cIlwiLG89dC5kYW5nZXJvdXNseVNldElubmVySFRNTDtpZihudWxsIT1vKW51bGwhPW8uX19odG1sJiYocj1vLl9faHRtbCk7ZWxzZXt2YXIgaT1WW3R5cGVvZiB0LmNoaWxkcmVuXT90LmNoaWxkcmVuOm51bGwsYT1udWxsIT1pP251bGw6dC5jaGlsZHJlbjtpZihudWxsIT1pKXI9QShpKTtlbHNlIGlmKG51bGwhPWEpe3ZhciBzPXRoaXMubW91bnRDaGlsZHJlbihhLGUsbik7cj1zLmpvaW4oXCJcIil9fXJldHVybiB6W3RoaXMuX3RhZ10mJlwiXFxuXCI9PT1yLmNoYXJBdCgwKT9cIlxcblwiK3I6cn0sX2NyZWF0ZUluaXRpYWxDaGlsZHJlbjpmdW5jdGlvbihlLHQsbixyKXt2YXIgbz10LmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MO2lmKG51bGwhPW8pbnVsbCE9by5fX2h0bWwmJl8ucXVldWVIVE1MKHIsby5fX2h0bWwpO2Vsc2V7dmFyIGk9Vlt0eXBlb2YgdC5jaGlsZHJlbl0/dC5jaGlsZHJlbjpudWxsLGE9bnVsbCE9aT9udWxsOnQuY2hpbGRyZW47aWYobnVsbCE9aSlcIlwiIT09aSYmXy5xdWV1ZVRleHQocixpKTtlbHNlIGlmKG51bGwhPWEpZm9yKHZhciBzPXRoaXMubW91bnRDaGlsZHJlbihhLGUsbiksdT0wO3U8cy5sZW5ndGg7dSsrKV8ucXVldWVDaGlsZChyLHNbdV0pfX0scmVjZWl2ZUNvbXBvbmVudDpmdW5jdGlvbihlLHQsbil7dmFyIHI9dGhpcy5fY3VycmVudEVsZW1lbnQ7dGhpcy5fY3VycmVudEVsZW1lbnQ9ZSx0aGlzLnVwZGF0ZUNvbXBvbmVudCh0LHIsZSxuKX0sdXBkYXRlQ29tcG9uZW50OmZ1bmN0aW9uKGUsdCxuLHIpe3ZhciBpPXQucHJvcHMsYT10aGlzLl9jdXJyZW50RWxlbWVudC5wcm9wcztzd2l0Y2godGhpcy5fdGFnKXtjYXNlXCJpbnB1dFwiOmk9Uy5nZXRIb3N0UHJvcHModGhpcyxpKSxhPVMuZ2V0SG9zdFByb3BzKHRoaXMsYSk7YnJlYWs7Y2FzZVwib3B0aW9uXCI6aT1OLmdldEhvc3RQcm9wcyh0aGlzLGkpLGE9Ti5nZXRIb3N0UHJvcHModGhpcyxhKTticmVhaztjYXNlXCJzZWxlY3RcIjppPU0uZ2V0SG9zdFByb3BzKHRoaXMsaSksYT1NLmdldEhvc3RQcm9wcyh0aGlzLGEpO2JyZWFrO2Nhc2VcInRleHRhcmVhXCI6aT1JLmdldEhvc3RQcm9wcyh0aGlzLGkpLGE9SS5nZXRIb3N0UHJvcHModGhpcyxhKX1zd2l0Y2gobyh0aGlzLGEpLHRoaXMuX3VwZGF0ZURPTVByb3BlcnRpZXMoaSxhLGUpLHRoaXMuX3VwZGF0ZURPTUNoaWxkcmVuKGksYSxlLHIpLHRoaXMuX3RhZyl7Y2FzZVwiaW5wdXRcIjpTLnVwZGF0ZVdyYXBwZXIodGhpcyk7YnJlYWs7Y2FzZVwidGV4dGFyZWFcIjpJLnVwZGF0ZVdyYXBwZXIodGhpcyk7YnJlYWs7Y2FzZVwic2VsZWN0XCI6ZS5nZXRSZWFjdE1vdW50UmVhZHkoKS5lbnF1ZXVlKHAsdGhpcyl9fSxfdXBkYXRlRE9NUHJvcGVydGllczpmdW5jdGlvbihlLHQsbil7dmFyIHIsbyxhO2ZvcihyIGluIGUpaWYoIXQuaGFzT3duUHJvcGVydHkocikmJmUuaGFzT3duUHJvcGVydHkocikmJm51bGwhPWVbcl0paWYoXCJzdHlsZVwiPT09cil7dmFyIHM9dGhpcy5fcHJldmlvdXNTdHlsZUNvcHk7Zm9yKG8gaW4gcylzLmhhc093blByb3BlcnR5KG8pJiYoYT1hfHx7fSxhW29dPVwiXCIpO3RoaXMuX3ByZXZpb3VzU3R5bGVDb3B5PW51bGx9ZWxzZSBqLmhhc093blByb3BlcnR5KHIpP2Vbcl0mJkwodGhpcyxyKTpmKHRoaXMuX3RhZyxlKT9XLmhhc093blByb3BlcnR5KHIpfHxFLmRlbGV0ZVZhbHVlRm9yQXR0cmlidXRlKFUodGhpcykscik6KGIucHJvcGVydGllc1tyXXx8Yi5pc0N1c3RvbUF0dHJpYnV0ZShyKSkmJkUuZGVsZXRlVmFsdWVGb3JQcm9wZXJ0eShVKHRoaXMpLHIpO2ZvcihyIGluIHQpe3ZhciB1PXRbcl0sbD1cInN0eWxlXCI9PT1yP3RoaXMuX3ByZXZpb3VzU3R5bGVDb3B5Om51bGwhPWU/ZVtyXTp2b2lkIDA7aWYodC5oYXNPd25Qcm9wZXJ0eShyKSYmdSE9PWwmJihudWxsIT11fHxudWxsIT1sKSlpZihcInN0eWxlXCI9PT1yKWlmKHU/dT10aGlzLl9wcmV2aW91c1N0eWxlQ29weT12KHt9LHUpOnRoaXMuX3ByZXZpb3VzU3R5bGVDb3B5PW51bGwsbCl7Zm9yKG8gaW4gbCkhbC5oYXNPd25Qcm9wZXJ0eShvKXx8dSYmdS5oYXNPd25Qcm9wZXJ0eShvKXx8KGE9YXx8e30sYVtvXT1cIlwiKTtmb3IobyBpbiB1KXUuaGFzT3duUHJvcGVydHkobykmJmxbb10hPT11W29dJiYoYT1hfHx7fSxhW29dPXVbb10pfWVsc2UgYT11O2Vsc2UgaWYoai5oYXNPd25Qcm9wZXJ0eShyKSl1P2kodGhpcyxyLHUsbik6bCYmTCh0aGlzLHIpO2Vsc2UgaWYoZih0aGlzLl90YWcsdCkpVy5oYXNPd25Qcm9wZXJ0eShyKXx8RS5zZXRWYWx1ZUZvckF0dHJpYnV0ZShVKHRoaXMpLHIsdSk7ZWxzZSBpZihiLnByb3BlcnRpZXNbcl18fGIuaXNDdXN0b21BdHRyaWJ1dGUocikpe3ZhciBjPVUodGhpcyk7bnVsbCE9dT9FLnNldFZhbHVlRm9yUHJvcGVydHkoYyxyLHUpOkUuZGVsZXRlVmFsdWVGb3JQcm9wZXJ0eShjLHIpfX1hJiZ5LnNldFZhbHVlRm9yU3R5bGVzKFUodGhpcyksYSx0aGlzKX0sX3VwZGF0ZURPTUNoaWxkcmVuOmZ1bmN0aW9uKGUsdCxuLHIpe3ZhciBvPVZbdHlwZW9mIGUuY2hpbGRyZW5dP2UuY2hpbGRyZW46bnVsbCxpPVZbdHlwZW9mIHQuY2hpbGRyZW5dP3QuY2hpbGRyZW46bnVsbCxhPWUuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwmJmUuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwuX19odG1sLHM9dC5kYW5nZXJvdXNseVNldElubmVySFRNTCYmdC5kYW5nZXJvdXNseVNldElubmVySFRNTC5fX2h0bWwsdT1udWxsIT1vP251bGw6ZS5jaGlsZHJlbixsPW51bGwhPWk/bnVsbDp0LmNoaWxkcmVuLGM9bnVsbCE9b3x8bnVsbCE9YSxwPW51bGwhPWl8fG51bGwhPXM7bnVsbCE9dSYmbnVsbD09bD90aGlzLnVwZGF0ZUNoaWxkcmVuKG51bGwsbixyKTpjJiYhcCYmdGhpcy51cGRhdGVUZXh0Q29udGVudChcIlwiKSxudWxsIT1pP28hPT1pJiZ0aGlzLnVwZGF0ZVRleHRDb250ZW50KFwiXCIraSk6bnVsbCE9cz9hIT09cyYmdGhpcy51cGRhdGVNYXJrdXAoXCJcIitzKTpudWxsIT1sJiZ0aGlzLnVwZGF0ZUNoaWxkcmVuKGwsbixyKX0sZ2V0SG9zdE5vZGU6ZnVuY3Rpb24oKXtyZXR1cm4gVSh0aGlzKX0sdW5tb3VudENvbXBvbmVudDpmdW5jdGlvbihlKXtzd2l0Y2godGhpcy5fdGFnKXtjYXNlXCJhdWRpb1wiOmNhc2VcImZvcm1cIjpjYXNlXCJpZnJhbWVcIjpjYXNlXCJpbWdcIjpjYXNlXCJsaW5rXCI6Y2FzZVwib2JqZWN0XCI6Y2FzZVwic291cmNlXCI6Y2FzZVwidmlkZW9cIjp2YXIgdD10aGlzLl93cmFwcGVyU3RhdGUubGlzdGVuZXJzO2lmKHQpZm9yKHZhciBuPTA7bjx0Lmxlbmd0aDtuKyspdFtuXS5yZW1vdmUoKTticmVhaztjYXNlXCJodG1sXCI6Y2FzZVwiaGVhZFwiOmNhc2VcImJvZHlcIjptKFwiNjZcIix0aGlzLl90YWcpfXRoaXMudW5tb3VudENoaWxkcmVuKGUpLFAudW5jYWNoZU5vZGUodGhpcykseC5kZWxldGVBbGxMaXN0ZW5lcnModGhpcyksdGhpcy5fcm9vdE5vZGVJRD0wLHRoaXMuX2RvbUlEPTAsdGhpcy5fd3JhcHBlclN0YXRlPW51bGx9LGdldFB1YmxpY0luc3RhbmNlOmZ1bmN0aW9uKCl7cmV0dXJuIFUodGhpcyl9fSx2KGgucHJvdG90eXBlLGguTWl4aW4sTy5NaXhpbiksdC5leHBvcnRzPWh9LHsxMDoxMCwxMDk6MTA5LDExOjExLDExMjoxMTIsMTE4OjExOCwxMjoxMiwxMjk6MTI5LDEzNzoxMzcsMTQxOjE0MSwxNDI6MTQyLDE0MzoxNDMsMTY6MTYsMTc6MTcsMjoyLDI1OjI1LDMyOjMyLDMzOjMzLDM4OjM4LDM5OjM5LDQwOjQwLDQzOjQzLDU6NSw1ODo1OCw2MTo2MSw2ODo2OCw5OjksOTU6OTV9XSwzMjpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3ZhciByPXtoYXNDYWNoZWRDaGlsZE5vZGVzOjF9O3QuZXhwb3J0cz1yfSx7fV0sMzM6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUsdCl7cmV0dXJuIDE9PT1lLm5vZGVUeXBlJiZlLmdldEF0dHJpYnV0ZShoKT09PVN0cmluZyh0KXx8OD09PWUubm9kZVR5cGUmJmUubm9kZVZhbHVlPT09XCIgcmVhY3QtdGV4dDogXCIrdCtcIiBcInx8OD09PWUubm9kZVR5cGUmJmUubm9kZVZhbHVlPT09XCIgcmVhY3QtZW1wdHk6IFwiK3QrXCIgXCJ9ZnVuY3Rpb24gbyhlKXtmb3IodmFyIHQ7dD1lLl9yZW5kZXJlZENvbXBvbmVudDspZT10O3JldHVybiBlfWZ1bmN0aW9uIGkoZSx0KXt2YXIgbj1vKGUpO24uX2hvc3ROb2RlPXQsdFt2XT1ufWZ1bmN0aW9uIGEoZSl7dmFyIHQ9ZS5faG9zdE5vZGU7dCYmKGRlbGV0ZSB0W3ZdLGUuX2hvc3ROb2RlPW51bGwpfWZ1bmN0aW9uIHMoZSx0KXtpZighKGUuX2ZsYWdzJm0uaGFzQ2FjaGVkQ2hpbGROb2Rlcykpe3ZhciBuPWUuX3JlbmRlcmVkQ2hpbGRyZW4sYT10LmZpcnN0Q2hpbGQ7ZTpmb3IodmFyIHMgaW4gbilpZihuLmhhc093blByb3BlcnR5KHMpKXt2YXIgdT1uW3NdLGw9byh1KS5fZG9tSUQ7aWYoMCE9PWwpe2Zvcig7bnVsbCE9PWE7YT1hLm5leHRTaWJsaW5nKWlmKHIoYSxsKSl7aSh1LGEpO2NvbnRpbnVlIGV9cChcIjMyXCIsbCl9fWUuX2ZsYWdzfD1tLmhhc0NhY2hlZENoaWxkTm9kZXN9fWZ1bmN0aW9uIHUoZSl7aWYoZVt2XSlyZXR1cm4gZVt2XTtmb3IodmFyIHQ9W107IWVbdl07KXtpZih0LnB1c2goZSksIWUucGFyZW50Tm9kZSlyZXR1cm4gbnVsbDtlPWUucGFyZW50Tm9kZX1mb3IodmFyIG4scjtlJiYocj1lW3ZdKTtlPXQucG9wKCkpbj1yLHQubGVuZ3RoJiZzKHIsZSk7cmV0dXJuIG59ZnVuY3Rpb24gbChlKXt2YXIgdD11KGUpO3JldHVybiBudWxsIT10JiZ0Ll9ob3N0Tm9kZT09PWU/dDpudWxsfWZ1bmN0aW9uIGMoZSl7aWYodm9pZCAwPT09ZS5faG9zdE5vZGUmJnAoXCIzM1wiKSxlLl9ob3N0Tm9kZSlyZXR1cm4gZS5faG9zdE5vZGU7Zm9yKHZhciB0PVtdOyFlLl9ob3N0Tm9kZTspdC5wdXNoKGUpLGUuX2hvc3RQYXJlbnR8fHAoXCIzNFwiKSxlPWUuX2hvc3RQYXJlbnQ7Zm9yKDt0Lmxlbmd0aDtlPXQucG9wKCkpcyhlLGUuX2hvc3ROb2RlKTtyZXR1cm4gZS5faG9zdE5vZGV9dmFyIHA9ZSgxMTIpLGQ9ZSgxMSksZj1lKDMyKSxoPShlKDEzNyksZC5JRF9BVFRSSUJVVEVfTkFNRSksbT1mLHY9XCJfX3JlYWN0SW50ZXJuYWxJbnN0YW5jZSRcIitNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgyKSxnPXtnZXRDbG9zZXN0SW5zdGFuY2VGcm9tTm9kZTp1LGdldEluc3RhbmNlRnJvbU5vZGU6bCxnZXROb2RlRnJvbUluc3RhbmNlOmMscHJlY2FjaGVDaGlsZE5vZGVzOnMscHJlY2FjaGVOb2RlOmksdW5jYWNoZU5vZGU6YX07dC5leHBvcnRzPWd9LHsxMToxMSwxMTI6MTEyLDEzNzoxMzcsMzI6MzJ9XSwzNDpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSx0KXtyZXR1cm57X3RvcExldmVsV3JhcHBlcjplLF9pZENvdW50ZXI6MSxfb3duZXJEb2N1bWVudDp0P3Qubm9kZVR5cGU9PT1vP3Q6dC5vd25lckRvY3VtZW50Om51bGwsX25vZGU6dCxfdGFnOnQ/dC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpOm51bGwsX25hbWVzcGFjZVVSSTp0P3QubmFtZXNwYWNlVVJJOm51bGx9fXZhciBvPShlKDExOCksOSk7dC5leHBvcnRzPXJ9LHsxMTg6MTE4fV0sMzU6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1lKDE0Myksbz1lKDkpLGk9ZSgzMyksYT1mdW5jdGlvbihlKXt0aGlzLl9jdXJyZW50RWxlbWVudD1udWxsLHRoaXMuX2hvc3ROb2RlPW51bGwsdGhpcy5faG9zdFBhcmVudD1udWxsLHRoaXMuX2hvc3RDb250YWluZXJJbmZvPW51bGwsdGhpcy5fZG9tSUQ9MH07cihhLnByb3RvdHlwZSx7bW91bnRDb21wb25lbnQ6ZnVuY3Rpb24oZSx0LG4scil7dmFyIGE9bi5faWRDb3VudGVyKys7dGhpcy5fZG9tSUQ9YSx0aGlzLl9ob3N0UGFyZW50PXQsdGhpcy5faG9zdENvbnRhaW5lckluZm89bjt2YXIgcz1cIiByZWFjdC1lbXB0eTogXCIrdGhpcy5fZG9tSUQrXCIgXCI7aWYoZS51c2VDcmVhdGVFbGVtZW50KXt2YXIgdT1uLl9vd25lckRvY3VtZW50LGw9dS5jcmVhdGVDb21tZW50KHMpO3JldHVybiBpLnByZWNhY2hlTm9kZSh0aGlzLGwpLG8obCl9cmV0dXJuIGUucmVuZGVyVG9TdGF0aWNNYXJrdXA/XCJcIjpcIjwhLS1cIitzK1wiLS0+XCJ9LHJlY2VpdmVDb21wb25lbnQ6ZnVuY3Rpb24oKXt9LGdldEhvc3ROb2RlOmZ1bmN0aW9uKCl7cmV0dXJuIGkuZ2V0Tm9kZUZyb21JbnN0YW5jZSh0aGlzKX0sdW5tb3VudENvbXBvbmVudDpmdW5jdGlvbigpe2kudW5jYWNoZU5vZGUodGhpcyl9fSksdC5leHBvcnRzPWF9LHsxNDM6MTQzLDMzOjMzLDk6OX1dLDM2OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9e3VzZUNyZWF0ZUVsZW1lbnQ6ITAsdXNlRmliZXI6ITF9O3QuZXhwb3J0cz1yfSx7fV0sMzc6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1lKDgpLG89ZSgzMyksaT17ZGFuZ2Vyb3VzbHlQcm9jZXNzQ2hpbGRyZW5VcGRhdGVzOmZ1bmN0aW9uKGUsdCl7dmFyIG49by5nZXROb2RlRnJvbUluc3RhbmNlKGUpO3IucHJvY2Vzc1VwZGF0ZXMobix0KX19O3QuZXhwb3J0cz1pfSx7MzM6MzMsODo4fV0sMzg6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKCl7dGhpcy5fcm9vdE5vZGVJRCYmZC51cGRhdGVXcmFwcGVyKHRoaXMpfWZ1bmN0aW9uIG8oZSl7cmV0dXJuXCJjaGVja2JveFwiPT09ZS50eXBlfHxcInJhZGlvXCI9PT1lLnR5cGU/bnVsbCE9ZS5jaGVja2VkOm51bGwhPWUudmFsdWV9ZnVuY3Rpb24gaShlKXt2YXIgdD10aGlzLl9jdXJyZW50RWxlbWVudC5wcm9wcyxuPWwuZXhlY3V0ZU9uQ2hhbmdlKHQsZSk7cC5hc2FwKHIsdGhpcyk7dmFyIG89dC5uYW1lO2lmKFwicmFkaW9cIj09PXQudHlwZSYmbnVsbCE9byl7Zm9yKHZhciBpPWMuZ2V0Tm9kZUZyb21JbnN0YW5jZSh0aGlzKSxzPWk7cy5wYXJlbnROb2RlOylzPXMucGFyZW50Tm9kZTtmb3IodmFyIHU9cy5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbbmFtZT1cIitKU09OLnN0cmluZ2lmeShcIlwiK28pKyddW3R5cGU9XCJyYWRpb1wiXScpLGQ9MDtkPHUubGVuZ3RoO2QrKyl7dmFyIGY9dVtkXTtpZihmIT09aSYmZi5mb3JtPT09aS5mb3JtKXt2YXIgaD1jLmdldEluc3RhbmNlRnJvbU5vZGUoZik7aHx8YShcIjkwXCIpLHAuYXNhcChyLGgpfX19cmV0dXJuIG59dmFyIGE9ZSgxMTIpLHM9ZSgxNDMpLHU9ZSgxMiksbD1lKDIzKSxjPWUoMzMpLHA9ZSg3MSksZD0oZSgxMzcpLGUoMTQyKSx7Z2V0SG9zdFByb3BzOmZ1bmN0aW9uKGUsdCl7dmFyIG49bC5nZXRWYWx1ZSh0KSxyPWwuZ2V0Q2hlY2tlZCh0KTtyZXR1cm4gcyh7dHlwZTp2b2lkIDAsc3RlcDp2b2lkIDAsbWluOnZvaWQgMCxtYXg6dm9pZCAwfSx0LHtkZWZhdWx0Q2hlY2tlZDp2b2lkIDAsZGVmYXVsdFZhbHVlOnZvaWQgMCx2YWx1ZTpudWxsIT1uP246ZS5fd3JhcHBlclN0YXRlLmluaXRpYWxWYWx1ZSxjaGVja2VkOm51bGwhPXI/cjplLl93cmFwcGVyU3RhdGUuaW5pdGlhbENoZWNrZWQsb25DaGFuZ2U6ZS5fd3JhcHBlclN0YXRlLm9uQ2hhbmdlfSl9LG1vdW50V3JhcHBlcjpmdW5jdGlvbihlLHQpe3ZhciBuPXQuZGVmYXVsdFZhbHVlO2UuX3dyYXBwZXJTdGF0ZT17aW5pdGlhbENoZWNrZWQ6bnVsbCE9dC5jaGVja2VkP3QuY2hlY2tlZDp0LmRlZmF1bHRDaGVja2VkLGluaXRpYWxWYWx1ZTpudWxsIT10LnZhbHVlP3QudmFsdWU6bixsaXN0ZW5lcnM6bnVsbCxvbkNoYW5nZTppLmJpbmQoZSksY29udHJvbGxlZDpvKHQpfX0sdXBkYXRlV3JhcHBlcjpmdW5jdGlvbihlKXt2YXIgdD1lLl9jdXJyZW50RWxlbWVudC5wcm9wcyxuPXQuY2hlY2tlZDtudWxsIT1uJiZ1LnNldFZhbHVlRm9yUHJvcGVydHkoYy5nZXROb2RlRnJvbUluc3RhbmNlKGUpLFwiY2hlY2tlZFwiLG58fCExKTt2YXIgcj1jLmdldE5vZGVGcm9tSW5zdGFuY2UoZSksbz1sLmdldFZhbHVlKHQpO2lmKG51bGwhPW8paWYoMD09PW8mJlwiXCI9PT1yLnZhbHVlKXIudmFsdWU9XCIwXCI7ZWxzZSBpZihcIm51bWJlclwiPT09dC50eXBlKXt2YXIgaT1wYXJzZUZsb2F0KHIudmFsdWUsMTApfHwwO28hPWkmJihyLnZhbHVlPVwiXCIrbyl9ZWxzZSBvIT1yLnZhbHVlJiYoci52YWx1ZT1cIlwiK28pO2Vsc2UgbnVsbD09dC52YWx1ZSYmbnVsbCE9dC5kZWZhdWx0VmFsdWUmJnIuZGVmYXVsdFZhbHVlIT09XCJcIit0LmRlZmF1bHRWYWx1ZSYmKHIuZGVmYXVsdFZhbHVlPVwiXCIrdC5kZWZhdWx0VmFsdWUpLG51bGw9PXQuY2hlY2tlZCYmbnVsbCE9dC5kZWZhdWx0Q2hlY2tlZCYmKHIuZGVmYXVsdENoZWNrZWQ9ISF0LmRlZmF1bHRDaGVja2VkKX0scG9zdE1vdW50V3JhcHBlcjpmdW5jdGlvbihlKXt2YXIgdD1lLl9jdXJyZW50RWxlbWVudC5wcm9wcyxuPWMuZ2V0Tm9kZUZyb21JbnN0YW5jZShlKTtzd2l0Y2godC50eXBlKXtjYXNlXCJzdWJtaXRcIjpjYXNlXCJyZXNldFwiOmJyZWFrO2Nhc2VcImNvbG9yXCI6Y2FzZVwiZGF0ZVwiOmNhc2VcImRhdGV0aW1lXCI6Y2FzZVwiZGF0ZXRpbWUtbG9jYWxcIjpjYXNlXCJtb250aFwiOmNhc2VcInRpbWVcIjpjYXNlXCJ3ZWVrXCI6bi52YWx1ZT1cIlwiLG4udmFsdWU9bi5kZWZhdWx0VmFsdWU7YnJlYWs7ZGVmYXVsdDpuLnZhbHVlPW4udmFsdWV9dmFyIHI9bi5uYW1lO1wiXCIhPT1yJiYobi5uYW1lPVwiXCIpLG4uZGVmYXVsdENoZWNrZWQ9IW4uZGVmYXVsdENoZWNrZWQsbi5kZWZhdWx0Q2hlY2tlZD0hbi5kZWZhdWx0Q2hlY2tlZCxcIlwiIT09ciYmKG4ubmFtZT1yKX19KTt0LmV4cG9ydHM9ZH0sezExMjoxMTIsMTI6MTIsMTM3OjEzNywxNDI6MTQyLDE0MzoxNDMsMjM6MjMsMzM6MzMsNzE6NzF9XSwzOTpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7dmFyIHQ9XCJcIjtyZXR1cm4gaS5DaGlsZHJlbi5mb3JFYWNoKGUsZnVuY3Rpb24oZSl7bnVsbCE9ZSYmKFwic3RyaW5nXCI9PXR5cGVvZiBlfHxcIm51bWJlclwiPT10eXBlb2YgZT90Kz1lOnV8fCh1PSEwKSl9KSx0fXZhciBvPWUoMTQzKSxpPWUoMTIwKSxhPWUoMzMpLHM9ZSg0MCksdT0oZSgxNDIpLCExKSxsPXttb3VudFdyYXBwZXI6ZnVuY3Rpb24oZSx0LG4pe3ZhciBvPW51bGw7aWYobnVsbCE9bil7dmFyIGk9bjtcIm9wdGdyb3VwXCI9PT1pLl90YWcmJihpPWkuX2hvc3RQYXJlbnQpLG51bGwhPWkmJlwic2VsZWN0XCI9PT1pLl90YWcmJihvPXMuZ2V0U2VsZWN0VmFsdWVDb250ZXh0KGkpKX12YXIgYT1udWxsO2lmKG51bGwhPW8pe3ZhciB1O2lmKHU9bnVsbCE9dC52YWx1ZT90LnZhbHVlK1wiXCI6cih0LmNoaWxkcmVuKSxhPSExLEFycmF5LmlzQXJyYXkobykpe2Zvcih2YXIgbD0wO2w8by5sZW5ndGg7bCsrKWlmKFwiXCIrb1tsXT09PXUpe2E9ITA7YnJlYWt9fWVsc2UgYT1cIlwiK289PT11fWUuX3dyYXBwZXJTdGF0ZT17c2VsZWN0ZWQ6YX19LHBvc3RNb3VudFdyYXBwZXI6ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5fY3VycmVudEVsZW1lbnQucHJvcHM7bnVsbCE9dC52YWx1ZSYmYS5nZXROb2RlRnJvbUluc3RhbmNlKGUpLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsdC52YWx1ZSl9LGdldEhvc3RQcm9wczpmdW5jdGlvbihlLHQpe3ZhciBuPW8oe3NlbGVjdGVkOnZvaWQgMCxjaGlsZHJlbjp2b2lkIDB9LHQpO251bGwhPWUuX3dyYXBwZXJTdGF0ZS5zZWxlY3RlZCYmKG4uc2VsZWN0ZWQ9ZS5fd3JhcHBlclN0YXRlLnNlbGVjdGVkKTt2YXIgaT1yKHQuY2hpbGRyZW4pO3JldHVybiBpJiYobi5jaGlsZHJlbj1pKSxufX07dC5leHBvcnRzPWx9LHsxMjA6MTIwLDE0MjoxNDIsMTQzOjE0MywzMzozMyw0MDo0MH1dLDQwOltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcigpe2lmKHRoaXMuX3Jvb3ROb2RlSUQmJnRoaXMuX3dyYXBwZXJTdGF0ZS5wZW5kaW5nVXBkYXRlKXt0aGlzLl93cmFwcGVyU3RhdGUucGVuZGluZ1VwZGF0ZT0hMTt2YXIgZT10aGlzLl9jdXJyZW50RWxlbWVudC5wcm9wcyx0PXMuZ2V0VmFsdWUoZSk7bnVsbCE9dCYmbyh0aGlzLEJvb2xlYW4oZS5tdWx0aXBsZSksdCl9fWZ1bmN0aW9uIG8oZSx0LG4pe3ZhciByLG8saT11LmdldE5vZGVGcm9tSW5zdGFuY2UoZSkub3B0aW9ucztpZih0KXtmb3Iocj17fSxvPTA7bzxuLmxlbmd0aDtvKyspcltcIlwiK25bb11dPSEwO2ZvcihvPTA7bzxpLmxlbmd0aDtvKyspe3ZhciBhPXIuaGFzT3duUHJvcGVydHkoaVtvXS52YWx1ZSk7aVtvXS5zZWxlY3RlZCE9PWEmJihpW29dLnNlbGVjdGVkPWEpfX1lbHNle2ZvcihyPVwiXCIrbixvPTA7bzxpLmxlbmd0aDtvKyspaWYoaVtvXS52YWx1ZT09PXIpcmV0dXJuIHZvaWQoaVtvXS5zZWxlY3RlZD0hMCk7aS5sZW5ndGgmJihpWzBdLnNlbGVjdGVkPSEwKX19ZnVuY3Rpb24gaShlKXt2YXIgdD10aGlzLl9jdXJyZW50RWxlbWVudC5wcm9wcyxuPXMuZXhlY3V0ZU9uQ2hhbmdlKHQsZSk7cmV0dXJuIHRoaXMuX3Jvb3ROb2RlSUQmJih0aGlzLl93cmFwcGVyU3RhdGUucGVuZGluZ1VwZGF0ZT0hMCksbC5hc2FwKHIsdGhpcyksbn12YXIgYT1lKDE0Mykscz1lKDIzKSx1PWUoMzMpLGw9ZSg3MSksYz0oZSgxNDIpLCExKSxwPXtnZXRIb3N0UHJvcHM6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gYSh7fSx0LHtvbkNoYW5nZTplLl93cmFwcGVyU3RhdGUub25DaGFuZ2UsdmFsdWU6dm9pZCAwfSl9LG1vdW50V3JhcHBlcjpmdW5jdGlvbihlLHQpe3ZhciBuPXMuZ2V0VmFsdWUodCk7ZS5fd3JhcHBlclN0YXRlPXtwZW5kaW5nVXBkYXRlOiExLGluaXRpYWxWYWx1ZTpudWxsIT1uP246dC5kZWZhdWx0VmFsdWUsbGlzdGVuZXJzOm51bGwsb25DaGFuZ2U6aS5iaW5kKGUpLHdhc011bHRpcGxlOkJvb2xlYW4odC5tdWx0aXBsZSl9LHZvaWQgMD09PXQudmFsdWV8fHZvaWQgMD09PXQuZGVmYXVsdFZhbHVlfHxjfHwoYz0hMCl9LGdldFNlbGVjdFZhbHVlQ29udGV4dDpmdW5jdGlvbihlKXtyZXR1cm4gZS5fd3JhcHBlclN0YXRlLmluaXRpYWxWYWx1ZX0scG9zdFVwZGF0ZVdyYXBwZXI6ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5fY3VycmVudEVsZW1lbnQucHJvcHM7ZS5fd3JhcHBlclN0YXRlLmluaXRpYWxWYWx1ZT12b2lkIDA7dmFyIG49ZS5fd3JhcHBlclN0YXRlLndhc011bHRpcGxlO2UuX3dyYXBwZXJTdGF0ZS53YXNNdWx0aXBsZT1Cb29sZWFuKHQubXVsdGlwbGUpO3ZhciByPXMuZ2V0VmFsdWUodCk7bnVsbCE9cj8oZS5fd3JhcHBlclN0YXRlLnBlbmRpbmdVcGRhdGU9ITEsbyhlLEJvb2xlYW4odC5tdWx0aXBsZSkscikpOm4hPT1Cb29sZWFuKHQubXVsdGlwbGUpJiYobnVsbCE9dC5kZWZhdWx0VmFsdWU/byhlLEJvb2xlYW4odC5tdWx0aXBsZSksdC5kZWZhdWx0VmFsdWUpOm8oZSxCb29sZWFuKHQubXVsdGlwbGUpLHQubXVsdGlwbGU/W106XCJcIikpfX07dC5leHBvcnRzPXB9LHsxNDI6MTQyLDE0MzoxNDMsMjM6MjMsMzM6MzMsNzE6NzF9XSw0MTpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSx0LG4scil7cmV0dXJuIGU9PT1uJiZ0PT09cn1mdW5jdGlvbiBvKGUpe3ZhciB0PWRvY3VtZW50LnNlbGVjdGlvbixuPXQuY3JlYXRlUmFuZ2UoKSxyPW4udGV4dC5sZW5ndGgsbz1uLmR1cGxpY2F0ZSgpO28ubW92ZVRvRWxlbWVudFRleHQoZSksby5zZXRFbmRQb2ludChcIkVuZFRvU3RhcnRcIixuKTt2YXIgaT1vLnRleHQubGVuZ3RoO3JldHVybntzdGFydDppLGVuZDppK3J9fWZ1bmN0aW9uIGkoZSl7dmFyIHQ9d2luZG93LmdldFNlbGVjdGlvbiYmd2luZG93LmdldFNlbGVjdGlvbigpO2lmKCF0fHwwPT09dC5yYW5nZUNvdW50KXJldHVybiBudWxsO3ZhciBuPXQuYW5jaG9yTm9kZSxvPXQuYW5jaG9yT2Zmc2V0LGk9dC5mb2N1c05vZGUsYT10LmZvY3VzT2Zmc2V0LHM9dC5nZXRSYW5nZUF0KDApO3RyeXtzLnN0YXJ0Q29udGFpbmVyLm5vZGVUeXBlLHMuZW5kQ29udGFpbmVyLm5vZGVUeXBlfWNhdGNoKGUpe3JldHVybiBudWxsfXZhciB1PXIodC5hbmNob3JOb2RlLHQuYW5jaG9yT2Zmc2V0LHQuZm9jdXNOb2RlLHQuZm9jdXNPZmZzZXQpLGw9dT8wOnMudG9TdHJpbmcoKS5sZW5ndGgsYz1zLmNsb25lUmFuZ2UoKTtjLnNlbGVjdE5vZGVDb250ZW50cyhlKSxjLnNldEVuZChzLnN0YXJ0Q29udGFpbmVyLHMuc3RhcnRPZmZzZXQpO3ZhciBwPXIoYy5zdGFydENvbnRhaW5lcixjLnN0YXJ0T2Zmc2V0LGMuZW5kQ29udGFpbmVyLGMuZW5kT2Zmc2V0KSxkPXA/MDpjLnRvU3RyaW5nKCkubGVuZ3RoLGY9ZCtsLGg9ZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtoLnNldFN0YXJ0KG4sbyksaC5zZXRFbmQoaSxhKTt2YXIgbT1oLmNvbGxhcHNlZDtyZXR1cm57c3RhcnQ6bT9mOmQsZW5kOm0/ZDpmfX1mdW5jdGlvbiBhKGUsdCl7dmFyIG4scixvPWRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpLmR1cGxpY2F0ZSgpO3ZvaWQgMD09PXQuZW5kPyhuPXQuc3RhcnQscj1uKTp0LnN0YXJ0PnQuZW5kPyhuPXQuZW5kLHI9dC5zdGFydCk6KG49dC5zdGFydCxyPXQuZW5kKSxvLm1vdmVUb0VsZW1lbnRUZXh0KGUpLG8ubW92ZVN0YXJ0KFwiY2hhcmFjdGVyXCIsbiksby5zZXRFbmRQb2ludChcIkVuZFRvU3RhcnRcIixvKSxvLm1vdmVFbmQoXCJjaGFyYWN0ZXJcIixyLW4pLG8uc2VsZWN0KCl9ZnVuY3Rpb24gcyhlLHQpe2lmKHdpbmRvdy5nZXRTZWxlY3Rpb24pe3ZhciBuPXdpbmRvdy5nZXRTZWxlY3Rpb24oKSxyPWVbYygpXS5sZW5ndGgsbz1NYXRoLm1pbih0LnN0YXJ0LHIpLGk9dm9pZCAwPT09dC5lbmQ/bzpNYXRoLm1pbih0LmVuZCxyKTtpZighbi5leHRlbmQmJm8+aSl7dmFyIGE9aTtpPW8sbz1hfXZhciBzPWwoZSxvKSx1PWwoZSxpKTtpZihzJiZ1KXt2YXIgcD1kb2N1bWVudC5jcmVhdGVSYW5nZSgpO3Auc2V0U3RhcnQocy5ub2RlLHMub2Zmc2V0KSxuLnJlbW92ZUFsbFJhbmdlcygpLG8+aT8obi5hZGRSYW5nZShwKSxuLmV4dGVuZCh1Lm5vZGUsdS5vZmZzZXQpKToocC5zZXRFbmQodS5ub2RlLHUub2Zmc2V0KSxuLmFkZFJhbmdlKHApKX19fXZhciB1PWUoMTIzKSxsPWUoMTA1KSxjPWUoMTA2KSxwPXUuY2FuVXNlRE9NJiZcInNlbGVjdGlvblwiaW4gZG9jdW1lbnQmJiEoXCJnZXRTZWxlY3Rpb25cImluIHdpbmRvdyksZD17Z2V0T2Zmc2V0czpwP286aSxzZXRPZmZzZXRzOnA/YTpzfTt0LmV4cG9ydHM9ZH0sezEwNToxMDUsMTA2OjEwNiwxMjM6MTIzfV0sNDI6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1lKDExMiksbz1lKDE0MyksaT1lKDgpLGE9ZSg5KSxzPWUoMzMpLHU9ZSg5NSksbD0oZSgxMzcpLGUoMTE4KSxmdW5jdGlvbihlKXt0aGlzLl9jdXJyZW50RWxlbWVudD1lLHRoaXMuX3N0cmluZ1RleHQ9XCJcIitlLFxudGhpcy5faG9zdE5vZGU9bnVsbCx0aGlzLl9ob3N0UGFyZW50PW51bGwsdGhpcy5fZG9tSUQ9MCx0aGlzLl9tb3VudEluZGV4PTAsdGhpcy5fY2xvc2luZ0NvbW1lbnQ9bnVsbCx0aGlzLl9jb21tZW50Tm9kZXM9bnVsbH0pO28obC5wcm90b3R5cGUse21vdW50Q29tcG9uZW50OmZ1bmN0aW9uKGUsdCxuLHIpe3ZhciBvPW4uX2lkQ291bnRlcisrLGk9XCIgcmVhY3QtdGV4dDogXCIrbytcIiBcIjtpZih0aGlzLl9kb21JRD1vLHRoaXMuX2hvc3RQYXJlbnQ9dCxlLnVzZUNyZWF0ZUVsZW1lbnQpe3ZhciBsPW4uX293bmVyRG9jdW1lbnQsYz1sLmNyZWF0ZUNvbW1lbnQoaSkscD1sLmNyZWF0ZUNvbW1lbnQoXCIgL3JlYWN0LXRleHQgXCIpLGQ9YShsLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSk7cmV0dXJuIGEucXVldWVDaGlsZChkLGEoYykpLHRoaXMuX3N0cmluZ1RleHQmJmEucXVldWVDaGlsZChkLGEobC5jcmVhdGVUZXh0Tm9kZSh0aGlzLl9zdHJpbmdUZXh0KSkpLGEucXVldWVDaGlsZChkLGEocCkpLHMucHJlY2FjaGVOb2RlKHRoaXMsYyksdGhpcy5fY2xvc2luZ0NvbW1lbnQ9cCxkfXZhciBmPXUodGhpcy5fc3RyaW5nVGV4dCk7cmV0dXJuIGUucmVuZGVyVG9TdGF0aWNNYXJrdXA/ZjpcIjwhLS1cIitpK1wiLS0+XCIrZitcIjwhLS0gL3JlYWN0LXRleHQgLS0+XCJ9LHJlY2VpdmVDb21wb25lbnQ6ZnVuY3Rpb24oZSx0KXtpZihlIT09dGhpcy5fY3VycmVudEVsZW1lbnQpe3RoaXMuX2N1cnJlbnRFbGVtZW50PWU7dmFyIG49XCJcIitlO2lmKG4hPT10aGlzLl9zdHJpbmdUZXh0KXt0aGlzLl9zdHJpbmdUZXh0PW47dmFyIHI9dGhpcy5nZXRIb3N0Tm9kZSgpO2kucmVwbGFjZURlbGltaXRlZFRleHQoclswXSxyWzFdLG4pfX19LGdldEhvc3ROb2RlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5fY29tbWVudE5vZGVzO2lmKGUpcmV0dXJuIGU7aWYoIXRoaXMuX2Nsb3NpbmdDb21tZW50KWZvcih2YXIgdD1zLmdldE5vZGVGcm9tSW5zdGFuY2UodGhpcyksbj10Lm5leHRTaWJsaW5nOzspe2lmKG51bGw9PW4mJnIoXCI2N1wiLHRoaXMuX2RvbUlEKSw4PT09bi5ub2RlVHlwZSYmXCIgL3JlYWN0LXRleHQgXCI9PT1uLm5vZGVWYWx1ZSl7dGhpcy5fY2xvc2luZ0NvbW1lbnQ9bjticmVha31uPW4ubmV4dFNpYmxpbmd9cmV0dXJuIGU9W3RoaXMuX2hvc3ROb2RlLHRoaXMuX2Nsb3NpbmdDb21tZW50XSx0aGlzLl9jb21tZW50Tm9kZXM9ZSxlfSx1bm1vdW50Q29tcG9uZW50OmZ1bmN0aW9uKCl7dGhpcy5fY2xvc2luZ0NvbW1lbnQ9bnVsbCx0aGlzLl9jb21tZW50Tm9kZXM9bnVsbCxzLnVuY2FjaGVOb2RlKHRoaXMpfX0pLHQuZXhwb3J0cz1sfSx7MTEyOjExMiwxMTg6MTE4LDEzNzoxMzcsMTQzOjE0MywzMzozMyw4OjgsOTo5LDk1Ojk1fV0sNDM6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKCl7dGhpcy5fcm9vdE5vZGVJRCYmYy51cGRhdGVXcmFwcGVyKHRoaXMpfWZ1bmN0aW9uIG8oZSl7dmFyIHQ9dGhpcy5fY3VycmVudEVsZW1lbnQucHJvcHMsbj1zLmV4ZWN1dGVPbkNoYW5nZSh0LGUpO3JldHVybiBsLmFzYXAocix0aGlzKSxufXZhciBpPWUoMTEyKSxhPWUoMTQzKSxzPWUoMjMpLHU9ZSgzMyksbD1lKDcxKSxjPShlKDEzNyksZSgxNDIpLHtnZXRIb3N0UHJvcHM6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gbnVsbCE9dC5kYW5nZXJvdXNseVNldElubmVySFRNTCYmaShcIjkxXCIpLGEoe30sdCx7dmFsdWU6dm9pZCAwLGRlZmF1bHRWYWx1ZTp2b2lkIDAsY2hpbGRyZW46XCJcIitlLl93cmFwcGVyU3RhdGUuaW5pdGlhbFZhbHVlLG9uQ2hhbmdlOmUuX3dyYXBwZXJTdGF0ZS5vbkNoYW5nZX0pfSxtb3VudFdyYXBwZXI6ZnVuY3Rpb24oZSx0KXt2YXIgbj1zLmdldFZhbHVlKHQpLHI9bjtpZihudWxsPT1uKXt2YXIgYT10LmRlZmF1bHRWYWx1ZSx1PXQuY2hpbGRyZW47bnVsbCE9dSYmKG51bGwhPWEmJmkoXCI5MlwiKSxBcnJheS5pc0FycmF5KHUpJiYodS5sZW5ndGg8PTF8fGkoXCI5M1wiKSx1PXVbMF0pLGE9XCJcIit1KSxudWxsPT1hJiYoYT1cIlwiKSxyPWF9ZS5fd3JhcHBlclN0YXRlPXtpbml0aWFsVmFsdWU6XCJcIityLGxpc3RlbmVyczpudWxsLG9uQ2hhbmdlOm8uYmluZChlKX19LHVwZGF0ZVdyYXBwZXI6ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5fY3VycmVudEVsZW1lbnQucHJvcHMsbj11LmdldE5vZGVGcm9tSW5zdGFuY2UoZSkscj1zLmdldFZhbHVlKHQpO2lmKG51bGwhPXIpe3ZhciBvPVwiXCIrcjtvIT09bi52YWx1ZSYmKG4udmFsdWU9byksbnVsbD09dC5kZWZhdWx0VmFsdWUmJihuLmRlZmF1bHRWYWx1ZT1vKX1udWxsIT10LmRlZmF1bHRWYWx1ZSYmKG4uZGVmYXVsdFZhbHVlPXQuZGVmYXVsdFZhbHVlKX0scG9zdE1vdW50V3JhcHBlcjpmdW5jdGlvbihlKXt2YXIgdD11LmdldE5vZGVGcm9tSW5zdGFuY2UoZSksbj10LnRleHRDb250ZW50O249PT1lLl93cmFwcGVyU3RhdGUuaW5pdGlhbFZhbHVlJiYodC52YWx1ZT1uKX19KTt0LmV4cG9ydHM9Y30sezExMjoxMTIsMTM3OjEzNywxNDI6MTQyLDE0MzoxNDMsMjM6MjMsMzM6MzMsNzE6NzF9XSw0NDpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSx0KXtcIl9ob3N0Tm9kZVwiaW4gZXx8dShcIjMzXCIpLFwiX2hvc3ROb2RlXCJpbiB0fHx1KFwiMzNcIik7Zm9yKHZhciBuPTAscj1lO3I7cj1yLl9ob3N0UGFyZW50KW4rKztmb3IodmFyIG89MCxpPXQ7aTtpPWkuX2hvc3RQYXJlbnQpbysrO2Zvcig7bi1vPjA7KWU9ZS5faG9zdFBhcmVudCxuLS07Zm9yKDtvLW4+MDspdD10Ll9ob3N0UGFyZW50LG8tLTtmb3IodmFyIGE9bjthLS07KXtpZihlPT09dClyZXR1cm4gZTtlPWUuX2hvc3RQYXJlbnQsdD10Ll9ob3N0UGFyZW50fXJldHVybiBudWxsfWZ1bmN0aW9uIG8oZSx0KXtcIl9ob3N0Tm9kZVwiaW4gZXx8dShcIjM1XCIpLFwiX2hvc3ROb2RlXCJpbiB0fHx1KFwiMzVcIik7Zm9yKDt0Oyl7aWYodD09PWUpcmV0dXJuITA7dD10Ll9ob3N0UGFyZW50fXJldHVybiExfWZ1bmN0aW9uIGkoZSl7cmV0dXJuXCJfaG9zdE5vZGVcImluIGV8fHUoXCIzNlwiKSxlLl9ob3N0UGFyZW50fWZ1bmN0aW9uIGEoZSx0LG4pe2Zvcih2YXIgcj1bXTtlOylyLnB1c2goZSksZT1lLl9ob3N0UGFyZW50O3ZhciBvO2ZvcihvPXIubGVuZ3RoO28tLSA+MDspdChyW29dLFwiY2FwdHVyZWRcIixuKTtmb3Iobz0wO288ci5sZW5ndGg7bysrKXQocltvXSxcImJ1YmJsZWRcIixuKX1mdW5jdGlvbiBzKGUsdCxuLG8saSl7Zm9yKHZhciBhPWUmJnQ/cihlLHQpOm51bGwscz1bXTtlJiZlIT09YTspcy5wdXNoKGUpLGU9ZS5faG9zdFBhcmVudDtmb3IodmFyIHU9W107dCYmdCE9PWE7KXUucHVzaCh0KSx0PXQuX2hvc3RQYXJlbnQ7dmFyIGw7Zm9yKGw9MDtsPHMubGVuZ3RoO2wrKyluKHNbbF0sXCJidWJibGVkXCIsbyk7Zm9yKGw9dS5sZW5ndGg7bC0tID4wOyluKHVbbF0sXCJjYXB0dXJlZFwiLGkpfXZhciB1PWUoMTEyKTtlKDEzNyk7dC5leHBvcnRzPXtpc0FuY2VzdG9yOm8sZ2V0TG93ZXN0Q29tbW9uQW5jZXN0b3I6cixnZXRQYXJlbnRJbnN0YW5jZTppLHRyYXZlcnNlVHdvUGhhc2U6YSx0cmF2ZXJzZUVudGVyTGVhdmU6c319LHsxMTI6MTEyLDEzNzoxMzd9XSw0NTpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3ZhciByPWUoMTIwKSxvPWUoMzApLGk9bztyLmFkZG9ucyYmKHIuX19TRUNSRVRfSU5KRUNURURfUkVBQ1RfRE9NX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQ9aSksdC5leHBvcnRzPWl9LHsxMjA6MTIwLDMwOjMwfV0sNDY6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKCl7dGhpcy5yZWluaXRpYWxpemVUcmFuc2FjdGlvbigpfXZhciBvPWUoMTQzKSxpPWUoNzEpLGE9ZSg4OSkscz1lKDEyOSksdT17aW5pdGlhbGl6ZTpzLGNsb3NlOmZ1bmN0aW9uKCl7ZC5pc0JhdGNoaW5nVXBkYXRlcz0hMX19LGw9e2luaXRpYWxpemU6cyxjbG9zZTppLmZsdXNoQmF0Y2hlZFVwZGF0ZXMuYmluZChpKX0sYz1bbCx1XTtvKHIucHJvdG90eXBlLGEse2dldFRyYW5zYWN0aW9uV3JhcHBlcnM6ZnVuY3Rpb24oKXtyZXR1cm4gY319KTt2YXIgcD1uZXcgcixkPXtpc0JhdGNoaW5nVXBkYXRlczohMSxiYXRjaGVkVXBkYXRlczpmdW5jdGlvbihlLHQsbixyLG8saSl7dmFyIGE9ZC5pc0JhdGNoaW5nVXBkYXRlcztyZXR1cm4gZC5pc0JhdGNoaW5nVXBkYXRlcz0hMCxhP2UodCxuLHIsbyxpKTpwLnBlcmZvcm0oZSxudWxsLHQsbixyLG8saSl9fTt0LmV4cG9ydHM9ZH0sezEyOToxMjksMTQzOjE0Myw3MTo3MSw4OTo4OX1dLDQ3OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcigpe3h8fCh4PSEwLHkuRXZlbnRFbWl0dGVyLmluamVjdFJlYWN0RXZlbnRMaXN0ZW5lcihnKSx5LkV2ZW50UGx1Z2luSHViLmluamVjdEV2ZW50UGx1Z2luT3JkZXIocykseS5FdmVudFBsdWdpblV0aWxzLmluamVjdENvbXBvbmVudFRyZWUoZCkseS5FdmVudFBsdWdpblV0aWxzLmluamVjdFRyZWVUcmF2ZXJzYWwoaCkseS5FdmVudFBsdWdpbkh1Yi5pbmplY3RFdmVudFBsdWdpbnNCeU5hbWUoe1NpbXBsZUV2ZW50UGx1Z2luOkUsRW50ZXJMZWF2ZUV2ZW50UGx1Z2luOnUsQ2hhbmdlRXZlbnRQbHVnaW46YSxTZWxlY3RFdmVudFBsdWdpbjpiLEJlZm9yZUlucHV0RXZlbnRQbHVnaW46aX0pLHkuSG9zdENvbXBvbmVudC5pbmplY3RHZW5lcmljQ29tcG9uZW50Q2xhc3MocCkseS5Ib3N0Q29tcG9uZW50LmluamVjdFRleHRDb21wb25lbnRDbGFzcyhtKSx5LkRPTVByb3BlcnR5LmluamVjdERPTVByb3BlcnR5Q29uZmlnKG8pLHkuRE9NUHJvcGVydHkuaW5qZWN0RE9NUHJvcGVydHlDb25maWcobCkseS5ET01Qcm9wZXJ0eS5pbmplY3RET01Qcm9wZXJ0eUNvbmZpZyhDKSx5LkVtcHR5Q29tcG9uZW50LmluamVjdEVtcHR5Q29tcG9uZW50RmFjdG9yeShmdW5jdGlvbihlKXtyZXR1cm4gbmV3IGYoZSl9KSx5LlVwZGF0ZXMuaW5qZWN0UmVjb25jaWxlVHJhbnNhY3Rpb24oXykseS5VcGRhdGVzLmluamVjdEJhdGNoaW5nU3RyYXRlZ3kodikseS5Db21wb25lbnQuaW5qZWN0RW52aXJvbm1lbnQoYykpfXZhciBvPWUoMSksaT1lKDMpLGE9ZSg3KSxzPWUoMTQpLHU9ZSgxNSksbD1lKDIxKSxjPWUoMjcpLHA9ZSgzMSksZD1lKDMzKSxmPWUoMzUpLGg9ZSg0NCksbT1lKDQyKSx2PWUoNDYpLGc9ZSg1MikseT1lKDU1KSxfPWUoNjUpLEM9ZSg3MyksYj1lKDc0KSxFPWUoNzUpLHg9ITE7dC5leHBvcnRzPXtpbmplY3Q6cn19LHsxOjEsMTQ6MTQsMTU6MTUsMjE6MjEsMjc6MjcsMzozLDMxOjMxLDMzOjMzLDM1OjM1LDQyOjQyLDQ0OjQ0LDQ2OjQ2LDUyOjUyLDU1OjU1LDY1OjY1LDc6Nyw3Mzo3Myw3NDo3NCw3NTo3NX1dLDQ4OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZTeW1ib2wuZm9yJiZTeW1ib2wuZm9yKFwicmVhY3QuZWxlbWVudFwiKXx8NjAxMDM7dC5leHBvcnRzPXJ9LHt9XSw0OTpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3ZhciByLG89e2luamVjdEVtcHR5Q29tcG9uZW50RmFjdG9yeTpmdW5jdGlvbihlKXtyPWV9fSxpPXtjcmVhdGU6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoZSl9fTtpLmluamVjdGlvbj1vLHQuZXhwb3J0cz1pfSx7fV0sNTA6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUsdCxuKXt0cnl7dChuKX1jYXRjaChlKXtudWxsPT09byYmKG89ZSl9fXZhciBvPW51bGwsaT17aW52b2tlR3VhcmRlZENhbGxiYWNrOnIsaW52b2tlR3VhcmRlZENhbGxiYWNrV2l0aENhdGNoOnIscmV0aHJvd0NhdWdodEVycm9yOmZ1bmN0aW9uKCl7aWYobyl7dmFyIGU9bzt0aHJvdyBvPW51bGwsZX19fTt0LmV4cG9ydHM9aX0se31dLDUxOltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtvLmVucXVldWVFdmVudHMoZSksby5wcm9jZXNzRXZlbnRRdWV1ZSghMSl9dmFyIG89ZSgxNiksaT17aGFuZGxlVG9wTGV2ZWw6ZnVuY3Rpb24oZSx0LG4saSl7cihvLmV4dHJhY3RFdmVudHMoZSx0LG4saSkpfX07dC5leHBvcnRzPWl9LHsxNjoxNn1dLDUyOltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtmb3IoO2UuX2hvc3RQYXJlbnQ7KWU9ZS5faG9zdFBhcmVudDt2YXIgdD1wLmdldE5vZGVGcm9tSW5zdGFuY2UoZSksbj10LnBhcmVudE5vZGU7cmV0dXJuIHAuZ2V0Q2xvc2VzdEluc3RhbmNlRnJvbU5vZGUobil9ZnVuY3Rpb24gbyhlLHQpe3RoaXMudG9wTGV2ZWxUeXBlPWUsdGhpcy5uYXRpdmVFdmVudD10LHRoaXMuYW5jZXN0b3JzPVtdfWZ1bmN0aW9uIGkoZSl7dmFyIHQ9ZihlLm5hdGl2ZUV2ZW50KSxuPXAuZ2V0Q2xvc2VzdEluc3RhbmNlRnJvbU5vZGUodCksbz1uO2Rve2UuYW5jZXN0b3JzLnB1c2gobyksbz1vJiZyKG8pfXdoaWxlKG8pO2Zvcih2YXIgaT0wO2k8ZS5hbmNlc3RvcnMubGVuZ3RoO2krKyluPWUuYW5jZXN0b3JzW2ldLG0uX2hhbmRsZVRvcExldmVsKGUudG9wTGV2ZWxUeXBlLG4sZS5uYXRpdmVFdmVudCxmKGUubmF0aXZlRXZlbnQpKX1mdW5jdGlvbiBhKGUpe2UoaCh3aW5kb3cpKX12YXIgcz1lKDE0MyksdT1lKDEyMiksbD1lKDEyMyksYz1lKDI0KSxwPWUoMzMpLGQ9ZSg3MSksZj1lKDEwMiksaD1lKDEzNCk7cyhvLnByb3RvdHlwZSx7ZGVzdHJ1Y3RvcjpmdW5jdGlvbigpe3RoaXMudG9wTGV2ZWxUeXBlPW51bGwsdGhpcy5uYXRpdmVFdmVudD1udWxsLHRoaXMuYW5jZXN0b3JzLmxlbmd0aD0wfX0pLGMuYWRkUG9vbGluZ1RvKG8sYy50d29Bcmd1bWVudFBvb2xlcik7dmFyIG09e19lbmFibGVkOiEwLF9oYW5kbGVUb3BMZXZlbDpudWxsLFdJTkRPV19IQU5ETEU6bC5jYW5Vc2VET00/d2luZG93Om51bGwsc2V0SGFuZGxlVG9wTGV2ZWw6ZnVuY3Rpb24oZSl7bS5faGFuZGxlVG9wTGV2ZWw9ZX0sc2V0RW5hYmxlZDpmdW5jdGlvbihlKXttLl9lbmFibGVkPSEhZX0saXNFbmFibGVkOmZ1bmN0aW9uKCl7cmV0dXJuIG0uX2VuYWJsZWR9LHRyYXBCdWJibGVkRXZlbnQ6ZnVuY3Rpb24oZSx0LG4pe3JldHVybiBuP3UubGlzdGVuKG4sdCxtLmRpc3BhdGNoRXZlbnQuYmluZChudWxsLGUpKTpudWxsfSx0cmFwQ2FwdHVyZWRFdmVudDpmdW5jdGlvbihlLHQsbil7cmV0dXJuIG4/dS5jYXB0dXJlKG4sdCxtLmRpc3BhdGNoRXZlbnQuYmluZChudWxsLGUpKTpudWxsfSxtb25pdG9yU2Nyb2xsVmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9YS5iaW5kKG51bGwsZSk7dS5saXN0ZW4od2luZG93LFwic2Nyb2xsXCIsdCl9LGRpc3BhdGNoRXZlbnQ6ZnVuY3Rpb24oZSx0KXtpZihtLl9lbmFibGVkKXt2YXIgbj1vLmdldFBvb2xlZChlLHQpO3RyeXtkLmJhdGNoZWRVcGRhdGVzKGksbil9ZmluYWxseXtvLnJlbGVhc2Uobil9fX19O3QuZXhwb3J0cz1tfSx7MTAyOjEwMiwxMjI6MTIyLDEyMzoxMjMsMTM0OjEzNCwxNDM6MTQzLDI0OjI0LDMzOjMzLDcxOjcxfV0sNTM6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj17bG9nVG9wTGV2ZWxSZW5kZXJzOiExfTt0LmV4cG9ydHM9cn0se31dLDU0OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtyZXR1cm4gc3x8YShcIjExMVwiLGUudHlwZSksbmV3IHMoZSl9ZnVuY3Rpb24gbyhlKXtyZXR1cm4gbmV3IHUoZSl9ZnVuY3Rpb24gaShlKXtyZXR1cm4gZSBpbnN0YW5jZW9mIHV9dmFyIGE9ZSgxMTIpLHM9KGUoMTM3KSxudWxsKSx1PW51bGwsbD17aW5qZWN0R2VuZXJpY0NvbXBvbmVudENsYXNzOmZ1bmN0aW9uKGUpe3M9ZX0saW5qZWN0VGV4dENvbXBvbmVudENsYXNzOmZ1bmN0aW9uKGUpe3U9ZX19LGM9e2NyZWF0ZUludGVybmFsQ29tcG9uZW50OnIsY3JlYXRlSW5zdGFuY2VGb3JUZXh0Om8saXNUZXh0Q29tcG9uZW50OmksaW5qZWN0aW9uOmx9O3QuZXhwb3J0cz1jfSx7MTEyOjExMiwxMzc6MTM3fV0sNTU6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1lKDExKSxvPWUoMTYpLGk9ZSgxOCksYT1lKDI4KSxzPWUoNDkpLHU9ZSgyNSksbD1lKDU0KSxjPWUoNzEpLHA9e0NvbXBvbmVudDphLmluamVjdGlvbixET01Qcm9wZXJ0eTpyLmluamVjdGlvbixFbXB0eUNvbXBvbmVudDpzLmluamVjdGlvbixFdmVudFBsdWdpbkh1YjpvLmluamVjdGlvbixFdmVudFBsdWdpblV0aWxzOmkuaW5qZWN0aW9uLEV2ZW50RW1pdHRlcjp1LmluamVjdGlvbixIb3N0Q29tcG9uZW50OmwuaW5qZWN0aW9uLFVwZGF0ZXM6Yy5pbmplY3Rpb259O3QuZXhwb3J0cz1wfSx7MTE6MTEsMTY6MTYsMTg6MTgsMjU6MjUsMjg6MjgsNDk6NDksNTQ6NTQsNzE6NzF9XSw1NjpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7cmV0dXJuIGkoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LGUpfXZhciBvPWUoNDEpLGk9ZSgxMjYpLGE9ZSgxMzEpLHM9ZSgxMzIpLHU9e2hhc1NlbGVjdGlvbkNhcGFiaWxpdGllczpmdW5jdGlvbihlKXt2YXIgdD1lJiZlLm5vZGVOYW1lJiZlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7cmV0dXJuIHQmJihcImlucHV0XCI9PT10JiZcInRleHRcIj09PWUudHlwZXx8XCJ0ZXh0YXJlYVwiPT09dHx8XCJ0cnVlXCI9PT1lLmNvbnRlbnRFZGl0YWJsZSl9LGdldFNlbGVjdGlvbkluZm9ybWF0aW9uOmZ1bmN0aW9uKCl7dmFyIGU9cygpO3JldHVybntmb2N1c2VkRWxlbTplLHNlbGVjdGlvblJhbmdlOnUuaGFzU2VsZWN0aW9uQ2FwYWJpbGl0aWVzKGUpP3UuZ2V0U2VsZWN0aW9uKGUpOm51bGx9fSxyZXN0b3JlU2VsZWN0aW9uOmZ1bmN0aW9uKGUpe3ZhciB0PXMoKSxuPWUuZm9jdXNlZEVsZW0sbz1lLnNlbGVjdGlvblJhbmdlO3QhPT1uJiZyKG4pJiYodS5oYXNTZWxlY3Rpb25DYXBhYmlsaXRpZXMobikmJnUuc2V0U2VsZWN0aW9uKG4sbyksYShuKSl9LGdldFNlbGVjdGlvbjpmdW5jdGlvbihlKXt2YXIgdDtpZihcInNlbGVjdGlvblN0YXJ0XCJpbiBlKXQ9e3N0YXJ0OmUuc2VsZWN0aW9uU3RhcnQsZW5kOmUuc2VsZWN0aW9uRW5kfTtlbHNlIGlmKGRvY3VtZW50LnNlbGVjdGlvbiYmZS5ub2RlTmFtZSYmXCJpbnB1dFwiPT09ZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKXt2YXIgbj1kb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtuLnBhcmVudEVsZW1lbnQoKT09PWUmJih0PXtzdGFydDotbi5tb3ZlU3RhcnQoXCJjaGFyYWN0ZXJcIiwtZS52YWx1ZS5sZW5ndGgpLGVuZDotbi5tb3ZlRW5kKFwiY2hhcmFjdGVyXCIsLWUudmFsdWUubGVuZ3RoKX0pfWVsc2UgdD1vLmdldE9mZnNldHMoZSk7cmV0dXJuIHR8fHtzdGFydDowLGVuZDowfX0sc2V0U2VsZWN0aW9uOmZ1bmN0aW9uKGUsdCl7dmFyIG49dC5zdGFydCxyPXQuZW5kO2lmKHZvaWQgMD09PXImJihyPW4pLFwic2VsZWN0aW9uU3RhcnRcImluIGUpZS5zZWxlY3Rpb25TdGFydD1uLGUuc2VsZWN0aW9uRW5kPU1hdGgubWluKHIsZS52YWx1ZS5sZW5ndGgpO2Vsc2UgaWYoZG9jdW1lbnQuc2VsZWN0aW9uJiZlLm5vZGVOYW1lJiZcImlucHV0XCI9PT1lLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpe3ZhciBpPWUuY3JlYXRlVGV4dFJhbmdlKCk7aS5jb2xsYXBzZSghMCksaS5tb3ZlU3RhcnQoXCJjaGFyYWN0ZXJcIixuKSxpLm1vdmVFbmQoXCJjaGFyYWN0ZXJcIixyLW4pLGkuc2VsZWN0KCl9ZWxzZSBvLnNldE9mZnNldHMoZSx0KX19O3QuZXhwb3J0cz11fSx7MTI2OjEyNiwxMzE6MTMxLDEzMjoxMzIsNDE6NDF9XSw1NzpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3ZhciByPXtyZW1vdmU6ZnVuY3Rpb24oZSl7ZS5fcmVhY3RJbnRlcm5hbEluc3RhbmNlPXZvaWQgMH0sZ2V0OmZ1bmN0aW9uKGUpe3JldHVybiBlLl9yZWFjdEludGVybmFsSW5zdGFuY2V9LGhhczpmdW5jdGlvbihlKXtyZXR1cm4gdm9pZCAwIT09ZS5fcmVhY3RJbnRlcm5hbEluc3RhbmNlfSxzZXQ6ZnVuY3Rpb24oZSx0KXtlLl9yZWFjdEludGVybmFsSW5zdGFuY2U9dH19O3QuZXhwb3J0cz1yfSx7fV0sNTg6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt0LmV4cG9ydHM9e2RlYnVnVG9vbDpudWxsfX0se31dLDU5OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9ZSg5Miksbz0vXjxcXCFcXC1cXC0vLGk9e0NIRUNLU1VNX0FUVFJfTkFNRTpcImRhdGEtcmVhY3QtY2hlY2tzdW1cIixhZGRDaGVja3N1bVRvTWFya3VwOmZ1bmN0aW9uKGUpe3ZhciB0PXIoZSk7cmV0dXJuIG8udGVzdChlKT9lOmUucmVwbGFjZSgvXFwvPz4vLFwiIFwiK2kuQ0hFQ0tTVU1fQVRUUl9OQU1FKyc9XCInK3QrJ1wiJCYnKX0sY2FuUmV1c2VNYXJrdXA6ZnVuY3Rpb24oZSx0KXt2YXIgbj10LmdldEF0dHJpYnV0ZShpLkNIRUNLU1VNX0FUVFJfTkFNRSk7cmV0dXJuIG49biYmcGFyc2VJbnQobiwxMCkscihlKT09PW59fTt0LmV4cG9ydHM9aX0sezkyOjkyfV0sNjA6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUsdCl7Zm9yKHZhciBuPU1hdGgubWluKGUubGVuZ3RoLHQubGVuZ3RoKSxyPTA7cjxuO3IrKylpZihlLmNoYXJBdChyKSE9PXQuY2hhckF0KHIpKXJldHVybiByO3JldHVybiBlLmxlbmd0aD09PXQubGVuZ3RoPy0xOm59ZnVuY3Rpb24gbyhlKXtyZXR1cm4gZT9lLm5vZGVUeXBlPT09QT9lLmRvY3VtZW50RWxlbWVudDplLmZpcnN0Q2hpbGQ6bnVsbH1mdW5jdGlvbiBpKGUpe3JldHVybiBlLmdldEF0dHJpYnV0ZSYmZS5nZXRBdHRyaWJ1dGUoSSl8fFwiXCJ9ZnVuY3Rpb24gYShlLHQsbixyLG8pe3ZhciBpO2lmKGIubG9nVG9wTGV2ZWxSZW5kZXJzKXt2YXIgYT1lLl9jdXJyZW50RWxlbWVudC5wcm9wcy5jaGlsZCxzPWEudHlwZTtpPVwiUmVhY3QgbW91bnQ6IFwiKyhcInN0cmluZ1wiPT10eXBlb2Ygcz9zOnMuZGlzcGxheU5hbWV8fHMubmFtZSksY29uc29sZS50aW1lKGkpfXZhciB1PXcubW91bnRDb21wb25lbnQoZSxuLG51bGwsXyhlLHQpLG8sMCk7aSYmY29uc29sZS50aW1lRW5kKGkpLGUuX3JlbmRlcmVkQ29tcG9uZW50Ll90b3BMZXZlbFdyYXBwZXI9ZSxqLl9tb3VudEltYWdlSW50b05vZGUodSx0LGUscixuKX1mdW5jdGlvbiBzKGUsdCxuLHIpe3ZhciBvPWsuUmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbi5nZXRQb29sZWQoIW4mJkMudXNlQ3JlYXRlRWxlbWVudCk7by5wZXJmb3JtKGEsbnVsbCxlLHQsbyxuLHIpLGsuUmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbi5yZWxlYXNlKG8pfWZ1bmN0aW9uIHUoZSx0LG4pe2Zvcih3LnVubW91bnRDb21wb25lbnQoZSxuKSx0Lm5vZGVUeXBlPT09QSYmKHQ9dC5kb2N1bWVudEVsZW1lbnQpO3QubGFzdENoaWxkOyl0LnJlbW92ZUNoaWxkKHQubGFzdENoaWxkKX1mdW5jdGlvbiBsKGUpe3ZhciB0PW8oZSk7aWYodCl7dmFyIG49eS5nZXRJbnN0YW5jZUZyb21Ob2RlKHQpO3JldHVybiEoIW58fCFuLl9ob3N0UGFyZW50KX19ZnVuY3Rpb24gYyhlKXtyZXR1cm4hKCFlfHxlLm5vZGVUeXBlIT09UiYmZS5ub2RlVHlwZSE9PUEmJmUubm9kZVR5cGUhPT1EKX1mdW5jdGlvbiBwKGUpe3ZhciB0PW8oZSksbj10JiZ5LmdldEluc3RhbmNlRnJvbU5vZGUodCk7cmV0dXJuIG4mJiFuLl9ob3N0UGFyZW50P246bnVsbH1mdW5jdGlvbiBkKGUpe3ZhciB0PXAoZSk7cmV0dXJuIHQ/dC5faG9zdENvbnRhaW5lckluZm8uX3RvcExldmVsV3JhcHBlcjpudWxsfXZhciBmPWUoMTEyKSxoPWUoOSksbT1lKDExKSx2PWUoMTIwKSxnPWUoMjUpLHk9KGUoMTE5KSxlKDMzKSksXz1lKDM0KSxDPWUoMzYpLGI9ZSg1MyksRT1lKDU3KSx4PShlKDU4KSxlKDU5KSksdz1lKDY2KSxUPWUoNzApLGs9ZSg3MSksUD1lKDEzMCksUz1lKDEwOCksTj0oZSgxMzcpLGUoMTE0KSksTT1lKDExNiksST0oZSgxNDIpLG0uSURfQVRUUklCVVRFX05BTUUpLE89bS5ST09UX0FUVFJJQlVURV9OQU1FLFI9MSxBPTksRD0xMSxMPXt9LFU9MSxGPWZ1bmN0aW9uKCl7dGhpcy5yb290SUQ9VSsrfTtGLnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50PXt9LEYucHJvdG90eXBlLnJlbmRlcj1mdW5jdGlvbigpe3JldHVybiB0aGlzLnByb3BzLmNoaWxkfSxGLmlzUmVhY3RUb3BMZXZlbFdyYXBwZXI9ITA7dmFyIGo9e1RvcExldmVsV3JhcHBlcjpGLF9pbnN0YW5jZXNCeVJlYWN0Um9vdElEOkwsc2Nyb2xsTW9uaXRvcjpmdW5jdGlvbihlLHQpe3QoKX0sX3VwZGF0ZVJvb3RDb21wb25lbnQ6ZnVuY3Rpb24oZSx0LG4scixvKXtyZXR1cm4gai5zY3JvbGxNb25pdG9yKHIsZnVuY3Rpb24oKXtULmVucXVldWVFbGVtZW50SW50ZXJuYWwoZSx0LG4pLG8mJlQuZW5xdWV1ZUNhbGxiYWNrSW50ZXJuYWwoZSxvKX0pLGV9LF9yZW5kZXJOZXdSb290Q29tcG9uZW50OmZ1bmN0aW9uKGUsdCxuLHIpe2ModCl8fGYoXCIzN1wiKSxnLmVuc3VyZVNjcm9sbFZhbHVlTW9uaXRvcmluZygpO3ZhciBvPVMoZSwhMSk7ay5iYXRjaGVkVXBkYXRlcyhzLG8sdCxuLHIpO3ZhciBpPW8uX2luc3RhbmNlLnJvb3RJRDtyZXR1cm4gTFtpXT1vLG99LHJlbmRlclN1YnRyZWVJbnRvQ29udGFpbmVyOmZ1bmN0aW9uKGUsdCxuLHIpe3JldHVybiBudWxsIT1lJiZFLmhhcyhlKXx8ZihcIjM4XCIpLGouX3JlbmRlclN1YnRyZWVJbnRvQ29udGFpbmVyKGUsdCxuLHIpfSxfcmVuZGVyU3VidHJlZUludG9Db250YWluZXI6ZnVuY3Rpb24oZSx0LG4scil7VC52YWxpZGF0ZUNhbGxiYWNrKHIsXCJSZWFjdERPTS5yZW5kZXJcIiksdi5pc1ZhbGlkRWxlbWVudCh0KXx8ZihcIjM5XCIsXCJzdHJpbmdcIj09dHlwZW9mIHQ/XCIgSW5zdGVhZCBvZiBwYXNzaW5nIGEgc3RyaW5nIGxpa2UgJ2RpdicsIHBhc3MgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2Jykgb3IgPGRpdiAvPi5cIjpcImZ1bmN0aW9uXCI9PXR5cGVvZiB0P1wiIEluc3RlYWQgb2YgcGFzc2luZyBhIGNsYXNzIGxpa2UgRm9vLCBwYXNzIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9vKSBvciA8Rm9vIC8+LlwiOm51bGwhPXQmJnZvaWQgMCE9PXQucHJvcHM/XCIgVGhpcyBtYXkgYmUgY2F1c2VkIGJ5IHVuaW50ZW50aW9uYWxseSBsb2FkaW5nIHR3byBpbmRlcGVuZGVudCBjb3BpZXMgb2YgUmVhY3QuXCI6XCJcIik7dmFyIGEscz12LmNyZWF0ZUVsZW1lbnQoRix7Y2hpbGQ6dH0pO2lmKGUpe3ZhciB1PUUuZ2V0KGUpO2E9dS5fcHJvY2Vzc0NoaWxkQ29udGV4dCh1Ll9jb250ZXh0KX1lbHNlIGE9UDt2YXIgYz1kKG4pO2lmKGMpe3ZhciBwPWMuX2N1cnJlbnRFbGVtZW50LGg9cC5wcm9wcy5jaGlsZDtpZihNKGgsdCkpe3ZhciBtPWMuX3JlbmRlcmVkQ29tcG9uZW50LmdldFB1YmxpY0luc3RhbmNlKCksZz1yJiZmdW5jdGlvbigpe3IuY2FsbChtKX07cmV0dXJuIGouX3VwZGF0ZVJvb3RDb21wb25lbnQoYyxzLGEsbixnKSxtfWoudW5tb3VudENvbXBvbmVudEF0Tm9kZShuKX12YXIgeT1vKG4pLF89eSYmISFpKHkpLEM9bChuKSxiPV8mJiFjJiYhQyx4PWouX3JlbmRlck5ld1Jvb3RDb21wb25lbnQocyxuLGIsYSkuX3JlbmRlcmVkQ29tcG9uZW50LmdldFB1YmxpY0luc3RhbmNlKCk7cmV0dXJuIHImJnIuY2FsbCh4KSx4fSxyZW5kZXI6ZnVuY3Rpb24oZSx0LG4pe3JldHVybiBqLl9yZW5kZXJTdWJ0cmVlSW50b0NvbnRhaW5lcihudWxsLGUsdCxuKX0sdW5tb3VudENvbXBvbmVudEF0Tm9kZTpmdW5jdGlvbihlKXtjKGUpfHxmKFwiNDBcIik7dmFyIHQ9ZChlKTtyZXR1cm4gdD8oZGVsZXRlIExbdC5faW5zdGFuY2Uucm9vdElEXSxrLmJhdGNoZWRVcGRhdGVzKHUsdCxlLCExKSwhMCk6KGwoZSksMT09PWUubm9kZVR5cGUmJmUuaGFzQXR0cmlidXRlKE8pLCExKX0sX21vdW50SW1hZ2VJbnRvTm9kZTpmdW5jdGlvbihlLHQsbixpLGEpe2lmKGModCl8fGYoXCI0MVwiKSxpKXt2YXIgcz1vKHQpO2lmKHguY2FuUmV1c2VNYXJrdXAoZSxzKSlyZXR1cm4gdm9pZCB5LnByZWNhY2hlTm9kZShuLHMpO3ZhciB1PXMuZ2V0QXR0cmlidXRlKHguQ0hFQ0tTVU1fQVRUUl9OQU1FKTtzLnJlbW92ZUF0dHJpYnV0ZSh4LkNIRUNLU1VNX0FUVFJfTkFNRSk7dmFyIGw9cy5vdXRlckhUTUw7cy5zZXRBdHRyaWJ1dGUoeC5DSEVDS1NVTV9BVFRSX05BTUUsdSk7dmFyIHA9ZSxkPXIocCxsKSxtPVwiIChjbGllbnQpIFwiK3Auc3Vic3RyaW5nKGQtMjAsZCsyMCkrXCJcXG4gKHNlcnZlcikgXCIrbC5zdWJzdHJpbmcoZC0yMCxkKzIwKTt0Lm5vZGVUeXBlPT09QSYmZihcIjQyXCIsbSl9aWYodC5ub2RlVHlwZT09PUEmJmYoXCI0M1wiKSxhLnVzZUNyZWF0ZUVsZW1lbnQpe2Zvcig7dC5sYXN0Q2hpbGQ7KXQucmVtb3ZlQ2hpbGQodC5sYXN0Q2hpbGQpO2guaW5zZXJ0VHJlZUJlZm9yZSh0LGUsbnVsbCl9ZWxzZSBOKHQsZSkseS5wcmVjYWNoZU5vZGUobix0LmZpcnN0Q2hpbGQpfX07dC5leHBvcnRzPWp9LHsxMDg6MTA4LDExOjExLDExMjoxMTIsMTE0OjExNCwxMTY6MTE2LDExOToxMTksMTIwOjEyMCwxMzA6MTMwLDEzNzoxMzcsMTQyOjE0MiwyNToyNSwzMzozMywzNDozNCwzNjozNiw1Mzo1Myw1Nzo1Nyw1ODo1OCw1OTo1OSw2Njo2Niw3MDo3MCw3MTo3MSw5Ojl9XSw2MTpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSx0LG4pe3JldHVybnt0eXBlOlwiSU5TRVJUX01BUktVUFwiLGNvbnRlbnQ6ZSxmcm9tSW5kZXg6bnVsbCxmcm9tTm9kZTpudWxsLHRvSW5kZXg6bixhZnRlck5vZGU6dH19ZnVuY3Rpb24gbyhlLHQsbil7cmV0dXJue3R5cGU6XCJNT1ZFX0VYSVNUSU5HXCIsY29udGVudDpudWxsLGZyb21JbmRleDplLl9tb3VudEluZGV4LGZyb21Ob2RlOmQuZ2V0SG9zdE5vZGUoZSksdG9JbmRleDpuLGFmdGVyTm9kZTp0fX1mdW5jdGlvbiBpKGUsdCl7cmV0dXJue3R5cGU6XCJSRU1PVkVfTk9ERVwiLGNvbnRlbnQ6bnVsbCxmcm9tSW5kZXg6ZS5fbW91bnRJbmRleCxmcm9tTm9kZTp0LHRvSW5kZXg6bnVsbCxhZnRlck5vZGU6bnVsbH19ZnVuY3Rpb24gYShlKXtyZXR1cm57dHlwZTpcIlNFVF9NQVJLVVBcIixjb250ZW50OmUsZnJvbUluZGV4Om51bGwsZnJvbU5vZGU6bnVsbCx0b0luZGV4Om51bGwsYWZ0ZXJOb2RlOm51bGx9fWZ1bmN0aW9uIHMoZSl7cmV0dXJue3R5cGU6XCJURVhUX0NPTlRFTlRcIixjb250ZW50OmUsZnJvbUluZGV4Om51bGwsZnJvbU5vZGU6bnVsbCx0b0luZGV4Om51bGwsYWZ0ZXJOb2RlOm51bGx9fWZ1bmN0aW9uIHUoZSx0KXtyZXR1cm4gdCYmKGU9ZXx8W10sZS5wdXNoKHQpKSxlfWZ1bmN0aW9uIGwoZSx0KXtwLnByb2Nlc3NDaGlsZHJlblVwZGF0ZXMoZSx0KX12YXIgYz1lKDExMikscD1lKDI4KSxkPShlKDU3KSxlKDU4KSxlKDExOSksZSg2NikpLGY9ZSgyNiksaD0oZSgxMjkpLGUoOTcpKSxtPShlKDEzNykse01peGluOntfcmVjb25jaWxlckluc3RhbnRpYXRlQ2hpbGRyZW46ZnVuY3Rpb24oZSx0LG4pe3JldHVybiBmLmluc3RhbnRpYXRlQ2hpbGRyZW4oZSx0LG4pfSxfcmVjb25jaWxlclVwZGF0ZUNoaWxkcmVuOmZ1bmN0aW9uKGUsdCxuLHIsbyxpKXt2YXIgYTtyZXR1cm4gYT1oKHQsMCksZi51cGRhdGVDaGlsZHJlbihlLGEsbixyLG8sdGhpcyx0aGlzLl9ob3N0Q29udGFpbmVySW5mbyxpLDApLGF9LG1vdW50Q2hpbGRyZW46ZnVuY3Rpb24oZSx0LG4pe3ZhciByPXRoaXMuX3JlY29uY2lsZXJJbnN0YW50aWF0ZUNoaWxkcmVuKGUsdCxuKTt0aGlzLl9yZW5kZXJlZENoaWxkcmVuPXI7dmFyIG89W10saT0wO2Zvcih2YXIgYSBpbiByKWlmKHIuaGFzT3duUHJvcGVydHkoYSkpe3ZhciBzPXJbYV0sdT1kLm1vdW50Q29tcG9uZW50KHMsdCx0aGlzLHRoaXMuX2hvc3RDb250YWluZXJJbmZvLG4sMCk7cy5fbW91bnRJbmRleD1pKyssby5wdXNoKHUpfXJldHVybiBvfSx1cGRhdGVUZXh0Q29udGVudDpmdW5jdGlvbihlKXt2YXIgdD10aGlzLl9yZW5kZXJlZENoaWxkcmVuO2YudW5tb3VudENoaWxkcmVuKHQsITEpO2Zvcih2YXIgbiBpbiB0KXQuaGFzT3duUHJvcGVydHkobikmJmMoXCIxMThcIik7bCh0aGlzLFtzKGUpXSl9LHVwZGF0ZU1hcmt1cDpmdW5jdGlvbihlKXt2YXIgdD10aGlzLl9yZW5kZXJlZENoaWxkcmVuO2YudW5tb3VudENoaWxkcmVuKHQsITEpO2Zvcih2YXIgbiBpbiB0KXQuaGFzT3duUHJvcGVydHkobikmJmMoXCIxMThcIik7bCh0aGlzLFthKGUpXSl9LHVwZGF0ZUNoaWxkcmVuOmZ1bmN0aW9uKGUsdCxuKXt0aGlzLl91cGRhdGVDaGlsZHJlbihlLHQsbil9LF91cGRhdGVDaGlsZHJlbjpmdW5jdGlvbihlLHQsbil7dmFyIHI9dGhpcy5fcmVuZGVyZWRDaGlsZHJlbixvPXt9LGk9W10sYT10aGlzLl9yZWNvbmNpbGVyVXBkYXRlQ2hpbGRyZW4ocixlLGksbyx0LG4pO2lmKGF8fHIpe3ZhciBzLGM9bnVsbCxwPTAsZj0wLGg9MCxtPW51bGw7Zm9yKHMgaW4gYSlpZihhLmhhc093blByb3BlcnR5KHMpKXt2YXIgdj1yJiZyW3NdLGc9YVtzXTt2PT09Zz8oYz11KGMsdGhpcy5tb3ZlQ2hpbGQodixtLHAsZikpLGY9TWF0aC5tYXgodi5fbW91bnRJbmRleCxmKSx2Ll9tb3VudEluZGV4PXApOih2JiYoZj1NYXRoLm1heCh2Ll9tb3VudEluZGV4LGYpKSxjPXUoYyx0aGlzLl9tb3VudENoaWxkQXRJbmRleChnLGlbaF0sbSxwLHQsbikpLGgrKykscCsrLG09ZC5nZXRIb3N0Tm9kZShnKX1mb3IocyBpbiBvKW8uaGFzT3duUHJvcGVydHkocykmJihjPXUoYyx0aGlzLl91bm1vdW50Q2hpbGQocltzXSxvW3NdKSkpO2MmJmwodGhpcyxjKSx0aGlzLl9yZW5kZXJlZENoaWxkcmVuPWF9fSx1bm1vdW50Q2hpbGRyZW46ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5fcmVuZGVyZWRDaGlsZHJlbjtmLnVubW91bnRDaGlsZHJlbih0LGUpLHRoaXMuX3JlbmRlcmVkQ2hpbGRyZW49bnVsbH0sbW92ZUNoaWxkOmZ1bmN0aW9uKGUsdCxuLHIpe2lmKGUuX21vdW50SW5kZXg8cilyZXR1cm4gbyhlLHQsbil9LGNyZWF0ZUNoaWxkOmZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gcihuLHQsZS5fbW91bnRJbmRleCl9LHJlbW92ZUNoaWxkOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIGkoZSx0KX0sX21vdW50Q2hpbGRBdEluZGV4OmZ1bmN0aW9uKGUsdCxuLHIsbyxpKXtyZXR1cm4gZS5fbW91bnRJbmRleD1yLHRoaXMuY3JlYXRlQ2hpbGQoZSxuLHQpfSxfdW5tb3VudENoaWxkOmZ1bmN0aW9uKGUsdCl7dmFyIG49dGhpcy5yZW1vdmVDaGlsZChlLHQpO3JldHVybiBlLl9tb3VudEluZGV4PW51bGwsbn19fSk7dC5leHBvcnRzPW19LHsxMTI6MTEyLDExOToxMTksMTI5OjEyOSwxMzc6MTM3LDI2OjI2LDI4OjI4LDU3OjU3LDU4OjU4LDY2OjY2LDk3Ojk3fV0sNjI6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1lKDExMiksbz1lKDEyMCksaT0oZSgxMzcpLHtIT1NUOjAsQ09NUE9TSVRFOjEsRU1QVFk6MixnZXRUeXBlOmZ1bmN0aW9uKGUpe3JldHVybiBudWxsPT09ZXx8ITE9PT1lP2kuRU1QVFk6by5pc1ZhbGlkRWxlbWVudChlKT9cImZ1bmN0aW9uXCI9PXR5cGVvZiBlLnR5cGU/aS5DT01QT1NJVEU6aS5IT1NUOnZvaWQgcihcIjI2XCIsZSl9fSk7dC5leHBvcnRzPWl9LHsxMTI6MTEyLDEyMDoxMjAsMTM3OjEzN31dLDYzOltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtyZXR1cm4hKCFlfHxcImZ1bmN0aW9uXCIhPXR5cGVvZiBlLmF0dGFjaFJlZnx8XCJmdW5jdGlvblwiIT10eXBlb2YgZS5kZXRhY2hSZWYpfXZhciBvPWUoMTEyKSxpPShlKDEzNykse2FkZENvbXBvbmVudEFzUmVmVG86ZnVuY3Rpb24oZSx0LG4pe3Iobil8fG8oXCIxMTlcIiksbi5hdHRhY2hSZWYodCxlKX0scmVtb3ZlQ29tcG9uZW50QXNSZWZGcm9tOmZ1bmN0aW9uKGUsdCxuKXtyKG4pfHxvKFwiMTIwXCIpO3ZhciBpPW4uZ2V0UHVibGljSW5zdGFuY2UoKTtpJiZpLnJlZnNbdF09PT1lLmdldFB1YmxpY0luc3RhbmNlKCkmJm4uZGV0YWNoUmVmKHQpfX0pO3QuZXhwb3J0cz1pfSx7MTEyOjExMiwxMzc6MTM3fV0sNjQ6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt0LmV4cG9ydHM9XCJTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRFwifSx7fV0sNjU6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe3RoaXMucmVpbml0aWFsaXplVHJhbnNhY3Rpb24oKSx0aGlzLnJlbmRlclRvU3RhdGljTWFya3VwPSExLHRoaXMucmVhY3RNb3VudFJlYWR5PWkuZ2V0UG9vbGVkKG51bGwpLHRoaXMudXNlQ3JlYXRlRWxlbWVudD1lfXZhciBvPWUoMTQzKSxpPWUoNiksYT1lKDI0KSxzPWUoMjUpLHU9ZSg1NiksbD0oZSg1OCksZSg4OSkpLGM9ZSg3MCkscD17aW5pdGlhbGl6ZTp1LmdldFNlbGVjdGlvbkluZm9ybWF0aW9uLGNsb3NlOnUucmVzdG9yZVNlbGVjdGlvbn0sZD17aW5pdGlhbGl6ZTpmdW5jdGlvbigpe3ZhciBlPXMuaXNFbmFibGVkKCk7cmV0dXJuIHMuc2V0RW5hYmxlZCghMSksZX0sY2xvc2U6ZnVuY3Rpb24oZSl7cy5zZXRFbmFibGVkKGUpfX0sZj17aW5pdGlhbGl6ZTpmdW5jdGlvbigpe3RoaXMucmVhY3RNb3VudFJlYWR5LnJlc2V0KCl9LGNsb3NlOmZ1bmN0aW9uKCl7dGhpcy5yZWFjdE1vdW50UmVhZHkubm90aWZ5QWxsKCl9fSxoPVtwLGQsZl0sbT17Z2V0VHJhbnNhY3Rpb25XcmFwcGVyczpmdW5jdGlvbigpe3JldHVybiBofSxnZXRSZWFjdE1vdW50UmVhZHk6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5yZWFjdE1vdW50UmVhZHl9LGdldFVwZGF0ZVF1ZXVlOmZ1bmN0aW9uKCl7cmV0dXJuIGN9LGNoZWNrcG9pbnQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5yZWFjdE1vdW50UmVhZHkuY2hlY2twb2ludCgpfSxyb2xsYmFjazpmdW5jdGlvbihlKXt0aGlzLnJlYWN0TW91bnRSZWFkeS5yb2xsYmFjayhlKX0sZGVzdHJ1Y3RvcjpmdW5jdGlvbigpe2kucmVsZWFzZSh0aGlzLnJlYWN0TW91bnRSZWFkeSksdGhpcy5yZWFjdE1vdW50UmVhZHk9bnVsbH19O28oci5wcm90b3R5cGUsbCxtKSxhLmFkZFBvb2xpbmdUbyhyKSx0LmV4cG9ydHM9cn0sezE0MzoxNDMsMjQ6MjQsMjU6MjUsNTY6NTYsNTg6NTgsNjo2LDcwOjcwLDg5Ojg5fV0sNjY6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKCl7by5hdHRhY2hSZWZzKHRoaXMsdGhpcy5fY3VycmVudEVsZW1lbnQpfXZhciBvPWUoNjcpLGk9KGUoNTgpLGUoMTQyKSx7bW91bnRDb21wb25lbnQ6ZnVuY3Rpb24oZSx0LG4sbyxpLGEpe3ZhciBzPWUubW91bnRDb21wb25lbnQodCxuLG8saSxhKTtyZXR1cm4gZS5fY3VycmVudEVsZW1lbnQmJm51bGwhPWUuX2N1cnJlbnRFbGVtZW50LnJlZiYmdC5nZXRSZWFjdE1vdW50UmVhZHkoKS5lbnF1ZXVlKHIsZSksc30sZ2V0SG9zdE5vZGU6ZnVuY3Rpb24oZSl7cmV0dXJuIGUuZ2V0SG9zdE5vZGUoKX0sdW5tb3VudENvbXBvbmVudDpmdW5jdGlvbihlLHQpe28uZGV0YWNoUmVmcyhlLGUuX2N1cnJlbnRFbGVtZW50KSxlLnVubW91bnRDb21wb25lbnQodCl9LHJlY2VpdmVDb21wb25lbnQ6ZnVuY3Rpb24oZSx0LG4saSl7dmFyIGE9ZS5fY3VycmVudEVsZW1lbnQ7aWYodCE9PWF8fGkhPT1lLl9jb250ZXh0KXt2YXIgcz1vLnNob3VsZFVwZGF0ZVJlZnMoYSx0KTtzJiZvLmRldGFjaFJlZnMoZSxhKSxlLnJlY2VpdmVDb21wb25lbnQodCxuLGkpLHMmJmUuX2N1cnJlbnRFbGVtZW50JiZudWxsIT1lLl9jdXJyZW50RWxlbWVudC5yZWYmJm4uZ2V0UmVhY3RNb3VudFJlYWR5KCkuZW5xdWV1ZShyLGUpfX0scGVyZm9ybVVwZGF0ZUlmTmVjZXNzYXJ5OmZ1bmN0aW9uKGUsdCxuKXtlLl91cGRhdGVCYXRjaE51bWJlcj09PW4mJmUucGVyZm9ybVVwZGF0ZUlmTmVjZXNzYXJ5KHQpfX0pO3QuZXhwb3J0cz1pfSx7MTQyOjE0Miw1ODo1OCw2Nzo2N31dLDY3OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlLHQsbil7XCJmdW5jdGlvblwiPT10eXBlb2YgZT9lKHQuZ2V0UHVibGljSW5zdGFuY2UoKSk6aS5hZGRDb21wb25lbnRBc1JlZlRvKHQsZSxuKX1mdW5jdGlvbiBvKGUsdCxuKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBlP2UobnVsbCk6aS5yZW1vdmVDb21wb25lbnRBc1JlZkZyb20odCxlLG4pfXZhciBpPWUoNjMpLGE9e307YS5hdHRhY2hSZWZzPWZ1bmN0aW9uKGUsdCl7aWYobnVsbCE9PXQmJlwib2JqZWN0XCI9PXR5cGVvZiB0KXt2YXIgbj10LnJlZjtudWxsIT1uJiZyKG4sZSx0Ll9vd25lcil9fSxhLnNob3VsZFVwZGF0ZVJlZnM9ZnVuY3Rpb24oZSx0KXt2YXIgbj1udWxsLHI9bnVsbDtudWxsIT09ZSYmXCJvYmplY3RcIj09dHlwZW9mIGUmJihuPWUucmVmLHI9ZS5fb3duZXIpO3ZhciBvPW51bGwsaT1udWxsO3JldHVybiBudWxsIT09dCYmXCJvYmplY3RcIj09dHlwZW9mIHQmJihvPXQucmVmLGk9dC5fb3duZXIpLG4hPT1vfHxcInN0cmluZ1wiPT10eXBlb2YgbyYmaSE9PXJ9LGEuZGV0YWNoUmVmcz1mdW5jdGlvbihlLHQpe2lmKG51bGwhPT10JiZcIm9iamVjdFwiPT10eXBlb2YgdCl7dmFyIG49dC5yZWY7bnVsbCE9biYmbyhuLGUsdC5fb3duZXIpfX0sdC5leHBvcnRzPWF9LHs2Mzo2M31dLDY4OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXt0aGlzLnJlaW5pdGlhbGl6ZVRyYW5zYWN0aW9uKCksdGhpcy5yZW5kZXJUb1N0YXRpY01hcmt1cD1lLHRoaXMudXNlQ3JlYXRlRWxlbWVudD0hMSx0aGlzLnVwZGF0ZVF1ZXVlPW5ldyBzKHRoaXMpfXZhciBvPWUoMTQzKSxpPWUoMjQpLGE9ZSg4OSkscz0oZSg1OCksZSg2OSkpLHU9W10sbD17ZW5xdWV1ZTpmdW5jdGlvbigpe319LGM9e2dldFRyYW5zYWN0aW9uV3JhcHBlcnM6ZnVuY3Rpb24oKXtyZXR1cm4gdX0sZ2V0UmVhY3RNb3VudFJlYWR5OmZ1bmN0aW9uKCl7cmV0dXJuIGx9LGdldFVwZGF0ZVF1ZXVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudXBkYXRlUXVldWV9LGRlc3RydWN0b3I6ZnVuY3Rpb24oKXt9LGNoZWNrcG9pbnQ6ZnVuY3Rpb24oKXt9LHJvbGxiYWNrOmZ1bmN0aW9uKCl7fX07byhyLnByb3RvdHlwZSxhLGMpLGkuYWRkUG9vbGluZ1RvKHIpLHQuZXhwb3J0cz1yfSx7MTQzOjE0MywyNDoyNCw1ODo1OCw2OTo2OSw4OTo4OX1dLDY5OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlLHQpe2lmKCEoZSBpbnN0YW5jZW9mIHQpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9dmFyIG89ZSg3MCksaT0oZSgxNDIpLGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0KXtyKHRoaXMsZSksdGhpcy50cmFuc2FjdGlvbj10fXJldHVybiBlLnByb3RvdHlwZS5pc01vdW50ZWQ9ZnVuY3Rpb24oZSl7cmV0dXJuITF9LGUucHJvdG90eXBlLmVucXVldWVDYWxsYmFjaz1mdW5jdGlvbihlLHQsbil7dGhpcy50cmFuc2FjdGlvbi5pc0luVHJhbnNhY3Rpb24oKSYmby5lbnF1ZXVlQ2FsbGJhY2soZSx0LG4pfSxlLnByb3RvdHlwZS5lbnF1ZXVlRm9yY2VVcGRhdGU9ZnVuY3Rpb24oZSl7dGhpcy50cmFuc2FjdGlvbi5pc0luVHJhbnNhY3Rpb24oKSYmby5lbnF1ZXVlRm9yY2VVcGRhdGUoZSl9LGUucHJvdG90eXBlLmVucXVldWVSZXBsYWNlU3RhdGU9ZnVuY3Rpb24oZSx0KXt0aGlzLnRyYW5zYWN0aW9uLmlzSW5UcmFuc2FjdGlvbigpJiZvLmVucXVldWVSZXBsYWNlU3RhdGUoZSx0KX0sZS5wcm90b3R5cGUuZW5xdWV1ZVNldFN0YXRlPWZ1bmN0aW9uKGUsdCl7dGhpcy50cmFuc2FjdGlvbi5pc0luVHJhbnNhY3Rpb24oKSYmby5lbnF1ZXVlU2V0U3RhdGUoZSx0KX0sZX0oKSk7dC5leHBvcnRzPWl9LHsxNDI6MTQyLDcwOjcwfV0sNzA6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe3UuZW5xdWV1ZVVwZGF0ZShlKX1mdW5jdGlvbiBvKGUpe3ZhciB0PXR5cGVvZiBlO2lmKFwib2JqZWN0XCIhPT10KXJldHVybiB0O3ZhciBuPWUuY29uc3RydWN0b3ImJmUuY29uc3RydWN0b3IubmFtZXx8dCxyPU9iamVjdC5rZXlzKGUpO3JldHVybiByLmxlbmd0aD4wJiZyLmxlbmd0aDwyMD9uK1wiIChrZXlzOiBcIityLmpvaW4oXCIsIFwiKStcIilcIjpufWZ1bmN0aW9uIGkoZSx0KXt2YXIgbj1zLmdldChlKTtyZXR1cm4gbnx8bnVsbH12YXIgYT1lKDExMikscz0oZSgxMTkpLGUoNTcpKSx1PShlKDU4KSxlKDcxKSksbD0oZSgxMzcpLGUoMTQyKSx7aXNNb3VudGVkOmZ1bmN0aW9uKGUpe3ZhciB0PXMuZ2V0KGUpO3JldHVybiEhdCYmISF0Ll9yZW5kZXJlZENvbXBvbmVudH0sZW5xdWV1ZUNhbGxiYWNrOmZ1bmN0aW9uKGUsdCxuKXtsLnZhbGlkYXRlQ2FsbGJhY2sodCxuKTt2YXIgbz1pKGUpO2lmKCFvKXJldHVybiBudWxsO28uX3BlbmRpbmdDYWxsYmFja3M/by5fcGVuZGluZ0NhbGxiYWNrcy5wdXNoKHQpOm8uX3BlbmRpbmdDYWxsYmFja3M9W3RdLHIobyl9LGVucXVldWVDYWxsYmFja0ludGVybmFsOmZ1bmN0aW9uKGUsdCl7ZS5fcGVuZGluZ0NhbGxiYWNrcz9lLl9wZW5kaW5nQ2FsbGJhY2tzLnB1c2godCk6ZS5fcGVuZGluZ0NhbGxiYWNrcz1bdF0scihlKX0sZW5xdWV1ZUZvcmNlVXBkYXRlOmZ1bmN0aW9uKGUpe3ZhciB0PWkoZSxcImZvcmNlVXBkYXRlXCIpO3QmJih0Ll9wZW5kaW5nRm9yY2VVcGRhdGU9ITAscih0KSl9LGVucXVldWVSZXBsYWNlU3RhdGU6ZnVuY3Rpb24oZSx0LG4pe3ZhciBvPWkoZSxcInJlcGxhY2VTdGF0ZVwiKTtvJiYoby5fcGVuZGluZ1N0YXRlUXVldWU9W3RdLG8uX3BlbmRpbmdSZXBsYWNlU3RhdGU9ITAsdm9pZCAwIT09biYmbnVsbCE9PW4mJihsLnZhbGlkYXRlQ2FsbGJhY2sobixcInJlcGxhY2VTdGF0ZVwiKSxvLl9wZW5kaW5nQ2FsbGJhY2tzP28uX3BlbmRpbmdDYWxsYmFja3MucHVzaChuKTpvLl9wZW5kaW5nQ2FsbGJhY2tzPVtuXSkscihvKSl9LGVucXVldWVTZXRTdGF0ZTpmdW5jdGlvbihlLHQpe3ZhciBuPWkoZSxcInNldFN0YXRlXCIpO24mJigobi5fcGVuZGluZ1N0YXRlUXVldWV8fChuLl9wZW5kaW5nU3RhdGVRdWV1ZT1bXSkpLnB1c2godCkscihuKSl9LGVucXVldWVFbGVtZW50SW50ZXJuYWw6ZnVuY3Rpb24oZSx0LG4pe2UuX3BlbmRpbmdFbGVtZW50PXQsZS5fY29udGV4dD1uLHIoZSl9LHZhbGlkYXRlQ2FsbGJhY2s6ZnVuY3Rpb24oZSx0KXtlJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBlJiZhKFwiMTIyXCIsdCxvKGUpKX19KTt0LmV4cG9ydHM9bH0sezExMjoxMTIsMTE5OjExOSwxMzc6MTM3LDE0MjoxNDIsNTc6NTcsNTg6NTgsNzE6NzF9XSw3MTpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoKXtQLlJlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb24mJmJ8fGMoXCIxMjNcIil9ZnVuY3Rpb24gbygpe3RoaXMucmVpbml0aWFsaXplVHJhbnNhY3Rpb24oKSx0aGlzLmRpcnR5Q29tcG9uZW50c0xlbmd0aD1udWxsLHRoaXMuY2FsbGJhY2tRdWV1ZT1kLmdldFBvb2xlZCgpLHRoaXMucmVjb25jaWxlVHJhbnNhY3Rpb249UC5SZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9uLmdldFBvb2xlZCghMCl9ZnVuY3Rpb24gaShlLHQsbixvLGksYSl7cmV0dXJuIHIoKSxiLmJhdGNoZWRVcGRhdGVzKGUsdCxuLG8saSxhKX1mdW5jdGlvbiBhKGUsdCl7cmV0dXJuIGUuX21vdW50T3JkZXItdC5fbW91bnRPcmRlcn1mdW5jdGlvbiBzKGUpe3ZhciB0PWUuZGlydHlDb21wb25lbnRzTGVuZ3RoO3QhPT1nLmxlbmd0aCYmYyhcIjEyNFwiLHQsZy5sZW5ndGgpLGcuc29ydChhKSx5Kys7Zm9yKHZhciBuPTA7bjx0O24rKyl7dmFyIHI9Z1tuXSxvPXIuX3BlbmRpbmdDYWxsYmFja3M7ci5fcGVuZGluZ0NhbGxiYWNrcz1udWxsO3ZhciBpO2lmKGgubG9nVG9wTGV2ZWxSZW5kZXJzKXt2YXIgcz1yO3IuX2N1cnJlbnRFbGVtZW50LnR5cGUuaXNSZWFjdFRvcExldmVsV3JhcHBlciYmKHM9ci5fcmVuZGVyZWRDb21wb25lbnQpLGk9XCJSZWFjdCB1cGRhdGU6IFwiK3MuZ2V0TmFtZSgpLGNvbnNvbGUudGltZShpKX1pZihtLnBlcmZvcm1VcGRhdGVJZk5lY2Vzc2FyeShyLGUucmVjb25jaWxlVHJhbnNhY3Rpb24seSksaSYmY29uc29sZS50aW1lRW5kKGkpLG8pZm9yKHZhciB1PTA7dTxvLmxlbmd0aDt1KyspZS5jYWxsYmFja1F1ZXVlLmVucXVldWUob1t1XSxyLmdldFB1YmxpY0luc3RhbmNlKCkpfX1mdW5jdGlvbiB1KGUpe2lmKHIoKSwhYi5pc0JhdGNoaW5nVXBkYXRlcylyZXR1cm4gdm9pZCBiLmJhdGNoZWRVcGRhdGVzKHUsZSk7Zy5wdXNoKGUpLG51bGw9PWUuX3VwZGF0ZUJhdGNoTnVtYmVyJiYoZS5fdXBkYXRlQmF0Y2hOdW1iZXI9eSsxKX1mdW5jdGlvbiBsKGUsdCl7Yi5pc0JhdGNoaW5nVXBkYXRlc3x8YyhcIjEyNVwiKSxfLmVucXVldWUoZSx0KSxDPSEwfXZhciBjPWUoMTEyKSxwPWUoMTQzKSxkPWUoNiksZj1lKDI0KSxoPWUoNTMpLG09ZSg2Niksdj1lKDg5KSxnPShlKDEzNyksW10pLHk9MCxfPWQuZ2V0UG9vbGVkKCksQz0hMSxiPW51bGwsRT17aW5pdGlhbGl6ZTpmdW5jdGlvbigpe3RoaXMuZGlydHlDb21wb25lbnRzTGVuZ3RoPWcubGVuZ3RofSxjbG9zZTpmdW5jdGlvbigpe3RoaXMuZGlydHlDb21wb25lbnRzTGVuZ3RoIT09Zy5sZW5ndGg/KGcuc3BsaWNlKDAsdGhpcy5kaXJ0eUNvbXBvbmVudHNMZW5ndGgpLFQoKSk6Zy5sZW5ndGg9MH19LHg9e2luaXRpYWxpemU6ZnVuY3Rpb24oKXt0aGlzLmNhbGxiYWNrUXVldWUucmVzZXQoKX0sY2xvc2U6ZnVuY3Rpb24oKXt0aGlzLmNhbGxiYWNrUXVldWUubm90aWZ5QWxsKCl9fSx3PVtFLHhdO3Aoby5wcm90b3R5cGUsdix7Z2V0VHJhbnNhY3Rpb25XcmFwcGVyczpmdW5jdGlvbigpe3JldHVybiB3fSxkZXN0cnVjdG9yOmZ1bmN0aW9uKCl7dGhpcy5kaXJ0eUNvbXBvbmVudHNMZW5ndGg9bnVsbCxkLnJlbGVhc2UodGhpcy5jYWxsYmFja1F1ZXVlKSx0aGlzLmNhbGxiYWNrUXVldWU9bnVsbCxQLlJlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb24ucmVsZWFzZSh0aGlzLnJlY29uY2lsZVRyYW5zYWN0aW9uKSx0aGlzLnJlY29uY2lsZVRyYW5zYWN0aW9uPW51bGx9LHBlcmZvcm06ZnVuY3Rpb24oZSx0LG4pe3JldHVybiB2LnBlcmZvcm0uY2FsbCh0aGlzLHRoaXMucmVjb25jaWxlVHJhbnNhY3Rpb24ucGVyZm9ybSx0aGlzLnJlY29uY2lsZVRyYW5zYWN0aW9uLGUsdCxuKX19KSxmLmFkZFBvb2xpbmdUbyhvKTt2YXIgVD1mdW5jdGlvbigpe2Zvcig7Zy5sZW5ndGh8fEM7KXtpZihnLmxlbmd0aCl7dmFyIGU9by5nZXRQb29sZWQoKTtlLnBlcmZvcm0ocyxudWxsLGUpLG8ucmVsZWFzZShlKX1pZihDKXtDPSExO3ZhciB0PV87Xz1kLmdldFBvb2xlZCgpLHQubm90aWZ5QWxsKCksZC5yZWxlYXNlKHQpfX19LGs9e2luamVjdFJlY29uY2lsZVRyYW5zYWN0aW9uOmZ1bmN0aW9uKGUpe2V8fGMoXCIxMjZcIiksUC5SZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9uPWV9LGluamVjdEJhdGNoaW5nU3RyYXRlZ3k6ZnVuY3Rpb24oZSl7ZXx8YyhcIjEyN1wiKSxcImZ1bmN0aW9uXCIhPXR5cGVvZiBlLmJhdGNoZWRVcGRhdGVzJiZjKFwiMTI4XCIpLFwiYm9vbGVhblwiIT10eXBlb2YgZS5pc0JhdGNoaW5nVXBkYXRlcyYmYyhcIjEyOVwiKSxiPWV9fSxQPXtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9uOm51bGwsYmF0Y2hlZFVwZGF0ZXM6aSxlbnF1ZXVlVXBkYXRlOnUsZmx1c2hCYXRjaGVkVXBkYXRlczpULGluamVjdGlvbjprLGFzYXA6bH07dC5leHBvcnRzPVB9LHsxMTI6MTEyLDEzNzoxMzcsMTQzOjE0MywyNDoyNCw1Mzo1Myw2OjYsNjY6NjYsODk6ODl9XSw3MjpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3QuZXhwb3J0cz1cIjE1LjUuNFwifSx7fV0sNzM6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj17eGxpbms6XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIseG1sOlwiaHR0cDovL3d3dy53My5vcmcvWE1MLzE5OTgvbmFtZXNwYWNlXCJ9LG89e2FjY2VudEhlaWdodDpcImFjY2VudC1oZWlnaHRcIixhY2N1bXVsYXRlOjAsYWRkaXRpdmU6MCxhbGlnbm1lbnRCYXNlbGluZTpcImFsaWdubWVudC1iYXNlbGluZVwiLGFsbG93UmVvcmRlcjpcImFsbG93UmVvcmRlclwiLGFscGhhYmV0aWM6MCxhbXBsaXR1ZGU6MCxhcmFiaWNGb3JtOlwiYXJhYmljLWZvcm1cIixhc2NlbnQ6MCxhdHRyaWJ1dGVOYW1lOlwiYXR0cmlidXRlTmFtZVwiLGF0dHJpYnV0ZVR5cGU6XCJhdHRyaWJ1dGVUeXBlXCIsYXV0b1JldmVyc2U6XCJhdXRvUmV2ZXJzZVwiLGF6aW11dGg6MCxiYXNlRnJlcXVlbmN5OlwiYmFzZUZyZXF1ZW5jeVwiLGJhc2VQcm9maWxlOlwiYmFzZVByb2ZpbGVcIixiYXNlbGluZVNoaWZ0OlwiYmFzZWxpbmUtc2hpZnRcIixiYm94OjAsYmVnaW46MCxiaWFzOjAsYnk6MCxjYWxjTW9kZTpcImNhbGNNb2RlXCIsY2FwSGVpZ2h0OlwiY2FwLWhlaWdodFwiLGNsaXA6MCxjbGlwUGF0aDpcImNsaXAtcGF0aFwiLGNsaXBSdWxlOlwiY2xpcC1ydWxlXCIsY2xpcFBhdGhVbml0czpcImNsaXBQYXRoVW5pdHNcIixjb2xvckludGVycG9sYXRpb246XCJjb2xvci1pbnRlcnBvbGF0aW9uXCIsY29sb3JJbnRlcnBvbGF0aW9uRmlsdGVyczpcImNvbG9yLWludGVycG9sYXRpb24tZmlsdGVyc1wiLGNvbG9yUHJvZmlsZTpcImNvbG9yLXByb2ZpbGVcIixjb2xvclJlbmRlcmluZzpcImNvbG9yLXJlbmRlcmluZ1wiLGNvbnRlbnRTY3JpcHRUeXBlOlwiY29udGVudFNjcmlwdFR5cGVcIixjb250ZW50U3R5bGVUeXBlOlwiY29udGVudFN0eWxlVHlwZVwiLGN1cnNvcjowLGN4OjAsY3k6MCxkOjAsZGVjZWxlcmF0ZTowLGRlc2NlbnQ6MCxkaWZmdXNlQ29uc3RhbnQ6XCJkaWZmdXNlQ29uc3RhbnRcIixkaXJlY3Rpb246MCxkaXNwbGF5OjAsZGl2aXNvcjowLGRvbWluYW50QmFzZWxpbmU6XCJkb21pbmFudC1iYXNlbGluZVwiLGR1cjowLGR4OjAsZHk6MCxlZGdlTW9kZTpcImVkZ2VNb2RlXCIsZWxldmF0aW9uOjAsZW5hYmxlQmFja2dyb3VuZDpcImVuYWJsZS1iYWNrZ3JvdW5kXCIsZW5kOjAsZXhwb25lbnQ6MCxleHRlcm5hbFJlc291cmNlc1JlcXVpcmVkOlwiZXh0ZXJuYWxSZXNvdXJjZXNSZXF1aXJlZFwiLGZpbGw6MCxmaWxsT3BhY2l0eTpcImZpbGwtb3BhY2l0eVwiLGZpbGxSdWxlOlwiZmlsbC1ydWxlXCIsZmlsdGVyOjAsZmlsdGVyUmVzOlwiZmlsdGVyUmVzXCIsZmlsdGVyVW5pdHM6XCJmaWx0ZXJVbml0c1wiLGZsb29kQ29sb3I6XCJmbG9vZC1jb2xvclwiLGZsb29kT3BhY2l0eTpcImZsb29kLW9wYWNpdHlcIixmb2N1c2FibGU6MCxmb250RmFtaWx5OlwiZm9udC1mYW1pbHlcIixmb250U2l6ZTpcImZvbnQtc2l6ZVwiLGZvbnRTaXplQWRqdXN0OlwiZm9udC1zaXplLWFkanVzdFwiLGZvbnRTdHJldGNoOlwiZm9udC1zdHJldGNoXCIsZm9udFN0eWxlOlwiZm9udC1zdHlsZVwiLGZvbnRWYXJpYW50OlwiZm9udC12YXJpYW50XCIsZm9udFdlaWdodDpcImZvbnQtd2VpZ2h0XCIsZm9ybWF0OjAsZnJvbTowLGZ4OjAsZnk6MCxnMTowLGcyOjAsZ2x5cGhOYW1lOlwiZ2x5cGgtbmFtZVwiLGdseXBoT3JpZW50YXRpb25Ib3Jpem9udGFsOlwiZ2x5cGgtb3JpZW50YXRpb24taG9yaXpvbnRhbFwiLGdseXBoT3JpZW50YXRpb25WZXJ0aWNhbDpcImdseXBoLW9yaWVudGF0aW9uLXZlcnRpY2FsXCIsZ2x5cGhSZWY6XCJnbHlwaFJlZlwiLGdyYWRpZW50VHJhbnNmb3JtOlwiZ3JhZGllbnRUcmFuc2Zvcm1cIixncmFkaWVudFVuaXRzOlwiZ3JhZGllbnRVbml0c1wiLGhhbmdpbmc6MCxob3JpekFkdlg6XCJob3Jpei1hZHYteFwiLGhvcml6T3JpZ2luWDpcImhvcml6LW9yaWdpbi14XCIsaWRlb2dyYXBoaWM6MCxpbWFnZVJlbmRlcmluZzpcImltYWdlLXJlbmRlcmluZ1wiLGluOjAsaW4yOjAsaW50ZXJjZXB0OjAsazowLGsxOjAsazI6MCxrMzowLGs0OjAsa2VybmVsTWF0cml4Olwia2VybmVsTWF0cml4XCIsa2VybmVsVW5pdExlbmd0aDpcImtlcm5lbFVuaXRMZW5ndGhcIixrZXJuaW5nOjAsa2V5UG9pbnRzOlwia2V5UG9pbnRzXCIsa2V5U3BsaW5lczpcImtleVNwbGluZXNcIixrZXlUaW1lczpcImtleVRpbWVzXCIsbGVuZ3RoQWRqdXN0OlwibGVuZ3RoQWRqdXN0XCIsbGV0dGVyU3BhY2luZzpcImxldHRlci1zcGFjaW5nXCIsbGlnaHRpbmdDb2xvcjpcImxpZ2h0aW5nLWNvbG9yXCIsbGltaXRpbmdDb25lQW5nbGU6XCJsaW1pdGluZ0NvbmVBbmdsZVwiLGxvY2FsOjAsbWFya2VyRW5kOlwibWFya2VyLWVuZFwiLG1hcmtlck1pZDpcIm1hcmtlci1taWRcIixtYXJrZXJTdGFydDpcIm1hcmtlci1zdGFydFwiLG1hcmtlckhlaWdodDpcIm1hcmtlckhlaWdodFwiLG1hcmtlclVuaXRzOlwibWFya2VyVW5pdHNcIixtYXJrZXJXaWR0aDpcIm1hcmtlcldpZHRoXCIsbWFzazowLG1hc2tDb250ZW50VW5pdHM6XCJtYXNrQ29udGVudFVuaXRzXCIsbWFza1VuaXRzOlwibWFza1VuaXRzXCIsbWF0aGVtYXRpY2FsOjAsbW9kZTowLG51bU9jdGF2ZXM6XCJudW1PY3RhdmVzXCIsb2Zmc2V0OjAsb3BhY2l0eTowLG9wZXJhdG9yOjAsb3JkZXI6MCxvcmllbnQ6MCxvcmllbnRhdGlvbjowLG9yaWdpbjowLG92ZXJmbG93OjAsb3ZlcmxpbmVQb3NpdGlvbjpcIm92ZXJsaW5lLXBvc2l0aW9uXCIsb3ZlcmxpbmVUaGlja25lc3M6XCJvdmVybGluZS10aGlja25lc3NcIixwYWludE9yZGVyOlwicGFpbnQtb3JkZXJcIixwYW5vc2UxOlwicGFub3NlLTFcIixwYXRoTGVuZ3RoOlwicGF0aExlbmd0aFwiLHBhdHRlcm5Db250ZW50VW5pdHM6XCJwYXR0ZXJuQ29udGVudFVuaXRzXCIscGF0dGVyblRyYW5zZm9ybTpcInBhdHRlcm5UcmFuc2Zvcm1cIixwYXR0ZXJuVW5pdHM6XCJwYXR0ZXJuVW5pdHNcIixwb2ludGVyRXZlbnRzOlwicG9pbnRlci1ldmVudHNcIixwb2ludHM6MCxwb2ludHNBdFg6XCJwb2ludHNBdFhcIixwb2ludHNBdFk6XCJwb2ludHNBdFlcIixwb2ludHNBdFo6XCJwb2ludHNBdFpcIixwcmVzZXJ2ZUFscGhhOlwicHJlc2VydmVBbHBoYVwiLHByZXNlcnZlQXNwZWN0UmF0aW86XCJwcmVzZXJ2ZUFzcGVjdFJhdGlvXCIscHJpbWl0aXZlVW5pdHM6XCJwcmltaXRpdmVVbml0c1wiLHI6MCxyYWRpdXM6MCxyZWZYOlwicmVmWFwiLHJlZlk6XCJyZWZZXCIscmVuZGVyaW5nSW50ZW50OlwicmVuZGVyaW5nLWludGVudFwiLHJlcGVhdENvdW50OlwicmVwZWF0Q291bnRcIixyZXBlYXREdXI6XCJyZXBlYXREdXJcIixyZXF1aXJlZEV4dGVuc2lvbnM6XCJyZXF1aXJlZEV4dGVuc2lvbnNcIixyZXF1aXJlZEZlYXR1cmVzOlwicmVxdWlyZWRGZWF0dXJlc1wiLHJlc3RhcnQ6MCxyZXN1bHQ6MCxyb3RhdGU6MCxyeDowLHJ5OjAsc2NhbGU6MCxzZWVkOjAsc2hhcGVSZW5kZXJpbmc6XCJzaGFwZS1yZW5kZXJpbmdcIixzbG9wZTowLHNwYWNpbmc6MCxzcGVjdWxhckNvbnN0YW50Olwic3BlY3VsYXJDb25zdGFudFwiLHNwZWN1bGFyRXhwb25lbnQ6XCJzcGVjdWxhckV4cG9uZW50XCIsc3BlZWQ6MCxzcHJlYWRNZXRob2Q6XCJzcHJlYWRNZXRob2RcIixzdGFydE9mZnNldDpcInN0YXJ0T2Zmc2V0XCIsc3RkRGV2aWF0aW9uOlwic3RkRGV2aWF0aW9uXCIsc3RlbWg6MCxzdGVtdjowLHN0aXRjaFRpbGVzOlwic3RpdGNoVGlsZXNcIixzdG9wQ29sb3I6XCJzdG9wLWNvbG9yXCIsc3RvcE9wYWNpdHk6XCJzdG9wLW9wYWNpdHlcIixzdHJpa2V0aHJvdWdoUG9zaXRpb246XCJzdHJpa2V0aHJvdWdoLXBvc2l0aW9uXCIsc3RyaWtldGhyb3VnaFRoaWNrbmVzczpcInN0cmlrZXRocm91Z2gtdGhpY2tuZXNzXCIsc3RyaW5nOjAsc3Ryb2tlOjAsc3Ryb2tlRGFzaGFycmF5Olwic3Ryb2tlLWRhc2hhcnJheVwiLHN0cm9rZURhc2hvZmZzZXQ6XCJzdHJva2UtZGFzaG9mZnNldFwiLHN0cm9rZUxpbmVjYXA6XCJzdHJva2UtbGluZWNhcFwiLHN0cm9rZUxpbmVqb2luOlwic3Ryb2tlLWxpbmVqb2luXCIsc3Ryb2tlTWl0ZXJsaW1pdDpcInN0cm9rZS1taXRlcmxpbWl0XCIsc3Ryb2tlT3BhY2l0eTpcInN0cm9rZS1vcGFjaXR5XCIsc3Ryb2tlV2lkdGg6XCJzdHJva2Utd2lkdGhcIixzdXJmYWNlU2NhbGU6XCJzdXJmYWNlU2NhbGVcIixzeXN0ZW1MYW5ndWFnZTpcInN5c3RlbUxhbmd1YWdlXCIsdGFibGVWYWx1ZXM6XCJ0YWJsZVZhbHVlc1wiLHRhcmdldFg6XCJ0YXJnZXRYXCIsdGFyZ2V0WTpcInRhcmdldFlcIix0ZXh0QW5jaG9yOlwidGV4dC1hbmNob3JcIix0ZXh0RGVjb3JhdGlvbjpcInRleHQtZGVjb3JhdGlvblwiLHRleHRSZW5kZXJpbmc6XCJ0ZXh0LXJlbmRlcmluZ1wiLHRleHRMZW5ndGg6XCJ0ZXh0TGVuZ3RoXCIsdG86MCx0cmFuc2Zvcm06MCx1MTowLHUyOjAsdW5kZXJsaW5lUG9zaXRpb246XCJ1bmRlcmxpbmUtcG9zaXRpb25cIix1bmRlcmxpbmVUaGlja25lc3M6XCJ1bmRlcmxpbmUtdGhpY2tuZXNzXCIsdW5pY29kZTowLHVuaWNvZGVCaWRpOlwidW5pY29kZS1iaWRpXCIsdW5pY29kZVJhbmdlOlwidW5pY29kZS1yYW5nZVwiLHVuaXRzUGVyRW06XCJ1bml0cy1wZXItZW1cIix2QWxwaGFiZXRpYzpcInYtYWxwaGFiZXRpY1wiLHZIYW5naW5nOlwidi1oYW5naW5nXCIsdklkZW9ncmFwaGljOlwidi1pZGVvZ3JhcGhpY1wiLHZNYXRoZW1hdGljYWw6XCJ2LW1hdGhlbWF0aWNhbFwiLHZhbHVlczowLHZlY3RvckVmZmVjdDpcInZlY3Rvci1lZmZlY3RcIix2ZXJzaW9uOjAsdmVydEFkdlk6XCJ2ZXJ0LWFkdi15XCIsdmVydE9yaWdpblg6XCJ2ZXJ0LW9yaWdpbi14XCIsdmVydE9yaWdpblk6XCJ2ZXJ0LW9yaWdpbi15XCIsdmlld0JveDpcInZpZXdCb3hcIix2aWV3VGFyZ2V0Olwidmlld1RhcmdldFwiLHZpc2liaWxpdHk6MCx3aWR0aHM6MCx3b3JkU3BhY2luZzpcIndvcmQtc3BhY2luZ1wiLHdyaXRpbmdNb2RlOlwid3JpdGluZy1tb2RlXCIseDowLHhIZWlnaHQ6XCJ4LWhlaWdodFwiLHgxOjAseDI6MCx4Q2hhbm5lbFNlbGVjdG9yOlwieENoYW5uZWxTZWxlY3RvclwiLHhsaW5rQWN0dWF0ZTpcInhsaW5rOmFjdHVhdGVcIix4bGlua0FyY3JvbGU6XCJ4bGluazphcmNyb2xlXCIseGxpbmtIcmVmOlwieGxpbms6aHJlZlwiLHhsaW5rUm9sZTpcInhsaW5rOnJvbGVcIix4bGlua1Nob3c6XCJ4bGluazpzaG93XCIseGxpbmtUaXRsZTpcInhsaW5rOnRpdGxlXCIseGxpbmtUeXBlOlwieGxpbms6dHlwZVwiLHhtbEJhc2U6XCJ4bWw6YmFzZVwiLHhtbG5zOjAseG1sbnNYbGluazpcInhtbG5zOnhsaW5rXCIseG1sTGFuZzpcInhtbDpsYW5nXCIseG1sU3BhY2U6XCJ4bWw6c3BhY2VcIix5OjAseTE6MCx5MjowLHlDaGFubmVsU2VsZWN0b3I6XCJ5Q2hhbm5lbFNlbGVjdG9yXCIsejowLHpvb21BbmRQYW46XCJ6b29tQW5kUGFuXCJ9LGk9e1Byb3BlcnRpZXM6e30sRE9NQXR0cmlidXRlTmFtZXNwYWNlczp7eGxpbmtBY3R1YXRlOnIueGxpbmsseGxpbmtBcmNyb2xlOnIueGxpbmsseGxpbmtIcmVmOnIueGxpbmsseGxpbmtSb2xlOnIueGxpbmsseGxpbmtTaG93OnIueGxpbmsseGxpbmtUaXRsZTpyLnhsaW5rLHhsaW5rVHlwZTpyLnhsaW5rLHhtbEJhc2U6ci54bWwseG1sTGFuZzpyLnhtbCx4bWxTcGFjZTpyLnhtbH0sRE9NQXR0cmlidXRlTmFtZXM6e319O09iamVjdC5rZXlzKG8pLmZvckVhY2goZnVuY3Rpb24oZSl7aS5Qcm9wZXJ0aWVzW2VdPTAsb1tlXSYmKGkuRE9NQXR0cmlidXRlTmFtZXNbZV09b1tlXSl9KSx0LmV4cG9ydHM9aX0se31dLDc0OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtpZihcInNlbGVjdGlvblN0YXJ0XCJpbiBlJiZ1Lmhhc1NlbGVjdGlvbkNhcGFiaWxpdGllcyhlKSlyZXR1cm57c3RhcnQ6ZS5zZWxlY3Rpb25TdGFydCxlbmQ6ZS5zZWxlY3Rpb25FbmR9O2lmKHdpbmRvdy5nZXRTZWxlY3Rpb24pe3ZhciB0PXdpbmRvdy5nZXRTZWxlY3Rpb24oKTtyZXR1cm57YW5jaG9yTm9kZTp0LmFuY2hvck5vZGUsYW5jaG9yT2Zmc2V0OnQuYW5jaG9yT2Zmc2V0LGZvY3VzTm9kZTp0LmZvY3VzTm9kZSxmb2N1c09mZnNldDp0LmZvY3VzT2Zmc2V0fX1pZihkb2N1bWVudC5zZWxlY3Rpb24pe3ZhciBuPWRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO3JldHVybntwYXJlbnRFbGVtZW50Om4ucGFyZW50RWxlbWVudCgpLHRleHQ6bi50ZXh0LHRvcDpuLmJvdW5kaW5nVG9wLGxlZnQ6bi5ib3VuZGluZ0xlZnR9fX1mdW5jdGlvbiBvKGUsdCl7aWYoeXx8bnVsbD09bXx8bSE9PWMoKSlyZXR1cm4gbnVsbDt2YXIgbj1yKG0pO2lmKCFnfHwhZChnLG4pKXtnPW47dmFyIG89bC5nZXRQb29sZWQoaC5zZWxlY3QsdixlLHQpO3JldHVybiBvLnR5cGU9XCJzZWxlY3RcIixvLnRhcmdldD1tLGkuYWNjdW11bGF0ZVR3b1BoYXNlRGlzcGF0Y2hlcyhvKSxvfXJldHVybiBudWxsfXZhciBpPWUoMTkpLGE9ZSgxMjMpLHM9ZSgzMyksdT1lKDU2KSxsPWUoODApLGM9ZSgxMzIpLHA9ZSgxMTApLGQ9ZSgxNDEpLGY9YS5jYW5Vc2VET00mJlwiZG9jdW1lbnRNb2RlXCJpbiBkb2N1bWVudCYmZG9jdW1lbnQuZG9jdW1lbnRNb2RlPD0xMSxoPXtzZWxlY3Q6e3BoYXNlZFJlZ2lzdHJhdGlvbk5hbWVzOntidWJibGVkOlwib25TZWxlY3RcIixjYXB0dXJlZDpcIm9uU2VsZWN0Q2FwdHVyZVwifSxkZXBlbmRlbmNpZXM6W1widG9wQmx1clwiLFwidG9wQ29udGV4dE1lbnVcIixcInRvcEZvY3VzXCIsXCJ0b3BLZXlEb3duXCIsXCJ0b3BLZXlVcFwiLFwidG9wTW91c2VEb3duXCIsXCJ0b3BNb3VzZVVwXCIsXCJ0b3BTZWxlY3Rpb25DaGFuZ2VcIl19fSxtPW51bGwsdj1udWxsLGc9bnVsbCx5PSExLF89ITEsQz17ZXZlbnRUeXBlczpoLGV4dHJhY3RFdmVudHM6ZnVuY3Rpb24oZSx0LG4scil7aWYoIV8pcmV0dXJuIG51bGw7dmFyIGk9dD9zLmdldE5vZGVGcm9tSW5zdGFuY2UodCk6d2luZG93O3N3aXRjaChlKXtjYXNlXCJ0b3BGb2N1c1wiOihwKGkpfHxcInRydWVcIj09PWkuY29udGVudEVkaXRhYmxlKSYmKG09aSx2PXQsZz1udWxsKTticmVha1xuO2Nhc2VcInRvcEJsdXJcIjptPW51bGwsdj1udWxsLGc9bnVsbDticmVhaztjYXNlXCJ0b3BNb3VzZURvd25cIjp5PSEwO2JyZWFrO2Nhc2VcInRvcENvbnRleHRNZW51XCI6Y2FzZVwidG9wTW91c2VVcFwiOnJldHVybiB5PSExLG8obixyKTtjYXNlXCJ0b3BTZWxlY3Rpb25DaGFuZ2VcIjppZihmKWJyZWFrO2Nhc2VcInRvcEtleURvd25cIjpjYXNlXCJ0b3BLZXlVcFwiOnJldHVybiBvKG4scil9cmV0dXJuIG51bGx9LGRpZFB1dExpc3RlbmVyOmZ1bmN0aW9uKGUsdCxuKXtcIm9uU2VsZWN0XCI9PT10JiYoXz0hMCl9fTt0LmV4cG9ydHM9Q30sezExMDoxMTAsMTIzOjEyMywxMzI6MTMyLDE0MToxNDEsMTk6MTksMzM6MzMsNTY6NTYsODA6ODB9XSw3NTpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7cmV0dXJuXCIuXCIrZS5fcm9vdE5vZGVJRH1mdW5jdGlvbiBvKGUpe3JldHVyblwiYnV0dG9uXCI9PT1lfHxcImlucHV0XCI9PT1lfHxcInNlbGVjdFwiPT09ZXx8XCJ0ZXh0YXJlYVwiPT09ZX12YXIgaT1lKDExMiksYT1lKDEyMikscz1lKDE5KSx1PWUoMzMpLGw9ZSg3NiksYz1lKDc3KSxwPWUoODApLGQ9ZSg4MSksZj1lKDgzKSxoPWUoODQpLG09ZSg3OSksdj1lKDg1KSxnPWUoODYpLHk9ZSg4NyksXz1lKDg4KSxDPWUoMTI5KSxiPWUoOTkpLEU9KGUoMTM3KSx7fSkseD17fTtbXCJhYm9ydFwiLFwiYW5pbWF0aW9uRW5kXCIsXCJhbmltYXRpb25JdGVyYXRpb25cIixcImFuaW1hdGlvblN0YXJ0XCIsXCJibHVyXCIsXCJjYW5QbGF5XCIsXCJjYW5QbGF5VGhyb3VnaFwiLFwiY2xpY2tcIixcImNvbnRleHRNZW51XCIsXCJjb3B5XCIsXCJjdXRcIixcImRvdWJsZUNsaWNrXCIsXCJkcmFnXCIsXCJkcmFnRW5kXCIsXCJkcmFnRW50ZXJcIixcImRyYWdFeGl0XCIsXCJkcmFnTGVhdmVcIixcImRyYWdPdmVyXCIsXCJkcmFnU3RhcnRcIixcImRyb3BcIixcImR1cmF0aW9uQ2hhbmdlXCIsXCJlbXB0aWVkXCIsXCJlbmNyeXB0ZWRcIixcImVuZGVkXCIsXCJlcnJvclwiLFwiZm9jdXNcIixcImlucHV0XCIsXCJpbnZhbGlkXCIsXCJrZXlEb3duXCIsXCJrZXlQcmVzc1wiLFwia2V5VXBcIixcImxvYWRcIixcImxvYWRlZERhdGFcIixcImxvYWRlZE1ldGFkYXRhXCIsXCJsb2FkU3RhcnRcIixcIm1vdXNlRG93blwiLFwibW91c2VNb3ZlXCIsXCJtb3VzZU91dFwiLFwibW91c2VPdmVyXCIsXCJtb3VzZVVwXCIsXCJwYXN0ZVwiLFwicGF1c2VcIixcInBsYXlcIixcInBsYXlpbmdcIixcInByb2dyZXNzXCIsXCJyYXRlQ2hhbmdlXCIsXCJyZXNldFwiLFwic2Nyb2xsXCIsXCJzZWVrZWRcIixcInNlZWtpbmdcIixcInN0YWxsZWRcIixcInN1Ym1pdFwiLFwic3VzcGVuZFwiLFwidGltZVVwZGF0ZVwiLFwidG91Y2hDYW5jZWxcIixcInRvdWNoRW5kXCIsXCJ0b3VjaE1vdmVcIixcInRvdWNoU3RhcnRcIixcInRyYW5zaXRpb25FbmRcIixcInZvbHVtZUNoYW5nZVwiLFwid2FpdGluZ1wiLFwid2hlZWxcIl0uZm9yRWFjaChmdW5jdGlvbihlKXt2YXIgdD1lWzBdLnRvVXBwZXJDYXNlKCkrZS5zbGljZSgxKSxuPVwib25cIit0LHI9XCJ0b3BcIit0LG89e3BoYXNlZFJlZ2lzdHJhdGlvbk5hbWVzOntidWJibGVkOm4sY2FwdHVyZWQ6bitcIkNhcHR1cmVcIn0sZGVwZW5kZW5jaWVzOltyXX07RVtlXT1vLHhbcl09b30pO3ZhciB3PXt9LFQ9e2V2ZW50VHlwZXM6RSxleHRyYWN0RXZlbnRzOmZ1bmN0aW9uKGUsdCxuLHIpe3ZhciBvPXhbZV07aWYoIW8pcmV0dXJuIG51bGw7dmFyIGE7c3dpdGNoKGUpe2Nhc2VcInRvcEFib3J0XCI6Y2FzZVwidG9wQ2FuUGxheVwiOmNhc2VcInRvcENhblBsYXlUaHJvdWdoXCI6Y2FzZVwidG9wRHVyYXRpb25DaGFuZ2VcIjpjYXNlXCJ0b3BFbXB0aWVkXCI6Y2FzZVwidG9wRW5jcnlwdGVkXCI6Y2FzZVwidG9wRW5kZWRcIjpjYXNlXCJ0b3BFcnJvclwiOmNhc2VcInRvcElucHV0XCI6Y2FzZVwidG9wSW52YWxpZFwiOmNhc2VcInRvcExvYWRcIjpjYXNlXCJ0b3BMb2FkZWREYXRhXCI6Y2FzZVwidG9wTG9hZGVkTWV0YWRhdGFcIjpjYXNlXCJ0b3BMb2FkU3RhcnRcIjpjYXNlXCJ0b3BQYXVzZVwiOmNhc2VcInRvcFBsYXlcIjpjYXNlXCJ0b3BQbGF5aW5nXCI6Y2FzZVwidG9wUHJvZ3Jlc3NcIjpjYXNlXCJ0b3BSYXRlQ2hhbmdlXCI6Y2FzZVwidG9wUmVzZXRcIjpjYXNlXCJ0b3BTZWVrZWRcIjpjYXNlXCJ0b3BTZWVraW5nXCI6Y2FzZVwidG9wU3RhbGxlZFwiOmNhc2VcInRvcFN1Ym1pdFwiOmNhc2VcInRvcFN1c3BlbmRcIjpjYXNlXCJ0b3BUaW1lVXBkYXRlXCI6Y2FzZVwidG9wVm9sdW1lQ2hhbmdlXCI6Y2FzZVwidG9wV2FpdGluZ1wiOmE9cDticmVhaztjYXNlXCJ0b3BLZXlQcmVzc1wiOmlmKDA9PT1iKG4pKXJldHVybiBudWxsO2Nhc2VcInRvcEtleURvd25cIjpjYXNlXCJ0b3BLZXlVcFwiOmE9ZjticmVhaztjYXNlXCJ0b3BCbHVyXCI6Y2FzZVwidG9wRm9jdXNcIjphPWQ7YnJlYWs7Y2FzZVwidG9wQ2xpY2tcIjppZigyPT09bi5idXR0b24pcmV0dXJuIG51bGw7Y2FzZVwidG9wRG91YmxlQ2xpY2tcIjpjYXNlXCJ0b3BNb3VzZURvd25cIjpjYXNlXCJ0b3BNb3VzZU1vdmVcIjpjYXNlXCJ0b3BNb3VzZVVwXCI6Y2FzZVwidG9wTW91c2VPdXRcIjpjYXNlXCJ0b3BNb3VzZU92ZXJcIjpjYXNlXCJ0b3BDb250ZXh0TWVudVwiOmE9aDticmVhaztjYXNlXCJ0b3BEcmFnXCI6Y2FzZVwidG9wRHJhZ0VuZFwiOmNhc2VcInRvcERyYWdFbnRlclwiOmNhc2VcInRvcERyYWdFeGl0XCI6Y2FzZVwidG9wRHJhZ0xlYXZlXCI6Y2FzZVwidG9wRHJhZ092ZXJcIjpjYXNlXCJ0b3BEcmFnU3RhcnRcIjpjYXNlXCJ0b3BEcm9wXCI6YT1tO2JyZWFrO2Nhc2VcInRvcFRvdWNoQ2FuY2VsXCI6Y2FzZVwidG9wVG91Y2hFbmRcIjpjYXNlXCJ0b3BUb3VjaE1vdmVcIjpjYXNlXCJ0b3BUb3VjaFN0YXJ0XCI6YT12O2JyZWFrO2Nhc2VcInRvcEFuaW1hdGlvbkVuZFwiOmNhc2VcInRvcEFuaW1hdGlvbkl0ZXJhdGlvblwiOmNhc2VcInRvcEFuaW1hdGlvblN0YXJ0XCI6YT1sO2JyZWFrO2Nhc2VcInRvcFRyYW5zaXRpb25FbmRcIjphPWc7YnJlYWs7Y2FzZVwidG9wU2Nyb2xsXCI6YT15O2JyZWFrO2Nhc2VcInRvcFdoZWVsXCI6YT1fO2JyZWFrO2Nhc2VcInRvcENvcHlcIjpjYXNlXCJ0b3BDdXRcIjpjYXNlXCJ0b3BQYXN0ZVwiOmE9Y31hfHxpKFwiODZcIixlKTt2YXIgdT1hLmdldFBvb2xlZChvLHQsbixyKTtyZXR1cm4gcy5hY2N1bXVsYXRlVHdvUGhhc2VEaXNwYXRjaGVzKHUpLHV9LGRpZFB1dExpc3RlbmVyOmZ1bmN0aW9uKGUsdCxuKXtpZihcIm9uQ2xpY2tcIj09PXQmJiFvKGUuX3RhZykpe3ZhciBpPXIoZSkscz11LmdldE5vZGVGcm9tSW5zdGFuY2UoZSk7d1tpXXx8KHdbaV09YS5saXN0ZW4ocyxcImNsaWNrXCIsQykpfX0sd2lsbERlbGV0ZUxpc3RlbmVyOmZ1bmN0aW9uKGUsdCl7aWYoXCJvbkNsaWNrXCI9PT10JiYhbyhlLl90YWcpKXt2YXIgbj1yKGUpO3dbbl0ucmVtb3ZlKCksZGVsZXRlIHdbbl19fX07dC5leHBvcnRzPVR9LHsxMTI6MTEyLDEyMjoxMjIsMTI5OjEyOSwxMzc6MTM3LDE5OjE5LDMzOjMzLDc2Ojc2LDc3Ojc3LDc5Ojc5LDgwOjgwLDgxOjgxLDgzOjgzLDg0Ojg0LDg1Ojg1LDg2Ojg2LDg3Ojg3LDg4Ojg4LDk5Ojk5fV0sNzY6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUsdCxuLHIpe3JldHVybiBvLmNhbGwodGhpcyxlLHQsbixyKX12YXIgbz1lKDgwKSxpPXthbmltYXRpb25OYW1lOm51bGwsZWxhcHNlZFRpbWU6bnVsbCxwc2V1ZG9FbGVtZW50Om51bGx9O28uYXVnbWVudENsYXNzKHIsaSksdC5leHBvcnRzPXJ9LHs4MDo4MH1dLDc3OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlLHQsbixyKXtyZXR1cm4gby5jYWxsKHRoaXMsZSx0LG4scil9dmFyIG89ZSg4MCksaT17Y2xpcGJvYXJkRGF0YTpmdW5jdGlvbihlKXtyZXR1cm5cImNsaXBib2FyZERhdGFcImluIGU/ZS5jbGlwYm9hcmREYXRhOndpbmRvdy5jbGlwYm9hcmREYXRhfX07by5hdWdtZW50Q2xhc3MocixpKSx0LmV4cG9ydHM9cn0sezgwOjgwfV0sNzg6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUsdCxuLHIpe3JldHVybiBvLmNhbGwodGhpcyxlLHQsbixyKX12YXIgbz1lKDgwKSxpPXtkYXRhOm51bGx9O28uYXVnbWVudENsYXNzKHIsaSksdC5leHBvcnRzPXJ9LHs4MDo4MH1dLDc5OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlLHQsbixyKXtyZXR1cm4gby5jYWxsKHRoaXMsZSx0LG4scil9dmFyIG89ZSg4NCksaT17ZGF0YVRyYW5zZmVyOm51bGx9O28uYXVnbWVudENsYXNzKHIsaSksdC5leHBvcnRzPXJ9LHs4NDo4NH1dLDgwOltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlLHQsbixyKXt0aGlzLmRpc3BhdGNoQ29uZmlnPWUsdGhpcy5fdGFyZ2V0SW5zdD10LHRoaXMubmF0aXZlRXZlbnQ9bjt2YXIgbz10aGlzLmNvbnN0cnVjdG9yLkludGVyZmFjZTtmb3IodmFyIGkgaW4gbylpZihvLmhhc093blByb3BlcnR5KGkpKXt2YXIgcz1vW2ldO3M/dGhpc1tpXT1zKG4pOlwidGFyZ2V0XCI9PT1pP3RoaXMudGFyZ2V0PXI6dGhpc1tpXT1uW2ldfXZhciB1PW51bGwhPW4uZGVmYXVsdFByZXZlbnRlZD9uLmRlZmF1bHRQcmV2ZW50ZWQ6ITE9PT1uLnJldHVyblZhbHVlO3JldHVybiB0aGlzLmlzRGVmYXVsdFByZXZlbnRlZD11P2EudGhhdFJldHVybnNUcnVlOmEudGhhdFJldHVybnNGYWxzZSx0aGlzLmlzUHJvcGFnYXRpb25TdG9wcGVkPWEudGhhdFJldHVybnNGYWxzZSx0aGlzfXZhciBvPWUoMTQzKSxpPWUoMjQpLGE9ZSgxMjkpLHM9KGUoMTQyKSxbXCJkaXNwYXRjaENvbmZpZ1wiLFwiX3RhcmdldEluc3RcIixcIm5hdGl2ZUV2ZW50XCIsXCJpc0RlZmF1bHRQcmV2ZW50ZWRcIixcImlzUHJvcGFnYXRpb25TdG9wcGVkXCIsXCJfZGlzcGF0Y2hMaXN0ZW5lcnNcIixcIl9kaXNwYXRjaEluc3RhbmNlc1wiXSksdT17dHlwZTpudWxsLHRhcmdldDpudWxsLGN1cnJlbnRUYXJnZXQ6YS50aGF0UmV0dXJuc051bGwsZXZlbnRQaGFzZTpudWxsLGJ1YmJsZXM6bnVsbCxjYW5jZWxhYmxlOm51bGwsdGltZVN0YW1wOmZ1bmN0aW9uKGUpe3JldHVybiBlLnRpbWVTdGFtcHx8RGF0ZS5ub3coKX0sZGVmYXVsdFByZXZlbnRlZDpudWxsLGlzVHJ1c3RlZDpudWxsfTtvKHIucHJvdG90eXBlLHtwcmV2ZW50RGVmYXVsdDpmdW5jdGlvbigpe3RoaXMuZGVmYXVsdFByZXZlbnRlZD0hMDt2YXIgZT10aGlzLm5hdGl2ZUV2ZW50O2UmJihlLnByZXZlbnREZWZhdWx0P2UucHJldmVudERlZmF1bHQoKTpcInVua25vd25cIiE9dHlwZW9mIGUucmV0dXJuVmFsdWUmJihlLnJldHVyblZhbHVlPSExKSx0aGlzLmlzRGVmYXVsdFByZXZlbnRlZD1hLnRoYXRSZXR1cm5zVHJ1ZSl9LHN0b3BQcm9wYWdhdGlvbjpmdW5jdGlvbigpe3ZhciBlPXRoaXMubmF0aXZlRXZlbnQ7ZSYmKGUuc3RvcFByb3BhZ2F0aW9uP2Uuc3RvcFByb3BhZ2F0aW9uKCk6XCJ1bmtub3duXCIhPXR5cGVvZiBlLmNhbmNlbEJ1YmJsZSYmKGUuY2FuY2VsQnViYmxlPSEwKSx0aGlzLmlzUHJvcGFnYXRpb25TdG9wcGVkPWEudGhhdFJldHVybnNUcnVlKX0scGVyc2lzdDpmdW5jdGlvbigpe3RoaXMuaXNQZXJzaXN0ZW50PWEudGhhdFJldHVybnNUcnVlfSxpc1BlcnNpc3RlbnQ6YS50aGF0UmV0dXJuc0ZhbHNlLGRlc3RydWN0b3I6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLmNvbnN0cnVjdG9yLkludGVyZmFjZTtmb3IodmFyIHQgaW4gZSl0aGlzW3RdPW51bGw7Zm9yKHZhciBuPTA7bjxzLmxlbmd0aDtuKyspdGhpc1tzW25dXT1udWxsfX0pLHIuSW50ZXJmYWNlPXUsci5hdWdtZW50Q2xhc3M9ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzLHI9ZnVuY3Rpb24oKXt9O3IucHJvdG90eXBlPW4ucHJvdG90eXBlO3ZhciBhPW5ldyByO28oYSxlLnByb3RvdHlwZSksZS5wcm90b3R5cGU9YSxlLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1lLGUuSW50ZXJmYWNlPW8oe30sbi5JbnRlcmZhY2UsdCksZS5hdWdtZW50Q2xhc3M9bi5hdWdtZW50Q2xhc3MsaS5hZGRQb29saW5nVG8oZSxpLmZvdXJBcmd1bWVudFBvb2xlcil9LGkuYWRkUG9vbGluZ1RvKHIsaS5mb3VyQXJndW1lbnRQb29sZXIpLHQuZXhwb3J0cz1yfSx7MTI5OjEyOSwxNDI6MTQyLDE0MzoxNDMsMjQ6MjR9XSw4MTpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSx0LG4scil7cmV0dXJuIG8uY2FsbCh0aGlzLGUsdCxuLHIpfXZhciBvPWUoODcpLGk9e3JlbGF0ZWRUYXJnZXQ6bnVsbH07by5hdWdtZW50Q2xhc3MocixpKSx0LmV4cG9ydHM9cn0sezg3Ojg3fV0sODI6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUsdCxuLHIpe3JldHVybiBvLmNhbGwodGhpcyxlLHQsbixyKX12YXIgbz1lKDgwKSxpPXtkYXRhOm51bGx9O28uYXVnbWVudENsYXNzKHIsaSksdC5leHBvcnRzPXJ9LHs4MDo4MH1dLDgzOltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlLHQsbixyKXtyZXR1cm4gby5jYWxsKHRoaXMsZSx0LG4scil9dmFyIG89ZSg4NyksaT1lKDk5KSxhPWUoMTAwKSxzPWUoMTAxKSx1PXtrZXk6YSxsb2NhdGlvbjpudWxsLGN0cmxLZXk6bnVsbCxzaGlmdEtleTpudWxsLGFsdEtleTpudWxsLG1ldGFLZXk6bnVsbCxyZXBlYXQ6bnVsbCxsb2NhbGU6bnVsbCxnZXRNb2RpZmllclN0YXRlOnMsY2hhckNvZGU6ZnVuY3Rpb24oZSl7cmV0dXJuXCJrZXlwcmVzc1wiPT09ZS50eXBlP2koZSk6MH0sa2V5Q29kZTpmdW5jdGlvbihlKXtyZXR1cm5cImtleWRvd25cIj09PWUudHlwZXx8XCJrZXl1cFwiPT09ZS50eXBlP2Uua2V5Q29kZTowfSx3aGljaDpmdW5jdGlvbihlKXtyZXR1cm5cImtleXByZXNzXCI9PT1lLnR5cGU/aShlKTpcImtleWRvd25cIj09PWUudHlwZXx8XCJrZXl1cFwiPT09ZS50eXBlP2Uua2V5Q29kZTowfX07by5hdWdtZW50Q2xhc3Mocix1KSx0LmV4cG9ydHM9cn0sezEwMDoxMDAsMTAxOjEwMSw4Nzo4Nyw5OTo5OX1dLDg0OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlLHQsbixyKXtyZXR1cm4gby5jYWxsKHRoaXMsZSx0LG4scil9dmFyIG89ZSg4NyksaT1lKDkwKSxhPWUoMTAxKSxzPXtzY3JlZW5YOm51bGwsc2NyZWVuWTpudWxsLGNsaWVudFg6bnVsbCxjbGllbnRZOm51bGwsY3RybEtleTpudWxsLHNoaWZ0S2V5Om51bGwsYWx0S2V5Om51bGwsbWV0YUtleTpudWxsLGdldE1vZGlmaWVyU3RhdGU6YSxidXR0b246ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5idXR0b247cmV0dXJuXCJ3aGljaFwiaW4gZT90OjI9PT10PzI6ND09PXQ/MTowfSxidXR0b25zOm51bGwscmVsYXRlZFRhcmdldDpmdW5jdGlvbihlKXtyZXR1cm4gZS5yZWxhdGVkVGFyZ2V0fHwoZS5mcm9tRWxlbWVudD09PWUuc3JjRWxlbWVudD9lLnRvRWxlbWVudDplLmZyb21FbGVtZW50KX0scGFnZVg6ZnVuY3Rpb24oZSl7cmV0dXJuXCJwYWdlWFwiaW4gZT9lLnBhZ2VYOmUuY2xpZW50WCtpLmN1cnJlbnRTY3JvbGxMZWZ0fSxwYWdlWTpmdW5jdGlvbihlKXtyZXR1cm5cInBhZ2VZXCJpbiBlP2UucGFnZVk6ZS5jbGllbnRZK2kuY3VycmVudFNjcm9sbFRvcH19O28uYXVnbWVudENsYXNzKHIscyksdC5leHBvcnRzPXJ9LHsxMDE6MTAxLDg3Ojg3LDkwOjkwfV0sODU6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUsdCxuLHIpe3JldHVybiBvLmNhbGwodGhpcyxlLHQsbixyKX12YXIgbz1lKDg3KSxpPWUoMTAxKSxhPXt0b3VjaGVzOm51bGwsdGFyZ2V0VG91Y2hlczpudWxsLGNoYW5nZWRUb3VjaGVzOm51bGwsYWx0S2V5Om51bGwsbWV0YUtleTpudWxsLGN0cmxLZXk6bnVsbCxzaGlmdEtleTpudWxsLGdldE1vZGlmaWVyU3RhdGU6aX07by5hdWdtZW50Q2xhc3MocixhKSx0LmV4cG9ydHM9cn0sezEwMToxMDEsODc6ODd9XSw4NjpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSx0LG4scil7cmV0dXJuIG8uY2FsbCh0aGlzLGUsdCxuLHIpfXZhciBvPWUoODApLGk9e3Byb3BlcnR5TmFtZTpudWxsLGVsYXBzZWRUaW1lOm51bGwscHNldWRvRWxlbWVudDpudWxsfTtvLmF1Z21lbnRDbGFzcyhyLGkpLHQuZXhwb3J0cz1yfSx7ODA6ODB9XSw4NzpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSx0LG4scil7cmV0dXJuIG8uY2FsbCh0aGlzLGUsdCxuLHIpfXZhciBvPWUoODApLGk9ZSgxMDIpLGE9e3ZpZXc6ZnVuY3Rpb24oZSl7aWYoZS52aWV3KXJldHVybiBlLnZpZXc7dmFyIHQ9aShlKTtpZih0LndpbmRvdz09PXQpcmV0dXJuIHQ7dmFyIG49dC5vd25lckRvY3VtZW50O3JldHVybiBuP24uZGVmYXVsdFZpZXd8fG4ucGFyZW50V2luZG93OndpbmRvd30sZGV0YWlsOmZ1bmN0aW9uKGUpe3JldHVybiBlLmRldGFpbHx8MH19O28uYXVnbWVudENsYXNzKHIsYSksdC5leHBvcnRzPXJ9LHsxMDI6MTAyLDgwOjgwfV0sODg6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUsdCxuLHIpe3JldHVybiBvLmNhbGwodGhpcyxlLHQsbixyKX12YXIgbz1lKDg0KSxpPXtkZWx0YVg6ZnVuY3Rpb24oZSl7cmV0dXJuXCJkZWx0YVhcImluIGU/ZS5kZWx0YVg6XCJ3aGVlbERlbHRhWFwiaW4gZT8tZS53aGVlbERlbHRhWDowfSxkZWx0YVk6ZnVuY3Rpb24oZSl7cmV0dXJuXCJkZWx0YVlcImluIGU/ZS5kZWx0YVk6XCJ3aGVlbERlbHRhWVwiaW4gZT8tZS53aGVlbERlbHRhWTpcIndoZWVsRGVsdGFcImluIGU/LWUud2hlZWxEZWx0YTowfSxkZWx0YVo6bnVsbCxkZWx0YU1vZGU6bnVsbH07by5hdWdtZW50Q2xhc3MocixpKSx0LmV4cG9ydHM9cn0sezg0Ojg0fV0sODk6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1lKDExMiksbz0oZSgxMzcpLHt9KSxpPXtyZWluaXRpYWxpemVUcmFuc2FjdGlvbjpmdW5jdGlvbigpe3RoaXMudHJhbnNhY3Rpb25XcmFwcGVycz10aGlzLmdldFRyYW5zYWN0aW9uV3JhcHBlcnMoKSx0aGlzLndyYXBwZXJJbml0RGF0YT90aGlzLndyYXBwZXJJbml0RGF0YS5sZW5ndGg9MDp0aGlzLndyYXBwZXJJbml0RGF0YT1bXSx0aGlzLl9pc0luVHJhbnNhY3Rpb249ITF9LF9pc0luVHJhbnNhY3Rpb246ITEsZ2V0VHJhbnNhY3Rpb25XcmFwcGVyczpudWxsLGlzSW5UcmFuc2FjdGlvbjpmdW5jdGlvbigpe3JldHVybiEhdGhpcy5faXNJblRyYW5zYWN0aW9ufSxwZXJmb3JtOmZ1bmN0aW9uKGUsdCxuLG8saSxhLHMsdSl7dGhpcy5pc0luVHJhbnNhY3Rpb24oKSYmcihcIjI3XCIpO3ZhciBsLGM7dHJ5e3RoaXMuX2lzSW5UcmFuc2FjdGlvbj0hMCxsPSEwLHRoaXMuaW5pdGlhbGl6ZUFsbCgwKSxjPWUuY2FsbCh0LG4sbyxpLGEscyx1KSxsPSExfWZpbmFsbHl7dHJ5e2lmKGwpdHJ5e3RoaXMuY2xvc2VBbGwoMCl9Y2F0Y2goZSl7fWVsc2UgdGhpcy5jbG9zZUFsbCgwKX1maW5hbGx5e3RoaXMuX2lzSW5UcmFuc2FjdGlvbj0hMX19cmV0dXJuIGN9LGluaXRpYWxpemVBbGw6ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PXRoaXMudHJhbnNhY3Rpb25XcmFwcGVycyxuPWU7bjx0Lmxlbmd0aDtuKyspe3ZhciByPXRbbl07dHJ5e3RoaXMud3JhcHBlckluaXREYXRhW25dPW8sdGhpcy53cmFwcGVySW5pdERhdGFbbl09ci5pbml0aWFsaXplP3IuaW5pdGlhbGl6ZS5jYWxsKHRoaXMpOm51bGx9ZmluYWxseXtpZih0aGlzLndyYXBwZXJJbml0RGF0YVtuXT09PW8pdHJ5e3RoaXMuaW5pdGlhbGl6ZUFsbChuKzEpfWNhdGNoKGUpe319fX0sY2xvc2VBbGw6ZnVuY3Rpb24oZSl7dGhpcy5pc0luVHJhbnNhY3Rpb24oKXx8cihcIjI4XCIpO2Zvcih2YXIgdD10aGlzLnRyYW5zYWN0aW9uV3JhcHBlcnMsbj1lO248dC5sZW5ndGg7bisrKXt2YXIgaSxhPXRbbl0scz10aGlzLndyYXBwZXJJbml0RGF0YVtuXTt0cnl7aT0hMCxzIT09byYmYS5jbG9zZSYmYS5jbG9zZS5jYWxsKHRoaXMscyksaT0hMX1maW5hbGx5e2lmKGkpdHJ5e3RoaXMuY2xvc2VBbGwobisxKX1jYXRjaChlKXt9fX10aGlzLndyYXBwZXJJbml0RGF0YS5sZW5ndGg9MH19O3QuZXhwb3J0cz1pfSx7MTEyOjExMiwxMzc6MTM3fV0sOTA6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj17Y3VycmVudFNjcm9sbExlZnQ6MCxjdXJyZW50U2Nyb2xsVG9wOjAscmVmcmVzaFNjcm9sbFZhbHVlczpmdW5jdGlvbihlKXtyLmN1cnJlbnRTY3JvbGxMZWZ0PWUueCxyLmN1cnJlbnRTY3JvbGxUb3A9ZS55fX07dC5leHBvcnRzPXJ9LHt9XSw5MTpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSx0KXtyZXR1cm4gbnVsbD09dCYmbyhcIjMwXCIpLG51bGw9PWU/dDpBcnJheS5pc0FycmF5KGUpP0FycmF5LmlzQXJyYXkodCk/KGUucHVzaC5hcHBseShlLHQpLGUpOihlLnB1c2godCksZSk6QXJyYXkuaXNBcnJheSh0KT9bZV0uY29uY2F0KHQpOltlLHRdfXZhciBvPWUoMTEyKTtlKDEzNyk7dC5leHBvcnRzPXJ9LHsxMTI6MTEyLDEzNzoxMzd9XSw5MjpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7Zm9yKHZhciB0PTEsbj0wLHI9MCxpPWUubGVuZ3RoLGE9LTQmaTtyPGE7KXtmb3IodmFyIHM9TWF0aC5taW4ocis0MDk2LGEpO3I8cztyKz00KW4rPSh0Kz1lLmNoYXJDb2RlQXQocikpKyh0Kz1lLmNoYXJDb2RlQXQocisxKSkrKHQrPWUuY2hhckNvZGVBdChyKzIpKSsodCs9ZS5jaGFyQ29kZUF0KHIrMykpO3QlPW8sbiU9b31mb3IoO3I8aTtyKyspbis9dCs9ZS5jaGFyQ29kZUF0KHIpO3JldHVybiB0JT1vLG4lPW8sdHxuPDwxNn12YXIgbz02NTUyMTt0LmV4cG9ydHM9cn0se31dLDkzOltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9ZnVuY3Rpb24oZSl7cmV0dXJuXCJ1bmRlZmluZWRcIiE9dHlwZW9mIE1TQXBwJiZNU0FwcC5leGVjVW5zYWZlTG9jYWxGdW5jdGlvbj9mdW5jdGlvbih0LG4scixvKXtNU0FwcC5leGVjVW5zYWZlTG9jYWxGdW5jdGlvbihmdW5jdGlvbigpe3JldHVybiBlKHQsbixyLG8pfSl9OmV9O3QuZXhwb3J0cz1yfSx7fV0sOTQ6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUsdCxuKXtyZXR1cm4gbnVsbD09dHx8XCJib29sZWFuXCI9PXR5cGVvZiB0fHxcIlwiPT09dD9cIlwiOmlzTmFOKHQpfHwwPT09dHx8aS5oYXNPd25Qcm9wZXJ0eShlKSYmaVtlXT9cIlwiK3Q6KFwic3RyaW5nXCI9PXR5cGVvZiB0JiYodD10LnRyaW0oKSksdCtcInB4XCIpfXZhciBvPWUoNCksaT0oZSgxNDIpLG8uaXNVbml0bGVzc051bWJlcik7dC5leHBvcnRzPXJ9LHsxNDI6MTQyLDQ6NH1dLDk1OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXt2YXIgdD1cIlwiK2Usbj1pLmV4ZWModCk7aWYoIW4pcmV0dXJuIHQ7dmFyIHIsbz1cIlwiLGE9MCxzPTA7Zm9yKGE9bi5pbmRleDthPHQubGVuZ3RoO2ErKyl7c3dpdGNoKHQuY2hhckNvZGVBdChhKSl7Y2FzZSAzNDpyPVwiJnF1b3Q7XCI7YnJlYWs7Y2FzZSAzODpyPVwiJmFtcDtcIjticmVhaztjYXNlIDM5OnI9XCImI3gyNztcIjticmVhaztjYXNlIDYwOnI9XCImbHQ7XCI7YnJlYWs7Y2FzZSA2MjpyPVwiJmd0O1wiO2JyZWFrO2RlZmF1bHQ6Y29udGludWV9cyE9PWEmJihvKz10LnN1YnN0cmluZyhzLGEpKSxzPWErMSxvKz1yfXJldHVybiBzIT09YT9vK3Quc3Vic3RyaW5nKHMsYSk6b31mdW5jdGlvbiBvKGUpe3JldHVyblwiYm9vbGVhblwiPT10eXBlb2YgZXx8XCJudW1iZXJcIj09dHlwZW9mIGU/XCJcIitlOnIoZSl9dmFyIGk9L1tcIicmPD5dLzt0LmV4cG9ydHM9b30se31dLDk2OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtpZihudWxsPT1lKXJldHVybiBudWxsO2lmKDE9PT1lLm5vZGVUeXBlKXJldHVybiBlO3ZhciB0PWEuZ2V0KGUpO2lmKHQpcmV0dXJuIHQ9cyh0KSx0P2kuZ2V0Tm9kZUZyb21JbnN0YW5jZSh0KTpudWxsO1wiZnVuY3Rpb25cIj09dHlwZW9mIGUucmVuZGVyP28oXCI0NFwiKTpvKFwiNDVcIixPYmplY3Qua2V5cyhlKSl9dmFyIG89ZSgxMTIpLGk9KGUoMTE5KSxlKDMzKSksYT1lKDU3KSxzPWUoMTAzKTtlKDEzNyksZSgxNDIpO3QuZXhwb3J0cz1yfSx7MTAzOjEwMywxMTI6MTEyLDExOToxMTksMTM3OjEzNywxNDI6MTQyLDMzOjMzLDU3OjU3fV0sOTc6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24obil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlLHQsbixyKXtpZihlJiZcIm9iamVjdFwiPT10eXBlb2YgZSl7dmFyIG89ZTt2b2lkIDA9PT1vW25dJiZudWxsIT10JiYob1tuXT10KX19ZnVuY3Rpb24gbyhlLHQpe2lmKG51bGw9PWUpcmV0dXJuIGU7dmFyIG49e307cmV0dXJuIGkoZSxyLG4pLG59dmFyIGk9KGUoMjIpLGUoMTE3KSk7ZSgxNDIpO3ZvaWQgMCE9PW4mJm4uZW52LHQuZXhwb3J0cz1vfSkuY2FsbCh0aGlzLHZvaWQgMCl9LHsxMTc6MTE3LDE0MjoxNDIsMjI6MjJ9XSw5ODpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSx0LG4pe0FycmF5LmlzQXJyYXkoZSk/ZS5mb3JFYWNoKHQsbik6ZSYmdC5jYWxsKG4sZSl9dC5leHBvcnRzPXJ9LHt9XSw5OTpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7dmFyIHQsbj1lLmtleUNvZGU7cmV0dXJuXCJjaGFyQ29kZVwiaW4gZT8wPT09KHQ9ZS5jaGFyQ29kZSkmJjEzPT09biYmKHQ9MTMpOnQ9bix0Pj0zMnx8MTM9PT10P3Q6MH10LmV4cG9ydHM9cn0se31dLDEwMDpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7aWYoZS5rZXkpe3ZhciB0PWlbZS5rZXldfHxlLmtleTtpZihcIlVuaWRlbnRpZmllZFwiIT09dClyZXR1cm4gdH1pZihcImtleXByZXNzXCI9PT1lLnR5cGUpe3ZhciBuPW8oZSk7cmV0dXJuIDEzPT09bj9cIkVudGVyXCI6U3RyaW5nLmZyb21DaGFyQ29kZShuKX1yZXR1cm5cImtleWRvd25cIj09PWUudHlwZXx8XCJrZXl1cFwiPT09ZS50eXBlP2FbZS5rZXlDb2RlXXx8XCJVbmlkZW50aWZpZWRcIjpcIlwifXZhciBvPWUoOTkpLGk9e0VzYzpcIkVzY2FwZVwiLFNwYWNlYmFyOlwiIFwiLExlZnQ6XCJBcnJvd0xlZnRcIixVcDpcIkFycm93VXBcIixSaWdodDpcIkFycm93UmlnaHRcIixEb3duOlwiQXJyb3dEb3duXCIsRGVsOlwiRGVsZXRlXCIsV2luOlwiT1NcIixNZW51OlwiQ29udGV4dE1lbnVcIixBcHBzOlwiQ29udGV4dE1lbnVcIixTY3JvbGw6XCJTY3JvbGxMb2NrXCIsTW96UHJpbnRhYmxlS2V5OlwiVW5pZGVudGlmaWVkXCJ9LGE9ezg6XCJCYWNrc3BhY2VcIiw5OlwiVGFiXCIsMTI6XCJDbGVhclwiLDEzOlwiRW50ZXJcIiwxNjpcIlNoaWZ0XCIsMTc6XCJDb250cm9sXCIsMTg6XCJBbHRcIiwxOTpcIlBhdXNlXCIsMjA6XCJDYXBzTG9ja1wiLDI3OlwiRXNjYXBlXCIsMzI6XCIgXCIsMzM6XCJQYWdlVXBcIiwzNDpcIlBhZ2VEb3duXCIsMzU6XCJFbmRcIiwzNjpcIkhvbWVcIiwzNzpcIkFycm93TGVmdFwiLDM4OlwiQXJyb3dVcFwiLDM5OlwiQXJyb3dSaWdodFwiLDQwOlwiQXJyb3dEb3duXCIsNDU6XCJJbnNlcnRcIiw0NjpcIkRlbGV0ZVwiLDExMjpcIkYxXCIsMTEzOlwiRjJcIiwxMTQ6XCJGM1wiLDExNTpcIkY0XCIsMTE2OlwiRjVcIiwxMTc6XCJGNlwiLDExODpcIkY3XCIsMTE5OlwiRjhcIiwxMjA6XCJGOVwiLDEyMTpcIkYxMFwiLDEyMjpcIkYxMVwiLDEyMzpcIkYxMlwiLDE0NDpcIk51bUxvY2tcIiwxNDU6XCJTY3JvbGxMb2NrXCIsMjI0OlwiTWV0YVwifTt0LmV4cG9ydHM9cn0sezk5Ojk5fV0sMTAxOltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXt2YXIgdD10aGlzLG49dC5uYXRpdmVFdmVudDtpZihuLmdldE1vZGlmaWVyU3RhdGUpcmV0dXJuIG4uZ2V0TW9kaWZpZXJTdGF0ZShlKTt2YXIgcj1pW2VdO3JldHVybiEhciYmISFuW3JdfWZ1bmN0aW9uIG8oZSl7cmV0dXJuIHJ9dmFyIGk9e0FsdDpcImFsdEtleVwiLENvbnRyb2w6XCJjdHJsS2V5XCIsTWV0YTpcIm1ldGFLZXlcIixTaGlmdDpcInNoaWZ0S2V5XCJ9O3QuZXhwb3J0cz1vfSx7fV0sMTAyOltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXt2YXIgdD1lLnRhcmdldHx8ZS5zcmNFbGVtZW50fHx3aW5kb3c7cmV0dXJuIHQuY29ycmVzcG9uZGluZ1VzZUVsZW1lbnQmJih0PXQuY29ycmVzcG9uZGluZ1VzZUVsZW1lbnQpLDM9PT10Lm5vZGVUeXBlP3QucGFyZW50Tm9kZTp0fXQuZXhwb3J0cz1yfSx7fV0sMTAzOltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtmb3IodmFyIHQ7KHQ9ZS5fcmVuZGVyZWROb2RlVHlwZSk9PT1vLkNPTVBPU0lURTspZT1lLl9yZW5kZXJlZENvbXBvbmVudDtyZXR1cm4gdD09PW8uSE9TVD9lLl9yZW5kZXJlZENvbXBvbmVudDp0PT09by5FTVBUWT9udWxsOnZvaWQgMH12YXIgbz1lKDYyKTt0LmV4cG9ydHM9cn0sezYyOjYyfV0sMTA0OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXt2YXIgdD1lJiYobyYmZVtvXXx8ZVtpXSk7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgdClyZXR1cm4gdH12YXIgbz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlN5bWJvbC5pdGVyYXRvcixpPVwiQEBpdGVyYXRvclwiO3QuZXhwb3J0cz1yfSx7fV0sMTA1OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtmb3IoO2UmJmUuZmlyc3RDaGlsZDspZT1lLmZpcnN0Q2hpbGQ7cmV0dXJuIGV9ZnVuY3Rpb24gbyhlKXtmb3IoO2U7KXtpZihlLm5leHRTaWJsaW5nKXJldHVybiBlLm5leHRTaWJsaW5nO2U9ZS5wYXJlbnROb2RlfX1mdW5jdGlvbiBpKGUsdCl7Zm9yKHZhciBuPXIoZSksaT0wLGE9MDtuOyl7aWYoMz09PW4ubm9kZVR5cGUpe2lmKGE9aStuLnRleHRDb250ZW50Lmxlbmd0aCxpPD10JiZhPj10KXJldHVybntub2RlOm4sb2Zmc2V0OnQtaX07aT1hfW49cihvKG4pKX19dC5leHBvcnRzPWl9LHt9XSwxMDY6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKCl7cmV0dXJuIWkmJm8uY2FuVXNlRE9NJiYoaT1cInRleHRDb250ZW50XCJpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ/XCJ0ZXh0Q29udGVudFwiOlwiaW5uZXJUZXh0XCIpLGl9dmFyIG89ZSgxMjMpLGk9bnVsbDt0LmV4cG9ydHM9cn0sezEyMzoxMjN9XSwxMDc6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUsdCl7dmFyIG49e307cmV0dXJuIG5bZS50b0xvd2VyQ2FzZSgpXT10LnRvTG93ZXJDYXNlKCksbltcIldlYmtpdFwiK2VdPVwid2Via2l0XCIrdCxuW1wiTW96XCIrZV09XCJtb3pcIit0LG5bXCJtc1wiK2VdPVwiTVNcIit0LG5bXCJPXCIrZV09XCJvXCIrdC50b0xvd2VyQ2FzZSgpLG59ZnVuY3Rpb24gbyhlKXtpZihzW2VdKXJldHVybiBzW2VdO2lmKCFhW2VdKXJldHVybiBlO3ZhciB0PWFbZV07Zm9yKHZhciBuIGluIHQpaWYodC5oYXNPd25Qcm9wZXJ0eShuKSYmbiBpbiB1KXJldHVybiBzW2VdPXRbbl07cmV0dXJuXCJcIn12YXIgaT1lKDEyMyksYT17YW5pbWF0aW9uZW5kOnIoXCJBbmltYXRpb25cIixcIkFuaW1hdGlvbkVuZFwiKSxhbmltYXRpb25pdGVyYXRpb246cihcIkFuaW1hdGlvblwiLFwiQW5pbWF0aW9uSXRlcmF0aW9uXCIpLGFuaW1hdGlvbnN0YXJ0OnIoXCJBbmltYXRpb25cIixcIkFuaW1hdGlvblN0YXJ0XCIpLHRyYW5zaXRpb25lbmQ6cihcIlRyYW5zaXRpb25cIixcIlRyYW5zaXRpb25FbmRcIil9LHM9e30sdT17fTtpLmNhblVzZURPTSYmKHU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKS5zdHlsZSxcIkFuaW1hdGlvbkV2ZW50XCJpbiB3aW5kb3d8fChkZWxldGUgYS5hbmltYXRpb25lbmQuYW5pbWF0aW9uLGRlbGV0ZSBhLmFuaW1hdGlvbml0ZXJhdGlvbi5hbmltYXRpb24sZGVsZXRlIGEuYW5pbWF0aW9uc3RhcnQuYW5pbWF0aW9uKSxcIlRyYW5zaXRpb25FdmVudFwiaW4gd2luZG93fHxkZWxldGUgYS50cmFuc2l0aW9uZW5kLnRyYW5zaXRpb24pLHQuZXhwb3J0cz1vfSx7MTIzOjEyM31dLDEwODpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7aWYoZSl7dmFyIHQ9ZS5nZXROYW1lKCk7aWYodClyZXR1cm5cIiBDaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiBgXCIrdCtcImAuXCJ9cmV0dXJuXCJcIn1mdW5jdGlvbiBvKGUpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGUmJnZvaWQgMCE9PWUucHJvdG90eXBlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLnByb3RvdHlwZS5tb3VudENvbXBvbmVudCYmXCJmdW5jdGlvblwiPT10eXBlb2YgZS5wcm90b3R5cGUucmVjZWl2ZUNvbXBvbmVudH1mdW5jdGlvbiBpKGUsdCl7dmFyIG47aWYobnVsbD09PWV8fCExPT09ZSluPWwuY3JlYXRlKGkpO2Vsc2UgaWYoXCJvYmplY3RcIj09dHlwZW9mIGUpe3ZhciBzPWUsdT1zLnR5cGU7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgdSYmXCJzdHJpbmdcIiE9dHlwZW9mIHUpe3ZhciBkPVwiXCI7ZCs9cihzLl9vd25lciksYShcIjEzMFwiLG51bGw9PXU/dTp0eXBlb2YgdSxkKX1cInN0cmluZ1wiPT10eXBlb2Ygcy50eXBlP249Yy5jcmVhdGVJbnRlcm5hbENvbXBvbmVudChzKTpvKHMudHlwZSk/KG49bmV3IHMudHlwZShzKSxuLmdldEhvc3ROb2RlfHwobi5nZXRIb3N0Tm9kZT1uLmdldE5hdGl2ZU5vZGUpKTpuPW5ldyBwKHMpfWVsc2VcInN0cmluZ1wiPT10eXBlb2YgZXx8XCJudW1iZXJcIj09dHlwZW9mIGU/bj1jLmNyZWF0ZUluc3RhbmNlRm9yVGV4dChlKTphKFwiMTMxXCIsdHlwZW9mIGUpO3JldHVybiBuLl9tb3VudEluZGV4PTAsbi5fbW91bnRJbWFnZT1udWxsLG59dmFyIGE9ZSgxMTIpLHM9ZSgxNDMpLHU9ZSgyOSksbD1lKDQ5KSxjPWUoNTQpLHA9KGUoMTIxKSxlKDEzNyksZSgxNDIpLGZ1bmN0aW9uKGUpe3RoaXMuY29uc3RydWN0KGUpfSk7cyhwLnByb3RvdHlwZSx1LHtfaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudDppfSksdC5leHBvcnRzPWl9LHsxMTI6MTEyLDEyMToxMjEsMTM3OjEzNywxNDI6MTQyLDE0MzoxNDMsMjk6MjksNDk6NDksNTQ6NTR9XSwxMDk6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUsdCl7aWYoIWkuY2FuVXNlRE9NfHx0JiYhKFwiYWRkRXZlbnRMaXN0ZW5lclwiaW4gZG9jdW1lbnQpKXJldHVybiExO3ZhciBuPVwib25cIitlLHI9biBpbiBkb2N1bWVudDtpZighcil7dmFyIGE9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTthLnNldEF0dHJpYnV0ZShuLFwicmV0dXJuO1wiKSxyPVwiZnVuY3Rpb25cIj09dHlwZW9mIGFbbl19cmV0dXJuIXImJm8mJlwid2hlZWxcIj09PWUmJihyPWRvY3VtZW50LmltcGxlbWVudGF0aW9uLmhhc0ZlYXR1cmUoXCJFdmVudHMud2hlZWxcIixcIjMuMFwiKSkscn12YXIgbyxpPWUoMTIzKTtpLmNhblVzZURPTSYmKG89ZG9jdW1lbnQuaW1wbGVtZW50YXRpb24mJmRvY3VtZW50LmltcGxlbWVudGF0aW9uLmhhc0ZlYXR1cmUmJiEwIT09ZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uaGFzRmVhdHVyZShcIlwiLFwiXCIpKSx0LmV4cG9ydHM9cn0sezEyMzoxMjN9XSwxMTA6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe3ZhciB0PWUmJmUubm9kZU5hbWUmJmUubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtyZXR1cm5cImlucHV0XCI9PT10PyEhb1tlLnR5cGVdOlwidGV4dGFyZWFcIj09PXR9dmFyIG89e2NvbG9yOiEwLGRhdGU6ITAsZGF0ZXRpbWU6ITAsXCJkYXRldGltZS1sb2NhbFwiOiEwLGVtYWlsOiEwLG1vbnRoOiEwLG51bWJlcjohMCxwYXNzd29yZDohMCxyYW5nZTohMCxzZWFyY2g6ITAsdGVsOiEwLHRleHQ6ITAsdGltZTohMCx1cmw6ITAsd2VlazohMH07dC5leHBvcnRzPXJ9LHt9XSwxMTE6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe3JldHVybidcIicrbyhlKSsnXCInfXZhciBvPWUoOTUpO3QuZXhwb3J0cz1yfSx7OTU6OTV9XSwxMTI6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe2Zvcih2YXIgdD1hcmd1bWVudHMubGVuZ3RoLTEsbj1cIk1pbmlmaWVkIFJlYWN0IGVycm9yICNcIitlK1wiOyB2aXNpdCBodHRwOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvZXJyb3ItZGVjb2Rlci5odG1sP2ludmFyaWFudD1cIitlLHI9MDtyPHQ7cisrKW4rPVwiJmFyZ3NbXT1cIitlbmNvZGVVUklDb21wb25lbnQoYXJndW1lbnRzW3IrMV0pO24rPVwiIGZvciB0aGUgZnVsbCBtZXNzYWdlIG9yIHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCBmb3IgZnVsbCBlcnJvcnMgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy5cIjt2YXIgbz1uZXcgRXJyb3Iobik7dGhyb3cgby5uYW1lPVwiSW52YXJpYW50IFZpb2xhdGlvblwiLG8uZnJhbWVzVG9Qb3A9MSxvfXQuZXhwb3J0cz1yfSx7fV0sMTEzOltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9ZSg2MCk7dC5leHBvcnRzPXIucmVuZGVyU3VidHJlZUludG9Db250YWluZXJ9LHs2MDo2MH1dLDExNDpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3ZhciByLG89ZSgxMjMpLGk9ZSgxMCksYT0vXlsgXFxyXFxuXFx0XFxmXS8scz0vPCghLS18bGlua3xub3NjcmlwdHxtZXRhfHNjcmlwdHxzdHlsZSlbIFxcclxcblxcdFxcZlxcLz5dLyx1PWUoOTMpLGw9dShmdW5jdGlvbihlLHQpe2lmKGUubmFtZXNwYWNlVVJJIT09aS5zdmd8fFwiaW5uZXJIVE1MXCJpbiBlKWUuaW5uZXJIVE1MPXQ7ZWxzZXtyPXJ8fGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksci5pbm5lckhUTUw9XCI8c3ZnPlwiK3QrXCI8L3N2Zz5cIjtmb3IodmFyIG49ci5maXJzdENoaWxkO24uZmlyc3RDaGlsZDspZS5hcHBlbmRDaGlsZChuLmZpcnN0Q2hpbGQpfX0pO2lmKG8uY2FuVXNlRE9NKXt2YXIgYz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2MuaW5uZXJIVE1MPVwiIFwiLFwiXCI9PT1jLmlubmVySFRNTCYmKGw9ZnVuY3Rpb24oZSx0KXtpZihlLnBhcmVudE5vZGUmJmUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoZSxlKSxhLnRlc3QodCl8fFwiPFwiPT09dFswXSYmcy50ZXN0KHQpKXtlLmlubmVySFRNTD1TdHJpbmcuZnJvbUNoYXJDb2RlKDY1Mjc5KSt0O3ZhciBuPWUuZmlyc3RDaGlsZDsxPT09bi5kYXRhLmxlbmd0aD9lLnJlbW92ZUNoaWxkKG4pOm4uZGVsZXRlRGF0YSgwLDEpfWVsc2UgZS5pbm5lckhUTUw9dH0pLGM9bnVsbH10LmV4cG9ydHM9bH0sezEwOjEwLDEyMzoxMjMsOTM6OTN9XSwxMTU6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1lKDEyMyksbz1lKDk1KSxpPWUoMTE0KSxhPWZ1bmN0aW9uKGUsdCl7aWYodCl7dmFyIG49ZS5maXJzdENoaWxkO2lmKG4mJm49PT1lLmxhc3RDaGlsZCYmMz09PW4ubm9kZVR5cGUpcmV0dXJuIHZvaWQobi5ub2RlVmFsdWU9dCl9ZS50ZXh0Q29udGVudD10fTtyLmNhblVzZURPTSYmKFwidGV4dENvbnRlbnRcImluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudHx8KGE9ZnVuY3Rpb24oZSx0KXtpZigzPT09ZS5ub2RlVHlwZSlyZXR1cm4gdm9pZChlLm5vZGVWYWx1ZT10KTtpKGUsbyh0KSl9KSksdC5leHBvcnRzPWF9LHsxMTQ6MTE0LDEyMzoxMjMsOTU6OTV9XSwxMTY6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUsdCl7dmFyIG49bnVsbD09PWV8fCExPT09ZSxyPW51bGw9PT10fHwhMT09PXQ7aWYobnx8cilyZXR1cm4gbj09PXI7dmFyIG89dHlwZW9mIGUsaT10eXBlb2YgdDtyZXR1cm5cInN0cmluZ1wiPT09b3x8XCJudW1iZXJcIj09PW8/XCJzdHJpbmdcIj09PWl8fFwibnVtYmVyXCI9PT1pOlwib2JqZWN0XCI9PT1pJiZlLnR5cGU9PT10LnR5cGUmJmUua2V5PT09dC5rZXl9dC5leHBvcnRzPXJ9LHt9XSwxMTc6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUsdCl7cmV0dXJuIGUmJlwib2JqZWN0XCI9PXR5cGVvZiBlJiZudWxsIT1lLmtleT9sLmVzY2FwZShlLmtleSk6dC50b1N0cmluZygzNil9ZnVuY3Rpb24gbyhlLHQsbixpKXt2YXIgZD10eXBlb2YgZTtpZihcInVuZGVmaW5lZFwiIT09ZCYmXCJib29sZWFuXCIhPT1kfHwoZT1udWxsKSxudWxsPT09ZXx8XCJzdHJpbmdcIj09PWR8fFwibnVtYmVyXCI9PT1kfHxcIm9iamVjdFwiPT09ZCYmZS4kJHR5cGVvZj09PXMpcmV0dXJuIG4oaSxlLFwiXCI9PT10P2MrcihlLDApOnQpLDE7dmFyIGYsaCxtPTAsdj1cIlwiPT09dD9jOnQrcDtpZihBcnJheS5pc0FycmF5KGUpKWZvcih2YXIgZz0wO2c8ZS5sZW5ndGg7ZysrKWY9ZVtnXSxoPXYrcihmLGcpLG0rPW8oZixoLG4saSk7ZWxzZXt2YXIgeT11KGUpO2lmKHkpe3ZhciBfLEM9eS5jYWxsKGUpO2lmKHkhPT1lLmVudHJpZXMpZm9yKHZhciBiPTA7IShfPUMubmV4dCgpKS5kb25lOylmPV8udmFsdWUsaD12K3IoZixiKyspLG0rPW8oZixoLG4saSk7ZWxzZSBmb3IoOyEoXz1DLm5leHQoKSkuZG9uZTspe3ZhciBFPV8udmFsdWU7RSYmKGY9RVsxXSxoPXYrbC5lc2NhcGUoRVswXSkrcCtyKGYsMCksbSs9byhmLGgsbixpKSl9fWVsc2UgaWYoXCJvYmplY3RcIj09PWQpe3ZhciB4PVN0cmluZyhlKTthKFwiMzFcIixcIltvYmplY3QgT2JqZWN0XVwiPT09eD9cIm9iamVjdCB3aXRoIGtleXMge1wiK09iamVjdC5rZXlzKGUpLmpvaW4oXCIsIFwiKStcIn1cIjp4LFwiXCIpfX1yZXR1cm4gbX1mdW5jdGlvbiBpKGUsdCxuKXtyZXR1cm4gbnVsbD09ZT8wOm8oZSxcIlwiLHQsbil9dmFyIGE9ZSgxMTIpLHM9KGUoMTE5KSxlKDQ4KSksdT1lKDEwNCksbD0oZSgxMzcpLGUoMjIpKSxjPShlKDE0MiksXCIuXCIpLHA9XCI6XCI7dC5leHBvcnRzPWl9LHsxMDQ6MTA0LDExMjoxMTIsMTE5OjExOSwxMzc6MTM3LDE0MjoxNDIsMjI6MjIsNDg6NDh9XSwxMTg6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj0oZSgxNDMpLGUoMTI5KSksbz0oZSgxNDIpLHIpO3QuZXhwb3J0cz1vfSx7MTI5OjEyOSwxNDI6MTQyLDE0MzoxNDN9XSwxMTk6W2Z1bmN0aW9uKHQsbixyKXtcInVzZSBzdHJpY3RcIjt2YXIgbz1lLl9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEO24uZXhwb3J0cz1vLlJlYWN0Q3VycmVudE93bmVyfSx7fV0sMTIwOltmdW5jdGlvbih0LG4scil7XCJ1c2Ugc3RyaWN0XCI7bi5leHBvcnRzPWV9LHt9XSwxMjE6W2Z1bmN0aW9uKHQsbixyKXtcInVzZSBzdHJpY3RcIjt2YXIgbz1lLl9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEO24uZXhwb3J0cz1vLmdldE5leHREZWJ1Z0lEfSx7fV0sMTIyOltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9ZSgxMjkpLG89e2xpc3RlbjpmdW5jdGlvbihlLHQsbil7cmV0dXJuIGUuYWRkRXZlbnRMaXN0ZW5lcj8oZS5hZGRFdmVudExpc3RlbmVyKHQsbiwhMSkse3JlbW92ZTpmdW5jdGlvbigpe2UucmVtb3ZlRXZlbnRMaXN0ZW5lcih0LG4sITEpfX0pOmUuYXR0YWNoRXZlbnQ/KGUuYXR0YWNoRXZlbnQoXCJvblwiK3Qsbikse3JlbW92ZTpmdW5jdGlvbigpe2UuZGV0YWNoRXZlbnQoXCJvblwiK3Qsbil9fSk6dm9pZCAwfSxjYXB0dXJlOmZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gZS5hZGRFdmVudExpc3RlbmVyPyhlLmFkZEV2ZW50TGlzdGVuZXIodCxuLCEwKSx7cmVtb3ZlOmZ1bmN0aW9uKCl7ZS5yZW1vdmVFdmVudExpc3RlbmVyKHQsbiwhMCl9fSk6e3JlbW92ZTpyfX0scmVnaXN0ZXJEZWZhdWx0OmZ1bmN0aW9uKCl7fX07dC5leHBvcnRzPW99LHsxMjk6MTI5fV0sMTIzOltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9IShcInVuZGVmaW5lZFwiPT10eXBlb2Ygd2luZG93fHwhd2luZG93LmRvY3VtZW50fHwhd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpLG89e2NhblVzZURPTTpyLGNhblVzZVdvcmtlcnM6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFdvcmtlcixjYW5Vc2VFdmVudExpc3RlbmVyczpyJiYhKCF3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciYmIXdpbmRvdy5hdHRhY2hFdmVudCksY2FuVXNlVmlld3BvcnQ6ciYmISF3aW5kb3cuc2NyZWVuLGlzSW5Xb3JrZXI6IXJ9O3QuZXhwb3J0cz1vfSx7fV0sMTI0OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtyZXR1cm4gZS5yZXBsYWNlKG8sZnVuY3Rpb24oZSx0KXtyZXR1cm4gdC50b1VwcGVyQ2FzZSgpfSl9dmFyIG89Ly0oLikvZzt0LmV4cG9ydHM9cn0se31dLDEyNTpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7cmV0dXJuIG8oZS5yZXBsYWNlKGksXCJtcy1cIikpfXZhciBvPWUoMTI0KSxpPS9eLW1zLS87dC5leHBvcnRzPXJ9LHsxMjQ6MTI0fV0sMTI2OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlLHQpe3JldHVybiEoIWV8fCF0KSYmKGU9PT10fHwhbyhlKSYmKG8odCk/cihlLHQucGFyZW50Tm9kZSk6XCJjb250YWluc1wiaW4gZT9lLmNvbnRhaW5zKHQpOiEhZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiYmISEoMTYmZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbih0KSkpKX12YXIgbz1lKDEzOSk7dC5leHBvcnRzPXJ9LHsxMzk6MTM5fV0sMTI3OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXt2YXIgdD1lLmxlbmd0aDtpZigoQXJyYXkuaXNBcnJheShlKXx8XCJvYmplY3RcIiE9dHlwZW9mIGUmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIGUpJiZhKCExKSxcIm51bWJlclwiIT10eXBlb2YgdCYmYSghMSksMD09PXR8fHQtMSBpbiBlfHxhKCExKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLmNhbGxlZSYmYSghMSksZS5oYXNPd25Qcm9wZXJ0eSl0cnl7cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpfWNhdGNoKGUpe31mb3IodmFyIG49QXJyYXkodCkscj0wO3I8dDtyKyspbltyXT1lW3JdO3JldHVybiBufWZ1bmN0aW9uIG8oZSl7cmV0dXJuISFlJiYoXCJvYmplY3RcIj09dHlwZW9mIGV8fFwiZnVuY3Rpb25cIj09dHlwZW9mIGUpJiZcImxlbmd0aFwiaW4gZSYmIShcInNldEludGVydmFsXCJpbiBlKSYmXCJudW1iZXJcIiE9dHlwZW9mIGUubm9kZVR5cGUmJihBcnJheS5pc0FycmF5KGUpfHxcImNhbGxlZVwiaW4gZXx8XCJpdGVtXCJpbiBlKX1mdW5jdGlvbiBpKGUpe3JldHVybiBvKGUpP0FycmF5LmlzQXJyYXkoZSk/ZS5zbGljZSgpOnIoZSk6W2VdfXZhciBhPWUoMTM3KTt0LmV4cG9ydHM9aX0sezEzNzoxMzd9XSwxMjg6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe3ZhciB0PWUubWF0Y2goYyk7cmV0dXJuIHQmJnRbMV0udG9Mb3dlckNhc2UoKX1mdW5jdGlvbiBvKGUsdCl7dmFyIG49bDtsfHx1KCExKTt2YXIgbz1yKGUpLGk9byYmcyhvKTtpZihpKXtuLmlubmVySFRNTD1pWzFdK2UraVsyXTtmb3IodmFyIGM9aVswXTtjLS07KW49bi5sYXN0Q2hpbGR9ZWxzZSBuLmlubmVySFRNTD1lO3ZhciBwPW4uZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7cC5sZW5ndGgmJih0fHx1KCExKSxhKHApLmZvckVhY2godCkpO2Zvcih2YXIgZD1BcnJheS5mcm9tKG4uY2hpbGROb2Rlcyk7bi5sYXN0Q2hpbGQ7KW4ucmVtb3ZlQ2hpbGQobi5sYXN0Q2hpbGQpO3JldHVybiBkfXZhciBpPWUoMTIzKSxhPWUoMTI3KSxzPWUoMTMzKSx1PWUoMTM3KSxsPWkuY2FuVXNlRE9NP2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik6bnVsbCxjPS9eXFxzKjwoXFx3KykvO3QuZXhwb3J0cz1vfSx7MTIzOjEyMywxMjc6MTI3LDEzMzoxMzMsMTM3OjEzN31dLDEyOTpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGV9fXZhciBvPWZ1bmN0aW9uKCl7fTtvLnRoYXRSZXR1cm5zPXIsby50aGF0UmV0dXJuc0ZhbHNlPXIoITEpLG8udGhhdFJldHVybnNUcnVlPXIoITApLG8udGhhdFJldHVybnNOdWxsPXIobnVsbCksby50aGF0UmV0dXJuc1RoaXM9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc30sby50aGF0UmV0dXJuc0FyZ3VtZW50PWZ1bmN0aW9uKGUpe3JldHVybiBlfSx0LmV4cG9ydHM9b30se31dLDEzMDpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3ZhciByPXt9O3QuZXhwb3J0cz1yfSx7fV0sMTMxOltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXt0cnl7ZS5mb2N1cygpfWNhdGNoKGUpe319dC5leHBvcnRzPXJ9LHt9XSwxMzI6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe2lmKHZvaWQgMD09PShlPWV8fChcInVuZGVmaW5lZFwiIT10eXBlb2YgZG9jdW1lbnQ/ZG9jdW1lbnQ6dm9pZCAwKSkpcmV0dXJuIG51bGw7dHJ5e3JldHVybiBlLmFjdGl2ZUVsZW1lbnR8fGUuYm9keX1jYXRjaCh0KXtyZXR1cm4gZS5ib2R5fX10LmV4cG9ydHM9cn0se31dLDEzMzpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7cmV0dXJuIGF8fGkoITEpLGQuaGFzT3duUHJvcGVydHkoZSl8fChlPVwiKlwiKSxzLmhhc093blByb3BlcnR5KGUpfHwoYS5pbm5lckhUTUw9XCIqXCI9PT1lP1wiPGxpbmsgLz5cIjpcIjxcIitlK1wiPjwvXCIrZStcIj5cIixzW2VdPSFhLmZpcnN0Q2hpbGQpLHNbZV0/ZFtlXTpudWxsfXZhciBvPWUoMTIzKSxpPWUoMTM3KSxhPW8uY2FuVXNlRE9NP2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik6bnVsbCxzPXt9LHU9WzEsJzxzZWxlY3QgbXVsdGlwbGU9XCJ0cnVlXCI+JyxcIjwvc2VsZWN0PlwiXSxsPVsxLFwiPHRhYmxlPlwiLFwiPC90YWJsZT5cIl0sYz1bMyxcIjx0YWJsZT48dGJvZHk+PHRyPlwiLFwiPC90cj48L3Rib2R5PjwvdGFibGU+XCJdLHA9WzEsJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPicsXCI8L3N2Zz5cIl0sZD17XCIqXCI6WzEsXCI/PGRpdj5cIixcIjwvZGl2PlwiXSxhcmVhOlsxLFwiPG1hcD5cIixcIjwvbWFwPlwiXSxjb2w6WzIsXCI8dGFibGU+PHRib2R5PjwvdGJvZHk+PGNvbGdyb3VwPlwiLFwiPC9jb2xncm91cD48L3RhYmxlPlwiXSxsZWdlbmQ6WzEsXCI8ZmllbGRzZXQ+XCIsXCI8L2ZpZWxkc2V0PlwiXSxwYXJhbTpbMSxcIjxvYmplY3Q+XCIsXCI8L29iamVjdD5cIl0sdHI6WzIsXCI8dGFibGU+PHRib2R5PlwiLFwiPC90Ym9keT48L3RhYmxlPlwiXSxvcHRncm91cDp1LG9wdGlvbjp1LGNhcHRpb246bCxjb2xncm91cDpsLHRib2R5OmwsdGZvb3Q6bCx0aGVhZDpsLHRkOmMsdGg6Y307W1wiY2lyY2xlXCIsXCJjbGlwUGF0aFwiLFwiZGVmc1wiLFwiZWxsaXBzZVwiLFwiZ1wiLFwiaW1hZ2VcIixcImxpbmVcIixcImxpbmVhckdyYWRpZW50XCIsXCJtYXNrXCIsXCJwYXRoXCIsXCJwYXR0ZXJuXCIsXCJwb2x5Z29uXCIsXCJwb2x5bGluZVwiLFwicmFkaWFsR3JhZGllbnRcIixcInJlY3RcIixcInN0b3BcIixcInRleHRcIixcInRzcGFuXCJdLmZvckVhY2goZnVuY3Rpb24oZSl7ZFtlXT1wLHNbZV09ITB9KSx0LmV4cG9ydHM9cn0sezEyMzoxMjMsMTM3OjEzN31dLDEzNDpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7cmV0dXJuIGUuV2luZG93JiZlIGluc3RhbmNlb2YgZS5XaW5kb3c/e3g6ZS5wYWdlWE9mZnNldHx8ZS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCx5OmUucGFnZVlPZmZzZXR8fGUuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcH06e3g6ZS5zY3JvbGxMZWZ0LHk6ZS5zY3JvbGxUb3B9fXQuZXhwb3J0cz1yfSx7fV0sMTM1OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtyZXR1cm4gZS5yZXBsYWNlKG8sXCItJDFcIikudG9Mb3dlckNhc2UoKX12YXIgbz0vKFtBLVpdKS9nO3QuZXhwb3J0cz1yfSx7fV0sMTM2OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtyZXR1cm4gbyhlKS5yZXBsYWNlKGksXCItbXMtXCIpfXZhciBvPWUoMTM1KSxpPS9ebXMtLzt0LmV4cG9ydHM9cn0sezEzNToxMzV9XSwxMzc6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUsdCxuLHIsaSxhLHMsdSl7aWYobyh0KSwhZSl7dmFyIGw7aWYodm9pZCAwPT09dClsPW5ldyBFcnJvcihcIk1pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50IGZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuXCIpO2Vsc2V7dmFyIGM9W24scixpLGEscyx1XSxwPTA7bD1uZXcgRXJyb3IodC5yZXBsYWNlKC8lcy9nLGZ1bmN0aW9uKCl7cmV0dXJuIGNbcCsrXX0pKSxsLm5hbWU9XCJJbnZhcmlhbnQgVmlvbGF0aW9uXCJ9dGhyb3cgbC5mcmFtZXNUb1BvcD0xLGx9fXZhciBvPWZ1bmN0aW9uKGUpe307dC5leHBvcnRzPXJ9LHt9XSwxMzg6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe3ZhciB0PWU/ZS5vd25lckRvY3VtZW50fHxlOmRvY3VtZW50LG49dC5kZWZhdWx0Vmlld3x8d2luZG93O3JldHVybiEoIWV8fCEoXCJmdW5jdGlvblwiPT10eXBlb2Ygbi5Ob2RlP2UgaW5zdGFuY2VvZiBuLk5vZGU6XCJvYmplY3RcIj09dHlwZW9mIGUmJlwibnVtYmVyXCI9PXR5cGVvZiBlLm5vZGVUeXBlJiZcInN0cmluZ1wiPT10eXBlb2YgZS5ub2RlTmFtZSkpfXQuZXhwb3J0cz1yfSx7fV0sMTM5OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtyZXR1cm4gbyhlKSYmMz09ZS5ub2RlVHlwZX12YXIgbz1lKDEzOCk7dC5leHBvcnRzPXJ9LHsxMzg6MTM4fV0sMTQwOltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXt2YXIgdD17fTtyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIHQuaGFzT3duUHJvcGVydHkobil8fCh0W25dPWUuY2FsbCh0aGlzLG4pKSx0W25dfX10LmV4cG9ydHM9cn0se31dLDE0MTpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSx0KXtyZXR1cm4gZT09PXQ/MCE9PWV8fDAhPT10fHwxL2U9PTEvdDplIT09ZSYmdCE9PXR9ZnVuY3Rpb24gbyhlLHQpe2lmKHIoZSx0KSlyZXR1cm4hMDtpZihcIm9iamVjdFwiIT10eXBlb2YgZXx8bnVsbD09PWV8fFwib2JqZWN0XCIhPXR5cGVvZiB0fHxudWxsPT09dClyZXR1cm4hMTt2YXIgbj1PYmplY3Qua2V5cyhlKSxvPU9iamVjdC5rZXlzKHQpO2lmKG4ubGVuZ3RoIT09by5sZW5ndGgpcmV0dXJuITE7Zm9yKHZhciBhPTA7YTxuLmxlbmd0aDthKyspaWYoIWkuY2FsbCh0LG5bYV0pfHwhcihlW25bYV1dLHRbblthXV0pKXJldHVybiExO3JldHVybiEwfXZhciBpPU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7dC5leHBvcnRzPW99LHt9XSwxNDI6W2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1lKDEyOSksbz1yO3QuZXhwb3J0cz1vfSx7MTI5OjEyOX1dLDE0MzpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7aWYobnVsbD09PWV8fHZvaWQgMD09PWUpdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkXCIpO3JldHVybiBPYmplY3QoZSl9dmFyIG89T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyxpPU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksYT1PYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO3QuZXhwb3J0cz1mdW5jdGlvbigpe3RyeXtpZighT2JqZWN0LmFzc2lnbilyZXR1cm4hMTt2YXIgZT1uZXcgU3RyaW5nKFwiYWJjXCIpO2lmKGVbNV09XCJkZVwiLFwiNVwiPT09T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZSlbMF0pcmV0dXJuITE7Zm9yKHZhciB0PXt9LG49MDtuPDEwO24rKyl0W1wiX1wiK1N0cmluZy5mcm9tQ2hhckNvZGUobildPW47aWYoXCIwMTIzNDU2Nzg5XCIhPT1PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0KS5tYXAoZnVuY3Rpb24oZSl7cmV0dXJuIHRbZV19KS5qb2luKFwiXCIpKXJldHVybiExO3ZhciByPXt9O3JldHVyblwiYWJjZGVmZ2hpamtsbW5vcHFyc3RcIi5zcGxpdChcIlwiKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3JbZV09ZX0pLFwiYWJjZGVmZ2hpamtsbW5vcHFyc3RcIj09PU9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30scikpLmpvaW4oXCJcIil9Y2F0Y2goZSl7cmV0dXJuITF9fSgpP09iamVjdC5hc3NpZ246ZnVuY3Rpb24oZSx0KXtmb3IodmFyIG4scyx1PXIoZSksbD0xO2w8YXJndW1lbnRzLmxlbmd0aDtsKyspe249T2JqZWN0KGFyZ3VtZW50c1tsXSk7Zm9yKHZhciBjIGluIG4paS5jYWxsKG4sYykmJih1W2NdPW5bY10pO2lmKG8pe3M9byhuKTtmb3IodmFyIHA9MDtwPHMubGVuZ3RoO3ArKylhLmNhbGwobixzW3BdKSYmKHVbc1twXV09bltzW3BdXSl9fXJldHVybiB1fX0se31dLDE0NDpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSx0LG4scixvKXt9dC5leHBvcnRzPXJ9LHsxMzc6MTM3LDE0MjoxNDIsMTQ3OjE0N31dLDE0NTpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3ZhciByPWUoMTQ2KTt0LmV4cG9ydHM9ZnVuY3Rpb24oZSl7cmV0dXJuIHIoZSwhMSl9fSx7MTQ2OjE0Nn1dLDE0NjpbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3ZhciByPWUoMTI5KSxvPWUoMTM3KSxpPShlKDE0MiksZSgxNDcpKSxhPWUoMTQ0KTt0LmV4cG9ydHM9ZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3ZhciB0PWUmJihFJiZlW0VdfHxlW3hdKTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiB0KXJldHVybiB0fWZ1bmN0aW9uIHMoZSx0KXtyZXR1cm4gZT09PXQ/MCE9PWV8fDEvZT09MS90OmUhPT1lJiZ0IT09dH1mdW5jdGlvbiB1KGUpe3RoaXMubWVzc2FnZT1lLHRoaXMuc3RhY2s9XCJcIn1mdW5jdGlvbiBsKGUpe2Z1bmN0aW9uIG4obixyLGEscyxsLGMscCl7aWYocz1zfHx3LGM9Y3x8YSxwIT09aSlpZih0KW8oITEsXCJDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiBVc2UgYFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpYCB0byBjYWxsIHRoZW0uIFJlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXNcIik7ZWxzZTtyZXR1cm4gbnVsbD09clthXT9uP25ldyB1KG51bGw9PT1yW2FdP1wiVGhlIFwiK2wrXCIgYFwiK2MrXCJgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCBpbiBgXCIrcytcImAsIGJ1dCBpdHMgdmFsdWUgaXMgYG51bGxgLlwiOlwiVGhlIFwiK2wrXCIgYFwiK2MrXCJgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCBpbiBgXCIrcytcImAsIGJ1dCBpdHMgdmFsdWUgaXMgYHVuZGVmaW5lZGAuXCIpOm51bGw6ZShyLGEscyxsLGMpfXZhciByPW4uYmluZChudWxsLCExKTtyZXR1cm4gci5pc1JlcXVpcmVkPW4uYmluZChudWxsLCEwKSxyfWZ1bmN0aW9uIGMoZSl7ZnVuY3Rpb24gdCh0LG4scixvLGksYSl7dmFyIHM9dFtuXTtpZihfKHMpIT09ZSlyZXR1cm4gbmV3IHUoXCJJbnZhbGlkIFwiK28rXCIgYFwiK2krXCJgIG9mIHR5cGUgYFwiK0MocykrXCJgIHN1cHBsaWVkIHRvIGBcIityK1wiYCwgZXhwZWN0ZWQgYFwiK2UrXCJgLlwiKTtyZXR1cm4gbnVsbH1yZXR1cm4gbCh0KX1mdW5jdGlvbiBwKGUpe2Z1bmN0aW9uIHQodCxuLHIsbyxhKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlKXJldHVybiBuZXcgdShcIlByb3BlcnR5IGBcIithK1wiYCBvZiBjb21wb25lbnQgYFwiK3IrXCJgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBhcnJheU9mLlwiKTt2YXIgcz10W25dO2lmKCFBcnJheS5pc0FycmF5KHMpKXtyZXR1cm4gbmV3IHUoXCJJbnZhbGlkIFwiK28rXCIgYFwiK2ErXCJgIG9mIHR5cGUgYFwiK18ocykrXCJgIHN1cHBsaWVkIHRvIGBcIityK1wiYCwgZXhwZWN0ZWQgYW4gYXJyYXkuXCIpfWZvcih2YXIgbD0wO2w8cy5sZW5ndGg7bCsrKXt2YXIgYz1lKHMsbCxyLG8sYStcIltcIitsK1wiXVwiLGkpO2lmKGMgaW5zdGFuY2VvZiBFcnJvcilyZXR1cm4gY31yZXR1cm4gbnVsbH1yZXR1cm4gbCh0KX1mdW5jdGlvbiBkKGUpe2Z1bmN0aW9uIHQodCxuLHIsbyxpKXtpZighKHRbbl1pbnN0YW5jZW9mIGUpKXt2YXIgYT1lLm5hbWV8fHc7cmV0dXJuIG5ldyB1KFwiSW52YWxpZCBcIitvK1wiIGBcIitpK1wiYCBvZiB0eXBlIGBcIitiKHRbbl0pK1wiYCBzdXBwbGllZCB0byBgXCIrcitcImAsIGV4cGVjdGVkIGluc3RhbmNlIG9mIGBcIithK1wiYC5cIil9cmV0dXJuIG51bGx9cmV0dXJuIGwodCl9ZnVuY3Rpb24gZihlKXtmdW5jdGlvbiB0KHQsbixyLG8saSl7Zm9yKHZhciBhPXRbbl0sbD0wO2w8ZS5sZW5ndGg7bCsrKWlmKHMoYSxlW2xdKSlyZXR1cm4gbnVsbDtyZXR1cm4gbmV3IHUoXCJJbnZhbGlkIFwiK28rXCIgYFwiK2krXCJgIG9mIHZhbHVlIGBcIithK1wiYCBzdXBwbGllZCB0byBgXCIrcitcImAsIGV4cGVjdGVkIG9uZSBvZiBcIitKU09OLnN0cmluZ2lmeShlKStcIi5cIil9cmV0dXJuIEFycmF5LmlzQXJyYXkoZSk/bCh0KTpyLnRoYXRSZXR1cm5zTnVsbH1mdW5jdGlvbiBoKGUpe2Z1bmN0aW9uIHQodCxuLHIsbyxhKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlKXJldHVybiBuZXcgdShcIlByb3BlcnR5IGBcIithK1wiYCBvZiBjb21wb25lbnQgYFwiK3IrXCJgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi5cIik7dmFyIHM9dFtuXSxsPV8ocyk7aWYoXCJvYmplY3RcIiE9PWwpcmV0dXJuIG5ldyB1KFwiSW52YWxpZCBcIitvK1wiIGBcIithK1wiYCBvZiB0eXBlIGBcIitsK1wiYCBzdXBwbGllZCB0byBgXCIrcitcImAsIGV4cGVjdGVkIGFuIG9iamVjdC5cIik7Zm9yKHZhciBjIGluIHMpaWYocy5oYXNPd25Qcm9wZXJ0eShjKSl7dmFyIHA9ZShzLGMscixvLGErXCIuXCIrYyxpKTtpZihwIGluc3RhbmNlb2YgRXJyb3IpcmV0dXJuIHB9cmV0dXJuIG51bGx9cmV0dXJuIGwodCl9ZnVuY3Rpb24gbShlKXtmdW5jdGlvbiB0KHQsbixyLG8sYSl7Zm9yKHZhciBzPTA7czxlLmxlbmd0aDtzKyspe2lmKG51bGw9PSgwLGVbc10pKHQsbixyLG8sYSxpKSlyZXR1cm4gbnVsbH1yZXR1cm4gbmV3IHUoXCJJbnZhbGlkIFwiK28rXCIgYFwiK2ErXCJgIHN1cHBsaWVkIHRvIGBcIityK1wiYC5cIil9cmV0dXJuIEFycmF5LmlzQXJyYXkoZSk/bCh0KTpyLnRoYXRSZXR1cm5zTnVsbH1mdW5jdGlvbiB2KGUpe2Z1bmN0aW9uIHQodCxuLHIsbyxhKXt2YXIgcz10W25dLGw9XyhzKTtpZihcIm9iamVjdFwiIT09bClyZXR1cm4gbmV3IHUoXCJJbnZhbGlkIFwiK28rXCIgYFwiK2ErXCJgIG9mIHR5cGUgYFwiK2wrXCJgIHN1cHBsaWVkIHRvIGBcIityK1wiYCwgZXhwZWN0ZWQgYG9iamVjdGAuXCIpO2Zvcih2YXIgYyBpbiBlKXt2YXIgcD1lW2NdO2lmKHApe3ZhciBkPXAocyxjLHIsbyxhK1wiLlwiK2MsaSk7aWYoZClyZXR1cm4gZH19cmV0dXJuIG51bGx9cmV0dXJuIGwodCl9ZnVuY3Rpb24gZyh0KXtzd2l0Y2godHlwZW9mIHQpe2Nhc2VcIm51bWJlclwiOmNhc2VcInN0cmluZ1wiOmNhc2VcInVuZGVmaW5lZFwiOnJldHVybiEwO2Nhc2VcImJvb2xlYW5cIjpyZXR1cm4hdDtjYXNlXCJvYmplY3RcIjppZihBcnJheS5pc0FycmF5KHQpKXJldHVybiB0LmV2ZXJ5KGcpO2lmKG51bGw9PT10fHxlKHQpKXJldHVybiEwO3ZhciByPW4odCk7aWYoIXIpcmV0dXJuITE7dmFyIG8saT1yLmNhbGwodCk7aWYociE9PXQuZW50cmllcyl7Zm9yKDshKG89aS5uZXh0KCkpLmRvbmU7KWlmKCFnKG8udmFsdWUpKXJldHVybiExfWVsc2UgZm9yKDshKG89aS5uZXh0KCkpLmRvbmU7KXt2YXIgYT1vLnZhbHVlO2lmKGEmJiFnKGFbMV0pKXJldHVybiExfXJldHVybiEwO2RlZmF1bHQ6cmV0dXJuITF9fWZ1bmN0aW9uIHkoZSx0KXtyZXR1cm5cInN5bWJvbFwiPT09ZXx8KFwiU3ltYm9sXCI9PT10W1wiQEB0b1N0cmluZ1RhZ1wiXXx8XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZ0IGluc3RhbmNlb2YgU3ltYm9sKX1mdW5jdGlvbiBfKGUpe3ZhciB0PXR5cGVvZiBlO3JldHVybiBBcnJheS5pc0FycmF5KGUpP1wiYXJyYXlcIjplIGluc3RhbmNlb2YgUmVnRXhwP1wib2JqZWN0XCI6eSh0LGUpP1wic3ltYm9sXCI6dH1mdW5jdGlvbiBDKGUpe3ZhciB0PV8oZSk7aWYoXCJvYmplY3RcIj09PXQpe2lmKGUgaW5zdGFuY2VvZiBEYXRlKXJldHVyblwiZGF0ZVwiO2lmKGUgaW5zdGFuY2VvZiBSZWdFeHApcmV0dXJuXCJyZWdleHBcIn1yZXR1cm4gdH1mdW5jdGlvbiBiKGUpe3JldHVybiBlLmNvbnN0cnVjdG9yJiZlLmNvbnN0cnVjdG9yLm5hbWU/ZS5jb25zdHJ1Y3Rvci5uYW1lOnd9dmFyIEU9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZTeW1ib2wuaXRlcmF0b3IseD1cIkBAaXRlcmF0b3JcIix3PVwiPDxhbm9ueW1vdXM+PlwiLFQ9e2FycmF5OmMoXCJhcnJheVwiKSxib29sOmMoXCJib29sZWFuXCIpLGZ1bmM6YyhcImZ1bmN0aW9uXCIpLG51bWJlcjpjKFwibnVtYmVyXCIpLG9iamVjdDpjKFwib2JqZWN0XCIpLHN0cmluZzpjKFwic3RyaW5nXCIpLHN5bWJvbDpjKFwic3ltYm9sXCIpLGFueTpmdW5jdGlvbigpe3JldHVybiBsKHIudGhhdFJldHVybnNOdWxsKX0oKSxhcnJheU9mOnAsZWxlbWVudDpmdW5jdGlvbigpe2Z1bmN0aW9uIHQodCxuLHIsbyxpKXt2YXIgYT10W25dO2lmKCFlKGEpKXtyZXR1cm4gbmV3IHUoXCJJbnZhbGlkIFwiK28rXCIgYFwiK2krXCJgIG9mIHR5cGUgYFwiK18oYSkrXCJgIHN1cHBsaWVkIHRvIGBcIityK1wiYCwgZXhwZWN0ZWQgYSBzaW5nbGUgUmVhY3RFbGVtZW50LlwiKX1yZXR1cm4gbnVsbH1yZXR1cm4gbCh0KX0oKSxpbnN0YW5jZU9mOmQsbm9kZTpmdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSx0LG4scixvKXtyZXR1cm4gZyhlW3RdKT9udWxsOm5ldyB1KFwiSW52YWxpZCBcIityK1wiIGBcIitvK1wiYCBzdXBwbGllZCB0byBgXCIrbitcImAsIGV4cGVjdGVkIGEgUmVhY3ROb2RlLlwiKX1yZXR1cm4gbChlKX0oKSxvYmplY3RPZjpoLG9uZU9mOmYsb25lT2ZUeXBlOm0sc2hhcGU6dn1cbjtyZXR1cm4gdS5wcm90b3R5cGU9RXJyb3IucHJvdG90eXBlLFQuY2hlY2tQcm9wVHlwZXM9YSxULlByb3BUeXBlcz1ULFR9fSx7MTI5OjEyOSwxMzc6MTM3LDE0MjoxNDIsMTQ0OjE0NCwxNDc6MTQ3fV0sMTQ3OltmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dC5leHBvcnRzPVwiU0VDUkVUX0RPX05PVF9QQVNTX1RISVNfT1JfWU9VX1dJTExfQkVfRklSRURcIn0se31dfSx7fSxbNDVdKSg0NSl9KCl9KCl9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3QtZG9tL2Rpc3QvcmVhY3QtZG9tLm1pbi5qc1xuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG4gIHZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuICB2YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuICB2YXIgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG59XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgdGhlIHZhbHVlcyBtYXRjaCB3aXRoIHRoZSB0eXBlIHNwZWNzLlxuICogRXJyb3IgbWVzc2FnZXMgYXJlIG1lbW9yaXplZCBhbmQgd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHR5cGVTcGVjcyBNYXAgb2YgbmFtZSB0byBhIFJlYWN0UHJvcFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZXMgUnVudGltZSB2YWx1ZXMgdGhhdCBuZWVkIHRvIGJlIHR5cGUtY2hlY2tlZFxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIGUuZy4gXCJwcm9wXCIsIFwiY29udGV4dFwiLCBcImNoaWxkIGNvbnRleHRcIlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50IGZvciBlcnJvciBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7P0Z1bmN0aW9ufSBnZXRTdGFjayBSZXR1cm5zIHRoZSBjb21wb25lbnQgc3RhY2suXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjaGVja1Byb3BUeXBlcyh0eXBlU3BlY3MsIHZhbHVlcywgbG9jYXRpb24sIGNvbXBvbmVudE5hbWUsIGdldFN0YWNrKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgZm9yICh2YXIgdHlwZVNwZWNOYW1lIGluIHR5cGVTcGVjcykge1xuICAgICAgaWYgKHR5cGVTcGVjcy5oYXNPd25Qcm9wZXJ0eSh0eXBlU3BlY05hbWUpKSB7XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgICAgLy8gZmFpbCB0aGUgcmVuZGVyIHBoYXNlIHdoZXJlIGl0IGRpZG4ndCBmYWlsIGJlZm9yZS4gU28gd2UgbG9nIGl0LlxuICAgICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbGx5IGFuIGludmFyaWFudCB0aGF0IGdldHMgY2F1Z2h0LiBJdCdzIHRoZSBzYW1lXG4gICAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAgIGludmFyaWFudCh0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gPT09ICdmdW5jdGlvbicsICclczogJXMgdHlwZSBgJXNgIGlzIGludmFsaWQ7IGl0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tICcgKyAnUmVhY3QuUHJvcFR5cGVzLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgbG9jYXRpb24sIHR5cGVTcGVjTmFtZSk7XG4gICAgICAgICAgZXJyb3IgPSB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSh2YWx1ZXMsIHR5cGVTcGVjTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIG51bGwsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgICB9XG4gICAgICAgIHdhcm5pbmcoIWVycm9yIHx8IGVycm9yIGluc3RhbmNlb2YgRXJyb3IsICclczogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICVzIGAlc2AgaXMgaW52YWxpZDsgdGhlIHR5cGUgY2hlY2tlciAnICsgJ2Z1bmN0aW9uIG11c3QgcmV0dXJuIGBudWxsYCBvciBhbiBgRXJyb3JgIGJ1dCByZXR1cm5lZCBhICVzLiAnICsgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgKyAnY3JlYXRvciAoYXJyYXlPZiwgaW5zdGFuY2VPZiwgb2JqZWN0T2YsIG9uZU9mLCBvbmVPZlR5cGUsIGFuZCAnICsgJ3NoYXBlIGFsbCByZXF1aXJlIGFuIGFyZ3VtZW50KS4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIGxvY2F0aW9uLCB0eXBlU3BlY05hbWUsIHR5cGVvZiBlcnJvcik7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IubWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIHN0YWNrID0gZ2V0U3RhY2sgPyBnZXRTdGFjaygpIDogJyc7XG5cbiAgICAgICAgICB3YXJuaW5nKGZhbHNlLCAnRmFpbGVkICVzIHR5cGU6ICVzJXMnLCBsb2NhdGlvbiwgZXJyb3IubWVzc2FnZSwgc3RhY2sgIT0gbnVsbCA/IHN0YWNrIDogJycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2tQcm9wVHlwZXM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcy5qc1xuLy8gbW9kdWxlIGlkID0gNzNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBSZWFjdCAxNS41IHJlZmVyZW5jZXMgdGhpcyBtb2R1bGUsIGFuZCBhc3N1bWVzIFByb3BUeXBlcyBhcmUgc3RpbGwgY2FsbGFibGUgaW4gcHJvZHVjdGlvbi5cbi8vIFRoZXJlZm9yZSB3ZSByZS1leHBvcnQgZGV2ZWxvcG1lbnQtb25seSB2ZXJzaW9uIHdpdGggYWxsIHRoZSBQcm9wVHlwZXMgY2hlY2tzIGhlcmUuXG4vLyBIb3dldmVyIGlmIG9uZSBpcyBtaWdyYXRpbmcgdG8gdGhlIGBwcm9wLXR5cGVzYCBucG0gbGlicmFyeSwgdGhleSB3aWxsIGdvIHRocm91Z2ggdGhlXG4vLyBgaW5kZXguanNgIGVudHJ5IHBvaW50LCBhbmQgaXQgd2lsbCBicmFuY2ggZGVwZW5kaW5nIG9uIHRoZSBlbnZpcm9ubWVudC5cbnZhciBmYWN0b3J5ID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFR5cGVDaGVja2VycycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpc1ZhbGlkRWxlbWVudCkge1xuICAvLyBJdCBpcyBzdGlsbCBhbGxvd2VkIGluIDE1LjUuXG4gIHZhciB0aHJvd09uRGlyZWN0QWNjZXNzID0gZmFsc2U7XG4gIHJldHVybiBmYWN0b3J5KGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcHJvcC10eXBlcy9mYWN0b3J5LmpzXG4vLyBtb2R1bGUgaWQgPSA3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG52YXIgY2hlY2tQcm9wVHlwZXMgPSByZXF1aXJlKCcuL2NoZWNrUHJvcFR5cGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgLyogZ2xvYmFsIFN5bWJvbCAqL1xuICB2YXIgSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gIHZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJzsgLy8gQmVmb3JlIFN5bWJvbCBzcGVjLlxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBtZXRob2QgZnVuY3Rpb24gY29udGFpbmVkIG9uIHRoZSBpdGVyYWJsZSBvYmplY3QuXG4gICAqXG4gICAqIEJlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBpdGVyYWJsZSBhcyBjb250ZXh0OlxuICAgKlxuICAgKiAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG15SXRlcmFibGUpO1xuICAgKiAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICogICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG15SXRlcmFibGUpO1xuICAgKiAgICAgICAuLi5cbiAgICogICAgIH1cbiAgICpcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBtYXliZUl0ZXJhYmxlXG4gICAqIEByZXR1cm4gez9mdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gbWF5YmVJdGVyYWJsZSAmJiAoSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXSk7XG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBtZXRob2RzIHRoYXQgYWxsb3cgZGVjbGFyYXRpb24gYW5kIHZhbGlkYXRpb24gb2YgcHJvcHMgdGhhdCBhcmVcbiAgICogc3VwcGxpZWQgdG8gUmVhY3QgY29tcG9uZW50cy4gRXhhbXBsZSB1c2FnZTpcbiAgICpcbiAgICogICB2YXIgUHJvcHMgPSByZXF1aXJlKCdSZWFjdFByb3BUeXBlcycpO1xuICAgKiAgIHZhciBNeUFydGljbGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIHByb3AgbmFtZWQgXCJkZXNjcmlwdGlvblwiLlxuICAgKiAgICAgICBkZXNjcmlwdGlvbjogUHJvcHMuc3RyaW5nLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHJlcXVpcmVkIGVudW0gcHJvcCBuYW1lZCBcImNhdGVnb3J5XCIuXG4gICAqICAgICAgIGNhdGVnb3J5OiBQcm9wcy5vbmVPZihbJ05ld3MnLCdQaG90b3MnXSkuaXNSZXF1aXJlZCxcbiAgICpcbiAgICogICAgICAgLy8gQSBwcm9wIG5hbWVkIFwiZGlhbG9nXCIgdGhhdCByZXF1aXJlcyBhbiBpbnN0YW5jZSBvZiBEaWFsb2cuXG4gICAqICAgICAgIGRpYWxvZzogUHJvcHMuaW5zdGFuY2VPZihEaWFsb2cpLmlzUmVxdWlyZWRcbiAgICogICAgIH0sXG4gICAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkgeyAuLi4gfVxuICAgKiAgIH0pO1xuICAgKlxuICAgKiBBIG1vcmUgZm9ybWFsIHNwZWNpZmljYXRpb24gb2YgaG93IHRoZXNlIG1ldGhvZHMgYXJlIHVzZWQ6XG4gICAqXG4gICAqICAgdHlwZSA6PSBhcnJheXxib29sfGZ1bmN8b2JqZWN0fG51bWJlcnxzdHJpbmd8b25lT2YoWy4uLl0pfGluc3RhbmNlT2YoLi4uKVxuICAgKiAgIGRlY2wgOj0gUmVhY3RQcm9wVHlwZXMue3R5cGV9KC5pc1JlcXVpcmVkKT9cbiAgICpcbiAgICogRWFjaCBhbmQgZXZlcnkgZGVjbGFyYXRpb24gcHJvZHVjZXMgYSBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIHNpZ25hdHVyZS4gVGhpc1xuICAgKiBhbGxvd3MgdGhlIGNyZWF0aW9uIG9mIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9ucy4gRm9yIGV4YW1wbGU6XG4gICAqXG4gICAqICB2YXIgTXlMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgb3IgVVJJIHByb3AgbmFtZWQgXCJocmVmXCIuXG4gICAqICAgICAgaHJlZjogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAqICAgICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgKiAgICAgICAgaWYgKHByb3BWYWx1ZSAhPSBudWxsICYmIHR5cGVvZiBwcm9wVmFsdWUgIT09ICdzdHJpbmcnICYmXG4gICAqICAgICAgICAgICAgIShwcm9wVmFsdWUgaW5zdGFuY2VvZiBVUkkpKSB7XG4gICAqICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAqICAgICAgICAgICAgJ0V4cGVjdGVkIGEgc3RyaW5nIG9yIGFuIFVSSSBmb3IgJyArIHByb3BOYW1lICsgJyBpbiAnICtcbiAgICogICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAqICAgICAgICAgICk7XG4gICAqICAgICAgICB9XG4gICAqICAgICAgfVxuICAgKiAgICB9LFxuICAgKiAgICByZW5kZXI6IGZ1bmN0aW9uKCkgey4uLn1cbiAgICogIH0pO1xuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG5cbiAgdmFyIEFOT05ZTU9VUyA9ICc8PGFub255bW91cz4+JztcblxuICAvLyBJbXBvcnRhbnQhXG4gIC8vIEtlZXAgdGhpcyBsaXN0IGluIHN5bmMgd2l0aCBwcm9kdWN0aW9uIHZlcnNpb24gaW4gYC4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYXJyYXknKSxcbiAgICBib29sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYm9vbGVhbicpLFxuICAgIGZ1bmM6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdmdW5jdGlvbicpLFxuICAgIG51bWJlcjogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ251bWJlcicpLFxuICAgIG9iamVjdDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ29iamVjdCcpLFxuICAgIHN0cmluZzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N0cmluZycpLFxuICAgIHN5bWJvbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N5bWJvbCcpLFxuXG4gICAgYW55OiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpLFxuICAgIGFycmF5T2Y6IGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcixcbiAgICBlbGVtZW50OiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSxcbiAgICBpbnN0YW5jZU9mOiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyLFxuICAgIG5vZGU6IGNyZWF0ZU5vZGVDaGVja2VyKCksXG4gICAgb2JqZWN0T2Y6IGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIsXG4gICAgb25lT2Y6IGNyZWF0ZUVudW1UeXBlQ2hlY2tlcixcbiAgICBvbmVPZlR5cGU6IGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIsXG4gICAgc2hhcGU6IGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXJcbiAgfTtcblxuICAvKipcbiAgICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAgICovXG4gIC8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlKi9cbiAgZnVuY3Rpb24gaXMoeCwgeSkge1xuICAgIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgICBpZiAoeCA9PT0geSkge1xuICAgICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgICB9XG4gIH1cbiAgLyplc2xpbnQtZW5hYmxlIG5vLXNlbGYtY29tcGFyZSovXG5cbiAgLyoqXG4gICAqIFdlIHVzZSBhbiBFcnJvci1saWtlIG9iamVjdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBhcyBwZW9wbGUgbWF5IGNhbGxcbiAgICogUHJvcFR5cGVzIGRpcmVjdGx5IGFuZCBpbnNwZWN0IHRoZWlyIG91dHB1dC4gSG93ZXZlciwgd2UgZG9uJ3QgdXNlIHJlYWxcbiAgICogRXJyb3JzIGFueW1vcmUuIFdlIGRvbid0IGluc3BlY3QgdGhlaXIgc3RhY2sgYW55d2F5LCBhbmQgY3JlYXRpbmcgdGhlbVxuICAgKiBpcyBwcm9oaWJpdGl2ZWx5IGV4cGVuc2l2ZSBpZiB0aGV5IGFyZSBjcmVhdGVkIHRvbyBvZnRlbiwgc3VjaCBhcyB3aGF0XG4gICAqIGhhcHBlbnMgaW4gb25lT2ZUeXBlKCkgZm9yIGFueSB0eXBlIGJlZm9yZSB0aGUgb25lIHRoYXQgbWF0Y2hlZC5cbiAgICovXG4gIGZ1bmN0aW9uIFByb3BUeXBlRXJyb3IobWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5zdGFjayA9ICcnO1xuICB9XG4gIC8vIE1ha2UgYGluc3RhbmNlb2YgRXJyb3JgIHN0aWxsIHdvcmsgZm9yIHJldHVybmVkIGVycm9ycy5cbiAgUHJvcFR5cGVFcnJvci5wcm90b3R5cGUgPSBFcnJvci5wcm90b3R5cGU7XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlID0ge307XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPSAwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGVja1R5cGUoaXNSZXF1aXJlZCwgcHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgIHByb3BGdWxsTmFtZSA9IHByb3BGdWxsTmFtZSB8fCBwcm9wTmFtZTtcblxuICAgICAgaWYgKHNlY3JldCAhPT0gUmVhY3RQcm9wVHlwZXNTZWNyZXQpIHtcbiAgICAgICAgaWYgKHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgICAgICAgICAvLyBOZXcgYmVoYXZpb3Igb25seSBmb3IgdXNlcnMgb2YgYHByb3AtdHlwZXNgIHBhY2thZ2VcbiAgICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICdDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICdVc2UgYFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpYCB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIE9sZCBiZWhhdmlvciBmb3IgcGVvcGxlIHVzaW5nIFJlYWN0LlByb3BUeXBlc1xuICAgICAgICAgIHZhciBjYWNoZUtleSA9IGNvbXBvbmVudE5hbWUgKyAnOicgKyBwcm9wTmFtZTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldICYmXG4gICAgICAgICAgICAvLyBBdm9pZCBzcGFtbWluZyB0aGUgY29uc29sZSBiZWNhdXNlIHRoZXkgYXJlIG9mdGVuIG5vdCBhY3Rpb25hYmxlIGV4Y2VwdCBmb3IgbGliIGF1dGhvcnNcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50IDwgM1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgd2FybmluZyhcbiAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICdZb3UgYXJlIG1hbnVhbGx5IGNhbGxpbmcgYSBSZWFjdC5Qcm9wVHlwZXMgdmFsaWRhdGlvbiAnICtcbiAgICAgICAgICAgICAgJ2Z1bmN0aW9uIGZvciB0aGUgYCVzYCBwcm9wIG9uIGAlc2AuIFRoaXMgaXMgZGVwcmVjYXRlZCAnICtcbiAgICAgICAgICAgICAgJ2FuZCB3aWxsIHRocm93IGluIHRoZSBzdGFuZGFsb25lIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICAgJ1lvdSBtYXkgYmUgc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8gYSB0aGlyZC1wYXJ0eSBQcm9wVHlwZXMgJyArXG4gICAgICAgICAgICAgICdsaWJyYXJ5LiBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWRvbnQtY2FsbC1wcm9wdHlwZXMgJyArICdmb3IgZGV0YWlscy4nLFxuICAgICAgICAgICAgICBwcm9wRnVsbE5hbWUsXG4gICAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gPSB0cnVlO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgJyArICgnaW4gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYG51bGxgLicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCBpbiAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgdW5kZWZpbmVkYC4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgICBjaGFpbmVkQ2hlY2tUeXBlLmlzUmVxdWlyZWQgPSBjaGVja1R5cGUuYmluZChudWxsLCB0cnVlKTtcblxuICAgIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoZXhwZWN0ZWRUeXBlKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICAgICAgLy8gYHByb3BWYWx1ZWAgYmVpbmcgaW5zdGFuY2Ugb2YsIHNheSwgZGF0ZS9yZWdleHAsIHBhc3MgdGhlICdvYmplY3QnXG4gICAgICAgIC8vIGNoZWNrLCBidXQgd2UgY2FuIG9mZmVyIGEgbW9yZSBwcmVjaXNlIGVycm9yIG1lc3NhZ2UgaGVyZSByYXRoZXIgdGhhblxuICAgICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICAgIHZhciBwcmVjaXNlVHlwZSA9IGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIGFycmF5T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJywgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIoZXhwZWN0ZWRDbGFzcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCEocHJvcHNbcHJvcE5hbWVdIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcykpIHtcbiAgICAgICAgdmFyIGV4cGVjdGVkQ2xhc3NOYW1lID0gZXhwZWN0ZWRDbGFzcy5uYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgICAgdmFyIGFjdHVhbENsYXNzTmFtZSA9IGdldENsYXNzTmFtZShwcm9wc1twcm9wTmFtZV0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBhY3R1YWxDbGFzc05hbWUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2luc3RhbmNlIG9mIGAnICsgZXhwZWN0ZWRDbGFzc05hbWUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVudW1UeXBlQ2hlY2tlcihleHBlY3RlZFZhbHVlcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShleHBlY3RlZFZhbHVlcykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBlY3RlZFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaXMocHJvcFZhbHVlLCBleHBlY3RlZFZhbHVlc1tpXSkpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWVzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZXhwZWN0ZWRWYWx1ZXMpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB2YWx1ZSBgJyArIHByb3BWYWx1ZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBvbmUgb2YgJyArIHZhbHVlc1N0cmluZyArICcuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBvYmplY3QuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgICBpZiAocHJvcFZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIoYXJyYXlPZlR5cGVDaGVja2Vycykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheU9mVHlwZUNoZWNrZXJzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgICBpZiAoY2hlY2tlcihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KSA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVOb2RlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghaXNOb2RlKHByb3BzW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBSZWFjdE5vZGUuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc2hhcGVUeXBlcykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNOb2RlKHByb3BWYWx1ZSkge1xuICAgIHN3aXRjaCAodHlwZW9mIHByb3BWYWx1ZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gIXByb3BWYWx1ZTtcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gcHJvcFZhbHVlLmV2ZXJ5KGlzTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BWYWx1ZSA9PT0gbnVsbCB8fCBpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4ocHJvcFZhbHVlKTtcbiAgICAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwocHJvcFZhbHVlKTtcbiAgICAgICAgICB2YXIgc3RlcDtcbiAgICAgICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gcHJvcFZhbHVlLmVudHJpZXMpIHtcbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgaWYgKCFpc05vZGUoc3RlcC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSXRlcmF0b3Igd2lsbCBwcm92aWRlIGVudHJ5IFtrLHZdIHR1cGxlcyByYXRoZXIgdGhhbiB2YWx1ZXMuXG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgICAgIGlmICghaXNOb2RlKGVudHJ5WzFdKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSB7XG4gICAgLy8gTmF0aXZlIFN5bWJvbC5cbiAgICBpZiAocHJvcFR5cGUgPT09ICdzeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddID09PSAnU3ltYm9sJ1xuICAgIGlmIChwcm9wVmFsdWVbJ0BAdG9TdHJpbmdUYWcnXSA9PT0gJ1N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIEZhbGxiYWNrIGZvciBub24tc3BlYyBjb21wbGlhbnQgU3ltYm9scyB3aGljaCBhcmUgcG9seWZpbGxlZC5cbiAgICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBwcm9wVmFsdWUgaW5zdGFuY2VvZiBTeW1ib2wpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIEVxdWl2YWxlbnQgb2YgYHR5cGVvZmAgYnV0IHdpdGggc3BlY2lhbCBoYW5kbGluZyBmb3IgYXJyYXkgYW5kIHJlZ2V4cC5cbiAgZnVuY3Rpb24gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKSB7XG4gICAgdmFyIHByb3BUeXBlID0gdHlwZW9mIHByb3BWYWx1ZTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ2FycmF5JztcbiAgICB9XG4gICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgLy8gT2xkIHdlYmtpdHMgKGF0IGxlYXN0IHVudGlsIEFuZHJvaWQgNC4wKSByZXR1cm4gJ2Z1bmN0aW9uJyByYXRoZXIgdGhhblxuICAgICAgLy8gJ29iamVjdCcgZm9yIHR5cGVvZiBhIFJlZ0V4cC4gV2UnbGwgbm9ybWFsaXplIHRoaXMgaGVyZSBzbyB0aGF0IC9ibGEvXG4gICAgICAvLyBwYXNzZXMgUHJvcFR5cGVzLm9iamVjdC5cbiAgICAgIHJldHVybiAnb2JqZWN0JztcbiAgICB9XG4gICAgaWYgKGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ3N5bWJvbCc7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFRoaXMgaGFuZGxlcyBtb3JlIHR5cGVzIHRoYW4gYGdldFByb3BUeXBlYC4gT25seSB1c2VkIGZvciBlcnJvciBtZXNzYWdlcy5cbiAgLy8gU2VlIGBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcmAuXG4gIGZ1bmN0aW9uIGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSkge1xuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuICdkYXRlJztcbiAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gUmV0dXJucyBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIGFueS5cbiAgZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKHByb3BWYWx1ZSkge1xuICAgIGlmICghcHJvcFZhbHVlLmNvbnN0cnVjdG9yIHx8ICFwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgICAgcmV0dXJuIEFOT05ZTU9VUztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG5cbiAgUmVhY3RQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBjaGVja1Byb3BUeXBlcztcbiAgUmVhY3RQcm9wVHlwZXMuUHJvcFR5cGVzID0gUmVhY3RQcm9wVHlwZXM7XG5cbiAgcmV0dXJuIFJlYWN0UHJvcFR5cGVzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSA3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRXNjYXBlIGFuZCB3cmFwIGtleSBzbyBpdCBpcyBzYWZlIHRvIHVzZSBhcyBhIHJlYWN0aWRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHRvIGJlIGVzY2FwZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBlc2NhcGVkIGtleS5cbiAqL1xuXG5mdW5jdGlvbiBlc2NhcGUoa2V5KSB7XG4gIHZhciBlc2NhcGVSZWdleCA9IC9bPTpdL2c7XG4gIHZhciBlc2NhcGVyTG9va3VwID0ge1xuICAgICc9JzogJz0wJyxcbiAgICAnOic6ICc9MidcbiAgfTtcbiAgdmFyIGVzY2FwZWRTdHJpbmcgPSAoJycgKyBrZXkpLnJlcGxhY2UoZXNjYXBlUmVnZXgsIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgIHJldHVybiBlc2NhcGVyTG9va3VwW21hdGNoXTtcbiAgfSk7XG5cbiAgcmV0dXJuICckJyArIGVzY2FwZWRTdHJpbmc7XG59XG5cbi8qKlxuICogVW5lc2NhcGUgYW5kIHVud3JhcCBrZXkgZm9yIGh1bWFuLXJlYWRhYmxlIGRpc3BsYXlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHRvIHVuZXNjYXBlLlxuICogQHJldHVybiB7c3RyaW5nfSB0aGUgdW5lc2NhcGVkIGtleS5cbiAqL1xuZnVuY3Rpb24gdW5lc2NhcGUoa2V5KSB7XG4gIHZhciB1bmVzY2FwZVJlZ2V4ID0gLyg9MHw9MikvZztcbiAgdmFyIHVuZXNjYXBlckxvb2t1cCA9IHtcbiAgICAnPTAnOiAnPScsXG4gICAgJz0yJzogJzonXG4gIH07XG4gIHZhciBrZXlTdWJzdHJpbmcgPSBrZXlbMF0gPT09ICcuJyAmJiBrZXlbMV0gPT09ICckJyA/IGtleS5zdWJzdHJpbmcoMikgOiBrZXkuc3Vic3RyaW5nKDEpO1xuXG4gIHJldHVybiAoJycgKyBrZXlTdWJzdHJpbmcpLnJlcGxhY2UodW5lc2NhcGVSZWdleCwgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgcmV0dXJuIHVuZXNjYXBlckxvb2t1cFttYXRjaF07XG4gIH0pO1xufVxuXG52YXIgS2V5RXNjYXBlVXRpbHMgPSB7XG4gIGVzY2FwZTogZXNjYXBlLFxuICB1bmVzY2FwZTogdW5lc2NhcGVcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gS2V5RXNjYXBlVXRpbHM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0L2xpYi9LZXlFc2NhcGVVdGlscy5qc1xuLy8gbW9kdWxlIGlkID0gODFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbi8qKlxuICogU3RhdGljIHBvb2xlcnMuIFNldmVyYWwgY3VzdG9tIHZlcnNpb25zIGZvciBlYWNoIHBvdGVudGlhbCBudW1iZXIgb2ZcbiAqIGFyZ3VtZW50cy4gQSBjb21wbGV0ZWx5IGdlbmVyaWMgcG9vbGVyIGlzIGVhc3kgdG8gaW1wbGVtZW50LCBidXQgd291bGRcbiAqIHJlcXVpcmUgYWNjZXNzaW5nIHRoZSBgYXJndW1lbnRzYCBvYmplY3QuIEluIGVhY2ggb2YgdGhlc2UsIGB0aGlzYCByZWZlcnMgdG9cbiAqIHRoZSBDbGFzcyBpdHNlbGYsIG5vdCBhbiBpbnN0YW5jZS4gSWYgYW55IG90aGVycyBhcmUgbmVlZGVkLCBzaW1wbHkgYWRkIHRoZW1cbiAqIGhlcmUsIG9yIGluIHRoZWlyIG93biBmaWxlcy5cbiAqL1xudmFyIG9uZUFyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGNvcHlGaWVsZHNGcm9tKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGNvcHlGaWVsZHNGcm9tKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhjb3B5RmllbGRzRnJvbSk7XG4gIH1cbn07XG5cbnZhciB0d29Bcmd1bWVudFBvb2xlciA9IGZ1bmN0aW9uIChhMSwgYTIpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgYTEsIGEyKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhhMSwgYTIpO1xuICB9XG59O1xuXG52YXIgdGhyZWVBcmd1bWVudFBvb2xlciA9IGZ1bmN0aW9uIChhMSwgYTIsIGEzKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGExLCBhMiwgYTMpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGExLCBhMiwgYTMpO1xuICB9XG59O1xuXG52YXIgZm91ckFyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGExLCBhMiwgYTMsIGE0KSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGExLCBhMiwgYTMsIGE0KTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhhMSwgYTIsIGEzLCBhNCk7XG4gIH1cbn07XG5cbnZhciBzdGFuZGFyZFJlbGVhc2VyID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gICEoaW5zdGFuY2UgaW5zdGFuY2VvZiBLbGFzcykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnVHJ5aW5nIHRvIHJlbGVhc2UgYW4gaW5zdGFuY2UgaW50byBhIHBvb2wgb2YgYSBkaWZmZXJlbnQgdHlwZS4nKSA6IF9wcm9kSW52YXJpYW50KCcyNScpIDogdm9pZCAwO1xuICBpbnN0YW5jZS5kZXN0cnVjdG9yKCk7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoIDwgS2xhc3MucG9vbFNpemUpIHtcbiAgICBLbGFzcy5pbnN0YW5jZVBvb2wucHVzaChpbnN0YW5jZSk7XG4gIH1cbn07XG5cbnZhciBERUZBVUxUX1BPT0xfU0laRSA9IDEwO1xudmFyIERFRkFVTFRfUE9PTEVSID0gb25lQXJndW1lbnRQb29sZXI7XG5cbi8qKlxuICogQXVnbWVudHMgYENvcHlDb25zdHJ1Y3RvcmAgdG8gYmUgYSBwb29sYWJsZSBjbGFzcywgYXVnbWVudGluZyBvbmx5IHRoZSBjbGFzc1xuICogaXRzZWxmIChzdGF0aWNhbGx5KSBub3QgYWRkaW5nIGFueSBwcm90b3R5cGljYWwgZmllbGRzLiBBbnkgQ29weUNvbnN0cnVjdG9yXG4gKiB5b3UgZ2l2ZSB0aGlzIG1heSBoYXZlIGEgYHBvb2xTaXplYCBwcm9wZXJ0eSwgYW5kIHdpbGwgbG9vayBmb3IgYVxuICogcHJvdG90eXBpY2FsIGBkZXN0cnVjdG9yYCBvbiBpbnN0YW5jZXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gQ29weUNvbnN0cnVjdG9yIENvbnN0cnVjdG9yIHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVzZXQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwb29sZXIgQ3VzdG9taXphYmxlIHBvb2xlci5cbiAqL1xudmFyIGFkZFBvb2xpbmdUbyA9IGZ1bmN0aW9uIChDb3B5Q29uc3RydWN0b3IsIHBvb2xlcikge1xuICAvLyBDYXN0aW5nIGFzIGFueSBzbyB0aGF0IGZsb3cgaWdub3JlcyB0aGUgYWN0dWFsIGltcGxlbWVudGF0aW9uIGFuZCB0cnVzdHNcbiAgLy8gaXQgdG8gbWF0Y2ggdGhlIHR5cGUgd2UgZGVjbGFyZWRcbiAgdmFyIE5ld0tsYXNzID0gQ29weUNvbnN0cnVjdG9yO1xuICBOZXdLbGFzcy5pbnN0YW5jZVBvb2wgPSBbXTtcbiAgTmV3S2xhc3MuZ2V0UG9vbGVkID0gcG9vbGVyIHx8IERFRkFVTFRfUE9PTEVSO1xuICBpZiAoIU5ld0tsYXNzLnBvb2xTaXplKSB7XG4gICAgTmV3S2xhc3MucG9vbFNpemUgPSBERUZBVUxUX1BPT0xfU0laRTtcbiAgfVxuICBOZXdLbGFzcy5yZWxlYXNlID0gc3RhbmRhcmRSZWxlYXNlcjtcbiAgcmV0dXJuIE5ld0tsYXNzO1xufTtcblxudmFyIFBvb2xlZENsYXNzID0ge1xuICBhZGRQb29saW5nVG86IGFkZFBvb2xpbmdUbyxcbiAgb25lQXJndW1lbnRQb29sZXI6IG9uZUFyZ3VtZW50UG9vbGVyLFxuICB0d29Bcmd1bWVudFBvb2xlcjogdHdvQXJndW1lbnRQb29sZXIsXG4gIHRocmVlQXJndW1lbnRQb29sZXI6IHRocmVlQXJndW1lbnRQb29sZXIsXG4gIGZvdXJBcmd1bWVudFBvb2xlcjogZm91ckFyZ3VtZW50UG9vbGVyXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBvb2xlZENsYXNzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC9saWIvUG9vbGVkQ2xhc3MuanNcbi8vIG1vZHVsZSBpZCA9IDgyXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RDaGlsZHJlbiA9IHJlcXVpcmUoJy4vUmVhY3RDaGlsZHJlbicpO1xudmFyIFJlYWN0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudCcpO1xudmFyIFJlYWN0UHVyZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vUmVhY3RQdXJlQ29tcG9uZW50Jyk7XG52YXIgUmVhY3RDbGFzcyA9IHJlcXVpcmUoJy4vUmVhY3RDbGFzcycpO1xudmFyIFJlYWN0RE9NRmFjdG9yaWVzID0gcmVxdWlyZSgnLi9SZWFjdERPTUZhY3RvcmllcycpO1xudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG52YXIgUmVhY3RQcm9wVHlwZXMgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVzJyk7XG52YXIgUmVhY3RWZXJzaW9uID0gcmVxdWlyZSgnLi9SZWFjdFZlcnNpb24nKTtcblxudmFyIG9ubHlDaGlsZCA9IHJlcXVpcmUoJy4vb25seUNoaWxkJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxudmFyIGNyZWF0ZUVsZW1lbnQgPSBSZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudDtcbnZhciBjcmVhdGVGYWN0b3J5ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUZhY3Rvcnk7XG52YXIgY2xvbmVFbGVtZW50ID0gUmVhY3RFbGVtZW50LmNsb25lRWxlbWVudDtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGNhbkRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9jYW5EZWZpbmVQcm9wZXJ0eScpO1xuICB2YXIgUmVhY3RFbGVtZW50VmFsaWRhdG9yID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnRWYWxpZGF0b3InKTtcbiAgdmFyIGRpZFdhcm5Qcm9wVHlwZXNEZXByZWNhdGVkID0gZmFsc2U7XG4gIGNyZWF0ZUVsZW1lbnQgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY3JlYXRlRWxlbWVudDtcbiAgY3JlYXRlRmFjdG9yeSA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVGYWN0b3J5O1xuICBjbG9uZUVsZW1lbnQgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY2xvbmVFbGVtZW50O1xufVxuXG52YXIgX19zcHJlYWQgPSBfYXNzaWduO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgd2FybmVkID0gZmFsc2U7XG4gIF9fc3ByZWFkID0gZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHdhcm5lZCwgJ1JlYWN0Ll9fc3ByZWFkIGlzIGRlcHJlY2F0ZWQgYW5kIHNob3VsZCBub3QgYmUgdXNlZC4gVXNlICcgKyAnT2JqZWN0LmFzc2lnbiBkaXJlY3RseSBvciBhbm90aGVyIGhlbHBlciBmdW5jdGlvbiB3aXRoIHNpbWlsYXIgJyArICdzZW1hbnRpY3MuIFlvdSBtYXkgYmUgc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8geW91ciBjb21waWxlci4gJyArICdTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC1zcHJlYWQtZGVwcmVjYXRpb24gZm9yIG1vcmUgZGV0YWlscy4nKSA6IHZvaWQgMDtcbiAgICB3YXJuZWQgPSB0cnVlO1xuICAgIHJldHVybiBfYXNzaWduLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbnZhciBSZWFjdCA9IHtcblxuICAvLyBNb2Rlcm5cblxuICBDaGlsZHJlbjoge1xuICAgIG1hcDogUmVhY3RDaGlsZHJlbi5tYXAsXG4gICAgZm9yRWFjaDogUmVhY3RDaGlsZHJlbi5mb3JFYWNoLFxuICAgIGNvdW50OiBSZWFjdENoaWxkcmVuLmNvdW50LFxuICAgIHRvQXJyYXk6IFJlYWN0Q2hpbGRyZW4udG9BcnJheSxcbiAgICBvbmx5OiBvbmx5Q2hpbGRcbiAgfSxcblxuICBDb21wb25lbnQ6IFJlYWN0Q29tcG9uZW50LFxuICBQdXJlQ29tcG9uZW50OiBSZWFjdFB1cmVDb21wb25lbnQsXG5cbiAgY3JlYXRlRWxlbWVudDogY3JlYXRlRWxlbWVudCxcbiAgY2xvbmVFbGVtZW50OiBjbG9uZUVsZW1lbnQsXG4gIGlzVmFsaWRFbGVtZW50OiBSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQsXG5cbiAgLy8gQ2xhc3NpY1xuXG4gIFByb3BUeXBlczogUmVhY3RQcm9wVHlwZXMsXG4gIGNyZWF0ZUNsYXNzOiBSZWFjdENsYXNzLmNyZWF0ZUNsYXNzLFxuICBjcmVhdGVGYWN0b3J5OiBjcmVhdGVGYWN0b3J5LFxuICBjcmVhdGVNaXhpbjogZnVuY3Rpb24gKG1peGluKSB7XG4gICAgLy8gQ3VycmVudGx5IGEgbm9vcC4gV2lsbCBiZSB1c2VkIHRvIHZhbGlkYXRlIGFuZCB0cmFjZSBtaXhpbnMuXG4gICAgcmV0dXJuIG1peGluO1xuICB9LFxuXG4gIC8vIFRoaXMgbG9va3MgRE9NIHNwZWNpZmljIGJ1dCB0aGVzZSBhcmUgYWN0dWFsbHkgaXNvbW9ycGhpYyBoZWxwZXJzXG4gIC8vIHNpbmNlIHRoZXkgYXJlIGp1c3QgZ2VuZXJhdGluZyBET00gc3RyaW5ncy5cbiAgRE9NOiBSZWFjdERPTUZhY3RvcmllcyxcblxuICB2ZXJzaW9uOiBSZWFjdFZlcnNpb24sXG5cbiAgLy8gRGVwcmVjYXRlZCBob29rIGZvciBKU1ggc3ByZWFkLCBkb24ndCB1c2UgdGhpcyBmb3IgYW55dGhpbmcuXG4gIF9fc3ByZWFkOiBfX3NwcmVhZFxufTtcblxuLy8gVE9ETzogRml4IHRlc3RzIHNvIHRoYXQgdGhpcyBkZXByZWNhdGlvbiB3YXJuaW5nIGRvZXNuJ3QgY2F1c2UgZmFpbHVyZXMuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBpZiAoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhY3QsICdQcm9wVHlwZXMnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZGlkV2FyblByb3BUeXBlc0RlcHJlY2F0ZWQsICdBY2Nlc3NpbmcgUHJvcFR5cGVzIHZpYSB0aGUgbWFpbiBSZWFjdCBwYWNrYWdlIGlzIGRlcHJlY2F0ZWQuIFVzZSAnICsgJ3RoZSBwcm9wLXR5cGVzIHBhY2thZ2UgZnJvbSBucG0gaW5zdGVhZC4nKSA6IHZvaWQgMDtcbiAgICAgICAgZGlkV2FyblByb3BUeXBlc0RlcHJlY2F0ZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gUmVhY3RQcm9wVHlwZXM7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3QvbGliL1JlYWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA4M1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUG9vbGVkQ2xhc3MgPSByZXF1aXJlKCcuL1Bvb2xlZENsYXNzJyk7XG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eUZ1bmN0aW9uJyk7XG52YXIgdHJhdmVyc2VBbGxDaGlsZHJlbiA9IHJlcXVpcmUoJy4vdHJhdmVyc2VBbGxDaGlsZHJlbicpO1xuXG52YXIgdHdvQXJndW1lbnRQb29sZXIgPSBQb29sZWRDbGFzcy50d29Bcmd1bWVudFBvb2xlcjtcbnZhciBmb3VyQXJndW1lbnRQb29sZXIgPSBQb29sZWRDbGFzcy5mb3VyQXJndW1lbnRQb29sZXI7XG5cbnZhciB1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCA9IC9cXC8rL2c7XG5mdW5jdGlvbiBlc2NhcGVVc2VyUHJvdmlkZWRLZXkodGV4dCkge1xuICByZXR1cm4gKCcnICsgdGV4dCkucmVwbGFjZSh1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCwgJyQmLycpO1xufVxuXG4vKipcbiAqIFBvb2xlZENsYXNzIHJlcHJlc2VudGluZyB0aGUgYm9va2tlZXBpbmcgYXNzb2NpYXRlZCB3aXRoIHBlcmZvcm1pbmcgYSBjaGlsZFxuICogdHJhdmVyc2FsLiBBbGxvd3MgYXZvaWRpbmcgYmluZGluZyBjYWxsYmFja3MuXG4gKlxuICogQGNvbnN0cnVjdG9yIEZvckVhY2hCb29rS2VlcGluZ1xuICogQHBhcmFtIHshZnVuY3Rpb259IGZvckVhY2hGdW5jdGlvbiBGdW5jdGlvbiB0byBwZXJmb3JtIHRyYXZlcnNhbCB3aXRoLlxuICogQHBhcmFtIHs/Kn0gZm9yRWFjaENvbnRleHQgQ29udGV4dCB0byBwZXJmb3JtIGNvbnRleHQgd2l0aC5cbiAqL1xuZnVuY3Rpb24gRm9yRWFjaEJvb2tLZWVwaW5nKGZvckVhY2hGdW5jdGlvbiwgZm9yRWFjaENvbnRleHQpIHtcbiAgdGhpcy5mdW5jID0gZm9yRWFjaEZ1bmN0aW9uO1xuICB0aGlzLmNvbnRleHQgPSBmb3JFYWNoQ29udGV4dDtcbiAgdGhpcy5jb3VudCA9IDA7XG59XG5Gb3JFYWNoQm9va0tlZXBpbmcucHJvdG90eXBlLmRlc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZnVuYyA9IG51bGw7XG4gIHRoaXMuY29udGV4dCA9IG51bGw7XG4gIHRoaXMuY291bnQgPSAwO1xufTtcblBvb2xlZENsYXNzLmFkZFBvb2xpbmdUbyhGb3JFYWNoQm9va0tlZXBpbmcsIHR3b0FyZ3VtZW50UG9vbGVyKTtcblxuZnVuY3Rpb24gZm9yRWFjaFNpbmdsZUNoaWxkKGJvb2tLZWVwaW5nLCBjaGlsZCwgbmFtZSkge1xuICB2YXIgZnVuYyA9IGJvb2tLZWVwaW5nLmZ1bmMsXG4gICAgICBjb250ZXh0ID0gYm9va0tlZXBpbmcuY29udGV4dDtcblxuICBmdW5jLmNhbGwoY29udGV4dCwgY2hpbGQsIGJvb2tLZWVwaW5nLmNvdW50KyspO1xufVxuXG4vKipcbiAqIEl0ZXJhdGVzIHRocm91Z2ggY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jaGlsZHJlbi5mb3JlYWNoXG4gKlxuICogVGhlIHByb3ZpZGVkIGZvckVhY2hGdW5jKGNoaWxkLCBpbmRleCkgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2hcbiAqIGxlYWYgY2hpbGQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosIGludCl9IGZvckVhY2hGdW5jXG4gKiBAcGFyYW0geyp9IGZvckVhY2hDb250ZXh0IENvbnRleHQgZm9yIGZvckVhY2hDb250ZXh0LlxuICovXG5mdW5jdGlvbiBmb3JFYWNoQ2hpbGRyZW4oY2hpbGRyZW4sIGZvckVhY2hGdW5jLCBmb3JFYWNoQ29udGV4dCkge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuICB2YXIgdHJhdmVyc2VDb250ZXh0ID0gRm9yRWFjaEJvb2tLZWVwaW5nLmdldFBvb2xlZChmb3JFYWNoRnVuYywgZm9yRWFjaENvbnRleHQpO1xuICB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoU2luZ2xlQ2hpbGQsIHRyYXZlcnNlQ29udGV4dCk7XG4gIEZvckVhY2hCb29rS2VlcGluZy5yZWxlYXNlKHRyYXZlcnNlQ29udGV4dCk7XG59XG5cbi8qKlxuICogUG9vbGVkQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBib29ra2VlcGluZyBhc3NvY2lhdGVkIHdpdGggcGVyZm9ybWluZyBhIGNoaWxkXG4gKiBtYXBwaW5nLiBBbGxvd3MgYXZvaWRpbmcgYmluZGluZyBjYWxsYmFja3MuXG4gKlxuICogQGNvbnN0cnVjdG9yIE1hcEJvb2tLZWVwaW5nXG4gKiBAcGFyYW0geyEqfSBtYXBSZXN1bHQgT2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9yZGVyZWQgbWFwIG9mIHJlc3VsdHMuXG4gKiBAcGFyYW0geyFmdW5jdGlvbn0gbWFwRnVuY3Rpb24gRnVuY3Rpb24gdG8gcGVyZm9ybSBtYXBwaW5nIHdpdGguXG4gKiBAcGFyYW0gez8qfSBtYXBDb250ZXh0IENvbnRleHQgdG8gcGVyZm9ybSBtYXBwaW5nIHdpdGguXG4gKi9cbmZ1bmN0aW9uIE1hcEJvb2tLZWVwaW5nKG1hcFJlc3VsdCwga2V5UHJlZml4LCBtYXBGdW5jdGlvbiwgbWFwQ29udGV4dCkge1xuICB0aGlzLnJlc3VsdCA9IG1hcFJlc3VsdDtcbiAgdGhpcy5rZXlQcmVmaXggPSBrZXlQcmVmaXg7XG4gIHRoaXMuZnVuYyA9IG1hcEZ1bmN0aW9uO1xuICB0aGlzLmNvbnRleHQgPSBtYXBDb250ZXh0O1xuICB0aGlzLmNvdW50ID0gMDtcbn1cbk1hcEJvb2tLZWVwaW5nLnByb3RvdHlwZS5kZXN0cnVjdG9yID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnJlc3VsdCA9IG51bGw7XG4gIHRoaXMua2V5UHJlZml4ID0gbnVsbDtcbiAgdGhpcy5mdW5jID0gbnVsbDtcbiAgdGhpcy5jb250ZXh0ID0gbnVsbDtcbiAgdGhpcy5jb3VudCA9IDA7XG59O1xuUG9vbGVkQ2xhc3MuYWRkUG9vbGluZ1RvKE1hcEJvb2tLZWVwaW5nLCBmb3VyQXJndW1lbnRQb29sZXIpO1xuXG5mdW5jdGlvbiBtYXBTaW5nbGVDaGlsZEludG9Db250ZXh0KGJvb2tLZWVwaW5nLCBjaGlsZCwgY2hpbGRLZXkpIHtcbiAgdmFyIHJlc3VsdCA9IGJvb2tLZWVwaW5nLnJlc3VsdCxcbiAgICAgIGtleVByZWZpeCA9IGJvb2tLZWVwaW5nLmtleVByZWZpeCxcbiAgICAgIGZ1bmMgPSBib29rS2VlcGluZy5mdW5jLFxuICAgICAgY29udGV4dCA9IGJvb2tLZWVwaW5nLmNvbnRleHQ7XG5cblxuICB2YXIgbWFwcGVkQ2hpbGQgPSBmdW5jLmNhbGwoY29udGV4dCwgY2hpbGQsIGJvb2tLZWVwaW5nLmNvdW50KyspO1xuICBpZiAoQXJyYXkuaXNBcnJheShtYXBwZWRDaGlsZCkpIHtcbiAgICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKG1hcHBlZENoaWxkLCByZXN1bHQsIGNoaWxkS2V5LCBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQpO1xuICB9IGVsc2UgaWYgKG1hcHBlZENoaWxkICE9IG51bGwpIHtcbiAgICBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KG1hcHBlZENoaWxkKSkge1xuICAgICAgbWFwcGVkQ2hpbGQgPSBSZWFjdEVsZW1lbnQuY2xvbmVBbmRSZXBsYWNlS2V5KG1hcHBlZENoaWxkLFxuICAgICAgLy8gS2VlcCBib3RoIHRoZSAobWFwcGVkKSBhbmQgb2xkIGtleXMgaWYgdGhleSBkaWZmZXIsIGp1c3QgYXNcbiAgICAgIC8vIHRyYXZlcnNlQWxsQ2hpbGRyZW4gdXNlZCB0byBkbyBmb3Igb2JqZWN0cyBhcyBjaGlsZHJlblxuICAgICAga2V5UHJlZml4ICsgKG1hcHBlZENoaWxkLmtleSAmJiAoIWNoaWxkIHx8IGNoaWxkLmtleSAhPT0gbWFwcGVkQ2hpbGQua2V5KSA/IGVzY2FwZVVzZXJQcm92aWRlZEtleShtYXBwZWRDaGlsZC5rZXkpICsgJy8nIDogJycpICsgY2hpbGRLZXkpO1xuICAgIH1cbiAgICByZXN1bHQucHVzaChtYXBwZWRDaGlsZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgYXJyYXksIHByZWZpeCwgZnVuYywgY29udGV4dCkge1xuICB2YXIgZXNjYXBlZFByZWZpeCA9ICcnO1xuICBpZiAocHJlZml4ICE9IG51bGwpIHtcbiAgICBlc2NhcGVkUHJlZml4ID0gZXNjYXBlVXNlclByb3ZpZGVkS2V5KHByZWZpeCkgKyAnLyc7XG4gIH1cbiAgdmFyIHRyYXZlcnNlQ29udGV4dCA9IE1hcEJvb2tLZWVwaW5nLmdldFBvb2xlZChhcnJheSwgZXNjYXBlZFByZWZpeCwgZnVuYywgY29udGV4dCk7XG4gIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIG1hcFNpbmdsZUNoaWxkSW50b0NvbnRleHQsIHRyYXZlcnNlQ29udGV4dCk7XG4gIE1hcEJvb2tLZWVwaW5nLnJlbGVhc2UodHJhdmVyc2VDb250ZXh0KTtcbn1cblxuLyoqXG4gKiBNYXBzIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4ubWFwXG4gKlxuICogVGhlIHByb3ZpZGVkIG1hcEZ1bmN0aW9uKGNoaWxkLCBrZXksIGluZGV4KSB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaFxuICogbGVhZiBjaGlsZC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgaW50KX0gZnVuYyBUaGUgbWFwIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IENvbnRleHQgZm9yIG1hcEZ1bmN0aW9uLlxuICogQHJldHVybiB7b2JqZWN0fSBPYmplY3QgY29udGFpbmluZyB0aGUgb3JkZXJlZCBtYXAgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gbWFwQ2hpbGRyZW4oY2hpbGRyZW4sIGZ1bmMsIGNvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCByZXN1bHQsIG51bGwsIGZ1bmMsIGNvbnRleHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBmb3JFYWNoU2luZ2xlQ2hpbGREdW1teSh0cmF2ZXJzZUNvbnRleHQsIGNoaWxkLCBuYW1lKSB7XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIENvdW50IHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhc1xuICogYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4uY291bnRcbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbi5cbiAqL1xuZnVuY3Rpb24gY291bnRDaGlsZHJlbihjaGlsZHJlbiwgY29udGV4dCkge1xuICByZXR1cm4gdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgZm9yRWFjaFNpbmdsZUNoaWxkRHVtbXksIG51bGwpO1xufVxuXG4vKipcbiAqIEZsYXR0ZW4gYSBjaGlsZHJlbiBvYmplY3QgKHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYCkgYW5kXG4gKiByZXR1cm4gYW4gYXJyYXkgd2l0aCBhcHByb3ByaWF0ZWx5IHJlLWtleWVkIGNoaWxkcmVuLlxuICpcbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jaGlsZHJlbi50b2FycmF5XG4gKi9cbmZ1bmN0aW9uIHRvQXJyYXkoY2hpbGRyZW4pIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCByZXN1bHQsIG51bGwsIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbnZhciBSZWFjdENoaWxkcmVuID0ge1xuICBmb3JFYWNoOiBmb3JFYWNoQ2hpbGRyZW4sXG4gIG1hcDogbWFwQ2hpbGRyZW4sXG4gIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWw6IG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwsXG4gIGNvdW50OiBjb3VudENoaWxkcmVuLFxuICB0b0FycmF5OiB0b0FycmF5XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q2hpbGRyZW47XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0L2xpYi9SZWFjdENoaWxkcmVuLmpzXG4vLyBtb2R1bGUgaWQgPSA4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpLFxuICAgIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vUmVhY3RDb21wb25lbnQnKTtcbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcycpO1xudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0gcmVxdWlyZSgnLi9SZWFjdE5vb3BVcGRhdGVRdWV1ZScpO1xuXG52YXIgZW1wdHlPYmplY3QgPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eU9iamVjdCcpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbnZhciBNSVhJTlNfS0VZID0gJ21peGlucyc7XG5cbi8vIEhlbHBlciBmdW5jdGlvbiB0byBhbGxvdyB0aGUgY3JlYXRpb24gb2YgYW5vbnltb3VzIGZ1bmN0aW9ucyB3aGljaCBkbyBub3Rcbi8vIGhhdmUgLm5hbWUgc2V0IHRvIHRoZSBuYW1lIG9mIHRoZSB2YXJpYWJsZSBiZWluZyBhc3NpZ25lZCB0by5cbmZ1bmN0aW9uIGlkZW50aXR5KGZuKSB7XG4gIHJldHVybiBmbjtcbn1cblxuLyoqXG4gKiBQb2xpY2llcyB0aGF0IGRlc2NyaWJlIG1ldGhvZHMgaW4gYFJlYWN0Q2xhc3NJbnRlcmZhY2VgLlxuICovXG5cblxudmFyIGluamVjdGVkTWl4aW5zID0gW107XG5cbi8qKlxuICogQ29tcG9zaXRlIGNvbXBvbmVudHMgYXJlIGhpZ2hlci1sZXZlbCBjb21wb25lbnRzIHRoYXQgY29tcG9zZSBvdGhlciBjb21wb3NpdGVcbiAqIG9yIGhvc3QgY29tcG9uZW50cy5cbiAqXG4gKiBUbyBjcmVhdGUgYSBuZXcgdHlwZSBvZiBgUmVhY3RDbGFzc2AsIHBhc3MgYSBzcGVjaWZpY2F0aW9uIG9mXG4gKiB5b3VyIG5ldyBjbGFzcyB0byBgUmVhY3QuY3JlYXRlQ2xhc3NgLiBUaGUgb25seSByZXF1aXJlbWVudCBvZiB5b3VyIGNsYXNzXG4gKiBzcGVjaWZpY2F0aW9uIGlzIHRoYXQgeW91IGltcGxlbWVudCBhIGByZW5kZXJgIG1ldGhvZC5cbiAqXG4gKiAgIHZhciBNeUNvbXBvbmVudCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICogICAgICAgcmV0dXJuIDxkaXY+SGVsbG8gV29ybGQ8L2Rpdj47XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiBUaGUgY2xhc3Mgc3BlY2lmaWNhdGlvbiBzdXBwb3J0cyBhIHNwZWNpZmljIHByb3RvY29sIG9mIG1ldGhvZHMgdGhhdCBoYXZlXG4gKiBzcGVjaWFsIG1lYW5pbmcgKGUuZy4gYHJlbmRlcmApLiBTZWUgYFJlYWN0Q2xhc3NJbnRlcmZhY2VgIGZvclxuICogbW9yZSB0aGUgY29tcHJlaGVuc2l2ZSBwcm90b2NvbC4gQW55IG90aGVyIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMgaW4gdGhlXG4gKiBjbGFzcyBzcGVjaWZpY2F0aW9uIHdpbGwgYmUgYXZhaWxhYmxlIG9uIHRoZSBwcm90b3R5cGUuXG4gKlxuICogQGludGVyZmFjZSBSZWFjdENsYXNzSW50ZXJmYWNlXG4gKiBAaW50ZXJuYWxcbiAqL1xudmFyIFJlYWN0Q2xhc3NJbnRlcmZhY2UgPSB7XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIE1peGluIG9iamVjdHMgdG8gaW5jbHVkZSB3aGVuIGRlZmluaW5nIHlvdXIgY29tcG9uZW50LlxuICAgKlxuICAgKiBAdHlwZSB7YXJyYXl9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgbWl4aW5zOiAnREVGSU5FX01BTlknLFxuXG4gIC8qKlxuICAgKiBBbiBvYmplY3QgY29udGFpbmluZyBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIHRoYXQgc2hvdWxkIGJlIGRlZmluZWQgb25cbiAgICogdGhlIGNvbXBvbmVudCdzIGNvbnN0cnVjdG9yIGluc3RlYWQgb2YgaXRzIHByb3RvdHlwZSAoc3RhdGljIG1ldGhvZHMpLlxuICAgKlxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIHN0YXRpY3M6ICdERUZJTkVfTUFOWScsXG5cbiAgLyoqXG4gICAqIERlZmluaXRpb24gb2YgcHJvcCB0eXBlcyBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAqXG4gICAqIEB0eXBlIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgcHJvcFR5cGVzOiAnREVGSU5FX01BTlknLFxuXG4gIC8qKlxuICAgKiBEZWZpbml0aW9uIG9mIGNvbnRleHQgdHlwZXMgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgKlxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbnRleHRUeXBlczogJ0RFRklORV9NQU5ZJyxcblxuICAvKipcbiAgICogRGVmaW5pdGlvbiBvZiBjb250ZXh0IHR5cGVzIHRoaXMgY29tcG9uZW50IHNldHMgZm9yIGl0cyBjaGlsZHJlbi5cbiAgICpcbiAgICogQHR5cGUge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjaGlsZENvbnRleHRUeXBlczogJ0RFRklORV9NQU5ZJyxcblxuICAvLyA9PT09IERlZmluaXRpb24gbWV0aG9kcyA9PT09XG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIG1vdW50ZWQuIFZhbHVlcyBpbiB0aGUgbWFwcGluZyB3aWxsIGJlIHNldCBvblxuICAgKiBgdGhpcy5wcm9wc2AgaWYgdGhhdCBwcm9wIGlzIG5vdCBzcGVjaWZpZWQgKGkuZS4gdXNpbmcgYW4gYGluYCBjaGVjaykuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGludm9rZWQgYmVmb3JlIGBnZXRJbml0aWFsU3RhdGVgIGFuZCB0aGVyZWZvcmUgY2Fubm90IHJlbHlcbiAgICogb24gYHRoaXMuc3RhdGVgIG9yIHVzZSBgdGhpcy5zZXRTdGF0ZWAuXG4gICAqXG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBnZXREZWZhdWx0UHJvcHM6ICdERUZJTkVfTUFOWV9NRVJHRUQnLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIG9uY2UgYmVmb3JlIHRoZSBjb21wb25lbnQgaXMgbW91bnRlZC4gVGhlIHJldHVybiB2YWx1ZSB3aWxsIGJlIHVzZWRcbiAgICogYXMgdGhlIGluaXRpYWwgdmFsdWUgb2YgYHRoaXMuc3RhdGVgLlxuICAgKlxuICAgKiAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAqICAgICByZXR1cm4ge1xuICAgKiAgICAgICBpc09uOiBmYWxzZSxcbiAgICogICAgICAgZm9vQmF6OiBuZXcgQmF6Rm9vKClcbiAgICogICAgIH1cbiAgICogICB9XG4gICAqXG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBnZXRJbml0aWFsU3RhdGU6ICdERUZJTkVfTUFOWV9NRVJHRUQnLFxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgZ2V0Q2hpbGRDb250ZXh0OiAnREVGSU5FX01BTllfTUVSR0VEJyxcblxuICAvKipcbiAgICogVXNlcyBwcm9wcyBmcm9tIGB0aGlzLnByb3BzYCBhbmQgc3RhdGUgZnJvbSBgdGhpcy5zdGF0ZWAgdG8gcmVuZGVyIHRoZVxuICAgKiBzdHJ1Y3R1cmUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICpcbiAgICogTm8gZ3VhcmFudGVlcyBhcmUgbWFkZSBhYm91dCB3aGVuIG9yIGhvdyBvZnRlbiB0aGlzIG1ldGhvZCBpcyBpbnZva2VkLCBzb1xuICAgKiBpdCBtdXN0IG5vdCBoYXZlIHNpZGUgZWZmZWN0cy5cbiAgICpcbiAgICogICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgKiAgICAgdmFyIG5hbWUgPSB0aGlzLnByb3BzLm5hbWU7XG4gICAqICAgICByZXR1cm4gPGRpdj5IZWxsbywge25hbWV9ITwvZGl2PjtcbiAgICogICB9XG4gICAqXG4gICAqIEByZXR1cm4ge1JlYWN0Q29tcG9uZW50fVxuICAgKiBAcmVxdWlyZWRcbiAgICovXG4gIHJlbmRlcjogJ0RFRklORV9PTkNFJyxcblxuICAvLyA9PT09IERlbGVnYXRlIG1ldGhvZHMgPT09PVxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBpbml0aWFsbHkgY3JlYXRlZCBhbmQgYWJvdXQgdG8gYmUgbW91bnRlZC5cbiAgICogVGhpcyBtYXkgaGF2ZSBzaWRlIGVmZmVjdHMsIGJ1dCBhbnkgZXh0ZXJuYWwgc3Vic2NyaXB0aW9ucyBvciBkYXRhIGNyZWF0ZWRcbiAgICogYnkgdGhpcyBtZXRob2QgbXVzdCBiZSBjbGVhbmVkIHVwIGluIGBjb21wb25lbnRXaWxsVW5tb3VudGAuXG4gICAqXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50V2lsbE1vdW50OiAnREVGSU5FX01BTlknLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBtb3VudGVkIGFuZCBoYXMgYSBET00gcmVwcmVzZW50YXRpb24uXG4gICAqIEhvd2V2ZXIsIHRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IHRoZSBET00gbm9kZSBpcyBpbiB0aGUgZG9jdW1lbnQuXG4gICAqXG4gICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIG9wZXJhdGUgb24gdGhlIERPTSB3aGVuIHRoZSBjb21wb25lbnQgaGFzXG4gICAqIGJlZW4gbW91bnRlZCAoaW5pdGlhbGl6ZWQgYW5kIHJlbmRlcmVkKSBmb3IgdGhlIGZpcnN0IHRpbWUuXG4gICAqXG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gcm9vdE5vZGUgRE9NIGVsZW1lbnQgcmVwcmVzZW50aW5nIHRoZSBjb21wb25lbnQuXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50RGlkTW91bnQ6ICdERUZJTkVfTUFOWScsXG5cbiAgLyoqXG4gICAqIEludm9rZWQgYmVmb3JlIHRoZSBjb21wb25lbnQgcmVjZWl2ZXMgbmV3IHByb3BzLlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byByZWFjdCB0byBhIHByb3AgdHJhbnNpdGlvbiBieSB1cGRhdGluZyB0aGVcbiAgICogc3RhdGUgdXNpbmcgYHRoaXMuc2V0U3RhdGVgLiBDdXJyZW50IHByb3BzIGFyZSBhY2Nlc3NlZCB2aWEgYHRoaXMucHJvcHNgLlxuICAgKlxuICAgKiAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dENvbnRleHQpIHtcbiAgICogICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgKiAgICAgICBsaWtlc0luY3JlYXNpbmc6IG5leHRQcm9wcy5saWtlQ291bnQgPiB0aGlzLnByb3BzLmxpa2VDb3VudFxuICAgKiAgICAgfSk7XG4gICAqICAgfVxuICAgKlxuICAgKiBOT1RFOiBUaGVyZSBpcyBubyBlcXVpdmFsZW50IGBjb21wb25lbnRXaWxsUmVjZWl2ZVN0YXRlYC4gQW4gaW5jb21pbmcgcHJvcFxuICAgKiB0cmFuc2l0aW9uIG1heSBjYXVzZSBhIHN0YXRlIGNoYW5nZSwgYnV0IHRoZSBvcHBvc2l0ZSBpcyBub3QgdHJ1ZS4gSWYgeW91XG4gICAqIG5lZWQgaXQsIHlvdSBhcmUgcHJvYmFibHkgbG9va2luZyBmb3IgYGNvbXBvbmVudFdpbGxVcGRhdGVgLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gbmV4dFByb3BzXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogJ0RFRklORV9NQU5ZJyxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGlsZSBkZWNpZGluZyBpZiB0aGUgY29tcG9uZW50IHNob3VsZCBiZSB1cGRhdGVkIGFzIGEgcmVzdWx0IG9mXG4gICAqIHJlY2VpdmluZyBuZXcgcHJvcHMsIHN0YXRlIGFuZC9vciBjb250ZXh0LlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBgcmV0dXJuIGZhbHNlYCB3aGVuIHlvdSdyZSBjZXJ0YWluIHRoYXQgdGhlXG4gICAqIHRyYW5zaXRpb24gdG8gdGhlIG5ldyBwcm9wcy9zdGF0ZS9jb250ZXh0IHdpbGwgbm90IHJlcXVpcmUgYSBjb21wb25lbnRcbiAgICogdXBkYXRlLlxuICAgKlxuICAgKiAgIHNob3VsZENvbXBvbmVudFVwZGF0ZTogZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KSB7XG4gICAqICAgICByZXR1cm4gIWVxdWFsKG5leHRQcm9wcywgdGhpcy5wcm9wcykgfHxcbiAgICogICAgICAgIWVxdWFsKG5leHRTdGF0ZSwgdGhpcy5zdGF0ZSkgfHxcbiAgICogICAgICAgIWVxdWFsKG5leHRDb250ZXh0LCB0aGlzLmNvbnRleHQpO1xuICAgKiAgIH1cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG5leHRQcm9wc1xuICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRTdGF0ZVxuICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRDb250ZXh0XG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIGNvbXBvbmVudCBzaG91bGQgdXBkYXRlLlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZTogJ0RFRklORV9PTkNFJyxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgYWJvdXQgdG8gdXBkYXRlIGR1ZSB0byBhIHRyYW5zaXRpb24gZnJvbVxuICAgKiBgdGhpcy5wcm9wc2AsIGB0aGlzLnN0YXRlYCBhbmQgYHRoaXMuY29udGV4dGAgdG8gYG5leHRQcm9wc2AsIGBuZXh0U3RhdGVgXG4gICAqIGFuZCBgbmV4dENvbnRleHRgLlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBwZXJmb3JtIHByZXBhcmF0aW9uIGJlZm9yZSBhbiB1cGRhdGUgb2NjdXJzLlxuICAgKlxuICAgKiBOT1RFOiBZb3UgKipjYW5ub3QqKiB1c2UgYHRoaXMuc2V0U3RhdGUoKWAgaW4gdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXh0UHJvcHNcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0U3RhdGVcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0Q29udGV4dFxuICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50V2lsbFVwZGF0ZTogJ0RFRklORV9NQU5ZJyxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQncyBET00gcmVwcmVzZW50YXRpb24gaGFzIGJlZW4gdXBkYXRlZC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gb3BlcmF0ZSBvbiB0aGUgRE9NIHdoZW4gdGhlIGNvbXBvbmVudCBoYXNcbiAgICogYmVlbiB1cGRhdGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gcHJldlByb3BzXG4gICAqIEBwYXJhbSB7P29iamVjdH0gcHJldlN0YXRlXG4gICAqIEBwYXJhbSB7P29iamVjdH0gcHJldkNvbnRleHRcbiAgICogQHBhcmFtIHtET01FbGVtZW50fSByb290Tm9kZSBET00gZWxlbWVudCByZXByZXNlbnRpbmcgdGhlIGNvbXBvbmVudC5cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb21wb25lbnREaWRVcGRhdGU6ICdERUZJTkVfTUFOWScsXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGFib3V0IHRvIGJlIHJlbW92ZWQgZnJvbSBpdHMgcGFyZW50IGFuZCBoYXZlXG4gICAqIGl0cyBET00gcmVwcmVzZW50YXRpb24gZGVzdHJveWVkLlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBkZWFsbG9jYXRlIGFueSBleHRlcm5hbCByZXNvdXJjZXMuXG4gICAqXG4gICAqIE5PVEU6IFRoZXJlIGlzIG5vIGBjb21wb25lbnREaWRVbm1vdW50YCBzaW5jZSB5b3VyIGNvbXBvbmVudCB3aWxsIGhhdmUgYmVlblxuICAgKiBkZXN0cm95ZWQgYnkgdGhhdCBwb2ludC5cbiAgICpcbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb21wb25lbnRXaWxsVW5tb3VudDogJ0RFRklORV9NQU5ZJyxcblxuICAvLyA9PT09IEFkdmFuY2VkIG1ldGhvZHMgPT09PVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBjb21wb25lbnQncyBjdXJyZW50bHkgbW91bnRlZCBET00gcmVwcmVzZW50YXRpb24uXG4gICAqXG4gICAqIEJ5IGRlZmF1bHQsIHRoaXMgaW1wbGVtZW50cyBSZWFjdCdzIHJlbmRlcmluZyBhbmQgcmVjb25jaWxpYXRpb24gYWxnb3JpdGhtLlxuICAgKiBTb3BoaXN0aWNhdGVkIGNsaWVudHMgbWF5IHdpc2ggdG8gb3ZlcnJpZGUgdGhpcy5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAaW50ZXJuYWxcbiAgICogQG92ZXJyaWRhYmxlXG4gICAqL1xuICB1cGRhdGVDb21wb25lbnQ6ICdPVkVSUklERV9CQVNFJ1xuXG59O1xuXG4vKipcbiAqIE1hcHBpbmcgZnJvbSBjbGFzcyBzcGVjaWZpY2F0aW9uIGtleXMgdG8gc3BlY2lhbCBwcm9jZXNzaW5nIGZ1bmN0aW9ucy5cbiAqXG4gKiBBbHRob3VnaCB0aGVzZSBhcmUgZGVjbGFyZWQgbGlrZSBpbnN0YW5jZSBwcm9wZXJ0aWVzIGluIHRoZSBzcGVjaWZpY2F0aW9uXG4gKiB3aGVuIGRlZmluaW5nIGNsYXNzZXMgdXNpbmcgYFJlYWN0LmNyZWF0ZUNsYXNzYCwgdGhleSBhcmUgYWN0dWFsbHkgc3RhdGljXG4gKiBhbmQgYXJlIGFjY2Vzc2libGUgb24gdGhlIGNvbnN0cnVjdG9yIGluc3RlYWQgb2YgdGhlIHByb3RvdHlwZS4gRGVzcGl0ZVxuICogYmVpbmcgc3RhdGljLCB0aGV5IG11c3QgYmUgZGVmaW5lZCBvdXRzaWRlIG9mIHRoZSBcInN0YXRpY3NcIiBrZXkgdW5kZXJcbiAqIHdoaWNoIGFsbCBvdGhlciBzdGF0aWMgbWV0aG9kcyBhcmUgZGVmaW5lZC5cbiAqL1xudmFyIFJFU0VSVkVEX1NQRUNfS0VZUyA9IHtcbiAgZGlzcGxheU5hbWU6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgZGlzcGxheU5hbWUpIHtcbiAgICBDb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSA9IGRpc3BsYXlOYW1lO1xuICB9LFxuICBtaXhpbnM6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgbWl4aW5zKSB7XG4gICAgaWYgKG1peGlucykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtaXhpbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbWl4U3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIG1peGluc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBjaGlsZENvbnRleHRUeXBlczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBjaGlsZENvbnRleHRUeXBlcykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIGNoaWxkQ29udGV4dFR5cGVzLCAnY2hpbGRDb250ZXh0Jyk7XG4gICAgfVxuICAgIENvbnN0cnVjdG9yLmNoaWxkQ29udGV4dFR5cGVzID0gX2Fzc2lnbih7fSwgQ29uc3RydWN0b3IuY2hpbGRDb250ZXh0VHlwZXMsIGNoaWxkQ29udGV4dFR5cGVzKTtcbiAgfSxcbiAgY29udGV4dFR5cGVzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGNvbnRleHRUeXBlcykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIGNvbnRleHRUeXBlcywgJ2NvbnRleHQnKTtcbiAgICB9XG4gICAgQ29uc3RydWN0b3IuY29udGV4dFR5cGVzID0gX2Fzc2lnbih7fSwgQ29uc3RydWN0b3IuY29udGV4dFR5cGVzLCBjb250ZXh0VHlwZXMpO1xuICB9LFxuICAvKipcbiAgICogU3BlY2lhbCBjYXNlIGdldERlZmF1bHRQcm9wcyB3aGljaCBzaG91bGQgbW92ZSBpbnRvIHN0YXRpY3MgYnV0IHJlcXVpcmVzXG4gICAqIGF1dG9tYXRpYyBtZXJnaW5nLlxuICAgKi9cbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGdldERlZmF1bHRQcm9wcykge1xuICAgIGlmIChDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMpIHtcbiAgICAgIENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcyA9IGNyZWF0ZU1lcmdlZFJlc3VsdEZ1bmN0aW9uKENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcywgZ2V0RGVmYXVsdFByb3BzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzID0gZ2V0RGVmYXVsdFByb3BzO1xuICAgIH1cbiAgfSxcbiAgcHJvcFR5cGVzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3BUeXBlcykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIHByb3BUeXBlcywgJ3Byb3AnKTtcbiAgICB9XG4gICAgQ29uc3RydWN0b3IucHJvcFR5cGVzID0gX2Fzc2lnbih7fSwgQ29uc3RydWN0b3IucHJvcFR5cGVzLCBwcm9wVHlwZXMpO1xuICB9LFxuICBzdGF0aWNzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHN0YXRpY3MpIHtcbiAgICBtaXhTdGF0aWNTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3Rvciwgc3RhdGljcyk7XG4gIH0sXG4gIGF1dG9iaW5kOiBmdW5jdGlvbiAoKSB7fSB9O1xuXG5mdW5jdGlvbiB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIHR5cGVEZWYsIGxvY2F0aW9uKSB7XG4gIGZvciAodmFyIHByb3BOYW1lIGluIHR5cGVEZWYpIHtcbiAgICBpZiAodHlwZURlZi5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgIC8vIHVzZSBhIHdhcm5pbmcgaW5zdGVhZCBvZiBhbiBpbnZhcmlhbnQgc28gY29tcG9uZW50c1xuICAgICAgLy8gZG9uJ3Qgc2hvdyB1cCBpbiBwcm9kIGJ1dCBvbmx5IGluIF9fREVWX19cbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHR5cGVvZiB0eXBlRGVmW3Byb3BOYW1lXSA9PT0gJ2Z1bmN0aW9uJywgJyVzOiAlcyB0eXBlIGAlc2AgaXMgaW52YWxpZDsgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gJyArICdSZWFjdC5Qcm9wVHlwZXMuJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q2xhc3MnLCBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl0sIHByb3BOYW1lKSA6IHZvaWQgMDtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVNZXRob2RPdmVycmlkZShpc0FscmVhZHlEZWZpbmVkLCBuYW1lKSB7XG4gIHZhciBzcGVjUG9saWN5ID0gUmVhY3RDbGFzc0ludGVyZmFjZS5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/IFJlYWN0Q2xhc3NJbnRlcmZhY2VbbmFtZV0gOiBudWxsO1xuXG4gIC8vIERpc2FsbG93IG92ZXJyaWRpbmcgb2YgYmFzZSBjbGFzcyBtZXRob2RzIHVubGVzcyBleHBsaWNpdGx5IGFsbG93ZWQuXG4gIGlmIChSZWFjdENsYXNzTWl4aW4uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAhKHNwZWNQb2xpY3kgPT09ICdPVkVSUklERV9CQVNFJykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzc0ludGVyZmFjZTogWW91IGFyZSBhdHRlbXB0aW5nIHRvIG92ZXJyaWRlIGAlc2AgZnJvbSB5b3VyIGNsYXNzIHNwZWNpZmljYXRpb24uIEVuc3VyZSB0aGF0IHlvdXIgbWV0aG9kIG5hbWVzIGRvIG5vdCBvdmVybGFwIHdpdGggUmVhY3QgbWV0aG9kcy4nLCBuYW1lKSA6IF9wcm9kSW52YXJpYW50KCc3MycsIG5hbWUpIDogdm9pZCAwO1xuICB9XG5cbiAgLy8gRGlzYWxsb3cgZGVmaW5pbmcgbWV0aG9kcyBtb3JlIHRoYW4gb25jZSB1bmxlc3MgZXhwbGljaXRseSBhbGxvd2VkLlxuICBpZiAoaXNBbHJlYWR5RGVmaW5lZCkge1xuICAgICEoc3BlY1BvbGljeSA9PT0gJ0RFRklORV9NQU5ZJyB8fCBzcGVjUG9saWN5ID09PSAnREVGSU5FX01BTllfTUVSR0VEJykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzc0ludGVyZmFjZTogWW91IGFyZSBhdHRlbXB0aW5nIHRvIGRlZmluZSBgJXNgIG9uIHlvdXIgY29tcG9uZW50IG1vcmUgdGhhbiBvbmNlLiBUaGlzIGNvbmZsaWN0IG1heSBiZSBkdWUgdG8gYSBtaXhpbi4nLCBuYW1lKSA6IF9wcm9kSW52YXJpYW50KCc3NCcsIG5hbWUpIDogdm9pZCAwO1xuICB9XG59XG5cbi8qKlxuICogTWl4aW4gaGVscGVyIHdoaWNoIGhhbmRsZXMgcG9saWN5IHZhbGlkYXRpb24gYW5kIHJlc2VydmVkXG4gKiBzcGVjaWZpY2F0aW9uIGtleXMgd2hlbiBidWlsZGluZyBSZWFjdCBjbGFzc2VzLlxuICovXG5mdW5jdGlvbiBtaXhTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3Rvciwgc3BlYykge1xuICBpZiAoIXNwZWMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIHR5cGVvZlNwZWMgPSB0eXBlb2Ygc3BlYztcbiAgICAgIHZhciBpc01peGluVmFsaWQgPSB0eXBlb2ZTcGVjID09PSAnb2JqZWN0JyAmJiBzcGVjICE9PSBudWxsO1xuXG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhpc01peGluVmFsaWQsICclczogWW91XFwncmUgYXR0ZW1wdGluZyB0byBpbmNsdWRlIGEgbWl4aW4gdGhhdCBpcyBlaXRoZXIgbnVsbCAnICsgJ29yIG5vdCBhbiBvYmplY3QuIENoZWNrIHRoZSBtaXhpbnMgaW5jbHVkZWQgYnkgdGhlIGNvbXBvbmVudCwgJyArICdhcyB3ZWxsIGFzIGFueSBtaXhpbnMgdGhleSBpbmNsdWRlIHRoZW1zZWx2ZXMuICcgKyAnRXhwZWN0ZWQgb2JqZWN0IGJ1dCBnb3QgJXMuJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q2xhc3MnLCBzcGVjID09PSBudWxsID8gbnVsbCA6IHR5cGVvZlNwZWMpIDogdm9pZCAwO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuXG4gICEodHlwZW9mIHNwZWMgIT09ICdmdW5jdGlvbicpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3M6IFlvdVxcJ3JlIGF0dGVtcHRpbmcgdG8gdXNlIGEgY29tcG9uZW50IGNsYXNzIG9yIGZ1bmN0aW9uIGFzIGEgbWl4aW4uIEluc3RlYWQsIGp1c3QgdXNlIGEgcmVndWxhciBvYmplY3QuJykgOiBfcHJvZEludmFyaWFudCgnNzUnKSA6IHZvaWQgMDtcbiAgISFSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoc3BlYykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogWW91XFwncmUgYXR0ZW1wdGluZyB0byB1c2UgYSBjb21wb25lbnQgYXMgYSBtaXhpbi4gSW5zdGVhZCwganVzdCB1c2UgYSByZWd1bGFyIG9iamVjdC4nKSA6IF9wcm9kSW52YXJpYW50KCc3NicpIDogdm9pZCAwO1xuXG4gIHZhciBwcm90byA9IENvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgdmFyIGF1dG9CaW5kUGFpcnMgPSBwcm90by5fX3JlYWN0QXV0b0JpbmRQYWlycztcblxuICAvLyBCeSBoYW5kbGluZyBtaXhpbnMgYmVmb3JlIGFueSBvdGhlciBwcm9wZXJ0aWVzLCB3ZSBlbnN1cmUgdGhlIHNhbWVcbiAgLy8gY2hhaW5pbmcgb3JkZXIgaXMgYXBwbGllZCB0byBtZXRob2RzIHdpdGggREVGSU5FX01BTlkgcG9saWN5LCB3aGV0aGVyXG4gIC8vIG1peGlucyBhcmUgbGlzdGVkIGJlZm9yZSBvciBhZnRlciB0aGVzZSBtZXRob2RzIGluIHRoZSBzcGVjLlxuICBpZiAoc3BlYy5oYXNPd25Qcm9wZXJ0eShNSVhJTlNfS0VZKSkge1xuICAgIFJFU0VSVkVEX1NQRUNfS0VZUy5taXhpbnMoQ29uc3RydWN0b3IsIHNwZWMubWl4aW5zKTtcbiAgfVxuXG4gIGZvciAodmFyIG5hbWUgaW4gc3BlYykge1xuICAgIGlmICghc3BlYy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKG5hbWUgPT09IE1JWElOU19LRVkpIHtcbiAgICAgIC8vIFdlIGhhdmUgYWxyZWFkeSBoYW5kbGVkIG1peGlucyBpbiBhIHNwZWNpYWwgY2FzZSBhYm92ZS5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBwcm9wZXJ0eSA9IHNwZWNbbmFtZV07XG4gICAgdmFyIGlzQWxyZWFkeURlZmluZWQgPSBwcm90by5oYXNPd25Qcm9wZXJ0eShuYW1lKTtcbiAgICB2YWxpZGF0ZU1ldGhvZE92ZXJyaWRlKGlzQWxyZWFkeURlZmluZWQsIG5hbWUpO1xuXG4gICAgaWYgKFJFU0VSVkVEX1NQRUNfS0VZUy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgUkVTRVJWRURfU1BFQ19LRVlTW25hbWVdKENvbnN0cnVjdG9yLCBwcm9wZXJ0eSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNldHVwIG1ldGhvZHMgb24gcHJvdG90eXBlOlxuICAgICAgLy8gVGhlIGZvbGxvd2luZyBtZW1iZXIgbWV0aG9kcyBzaG91bGQgbm90IGJlIGF1dG9tYXRpY2FsbHkgYm91bmQ6XG4gICAgICAvLyAxLiBFeHBlY3RlZCBSZWFjdENsYXNzIG1ldGhvZHMgKGluIHRoZSBcImludGVyZmFjZVwiKS5cbiAgICAgIC8vIDIuIE92ZXJyaWRkZW4gbWV0aG9kcyAodGhhdCB3ZXJlIG1peGVkIGluKS5cbiAgICAgIHZhciBpc1JlYWN0Q2xhc3NNZXRob2QgPSBSZWFjdENsYXNzSW50ZXJmYWNlLmhhc093blByb3BlcnR5KG5hbWUpO1xuICAgICAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2YgcHJvcGVydHkgPT09ICdmdW5jdGlvbic7XG4gICAgICB2YXIgc2hvdWxkQXV0b0JpbmQgPSBpc0Z1bmN0aW9uICYmICFpc1JlYWN0Q2xhc3NNZXRob2QgJiYgIWlzQWxyZWFkeURlZmluZWQgJiYgc3BlYy5hdXRvYmluZCAhPT0gZmFsc2U7XG5cbiAgICAgIGlmIChzaG91bGRBdXRvQmluZCkge1xuICAgICAgICBhdXRvQmluZFBhaXJzLnB1c2gobmFtZSwgcHJvcGVydHkpO1xuICAgICAgICBwcm90b1tuYW1lXSA9IHByb3BlcnR5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzQWxyZWFkeURlZmluZWQpIHtcbiAgICAgICAgICB2YXIgc3BlY1BvbGljeSA9IFJlYWN0Q2xhc3NJbnRlcmZhY2VbbmFtZV07XG5cbiAgICAgICAgICAvLyBUaGVzZSBjYXNlcyBzaG91bGQgYWxyZWFkeSBiZSBjYXVnaHQgYnkgdmFsaWRhdGVNZXRob2RPdmVycmlkZS5cbiAgICAgICAgICAhKGlzUmVhY3RDbGFzc01ldGhvZCAmJiAoc3BlY1BvbGljeSA9PT0gJ0RFRklORV9NQU5ZX01FUkdFRCcgfHwgc3BlY1BvbGljeSA9PT0gJ0RFRklORV9NQU5ZJykpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3M6IFVuZXhwZWN0ZWQgc3BlYyBwb2xpY3kgJXMgZm9yIGtleSAlcyB3aGVuIG1peGluZyBpbiBjb21wb25lbnQgc3BlY3MuJywgc3BlY1BvbGljeSwgbmFtZSkgOiBfcHJvZEludmFyaWFudCgnNzcnLCBzcGVjUG9saWN5LCBuYW1lKSA6IHZvaWQgMDtcblxuICAgICAgICAgIC8vIEZvciBtZXRob2RzIHdoaWNoIGFyZSBkZWZpbmVkIG1vcmUgdGhhbiBvbmNlLCBjYWxsIHRoZSBleGlzdGluZ1xuICAgICAgICAgIC8vIG1ldGhvZHMgYmVmb3JlIGNhbGxpbmcgdGhlIG5ldyBwcm9wZXJ0eSwgbWVyZ2luZyBpZiBhcHByb3ByaWF0ZS5cbiAgICAgICAgICBpZiAoc3BlY1BvbGljeSA9PT0gJ0RFRklORV9NQU5ZX01FUkdFRCcpIHtcbiAgICAgICAgICAgIHByb3RvW25hbWVdID0gY3JlYXRlTWVyZ2VkUmVzdWx0RnVuY3Rpb24ocHJvdG9bbmFtZV0sIHByb3BlcnR5KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNwZWNQb2xpY3kgPT09ICdERUZJTkVfTUFOWScpIHtcbiAgICAgICAgICAgIHByb3RvW25hbWVdID0gY3JlYXRlQ2hhaW5lZEZ1bmN0aW9uKHByb3RvW25hbWVdLCBwcm9wZXJ0eSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3RvW25hbWVdID0gcHJvcGVydHk7XG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIC8vIEFkZCB2ZXJib3NlIGRpc3BsYXlOYW1lIHRvIHRoZSBmdW5jdGlvbiwgd2hpY2ggaGVscHMgd2hlbiBsb29raW5nXG4gICAgICAgICAgICAvLyBhdCBwcm9maWxpbmcgdG9vbHMuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHByb3BlcnR5ID09PSAnZnVuY3Rpb24nICYmIHNwZWMuZGlzcGxheU5hbWUpIHtcbiAgICAgICAgICAgICAgcHJvdG9bbmFtZV0uZGlzcGxheU5hbWUgPSBzcGVjLmRpc3BsYXlOYW1lICsgJ18nICsgbmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbWl4U3RhdGljU3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHN0YXRpY3MpIHtcbiAgaWYgKCFzdGF0aWNzKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvciAodmFyIG5hbWUgaW4gc3RhdGljcykge1xuICAgIHZhciBwcm9wZXJ0eSA9IHN0YXRpY3NbbmFtZV07XG4gICAgaWYgKCFzdGF0aWNzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgaXNSZXNlcnZlZCA9IG5hbWUgaW4gUkVTRVJWRURfU1BFQ19LRVlTO1xuICAgICEhaXNSZXNlcnZlZCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gZGVmaW5lIGEgcmVzZXJ2ZWQgcHJvcGVydHksIGAlc2AsIHRoYXQgc2hvdWxkblxcJ3QgYmUgb24gdGhlIFwic3RhdGljc1wiIGtleS4gRGVmaW5lIGl0IGFzIGFuIGluc3RhbmNlIHByb3BlcnR5IGluc3RlYWQ7IGl0IHdpbGwgc3RpbGwgYmUgYWNjZXNzaWJsZSBvbiB0aGUgY29uc3RydWN0b3IuJywgbmFtZSkgOiBfcHJvZEludmFyaWFudCgnNzgnLCBuYW1lKSA6IHZvaWQgMDtcblxuICAgIHZhciBpc0luaGVyaXRlZCA9IG5hbWUgaW4gQ29uc3RydWN0b3I7XG4gICAgISFpc0luaGVyaXRlZCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gZGVmaW5lIGAlc2Agb24geW91ciBjb21wb25lbnQgbW9yZSB0aGFuIG9uY2UuIFRoaXMgY29uZmxpY3QgbWF5IGJlIGR1ZSB0byBhIG1peGluLicsIG5hbWUpIDogX3Byb2RJbnZhcmlhbnQoJzc5JywgbmFtZSkgOiB2b2lkIDA7XG4gICAgQ29uc3RydWN0b3JbbmFtZV0gPSBwcm9wZXJ0eTtcbiAgfVxufVxuXG4vKipcbiAqIE1lcmdlIHR3byBvYmplY3RzLCBidXQgdGhyb3cgaWYgYm90aCBjb250YWluIHRoZSBzYW1lIGtleS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb25lIFRoZSBmaXJzdCBvYmplY3QsIHdoaWNoIGlzIG11dGF0ZWQuXG4gKiBAcGFyYW0ge29iamVjdH0gdHdvIFRoZSBzZWNvbmQgb2JqZWN0XG4gKiBAcmV0dXJuIHtvYmplY3R9IG9uZSBhZnRlciBpdCBoYXMgYmVlbiBtdXRhdGVkIHRvIGNvbnRhaW4gZXZlcnl0aGluZyBpbiB0d28uXG4gKi9cbmZ1bmN0aW9uIG1lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMob25lLCB0d28pIHtcbiAgIShvbmUgJiYgdHdvICYmIHR5cGVvZiBvbmUgPT09ICdvYmplY3QnICYmIHR5cGVvZiB0d28gPT09ICdvYmplY3QnKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKCk6IENhbm5vdCBtZXJnZSBub24tb2JqZWN0cy4nKSA6IF9wcm9kSW52YXJpYW50KCc4MCcpIDogdm9pZCAwO1xuXG4gIGZvciAodmFyIGtleSBpbiB0d28pIHtcbiAgICBpZiAodHdvLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICEob25lW2tleV0gPT09IHVuZGVmaW5lZCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnbWVyZ2VJbnRvV2l0aE5vRHVwbGljYXRlS2V5cygpOiBUcmllZCB0byBtZXJnZSB0d28gb2JqZWN0cyB3aXRoIHRoZSBzYW1lIGtleTogYCVzYC4gVGhpcyBjb25mbGljdCBtYXkgYmUgZHVlIHRvIGEgbWl4aW47IGluIHBhcnRpY3VsYXIsIHRoaXMgbWF5IGJlIGNhdXNlZCBieSB0d28gZ2V0SW5pdGlhbFN0YXRlKCkgb3IgZ2V0RGVmYXVsdFByb3BzKCkgbWV0aG9kcyByZXR1cm5pbmcgb2JqZWN0cyB3aXRoIGNsYXNoaW5nIGtleXMuJywga2V5KSA6IF9wcm9kSW52YXJpYW50KCc4MScsIGtleSkgOiB2b2lkIDA7XG4gICAgICBvbmVba2V5XSA9IHR3b1trZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb25lO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgdHdvIGZ1bmN0aW9ucyBhbmQgbWVyZ2VzIHRoZWlyIHJldHVybiB2YWx1ZXMuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gb25lIEZ1bmN0aW9uIHRvIGludm9rZSBmaXJzdC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHR3byBGdW5jdGlvbiB0byBpbnZva2Ugc2Vjb25kLlxuICogQHJldHVybiB7ZnVuY3Rpb259IEZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0aGUgdHdvIGFyZ3VtZW50IGZ1bmN0aW9ucy5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZU1lcmdlZFJlc3VsdEZ1bmN0aW9uKG9uZSwgdHdvKSB7XG4gIHJldHVybiBmdW5jdGlvbiBtZXJnZWRSZXN1bHQoKSB7XG4gICAgdmFyIGEgPSBvbmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB2YXIgYiA9IHR3by5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChhID09IG51bGwpIHtcbiAgICAgIHJldHVybiBiO1xuICAgIH0gZWxzZSBpZiAoYiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgdmFyIGMgPSB7fTtcbiAgICBtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKGMsIGEpO1xuICAgIG1lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMoYywgYik7XG4gICAgcmV0dXJuIGM7XG4gIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0d28gZnVuY3Rpb25zIGFuZCBpZ25vcmVzIHRoZWlyIHJldHVybiB2YWxlcy5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvbmUgRnVuY3Rpb24gdG8gaW52b2tlIGZpcnN0LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gdHdvIEZ1bmN0aW9uIHRvIGludm9rZSBzZWNvbmQuXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gRnVuY3Rpb24gdGhhdCBpbnZva2VzIHRoZSB0d28gYXJndW1lbnQgZnVuY3Rpb25zLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ2hhaW5lZEZ1bmN0aW9uKG9uZSwgdHdvKSB7XG4gIHJldHVybiBmdW5jdGlvbiBjaGFpbmVkRnVuY3Rpb24oKSB7XG4gICAgb25lLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdHdvLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbi8qKlxuICogQmluZHMgYSBtZXRob2QgdG8gdGhlIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29tcG9uZW50IENvbXBvbmVudCB3aG9zZSBtZXRob2QgaXMgZ29pbmcgdG8gYmUgYm91bmQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBtZXRob2QgTWV0aG9kIHRvIGJlIGJvdW5kLlxuICogQHJldHVybiB7ZnVuY3Rpb259IFRoZSBib3VuZCBtZXRob2QuXG4gKi9cbmZ1bmN0aW9uIGJpbmRBdXRvQmluZE1ldGhvZChjb21wb25lbnQsIG1ldGhvZCkge1xuICB2YXIgYm91bmRNZXRob2QgPSBtZXRob2QuYmluZChjb21wb25lbnQpO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZENvbnRleHQgPSBjb21wb25lbnQ7XG4gICAgYm91bmRNZXRob2QuX19yZWFjdEJvdW5kTWV0aG9kID0gbWV0aG9kO1xuICAgIGJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZEFyZ3VtZW50cyA9IG51bGw7XG4gICAgdmFyIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnQuY29uc3RydWN0b3IuZGlzcGxheU5hbWU7XG4gICAgdmFyIF9iaW5kID0gYm91bmRNZXRob2QuYmluZDtcbiAgICBib3VuZE1ldGhvZC5iaW5kID0gZnVuY3Rpb24gKG5ld1RoaXMpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgLy8gVXNlciBpcyB0cnlpbmcgdG8gYmluZCgpIGFuIGF1dG9ib3VuZCBtZXRob2Q7IHdlIGVmZmVjdGl2ZWx5IHdpbGxcbiAgICAgIC8vIGlnbm9yZSB0aGUgdmFsdWUgb2YgXCJ0aGlzXCIgdGhhdCB0aGUgdXNlciBpcyB0cnlpbmcgdG8gdXNlLCBzb1xuICAgICAgLy8gbGV0J3Mgd2Fybi5cbiAgICAgIGlmIChuZXdUaGlzICE9PSBjb21wb25lbnQgJiYgbmV3VGhpcyAhPT0gbnVsbCkge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ2JpbmQoKTogUmVhY3QgY29tcG9uZW50IG1ldGhvZHMgbWF5IG9ubHkgYmUgYm91bmQgdG8gdGhlICcgKyAnY29tcG9uZW50IGluc3RhbmNlLiBTZWUgJXMnLCBjb21wb25lbnROYW1lKSA6IHZvaWQgMDtcbiAgICAgIH0gZWxzZSBpZiAoIWFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnYmluZCgpOiBZb3UgYXJlIGJpbmRpbmcgYSBjb21wb25lbnQgbWV0aG9kIHRvIHRoZSBjb21wb25lbnQuICcgKyAnUmVhY3QgZG9lcyB0aGlzIGZvciB5b3UgYXV0b21hdGljYWxseSBpbiBhIGhpZ2gtcGVyZm9ybWFuY2UgJyArICd3YXksIHNvIHlvdSBjYW4gc2FmZWx5IHJlbW92ZSB0aGlzIGNhbGwuIFNlZSAlcycsIGNvbXBvbmVudE5hbWUpIDogdm9pZCAwO1xuICAgICAgICByZXR1cm4gYm91bmRNZXRob2Q7XG4gICAgICB9XG4gICAgICB2YXIgcmVib3VuZE1ldGhvZCA9IF9iaW5kLmFwcGx5KGJvdW5kTWV0aG9kLCBhcmd1bWVudHMpO1xuICAgICAgcmVib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRDb250ZXh0ID0gY29tcG9uZW50O1xuICAgICAgcmVib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRNZXRob2QgPSBtZXRob2Q7XG4gICAgICByZWJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZEFyZ3VtZW50cyA9IGFyZ3M7XG4gICAgICByZXR1cm4gcmVib3VuZE1ldGhvZDtcbiAgICB9O1xuICB9XG4gIHJldHVybiBib3VuZE1ldGhvZDtcbn1cblxuLyoqXG4gKiBCaW5kcyBhbGwgYXV0by1ib3VuZCBtZXRob2RzIGluIGEgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb21wb25lbnQgQ29tcG9uZW50IHdob3NlIG1ldGhvZCBpcyBnb2luZyB0byBiZSBib3VuZC5cbiAqL1xuZnVuY3Rpb24gYmluZEF1dG9CaW5kTWV0aG9kcyhjb21wb25lbnQpIHtcbiAgdmFyIHBhaXJzID0gY29tcG9uZW50Ll9fcmVhY3RBdXRvQmluZFBhaXJzO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgdmFyIGF1dG9CaW5kS2V5ID0gcGFpcnNbaV07XG4gICAgdmFyIG1ldGhvZCA9IHBhaXJzW2kgKyAxXTtcbiAgICBjb21wb25lbnRbYXV0b0JpbmRLZXldID0gYmluZEF1dG9CaW5kTWV0aG9kKGNvbXBvbmVudCwgbWV0aG9kKTtcbiAgfVxufVxuXG4vKipcbiAqIEFkZCBtb3JlIHRvIHRoZSBSZWFjdENsYXNzIGJhc2UgY2xhc3MuIFRoZXNlIGFyZSBhbGwgbGVnYWN5IGZlYXR1cmVzIGFuZFxuICogdGhlcmVmb3JlIG5vdCBhbHJlYWR5IHBhcnQgb2YgdGhlIG1vZGVybiBSZWFjdENvbXBvbmVudC5cbiAqL1xudmFyIFJlYWN0Q2xhc3NNaXhpbiA9IHtcblxuICAvKipcbiAgICogVE9ETzogVGhpcyB3aWxsIGJlIGRlcHJlY2F0ZWQgYmVjYXVzZSBzdGF0ZSBzaG91bGQgYWx3YXlzIGtlZXAgYSBjb25zaXN0ZW50XG4gICAqIHR5cGUgc2lnbmF0dXJlIGFuZCB0aGUgb25seSB1c2UgY2FzZSBmb3IgdGhpcywgaXMgdG8gYXZvaWQgdGhhdC5cbiAgICovXG4gIHJlcGxhY2VTdGF0ZTogZnVuY3Rpb24gKG5ld1N0YXRlLCBjYWxsYmFjaykge1xuICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlUmVwbGFjZVN0YXRlKHRoaXMsIG5ld1N0YXRlKTtcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlQ2FsbGJhY2sodGhpcywgY2FsbGJhY2ssICdyZXBsYWNlU3RhdGUnKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGNvbXBvc2l0ZSBjb21wb25lbnQgaXMgbW91bnRlZC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBtb3VudGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQGZpbmFsXG4gICAqL1xuICBpc01vdW50ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy51cGRhdGVyLmlzTW91bnRlZCh0aGlzKTtcbiAgfVxufTtcblxudmFyIFJlYWN0Q2xhc3NDb21wb25lbnQgPSBmdW5jdGlvbiAoKSB7fTtcbl9hc3NpZ24oUmVhY3RDbGFzc0NvbXBvbmVudC5wcm90b3R5cGUsIFJlYWN0Q29tcG9uZW50LnByb3RvdHlwZSwgUmVhY3RDbGFzc01peGluKTtcblxudmFyIGRpZFdhcm5EZXByZWNhdGVkID0gZmFsc2U7XG5cbi8qKlxuICogTW9kdWxlIGZvciBjcmVhdGluZyBjb21wb3NpdGUgY29tcG9uZW50cy5cbiAqXG4gKiBAY2xhc3MgUmVhY3RDbGFzc1xuICovXG52YXIgUmVhY3RDbGFzcyA9IHtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGNvbXBvc2l0ZSBjb21wb25lbnQgY2xhc3MgZ2l2ZW4gYSBjbGFzcyBzcGVjaWZpY2F0aW9uLlxuICAgKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY3JlYXRlY2xhc3NcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHNwZWMgQ2xhc3Mgc3BlY2lmaWNhdGlvbiAod2hpY2ggbXVzdCBkZWZpbmUgYHJlbmRlcmApLlxuICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gQ29tcG9uZW50IGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICAgKiBAcHVibGljXG4gICAqL1xuICBjcmVhdGVDbGFzczogZnVuY3Rpb24gKHNwZWMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZGlkV2FybkRlcHJlY2F0ZWQsICclczogUmVhY3QuY3JlYXRlQ2xhc3MgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHZlcnNpb24gMTYuICcgKyAnVXNlIHBsYWluIEphdmFTY3JpcHQgY2xhc3NlcyBpbnN0ZWFkLiBJZiB5b3VcXCdyZSBub3QgeWV0IHJlYWR5IHRvICcgKyAnbWlncmF0ZSwgY3JlYXRlLXJlYWN0LWNsYXNzIGlzIGF2YWlsYWJsZSBvbiBucG0gYXMgYSAnICsgJ2Ryb3AtaW4gcmVwbGFjZW1lbnQuJywgc3BlYyAmJiBzcGVjLmRpc3BsYXlOYW1lIHx8ICdBIENvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgZGlkV2FybkRlcHJlY2F0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIFRvIGtlZXAgb3VyIHdhcm5pbmdzIG1vcmUgdW5kZXJzdGFuZGFibGUsIHdlJ2xsIHVzZSBhIGxpdHRsZSBoYWNrIGhlcmUgdG9cbiAgICAvLyBlbnN1cmUgdGhhdCBDb25zdHJ1Y3Rvci5uYW1lICE9PSAnQ29uc3RydWN0b3InLiBUaGlzIG1ha2VzIHN1cmUgd2UgZG9uJ3RcbiAgICAvLyB1bm5lY2Vzc2FyaWx5IGlkZW50aWZ5IGEgY2xhc3Mgd2l0aG91dCBkaXNwbGF5TmFtZSBhcyAnQ29uc3RydWN0b3InLlxuICAgIHZhciBDb25zdHJ1Y3RvciA9IGlkZW50aXR5KGZ1bmN0aW9uIChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICAgICAgLy8gVGhpcyBjb25zdHJ1Y3RvciBnZXRzIG92ZXJyaWRkZW4gYnkgbW9ja3MuIFRoZSBhcmd1bWVudCBpcyB1c2VkXG4gICAgICAvLyBieSBtb2NrcyB0byBhc3NlcnQgb24gd2hhdCBnZXRzIG1vdW50ZWQuXG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHRoaXMgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvciwgJ1NvbWV0aGluZyBpcyBjYWxsaW5nIGEgUmVhY3QgY29tcG9uZW50IGRpcmVjdGx5LiBVc2UgYSBmYWN0b3J5IG9yICcgKyAnSlNYIGluc3RlYWQuIFNlZTogaHR0cHM6Ly9mYi5tZS9yZWFjdC1sZWdhY3lmYWN0b3J5JykgOiB2b2lkIDA7XG4gICAgICB9XG5cbiAgICAgIC8vIFdpcmUgdXAgYXV0by1iaW5kaW5nXG4gICAgICBpZiAodGhpcy5fX3JlYWN0QXV0b0JpbmRQYWlycy5sZW5ndGgpIHtcbiAgICAgICAgYmluZEF1dG9CaW5kTWV0aG9kcyh0aGlzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAgICAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcblxuICAgICAgdGhpcy5zdGF0ZSA9IG51bGw7XG5cbiAgICAgIC8vIFJlYWN0Q2xhc3NlcyBkb2Vzbid0IGhhdmUgY29uc3RydWN0b3JzLiBJbnN0ZWFkLCB0aGV5IHVzZSB0aGVcbiAgICAgIC8vIGdldEluaXRpYWxTdGF0ZSBhbmQgY29tcG9uZW50V2lsbE1vdW50IG1ldGhvZHMgZm9yIGluaXRpYWxpemF0aW9uLlxuXG4gICAgICB2YXIgaW5pdGlhbFN0YXRlID0gdGhpcy5nZXRJbml0aWFsU3RhdGUgPyB0aGlzLmdldEluaXRpYWxTdGF0ZSgpIDogbnVsbDtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIC8vIFdlIGFsbG93IGF1dG8tbW9ja3MgdG8gcHJvY2VlZCBhcyBpZiB0aGV5J3JlIHJldHVybmluZyBudWxsLlxuICAgICAgICBpZiAoaW5pdGlhbFN0YXRlID09PSB1bmRlZmluZWQgJiYgdGhpcy5nZXRJbml0aWFsU3RhdGUuX2lzTW9ja0Z1bmN0aW9uKSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBwcm9iYWJseSBiYWQgcHJhY3RpY2UuIENvbnNpZGVyIHdhcm5pbmcgaGVyZSBhbmRcbiAgICAgICAgICAvLyBkZXByZWNhdGluZyB0aGlzIGNvbnZlbmllbmNlLlxuICAgICAgICAgIGluaXRpYWxTdGF0ZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgICEodHlwZW9mIGluaXRpYWxTdGF0ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoaW5pdGlhbFN0YXRlKSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnJXMuZ2V0SW5pdGlhbFN0YXRlKCk6IG11c3QgcmV0dXJuIGFuIG9iamVjdCBvciBudWxsJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50JykgOiBfcHJvZEludmFyaWFudCgnODInLCBDb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCAnUmVhY3RDb21wb3NpdGVDb21wb25lbnQnKSA6IHZvaWQgMDtcblxuICAgICAgdGhpcy5zdGF0ZSA9IGluaXRpYWxTdGF0ZTtcbiAgICB9KTtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBuZXcgUmVhY3RDbGFzc0NvbXBvbmVudCgpO1xuICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvbnN0cnVjdG9yO1xuICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZS5fX3JlYWN0QXV0b0JpbmRQYWlycyA9IFtdO1xuXG4gICAgaW5qZWN0ZWRNaXhpbnMuZm9yRWFjaChtaXhTcGVjSW50b0NvbXBvbmVudC5iaW5kKG51bGwsIENvbnN0cnVjdG9yKSk7XG5cbiAgICBtaXhTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3Rvciwgc3BlYyk7XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBkZWZhdWx0UHJvcHMgcHJvcGVydHkgYWZ0ZXIgYWxsIG1peGlucyBoYXZlIGJlZW4gbWVyZ2VkLlxuICAgIGlmIChDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMpIHtcbiAgICAgIENvbnN0cnVjdG9yLmRlZmF1bHRQcm9wcyA9IENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcygpO1xuICAgIH1cblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvLyBUaGlzIGlzIGEgdGFnIHRvIGluZGljYXRlIHRoYXQgdGhlIHVzZSBvZiB0aGVzZSBtZXRob2QgbmFtZXMgaXMgb2ssXG4gICAgICAvLyBzaW5jZSBpdCdzIHVzZWQgd2l0aCBjcmVhdGVDbGFzcy4gSWYgaXQncyBub3QsIHRoZW4gaXQncyBsaWtlbHkgYVxuICAgICAgLy8gbWlzdGFrZSBzbyB3ZSdsbCB3YXJuIHlvdSB0byB1c2UgdGhlIHN0YXRpYyBwcm9wZXJ0eSwgcHJvcGVydHlcbiAgICAgIC8vIGluaXRpYWxpemVyIG9yIGNvbnN0cnVjdG9yIHJlc3BlY3RpdmVseS5cbiAgICAgIGlmIChDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMpIHtcbiAgICAgICAgQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzLmlzUmVhY3RDbGFzc0FwcHJvdmVkID0ge307XG4gICAgICB9XG4gICAgICBpZiAoQ29uc3RydWN0b3IucHJvdG90eXBlLmdldEluaXRpYWxTdGF0ZSkge1xuICAgICAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuZ2V0SW5pdGlhbFN0YXRlLmlzUmVhY3RDbGFzc0FwcHJvdmVkID0ge307XG4gICAgICB9XG4gICAgfVxuXG4gICAgIUNvbnN0cnVjdG9yLnByb3RvdHlwZS5yZW5kZXIgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnY3JlYXRlQ2xhc3MoLi4uKTogQ2xhc3Mgc3BlY2lmaWNhdGlvbiBtdXN0IGltcGxlbWVudCBhIGByZW5kZXJgIG1ldGhvZC4nKSA6IF9wcm9kSW52YXJpYW50KCc4MycpIDogdm9pZCAwO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFDb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29tcG9uZW50U2hvdWxkVXBkYXRlLCAnJXMgaGFzIGEgbWV0aG9kIGNhbGxlZCAnICsgJ2NvbXBvbmVudFNob3VsZFVwZGF0ZSgpLiBEaWQgeW91IG1lYW4gc2hvdWxkQ29tcG9uZW50VXBkYXRlKCk/ICcgKyAnVGhlIG5hbWUgaXMgcGhyYXNlZCBhcyBhIHF1ZXN0aW9uIGJlY2F1c2UgdGhlIGZ1bmN0aW9uIGlzICcgKyAnZXhwZWN0ZWQgdG8gcmV0dXJuIGEgdmFsdWUuJywgc3BlYy5kaXNwbGF5TmFtZSB8fCAnQSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFDb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2lldmVQcm9wcywgJyVzIGhhcyBhIG1ldGhvZCBjYWxsZWQgJyArICdjb21wb25lbnRXaWxsUmVjaWV2ZVByb3BzKCkuIERpZCB5b3UgbWVhbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCk/Jywgc3BlYy5kaXNwbGF5TmFtZSB8fCAnQSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICB9XG5cbiAgICAvLyBSZWR1Y2UgdGltZSBzcGVudCBkb2luZyBsb29rdXBzIGJ5IHNldHRpbmcgdGhlc2Ugb24gdGhlIHByb3RvdHlwZS5cbiAgICBmb3IgKHZhciBtZXRob2ROYW1lIGluIFJlYWN0Q2xhc3NJbnRlcmZhY2UpIHtcbiAgICAgIGlmICghQ29uc3RydWN0b3IucHJvdG90eXBlW21ldGhvZE5hbWVdKSB7XG4gICAgICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2ROYW1lXSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9LFxuXG4gIGluamVjdGlvbjoge1xuICAgIGluamVjdE1peGluOiBmdW5jdGlvbiAobWl4aW4pIHtcbiAgICAgIGluamVjdGVkTWl4aW5zLnB1c2gobWl4aW4pO1xuICAgIH1cbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q2xhc3M7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0L2xpYi9SZWFjdENsYXNzLmpzXG4vLyBtb2R1bGUgaWQgPSA4NVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBmYWN0b3J5IHRoYXQgY3JlYXRlcyBIVE1MIHRhZyBlbGVtZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgY3JlYXRlRE9NRmFjdG9yeSA9IFJlYWN0RWxlbWVudC5jcmVhdGVGYWN0b3J5O1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJlYWN0RWxlbWVudFZhbGlkYXRvciA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50VmFsaWRhdG9yJyk7XG4gIGNyZWF0ZURPTUZhY3RvcnkgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY3JlYXRlRmFjdG9yeTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwcGluZyBmcm9tIHN1cHBvcnRlZCBIVE1MIHRhZ3MgdG8gYFJlYWN0RE9NQ29tcG9uZW50YCBjbGFzc2VzLlxuICogVGhpcyBpcyBhbHNvIGFjY2Vzc2libGUgdmlhIGBSZWFjdC5ET01gLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xudmFyIFJlYWN0RE9NRmFjdG9yaWVzID0ge1xuICBhOiBjcmVhdGVET01GYWN0b3J5KCdhJyksXG4gIGFiYnI6IGNyZWF0ZURPTUZhY3RvcnkoJ2FiYnInKSxcbiAgYWRkcmVzczogY3JlYXRlRE9NRmFjdG9yeSgnYWRkcmVzcycpLFxuICBhcmVhOiBjcmVhdGVET01GYWN0b3J5KCdhcmVhJyksXG4gIGFydGljbGU6IGNyZWF0ZURPTUZhY3RvcnkoJ2FydGljbGUnKSxcbiAgYXNpZGU6IGNyZWF0ZURPTUZhY3RvcnkoJ2FzaWRlJyksXG4gIGF1ZGlvOiBjcmVhdGVET01GYWN0b3J5KCdhdWRpbycpLFxuICBiOiBjcmVhdGVET01GYWN0b3J5KCdiJyksXG4gIGJhc2U6IGNyZWF0ZURPTUZhY3RvcnkoJ2Jhc2UnKSxcbiAgYmRpOiBjcmVhdGVET01GYWN0b3J5KCdiZGknKSxcbiAgYmRvOiBjcmVhdGVET01GYWN0b3J5KCdiZG8nKSxcbiAgYmlnOiBjcmVhdGVET01GYWN0b3J5KCdiaWcnKSxcbiAgYmxvY2txdW90ZTogY3JlYXRlRE9NRmFjdG9yeSgnYmxvY2txdW90ZScpLFxuICBib2R5OiBjcmVhdGVET01GYWN0b3J5KCdib2R5JyksXG4gIGJyOiBjcmVhdGVET01GYWN0b3J5KCdicicpLFxuICBidXR0b246IGNyZWF0ZURPTUZhY3RvcnkoJ2J1dHRvbicpLFxuICBjYW52YXM6IGNyZWF0ZURPTUZhY3RvcnkoJ2NhbnZhcycpLFxuICBjYXB0aW9uOiBjcmVhdGVET01GYWN0b3J5KCdjYXB0aW9uJyksXG4gIGNpdGU6IGNyZWF0ZURPTUZhY3RvcnkoJ2NpdGUnKSxcbiAgY29kZTogY3JlYXRlRE9NRmFjdG9yeSgnY29kZScpLFxuICBjb2w6IGNyZWF0ZURPTUZhY3RvcnkoJ2NvbCcpLFxuICBjb2xncm91cDogY3JlYXRlRE9NRmFjdG9yeSgnY29sZ3JvdXAnKSxcbiAgZGF0YTogY3JlYXRlRE9NRmFjdG9yeSgnZGF0YScpLFxuICBkYXRhbGlzdDogY3JlYXRlRE9NRmFjdG9yeSgnZGF0YWxpc3QnKSxcbiAgZGQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2RkJyksXG4gIGRlbDogY3JlYXRlRE9NRmFjdG9yeSgnZGVsJyksXG4gIGRldGFpbHM6IGNyZWF0ZURPTUZhY3RvcnkoJ2RldGFpbHMnKSxcbiAgZGZuOiBjcmVhdGVET01GYWN0b3J5KCdkZm4nKSxcbiAgZGlhbG9nOiBjcmVhdGVET01GYWN0b3J5KCdkaWFsb2cnKSxcbiAgZGl2OiBjcmVhdGVET01GYWN0b3J5KCdkaXYnKSxcbiAgZGw6IGNyZWF0ZURPTUZhY3RvcnkoJ2RsJyksXG4gIGR0OiBjcmVhdGVET01GYWN0b3J5KCdkdCcpLFxuICBlbTogY3JlYXRlRE9NRmFjdG9yeSgnZW0nKSxcbiAgZW1iZWQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2VtYmVkJyksXG4gIGZpZWxkc2V0OiBjcmVhdGVET01GYWN0b3J5KCdmaWVsZHNldCcpLFxuICBmaWdjYXB0aW9uOiBjcmVhdGVET01GYWN0b3J5KCdmaWdjYXB0aW9uJyksXG4gIGZpZ3VyZTogY3JlYXRlRE9NRmFjdG9yeSgnZmlndXJlJyksXG4gIGZvb3RlcjogY3JlYXRlRE9NRmFjdG9yeSgnZm9vdGVyJyksXG4gIGZvcm06IGNyZWF0ZURPTUZhY3RvcnkoJ2Zvcm0nKSxcbiAgaDE6IGNyZWF0ZURPTUZhY3RvcnkoJ2gxJyksXG4gIGgyOiBjcmVhdGVET01GYWN0b3J5KCdoMicpLFxuICBoMzogY3JlYXRlRE9NRmFjdG9yeSgnaDMnKSxcbiAgaDQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2g0JyksXG4gIGg1OiBjcmVhdGVET01GYWN0b3J5KCdoNScpLFxuICBoNjogY3JlYXRlRE9NRmFjdG9yeSgnaDYnKSxcbiAgaGVhZDogY3JlYXRlRE9NRmFjdG9yeSgnaGVhZCcpLFxuICBoZWFkZXI6IGNyZWF0ZURPTUZhY3RvcnkoJ2hlYWRlcicpLFxuICBoZ3JvdXA6IGNyZWF0ZURPTUZhY3RvcnkoJ2hncm91cCcpLFxuICBocjogY3JlYXRlRE9NRmFjdG9yeSgnaHInKSxcbiAgaHRtbDogY3JlYXRlRE9NRmFjdG9yeSgnaHRtbCcpLFxuICBpOiBjcmVhdGVET01GYWN0b3J5KCdpJyksXG4gIGlmcmFtZTogY3JlYXRlRE9NRmFjdG9yeSgnaWZyYW1lJyksXG4gIGltZzogY3JlYXRlRE9NRmFjdG9yeSgnaW1nJyksXG4gIGlucHV0OiBjcmVhdGVET01GYWN0b3J5KCdpbnB1dCcpLFxuICBpbnM6IGNyZWF0ZURPTUZhY3RvcnkoJ2lucycpLFxuICBrYmQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2tiZCcpLFxuICBrZXlnZW46IGNyZWF0ZURPTUZhY3RvcnkoJ2tleWdlbicpLFxuICBsYWJlbDogY3JlYXRlRE9NRmFjdG9yeSgnbGFiZWwnKSxcbiAgbGVnZW5kOiBjcmVhdGVET01GYWN0b3J5KCdsZWdlbmQnKSxcbiAgbGk6IGNyZWF0ZURPTUZhY3RvcnkoJ2xpJyksXG4gIGxpbms6IGNyZWF0ZURPTUZhY3RvcnkoJ2xpbmsnKSxcbiAgbWFpbjogY3JlYXRlRE9NRmFjdG9yeSgnbWFpbicpLFxuICBtYXA6IGNyZWF0ZURPTUZhY3RvcnkoJ21hcCcpLFxuICBtYXJrOiBjcmVhdGVET01GYWN0b3J5KCdtYXJrJyksXG4gIG1lbnU6IGNyZWF0ZURPTUZhY3RvcnkoJ21lbnUnKSxcbiAgbWVudWl0ZW06IGNyZWF0ZURPTUZhY3RvcnkoJ21lbnVpdGVtJyksXG4gIG1ldGE6IGNyZWF0ZURPTUZhY3RvcnkoJ21ldGEnKSxcbiAgbWV0ZXI6IGNyZWF0ZURPTUZhY3RvcnkoJ21ldGVyJyksXG4gIG5hdjogY3JlYXRlRE9NRmFjdG9yeSgnbmF2JyksXG4gIG5vc2NyaXB0OiBjcmVhdGVET01GYWN0b3J5KCdub3NjcmlwdCcpLFxuICBvYmplY3Q6IGNyZWF0ZURPTUZhY3RvcnkoJ29iamVjdCcpLFxuICBvbDogY3JlYXRlRE9NRmFjdG9yeSgnb2wnKSxcbiAgb3B0Z3JvdXA6IGNyZWF0ZURPTUZhY3RvcnkoJ29wdGdyb3VwJyksXG4gIG9wdGlvbjogY3JlYXRlRE9NRmFjdG9yeSgnb3B0aW9uJyksXG4gIG91dHB1dDogY3JlYXRlRE9NRmFjdG9yeSgnb3V0cHV0JyksXG4gIHA6IGNyZWF0ZURPTUZhY3RvcnkoJ3AnKSxcbiAgcGFyYW06IGNyZWF0ZURPTUZhY3RvcnkoJ3BhcmFtJyksXG4gIHBpY3R1cmU6IGNyZWF0ZURPTUZhY3RvcnkoJ3BpY3R1cmUnKSxcbiAgcHJlOiBjcmVhdGVET01GYWN0b3J5KCdwcmUnKSxcbiAgcHJvZ3Jlc3M6IGNyZWF0ZURPTUZhY3RvcnkoJ3Byb2dyZXNzJyksXG4gIHE6IGNyZWF0ZURPTUZhY3RvcnkoJ3EnKSxcbiAgcnA6IGNyZWF0ZURPTUZhY3RvcnkoJ3JwJyksXG4gIHJ0OiBjcmVhdGVET01GYWN0b3J5KCdydCcpLFxuICBydWJ5OiBjcmVhdGVET01GYWN0b3J5KCdydWJ5JyksXG4gIHM6IGNyZWF0ZURPTUZhY3RvcnkoJ3MnKSxcbiAgc2FtcDogY3JlYXRlRE9NRmFjdG9yeSgnc2FtcCcpLFxuICBzY3JpcHQ6IGNyZWF0ZURPTUZhY3RvcnkoJ3NjcmlwdCcpLFxuICBzZWN0aW9uOiBjcmVhdGVET01GYWN0b3J5KCdzZWN0aW9uJyksXG4gIHNlbGVjdDogY3JlYXRlRE9NRmFjdG9yeSgnc2VsZWN0JyksXG4gIHNtYWxsOiBjcmVhdGVET01GYWN0b3J5KCdzbWFsbCcpLFxuICBzb3VyY2U6IGNyZWF0ZURPTUZhY3RvcnkoJ3NvdXJjZScpLFxuICBzcGFuOiBjcmVhdGVET01GYWN0b3J5KCdzcGFuJyksXG4gIHN0cm9uZzogY3JlYXRlRE9NRmFjdG9yeSgnc3Ryb25nJyksXG4gIHN0eWxlOiBjcmVhdGVET01GYWN0b3J5KCdzdHlsZScpLFxuICBzdWI6IGNyZWF0ZURPTUZhY3RvcnkoJ3N1YicpLFxuICBzdW1tYXJ5OiBjcmVhdGVET01GYWN0b3J5KCdzdW1tYXJ5JyksXG4gIHN1cDogY3JlYXRlRE9NRmFjdG9yeSgnc3VwJyksXG4gIHRhYmxlOiBjcmVhdGVET01GYWN0b3J5KCd0YWJsZScpLFxuICB0Ym9keTogY3JlYXRlRE9NRmFjdG9yeSgndGJvZHknKSxcbiAgdGQ6IGNyZWF0ZURPTUZhY3RvcnkoJ3RkJyksXG4gIHRleHRhcmVhOiBjcmVhdGVET01GYWN0b3J5KCd0ZXh0YXJlYScpLFxuICB0Zm9vdDogY3JlYXRlRE9NRmFjdG9yeSgndGZvb3QnKSxcbiAgdGg6IGNyZWF0ZURPTUZhY3RvcnkoJ3RoJyksXG4gIHRoZWFkOiBjcmVhdGVET01GYWN0b3J5KCd0aGVhZCcpLFxuICB0aW1lOiBjcmVhdGVET01GYWN0b3J5KCd0aW1lJyksXG4gIHRpdGxlOiBjcmVhdGVET01GYWN0b3J5KCd0aXRsZScpLFxuICB0cjogY3JlYXRlRE9NRmFjdG9yeSgndHInKSxcbiAgdHJhY2s6IGNyZWF0ZURPTUZhY3RvcnkoJ3RyYWNrJyksXG4gIHU6IGNyZWF0ZURPTUZhY3RvcnkoJ3UnKSxcbiAgdWw6IGNyZWF0ZURPTUZhY3RvcnkoJ3VsJyksXG4gICd2YXInOiBjcmVhdGVET01GYWN0b3J5KCd2YXInKSxcbiAgdmlkZW86IGNyZWF0ZURPTUZhY3RvcnkoJ3ZpZGVvJyksXG4gIHdicjogY3JlYXRlRE9NRmFjdG9yeSgnd2JyJyksXG5cbiAgLy8gU1ZHXG4gIGNpcmNsZTogY3JlYXRlRE9NRmFjdG9yeSgnY2lyY2xlJyksXG4gIGNsaXBQYXRoOiBjcmVhdGVET01GYWN0b3J5KCdjbGlwUGF0aCcpLFxuICBkZWZzOiBjcmVhdGVET01GYWN0b3J5KCdkZWZzJyksXG4gIGVsbGlwc2U6IGNyZWF0ZURPTUZhY3RvcnkoJ2VsbGlwc2UnKSxcbiAgZzogY3JlYXRlRE9NRmFjdG9yeSgnZycpLFxuICBpbWFnZTogY3JlYXRlRE9NRmFjdG9yeSgnaW1hZ2UnKSxcbiAgbGluZTogY3JlYXRlRE9NRmFjdG9yeSgnbGluZScpLFxuICBsaW5lYXJHcmFkaWVudDogY3JlYXRlRE9NRmFjdG9yeSgnbGluZWFyR3JhZGllbnQnKSxcbiAgbWFzazogY3JlYXRlRE9NRmFjdG9yeSgnbWFzaycpLFxuICBwYXRoOiBjcmVhdGVET01GYWN0b3J5KCdwYXRoJyksXG4gIHBhdHRlcm46IGNyZWF0ZURPTUZhY3RvcnkoJ3BhdHRlcm4nKSxcbiAgcG9seWdvbjogY3JlYXRlRE9NRmFjdG9yeSgncG9seWdvbicpLFxuICBwb2x5bGluZTogY3JlYXRlRE9NRmFjdG9yeSgncG9seWxpbmUnKSxcbiAgcmFkaWFsR3JhZGllbnQ6IGNyZWF0ZURPTUZhY3RvcnkoJ3JhZGlhbEdyYWRpZW50JyksXG4gIHJlY3Q6IGNyZWF0ZURPTUZhY3RvcnkoJ3JlY3QnKSxcbiAgc3RvcDogY3JlYXRlRE9NRmFjdG9yeSgnc3RvcCcpLFxuICBzdmc6IGNyZWF0ZURPTUZhY3RvcnkoJ3N2ZycpLFxuICB0ZXh0OiBjcmVhdGVET01GYWN0b3J5KCd0ZXh0JyksXG4gIHRzcGFuOiBjcmVhdGVET01GYWN0b3J5KCd0c3BhbicpXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RE9NRmFjdG9yaWVzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC9saWIvUmVhY3RET01GYWN0b3JpZXMuanNcbi8vIG1vZHVsZSBpZCA9IDg2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50JyksXG4gICAgaXNWYWxpZEVsZW1lbnQgPSBfcmVxdWlyZS5pc1ZhbGlkRWxlbWVudDtcblxudmFyIGZhY3RvcnkgPSByZXF1aXJlKCdwcm9wLXR5cGVzL2ZhY3RvcnknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KGlzVmFsaWRFbGVtZW50KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3QvbGliL1JlYWN0UHJvcFR5cGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA4N1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9ICdTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRCc7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZXNTZWNyZXQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0L2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldC5qc1xuLy8gbW9kdWxlIGlkID0gODhcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vUmVhY3RDb21wb25lbnQnKTtcbnZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IHJlcXVpcmUoJy4vUmVhY3ROb29wVXBkYXRlUXVldWUnKTtcblxudmFyIGVtcHR5T2JqZWN0ID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlPYmplY3QnKTtcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGhlbHBlcnMgZm9yIHRoZSB1cGRhdGluZyBzdGF0ZSBvZiBhIGNvbXBvbmVudC5cbiAqL1xuZnVuY3Rpb24gUmVhY3RQdXJlQ29tcG9uZW50KHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gIC8vIER1cGxpY2F0ZWQgZnJvbSBSZWFjdENvbXBvbmVudC5cbiAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLnJlZnMgPSBlbXB0eU9iamVjdDtcbiAgLy8gV2UgaW5pdGlhbGl6ZSB0aGUgZGVmYXVsdCB1cGRhdGVyIGJ1dCB0aGUgcmVhbCBvbmUgZ2V0cyBpbmplY3RlZCBieSB0aGVcbiAgLy8gcmVuZGVyZXIuXG4gIHRoaXMudXBkYXRlciA9IHVwZGF0ZXIgfHwgUmVhY3ROb29wVXBkYXRlUXVldWU7XG59XG5cbmZ1bmN0aW9uIENvbXBvbmVudER1bW15KCkge31cbkNvbXBvbmVudER1bW15LnByb3RvdHlwZSA9IFJlYWN0Q29tcG9uZW50LnByb3RvdHlwZTtcblJlYWN0UHVyZUNvbXBvbmVudC5wcm90b3R5cGUgPSBuZXcgQ29tcG9uZW50RHVtbXkoKTtcblJlYWN0UHVyZUNvbXBvbmVudC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWFjdFB1cmVDb21wb25lbnQ7XG4vLyBBdm9pZCBhbiBleHRyYSBwcm90b3R5cGUganVtcCBmb3IgdGhlc2UgbWV0aG9kcy5cbl9hc3NpZ24oUmVhY3RQdXJlQ29tcG9uZW50LnByb3RvdHlwZSwgUmVhY3RDb21wb25lbnQucHJvdG90eXBlKTtcblJlYWN0UHVyZUNvbXBvbmVudC5wcm90b3R5cGUuaXNQdXJlUmVhY3RDb21wb25lbnQgPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHVyZUNvbXBvbmVudDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3QvbGliL1JlYWN0UHVyZUNvbXBvbmVudC5qc1xuLy8gbW9kdWxlIGlkID0gODlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSAnMTUuNS40JztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3QvbGliL1JlYWN0VmVyc2lvbi5qc1xuLy8gbW9kdWxlIGlkID0gOTBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKTtcblxudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcycpO1xudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxudmFyIFJlYWN0Q29tcG9uZW50VHJlZUhvb2s7XG5cbmlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICd0ZXN0Jykge1xuICAvLyBUZW1wb3JhcnkgaGFjay5cbiAgLy8gSW5saW5lIHJlcXVpcmVzIGRvbid0IHdvcmsgd2VsbCB3aXRoIEplc3Q6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvNzI0MFxuICAvLyBSZW1vdmUgdGhlIGlubGluZSByZXF1aXJlcyB3aGVuIHdlIGRvbid0IG5lZWQgdGhlbSBhbnltb3JlOlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvcHVsbC83MTc4XG4gIFJlYWN0Q29tcG9uZW50VHJlZUhvb2sgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50VHJlZUhvb2snKTtcbn1cblxudmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xuXG4vKipcbiAqIEFzc2VydCB0aGF0IHRoZSB2YWx1ZXMgbWF0Y2ggd2l0aCB0aGUgdHlwZSBzcGVjcy5cbiAqIEVycm9yIG1lc3NhZ2VzIGFyZSBtZW1vcml6ZWQgYW5kIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0eXBlU3BlY3MgTWFwIG9mIG5hbWUgdG8gYSBSZWFjdFByb3BUeXBlXG4gKiBAcGFyYW0ge29iamVjdH0gdmFsdWVzIFJ1bnRpbWUgdmFsdWVzIHRoYXQgbmVlZCB0byBiZSB0eXBlLWNoZWNrZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBlLmcuIFwicHJvcFwiLCBcImNvbnRleHRcIiwgXCJjaGlsZCBjb250ZXh0XCJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lIE5hbWUgb2YgdGhlIGNvbXBvbmVudCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gKiBAcGFyYW0gez9vYmplY3R9IGVsZW1lbnQgVGhlIFJlYWN0IGVsZW1lbnQgdGhhdCBpcyBiZWluZyB0eXBlLWNoZWNrZWRcbiAqIEBwYXJhbSB7P251bWJlcn0gZGVidWdJRCBUaGUgUmVhY3QgY29tcG9uZW50IGluc3RhbmNlIHRoYXQgaXMgYmVpbmcgdHlwZS1jaGVja2VkXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjaGVja1JlYWN0VHlwZVNwZWModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCBjb21wb25lbnROYW1lLCBlbGVtZW50LCBkZWJ1Z0lEKSB7XG4gIGZvciAodmFyIHR5cGVTcGVjTmFtZSBpbiB0eXBlU3BlY3MpIHtcbiAgICBpZiAodHlwZVNwZWNzLmhhc093blByb3BlcnR5KHR5cGVTcGVjTmFtZSkpIHtcbiAgICAgIHZhciBlcnJvcjtcbiAgICAgIC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAvLyBmYWlsIHRoZSByZW5kZXIgcGhhc2Ugd2hlcmUgaXQgZGlkbid0IGZhaWwgYmVmb3JlLiBTbyB3ZSBsb2cgaXQuXG4gICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsbHkgYW4gaW52YXJpYW50IHRoYXQgZ2V0cyBjYXVnaHQuIEl0J3MgdGhlIHNhbWVcbiAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAhKHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSA9PT0gJ2Z1bmN0aW9uJykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnJXM6ICVzIHR5cGUgYCVzYCBpcyBpbnZhbGlkOyBpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSBSZWFjdC5Qcm9wVHlwZXMuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl0sIHR5cGVTcGVjTmFtZSkgOiBfcHJvZEludmFyaWFudCgnODQnLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXSwgdHlwZVNwZWNOYW1lKSA6IHZvaWQgMDtcbiAgICAgICAgZXJyb3IgPSB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSh2YWx1ZXMsIHR5cGVTcGVjTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIG51bGwsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIGVycm9yID0gZXg7XG4gICAgICB9XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghZXJyb3IgfHwgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciwgJyVzOiB0eXBlIHNwZWNpZmljYXRpb24gb2YgJXMgYCVzYCBpcyBpbnZhbGlkOyB0aGUgdHlwZSBjaGVja2VyICcgKyAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJXMuICcgKyAnWW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBwYXNzIGFuIGFyZ3VtZW50IHRvIHRoZSB0eXBlIGNoZWNrZXIgJyArICdjcmVhdG9yIChhcnJheU9mLCBpbnN0YW5jZU9mLCBvYmplY3RPZiwgb25lT2YsIG9uZU9mVHlwZSwgYW5kICcgKyAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dLCB0eXBlU3BlY05hbWUsIHR5cGVvZiBlcnJvcikgOiB2b2lkIDA7XG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAvLyBPbmx5IG1vbml0b3IgdGhpcyBmYWlsdXJlIG9uY2UgYmVjYXVzZSB0aGVyZSB0ZW5kcyB0byBiZSBhIGxvdCBvZiB0aGVcbiAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICB2YXIgY29tcG9uZW50U3RhY2tJbmZvID0gJyc7XG5cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICBpZiAoIVJlYWN0Q29tcG9uZW50VHJlZUhvb2spIHtcbiAgICAgICAgICAgIFJlYWN0Q29tcG9uZW50VHJlZUhvb2sgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50VHJlZUhvb2snKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRlYnVnSUQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudFN0YWNrSW5mbyA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0U3RhY2tBZGRlbmR1bUJ5SUQoZGVidWdJRCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb21wb25lbnRTdGFja0luZm8gPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEN1cnJlbnRTdGFja0FkZGVuZHVtKGVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnRmFpbGVkICVzIHR5cGU6ICVzJXMnLCBsb2NhdGlvbiwgZXJyb3IubWVzc2FnZSwgY29tcG9uZW50U3RhY2tJbmZvKSA6IHZvaWQgMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjaGVja1JlYWN0VHlwZVNwZWM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0L2xpYi9jaGVja1JlYWN0VHlwZVNwZWMuanNcbi8vIG1vZHVsZSBpZCA9IDkxXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpO1xuXG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IGNoaWxkIGluIGEgY29sbGVjdGlvbiBvZiBjaGlsZHJlbiBhbmQgdmVyaWZpZXMgdGhhdCB0aGVyZVxuICogaXMgb25seSBvbmUgY2hpbGQgaW4gdGhlIGNvbGxlY3Rpb24uXG4gKlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNoaWxkcmVuLm9ubHlcbiAqXG4gKiBUaGUgY3VycmVudCBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCBhIHNpbmdsZSBjaGlsZCBnZXRzXG4gKiBwYXNzZWQgd2l0aG91dCBhIHdyYXBwZXIsIGJ1dCB0aGUgcHVycG9zZSBvZiB0aGlzIGhlbHBlciBmdW5jdGlvbiBpcyB0b1xuICogYWJzdHJhY3QgYXdheSB0aGUgcGFydGljdWxhciBzdHJ1Y3R1cmUgb2YgY2hpbGRyZW4uXG4gKlxuICogQHBhcmFtIHs/b2JqZWN0fSBjaGlsZHJlbiBDaGlsZCBjb2xsZWN0aW9uIHN0cnVjdHVyZS5cbiAqIEByZXR1cm4ge1JlYWN0RWxlbWVudH0gVGhlIGZpcnN0IGFuZCBvbmx5IGBSZWFjdEVsZW1lbnRgIGNvbnRhaW5lZCBpbiB0aGVcbiAqIHN0cnVjdHVyZS5cbiAqL1xuZnVuY3Rpb24gb25seUNoaWxkKGNoaWxkcmVuKSB7XG4gICFSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoY2hpbGRyZW4pID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0LkNoaWxkcmVuLm9ubHkgZXhwZWN0ZWQgdG8gcmVjZWl2ZSBhIHNpbmdsZSBSZWFjdCBlbGVtZW50IGNoaWxkLicpIDogX3Byb2RJbnZhcmlhbnQoJzE0MycpIDogdm9pZCAwO1xuICByZXR1cm4gY2hpbGRyZW47XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb25seUNoaWxkO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC9saWIvb25seUNoaWxkLmpzXG4vLyBtb2R1bGUgaWQgPSA5MlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnRTeW1ib2wnKTtcblxudmFyIGdldEl0ZXJhdG9yRm4gPSByZXF1aXJlKCcuL2dldEl0ZXJhdG9yRm4nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciBLZXlFc2NhcGVVdGlscyA9IHJlcXVpcmUoJy4vS2V5RXNjYXBlVXRpbHMnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG52YXIgU0VQQVJBVE9SID0gJy4nO1xudmFyIFNVQlNFUEFSQVRPUiA9ICc6JztcblxuLyoqXG4gKiBUaGlzIGlzIGlubGluZWQgZnJvbSBSZWFjdEVsZW1lbnQgc2luY2UgdGhpcyBmaWxlIGlzIHNoYXJlZCBiZXR3ZWVuXG4gKiBpc29tb3JwaGljIGFuZCByZW5kZXJlcnMuIFdlIGNvdWxkIGV4dHJhY3QgdGhpcyB0byBhXG4gKlxuICovXG5cbi8qKlxuICogVE9ETzogVGVzdCB0aGF0IGEgc2luZ2xlIGNoaWxkIGFuZCBhbiBhcnJheSB3aXRoIG9uZSBpdGVtIGhhdmUgdGhlIHNhbWUga2V5XG4gKiBwYXR0ZXJuLlxuICovXG5cbnZhciBkaWRXYXJuQWJvdXRNYXBzID0gZmFsc2U7XG5cbi8qKlxuICogR2VuZXJhdGUgYSBrZXkgc3RyaW5nIHRoYXQgaWRlbnRpZmllcyBhIGNvbXBvbmVudCB3aXRoaW4gYSBzZXQuXG4gKlxuICogQHBhcmFtIHsqfSBjb21wb25lbnQgQSBjb21wb25lbnQgdGhhdCBjb3VsZCBjb250YWluIGEgbWFudWFsIGtleS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBJbmRleCB0aGF0IGlzIHVzZWQgaWYgYSBtYW51YWwga2V5IGlzIG5vdCBwcm92aWRlZC5cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0Q29tcG9uZW50S2V5KGNvbXBvbmVudCwgaW5kZXgpIHtcbiAgLy8gRG8gc29tZSB0eXBlY2hlY2tpbmcgaGVyZSBzaW5jZSB3ZSBjYWxsIHRoaXMgYmxpbmRseS4gV2Ugd2FudCB0byBlbnN1cmVcbiAgLy8gdGhhdCB3ZSBkb24ndCBibG9jayBwb3RlbnRpYWwgZnV0dXJlIEVTIEFQSXMuXG4gIGlmIChjb21wb25lbnQgJiYgdHlwZW9mIGNvbXBvbmVudCA9PT0gJ29iamVjdCcgJiYgY29tcG9uZW50LmtleSAhPSBudWxsKSB7XG4gICAgLy8gRXhwbGljaXQga2V5XG4gICAgcmV0dXJuIEtleUVzY2FwZVV0aWxzLmVzY2FwZShjb21wb25lbnQua2V5KTtcbiAgfVxuICAvLyBJbXBsaWNpdCBrZXkgZGV0ZXJtaW5lZCBieSB0aGUgaW5kZXggaW4gdGhlIHNldFxuICByZXR1cm4gaW5kZXgudG9TdHJpbmcoMzYpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHshc3RyaW5nfSBuYW1lU29GYXIgTmFtZSBvZiB0aGUga2V5IHBhdGggc28gZmFyLlxuICogQHBhcmFtIHshZnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrIHRvIGludm9rZSB3aXRoIGVhY2ggY2hpbGQgZm91bmQuXG4gKiBAcGFyYW0gez8qfSB0cmF2ZXJzZUNvbnRleHQgVXNlZCB0byBwYXNzIGluZm9ybWF0aW9uIHRocm91Z2hvdXQgdGhlIHRyYXZlcnNhbFxuICogcHJvY2Vzcy5cbiAqIEByZXR1cm4geyFudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4gaW4gdGhpcyBzdWJ0cmVlLlxuICovXG5mdW5jdGlvbiB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZHJlbiwgbmFtZVNvRmFyLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIGNoaWxkcmVuO1xuXG4gIGlmICh0eXBlID09PSAndW5kZWZpbmVkJyB8fCB0eXBlID09PSAnYm9vbGVhbicpIHtcbiAgICAvLyBBbGwgb2YgdGhlIGFib3ZlIGFyZSBwZXJjZWl2ZWQgYXMgbnVsbC5cbiAgICBjaGlsZHJlbiA9IG51bGw7XG4gIH1cblxuICBpZiAoY2hpbGRyZW4gPT09IG51bGwgfHwgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZSA9PT0gJ251bWJlcicgfHxcbiAgLy8gVGhlIGZvbGxvd2luZyBpcyBpbmxpbmVkIGZyb20gUmVhY3RFbGVtZW50LiBUaGlzIG1lYW5zIHdlIGNhbiBvcHRpbWl6ZVxuICAvLyBzb21lIGNoZWNrcy4gUmVhY3QgRmliZXIgYWxzbyBpbmxpbmVzIHRoaXMgbG9naWMgZm9yIHNpbWlsYXIgcHVycG9zZXMuXG4gIHR5cGUgPT09ICdvYmplY3QnICYmIGNoaWxkcmVuLiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEUpIHtcbiAgICBjYWxsYmFjayh0cmF2ZXJzZUNvbnRleHQsIGNoaWxkcmVuLFxuICAgIC8vIElmIGl0J3MgdGhlIG9ubHkgY2hpbGQsIHRyZWF0IHRoZSBuYW1lIGFzIGlmIGl0IHdhcyB3cmFwcGVkIGluIGFuIGFycmF5XG4gICAgLy8gc28gdGhhdCBpdCdzIGNvbnNpc3RlbnQgaWYgdGhlIG51bWJlciBvZiBjaGlsZHJlbiBncm93cy5cbiAgICBuYW1lU29GYXIgPT09ICcnID8gU0VQQVJBVE9SICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkcmVuLCAwKSA6IG5hbWVTb0Zhcik7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICB2YXIgY2hpbGQ7XG4gIHZhciBuZXh0TmFtZTtcbiAgdmFyIHN1YnRyZWVDb3VudCA9IDA7IC8vIENvdW50IG9mIGNoaWxkcmVuIGZvdW5kIGluIHRoZSBjdXJyZW50IHN1YnRyZWUuXG4gIHZhciBuZXh0TmFtZVByZWZpeCA9IG5hbWVTb0ZhciA9PT0gJycgPyBTRVBBUkFUT1IgOiBuYW1lU29GYXIgKyBTVUJTRVBBUkFUT1I7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIGkpO1xuICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihjaGlsZHJlbik7XG4gICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChjaGlsZHJlbik7XG4gICAgICB2YXIgc3RlcDtcbiAgICAgIGlmIChpdGVyYXRvckZuICE9PSBjaGlsZHJlbi5lbnRyaWVzKSB7XG4gICAgICAgIHZhciBpaSA9IDA7XG4gICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICBjaGlsZCA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgbmV4dE5hbWUgPSBuZXh0TmFtZVByZWZpeCArIGdldENvbXBvbmVudEtleShjaGlsZCwgaWkrKyk7XG4gICAgICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgdmFyIG1hcHNBc0NoaWxkcmVuQWRkZW5kdW0gPSAnJztcbiAgICAgICAgICBpZiAoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgICAgICAgICAgdmFyIG1hcHNBc0NoaWxkcmVuT3duZXJOYW1lID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC5nZXROYW1lKCk7XG4gICAgICAgICAgICBpZiAobWFwc0FzQ2hpbGRyZW5Pd25lck5hbWUpIHtcbiAgICAgICAgICAgICAgbWFwc0FzQ2hpbGRyZW5BZGRlbmR1bSA9ICcgQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYCcgKyBtYXBzQXNDaGlsZHJlbk93bmVyTmFtZSArICdgLic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGRpZFdhcm5BYm91dE1hcHMsICdVc2luZyBNYXBzIGFzIGNoaWxkcmVuIGlzIG5vdCB5ZXQgZnVsbHkgc3VwcG9ydGVkLiBJdCBpcyBhbiAnICsgJ2V4cGVyaW1lbnRhbCBmZWF0dXJlIHRoYXQgbWlnaHQgYmUgcmVtb3ZlZC4gQ29udmVydCBpdCB0byBhICcgKyAnc2VxdWVuY2UgLyBpdGVyYWJsZSBvZiBrZXllZCBSZWFjdEVsZW1lbnRzIGluc3RlYWQuJXMnLCBtYXBzQXNDaGlsZHJlbkFkZGVuZHVtKSA6IHZvaWQgMDtcbiAgICAgICAgICBkaWRXYXJuQWJvdXRNYXBzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICBjaGlsZCA9IGVudHJ5WzFdO1xuICAgICAgICAgICAgbmV4dE5hbWUgPSBuZXh0TmFtZVByZWZpeCArIEtleUVzY2FwZVV0aWxzLmVzY2FwZShlbnRyeVswXSkgKyBTVUJTRVBBUkFUT1IgKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIDApO1xuICAgICAgICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIGFkZGVuZHVtID0gJyc7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBhZGRlbmR1bSA9ICcgSWYgeW91IG1lYW50IHRvIHJlbmRlciBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4sIHVzZSBhbiBhcnJheSAnICsgJ2luc3RlYWQgb3Igd3JhcCB0aGUgb2JqZWN0IHVzaW5nIGNyZWF0ZUZyYWdtZW50KG9iamVjdCkgZnJvbSB0aGUgJyArICdSZWFjdCBhZGQtb25zLic7XG4gICAgICAgIGlmIChjaGlsZHJlbi5faXNSZWFjdEVsZW1lbnQpIHtcbiAgICAgICAgICBhZGRlbmR1bSA9ICcgSXQgbG9va3MgbGlrZSB5b3VcXCdyZSB1c2luZyBhbiBlbGVtZW50IGNyZWF0ZWQgYnkgYSBkaWZmZXJlbnQgJyArICd2ZXJzaW9uIG9mIFJlYWN0LiBNYWtlIHN1cmUgdG8gdXNlIG9ubHkgb25lIGNvcHkgb2YgUmVhY3QuJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgICAgICAgIHZhciBuYW1lID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC5nZXROYW1lKCk7XG4gICAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgIGFkZGVuZHVtICs9ICcgQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYCcgKyBuYW1lICsgJ2AuJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBjaGlsZHJlblN0cmluZyA9IFN0cmluZyhjaGlsZHJlbik7XG4gICAgICAhZmFsc2UgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnT2JqZWN0cyBhcmUgbm90IHZhbGlkIGFzIGEgUmVhY3QgY2hpbGQgKGZvdW5kOiAlcykuJXMnLCBjaGlsZHJlblN0cmluZyA9PT0gJ1tvYmplY3QgT2JqZWN0XScgPyAnb2JqZWN0IHdpdGgga2V5cyB7JyArIE9iamVjdC5rZXlzKGNoaWxkcmVuKS5qb2luKCcsICcpICsgJ30nIDogY2hpbGRyZW5TdHJpbmcsIGFkZGVuZHVtKSA6IF9wcm9kSW52YXJpYW50KCczMScsIGNoaWxkcmVuU3RyaW5nID09PSAnW29iamVjdCBPYmplY3RdJyA/ICdvYmplY3Qgd2l0aCBrZXlzIHsnICsgT2JqZWN0LmtleXMoY2hpbGRyZW4pLmpvaW4oJywgJykgKyAnfScgOiBjaGlsZHJlblN0cmluZywgYWRkZW5kdW0pIDogdm9pZCAwO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdWJ0cmVlQ291bnQ7XG59XG5cbi8qKlxuICogVHJhdmVyc2VzIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYCwgYnV0XG4gKiBtaWdodCBhbHNvIGJlIHNwZWNpZmllZCB0aHJvdWdoIGF0dHJpYnV0ZXM6XG4gKlxuICogLSBgdHJhdmVyc2VBbGxDaGlsZHJlbih0aGlzLnByb3BzLmNoaWxkcmVuLCAuLi4pYFxuICogLSBgdHJhdmVyc2VBbGxDaGlsZHJlbih0aGlzLnByb3BzLmxlZnRQYW5lbENoaWxkcmVuLCAuLi4pYFxuICpcbiAqIFRoZSBgdHJhdmVyc2VDb250ZXh0YCBpcyBhbiBvcHRpb25hbCBhcmd1bWVudCB0aGF0IGlzIHBhc3NlZCB0aHJvdWdoIHRoZVxuICogZW50aXJlIHRyYXZlcnNhbC4gSXQgY2FuIGJlIHVzZWQgdG8gc3RvcmUgYWNjdW11bGF0aW9ucyBvciBhbnl0aGluZyBlbHNlIHRoYXRcbiAqIHRoZSBjYWxsYmFjayBtaWdodCBmaW5kIHJlbGV2YW50LlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgb2JqZWN0LlxuICogQHBhcmFtIHshZnVuY3Rpb259IGNhbGxiYWNrIFRvIGludm9rZSB1cG9uIHRyYXZlcnNpbmcgZWFjaCBjaGlsZC5cbiAqIEBwYXJhbSB7Pyp9IHRyYXZlcnNlQ29udGV4dCBDb250ZXh0IGZvciB0cmF2ZXJzYWwuXG4gKiBAcmV0dXJuIHshbnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuIGluIHRoaXMgc3VidHJlZS5cbiAqL1xuZnVuY3Rpb24gdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCkge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgcmV0dXJuIHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkcmVuLCAnJywgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdHJhdmVyc2VBbGxDaGlsZHJlbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3QvbGliL3RyYXZlcnNlQWxsQ2hpbGRyZW4uanNcbi8vIG1vZHVsZSBpZCA9IDkzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJzb3VyY2VSb290IjoiIn0=