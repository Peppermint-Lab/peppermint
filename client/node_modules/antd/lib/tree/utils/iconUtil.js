"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = renderSwitcherIcon;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _LoadingOutlined = _interopRequireDefault(require("@ant-design/icons/LoadingOutlined"));

var _FileOutlined = _interopRequireDefault(require("@ant-design/icons/FileOutlined"));

var _MinusSquareOutlined = _interopRequireDefault(require("@ant-design/icons/MinusSquareOutlined"));

var _PlusSquareOutlined = _interopRequireDefault(require("@ant-design/icons/PlusSquareOutlined"));

var _CaretDownFilled = _interopRequireDefault(require("@ant-design/icons/CaretDownFilled"));

var _reactNode = require("../../_util/reactNode");

function renderSwitcherIcon(prefixCls, switcherIcon, showLine, _ref) {
  var isLeaf = _ref.isLeaf,
      expanded = _ref.expanded,
      loading = _ref.loading;

  if (loading) {
    return /*#__PURE__*/React.createElement(_LoadingOutlined["default"], {
      className: "".concat(prefixCls, "-switcher-loading-icon")
    });
  }

  var showLeafIcon;

  if (showLine && (0, _typeof2["default"])(showLine) === 'object') {
    showLeafIcon = showLine.showLeafIcon;
  }

  if (isLeaf) {
    if (showLine) {
      if ((0, _typeof2["default"])(showLine) === 'object' && !showLeafIcon) {
        return /*#__PURE__*/React.createElement("span", {
          className: "".concat(prefixCls, "-switcher-leaf-line")
        });
      }

      return /*#__PURE__*/React.createElement(_FileOutlined["default"], {
        className: "".concat(prefixCls, "-switcher-line-icon")
      });
    }

    return null;
  }

  var switcherCls = "".concat(prefixCls, "-switcher-icon");

  if ((0, _reactNode.isValidElement)(switcherIcon)) {
    return (0, _reactNode.cloneElement)(switcherIcon, {
      className: (0, _classnames["default"])(switcherIcon.props.className || '', switcherCls)
    });
  }

  if (switcherIcon) {
    return switcherIcon;
  }

  if (showLine) {
    return expanded ? /*#__PURE__*/React.createElement(_MinusSquareOutlined["default"], {
      className: "".concat(prefixCls, "-switcher-line-icon")
    }) : /*#__PURE__*/React.createElement(_PlusSquareOutlined["default"], {
      className: "".concat(prefixCls, "-switcher-line-icon")
    });
  }

  return /*#__PURE__*/React.createElement(_CaretDownFilled["default"], {
    className: switcherCls
  });
}