"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useValueTexts;

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _useMemo = _interopRequireDefault(require("rc-util/lib/hooks/useMemo"));

var _dateUtil = require("../utils/dateUtil");

function useValueTexts(value, _ref) {
  var formatList = _ref.formatList,
      generateConfig = _ref.generateConfig,
      locale = _ref.locale;
  return (0, _useMemo.default)(function () {
    if (!value) {
      return [[''], ''];
    } // We will convert data format back to first format


    var firstValueText = '';
    var fullValueTexts = [];

    for (var i = 0; i < formatList.length; i += 1) {
      var format = formatList[i];
      var formatStr = (0, _dateUtil.formatValue)(value, {
        generateConfig: generateConfig,
        locale: locale,
        format: format
      });
      fullValueTexts.push(formatStr);

      if (i === 0) {
        firstValueText = formatStr;
      }
    }

    return [fullValueTexts, firstValueText];
  }, [value, formatList], function (prev, next) {
    return prev[0] !== next[0] || !(0, _shallowequal.default)(prev[1], next[1]);
  });
}