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
        'backdrop-hue-rotate': (modifier, {
          theme
        }) => {
          let value = asValue(modifier, theme.backdropHueRotate);

          if (value === undefined) {
            return [];
          }

          return {
            [nameClass('backdrop-hue-rotate', modifier)]: {
              '--tw-backdrop-hue-rotate': `hue-rotate(${value})`
            }
          };
        }
      });
    } else {
      const utilities = _lodash.default.fromPairs(_lodash.default.map(theme('backdropHueRotate'), (value, modifier) => {
        return [nameClass('backdrop-hue-rotate', modifier), {
          '--tw-backdrop-hue-rotate': Array.isArray(value) ? value.map(v => `hue-rotate(${v})`).join(' ') : `hue-rotate(${value})`
        }];
      }));

      addUtilities(utilities, variants('backdropHueRotate'));
    }
  };
}