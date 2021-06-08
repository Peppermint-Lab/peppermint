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
        saturate: (modifier, {
          theme
        }) => {
          let value = asValue(modifier, theme.saturate);

          if (value === undefined) {
            return [];
          }

          return {
            [nameClass('saturate', modifier)]: {
              '--tw-saturate': `saturate(${value})`
            }
          };
        }
      });
    } else {
      const utilities = _lodash.default.fromPairs(_lodash.default.map(theme('saturate'), (value, modifier) => {
        return [nameClass('saturate', modifier), {
          '--tw-saturate': Array.isArray(value) ? value.map(v => `saturate(${v})`).join(' ') : `saturate(${value})`
        }];
      }));

      addUtilities(utilities, variants('saturate'));
    }
  };
}