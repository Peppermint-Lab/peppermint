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
        'backdrop-grayscale': (modifier, {
          theme
        }) => {
          let value = asValue(modifier, theme.backdropGrayscale);

          if (value === undefined) {
            return [];
          }

          return {
            [nameClass('backdrop-grayscale', modifier)]: {
              '--tw-backdrop-grayscale': `grayscale(${value})`
            }
          };
        }
      });
    } else {
      const utilities = _lodash.default.fromPairs(_lodash.default.map(theme('backdropGrayscale'), (value, modifier) => {
        return [nameClass('backdrop-grayscale', modifier), {
          '--tw-backdrop-grayscale': Array.isArray(value) ? value.map(v => `grayscale(${v})`).join(' ') : `grayscale(${value})`
        }];
      }));

      addUtilities(utilities, variants('backdropGrayscale'));
    }
  };
}