import _extends from "@babel/runtime/helpers/esm/extends";
import CalendarLocale from "rc-picker/es/locale/by_BY";
import TimePickerLocale from '../../time-picker/locale/by_BY';
var locale = {
  lang: _extends({
    placeholder: 'Выберыце дату',
    yearPlaceholder: 'Выберыце год',
    quarterPlaceholder: 'Выберыце квартал',
    monthPlaceholder: 'Выберыце месяц',
    weekPlaceholder: 'Выберыце тыдзень',
    rangePlaceholder: ['Пачатковая дата', 'Канчатковая дата'],
    rangeYearPlaceholder: ['Пачатковы год', 'Год заканчэння'],
    rangeMonthPlaceholder: ['Пачатковы месяц', 'Канчатковы месяц'],
    rangeWeekPlaceholder: ['Пачатковы тыдзень', 'Канчатковы тыдзень']
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePickerLocale)
};
export default locale;