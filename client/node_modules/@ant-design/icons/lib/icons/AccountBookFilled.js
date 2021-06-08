"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _AccountBookFilled = _interopRequireDefault(require("@ant-design/icons-svg/lib/asn/AccountBookFilled"));

var _AntdIcon = _interopRequireDefault(require("../components/AntdIcon"));

// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY
var AccountBookFilled = function AccountBookFilled(props, ref) {
  return /*#__PURE__*/React.createElement(_AntdIcon.default, Object.assign({}, props, {
    ref: ref,
    icon: _AccountBookFilled.default
  }));
};

AccountBookFilled.displayName = 'AccountBookFilled';

var _default = /*#__PURE__*/React.forwardRef(AccountBookFilled);

exports.default = _default;