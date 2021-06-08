"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _uk_UA = _interopRequireDefault(require("rc-pagination/lib/locale/uk_UA"));

var _uk_UA2 = _interopRequireDefault(require("../date-picker/locale/uk_UA"));

var _uk_UA3 = _interopRequireDefault(require("../time-picker/locale/uk_UA"));

var _uk_UA4 = _interopRequireDefault(require("../calendar/locale/uk_UA"));

var localeValues = {
  locale: 'uk',
  Pagination: _uk_UA["default"],
  DatePicker: _uk_UA2["default"],
  TimePicker: _uk_UA3["default"],
  Calendar: _uk_UA4["default"],
  Table: {
    filterTitle: 'Фільтрувати',
    filterConfirm: 'OK',
    filterReset: 'Скинути',
    selectAll: 'Обрати всі',
    selectInvert: 'Інвертувати вибір'
  },
  Modal: {
    okText: 'Гаразд',
    cancelText: 'Скасувати',
    justOkText: 'Гаразд'
  },
  Popconfirm: {
    okText: 'Гаразд',
    cancelText: 'Скасувати'
  },
  Transfer: {
    searchPlaceholder: 'Введіть текст для пошуку',
    itemUnit: 'елем.',
    itemsUnit: 'елем.'
  },
  Upload: {
    uploading: 'Завантаження ...',
    removeFile: 'Видалити файл',
    uploadError: 'Помилка завантаження',
    previewFile: 'Попередній перегляд файлу',
    downloadFile: 'Завантажити файл'
  },
  Empty: {
    description: 'Даних немає'
  }
};
var _default = localeValues;
exports["default"] = _default;