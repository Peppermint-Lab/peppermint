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
        sepia: (modifier, {
          theme
        }) => {
          let value = asValue(modifier, theme.sepia);

          if (value === undefined) {
            return [];
          }

          return {
            [nameClass('sepia', modifier)]: {
              '--tw-sepia': `sepia(${value})`
            }
          };
        }
      });
    } else {
      const utilities = _lodash.default.fromPairs(_lodash.default.map(theme('sepia'), (value, modifier) => {
        return [nameClass('sepia', modifier), {
          '--tw-sepia': Array.isArray(value) ? value.map(v => `sepia(${v})`).join(' ') : `sepia(${value})`
        }];
      }));

      addUtilities(utilities, variants('sepia'));
    }
  };
}