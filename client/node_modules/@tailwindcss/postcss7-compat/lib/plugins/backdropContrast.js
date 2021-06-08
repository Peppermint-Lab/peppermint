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
        'backdrop-contrast': (modifier, {
          theme
        }) => {
          let value = asValue(modifier, theme.backdropContrast);

          if (value === undefined) {
            return [];
          }

          return {
            [nameClass('backdrop-contrast', modifier)]: {
              '--tw-backdrop-contrast': `contrast(${value})`
            }
          };
        }
      });
    } else {
      const utilities = _lodash.default.fromPairs(_lodash.default.map(theme('backdropContrast'), (value, modifier) => {
        return [nameClass('backdrop-contrast', modifier), {
          '--tw-backdrop-contrast': Array.isArray(value) ? value.map(v => `contrast(${v})`).join(' ') : `contrast(${value})`
        }];
      }));

      addUtilities(utilities, variants('backdropContrast'));
    }
  };
}