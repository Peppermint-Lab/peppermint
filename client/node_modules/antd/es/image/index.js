import _extends from "@babel/runtime/helpers/esm/extends";
import _typeof from "@babel/runtime/helpers/esm/typeof";

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import * as React from 'react';
import { useContext } from 'react';
import EyeOutlined from "@ant-design/icons/es/icons/EyeOutlined";
import RcImage from 'rc-image';
import defaultLocale from '../locale/en_US';
import PreviewGroup, { icons } from './PreviewGroup';
import { ConfigContext } from '../config-provider';
import { getTransitionName } from '../_util/motion';

var Image = function Image(_a) {
  var customizePrefixCls = _a.prefixCls,
      preview = _a.preview,
      otherProps = __rest(_a, ["prefixCls", "preview"]);

  var _useContext = useContext(ConfigContext),
      getPrefixCls = _useContext.getPrefixCls;

  var prefixCls = getPrefixCls('image', customizePrefixCls);
  var rootPrefixCls = getPrefixCls();

  var _useContext2 = useContext(ConfigContext),
      _useContext2$locale = _useContext2.locale,
      contextLocale = _useContext2$locale === void 0 ? defaultLocale : _useContext2$locale;

  var imageLocale = contextLocale.Image || defaultLocale.Image;
  var mergedPreview = React.useMemo(function () {
    if (preview === false) {
      return preview;
    }

    var _preview = _typeof(preview) === 'object' ? preview : {};

    return _extends(_extends({
      mask: /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls, "-mask-info")
      }, /*#__PURE__*/React.createElement(EyeOutlined, null), imageLocale === null || imageLocale === void 0 ? void 0 : imageLocale.preview),
      icons: icons
    }, _preview), {
      transitionName: getTransitionName(rootPrefixCls, 'zoom', _preview.transitionName),
      maskTransitionName: getTransitionName(rootPrefixCls, 'fade', _preview.maskTransitionName)
    });
  }, [preview, imageLocale]);
  return /*#__PURE__*/React.createElement(RcImage, _extends({
    prefixCls: prefixCls,
    preview: mergedPreview
  }, otherProps));
};

Image.PreviewGroup = PreviewGroup;
export default Image;