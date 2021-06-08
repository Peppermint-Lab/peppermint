import _extends from "@babel/runtime/helpers/esm/extends";
import CalendarLocale from "rc-picker/es/locale/nb_NO";
import TimePickerLocale from '../../time-picker/locale/nb_NO'; // Merge into a locale object

var locale = {
  lang: _extends({
    placeholder: 'Velg dato',
    yearPlaceholder: 'Velg år',
    quarterPlaceholder: 'Velg kvartal',
    monthPlaceholder: 'Velg måned',
    weekPlaceholder: 'Velg uke',
    rangePlaceholder: ['Startdato', 'Sluttdato'],
    rangeYearPlaceholder: ['Startår', 'Sluttår'],
    rangeMonthPlaceholder: ['Startmåned', 'Sluttmåned'],
    rangeWeekPlaceholder: ['Start uke', 'Sluttuke']
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePickerLocale)
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;