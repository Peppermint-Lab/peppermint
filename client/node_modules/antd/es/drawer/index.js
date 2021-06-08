import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

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
import RcDrawer from 'rc-drawer';
import getScrollBarSize from "rc-util/es/getScrollBarSize";
import CloseOutlined from "@ant-design/icons/es/icons/CloseOutlined";
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import { tuple } from '../_util/type';
import useForceUpdate from '../_util/hooks/useForceUpdate';
var DrawerContext = /*#__PURE__*/React.createContext(null);
var PlacementTypes = tuple('top', 'right', 'bottom', 'left');
var defaultPushState = {
  distance: 180
};
var Drawer = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var _a$width = _a.width,
      width = _a$width === void 0 ? 256 : _a$width,
      _a$height = _a.height,
      height = _a$height === void 0 ? 256 : _a$height,
      _a$closable = _a.closable,
      closable = _a$closable === void 0 ? true : _a$closable,
      _a$placement = _a.placement,
      placement = _a$placement === void 0 ? 'right' : _a$placement,
      _a$maskClosable = _a.maskClosable,
      maskClosable = _a$maskClosable === void 0 ? true : _a$maskClosable,
      _a$mask = _a.mask,
      mask = _a$mask === void 0 ? true : _a$mask,
      _a$level = _a.level,
      level = _a$level === void 0 ? null : _a$level,
      _a$keyboard = _a.keyboard,
      keyboard = _a$keyboard === void 0 ? true : _a$keyboard,
      _a$push = _a.push,
      _push = _a$push === void 0 ? defaultPushState : _a$push,
      _a$closeIcon = _a.closeIcon,
      closeIcon = _a$closeIcon === void 0 ? /*#__PURE__*/React.createElement(CloseOutlined, null) : _a$closeIcon,
      bodyStyle = _a.bodyStyle,
      drawerStyle = _a.drawerStyle,
      prefixCls = _a.prefixCls,
      className = _a.className,
      direction = _a.direction,
      visible = _a.visible,
      children = _a.children,
      zIndex = _a.zIndex,
      destroyOnClose = _a.destroyOnClose,
      style = _a.style,
      title = _a.title,
      headerStyle = _a.headerStyle,
      onClose = _a.onClose,
      footer = _a.footer,
      footerStyle = _a.footerStyle,
      rest = __rest(_a, ["width", "height", "closable", "placement", "maskClosable", "mask", "level", "keyboard", "push", "closeIcon", "bodyStyle", "drawerStyle", "prefixCls", "className", "direction", "visible", "children", "zIndex", "destroyOnClose", "style", "title", "headerStyle", "onClose", "footer", "footerStyle"]);

  var forceUpdate = useForceUpdate();

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      internalPush = _React$useState2[0],
      setPush = _React$useState2[1];

  var parentDrawer = React.useContext(DrawerContext);
  var destroyClose = React.useRef(false);
  React.useEffect(function () {
    // fix: delete drawer in child and re-render, no push started.
    // <Drawer>{show && <Drawer />}</Drawer>
    if (visible && parentDrawer) {
      parentDrawer.push();
    }

    return function () {
      if (parentDrawer) {
        parentDrawer.pull(); // parentDrawer = null;
      }
    };
  }, []);
  React.useEffect(function () {
    if (parentDrawer) {
      if (visible) {
        parentDrawer.push();
      } else {
        parentDrawer.pull();
      }
    }
  }, [visible]);
  var operations = React.useMemo(function () {
    return {
      push: function push() {
        if (_push) {
          setPush(true);
        }
      },
      pull: function pull() {
        if (_push) {
          setPush(false);
        }
      }
    };
  }, [_push]);
  React.useImperativeHandle(ref, function () {
    return operations;
  }, [operations]);
  var isDestroyOnClose = destroyOnClose && !visible;

  var onDestroyTransitionEnd = function onDestroyTransitionEnd() {
    if (!isDestroyOnClose) {
      return;
    }

    if (!visible) {
      destroyClose.current = true;
      forceUpdate();
    }
  };

  var getOffsetStyle = function getOffsetStyle() {
    // https://github.com/ant-design/ant-design/issues/24287
    if (!visible && !mask) {
      return {};
    }

    var offsetStyle = {};

    if (placement === 'left' || placement === 'right') {
      offsetStyle.width = width;
    } else {
      offsetStyle.height = height;
    }

    return offsetStyle;
  };

  var getRcDrawerStyle = function getRcDrawerStyle() {
    // get drawer push width or height
    var getPushTransform = function getPushTransform(_placement) {
      var distance;

      if (typeof _push === 'boolean') {
        distance = _push ? defaultPushState.distance : 0;
      } else {
        distance = _push.distance;
      }

      distance = parseFloat(String(distance || 0));

      if (_placement === 'left' || _placement === 'right') {
        return "translateX(".concat(_placement === 'left' ? distance : -distance, "px)");
      }

      if (_placement === 'top' || _placement === 'bottom') {
        return "translateY(".concat(_placement === 'top' ? distance : -distance, "px)");
      }
    }; // 当无 mask 时，将 width 应用到外层容器上
    // 解决 https://github.com/ant-design/ant-design/issues/12401 的问题


    var offsetStyle = mask ? {} : getOffsetStyle();
    return _extends(_extends({
      zIndex: zIndex,
      transform: internalPush ? getPushTransform(placement) : undefined
    }, offsetStyle), style);
  };

  function renderCloseIcon() {
    return closable && /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onClose,
      "aria-label": "Close",
      className: "".concat(prefixCls, "-close"),
      style: {
        '--scroll-bar': "".concat(getScrollBarSize(), "px")
      }
    }, closeIcon);
  }

  function renderHeader() {
    if (!title && !closable) {
      return null;
    }

    var headerClassName = title ? "".concat(prefixCls, "-header") : "".concat(prefixCls, "-header-no-title");
    return /*#__PURE__*/React.createElement("div", {
      className: headerClassName,
      style: headerStyle
    }, title && /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-title")
    }, title), closable && renderCloseIcon());
  }

  function renderFooter() {
    if (!footer) {
      return null;
    }

    var footerClassName = "".concat(prefixCls, "-footer");
    return /*#__PURE__*/React.createElement("div", {
      className: footerClassName,
      style: footerStyle
    }, footer);
  } // render drawer body dom


  var renderBody = function renderBody() {
    if (destroyClose.current && !visible) {
      return null;
    }

    destroyClose.current = false;
    var containerStyle = {};

    if (isDestroyOnClose) {
      // Increase the opacity transition, delete children after closing.
      containerStyle.opacity = 0;
      containerStyle.transition = 'opacity .3s';
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-wrapper-body"),
      style: _extends(_extends({}, containerStyle), drawerStyle),
      onTransitionEnd: onDestroyTransitionEnd
    }, renderHeader(), /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-body"),
      style: bodyStyle
    }, children), renderFooter());
  };

  var drawerClassName = classNames(_defineProperty({
    'no-mask': !mask
  }, "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
  var offsetStyle = mask ? getOffsetStyle() : {};
  return /*#__PURE__*/React.createElement(DrawerContext.Provider, {
    value: operations
  }, /*#__PURE__*/React.createElement(RcDrawer, _extends({
    handler: false
  }, _extends({
    placement: placement,
    prefixCls: prefixCls,
    maskClosable: maskClosable,
    level: level,
    keyboard: keyboard,
    children: children,
    onClose: onClose
  }, rest), offsetStyle, {
    open: visible,
    showMask: mask,
    style: getRcDrawerStyle(),
    className: drawerClassName
  }), renderBody()));
});
Drawer.displayName = 'Drawer';
var DrawerWrapper = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var customizePrefixCls = props.prefixCls,
      customizeGetContainer = props.getContainer;

  var _React$useContext = React.useContext(ConfigContext),
      getPopupContainer = _React$useContext.getPopupContainer,
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var prefixCls = getPrefixCls('drawer', customizePrefixCls);
  var getContainer = // 有可能为 false，所以不能直接判断
  customizeGetContainer === undefined && getPopupContainer ? function () {
    return getPopupContainer(document.body);
  } : customizeGetContainer;
  return /*#__PURE__*/React.createElement(Drawer, _extends({}, props, {
    ref: ref,
    prefixCls: prefixCls,
    getContainer: getContainer,
    direction: direction
  }));
});
DrawerWrapper.displayName = 'DrawerWrapper';
export default DrawerWrapper;