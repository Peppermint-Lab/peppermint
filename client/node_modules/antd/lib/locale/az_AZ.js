"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _az_AZ = _interopRequireDefault(require("rc-pagination/lib/locale/az_AZ"));

var _az_AZ2 = _interopRequireDefault(require("../date-picker/locale/az_AZ"));

var _az_AZ3 = _interopRequireDefault(require("../time-picker/locale/az_AZ"));

var _az_AZ4 = _interopRequireDefault(require("../calendar/locale/az_AZ"));

var localeValues = {
  locale: 'az',
  Pagination: _az_AZ["default"],
  DatePicker: _az_AZ2["default"],
  TimePicker: _az_AZ3["default"],
  Calendar: _az_AZ4["default"],
  Table: {
    filterTitle: 'Filter menyu',
    filterConfirm: 'Axtar',
    filterReset: 'Sıfırla',
    emptyText: 'Məlumat yoxdur',
    selectAll: 'Cari səhifəni seç',
    selectInvert: 'Invert current page'
  },
  Modal: {
    okText: 'Bəli',
    cancelText: 'Ləğv et',
    justOkText: 'Bəli'
  },
  Popconfirm: {
    okText: 'Bəli',
    cancelText: 'Ləğv et'
  },
  Transfer: {
    titles: ['', ''],
    notFoundContent: 'Tapılmadı',
    searchPlaceholder: 'Burada axtar',
    itemUnit: 'item',
    itemsUnit: 'items'
  },
  Select: {
    notFoundContent: 'Tapılmadı'
  },
  Upload: {
    uploading: 'Yüklənir...',
    removeFile: 'Faylı sil',
    uploadError: 'Yükləmə xətası',
    previewFile: 'Fayla önbaxış'
  }
};
var _default = localeValues;
exports["default"] = _default;