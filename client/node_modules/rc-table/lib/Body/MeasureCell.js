"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MeasureCell;

var React = _interopRequireWildcard(require("react"));

var _rcResizeObserver = _interopRequireDefault(require("rc-resize-observer"));

function MeasureCell(_ref) {
  var columnKey = _ref.columnKey,
      onColumnResize = _ref.onColumnResize;
  var cellRef = React.useRef();
  React.useEffect(function () {
    if (cellRef.current) {
      onColumnResize(columnKey, cellRef.current.offsetWidth);
    }
  }, []);
  return /*#__PURE__*/React.createElement(_rcResizeObserver.default, {
    onResize: function onResize(_ref2) {
      var offsetWidth = _ref2.offsetWidth;
      onColumnResize(columnKey, offsetWidth);
    }
  }, /*#__PURE__*/React.createElement("td", {
    ref: cellRef,
    style: {
      padding: 0,
      border: 0,
      height: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 0,
      overflow: 'hidden'
    }
  }, "\xA0")));
}