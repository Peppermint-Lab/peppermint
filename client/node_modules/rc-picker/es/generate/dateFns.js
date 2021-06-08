import { getDay, getYear as _getYear, getMonth as _getMonth, getDate as _getDate, endOfMonth, getHours, getMinutes, getSeconds, addYears, addMonths, addDays, setYear as _setYear, setMonth as _setMonth, setDate as _setDate, setHours, setMinutes, setSeconds, isAfter as _isAfter, isValid, getWeek as _getWeek, startOfWeek, format as formatDate, parse as parseDate } from 'date-fns';
import * as Locale from 'date-fns/locale';

var dealLocal = function dealLocal(str) {
  return str.replace(/_/g, '');
};

var localeParse = function localeParse(format) {
  return format.replace(/Y/g, 'y').replace(/D/g, 'd').replace(/gggg/, 'yyyy').replace(/g/g, 'G').replace(/([Ww])o/g, 'wo');
};

var generateConfig = {
  // get
  getNow: function getNow() {
    return new Date();
  },
  getFixedDate: function getFixedDate(string) {
    return new Date(string);
  },
  getEndDate: function getEndDate(date) {
    return endOfMonth(date);
  },
  getWeekDay: function getWeekDay(date) {
    return getDay(date);
  },
  getYear: function getYear(date) {
    return _getYear(date);
  },
  getMonth: function getMonth(date) {
    return _getMonth(date);
  },
  getDate: function getDate(date) {
    return _getDate(date);
  },
  getHour: function getHour(date) {
    return getHours(date);
  },
  getMinute: function getMinute(date) {
    return getMinutes(date);
  },
  getSecond: function getSecond(date) {
    return getSeconds(date);
  },
  // set
  addYear: function addYear(date, diff) {
    return addYears(date, diff);
  },
  addMonth: function addMonth(date, diff) {
    return addMonths(date, diff);
  },
  addDate: function addDate(date, diff) {
    return addDays(date, diff);
  },
  setYear: function setYear(date, year) {
    return _setYear(date, year);
  },
  setMonth: function setMonth(date, month) {
    return _setMonth(date, month);
  },
  setDate: function setDate(date, num) {
    return _setDate(date, num);
  },
  setHour: function setHour(date, hour) {
    return setHours(date, hour);
  },
  setMinute: function setMinute(date, minute) {
    return setMinutes(date, minute);
  },
  setSecond: function setSecond(date, second) {
    return setSeconds(date, second);
  },
  // Compare
  isAfter: function isAfter(date1, date2) {
    return _isAfter(date1, date2);
  },
  isValidate: function isValidate(date) {
    return isValid(date);
  },
  locale: {
    getWeekFirstDay: function getWeekFirstDay(locale) {
      var clone = Locale[dealLocal(locale)];
      return clone.options.weekStartsOn;
    },
    getWeekFirstDate: function getWeekFirstDate(locale, date) {
      return startOfWeek(date, {
        locale: Locale[dealLocal(locale)]
      });
    },
    getWeek: function getWeek(locale, date) {
      return _getWeek(date, {
        locale: Locale[dealLocal(locale)]
      });
    },
    getShortWeekDays: function getShortWeekDays(locale) {
      var clone = Locale[dealLocal(locale)];
      return Array.from({
        length: 7
      }).map(function (_, i) {
        return clone.localize.day(i, {
          width: 'short'
        });
      });
    },
    getShortMonths: function getShortMonths(locale) {
      var clone = Locale[dealLocal(locale)];
      return Array.from({
        length: 12
      }).map(function (_, i) {
        return clone.localize.month(i, {
          width: 'abbreviated'
        });
      });
    },
    format: function format(locale, date, _format) {
      if (!isValid(date)) {
        return null;
      }

      return formatDate(date, localeParse(_format), {
        locale: Locale[dealLocal(locale)]
      });
    },
    parse: function parse(locale, text, formats) {
      for (var i = 0; i < formats.length; i += 1) {
        var format = localeParse(formats[i]);
        var formatText = text;
        var date = parseDate(formatText, format, new Date(), {
          locale: Locale[dealLocal(locale)]
        });

        if (isValid(date)) {
          return date;
        }
      }

      return null;
    }
  }
};
export default generateConfig;