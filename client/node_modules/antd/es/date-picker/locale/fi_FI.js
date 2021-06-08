import _extends from "@babel/runtime/helpers/esm/extends";
import CalendarLocale from "rc-picker/es/locale/fi_FI";
import TimePickerLocale from '../../time-picker/locale/fi_FI'; // Merge into a locale object

var locale = {
  lang: _extends({
    placeholder: 'Valitse päivä',
    rangePlaceholder: ['Alku päivä', 'Loppu päivä']
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePickerLocale)
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;