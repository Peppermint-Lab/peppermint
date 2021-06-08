"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ErrorList;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _rcMotion = _interopRequireDefault(require("rc-motion"));

var _useMemo = _interopRequireDefault(require("rc-util/lib/hooks/useMemo"));

var _useCacheErrors3 = _interopRequireDefault(require("./hooks/useCacheErrors"));

var _useForceUpdate = _interopRequireDefault(require("../_util/hooks/useForceUpdate"));

var _context = require("./context");

var _configProvider = require("../config-provider");

var EMPTY_LIST = [];

function ErrorList(_ref) {
  var _ref$errors = _ref.errors,
      errors = _ref$errors === void 0 ? EMPTY_LIST : _ref$errors,
      help = _ref.help,
      onDomErrorVisibleChange = _ref.onDomErrorVisibleChange;
  var forceUpdate = (0, _useForceUpdate["default"])();

  var _React$useContext = React.useContext(_context.FormItemPrefixContext),
      prefixCls = _React$useContext.prefixCls,
      status = _React$useContext.status;

  var _React$useContext2 = React.useContext(_configProvider.ConfigContext),
      getPrefixCls = _React$useContext2.getPrefixCls;

  var _useCacheErrors = (0, _useCacheErrors3["default"])(errors, function (changedVisible) {
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
      _useCacheErrors2 = (0, _slicedToArray2["default"])(_useCacheErrors, 2),
      visible = _useCacheErrors2[0],
      cacheErrors = _useCacheErrors2[1];

  var memoErrors = (0, _useMemo["default"])(function () {
    return cacheErrors;
  }, visible, function (_, nextVisible) {
    return nextVisible;
  }); // Memo status in same visible

  var _React$useState = React.useState(status),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      innerStatus = _React$useState2[0],
      setInnerStatus = _React$useState2[1];

  React.useEffect(function () {
    if (visible && status) {
      setInnerStatus(status);
    }
  }, [visible, status]);
  var baseClassName = "".concat(prefixCls, "-item-explain");
  var rootPrefixCls = getPrefixCls();
  return /*#__PURE__*/React.createElement(_rcMotion["default"], {
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
      className: (0, _classnames["default"])(baseClassName, (0, _defineProperty2["default"])({}, "".concat(baseClassName, "-").concat(innerStatus), innerStatus), motionClassName),
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