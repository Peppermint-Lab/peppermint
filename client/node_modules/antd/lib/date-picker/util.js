"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlaceholder = getPlaceholder;
exports.getRangePlaceholder = getRangePlaceholder;

function getPlaceholder(picker, locale, customizePlaceholder) {
  if (customizePlaceholder !== undefined) {
    return customizePlaceholder;
  }

  if (picker === 'year' && locale.lang.yearPlaceholder) {
    return locale.lang.yearPlaceholder;
  }

  if (picker === 'quarter' && locale.lang.quarterPlaceholder) {
    return locale.lang.quarterPlaceholder;
  }

  if (picker === 'month' && locale.lang.monthPlaceholder) {
    return locale.lang.monthPlaceholder;
  }

  if (picker === 'week' && locale.lang.weekPlaceholder) {
    return locale.lang.weekPlaceholder;
  }

  if (picker === 'time' && locale.timePickerLocale.placeholder) {
    return locale.timePickerLocale.placeholder;
  }

  return locale.lang.placeholder;
}

function getRangePlaceholder(picker, locale, customizePlaceholder) {
  if (customizePlaceholder !== undefined) {
    return customizePlaceholder;
  }

  if (picker === 'year' && locale.lang.yearPlaceholder) {
    return locale.lang.rangeYearPlaceholder;
  }

  if (picker === 'month' && locale.lang.monthPlaceholder) {
    return locale.lang.rangeMonthPlaceholder;
  }

  if (picker === 'week' && locale.lang.weekPlaceholder) {
    return locale.lang.rangeWeekPlaceholder;
  }

  if (picker === 'time' && locale.timePickerLocale.placeholder) {
    return locale.timePickerLocale.rangePlaceholder;
  }

  return locale.lang.rangePlaceholder;
}