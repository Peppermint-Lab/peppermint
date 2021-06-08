import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import useMemo from "rc-util/es/hooks/useMemo";
import useCacheErrors from './hooks/useCacheErrors';
import useForceUpdate from '../_util/hooks/useForceUpdate';
import { FormItemPrefixContext } from './context';
import { ConfigContext } from '../config-provider';
var EMPTY_LIST = [];
export default function ErrorList(_ref) {
  var _ref$errors = _ref.errors,
      errors = _ref$errors === void 0 ? EMPTY_LIST : _ref$errors,
      help = _ref.help,
      onDomErrorVisibleChange = _ref.onDomErrorVisibleChange;
  var forceUpdate = useForceUpdate();

  var _React$useContext = React.useContext(FormItemPrefixContext),
      prefixCls = _React$useContext.prefixCls,
      status = _React$useContext.status;

  var _React$useContext2 = React.useContext(ConfigContext),
      getPrefixCls = _React$useContext2.getPrefixCls;

  var _useCacheErrors = useCacheErrors(errors, function (changedVisible) {
    if (changedVisible) {
      /**
       * We trigger in sync to avoid dom shaking but this get warning in react 16.13.
       *
       * So use Promise to keep in micro async to handle this.
       * https://github.com/ant-design/ant-design/issues/21698#issuecomment-593743485
       */
      Promise.resolve().then(function () {
        onDomErrorVisibleChange === null || onDomErrorVisibleChange === void 0 ? void 0 : onDomErrorVisibleChange(true);
      });
    }

    forceUpdate();
  }, !!help),
      _useCacheErrors2 = _slicedToArray(_useCacheErrors, 2),
      visible = _useCacheErrors2[0],
      cacheErrors = _useCacheErrors2[1];

  var memoErrors = useMemo(function () {
    return cacheErrors;
  }, visible, function (_, nextVisible) {
    return nextVisible;
  }); // Memo status in same visible

  var _React$useState = React.useState(status),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      innerStatus = _React$useState2[0],
      setInnerStatus = _React$useState2[1];

  React.useEffect(function () {
    if (visible && status) {
      setInnerStatus(status);
    }
  }, [visible, status]);
  var baseClassName = "".concat(prefixCls, "-item-explain");
  var rootPrefixCls = getPrefixCls();
  return /*#__PURE__*/React.createElement(CSSMotion, {
    motionDeadline: 500,
    visible: visible,
    motionName: "".concat(rootPrefixCls, "-show-help"),
    onLeaveEnd: function onLeaveEnd() {
      onDomErrorVisibleChange === null || onDomErrorVisibleChange === void 0 ? void 0 : onDomErrorVisibleChange(false);
    },
    motionAppear: true,
    removeOnLeave: true
  }, function (_ref2) {
    var motionClassName = _ref2.className;
    return /*#__PURE__*/React.createElement("div", {
      className: classNames(baseClassName, _defineProperty({}, "".concat(baseClassName, "-").concat(innerStatus), innerStatus), motionClassName),
      key: "help"
    }, memoErrors.map(function (error, index) {
      return (
        /*#__PURE__*/
        // eslint-disable-next-line react/no-array-index-key
        React.createElement("div", {
          key: index,
          role: "alert"
        }, error)
      );
    }));
  });
}