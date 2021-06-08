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
        'backdrop-brightness': (modifier, {
          theme
        }) => {
          let value = asValue(modifier, theme.backdropBrightness);

          if (value === undefined) {
            return [];
          }

          return {
            [nameClass('backdrop-brightness', modifier)]: {
              '--tw-backdrop-brightness': `brightness(${value})`
            }
          };
        }
      });
    } else {
      const utilities = _lodash.default.fromPairs(_lodash.default.map(theme('backdropBrightness'), (value, modifier) => {
        return [nameClass('backdrop-brightness', modifier), {
          '--tw-backdrop-brightness': Array.isArray(value) ? value.map(v => `brightness(${v})`).join(' ') : `brightness(${value})`
        }];
      }));

      addUtilities(utilities, variants('backdropBrightness'));
    }
  };
}