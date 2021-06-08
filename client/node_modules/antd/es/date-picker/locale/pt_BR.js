import _extends from "@babel/runtime/helpers/esm/extends";
import CalendarLocale from "rc-picker/es/locale/pt_BR";
import TimePickerLocale from '../../time-picker/locale/pt_BR'; // Merge into a locale object

var locale = {
  lang: _extends({
    placeholder: 'Selecionar data',
    rangePlaceholder: ['Data inicial', 'Data final']
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePickerLocale)
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;