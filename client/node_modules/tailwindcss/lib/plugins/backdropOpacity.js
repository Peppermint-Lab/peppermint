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
        'backdrop-opacity': (modifier, {
          theme
        }) => {
          let value = asValue(modifier, theme.backdropOpacity);

          if (value === undefined) {
            return [];
          }

          return {
            [nameClass('backdrop-opacity', modifier)]: {
              '--tw-backdrop-opacity': `opacity(${value})`
            }
          };
        }
      });
    } else {
      const utilities = _lodash.default.fromPairs(_lodash.default.map(theme('backdropOpacity'), (value, modifier) => {
        return [nameClass('backdrop-opacity', modifier), {
          '--tw-backdrop-opacity': Array.isArray(value) ? value.map(v => `opacity(${v})`).join(' ') : `opacity(${value})`
        }];
      }));

      addUtilities(utilities, variants('backdropOpacity'));
    }
  };
}