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
        'backdrop-blur': (modifier, {
          theme
        }) => {
          let value = asValue(modifier, theme.backdropBlur);

          if (value === undefined) {
            return [];
          }

          return {
            [nameClass('backdrop-blur', modifier)]: {
              '--tw-backdrop-blur': `blur(${value})`
            }
          };
        }
      });
    } else {
      const utilities = _lodash.default.fromPairs(_lodash.default.map(theme('backdropBlur'), (value, modifier) => {
        return [nameClass('backdrop-blur', modifier), {
          '--tw-backdrop-blur': Array.isArray(value) ? value.map(v => `blur(${v})`).join(' ') : `blur(${value})`
        }];
      }));

      addUtilities(utilities, variants('backdopBlur'));
    }
  };
}