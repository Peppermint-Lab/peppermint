"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  asValue,
  nameClass
} = require('../../jit/pluginUtils');

function _default() {
  return function ({
    config,
    matchUtilities,
    addUtilities,
    theme,
    variants
  }) {
    if (config('mode') === 'jit') {
      matchUtilities({
        grayscale: (modifier, {
          theme
        }) => {
          let value = asValue(modifier, theme.grayscale);

          if (value === undefined) {
            return [];
          }

          return {
            [nameClass('grayscale', modifier)]: {
              '--tw-grayscale': `grayscale(${value})`
            }
          };
        }
      });
    } else {
      const utilities = _lodash.default.fromPairs(_lodash.default.map(theme('grayscale'), (value, modifier) => {
        return [nameClass('grayscale', modifier), {
          '--tw-grayscale': Array.isArray(value) ? value.map(v => `grayscale(${v})`).join(' ') : `grayscale(${value})`
        }];
      }));

      addUtilities(utilities, variants('grayscale'));
    }
  };
}