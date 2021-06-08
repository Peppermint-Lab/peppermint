"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = diff;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* eslint no-proto: 0 */
function createArray() {
  var arr = [];
  arr.__proto__ = new Array();

  arr.__proto__.format = function toString() {
    return this.map(function (obj) {
      return _objectSpread(_objectSpread({}, obj), {}, {
        path: obj.path.join(' > ')
      });
    });
  };

  arr.__proto__.toString = function toString() {
    return JSON.stringify(this.format(), null, 2);
  };

  return arr;
}

function diff(obj1, obj2) {
  var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var diffList = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : createArray();
  if (depth <= 0) return diffList;
  var keys = new Set([].concat((0, _toConsumableArray2.default)(Object.keys(obj1)), (0, _toConsumableArray2.default)(Object.keys(obj2))));
  keys.forEach(function (key) {
    var value1 = obj1[key];
    var value2 = obj2[key]; // Same value

    if (value1 === value2) return;
    var type1 = (0, _typeof2.default)(value1);
    var type2 = (0, _typeof2.default)(value2); // Diff type

    if (type1 !== type2) {
      diffList.push({
        path: path.concat(key),
        value1: value1,
        value2: value2
      });
      return;
    } // NaN


    if (Number.isNaN(value1) && Number.isNaN(value2)) {
      return;
    } // Object & Array


    if (type1 === 'object' && value1 !== null && value2 !== null) {
      diff(value1, value2, depth - 1, path.concat(key), diffList);
      return;
    } // Rest


    diffList.push({
      path: path.concat(key),
      value1: value1,
      value2: value2
    });
  });
  return diffList;
}