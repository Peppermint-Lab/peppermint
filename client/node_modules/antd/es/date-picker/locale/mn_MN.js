import _extends from "@babel/runtime/helpers/esm/extends";
import CalendarLocale from "rc-picker/es/locale/mn_MN";
import TimePickerLocale from '../../time-picker/locale/mn_MN'; // Merge into a locale object

var locale = {
  lang: _extends({
    placeholder: 'Огноо сонгох',
    rangePlaceholder: ['Эхлэх огноо', 'Дуусах огноо']
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePickerLocale)
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;