"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSliderWithTooltip;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _react = _interopRequireDefault(require("react"));

var _SliderTooltip = _interopRequireDefault(require("./common/SliderTooltip"));

var _Handle = _interopRequireDefault(require("./Handle"));

function createSliderWithTooltip(Component) {
  var _a; // eslint-disable-next-line @typescript-eslint/no-unused-vars


  return _a = /*#__PURE__*/function (_React$Component) {
    (0, _inherits2.default)(ComponentWrapper, _React$Component);

    var _super = (0, _createSuper2.default)(ComponentWrapper);

    function ComponentWrapper() {
      var _this;

      (0, _classCallCheck2.default)(this, ComponentWrapper);
      _this = _super.apply(this, arguments);
      _this.state = {
        visibles: {}
      };

      _this.handleTooltipVisibleChange = function (index, visible) {
        _this.setState(function (prevState) {
          return {
            visibles: (0, _objectSpread3.default)((0, _objectSpread3.default)({}, prevState.visibles), {}, (0, _defineProperty2.default)({}, index, visible))
          };
        });
      };

      _this.handleWithTooltip = function (_ref) {
        var value = _ref.value,
            dragging = _ref.dragging,
            index = _ref.index,
            disabled = _ref.disabled,
            restProps = (0, _objectWithoutProperties2.default)(_ref, ["value", "dragging", "index", "disabled"]);
        var _this$props = _this.props,
            tipFormatter = _this$props.tipFormatter,
            tipProps = _this$props.tipProps,
            handleStyle = _this$props.handleStyle,
            getTooltipContainer = _this$props.getTooltipContainer;
        var _tipProps$prefixCls = tipProps.prefixCls,
            prefixCls = _tipProps$prefixCls === void 0 ? 'rc-slider-tooltip' : _tipProps$prefixCls,
            _tipProps$overlay = tipProps.overlay,
            overlay = _tipProps$overlay === void 0 ? tipFormatter(value) : _tipProps$overlay,
            _tipProps$placement = tipProps.placement,
            placement = _tipProps$placement === void 0 ? 'top' : _tipProps$placement,
            _tipProps$visible = tipProps.visible,
            visible = _tipProps$visible === void 0 ? false : _tipProps$visible,
            restTooltipProps = (0, _objectWithoutProperties2.default)(tipProps, ["prefixCls", "overlay", "placement", "visible"]);
        var handleStyleWithIndex;

        if (Array.isArray(handleStyle)) {
          handleStyleWithIndex = handleStyle[index] || handleStyle[0];
        } else {
          handleStyleWithIndex = handleStyle;
        }

        return /*#__PURE__*/_react.default.createElement(_SliderTooltip.default, (0, _extends2.default)({}, restTooltipProps, {
          getTooltipContainer: getTooltipContainer,
          prefixCls: prefixCls,
          overlay: overlay,
          placement: placement,
          visible: !disabled && (_this.state.visibles[index] || dragging) || visible,
          key: index
        }), /*#__PURE__*/_react.default.createElement(_Handle.default, (0, _extends2.default)({}, restProps, {
          style: (0, _objectSpread3.default)({}, handleStyleWithIndex),
          value: value,
          onMouseEnter: function onMouseEnter() {
            return _this.handleTooltipVisibleChange(index, true);
          },
          onMouseLeave: function onMouseLeave() {
            return _this.handleTooltipVisibleChange(index, false);
          }
        })));
      };

      return _this;
    }

    (0, _createClass2.default)(ComponentWrapper, [{
      key: "render",
      value: function render() {
        return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, this.props, {
          handle: this.handleWithTooltip
        }));
      }
    }]);
    return ComponentWrapper;
  }(_react.default.Component), _a.defaultProps = {
    tipFormatter: function tipFormatter(value) {
      return value;
    },
    handleStyle: [{}],
    tipProps: {},
    getTooltipContainer: function getTooltipContainer(node) {
      return node.parentNode;
    }
  }, _a;
}