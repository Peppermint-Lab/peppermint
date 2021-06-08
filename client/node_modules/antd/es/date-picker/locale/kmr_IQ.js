import _extends from "@babel/runtime/helpers/esm/extends";
import CalendarLocale from "rc-picker/es/locale/kmr_IQ";
import TimePickerLocale from '../../time-picker/locale/kmr_IQ'; // Merge into a locale object

var locale = {
  lang: _extends({
    placeholder: 'Dîrok hilbijêre',
    rangePlaceholder: ['Dîroka destpêkê', 'Dîroka dawîn']
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePickerLocale)
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;