"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var Paragraph = function Paragraph(props) {
  var getWidth = function getWidth(index) {
    var width = props.width,
        _props$rows = props.rows,
        rows = _props$rows === void 0 ? 2 : _props$rows;

    if (Array.isArray(width)) {
      return width[index];
    } // last paragraph


    if (rows - 1 === index) {
      return width;
    }

    return undefined;
  };

  var prefixCls = props.prefixCls,
      className = props.className,
      style = props.style,
      rows = props.rows;
  var rowList = (0, _toConsumableArray2["default"])(Array(rows)).map(function (_, index) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      React.createElement("li", {
        key: index,
        style: {
          width: getWidth(index)
        }
      })
    );
  });
  return /*#__PURE__*/React.createElement("ul", {
    className: (0, _classnames["default"])(prefixCls, className),
    style: style
  }, rowList);
};

var _default = Paragraph;
exports["default"] = _default;