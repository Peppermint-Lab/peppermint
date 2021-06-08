import _extends from "@babel/runtime/helpers/esm/extends";
import PickerButton from '../PickerButton';
import PickerTag from '../PickerTag';
import generateSinglePicker from './generateSinglePicker';
import generateRangePicker from './generateRangePicker';
export var Components = {
  button: PickerButton,
  rangeItem: PickerTag
};

function toArray(list) {
  if (!list) {
    return [];
  }

  return Array.isArray(list) ? list : [list];
}

export function getTimeProps(props) {
  var format = props.format,
      picker = props.picker,
      showHour = props.showHour,
      showMinute = props.showMinute,
      showSecond = props.showSecond,
      use12Hours = props.use12Hours;
  var firstFormat = toArray(format)[0];

  var showTimeObj = _extends({}, props);

  if (firstFormat && typeof firstFormat === 'string') {
    if (!firstFormat.includes('s') && showSecond === undefined) {
      showTimeObj.showSecond = false;
    }

    if (!firstFormat.includes('m') && showMinute === undefined) {
      showTimeObj.showMinute = false;
    }

    if (!firstFormat.includes('H') && !firstFormat.includes('h') && showHour === undefined) {
      showTimeObj.showHour = false;
    }

    if ((firstFormat.includes('a') || firstFormat.includes('A')) && use12Hours === undefined) {
      showTimeObj.use12Hours = true;
    }
  }

  if (picker === 'time') {
    return showTimeObj;
  }

  if (typeof firstFormat === 'function') {
    // format of showTime should use default when format is custom format function
    delete showTimeObj.format;
  }

  return {
    showTime: showTimeObj
  };
}

function generatePicker(generateConfig) {
  // =========================== Picker ===========================
  var _generateSinglePicker = generateSinglePicker(generateConfig),
      DatePicker = _generateSinglePicker.DatePicker,
      WeekPicker = _generateSinglePicker.WeekPicker,
      MonthPicker = _generateSinglePicker.MonthPicker,
      YearPicker = _generateSinglePicker.YearPicker,
      TimePicker = _generateSinglePicker.TimePicker,
      QuarterPicker = _generateSinglePicker.QuarterPicker; // ======================== Range Picker ========================


  var RangePicker = generateRangePicker(generateConfig);
  var MergedDatePicker = DatePicker;
  MergedDatePicker.WeekPicker = WeekPicker;
  MergedDatePicker.MonthPicker = MonthPicker;
  MergedDatePicker.YearPicker = YearPicker;
  MergedDatePicker.RangePicker = RangePicker;
  MergedDatePicker.TimePicker = TimePicker;
  MergedDatePicker.QuarterPicker = QuarterPicker;
  return MergedDatePicker;
}

export default generatePicker;