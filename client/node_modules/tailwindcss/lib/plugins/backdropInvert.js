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
        'backdrop-invert': (modifier, {
          theme
        }) => {
          let value = asValue(modifier, theme.backdropInvert);

          if (value === undefined) {
            return [];
          }

          return {
            [nameClass('backdrop-invert', modifier)]: {
              '--tw-backdrop-invert': `invert(${value})`
            }
          };
        }
      });
    } else {
      const utilities = _lodash.default.fromPairs(_lodash.default.map(theme('backdropInvert'), (value, modifier) => {
        return [nameClass('backdrop-invert', modifier), {
          '--tw-backdrop-invert': Array.isArray(value) ? value.map(v => `invert(${v})`).join(' ') : `invert(${value})`
        }];
      }));

      addUtilities(utilities, variants('backdropInvert'));
    }
  };
}