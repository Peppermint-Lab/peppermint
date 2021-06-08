"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var React = _interopRequireWildcard(require("react"));

var _EyeOutlined = _interopRequireDefault(require("@ant-design/icons/EyeOutlined"));

var _rcImage = _interopRequireDefault(require("rc-image"));

var _en_US = _interopRequireDefault(require("../locale/en_US"));

var _PreviewGroup = _interopRequireWildcard(require("./PreviewGroup"));

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

var Image = function Image(_a) {
  var customizePrefixCls = _a.prefixCls,
      preview = _a.preview,
      otherProps = __rest(_a, ["prefixCls", "preview"]);

  var _useContext = (0, React.useContext)(_configProvider.ConfigContext),
      getPrefixCls = _useContext.getPrefixCls;

  var prefixCls = getPrefixCls('image', customizePrefixCls);
  var rootPrefixCls = getPrefixCls();

  var _useContext2 = (0, React.useContext)(_configProvider.ConfigContext),
      _useContext2$locale = _useContext2.locale,
      contextLocale = _useContext2$locale === void 0 ? _en_US["default"] : _useContext2$locale;

  var imageLocale = contextLocale.Image || _en_US["default"].Image;
  var mergedPreview = React.useMemo(function () {
    if (preview === false) {
      return preview;
    }

    var _preview = (0, _typeof2["default"])(preview) === 'object' ? preview : {};

    return (0, _extends2["default"])((0, _extends2["default"])({
      mask: /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls, "-mask-info")
      }, /*#__PURE__*/React.createElement(_EyeOutlined["default"], null), imageLocale === null || imageLocale === void 0 ? void 0 : imageLocale.preview),
      icons: _PreviewGroup.icons
    }, _preview), {
      transitionName: (0, _motion.getTransitionName)(rootPrefixCls, 'zoom', _preview.transitionName),
      maskTransitionName: (0, _motion.getTransitionName)(rootPrefixCls, 'fade', _preview.maskTransitionName)
    });
  }, [preview, imageLocale]);
  return /*#__PURE__*/React.createElement(_rcImage["default"], (0, _extends2["default"])({
    prefixCls: prefixCls,
    preview: mergedPreview
  }, otherProps));
};

Image.PreviewGroup = _PreviewGroup["default"];
var _default = Image;
exports["default"] = _default;