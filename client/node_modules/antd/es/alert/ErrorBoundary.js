import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _createSuper from "@babel/runtime/helpers/esm/createSuper";
import * as React from 'react';
import Alert from '.';

var ErrorBoundary = /*#__PURE__*/function (_React$Component) {
  _inherits(ErrorBoundary, _React$Component);

  var _super = _createSuper(ErrorBoundary);

  function ErrorBoundary() {
    var _this;

    _classCallCheck(this, ErrorBoundary);

    _this = _super.apply(this, arguments);
    _this.state = {
      error: undefined,
      info: {
        componentStack: ''
      }
    };
    return _this;
  }

  _createClass(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      this.setState({
        error: error,
        info: info
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          message = _this$props.message,
          description = _this$props.description,
          children = _this$props.children;
      var _this$state = this.state,
          error = _this$state.error,
          info = _this$state.info;
      var componentStack = info && info.componentStack ? info.componentStack : null;
      var errorMessage = typeof message === 'undefined' ? (error || '').toString() : message;
      var errorDescription = typeof description === 'undefined' ? componentStack : description;

      if (error) {
        return /*#__PURE__*/React.createElement(Alert, {
          type: "error",
          message: errorMessage,
          description: /*#__PURE__*/React.createElement("pre", null, errorDescription)
        });
      }

      return children;
    }
  }]);

  return ErrorBoundary;
}(React.Component);

export { ErrorBoundary as default };