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
        'backdrop-sepia': (modifier, {
          theme
        }) => {
          let value = asValue(modifier, theme.backdropSepia);

          if (value === undefined) {
            return [];
          }

          return {
            [nameClass('backdrop-sepia', modifier)]: {
              '--tw-backdrop-sepia': `sepia(${value})`
            }
          };
        }
      });
    } else {
      const utilities = _lodash.default.fromPairs(_lodash.default.map(theme('backdropSepia'), (value, modifier) => {
        return [nameClass('backdrop-sepia', modifier), {
          '--tw-backdrop-sepia': Array.isArray(value) ? value.map(v => `sepia(${v})`).join(' ') : `sepia(${value})`
        }];
      }));

      addUtilities(utilities, variants('backdropSepia'));
    }
  };
}