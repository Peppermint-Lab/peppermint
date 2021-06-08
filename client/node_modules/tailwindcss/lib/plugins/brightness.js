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
        brightness: (modifier, {
          theme
        }) => {
          let value = asValue(modifier, theme.brightness);

          if (value === undefined) {
            return [];
          }

          return {
            [nameClass('brightness', modifier)]: {
              '--tw-brightness': `brightness(${value})`
            }
          };
        }
      });
    } else {
      const utilities = _lodash.default.fromPairs(_lodash.default.map(theme('brightness'), (value, modifier) => {
        return [nameClass('brightness', modifier), {
          '--tw-brightness': Array.isArray(value) ? value.map(v => `brightness(${v})`).join(' ') : `brightness(${value})`
        }];
      }));

      addUtilities(utilities, variants('brightness'));
    }
  };
}