var loaderUtils = require('loader-utils');
var _ = require('underscore');
var path = require('path');

module.exports = loader;

function loader(content) {
  try {
    return content;
    // return csslocalsFromJsLoader.bind(this)(content);
  } catch (err) {
    console.log("Error in csslocals-from-js-loader/index.js :");
    console.log(err.stack);
    throw err;
  }
}

/*
function csslocalsFromJsLoader(content) {
  console.log("Begin of csslocalsFromJsLoader()");
  console.log("request=", this.request);
  console.log("content='''\n", content, "\n'''");
  var query = _loaderUtils2.getOptions(this) || {};

  var exportKeys = ['locals'];
  if (query.exports) {
    if (Array.isArray(query.exports)) {
      exportKeys = exportKeys.concat(query.exports)
    } else if (typeof query.exports === 'string') {
      exportKeys.push(query.exports)
    }
  }

  if (this.cacheable) this.cacheable();

  console.log('resourcePath= ', this.resourcePath);

  var exports = this.exec(content, this.resourcePath);
  var exportLocals = {};

  for (expKey of exportKeys) {
    if (exports[expKey]) {
      Object.assign(exportLocals, exports[expKey]);
    }
  }

  var result = "exports.locals = " + JSON.stringify(exportLocals);

  console.log("csslocalsFromJsLoader result= '''\n" + result + "\n'''");
  return result;
}
*/

module.exports.pitch = function(remainingRequest) {
  console.log('Begin in csslocals-from-js-loader/loader.pitch(), resource= ',
    path.basename(this.resource));
  // console.log('remainingRequest=', remainingRequest);

  try {
    if (this.cacheable) this.cacheable()
    var request = loaderUtils.stringifyRequest(this, '!!' + remainingRequest)
    var query = loaderUtils.getOptions(this) || {}
    // var id = JSON.stringify(hash(request))

    var exportKeys = ['locals'];
    if (query.exports) {
      if (Array.isArray(query.exports)) {
        exportKeys = exportKeys.concat(query.exports)
      } else if (typeof query.exports === 'string') {
        exportKeys.push(query.exports)
      }
    }
    exportKeys = _.uniq(exportKeys);

    var resultJs = [
      '// csslocals-from-js-loader: Exports the locals of a JS file.',
      '',
      '// load the JS file',
      'var content = require(' + request + ');',
      // content list format is [id, css, media, sourceMap]
      // "if(typeof content === 'string') content = [[module.id, content, '']];",
      'var exportLocals = {};',
      `for (expKey of ${JSON.stringify(exportKeys)}) {`,
      '  if (content[expKey]) {',
      '    Object.assign(exportLocals, content[expKey]);',
      '  }',
      '}',
      'exports.locals = exportLocals;'
      // 'if(content.locals) module.exports = content.locals;'
    ]
    var resultStr = resultJs.join('\n')
    // console.log('resultStr=***\n', resultStr, '\n***');
    console.log('End of csslocals-from-js-loader/loader.pitch()');
    return resultStr;
  } catch (err) {
    console.log("Error in csslocals-from-js-loader/loader.pitch():");
    console.log(err.stack)
  }
}