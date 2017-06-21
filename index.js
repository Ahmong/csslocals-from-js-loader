'use strict';

var _loaderUtils = require('loader-utils');
var _loaderUtils2 = _interopRequireDefault(_loaderUtils).default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (global, name, factory) {
  if (typeof exports === 'object')
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    if (typeof module !== 'undefined') {
      module.exports = factory();
  } else if (typeof define === 'function' && (define.amd || define.cmd)) {
    define(factory);
  } else {
    global[name] = factory.apply(this);
  }
}(this, "csslocalsFromJsLoader", function() {
  return loader;
}));

function loader(content) {
  try {
    return csslocalsFromJsLoader.bind(this)(content);
  } catch (err) {
    var errText = "Error in csslocals-from-js-loader/index.js :";
    console.log(errText);
    console.log(err.stack);
    throw err;
  }
}

function csslocalsFromJsLoader(content) {
  console.log("Begin of csslocalsFromJsLoader(), this=", JSON.stringify(this));

  if (this.cacheable) this.cacheable();

  var exports = this.exec(content, this.resource);
  var exportLocals = {};

  if (exports.locals)
    exportLocals = JSON.stringify(exports.locals);

  var result = "exports = module.exports = require(" + _loaderUtils2.stringifyRequest(this, require.resolve("css-loader/lib/css-base.js")) + ")();\n" +
    "exports.locals = " + exportLocals + "\n";

  console.log("result= \n'''\n" + result + "\n'''");
  return result;
}

/*

var _path = require('path');
var _path2 = _interopRequireDefault(_path);

function rel(p) {
return _path2.default.relative(process.cwd(), p);
}

function processResult(loaderContext, result) {
  if (!result || typeof result !== 'object' || 'code' in result === false) {
    loaderContext.callback(new Error(`The returned result of module ${rel(loaderContext.resource)} is not an object with a 'code' property.`));

    return;
  }

  if (typeof result.code !== 'string' && result.code instanceof Buffer === false) {
    loaderContext.callback(new Error(`The returned code of module ${rel(loaderContext.resource)} is neither a string nor an instance of Buffer.`));

    return;
  }

  (result.dependencies || []).forEach(function (dep) {
    return loaderContext.addDependency(dep);
  });
  // Defaults to false which is a good default here because we assume that
  // results tend to be not cacheable when this loader is necessary
  loaderContext.cacheable(Boolean(result.cacheable));

  loaderContext.callback(null, result.code, result.sourceMap || null, result.ast || null);
}


function valLoader(content) {
  var _this = this;

  var options = _loaderUtils2.default.getOptions(this);
  var exports = this.exec(content, this.resource);
  var func = exports && exports.default ? exports.default : exports;

  if (typeof func !== 'function') {
    throw new Error(`Module ${rel(this.resource)} does not export a function as default.`);
  }

  var result = func(options);

  if (result && typeof result.then === 'function') {
    var callback = this.async();

    result.then(function (res) {
      return processResult(_this, res);
    }, callback);

    return;
  }

  // No return necessary because processResult calls this.callback()
  processResult(this, result);
}

exports.default = valLoader;
*/
