import _extends from "@babel/runtime/helpers/esm/extends";
import CalendarLocale from "rc-picker/es/locale/zh_CN";
import TimePickerLocale from '../../time-picker/locale/zh_CN'; // 统一合并为完整的 Locale

var locale = {
  lang: _extends({
    placeholder: '请选择日期',
    yearPlaceholder: '请选择年份',
    quarterPlaceholder: '请选择季度',
    monthPlaceholder: '请选择月份',
    weekPlaceholder: '请选择周',
    rangePlaceholder: ['开始日期', '结束日期'],
    rangeYearPlaceholder: ['开始年份', '结束年份'],
    rangeMonthPlaceholder: ['开始月份', '结束月份'],
    rangeWeekPlaceholder: ['开始周', '结束周']
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePickerLocale)
}; // should add whitespace between char in Button

locale.lang.ok = '确 定'; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;