import _extends from "@babel/runtime/helpers/esm/extends";
import CalendarLocale from "rc-picker/es/locale/fr_BE";
import TimePickerLocale from '../../time-picker/locale/fr_BE'; // Merge into a locale object

var locale = {
  lang: _extends({
    placeholder: 'Sélectionner une date',
    rangePlaceholder: ['Date de début', 'Date de fin']
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePickerLocale)
}; // All settings at:
// https://github.com/ant-design/ant-design/issues/424

export default locale;