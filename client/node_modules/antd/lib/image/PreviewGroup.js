"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.icons = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var React = _interopRequireWildcard(require("react"));

var _rcImage = _interopRequireDefault(require("rc-image"));

var _RotateLeftOutlined = _interopRequireDefault(require("@ant-design/icons/RotateLeftOutlined"));

var _RotateRightOutlined = _interopRequireDefault(require("@ant-design/icons/RotateRightOutlined"));

var _ZoomInOutlined = _interopRequireDefault(require("@ant-design/icons/ZoomInOutlined"));

var _ZoomOutOutlined = _interopRequireDefault(require("@ant-design/icons/ZoomOutOutlined"));

var _CloseOutlined = _interopRequireDefault(require("@ant-design/icons/CloseOutlined"));

var _LeftOutlined = _interopRequireDefault(require("@ant-design/icons/LeftOutlined"));

var _RightOutlined = _interopRequireDefault(require("@ant-design/icons/RightOutlined"));

var _configProvider = require("../config-provider");

var _motion = require("../_util/motion");

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

var icons = {
  rotateLeft: /*#__PURE__*/React.createElement(_RotateLeftOutlined["default"], null),
  rotateRight: /*#__PURE__*/React.createElement(_RotateRightOutlined["default"], null),
  zoomIn: /*#__PURE__*/React.createElement(_ZoomInOutlined["default"], null),
  zoomOut: /*#__PURE__*/React.createElement(_ZoomOutOutlined["default"], null),
  close: /*#__PURE__*/React.createElement(_CloseOutlined["default"], null),
  left: /*#__PURE__*/React.createElement(_LeftOutlined["default"], null),
  right: /*#__PURE__*/React.createElement(_RightOutlined["default"], null)
};
exports.icons = icons;

var InternalPreviewGroup = function InternalPreviewGroup(_a) {
  var customizePrefixCls = _a.previewPrefixCls,
      preview = _a.preview,
      props = __rest(_a, ["previewPrefixCls", "preview"]);

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls;

  var prefixCls = getPrefixCls('image-preview', customizePrefixCls);
  var rootPrefixCls = getPrefixCls();
  var mergedPreview = React.useMemo(function () {
    if (preview === false) {
      return preview;
    }

    var _preview = (0, _typeof2["default"])(preview) === 'object' ? preview : {};

    return (0, _extends2["default"])((0, _extends2["default"])({}, _preview), {
      transitionName: (0, _motion.getTransitionName)(rootPrefixCls, 'zoom', _preview.transitionName),
      maskTransitionName: (0, _motion.getTransitionName)(rootPrefixCls, 'fade', _preview.maskTransitionName)
    });
  }, [preview]);
  return /*#__PURE__*/React.createElement(_rcImage["default"].PreviewGroup, (0, _extends2["default"])({
    preview: mergedPreview,
    previewPrefixCls: prefixCls,
    icons: icons
  }, props));
};

var _default = InternalPreviewGroup;
exports["default"] = _default;