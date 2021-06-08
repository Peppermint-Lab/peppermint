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
        'hue-rotate': (modifier, {
          theme
        }) => {
          let value = asValue(modifier, theme.hueRotate);

          if (value === undefined) {
            return [];
          }

          return {
            [nameClass('hue-rotate', modifier)]: {
              '--tw-hue-rotate': `hue-rotate(${value})`
            }
          };
        }
      });
    } else {
      const utilities = _lodash.default.fromPairs(_lodash.default.map(theme('hueRotate'), (value, modifier) => {
        return [nameClass('hue-rotate', modifier), {
          '--tw-hue-rotate': Array.isArray(value) ? value.map(v => `hue-rotate(${v})`).join(' ') : `hue-rotate(${value})`
        }];
      }));

      addUtilities(utilities, variants('hueRotate'));
    }
  };
}