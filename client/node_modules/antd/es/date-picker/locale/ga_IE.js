import _extends from "@babel/runtime/helpers/esm/extends";
import CalendarLocale from "rc-picker/es/locale/ga_IE";
import TimePickerLocale from '../../time-picker/locale/ga_IE'; // Merge into a locale object

var locale = {
  lang: _extends({
    placeholder: 'Roghnaigh dáta',
    yearPlaceholder: 'Roghnaigh bliain',
    quarterPlaceholder: 'Roghnaigh ráithe',
    monthPlaceholder: 'Roghnaigh mí',
    weekPlaceholder: 'Roghnaigh seachtain',
    rangePlaceholder: ['Dáta tosaigh', 'Dáta deiridh'],
    rangeYearPlaceholder: ['Tús na bliana', 'Deireadh na bliana'],
    rangeMonthPlaceholder: ['Tosaigh mhí', 'Deireadh mhí'],
    rangeWeekPlaceholder: ['Tosaigh an tseachtain', 'Deireadh na seachtaine']
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePickerLocale)
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;