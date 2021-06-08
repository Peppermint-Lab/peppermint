import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { useState, useEffect, useRef } from 'react';
import useValueTexts from './useValueTexts';
export default function useHoverValue(valueText, _ref) {
  var formatList = _ref.formatList,
      generateConfig = _ref.generateConfig,
      locale = _ref.locale;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      internalSetValue = _useState2[1];

  var raf = useRef(null);

  function setValue(val) {
    var immediately = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    cancelAnimationFrame(raf.current);

    if (immediately) {
      internalSetValue(val);
      return;
    }

    raf.current = requestAnimationFrame(function () {
      internalSetValue(val);
    });
  }

  var _useValueTexts = useValueTexts(value, {
    formatList: formatList,
    generateConfig: generateConfig,
    locale: locale
  }),
      _useValueTexts2 = _slicedToArray(_useValueTexts, 2),
      firstText = _useValueTexts2[1];

  function onEnter(date) {
    setValue(date);
  }

  function onLeave() {
    var immediately = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    setValue(null, immediately);
  }

  useEffect(function () {
    onLeave(true);
  }, [valueText]);
  useEffect(function () {
    return function () {
      return cancelAnimationFrame(raf.current);
    };
  }, []);
  return [firstText, onEnter, onLeave];
}