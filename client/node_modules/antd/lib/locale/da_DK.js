"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _da_DK = _interopRequireDefault(require("rc-pagination/lib/locale/da_DK"));

var _da_DK2 = _interopRequireDefault(require("../date-picker/locale/da_DK"));

var _da_DK3 = _interopRequireDefault(require("../time-picker/locale/da_DK"));

var _da_DK4 = _interopRequireDefault(require("../calendar/locale/da_DK"));

var localeValues = {
  locale: 'da',
  DatePicker: _da_DK2["default"],
  TimePicker: _da_DK3["default"],
  Calendar: _da_DK4["default"],
  Pagination: _da_DK["default"],
  Table: {
    filterTitle: 'Filtermenu',
    filterConfirm: 'OK',
    filterReset: 'Nulstil',
    selectAll: 'Vælg alle',
    selectInvert: 'Inverter valg'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Afbryd',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Afbryd'
  },
  Transfer: {
    searchPlaceholder: 'Søg her',
    itemUnit: 'element',
    itemsUnit: 'elementer'
  },
  Upload: {
    uploading: 'Uploader...',
    removeFile: 'Fjern fil',
    uploadError: 'Fejl ved upload',
    previewFile: 'Forhåndsvisning',
    downloadFile: 'Download fil'
  },
  Empty: {
    description: 'Ingen data'
  }
};
var _default = localeValues;
exports["default"] = _default;