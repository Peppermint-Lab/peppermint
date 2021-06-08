"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPaginationParam = getPaginationParam;
exports["default"] = usePagination;
exports.DEFAULT_PAGE_SIZE = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = require("react");

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var DEFAULT_PAGE_SIZE = 10;
exports.DEFAULT_PAGE_SIZE = DEFAULT_PAGE_SIZE;

function getPaginationParam(pagination, mergedPagination) {
  var param = {
    current: mergedPagination.current,
    pageSize: mergedPagination.pageSize
  };
  var paginationObj = pagination && (0, _typeof2["default"])(pagination) === 'object' ? pagination : {};
  Object.keys(paginationObj).forEach(function (pageProp) {
    var value = mergedPagination[pageProp];

    if (typeof value !== 'function') {
      param[pageProp] = value;
    }
  });
  return param;
}

function extendsObject() {
  var result = {};

  for (var _len = arguments.length, list = new Array(_len), _key = 0; _key < _len; _key++) {
    list[_key] = arguments[_key];
  }

  list.forEach(function (obj) {
    if (obj) {
      Object.keys(obj).forEach(function (key) {
        var val = obj[key];

        if (val !== undefined) {
          result[key] = val;
        }
      });
    }
  });
  return result;
}

function usePagination(total, pagination, onChange) {
  var _a = pagination && (0, _typeof2["default"])(pagination) === 'object' ? pagination : {},
      _a$total = _a.total,
      paginationTotal = _a$total === void 0 ? 0 : _a$total,
      paginationObj = __rest(_a, ["total"]);

  var _useState = (0, _react.useState)(function () {
    return {
      current: 'defaultCurrent' in paginationObj ? paginationObj.defaultCurrent : 1,
      pageSize: 'defaultPageSize' in paginationObj ? paginationObj.defaultPageSize : DEFAULT_PAGE_SIZE
    };
  }),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      innerPagination = _useState2[0],
      setInnerPagination = _useState2[1]; // ============ Basic Pagination Config ============


  var mergedPagination = extendsObject(innerPagination, paginationObj, {
    total: paginationTotal > 0 ? paginationTotal : total
  }); // Reset `current` if data length or pageSize changed

  var maxPage = Math.ceil((paginationTotal || total) / mergedPagination.pageSize);

  if (mergedPagination.current > maxPage) {
    // Prevent a maximum page count of 0
    mergedPagination.current = maxPage || 1;
  }

  var refreshPagination = function refreshPagination() {
    var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var pageSize = arguments.length > 1 ? arguments[1] : undefined;
    setInnerPagination({
      current: current,
      pageSize: pageSize || mergedPagination.pageSize
    });
  };

  var onInternalChange = function onInternalChange(current, pageSize) {
    var _a;

    if (pagination) {
      (_a = pagination.onChange) === null || _a === void 0 ? void 0 : _a.call(pagination, current, pageSize);
    }

    refreshPagination(current, pageSize);
    onChange(current, pageSize || (mergedPagination === null || mergedPagination === void 0 ? void 0 : mergedPagination.pageSize));
  };

  if (pagination === false) {
    return [{}, function () {}];
  }

  return [(0, _extends2["default"])((0, _extends2["default"])({}, mergedPagination), {
    onChange: onInternalChange
  }), refreshPagination];
}