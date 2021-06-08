"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _rcTrigger = _interopRequireDefault(require("rc-trigger"));

var React = _interopRequireWildcard(require("react"));

var _DropdownMenu = _interopRequireDefault(require("./DropdownMenu"));

var BUILT_IN_PLACEMENTS = {
  bottomRight: {
    points: ['tl', 'br'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  bottomLeft: {
    points: ['tr', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  topRight: {
    points: ['bl', 'tr'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  topLeft: {
    points: ['br', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  }
};

var KeywordTrigger = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(KeywordTrigger, _React$Component);

  var _super = (0, _createSuper2.default)(KeywordTrigger);

  function KeywordTrigger() {
    var _this;

    (0, _classCallCheck2.default)(this, KeywordTrigger);
    _this = _super.apply(this, arguments);

    _this.getDropdownPrefix = function () {
      return "".concat(_this.props.prefixCls, "-dropdown");
    };

    _this.getDropdownElement = function () {
      var options = _this.props.options;
      return /*#__PURE__*/React.createElement(_DropdownMenu.default, {
        prefixCls: _this.getDropdownPrefix(),
        options: options
      });
    };

    _this.getDropDownPlacement = function () {
      var _this$props = _this.props,
          placement = _this$props.placement,
          direction = _this$props.direction;
      var popupPlacement = 'topRight';

      if (direction === 'rtl') {
        popupPlacement = placement === 'top' ? 'topLeft' : 'bottomLeft';
      } else {
        popupPlacement = placement === 'top' ? 'topRight' : 'bottomRight';
      }

      return popupPlacement;
    };

    return _this;
  }

  (0, _createClass2.default)(KeywordTrigger, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          visible = _this$props2.visible,
          transitionName = _this$props2.transitionName,
          getPopupContainer = _this$props2.getPopupContainer;
      var popupElement = this.getDropdownElement();
      return /*#__PURE__*/React.createElement(_rcTrigger.default, {
        prefixCls: this.getDropdownPrefix(),
        popupVisible: visible,
        popup: popupElement,
        popupPlacement: this.getDropDownPlacement(),
        popupTransitionName: transitionName,
        builtinPlacements: BUILT_IN_PLACEMENTS,
        getPopupContainer: getPopupContainer
      }, children);
    }
  }]);
  return KeywordTrigger;
}(React.Component);

var _default = KeywordTrigger;
exports.default = _default;