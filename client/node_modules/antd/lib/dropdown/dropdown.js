"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _rcDropdown = _interopRequireDefault(require("rc-dropdown"));

var _classnames = _interopRequireDefault(require("classnames"));

var _RightOutlined = _interopRequireDefault(require("@ant-design/icons/RightOutlined"));

var _dropdownButton = _interopRequireDefault(require("./dropdown-button"));

var _configProvider = require("../config-provider");

var _devWarning = _interopRequireDefault(require("../_util/devWarning"));

var _type = require("../_util/type");

var _reactNode = require("../_util/reactNode");

var Placements = (0, _type.tuple)('topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight');

var Dropdown = function Dropdown(props) {
  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getContextPopupContainer = _React$useContext.getPopupContainer,
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var getTransitionName = function getTransitionName() {
    var rootPrefixCls = getPrefixCls();
    var _props$placement = props.placement,
        placement = _props$placement === void 0 ? '' : _props$placement,
        transitionName = props.transitionName;

    if (transitionName !== undefined) {
      return transitionName;
    }

    if (placement.indexOf('top') >= 0) {
      return "".concat(rootPrefixCls, "-slide-down");
    }

    return "".concat(rootPrefixCls, "-slide-up");
  };

  var renderOverlay = function renderOverlay(prefixCls) {
    // rc-dropdown already can process the function of overlay, but we have check logic here.
    // So we need render the element to check and pass back to rc-dropdown.
    var overlay = props.overlay;
    var overlayNode;

    if (typeof overlay === 'function') {
      overlayNode = overlay();
    } else {
      overlayNode = overlay;
    }

    overlayNode = React.Children.only(typeof overlayNode === 'string' ? /*#__PURE__*/React.createElement("span", null, overlayNode) : overlayNode);
    var overlayProps = overlayNode.props; // Warning if use other mode

    (0, _devWarning["default"])(!overlayProps.mode || overlayProps.mode === 'vertical', 'Dropdown', "mode=\"".concat(overlayProps.mode, "\" is not supported for Dropdown's Menu.")); // menu cannot be selectable in dropdown defaultly
    // menu should be focusable in dropdown defaultly

    var _overlayProps$selecta = overlayProps.selectable,
        selectable = _overlayProps$selecta === void 0 ? false : _overlayProps$selecta,
        _overlayProps$focusab = overlayProps.focusable,
        focusable = _overlayProps$focusab === void 0 ? true : _overlayProps$focusab,
        expandIcon = overlayProps.expandIcon;
    var overlayNodeExpandIcon = typeof expandIcon !== 'undefined' && /*#__PURE__*/React.isValidElement(expandIcon) ? expandIcon : /*#__PURE__*/React.createElement("span", {
      className: "".concat(prefixCls, "-menu-submenu-arrow")
    }, /*#__PURE__*/React.createElement(_RightOutlined["default"], {
      className: "".concat(prefixCls, "-menu-submenu-arrow-icon")
    }));
    var fixedModeOverlay = typeof overlayNode.type === 'string' ? overlayNode : (0, _reactNode.cloneElement)(overlayNode, {
      mode: 'vertical',
      selectable: selectable,
      focusable: focusable,
      expandIcon: overlayNodeExpandIcon
    });
    return fixedModeOverlay;
  };

  var getPlacement = function getPlacement() {
    var placement = props.placement;

    if (placement !== undefined) {
      return placement;
    }

    return direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
  };

  var arrow = props.arrow,
      customizePrefixCls = props.prefixCls,
      children = props.children,
      trigger = props.trigger,
      disabled = props.disabled,
      getPopupContainer = props.getPopupContainer,
      overlayClassName = props.overlayClassName;
  var prefixCls = getPrefixCls('dropdown', customizePrefixCls);
  var child = React.Children.only(children);
  var dropdownTrigger = (0, _reactNode.cloneElement)(child, {
    className: (0, _classnames["default"])("".concat(prefixCls, "-trigger"), (0, _defineProperty2["default"])({}, "".concat(prefixCls, "-rtl"), direction === 'rtl'), child.props.className),
    disabled: disabled
  });
  var overlayClassNameCustomized = (0, _classnames["default"])(overlayClassName, (0, _defineProperty2["default"])({}, "".concat(prefixCls, "-rtl"), direction === 'rtl'));
  var triggerActions = disabled ? [] : trigger;
  var alignPoint;

  if (triggerActions && triggerActions.indexOf('contextMenu') !== -1) {
    alignPoint = true;
  }

  return /*#__PURE__*/React.createElement(_rcDropdown["default"], (0, _extends2["default"])({
    arrow: arrow,
    alignPoint: alignPoint
  }, props, {
    overlayClassName: overlayClassNameCustomized,
    prefixCls: prefixCls,
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    transitionName: getTransitionName(),
    trigger: triggerActions,
    overlay: function overlay() {
      return renderOverlay(prefixCls);
    },
    placement: getPlacement()
  }), dropdownTrigger);
};

Dropdown.Button = _dropdownButton["default"];
Dropdown.defaultProps = {
  mouseEnterDelay: 0.15,
  mouseLeaveDelay: 0.1
};
var _default = Dropdown;
exports["default"] = _default;