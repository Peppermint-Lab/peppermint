'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stripJsonComments = require('strip-json-comments');

var _stripJsonComments2 = _interopRequireDefault(_stripJsonComments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var varRgx = /^[@$]/;
var followVar = function followVar(value, lessVars, dictionary) {
  if (varRgx.test(value)) {
    // value is a variable
    return followVar(lessVars[value] || dictionary[value.replace(varRgx, '')]);
  }
  return value;
};

exports.default = function (sheet) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$dictionary = options.dictionary,
      dictionary = _options$dictionary === undefined ? {} : _options$dictionary,
      _options$resolveVaria = options.resolveVariables,
      resolveVariables = _options$resolveVaria === undefined ? false : _options$resolveVaria,
      _options$stripPrefix = options.stripPrefix,
      stripPrefix = _options$stripPrefix === undefined ? false : _options$stripPrefix;

  var lessVars = {};
  var matches = (0, _stripJsonComments2.default)(sheet).match(/[@$](.*:[^;]*)/g) || [];

  matches.forEach(function (variable) {
    var definition = variable.split(/:\s*/);
    var value = definition.splice(1).join(':');
    value = value.trim().replace(/^["'](.*)["']$/, '$1');
    lessVars[definition[0].replace(/['"]+/g, '').trim()] = value;
  });

  if (resolveVariables) {
    Object.keys(lessVars).forEach(function (key) {
      var value = lessVars[key];
      lessVars[key] = followVar(value, lessVars, dictionary);
    });
  }

  if (stripPrefix) {
    var transformKey = function transformKey(key) {
      return key.replace(varRgx, '');
    };

    lessVars = Object.keys(lessVars).reduce(function (prev, key) {
      prev[transformKey(key)] = lessVars[key];
      return prev;
    }, {});
  }

  return lessVars;
};

module.exports = exports['default'];