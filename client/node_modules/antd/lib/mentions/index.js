"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Option = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _rcMentions = _interopRequireDefault(require("rc-mentions"));

var _ref2 = require("rc-util/lib/ref");

var _spin = _interopRequireDefault(require("../spin"));

var _configProvider = require("../config-provider");

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

var Option = _rcMentions["default"].Option;
exports.Option = Option;

function loadingFilterOption() {
  return true;
}

var InternalMentions = function InternalMentions(_a, ref) {
  var _classNames;

  var customizePrefixCls = _a.prefixCls,
      className = _a.className,
      disabled = _a.disabled,
      loading = _a.loading,
      filterOption = _a.filterOption,
      children = _a.children,
      notFoundContent = _a.notFoundContent,
      restProps = __rest(_a, ["prefixCls", "className", "disabled", "loading", "filterOption", "children", "notFoundContent"]);

  var _React$useState = React.useState(false),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      focused = _React$useState2[0],
      setFocused = _React$useState2[1];

  var innerRef = React.useRef();
  var mergedRef = (0, _ref2.composeRef)(ref, innerRef);

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      renderEmpty = _React$useContext.renderEmpty,
      direction = _React$useContext.direction;

  var onFocus = function onFocus() {
    if (restProps.onFocus) {
      restProps.onFocus.apply(restProps, arguments);
    }

    setFocused(true);
  };

  var onBlur = function onBlur() {
    if (restProps.onBlur) {
      restProps.onBlur.apply(restProps, arguments);
    }

    setFocused(false);
  };

  var getNotFoundContent = function getNotFoundContent() {
    if (notFoundContent !== undefined) {
      return notFoundContent;
    }

    return renderEmpty('Select');
  };

  var getOptions = function getOptions() {
    if (loading) {
      return /*#__PURE__*/React.createElement(Option, {
        value: "ANTD_SEARCHING",
        disabled: true
      }, /*#__PURE__*/React.createElement(_spin["default"], {
        size: "small"
      }));
    }

    return children;
  };

  var getFilterOption = function getFilterOption() {
    if (loading) {
      return loadingFilterOption;
    }

    return filterOption;
  };

  var prefixCls = getPrefixCls('mentions', customizePrefixCls);
  var mergedClassName = (0, _classnames["default"])((_classNames = {}, (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-disabled"), disabled), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-focused"), focused), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _classNames), className);
  return /*#__PURE__*/React.createElement(_rcMentions["default"], (0, _extends2["default"])({
    prefixCls: prefixCls,
    notFoundContent: getNotFoundContent(),
    className: mergedClassName,
    disabled: disabled,
    direction: direction
  }, restProps, {
    filterOption: getFilterOption(),
    onFocus: onFocus,
    onBlur: onBlur,
    ref: mergedRef
  }), getOptions());
};

var Mentions = /*#__PURE__*/React.forwardRef(InternalMentions);
Mentions.displayName = 'Mentions';
Mentions.Option = Option;

Mentions.getMentions = function () {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var config = arguments.length > 1 ? arguments[1] : undefined;

  var _ref = config || {},
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === void 0 ? '@' : _ref$prefix,
      _ref$split = _ref.split,
      split = _ref$split === void 0 ? ' ' : _ref$split;

  var prefixList = Array.isArray(prefix) ? prefix : [prefix];
  return value.split(split).map(function () {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var hitPrefix = null;
    prefixList.some(function (prefixStr) {
      var startStr = str.slice(0, prefixStr.length);

      if (startStr === prefixStr) {
        hitPrefix = prefixStr;
        return true;
      }

      return false;
    });

    if (hitPrefix !== null) {
      return {
        prefix: hitPrefix,
        value: str.slice(hitPrefix.length)
      };
    }

    return null;
  }).filter(function (entity) {
    return !!entity && !!entity.value;
  });
};

var _default = Mentions;
exports["default"] = _default;