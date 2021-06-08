import _extends from "@babel/runtime/helpers/esm/extends";
import CalendarLocale from "rc-picker/es/locale/cs_CZ";
import TimePickerLocale from '../../time-picker/locale/cs_CZ'; // Merge into a locale object

var locale = {
  lang: _extends({
    placeholder: 'Vybrat datum',
    rangePlaceholder: ['Od', 'Do']
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePickerLocale)
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;