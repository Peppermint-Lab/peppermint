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
import devWarning from '../_util/devWarning';
import Base from './Base';

var Link = function Link(_a, ref) {
  var ellipsis = _a.ellipsis,
      rel = _a.rel,
      restProps = __rest(_a, ["ellipsis", "rel"]);

  devWarning(_typeof(ellipsis) !== 'object', 'Typography.Link', '`ellipsis` only supports boolean value.');
  var baseRef = React.useRef(null);
  React.useImperativeHandle(ref, function () {
    var _a;

    return (_a = baseRef.current) === null || _a === void 0 ? void 0 : _a.contentRef.current;
  });

  var mergedProps = _extends(_extends({}, restProps), {
    rel: rel === undefined && restProps.target === '_blank' ? 'noopener noreferrer' : rel
  }); // https://github.com/ant-design/ant-design/issues/26622
  // @ts-ignore


  delete mergedProps.navigate;
  return /*#__PURE__*/React.createElement(Base, _extends({}, mergedProps, {
    ref: baseRef,
    ellipsis: !!ellipsis,
    component: "a"
  }));
};

export default /*#__PURE__*/React.forwardRef(Link);