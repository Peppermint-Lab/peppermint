import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _createSuper from "@babel/runtime/helpers/esm/createSuper";

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
import classNames from 'classnames';
import toArray from "rc-util/es/Children/toArray";
import copy from 'copy-to-clipboard';
import omit from "rc-util/es/omit";
import EditOutlined from "@ant-design/icons/es/icons/EditOutlined";
import CheckOutlined from "@ant-design/icons/es/icons/CheckOutlined";
import CopyOutlined from "@ant-design/icons/es/icons/CopyOutlined";
import ResizeObserver from 'rc-resize-observer';
import { configConsumerProps, ConfigContext } from '../config-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import devWarning from '../_util/devWarning';
import TransButton from '../_util/transButton';
import raf from '../_util/raf';
import { isStyleSupport } from '../_util/styleChecker';
import Tooltip from '../tooltip';
import Typography from './Typography';
import Editable from './Editable';
import measure from './util';
var isLineClampSupport = isStyleSupport('webkitLineClamp');
var isTextOverflowSupport = isStyleSupport('textOverflow');

function wrapperDecorations(_ref, content) {
  var mark = _ref.mark,
      code = _ref.code,
      underline = _ref.underline,
      del = _ref["delete"],
      strong = _ref.strong,
      keyboard = _ref.keyboard;
  var currentContent = content;

  function wrap(needed, tag) {
    if (!needed) return;
    currentContent = /*#__PURE__*/React.createElement(tag, {}, currentContent);
  }

  wrap(strong, 'strong');
  wrap(underline, 'u');
  wrap(del, 'del');
  wrap(code, 'code');
  wrap(mark, 'mark');
  wrap(keyboard, 'kbd');
  return currentContent;
}

var ELLIPSIS_STR = '...';

