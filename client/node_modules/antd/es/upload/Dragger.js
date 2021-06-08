import _extends from "@babel/runtime/helpers/esm/extends";

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
import Upload from './Upload';

var InternalDragger = function InternalDragger(_a, ref) {
  var style = _a.style,
      height = _a.height,
      restProps = __rest(_a, ["style", "height"]);

  return /*#__PURE__*/React.createElement(Upload, _extends({
    ref: ref
  }, restProps, {
    type: "drag",
    style: _extends(_extends({}, style), {
      height: height
    })
  }));
};

var Dragger = /*#__PURE__*/React.forwardRef(InternalDragger);
Dragger.displayName = 'Dragger';
export default Dragger;