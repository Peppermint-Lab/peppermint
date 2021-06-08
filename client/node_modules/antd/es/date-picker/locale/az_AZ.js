import _extends from "@babel/runtime/helpers/esm/extends";
import CalendarLocale from "rc-picker/es/locale/az_AZ";
import TimePickerLocale from '../../time-picker/locale/az_AZ';
var locale = {
  lang: _extends({
    placeholder: 'Tarix seçin',
    rangePlaceholder: ['Başlama tarixi', 'Bitmə tarixi']
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePickerLocale)
};
export default locale;