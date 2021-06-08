"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sr_RS = _interopRequireDefault(require("rc-pagination/lib/locale/sr_RS"));

var _sr_RS2 = _interopRequireDefault(require("../date-picker/locale/sr_RS"));

var _sr_RS3 = _interopRequireDefault(require("../time-picker/locale/sr_RS"));

var _sr_RS4 = _interopRequireDefault(require("../calendar/locale/sr_RS"));

var localeValues = {
  locale: 'sr',
  Pagination: _sr_RS["default"],
  DatePicker: _sr_RS2["default"],
  TimePicker: _sr_RS3["default"],
  Calendar: _sr_RS4["default"],
  Table: {
    filterTitle: 'Filter',
    filterConfirm: 'Primeni filter',
    filterReset: 'Resetuj filter',
    selectAll: 'Obeleži sve na trenutnoj strani',
    selectInvert: 'Obrni selekciju na trenutnoj stranici'
  },
  Modal: {
    okText: 'U redu',
    cancelText: 'Otkaži',
    justOkText: 'U redu'
  },
  Popconfirm: {
    okText: 'U redu',
    cancelText: 'Otkaži'
  },
  Transfer: {
    searchPlaceholder: 'Pretražite ovde',
    itemUnit: 'stavka',
    itemsUnit: 'stavki'
  },
  Upload: {
    uploading: 'Slanje...',
    removeFile: 'Ukloni fajl',
    uploadError: 'Greška prilikom slanja',
    previewFile: 'Pogledaj fajl',
    downloadFile: 'Preuzmi datoteku'
  },
  Empty: {
    description: 'Nema podataka'
  }
};
var _default = localeValues;
exports["default"] = _default;