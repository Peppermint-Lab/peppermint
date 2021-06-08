"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fr_CA = _interopRequireDefault(require("rc-pagination/lib/locale/fr_CA"));

var _fr_CA2 = _interopRequireDefault(require("../date-picker/locale/fr_CA"));

var _fr_CA3 = _interopRequireDefault(require("../time-picker/locale/fr_CA"));

var _fr_CA4 = _interopRequireDefault(require("../calendar/locale/fr_CA"));

var localeValues = {
  locale: 'fr',
  Pagination: _fr_CA["default"],
  DatePicker: _fr_CA2["default"],
  TimePicker: _fr_CA3["default"],
  Calendar: _fr_CA4["default"],
  Table: {
    filterTitle: 'Filtrer',
    filterConfirm: 'OK',
    filterReset: 'Réinitialiser',
    selectAll: 'Sélectionner la page actuelle',
    selectInvert: 'Inverser la sélection de la page actuelle',
    selectionAll: 'Sélectionner toutes les données',
    sortTitle: 'Trier',
    expand: 'Développer la ligne',
    collapse: 'Réduire la ligne',
    triggerDesc: 'Trier par ordre décroissant',
    triggerAsc: 'Trier par ordre croissant',
    cancelSort: 'Annuler le tri'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Annuler',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Annuler'
  },
  Transfer: {
    searchPlaceholder: 'Rechercher',
    itemUnit: 'élément',
    itemsUnit: 'éléments'
  },
  Empty: {
    description: 'Aucune donnée'
  },
  Upload: {
    uploading: 'Téléchargement...',
    removeFile: 'Effacer le fichier',
    uploadError: 'Erreur de téléchargement',
    previewFile: 'Fichier de prévisualisation',
    downloadFile: 'Télécharger un fichier'
  },
  Text: {
    edit: 'Éditer',
    copy: 'Copier',
    copied: 'Copie effectuée',
    expand: 'Développer'
  },
  PageHeader: {
    back: 'Retour'
  }
};
var _default = localeValues;
exports["default"] = _default;