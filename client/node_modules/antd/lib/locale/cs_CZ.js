"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cs_CZ = _interopRequireDefault(require("rc-pagination/lib/locale/cs_CZ"));

var _cs_CZ2 = _interopRequireDefault(require("../date-picker/locale/cs_CZ"));

var _cs_CZ3 = _interopRequireDefault(require("../time-picker/locale/cs_CZ"));

var _cs_CZ4 = _interopRequireDefault(require("../calendar/locale/cs_CZ"));

var localeValues = {
  locale: 'cs',
  Pagination: _cs_CZ["default"],
  DatePicker: _cs_CZ2["default"],
  TimePicker: _cs_CZ3["default"],
  Calendar: _cs_CZ4["default"],
  global: {
    placeholder: 'Prosím vyber'
  },
  Table: {
    filterTitle: 'Filtr',
    filterConfirm: 'Potvrdit',
    filterReset: 'Obnovit',
    filterEmptyText: 'Žádné filtry',
    selectAll: 'Vybrat všechny řádky na současné stránce',
    selectInvert: 'Invertovat výběr na současné stránce',
    selectionAll: 'Vybrat všechny řádky',
    sortTitle: 'Řadit',
    expand: 'Rozbalit řádek',
    collapse: 'Zabalit řádek',
    triggerDesc: 'Klikni pro sestupné řazení',
    triggerAsc: 'Klikni pro vzestupné řazení',
    cancelSort: 'Klikni pro zrušení řazení'
  },
  Modal: {
    okText: 'Ok',
    cancelText: 'Storno',
    justOkText: 'Ok'
  },
  Popconfirm: {
    okText: 'Ok',
    cancelText: 'Storno'
  },
  Transfer: {
    searchPlaceholder: 'Vyhledávání',
    itemUnit: 'položka',
    itemsUnit: 'položek'
  },
  Upload: {
    uploading: 'Nahrávání...',
    removeFile: 'Odstranit soubor',
    uploadError: 'Chyba při nahrávání',
    previewFile: 'Zobrazit soubor',
    downloadFile: 'Stáhnout soubor'
  },
  Empty: {
    description: 'Žádná data'
  }
};
var _default = localeValues;
exports["default"] = _default;