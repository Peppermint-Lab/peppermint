import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _createSuper from "@babel/runtime/helpers/esm/createSuper";

/* eslint react/prop-types: 0 */
import React from 'react';
import KEYCODE from './KeyCode';

var Options = /*#__PURE__*/function (_React$Component) {
  _inherits(Options, _React$Component);

  var _super = _createSuper(Options);

  function Options() {
    var _this;

    _classCallCheck(this, Options);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      goInputText: ''
    };

    _this.buildOptionText = function (value) {
      return "".concat(value, " ").concat(_this.props.locale.items_per_page);
    };

    _this.changeSize = function (value) {
      _this.props.changeSize(Number(value));
    };

    _this.handleChange = function (e) {
      _this.setState({
        goInputText: e.target.value
      });
    };

    _this.handleBlur = function (e) {
      var _this$props = _this.props,
          goButton = _this$props.goButton,
          quickGo = _this$props.quickGo,
          rootPrefixCls = _this$props.rootPrefixCls;
      var goInputText = _this.state.goInputText;

      if (goButton || goInputText === '') {
        return;
      }

      _this.setState({
        goInputText: ''
      });

      if (e.relatedTarget && (e.relatedTarget.className.indexOf("".concat(rootPrefixCls, "-item-link")) >= 0 || e.relatedTarget.className.indexOf("".concat(rootPrefixCls, "-item")) >= 0)) {
        return;
      }

      quickGo(_this.getValidValue());
    };

    _this.go = function (e) {
      var goInputText = _this.state.goInputText;

      if (goInputText === '') {
        return;
      }

      if (e.keyCode === KEYCODE.ENTER || e.type === 'click') {
        _this.setState({
          goInputText: ''
        });

        _this.props.quickGo(_this.getValidValue());
      }
    };

    return _this;
  }

  _createClass(Options, [{
    key: "getValidValue",
    value: function getValidValue() {
      var goInputText = this.state.goInputText; // eslint-disable-next-line no-restricted-globals

      return !goInputText || isNaN(goInputText) ? undefined : Number(goInputText);
    }
  }, {
    key: "getPageSizeOptions",
    value: function getPageSizeOptions() {
      var _this$props2 = this.props,
          pageSize = _this$props2.pageSize,
          pageSizeOptions = _this$props2.pageSizeOptions;

      if (pageSizeOptions.some(function (option) {
        return option.toString() === pageSize.toString();
      })) {
        return pageSizeOptions;
      }

      return pageSizeOptions.concat([pageSize.toString()]).sort(function (a, b) {
        // eslint-disable-next-line no-restricted-globals
        var numberA = isNaN(Number(a)) ? 0 : Number(a); // eslint-disable-next-line no-restricted-globals

        var numberB = isNaN(Number(b)) ? 0 : Number(b);
        return numberA - numberB;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          pageSize = _this$props3.pageSize,
          locale = _this$props3.locale,
          rootPrefixCls = _this$props3.rootPrefixCls,
          changeSize = _this$props3.changeSize,
          quickGo = _this$props3.quickGo,
          goButton = _this$props3.goButton,
          selectComponentClass = _this$props3.selectComponentClass,
          buildOptionText = _this$props3.buildOptionText,
          selectPrefixCls = _this$props3.selectPrefixCls,
          disabled = _this$props3.disabled;
      var goInputText = this.state.goInputText;
      var prefixCls = "".concat(rootPrefixCls, "-options");
      var Select = selectComponentClass;
      var changeSelect = null;
      var goInput = null;
      var gotoButton = null;

      if (!changeSize && !quickGo) {
        return null;
      }

      var pageSizeOptions = this.getPageSizeOptions();

      if (changeSize && Select) {
        var options = pageSizeOptions.map(function (opt, i) {
          return /*#__PURE__*/React.createElement(Select.Option, {
            key: i,
            value: opt.toString()
          }, (buildOptionText || _this2.buildOptionText)(opt));
        });
        changeSelect = /*#__PURE__*/React.createElement(Select, {
          disabled: disabled,
          prefixCls: selectPrefixCls,
          showSearch: false,
          className: "".concat(prefixCls, "-size-changer"),
          optionLabelProp: "children",
          dropdownMatchSelectWidth: false,
          value: (pageSize || pageSizeOptions[0]).toString(),
          onChange: this.changeSize,
          getPopupContainer: function getPopupContainer(triggerNode) {
            return triggerNode.parentNode;
          }
        }, options);
      }

      if (quickGo) {
        if (goButton) {
          gotoButton = typeof goButton === 'boolean' ? /*#__PURE__*/React.createElement("button", {
            type: "button",
            onClick: this.go,
            onKeyUp: this.go,
            disabled: disabled,
            className: "".concat(prefixCls, "-quick-jumper-button")
          }, locale.jump_to_confirm) : /*#__PURE__*/React.createElement("span", {
            onClick: this.go,
            onKeyUp: this.go
          }, goButton);
        }

        goInput = /*#__PURE__*/React.createElement("div", {
          className: "".concat(prefixCls, "-quick-jumper")
        }, locale.jump_to, /*#__PURE__*/React.createElement("input", {
          disabled: disabled,
          type: "text",
          value: goInputText,
          onChange: this.handleChange,
          onKeyUp: this.go,
          onBlur: this.handleBlur
        }), locale.page, gotoButton);
      }

      return /*#__PURE__*/React.createElement("li", {
        className: "".concat(prefixCls)
      }, changeSelect, goInput);
    }
  }]);

  return Options;
}(React.Component);

Options.defaultProps = {
  pageSizeOptions: ['10', '20', '50', '100']
};
export default Options;