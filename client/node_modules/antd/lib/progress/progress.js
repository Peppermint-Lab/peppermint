"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("rc-util/lib/omit"));

var _CloseOutlined = _interopRequireDefault(require("@ant-design/icons/CloseOutlined"));

var _CheckOutlined = _interopRequireDefault(require("@ant-design/icons/CheckOutlined"));

var _CheckCircleFilled = _interopRequireDefault(require("@ant-design/icons/CheckCircleFilled"));

var _CloseCircleFilled = _interopRequireDefault(require("@ant-design/icons/CloseCircleFilled"));

var _configProvider = require("../config-provider");

var _type = require("../_util/type");

var _devWarning = _interopRequireDefault(require("../_util/devWarning"));

var _Line = _interopRequireDefault(require("./Line"));

var _Circle = _interopRequireDefault(require("./Circle"));

var _Steps = _interopRequireDefault(require("./Steps"));

var _utils = require("./utils");

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

var ProgressTypes = (0, _type.tuple)('line', 'circle', 'dashboard');
var ProgressStatuses = (0, _type.tuple)('normal', 'exception', 'active', 'success');

var Progress = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Progress, _React$Component);

  var _super = (0, _createSuper2["default"])(Progress);

  function Progress() {
    var _this;

    (0, _classCallCheck2["default"])(this, Progress);
    _this = _super.apply(this, arguments);

    _this.renderProgress = function (_ref) {
      var _classNames;

      var getPrefixCls = _ref.getPrefixCls,
          direction = _ref.direction;

      var _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
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

      (0, _devWarning["default"])(!('successPercent' in props), 'Progress', '`successPercent` is deprecated. Please use `success.percent` instead.');
      var progress; // Render progress shape

      if (type === 'line') {
        progress = steps ? /*#__PURE__*/React.createElement(_Steps["default"], (0, _extends2["default"])({}, _this.props, {
          strokeColor: typeof strokeColor === 'string' ? strokeColor : undefined,
          prefixCls: prefixCls,
          steps: steps
        }), progressInfo) : /*#__PURE__*/React.createElement(_Line["default"], (0, _extends2["default"])({}, _this.props, {
          prefixCls: prefixCls,
          direction: direction
        }), progressInfo);
      } else if (type === 'circle' || type === 'dashboard') {
        progress = /*#__PURE__*/React.createElement(_Circle["default"], (0, _extends2["default"])({}, _this.props, {
          prefixCls: prefixCls,
          progressStatus: progressStatus
        }), progressInfo);
      }

      var classString = (0, _classnames["default"])(prefixCls, (_classNames = {}, (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-").concat(type === 'dashboard' && 'circle' || steps && 'steps' || type), true), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-status-").concat(progressStatus), true), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-show-info"), showInfo), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-").concat(size), size), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _classNames), className);
      return /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({}, (0, _omit["default"])(restProps, ['status', 'format', 'trailColor', 'strokeWidth', 'width', 'gapDegree', 'gapPosition', 'strokeLinecap', 'percent', 'success', 'successPercent']), {
        className: classString
      }), progress);
    };

    return _this;
  }

  (0, _createClass2["default"])(Progress, [{
    key: "getPercentNumber",
    value: function getPercentNumber() {
      var _this$props$percent = this.props.percent,
          percent = _this$props$percent === void 0 ? 0 : _this$props$percent;
      var successPercent = (0, _utils.getSuccessPercent)(this.props);
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
      var successPercent = (0, _utils.getSuccessPercent)(this.props);
      if (!showInfo) return null;
      var text;

      var textFormatter = format || function (percentNumber) {
        return "".concat(percentNumber, "%");
      };

      var isLineType = type === 'line';

      if (format || progressStatus !== 'exception' && progressStatus !== 'success') {
        text = textFormatter((0, _utils.validProgress)(percent), (0, _utils.validProgress)(successPercent));
      } else if (progressStatus === 'exception') {
        text = isLineType ? /*#__PURE__*/React.createElement(_CloseCircleFilled["default"], null) : /*#__PURE__*/React.createElement(_CloseOutlined["default"], null);
      } else if (progressStatus === 'success') {
        text = isLineType ? /*#__PURE__*/React.createElement(_CheckCircleFilled["default"], null) : /*#__PURE__*/React.createElement(_CheckOutlined["default"], null);
      }

      return /*#__PURE__*/React.createElement("span", {
        className: "".concat(prefixCls, "-text"),
        title: typeof text === 'string' ? text : undefined
      }, text);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(_configProvider.ConfigConsumer, null, this.renderProgress);
    }
  }]);
  return Progress;
}(React.Component);

exports["default"] = Progress;
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