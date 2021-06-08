import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _createSuper from "@babel/runtime/helpers/esm/createSuper";
import Trigger from 'rc-trigger';
import * as React from 'react';
import DropdownMenu from './DropdownMenu';
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
  _inherits(KeywordTrigger, _React$Component);

  var _super = _createSuper(KeywordTrigger);

  function KeywordTrigger() {
    var _this;

    _classCallCheck(this, KeywordTrigger);

    _this = _super.apply(this, arguments);

    _this.getDropdownPrefix = function () {
      return "".concat(_this.props.prefixCls, "-dropdown");
    };

    _this.getDropdownElement = function () {
      var options = _this.props.options;
      return /*#__PURE__*/React.createElement(DropdownMenu, {
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

  _createClass(KeywordTrigger, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          visible = _this$props2.visible,
          transitionName = _this$props2.transitionName,
          getPopupContainer = _this$props2.getPopupContainer;
      var popupElement = this.getDropdownElement();
      return /*#__PURE__*/React.createElement(Trigger, {
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

export default KeywordTrigger;