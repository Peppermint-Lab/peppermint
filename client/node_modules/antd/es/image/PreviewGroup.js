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
import RcImage from 'rc-image';
import RotateLeftOutlined from "@ant-design/icons/es/icons/RotateLeftOutlined";
import RotateRightOutlined from "@ant-design/icons/es/icons/RotateRightOutlined";
import ZoomInOutlined from "@ant-design/icons/es/icons/ZoomInOutlined";
import ZoomOutOutlined from "@ant-design/icons/es/icons/ZoomOutOutlined";
import CloseOutlined from "@ant-design/icons/es/icons/CloseOutlined";
import LeftOutlined from "@ant-design/icons/es/icons/LeftOutlined";
import RightOutlined from "@ant-design/icons/es/icons/RightOutlined";
import { ConfigContext } from '../config-provider';
import { getTransitionName } from '../_util/motion';
export var icons = {
  rotateLeft: /*#__PURE__*/React.createElement(RotateLeftOutlined, null),
  rotateRight: /*#__PURE__*/React.createElement(RotateRightOutlined, null),
  zoomIn: /*#__PURE__*/React.createElement(ZoomInOutlined, null),
  zoomOut: /*#__PURE__*/React.createElement(ZoomOutOutlined, null),
  close: /*#__PURE__*/React.createElement(CloseOutlined, null),
  left: /*#__PURE__*/React.createElement(LeftOutlined, null),
  right: /*#__PURE__*/React.createElement(RightOutlined, null)
};

var InternalPreviewGroup = function InternalPreviewGroup(_a) {
  var customizePrefixCls = _a.previewPrefixCls,
      preview = _a.preview,
      props = __rest(_a, ["previewPrefixCls", "preview"]);

  var _React$useContext = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls;

  var prefixCls = getPrefixCls('image-preview', customizePrefixCls);
  var rootPrefixCls = getPrefixCls();
  var mergedPreview = React.useMemo(function () {
    if (preview === false) {
      return preview;
    }

    var _preview = _typeof(preview) === 'object' ? preview : {};

    return _extends(_extends({}, _preview), {
      transitionName: getTransitionName(rootPrefixCls, 'zoom', _preview.transitionName),
      maskTransitionName: getTransitionName(rootPrefixCls, 'fade', _preview.maskTransitionName)
    });
  }, [preview]);
  return /*#__PURE__*/React.createElement(RcImage.PreviewGroup, _extends({
    preview: mergedPreview,
    previewPrefixCls: prefixCls,
    icons: icons
  }, props));
};

export default InternalPreviewGroup;