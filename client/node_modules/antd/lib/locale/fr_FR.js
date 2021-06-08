"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fr_FR = _interopRequireDefault(require("rc-pagination/lib/locale/fr_FR"));

var _fr_FR2 = _interopRequireDefault(require("../date-picker/locale/fr_FR"));

var _fr_FR3 = _interopRequireDefault(require("../time-picker/locale/fr_FR"));

var _fr_FR4 = _interopRequireDefault(require("../calendar/locale/fr_FR"));

/* eslint-disable no-template-curly-in-string */
var typeTemplate = "La valeur du champ ${label} n'est pas valide pour le type ${type}";
var localeValues = {
  locale: 'fr',
  Pagination: _fr_FR["default"],
  DatePicker: _fr_FR2["default"],
  TimePicker: _fr_FR3["default"],
  Calendar: _fr_FR4["default"],
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
  },
  Form: {
    optional: '(optionnel)',
    defaultValidateMessages: {
      "default": 'Erreur de validation pour le champ ${label}',
      required: 'Le champ ${label} est obligatoire',
      "enum": 'La valeur du champ ${label} doit être parmi [${enum}]',
      whitespace: 'La valeur du champ ${label} ne peut pas être vide',
      date: {
        format: "La valeur du champ ${label} n'est pas au format date",
        parse: 'La valeur du champ ${label} ne peut pas être convertie vers une date',
        invalid: "La valeur du champ ${label} n'est pas une date valide"
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        "boolean": typeTemplate,
        integer: typeTemplate,
        "float": typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate
      },
      string: {
        len: 'La taille du champ ${label} doit être de ${len} caractères',
        min: 'La taille du champ ${label} doit être au minimum de ${min} caractères',
        max: 'La taille du champ ${label} doit être au maximum de ${max} caractères',
        range: 'La taille du champ ${label} doit être entre ${min} et ${max} caractères'
      },
      number: {
        len: 'La valeur du champ ${label} doit être égale à ${len}',
        min: 'La valeur du champ ${label} doit être plus grande que ${min}',
        max: 'La valeur du champ ${label} doit être plus petit que ${max}',
        range: 'La valeur du champ ${label} doit être entre ${min} et ${max}'
      },
      array: {
        len: 'La taille du tableau ${label} doit être de ${len}',
        min: 'La taille du tableau ${label} doit être au minimum de ${min}',
        max: 'La taille du tableau ${label} doit être au maximum de ${max}',
        range: 'La taille du tableau ${label} doit être entre ${min}-${max}'
      },
      pattern: {
        mismatch: 'La valeur du champ ${label} ne correspond pas au modèle ${pattern}'
      }
    }
  }
};
var _default = localeValues;
exports["default"] = _default;