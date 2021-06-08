"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPresetColor = isPresetColor;

var _colors = require("../_util/colors");

// eslint-disable-next-line import/prefer-default-export
function isPresetColor(color) {
  return _colors.PresetColorTypes.indexOf(color) !== -1;
}