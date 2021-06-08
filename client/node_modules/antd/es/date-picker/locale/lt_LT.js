import _extends from "@babel/runtime/helpers/esm/extends";
import CalendarLocale from "rc-picker/es/locale/lt_LT";
import TimePickerLocale from '../../time-picker/locale/lt_LT'; // Merge into a locale object

var locale = {
  lang: _extends({
    placeholder: 'Pasirinkite datą',
    yearPlaceholder: 'Pasirinkite metus',
    quarterPlaceholder: 'Pasirinkite ketvirtį',
    monthPlaceholder: 'Pasirinkite mėnesį',
    weekPlaceholder: 'Pasirinkite savaitę',
    rangePlaceholder: ['Pradžios data', 'Pabaigos data'],
    rangeYearPlaceholder: ['Pradžios metai', 'Pabaigos metai'],
    rangeMonthPlaceholder: ['Pradžios mėnesis', 'Pabaigos mėnesis'],
    rangeWeekPlaceholder: ['Pradžios savaitė', 'Pabaigos savaitė']
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePickerLocale)
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;