import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
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
import omit from "rc-util/es/omit";
import CloseOutlined from "@ant-design/icons/es/icons/CloseOutlined";
import CheckOutlined from "@ant-design/icons/es/icons/CheckOutlined";
import CheckCircleFilled from "@ant-design/icons/es/icons/CheckCircleFilled";
import CloseCircleFilled from "@ant-design/icons/es/icons/CloseCircleFilled";
import { ConfigConsumer } from '../config-provider';
import { tuple } from '../_util/type';
import devWarning from '../_util/devWarning';
import Line from './Line';
import Circle from './Circle';
import Steps from './Steps';
import { validProgress, getSuccessPercent } from './utils';
var ProgressTypes = tuple('line', 'circle', 'dashboard');
var ProgressStatuses = tuple('normal', 'exception', 'active', 'success');

var Progress = /*#__PURE__*/function (_React$Component) {
  _inherits(Progress, _React$Component);

  var _super = _createSuper(Progress);

  function Progress() {
    var _this;

    _classCallCheck(this, Progress);

    _this = _super.apply(this, arguments);

    _this.renderProgress = function (_ref) {
      var _classNames;

      var getPrefixCls = _ref.getPrefixCls,
          direction = _ref.direction;

      var _assertThisInitialize = _assertThisInitialized(_this),
          props = _assertThisInitialize.props;

      var customizePrefixCls = props.prefixCls,
          className = props.className,
          size = props.size,
          type = props.type,
          steps = props.steps,
          showInfo = props.showInfo,
          strokeColor = props.strokeColor,
          restProps = __rest(props, ["prefixCls", "className", "size", "type", "steps", "showInfo", "strokeColor"]);

      var prefixCls = getPrefixCls('progress', customizePrefixCls);

      var progressStatus = _this.getProgressStatus();

      var progressInfo = _this.renderProcessInfo(prefixCls, progressStatus);

      devWarning(!('successPercent' in props), 'Progress', '`successPercent` is deprecated. Please use `success.percent` instead.');
      var progress; // Render progress shape

      if (type === 'line') {
        progress = steps ? /*#__PURE__*/React.createElement(Steps, _extends({}, _this.props, {
          strokeColor: typeof strokeColor === 'string' ? strokeColor : undefined,
          prefixCls: prefixCls,
          steps: steps
        }), progressInfo) : /*#__PURE__*/React.createElement(Line, _extends({}, _this.props, {
          prefixCls: prefixCls,
          direction: direction
        }), progressInfo);
      } else if (type === 'circle' || type === 'dashboard') {
        progress = /*#__PURE__*/React.createElement(Circle, _extends({}, _this.props, {
          prefixCls: prefixCls,
          progressStatus: progressStatus
        }), progressInfo);
      }

      var classString = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-").concat(type === 'dashboard' && 'circle' || steps && 'steps' || type), true), _defineProperty(_classNames, "".concat(prefixCls, "-status-").concat(progressStatus), true), _defineProperty(_classNames, "".concat(prefixCls, "-show-info"), showInfo), _defineProperty(_classNames, "".concat(prefixCls, "-").concat(size), size), _defineProperty(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _classNames), className);
      return /*#__PURE__*/React.createElement("div", _extends({}, omit(restProps, ['status', 'format', 'trailColor', 'strokeWidth', 'width', 'gapDegree', 'gapPosition', 'strokeLinecap', 'percent', 'success', 'successPercent']), {
        className: classString
      }), progress);
    };

    return _this;
  }

  _createClass(Progress, [{
    key: "getPercentNumber",
    value: function getPercentNumber() {
      var _this$props$percent = this.props.percent,
          percent = _this$props$percent === void 0 ? 0 : _this$props$percent;
      var successPercent = getSuccessPercent(this.props);
      return parseInt(successPercent !== undefined ? successPercent.toString() : percent.toString(), 10);
    }
  }, {
    key: "getProgressStatus",
    value: function getProgressStatus() {
      var status = this.props.status;

      if (ProgressStatuses.indexOf(status) < 0 && this.getPercentNumber() >= 100) {
        return 'success';
      }

      return status || 'normal';
    }
  }, {
    key: "renderProcessInfo",
    value: function renderProcessInfo(prefixCls, progressStatus) {
      var _this$props = this.props,
          showInfo = _this$props.showInfo,
          format = _this$props.format,
          type = _this$props.type,
          percent = _this$props.percent;
      var successPercent = getSuccessPercent(this.props);
      if (!showInfo) return null;
      var text;

      var textFormatter = format || function (percentNumber) {
        return "".concat(percentNumber, "%");
      };

      var isLineType = type === 'line';

      if (format || progressStatus !== 'exception' && progressStatus !== 'success') {
        text = textFormatter(validProgress(percent), validProgress(successPercent));
      } else if (progressStatus === 'exception') {
        text = isLineType ? /*#__PURE__*/React.createElement(CloseCircleFilled, null) : /*#__PURE__*/React.createElement(CloseOutlined, null);
      } else if (progressStatus === 'success') {
        text = isLineType ? /*#__PURE__*/React.createElement(CheckCircleFilled, null) : /*#__PURE__*/React.createElement(CheckOutlined, null);
      }

      return /*#__PURE__*/React.createElement("span", {
        className: "".concat(prefixCls, "-text"),
        title: typeof text === 'string' ? text : undefined
      }, text);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(ConfigConsumer, null, this.renderProgress);
    }
  }]);

  return Progress;
}(React.Component);

export { Progress as default };
Progress.defaultProps = {
  type: 'line',
  percent: 0,
  showInfo: true,
  // null for different theme definition
  trailColor: null,
  size: 'default',
  gapDegree: undefined,
  strokeLinecap: 'round'
};