var Base = /*#__PURE__*/function (_React$Component) {
  _inherits(Base, _React$Component);

  var _super = _createSuper(Base);

  function Base() {
    var _this;

    _classCallCheck(this, Base);

    _this = _super.apply(this, arguments);
    _this.contentRef = /*#__PURE__*/React.createRef();
    _this.state = {
      edit: false,
      copied: false,
      ellipsisText: '',
      ellipsisContent: null,
      isEllipsis: false,
      expanded: false,
      clientRendered: false
    };

    _this.getPrefixCls = function () {
      var customizePrefixCls = _this.props.prefixCls;
      var getPrefixCls = _this.context.getPrefixCls;
      return getPrefixCls('typography', customizePrefixCls);
    }; // =============== Expand ===============


    _this.onExpandClick = function (e) {
      var _a;

      var _this$getEllipsis = _this.getEllipsis(),
          onExpand = _this$getEllipsis.onExpand;

      _this.setState({
        expanded: true
      });

      (_a = onExpand) === null || _a === void 0 ? void 0 : _a(e);
    }; // ================ Edit ================


    _this.onEditClick = function () {
      _this.triggerEdit(true);
    };

    _this.onEditChange = function (value) {
      var _this$getEditable = _this.getEditable(),
          onChange = _this$getEditable.onChange;

      onChange === null || onChange === void 0 ? void 0 : onChange(value);

      _this.triggerEdit(false);
    };

    _this.onEditCancel = function () {
      var _a, _b;

      (_b = (_a = _this.getEditable()).onCancel) === null || _b === void 0 ? void 0 : _b.call(_a);

      _this.triggerEdit(false);
    }; // ================ Copy ================


    _this.onCopyClick = function (e) {
      e.preventDefault();
      var _this$props = _this.props,
          children = _this$props.children,
          copyable = _this$props.copyable;

      var copyConfig = _extends({}, _typeof(copyable) === 'object' ? copyable : null);

      if (copyConfig.text === undefined) {
        copyConfig.text = String(children);
      }

      copy(copyConfig.text || '');

      _this.setState({
        copied: true
      }, function () {
        if (copyConfig.onCopy) {
          copyConfig.onCopy();
        }

        _this.copyId = window.setTimeout(function () {
          _this.setState({
            copied: false
          });
        }, 3000);
      });
    };

    _this.setEditRef = function (node) {
      _this.editIcon = node;
    };

    _this.triggerEdit = function (edit) {
      var _this$getEditable2 = _this.getEditable(),
          onStart = _this$getEditable2.onStart;

      if (edit && onStart) {
        onStart();
      }

      _this.setState({
        edit: edit
      }, function () {
        if (!edit && _this.editIcon) {
          _this.editIcon.focus();
        }
      });
    }; // ============== Ellipsis ==============


    _this.resizeOnNextFrame = function () {
      raf.cancel(_this.rafId);
      _this.rafId = raf(function () {
        // Do not bind `syncEllipsis`. It need for test usage on prototype
        _this.syncEllipsis();
      });
    };

    return _this;
  }

  _createClass(Base, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        clientRendered: true
      });
      this.resizeOnNextFrame();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var children = this.props.children;
      var ellipsis = this.getEllipsis();
      var prevEllipsis = this.getEllipsis(prevProps);

      if (children !== prevProps.children || ellipsis.rows !== prevEllipsis.rows) {
        this.resizeOnNextFrame();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.clearTimeout(this.copyId);
      raf.cancel(this.rafId);
    }
  }, {
    key: "getEditable",
    value: function getEditable(props) {
      var edit = this.state.edit;

      var _ref2 = props || this.props,
          editable = _ref2.editable;

      if (!editable) return {
        editing: edit
      };
      return _extends({
        editing: edit
      }, _typeof(editable) === 'object' ? editable : null);
    }
  }, {
    key: "getEllipsis",
    value: function getEllipsis(props) {
      var _ref3 = props || this.props,
          ellipsis = _ref3.ellipsis;

      if (!ellipsis) return {};
      return _extends({
        rows: 1,
        expandable: false
      }, _typeof(ellipsis) === 'object' ? ellipsis : null);
    }
  }, {
    key: "canUseCSSEllipsis",
    value: function canUseCSSEllipsis() {
      var clientRendered = this.state.clientRendered;
      var _this$props2 = this.props,
          editable = _this$props2.editable,
          copyable = _this$props2.copyable;

      var _this$getEllipsis2 = this.getEllipsis(),
          rows = _this$getEllipsis2.rows,
          expandable = _this$getEllipsis2.expandable,
          suffix = _this$getEllipsis2.suffix,
          onEllipsis = _this$getEllipsis2.onEllipsis,
          tooltip = _this$getEllipsis2.tooltip;

      if (suffix || tooltip) return false; // Can't use css ellipsis since we need to provide the place for button

      if (editable || copyable || expandable || !clientRendered || onEllipsis) {
        return false;
      }

      if (rows === 1) {
        return isTextOverflowSupport;
      }

      return isLineClampSupport;
    }
  }, {
    key: "syncEllipsis",
    value: function syncEllipsis() {
      var _this$state = this.state,
          ellipsisText = _this$state.ellipsisText,
          isEllipsis = _this$state.isEllipsis,
          expanded = _this$state.expanded;

      var _this$getEllipsis3 = this.getEllipsis(),
          rows = _this$getEllipsis3.rows,
          suffix = _this$getEllipsis3.suffix,
          onEllipsis = _this$getEllipsis3.onEllipsis;

      var children = this.props.children;
      if (!rows || rows < 0 || !this.contentRef.current || expanded) return; // Do not measure if css already support ellipsis

      if (this.canUseCSSEllipsis()) return;
      devWarning(toArray(children).every(function (child) {
        return typeof child === 'string';
      }), 'Typography', '`ellipsis` should use string as children only.');

      var _measure = measure(this.contentRef.current, {
        rows: rows,
        suffix: suffix
      }, children, this.renderOperations(true), ELLIPSIS_STR),
          content = _measure.content,
          text = _measure.text,
          ellipsis = _measure.ellipsis;

      if (ellipsisText !== text || isEllipsis !== ellipsis) {
        this.setState({
          ellipsisText: text,
          ellipsisContent: content,
          isEllipsis: ellipsis
        });

        if (isEllipsis !== ellipsis && onEllipsis) {
          onEllipsis(ellipsis);
        }
      }
    }
  }, {
    key: "renderExpand",
    value: function renderExpand(forceRender) {
      var _this$getEllipsis4 = this.getEllipsis(),
          expandable = _this$getEllipsis4.expandable,
          symbol = _this$getEllipsis4.symbol;

      var _this$state2 = this.state,
          expanded = _this$state2.expanded,
          isEllipsis = _this$state2.isEllipsis;
      if (!expandable) return null; // force render expand icon for measure usage or it will cause dead loop

      if (!forceRender && (expanded || !isEllipsis)) return null;
      var expandContent;

      if (symbol) {
        expandContent = symbol;
      } else {
        expandContent = this.expandStr;
      }

      return /*#__PURE__*/React.createElement("a", {
        key: "expand",
        className: "".concat(this.getPrefixCls(), "-expand"),
        onClick: this.onExpandClick,
        "aria-label": this.expandStr
      }, expandContent);
    }
  }, {
    key: "renderEdit",
    value: function renderEdit() {
      var editable = this.props.editable;
      if (!editable) return;
      var icon = editable.icon,
          tooltip = editable.tooltip;
      var title = toArray(tooltip)[0] || this.editStr;
      var ariaLabel = typeof title === 'string' ? title : '';
      return /*#__PURE__*/React.createElement(Tooltip, {
        key: "edit",
        title: tooltip === false ? '' : title
      }, /*#__PURE__*/React.createElement(TransButton, {
        ref: this.setEditRef,
        className: "".concat(this.getPrefixCls(), "-edit"),
        onClick: this.onEditClick,
        "aria-label": ariaLabel
      }, icon || /*#__PURE__*/React.createElement(EditOutlined, {
        role: "button"
      })));
    }
  }, {
    key: "renderCopy",
    value: function renderCopy() {
      var copied = this.state.copied;
      var copyable = this.props.copyable;
      if (!copyable) return;
      var prefixCls = this.getPrefixCls();
      var tooltips = copyable.tooltips;
      var tooltipNodes = toArray(tooltips);

      if (tooltipNodes.length === 0) {
        tooltipNodes = [this.copyStr, this.copiedStr];
      }

      var title = copied ? tooltipNodes[1] : tooltipNodes[0];
      var ariaLabel = typeof title === 'string' ? title : '';
      var icons = toArray(copyable.icon);
      return /*#__PURE__*/React.createElement(Tooltip, {
        key: "copy",
        title: tooltips === false ? '' : title
      }, /*#__PURE__*/React.createElement(TransButton, {
        className: classNames("".concat(prefixCls, "-copy"), copied && "".concat(prefixCls, "-copy-success")),
        onClick: this.onCopyClick,
        "aria-label": ariaLabel
      }, copied ? icons[1] || /*#__PURE__*/React.createElement(CheckOutlined, null) : icons[0] || /*#__PURE__*/React.createElement(CopyOutlined, null)));
    }
  }, {
    key: "renderEditInput",
    value: function renderEditInput() {
      var _this$props3 = this.props,
          children = _this$props3.children,
          className = _this$props3.className,
          style = _this$props3.style;
      var direction = this.context.direction;

      var _this$getEditable3 = this.getEditable(),
          maxLength = _this$getEditable3.maxLength,
          autoSize = _this$getEditable3.autoSize,
          onEnd = _this$getEditable3.onEnd;

      return /*#__PURE__*/React.createElement(Editable, {
        value: typeof children === 'string' ? children : '',
        onSave: this.onEditChange,
        onCancel: this.onEditCancel,
        onEnd: onEnd,
        prefixCls: this.getPrefixCls(),
        className: className,
        style: style,
        direction: direction,
        maxLength: maxLength,
        autoSize: autoSize
      });
    }
  }, {
    key: "renderOperations",
    value: function renderOperations(forceRenderExpanded) {
      return [this.renderExpand(forceRenderExpanded), this.renderEdit(), this.renderCopy()].filter(function (node) {
        return node;
      });
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this2 = this;

      var _this$state3 = this.state,
          ellipsisContent = _this$state3.ellipsisContent,
          isEllipsis = _this$state3.isEllipsis,
          expanded = _this$state3.expanded;

      var _a = this.props,
          component = _a.component,
          children = _a.children,
          className = _a.className,
          type = _a.type,
          disabled = _a.disabled,
          style = _a.style,
          restProps = __rest(_a, ["component", "children", "className", "type", "disabled", "style"]);

      var direction = this.context.direction;

      var _this$getEllipsis5 = this.getEllipsis(),
          rows = _this$getEllipsis5.rows,
          suffix = _this$getEllipsis5.suffix,
          tooltip = _this$getEllipsis5.tooltip;

      var prefixCls = this.getPrefixCls();
      var textProps = omit(restProps, ['prefixCls', 'editable', 'copyable', 'ellipsis', 'mark', 'code', 'delete', 'underline', 'strong', 'keyboard'].concat(_toConsumableArray(configConsumerProps)));
      var cssEllipsis = this.canUseCSSEllipsis();
      var cssTextOverflow = rows === 1 && cssEllipsis;
      var cssLineClamp = rows && rows > 1 && cssEllipsis;
      var textNode = children; // Only use js ellipsis when css ellipsis not support

      if (rows && isEllipsis && !expanded && !cssEllipsis) {
        var title = restProps.title;
        var restContent = title || '';

        if (!title && (typeof children === 'string' || typeof children === 'number')) {
          restContent = String(children);
        } // show rest content as title on symbol


        restContent = restContent === null || restContent === void 0 ? void 0 : restContent.slice(String(ellipsisContent || '').length); // We move full content to outer element to avoid repeat read the content by accessibility

        textNode = /*#__PURE__*/React.createElement(React.Fragment, null, ellipsisContent, /*#__PURE__*/React.createElement("span", {
          title: restContent,
          "aria-hidden": "true"
        }, ELLIPSIS_STR), suffix); // If provided tooltip, we need wrap with span to let Tooltip inject events

        if (tooltip) {
          textNode = /*#__PURE__*/React.createElement(Tooltip, {
            title: tooltip === true ? children : tooltip
          }, /*#__PURE__*/React.createElement("span", null, textNode));
        }
      } else {
        textNode = /*#__PURE__*/React.createElement(React.Fragment, null, children, suffix);
      }

      textNode = wrapperDecorations(this.props, textNode);
      return /*#__PURE__*/React.createElement(LocaleReceiver, {
        componentName: "Text"
      }, function (_ref4) {
        var _classNames;

        var edit = _ref4.edit,
            copyStr = _ref4.copy,
            copied = _ref4.copied,
            expand = _ref4.expand;
        _this2.editStr = edit;
        _this2.copyStr = copyStr;
        _this2.copiedStr = copied;
        _this2.expandStr = expand;
        return /*#__PURE__*/React.createElement(ResizeObserver, {
          onResize: _this2.resizeOnNextFrame,
          disabled: !rows
        }, /*#__PURE__*/React.createElement(Typography, _extends({
          className: classNames((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-").concat(type), type), _defineProperty(_classNames, "".concat(prefixCls, "-disabled"), disabled), _defineProperty(_classNames, "".concat(prefixCls, "-ellipsis"), rows), _defineProperty(_classNames, "".concat(prefixCls, "-ellipsis-single-line"), cssTextOverflow), _defineProperty(_classNames, "".concat(prefixCls, "-ellipsis-multiple-line"), cssLineClamp), _classNames), className),
          style: _extends(_extends({}, style), {
            WebkitLineClamp: cssLineClamp ? rows : undefined
          }),
          component: component,
          ref: _this2.contentRef,
          direction: direction
        }, textProps), textNode, _this2.renderOperations()));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$getEditable4 = this.getEditable(),
          editing = _this$getEditable4.editing;

      if (editing) {
        return this.renderEditInput();
      }

      return this.renderContent();
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      var children = nextProps.children,
          editable = nextProps.editable;
      devWarning(!editable || typeof children === 'string', 'Typography', 'When `editable` is enabled, the `children` should use string.');
      return {};
    }
  }]);

  return Base;
}(React.Component);

Base.contextType = ConfigContext;
Base.defaultProps = {
  children: ''
};
export default Base;