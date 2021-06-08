import _extends from "@babel/runtime/helpers/esm/extends";
import CalendarLocale from "rc-picker/es/locale/es_ES";
import TimePickerLocale from '../../time-picker/locale/es_ES'; // Merge into a locale object

var locale = {
  lang: _extends({
    placeholder: 'Seleccionar fecha',
    rangePlaceholder: ['Fecha inicial', 'Fecha final']
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePickerLocale)
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;